import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  description: '一个参照wot-design打造的uni-app组件库',
  themeConfig: {
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/Moonofweisheng/battery-uniapp-ui/edit/master/docs/:path',
      text: '为此页提供修改建议'
    },
    nav: [
      {
        text: '指南',
        activeMatch: '/guide/',
        items: [
          {
            text: 'AI',
            link: '/guide/ai',
          },
        ]
      },
      {
        text: '组件',
        activeMatch: '/component/',
        items: [
          {
            text: '基础组件',
            link: '/component/button',
          }
        ]
      },
      { text: '🥤一杯咖啡', link: '/reward/reward', activeMatch: '/reward/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'AI',
          link: '/guide/ai',
        },
      ],
      '/reward/': [
        {
          text: '🥤一杯咖啡',
          link: '/reward/reward',
        },
      ],
      '/component/': [
        {
          text: '基础',
          collapsed: false,
          items: [
            {
              link: '/component/button',
              text: 'Button 按钮'
            }
          ]
        },
        {
          text: '反馈',
          collapsed: false,
          items: [
            {
              link: '/component/actionSheet',
              text: 'ActionSheet 上拉菜单'
            },
            {
              link: '/component/popup',
              text: 'Popup 弹出层'
            }
          ]
        },
        {
          text: '导航',
          collapsed: false,
          items: [
            {
              link: '/component/tabs',
              text: 'Tabs 标签页'
            }
          ]
        },
        {
          text: '输入',
          collapsed: false,
          items: [
            {
              link: '/component/vehicleKeyboard',
              text: 'VehicleKeyboard 车牌键盘'
            }
          ]
        }
      ]
    }
  }
})