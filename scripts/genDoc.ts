/**
 * 从 Vue 组件自动生成 API 文档（Attributes / Events）
 * 使用方式：pnpm gendoc
 *
 * 在 md 文件中添加标记：
 *   <!-- API_START:bt-button -->
 *   ...此区间内容由脚本自动替换，请勿手动修改...
 *   <!-- API_END -->
 *
 * 标记外的内容（如 ButtonOpenType 开放能力、外部样式类）不受影响，保持手动维护。
 */

import { createChecker } from 'vue-component-meta'
import type { PropertyMeta, EventMeta } from 'vue-component-meta'
import path from 'path'
import fs from 'fs'

const ROOT = path.resolve(__dirname, '..')
const COMPONENTS_DIR = path.join(ROOT, 'src/uni_modules/battery-uniapp-ui/components')
const DOCS_DIR = path.join(ROOT, 'docs/component')
const TSCONFIG = path.join(ROOT, 'tsconfig.gendoc.json')

/** baseProps 里的公共 prop，生成文档时排除 */
const BASE_PROPS = new Set(['customStyle', 'customClass'])

/** 匹配整个 API 块（START 标签 + 内容 + END 标签） */
const API_BLOCK_RE = /(<!--\s*API_START:(\S+?)\s*-->)([\s\S]*?)(<!--\s*API_END\s*-->)/

// ──────────────────────────────────────────────
// 工具函数
// ──────────────────────────────────────────────

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 清理 vue-component-meta 返回的类型字符串：
 * - 去掉 import(...). 前缀
 * - 去掉 | undefined（可选 prop 的附加噪音）
 * - 合并多余空白
 * - 截断过长的联合类型
 */
function cleanType(raw: string): string {
  let t = raw
    .replace(/import\([^)]+\)\.\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  // 去掉 | undefined / undefined |
  t = t
    .replace(/\s*\|\s*undefined/g, '')
    .replace(/undefined\s*\|\s*/g, '')
    .trim()

  // 联合类型超过 60 字符时只保留前几个值并加省略号
  if (t.includes(' | ') && t.length > 60) {
    const parts = t.split(' | ')
    const head = parts.slice(0, 4).join(' / ')
    return parts.length > 4 ? `${head} / ...` : head
  }

  // 把 "a" | "b" 形式转为 a / b（去掉引号，用斜杠分隔，更符合文档风格）
  if (/^"[^"]*"(\s*\|\s*"[^"]*")+$/.test(t)) {
    return t.replace(/"([^"]*)"/g, '$1').replace(/\s*\|\s*/g, ' / ')
  }

  return t
}

/** 从 tags 数组里取指定名称的 tag 文本 */
function getTag(tags: PropertyMeta['tags'], name: string): string | undefined {
  return tags.find((t) => t.name === name)?.text
}

// ──────────────────────────────────────────────
// 表格生成
// ──────────────────────────────────────────────

function buildAttributesTable(props: PropertyMeta[]): string {
  const list = props.filter((p) => !p.global && !BASE_PROPS.has(p.name))
  if (list.length === 0) return ''

  const rows = list.map((p) => {
    const name = toKebabCase(p.name)
    const desc = (getTag(p.tags, 'description') ?? p.description ?? '-').replace(/\n/g, ' ').trim()
    const type = cleanType(p.type || '-')
    // 优先用 @default tag，其次用 meta 里的 default 字段
    const def = getTag(p.tags, 'default') ?? (p.default != null ? p.default.replace(/\n/g, ' ') : '-')
    return `| ${name} | ${desc} | \`${type}\` | ${def} |`
  })

  return ['## Attributes', '', '| 参数 | 说明 | 类型 | 默认值 |', '| --- | --- | --- | --- |', ...rows, ''].join('\n')
}

function buildEventsTable(events: EventMeta[]): string {
  if (events.length === 0) return ''

  const rows = events.map((e) => {
    const desc = (getTag(e.tags, 'description') ?? e.description ?? '-').replace(/\n/g, ' ').trim()
    // signature 示例: "(event: MouseEvent): void"，取括号内参数部分
    const params = e.schema.length > 0 ? e.schema.map((s: any) => cleanType(typeof s === 'string' ? s : s.type ?? '')).join(', ') : '-'
    return `| ${e.name} | ${desc} | ${params} |`
  })

  return ['## Events', '', '| 事件名称 | 说明 | 参数 |', '| --- | --- | --- |', ...rows, ''].join('\n')
}

// ──────────────────────────────────────────────
// 主流程
// ──────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(TSCONFIG)) {
    console.error(`❌ tsconfig not found: ${TSCONFIG}`)
    process.exit(1)
  }

  const checker = createChecker(TSCONFIG, {
    forceUseTs: true,
    printer: { newLine: 1 }
  })

  const mdFiles = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))
  let updated = 0

  for (const mdFile of mdFiles) {
    const mdPath = path.join(DOCS_DIR, mdFile)
    const content = fs.readFileSync(mdPath, 'utf-8')

    const match = API_BLOCK_RE.exec(content)
    if (!match) continue

    const [fullMatch, startTag, componentName, , endTag] = match
    const componentPath = path.join(COMPONENTS_DIR, componentName, `${componentName}.vue`)

    if (!fs.existsSync(componentPath)) {
      console.warn(`⚠️  Component not found: ${componentPath}`)
      continue
    }

    console.log(`Processing: ${mdFile}  →  ${componentName}`)

    try {
      const meta = checker.getComponentMeta(componentPath)

      const parts: string[] = []
      const attrs = buildAttributesTable(meta.props)
      if (attrs) parts.push(attrs)
      const events = buildEventsTable(meta.events)
      if (events) parts.push(events)

      const generated = parts.join('\n')
      const newBlock = `${startTag}\n\n${generated}\n${endTag}`
      const newContent = content.replace(fullMatch, newBlock)

      fs.writeFileSync(mdPath, newContent, 'utf-8')
      console.log(`✅ ${mdFile} updated`)
      updated++
    } catch (err) {
      console.error(`❌ Failed to process ${mdFile}:`, (err as Error).message)
    }
  }

  console.log(`\nDone — ${updated} file(s) updated.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
