import { readFileSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import type { Plugin } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const _require = createRequire(import.meta.url)

/** 项目根目录 */
const ROOT_DIR = resolve(__dirname, '../../..')

/** 组件源码根目录 */
const COMPONENTS_DIR = resolve(
  ROOT_DIR,
  'src/uni_modules/battery-uniapp-ui/components'
)

// ---- 缓存 ----
interface CacheEntry {
  mtime: number
  result: string
}
const cache = new Map<string, CacheEntry>()

// ---- 懒初始化 checker ----
let checker: any = null

function getChecker() {
  if (checker) return checker

  const { createCheckerByJson } = _require('vue-component-meta')
  checker = createCheckerByJson(ROOT_DIR, {
    include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    compilerOptions: {
      baseUrl: '.',
      paths: { '@/*': ['./src/*'] },
      lib: ['DOM', 'DOM.Iterable', 'ESNext'],
      module: 99,
      moduleResolution: 100,
      resolveJsonModule: true,
      jsx: 1,
      strict: true,
      target: 99,
      skipLibCheck: true,
    },
    vueCompilerOptions: {},
  }, {
    schema: true,
  })
  return checker
}

// ---- 从 types.ts 解析默认值（补充 vue-component-meta 无法获取的信息）----
function parseDefaultsFromTypes(typesPath: string): Map<string, string> {
  const defaults = new Map<string, string>()
  if (!existsSync(typesPath)) return defaults

  const content = readFileSync(typesPath, 'utf-8')

  // 匹配 propName: makeXxxProp(defaultValue) 或 makeXxxProp<Type>(defaultValue)
  const re = /(\w+):\s*make\w+Prop(?:<[^>]*>)?\(([^)]*)\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) {
    const name = m[1]
    const rawDefault = m[2].trim()
    if (rawDefault) {
      defaults.set(name, rawDefault)
    }
  }

  // 匹配 baseProps 展开 → 读取 common/props.ts 中的默认值
  if (content.includes('...baseProps')) {
    const basePath = resolve(dirname(typesPath), '../common/props.ts')
    if (existsSync(basePath)) {
      const baseContent = readFileSync(basePath, 'utf-8')
      const baseRe = /(\w+):\s*\{[^}]*default:\s*"([^"]*)"/g
      let bm: RegExpExecArray | null
      while ((bm = baseRe.exec(baseContent)) !== null) {
        defaults.set(bm[1], `"${bm[2]}"`)
      }
    }
  }

  return defaults
}

// ---- 从 .vue 文件解析 emit JSDoc 和 slot 注释 ----
function parseEmitDescriptions(vueContent: string): Map<string, string> {
  const map = new Map<string, string>()
  // 匹配 defineEmits 块中的 JSDoc + 事件名
  // /** 点击按钮时触发 */\n  click: [event: Event];
  const re = /\/\*\*\s*(.+?)\s*\*\/\s*\n\s*(\w+)\s*:/g
  // 只在 defineEmits 块内搜索
  const emitsMatch = vueContent.match(/defineEmits\s*<\s*\{([\s\S]*?)\}/)
  if (emitsMatch) {
    let m: RegExpExecArray | null
    while ((m = re.exec(emitsMatch[1])) !== null) {
      map.set(m[2], m[1])
    }
  }
  return map
}

function parseSlotDescriptions(vueContent: string): Map<string, string> {
  const map = new Map<string, string>()
  // 匹配 <!-- @slot slotName 描述 --> 注释
  const re = /<!--\s*@slot\s+(\S+)\s+(.*?)\s*-->/g
  let m: RegExpExecArray | null
  while ((m = re.exec(vueContent)) !== null) {
    map.set(m[1], m[2])
  }
  return map
}

// ---- 格式化类型（从 schema 中提取联合值）----
function formatPropType(prop: any): string {
  if (prop.schema && prop.schema.kind === 'enum' && Array.isArray(prop.schema.schema)) {
    const values = (prop.schema.schema as string[]).filter(v => v !== 'undefined')
    if (values.length > 0) {
      // 如果是简单类型（boolean, string, number），直接用类型名
      if (values.length === 2 && values.includes('false') && values.includes('true')) {
        return '`boolean`'
      }
      if (values.length === 1 && values[0] === 'string') {
        return '`string`'
      }
      if (values.length === 1 && values[0] === 'number') {
        return '`number`'
      }
      // 联合类型（字面量值）
      const formatted = values
        .filter(v => v !== 'false' && v !== 'true' || values.length <= 2)
        .map(v => v.startsWith('"') ? `'${v.slice(1, -1)}'` : v)
        .join(' \\| ')
      return `\`${formatted}\``
    }
  }

  // fallback：使用 type 字符串，去掉 | undefined
  const t = prop.type.replace(/\s*\|\s*undefined/, '').trim()
  return t ? `\`${t}\`` : '—'
}

