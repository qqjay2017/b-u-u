---
name: battery-uniapp-ui
description: battery-uniapp-ui 组件库开发规范。适用于在该项目中新增组件、修改组件、编写样式或定义 props 时使用。
---

# battery-uniapp-ui 组件库

基于 uni-app (Vue 3 + TypeScript) 的跨端 UI 组件库，组件前缀为 `bt-`。

## 项目结构

- 组件源码：`src/uni_modules/battery-uniapp-ui/components/`
- 公共工具：`src/uni_modules/battery-uniapp-ui/components/common/`
- 示例页面：`src/pages/`
- 文档：`docs/component/`
- 统一导出：`src/uni_modules/battery-uniapp-ui/index.ts`

## 组件开发规范

### 文件结构

每个组件目录 `bt-<name>/` 包含：

| 文件 | 用途 |
|------|------|
| `bt-<name>.vue` | 组件模板 + 逻辑 + 样式引入 |
| `types.ts` | props 定义 & 类型导出 |
| `index.ts` | 对外导出 |
| `index.scss` | 组件样式 |

### Props 定义

- 使用 `common/props.ts` 中的工具函数：`makeStringProp`、`makeBooleanProp`、`makeNumericProp`
- 所有组件继承 `baseProps`（`customClass`、`customStyle`）
- 导出 `<Name>Props`（ExtractPropTypes）和 `<Name>Instance` 类型

### 组件编写

- 使用 `<script setup lang="ts">` + Composition API
- class 拼接使用 computed 返回字符串
- 样式使用 SCSS，通过 `@import "./index.scss"` 引入
- hover-class 在 disabled/loading 时置空

### 样式规范

- BEM 命名：`bt-<name>__<element>` / `is-<state>`
- SCSS 变量定义在 `common/abstracts/variable.scss`
- Mixin 定义在 `common/abstracts/_mixin.scss`

### 新增组件检查清单

1. 在 `components/` 下创建 `bt-<name>/` 目录及四个文件
2. 在 `index.ts` 中导出类型
3. 在 `src/pages/` 下添加示例页面并注册到 `pages.json`
4. 在 `docs/component/` 下添加文档
