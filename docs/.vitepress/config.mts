import { defineConfig, type DefaultTheme } from 'vitepress'
import { apiDocPlugin } from './plugins/api-doc'

declare module 'vitepress' {
  namespace DefaultTheme {
    interface Config {
      simulatorUrl?: string
    }
  }
}

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  title: 'Battery UI',
  description: '基于 Vue 3 + TypeScript 的 uni-app 组件库',
  outDir: '../dist',
  vite: {
    server: {
      port: 5174,
      strictPort: true,
    },
    plugins: [apiDocPlugin() as any],
  },

  themeConfig: {
    simulatorUrl: isProd ? '/h5' : 'http://localhost:5173',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/component/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速上手', link: '/guide/' },
            { text: '组件预览配置', link: '/guide/preview' },
            { text: '组件文档生成', link: '/guide/api-doc' },
          ],
        },
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [{ text: 'Button 按钮', link: '/component/button' }],
        },
      ],
    },
    socialLinks: [],
  },
})
