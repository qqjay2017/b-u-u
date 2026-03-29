import { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Vite plugin: transform <DemoCode src="subPages/tabs/Index.vue" /> in markdown files
 * into VitePress-native ::: details container + code fence.
 *
 * This gives us Shiki syntax highlighting + copy button + collapsible for free.
 *
 * Usage in .md files:
 *   <DemoCode src="subPages/tabs/Index.vue" />
 *   <DemoCode src="subPages/tabs/Index.vue" title="自定义标题" />
 */
export function DemoCodePlugin(): Plugin {
  const srcRoot = path.resolve(__dirname, '../../../src')

  return {
    name: 'vitepress-demo-code',
    enforce: 'pre',

    transform(code, id) {
      if (!id.endsWith('.md')) return

      // Match <DemoCode src="..." /> with optional title attribute
      const regex = /<DemoCode\s+([^>]*?)\s*\/?>/g

      const result = code.replace(regex, (fullMatch, attrs: string) => {
        const srcMatch = attrs.match(/src="([^"]+)"/)
        if (!srcMatch) return fullMatch // No src attr — let Vue component handle it

        const src = srcMatch[1]
        const titleMatch = attrs.match(/title="([^"]*)"/)
        const title = titleMatch ? titleMatch[1] : '查看 Demo 源码'

        // Security: prevent path traversal
        if (src.includes('..')) return fullMatch
        const filePath = path.resolve(srcRoot, src)
        if (!filePath.startsWith(srcRoot)) return fullMatch

        if (!fs.existsSync(filePath)) {
          return `> ⚠️ 文件未找到: \`src/${src}\``
        }

        const source = fs.readFileSync(filePath, 'utf-8')
        const ext = path.extname(src).slice(1) || 'vue'

        // Determine fence length: use enough backticks to avoid conflicts
        let fence = '```'
        while (source.includes(fence)) {
          fence += '`'
        }

        return `::: details ${title}\n\n${fence}${ext}\n${source}\n${fence}\n\n:::`
      })

      if (result !== code) {
        return { code: result }
      }
    },
  }
}
