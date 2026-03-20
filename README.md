# Battery UI

基于 Vue 3 + TypeScript + SCSS 的 uni-app 组件库，兼容 H5 和微信小程序。

## 项目结构

```
├── src/
│   ├── uni_modules/battery-uniapp-ui/       # 组件库核心
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── abstracts/
│   │   │   │   │   ├── _config.scss         # BEM 命名空间配置（$namespace: 'bt'）
│   │   │   │   │   ├── _mixin.scss          # BEM mixins（b / e / m / when）
│   │   │   │   │   └── variable.scss        # CSS 变量主题系统（--bt-*）
│   │   │   │   ├── props.ts                 # 通用 prop 工厂函数
│   │   │   │   └── util.ts                  # 工具函数
│   │   │   └── bt-button/                   # Button 组件
│   │   │       ├── bt-button.vue
│   │   │       ├── types.ts
│   │   │       ├── index.ts
│   │   │       └── index.scss
│   │   ├── index.ts                         # 库主入口导出
│   │   └── package.json
│   ├── pages/                               # 演示页面
│   │   ├── index.vue                        # 首页（组件导航）
│   │   └── button/index.vue                 # Button 演示页
│   ├── pages.json                           # 路由 & easycom 配置
│   ├── App.vue
│   ├── main.ts
│   ├── manifest.json
│   └── uni.scss
├── docs/                                    # VitePress 文档站
│   ├── .vitepress/config.mts
│   ├── index.md
│   ├── guide/index.md
│   └── component/button.md
├── eslint.config.js                         # ESLint flat config
├── .prettierrc
├── vite.config.ts
├── tsconfig.json
├── unh.config.ts
└── package.json
```

## 可用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev:h5` | 启动 H5 开发服务器 |
| `pnpm dev:mp-weixin` | 启动微信小程序开发 |
| `pnpm build:h5` | 构建 H5 |
| `pnpm build:mp-weixin` | 构建微信小程序 |
| `pnpm type-check` | TypeScript 类型检查 |
| `pnpm lint` | ESLint 检查 + 自动修复 |
| `pnpm docs:dev` | 启动 VitePress 文档站 |
| `pnpm docs:build` | 构建 VitePress 文档站 |

## 快速使用

组件通过 easycom 自动导入，无需手动 import，直接在模板中使用：

```vue
<bt-button type="primary">按钮</bt-button>
```

## 组件前缀

所有组件使用 `bt` 前缀（来自 **b**a**t**tery），如 `<bt-button>`。
