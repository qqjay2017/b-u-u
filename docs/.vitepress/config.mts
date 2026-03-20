import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Battery UI',
  description: '基于 Vue 3 + TypeScript 的 uni-app 组件库',
  vite: {
    server: {
      port: 5174,
      strictPort: true,
    },
  },
  themeConfig: {
    simulatorUrl: 'http://localhost:5173',
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
