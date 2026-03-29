# Tabs 标签页

用于在不同的内容区域之间进行切换。

## 基本用法

通过 `v-model` 绑定当前选中项的下标，`tabs` 传入字符串数组。

```html
<bt-tabs v-model="activeTab" :tabs="tabs" />
```

```ts
const tabs = ['全部', '进行中', '已完成', '已取消']
const activeTab = ref(0)
```

## 胶囊样式

设置 `type="pills"` 使用胶囊形状的指示器。

```html
<bt-tabs v-model="activeTab" :tabs="tabs" type="pills" />
```

## 选中加粗

设置 `bold` 属性，选中项文字加粗显示。

```html
<bt-tabs v-model="activeTab" :tabs="tabs" bold />
```

## 可滚动

默认开启滚动（`scroll` 默认为 `true`），tab 过多时自动横向滚动，并将选中项居中显示。

```html
<bt-tabs v-model="activeTab" :tabs="manyTabs" />
```

## 下划线宽度

`line-scale` 控制下划线宽度相对于选项宽度的比例，默认 `0.5`，设为 `1` 则与选项等宽。

```html
<bt-tabs v-model="activeTab" :tabs="tabs" :line-scale="1" />
```

## 禁用切换动画

设置 `:animated="false"` 禁用指示器滑动动画。

```html
<bt-tabs v-model="activeTab" :tabs="tabs" :animated="false" />
```

## 对象数组

`tabs` 支持对象数组，通过 `field` 指定用于显示的字段名。可在对象中设置 `disabled: true` 禁用某项。

```html
<bt-tabs v-model="activeTab" :tabs="tabsObj" field="label" />
```

```ts
const tabsObj = [
  { label: '待付款', value: 0 },
  { label: '待发货', value: 1, disabled: true },
  { label: '待收货', value: 2 },
]
```

## 固定在顶部

设置 `fixed` 属性，标签栏将固定在页面顶部，并自动生成等高占位符。

```html
<bt-tabs v-model="activeTab" :tabs="tabs" fixed :z-index="100" />
```

## 自定义插槽

通过默认插槽自定义每个选项的内容，插槽 props 包含 `row`（当前项数据）和 `index`（下标）。

```html
<bt-tabs v-model="activeTab" :tabs="tabs">
  <template #default="{ row, index }">
    <view class="custom-item">{{ row }}</view>
  </template>
</bt-tabs>
```

<!-- API_START:bt-tabs -->

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前选中项下标 | `number` | 0 |
| tabs | 选项卡列表，支持字符串数组或对象数组 | `Array<string \| object>` | [] |
| field | 对象数组时，用于显示的字段名 | `string` | - |
| type | 指示器类型，可选值：`line` / `pills` | `TabsType` | line |
| scroll | 是否可横向滚动 | `boolean` | true |
| bold | 选中文字是否加粗 | `boolean` | false |
| fixed | 是否固定在页面顶部 | `boolean` | false |
| line-scale | 下划线宽度与选项宽度的比例 | `number` | 0.5 |
| animated | 是否开启指示器切换动画 | `boolean` | true |
| z-index | 固定定位时的 z-index | `number` | 1993 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中项变化时触发 | `index: number` |
| change | 切换选项卡时触发 | `index: number` |

<!-- API_END -->

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点内联样式 |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义选项卡内容 | `{ row: string \| object, index: number }` |



## 主题变量


| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-tabs-height` | 选项卡高度 | `80rpx` |
| `--bt-tabs-bg` | 选项卡背景色 | `#ffffff` |
| `--bt-tabs-color` | 选项卡文字颜色 | `#333333` |
| `--bt-tabs-active-color` | 选中项文字颜色 | `#4d80f0` |
| `--bt-tabs-fs` | 选项卡字体大小 | `28rpx` |
| `--bt-tabs-item-padding` | 选项卡项内边距 | `0 22rpx` |
| `--bt-tabs-line-color` | 下划线颜色 | `#4d80f0` |
| `--bt-tabs-line-height` | 下划线高度 | `6rpx` |
| `--bt-tabs-line-radius` | 下划线圆角 | `6rpx` |
| `--bt-tabs-pills-bg` | 胶囊指示器背景色 | `#4d80f0` |
| `--bt-tabs-pills-radius` | 胶囊指示器圆角 | `10rpx` |
| `--bt-tabs-disabled-opacity` | 禁用项透明度 | `0.5` |

