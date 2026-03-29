import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  description: 'A uni-app component library based on wot-design',
  themeConfig: {
    lastUpdated: {
      text: 'Last Updated'
    },
    editLink: {
      pattern: 'https://github.com/Moonofweisheng/battery-uniapp-ui/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      {
        text: 'Guide',
        activeMatch: '/guide/',
        items: [
          {
            text: 'AI Assistant',
            link: '/en-US/guide/ai',
          },
        ]
      },
      {
        text: 'Components',
        activeMatch: '/component/',
        items: [
          {
            text: 'Basic Components',
            link: '/en-US/component/button',
          }
        ]
      },
      { text: '🥤Buy Me a Coffee', link: '/en-US/reward/reward', activeMatch: '/reward/' },
    ],
    sidebar: {
      '/en-US/guide/': [
        {
          text: 'AI Assistant',
          link: '/en-US/guide/ai',
        },
      ],
      '/en-US/reward/': [
        {
          text: '🥤Buy Me a Coffee',
          link: '/en-US/reward/reward',
        },
      ],
      '/en-US/component/': [
        {
          text: 'Basic',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/button',
              text: 'Button'
            }
          ]
        },
        {
          text: 'Feedback',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/actionSheet',
              text: 'ActionSheet'
            },
            {
              link: '/en-US/component/popup',
              text: 'Popup'
            }
          ]
        },
        {
          text: 'Navigation',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/tabs',
              text: 'Tabs'
            }
          ]
        },
        {
          text: 'Input',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/vehicleKeyboard',
              text: 'VehicleKeyboard'
            }
          ]
        }
      ]
    }
  }
})