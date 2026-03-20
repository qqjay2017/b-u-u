# API 文档自动生成

组件的 Props、Events、Slots 表格由 Vite 插件在**编译时**自动生成，无需手动维护。

## 使用方式

在组件文档的 `.md` 文件中，用以下标记替代手写表格：

```md
## API

<ApiDoc component="bt-button" />
```

插件会在构建/开发时将 `<ApiDoc>` 替换为完整的 Props、Events、Slots markdown 表格。

## 数据来源

所有信息直接从组件源码中提取，**不需要额外维护文档元数据**：

| 信息 | 来源 | 写法 |
| --- | --- | --- |
| Props 列表 | `.vue` 文件中的 `defineProps` | 正常写即可 |
| Props 说明 | `types.ts` 中 prop 上方的 JSDoc | `/** 按钮类型 */` |
| Props 类型 | TypeScript 类型定义 | 自动解析联合类型 |
| Props 默认值 | `makeXxxProp()` 的参数 | 自动解析 |
| Events 列表 | `defineEmits` 类型声明 | 正常写即可 |
| Events 说明 | `defineEmits` 中的 JSDoc | `/** 点击按钮时触发 */` |
| Slots 列表 | 模板中的 `<slot>` 标签 | 正常写即可 |
| Slots 说明 | `<slot>` 上方的 HTML 注释 | `<!-- @slot default 按钮内容 -->` |

### 示例

`types.ts` — Props 通过 JSDoc 提供说明：

```ts
export const buttonProps = {
  ...baseProps,
  /** 按钮类型 */
  type: makeStringProp<ButtonType>("default"),
  /** 是否禁用 */
  disabled: makeBooleanProp(false),
};
```

`bt-button.vue` — Events 和 Slots 通过注释提供说明：

```vue
<template>
  <button @click="handleClick">
    <!-- @slot default 按钮内容 -->
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  /** 点击按钮时触发 */
  click: [event: Event];
}>();
</script>
```

## 技术原理

### 架构概览

```
docs/.md 文件                 Vite 插件 (enforce: 'pre')
┌──────────────────┐         ┌──────────────────────────┐
│ <ApiDoc           │──transform──▶│ vue-component-meta        │
│   component=     │         │   ├─ 解析 Props/Events/Slots │
│   "bt-button" /> │         │   └─ 返回 ComponentMeta      │
└──────────────────┘         └──────────┬───────────────┘
                                        │
                              ┌─────────▼──────────┐
                              │ 补充解析              │
                              │ ├─ 默认值 (types.ts)  │
                              │ ├─ Event JSDoc (.vue) │
                              │ └─ Slot 注释 (.vue)   │
                              └─────────┬──────────┘
                                        │
                              ┌─────────▼──────────┐
                              │ 生成 Markdown 表格    │
                              │ 替换 <ApiDoc> 标记    │
                              └────────────────────┘
```

### 核心流程

1. **Vite 插件注册**：`enforce: 'pre'` 确保在 VitePress 处理 `.md` 之前执行替换，生成的 markdown 经过完整的 markdown-it 渲染流程
2. **`vue-component-meta`**（懒初始化）：首次遇到 `<ApiDoc>` 时才创建 checker，不影响 Vite 启动速度
3. **`getComponentMeta()`**：传入 `.vue` 文件路径，自动解析 `defineProps`、`defineEmits`、`<slot>` 获取完整的 props/events/slots 元数据
4. **补充解析**：
   - **默认值**：`vue-component-meta` 对 helper 函数（`makeStringProp` 等）的默认值解析不完整，通过正则从 `types.ts` 补充
   - **Event 说明**：从 `.vue` 文件的 `defineEmits` 块中提取 JSDoc 注释
   - **Slot 说明**：从模板中匹配 `<!-- @slot name 描述 -->` 注释
5. **类型格式化**：利用 `schema` 选项将类型别名（如 `ButtonType`）展开为字面量联合类型（如 `'primary' | 'success' | ...`）

### 性能设计

| 策略 | 说明 |
| --- | --- |
| 懒初始化 | checker 仅在首次需要时创建，不拖慢 Vite 启动 |
| mtime 缓存 | 按 `.vue` 和 `types.ts` 文件的修改时间缓存结果，未修改则直接复用 |
| `enforce: 'pre'` | 在 VitePress 之前处理，避免运行时组件开销 |
| `addWatchFile` | 监听源文件变化，修改组件后文档页自动 HMR 刷新 |

### 插件所在位置

```
docs/.vitepress/
├── config.mts          ← 注册插件: vite.plugins: [apiDocPlugin()]
└── plugins/
    └── api-doc.ts      ← 插件实现
```

## 新增组件文档

假设新增组件 `bt-input`，只需：

1. 按规范编写组件（`bt-input.vue`、`types.ts`），props 加 JSDoc，events 加 JSDoc，slots 加 `@slot` 注释
2. 在 `docs/component/input.md` 中使用标记：



3. **不需要修改插件代码**，插件通过组件名自动定位 `bt-{name}/bt-{name}.vue`
