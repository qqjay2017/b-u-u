import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Battery UI',
  description: '基于 Vue 3 + TypeScript 的 uni-app 组件库',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/component/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '快速上手', link: '/guide/' }],
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