function formatDefault(raw: string | undefined): string {
  if (raw === undefined || raw === 'undefined') return '—'
  const d = raw.trim()
  if (!d) return '—'
  return `\`${d}\``
}

// ---- 核心：获取组件元数据并生成 markdown ----
function resolveComponent(
  componentName: string
): { markdown: string; vuePath: string; typesPath: string } {
  const name = componentName.replace(/^bt-/, '')
  const vuePath = resolve(COMPONENTS_DIR, `bt-${name}/bt-${name}.vue`)
  const typesPath = resolve(COMPONENTS_DIR, `bt-${name}/types.ts`)

  // 缓存检查
  const vueStat = statSync(vuePath)
  const typesStat = existsSync(typesPath) ? statSync(typesPath) : null
  const combinedMtime = Math.max(
    vueStat.mtimeMs,
    typesStat ? typesStat.mtimeMs : 0
  )
  const cached = cache.get(vuePath)
  if (cached && cached.mtime === combinedMtime) {
    return { markdown: cached.result, vuePath, typesPath }
  }

  const meta = getChecker().getComponentMeta(vuePath)
  const defaultsMap = parseDefaultsFromTypes(typesPath)
  const vueContent = readFileSync(vuePath, 'utf-8')
  const emitDescs = parseEmitDescriptions(vueContent)
  const slotDescs = parseSlotDescriptions(vueContent)

  const sections: string[] = []

  // --- Props ---
  const props = meta.props.filter((p: any) => !p.global)
  if (props.length > 0) {
    const rows = props.map((p: any) => {
      const type = formatPropType(p)
      // 优先用 vue-component-meta 的默认值，否则从 types.ts 补充
      const def = p.default !== undefined
        ? formatDefault(p.default)
        : formatDefault(defaultsMap.get(p.name))
      return `| ${p.name} | ${p.description || ''} | ${type} | ${def} |`
    })
    sections.push(
      [
        '### Props',
        '',
        '| 参数 | 说明 | 类型 | 默认值 |',
        '| --- | --- | --- | --- |',
        ...rows,
      ].join('\n')
    )
  }

  // --- Events ---
  const events = meta.events
  if (events.length > 0) {
    const rows = events.map((e: any) => {
      const desc = e.description || emitDescs.get(e.name) || ''
      const type = e.type ? `\`${e.type}\`` : '—'
      return `| ${e.name} | ${desc} | ${type} |`
    })
    sections.push(
      [
        '### Events',
        '',
        '| 事件名 | 说明 | 回调参数 |',
        '| --- | --- | --- |',
        ...rows,
      ].join('\n')
    )
  }

  // --- Slots ---
  const slots = meta.slots
  if (slots.length > 0) {
    const rows = slots.map((s: any) => {
      const desc = s.description || slotDescs.get(s.name) || ''
      return `| ${s.name} | ${desc} |`
    })
    sections.push(
      [
        '### Slots',
        '',
        '| 名称 | 说明 |',
        '| --- | --- |',
        ...rows,
      ].join('\n')
    )
  }

  const markdown = sections.join('\n\n')
  cache.set(vuePath, { mtime: combinedMtime, result: markdown })

  return { markdown, vuePath, typesPath }
}

// ---- Vite 插件 ----
export function apiDocPlugin(): Plugin {
  return {
    name: 'battery-ui-api-doc',
    enforce: 'pre',

    transform(code, id) {
      if (!id.endsWith('.md') || !id.includes('/docs/')) return
      if (!code.includes('<ApiDoc')) return

      const tagRe = /<ApiDoc\s+component="([^"]+)"\s*\/>/g
      let hasMatch = false

      const result = code.replace(tagRe, (_match, componentName: string) => {
        hasMatch = true
        const { markdown, vuePath, typesPath } = resolveComponent(componentName)
        this.addWatchFile(vuePath)
        if (existsSync(typesPath)) {
          this.addWatchFile(typesPath)
        }
        return markdown
      })

      if (!hasMatch) return
      return result
    },
  }
}
