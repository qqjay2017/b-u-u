# 快速上手

## 安装

Battery UI 以 `uni_modules` 形式集成，将 `battery-uniapp-ui` 目录放入项目的 `src/uni_modules/` 下即可使用。

## 配置 easycom

在 `pages.json` 中添加 easycom 配置，组件即可自动导入：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^bt-(.*)": "@/uni_modules/battery-uniapp-ui/components/bt-$1/bt-$1.vue"
    }
  }
}
```

## 使用组件

配置完成后，在页面中直接使用组件标签，无需手动 import：

```vue
<template>
  <bt-button type="primary">按钮</bt-button>
</template>
```

## TypeScript 支持

所有组件均提供完整的 TypeScript 类型定义：

```ts
import type { ButtonProps, ButtonType } from '@/uni_modules/battery-uniapp-ui'
```
