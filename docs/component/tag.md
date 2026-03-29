# Tag 标签

用于展示简短状态、分类或提示信息。

## 基本用法

通过 `text` 设置标签内容，也可以监听 `click` 事件。

```html
<bt-tag text="默认标签" />
<bt-tag text="主题标签" type="primary" @click="handleClick" />
<bt-tag text="成功标签" type="success" />
```

## 不同尺寸

`size` 支持 `small`、`medium`、`mini`，其中 `normal` 仍可作为历史兼容别名使用。

```html
<bt-tag text="Small" size="small" />
<bt-tag text="Medium" size="medium" />
<bt-tag text="Mini" size="mini" />
```

## 空心样式

设置 `inverted` 属性后，标签会变为空心风格。

```html
<bt-tag text="默认空心" inverted />
<bt-tag text="主题空心" type="primary" inverted />
```

## 圆角和标记样式

设置 `circle` 可切换为圆角标签，设置 `mark` 可切换为标记样式。

```html
<bt-tag text="圆角标签" type="primary" circle />
<bt-tag text="标记标签" type="warning" mark />
```

## 禁用状态

设置 `disabled` 后，标签不可点击并降低透明度。

```html
<bt-tag text="默认禁用" disabled />
<bt-tag text="主题禁用" type="primary" disabled />
```

## 插槽内容

标签支持默认插槽，自定义内容时会优先渲染插槽。

```html
<bt-tag type="primary" circle>
  <text>消息 12</text>
</bt-tag>
```

## 自定义样式

通过 `custom-class` 和 `custom-style` 可以自定义标签表现。

```html
<bt-tag text="渐变标签" custom-class="tag-gradient" />
<bt-tag text="深色标签" custom-style="background:#222;color:#fff;border-color:#222;" />
```

## 完整 Demo 源码

<DemoCode src="subPages/tag/Index.vue" />

<!-- API_START:bt-tag -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型 | `TagType` | - |
| text | 标签内容 | `string` | - |
| disabled | 是否禁用 | `boolean` | - |
| size | 标签尺寸 | `TagSize` | - |
| circle | 是否为圆角样式 | `boolean` | - |
| inverted | 是否为空心样式 | `boolean` | - |
| mark | 是否为标记样式 | `boolean` | - |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click |  | Event |

## 组件插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default |  | `{}` |

<!-- API_END -->

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-tag-line-height` | 标签行高 | `1.2` |
| `--bt-tag-font-weight` | 标签字重 | `400` |
| `--bt-tag-radius` | 默认圆角 | `4px` |
| `--bt-tag-small-radius` | 小尺寸圆角 | `3px` |
| `--bt-tag-mini-radius` | 迷你尺寸圆角 | `3px` |
| `--bt-tag-circle-radius` | 圆角标签圆角 | `999px` |
| `--bt-tag-disabled-opacity` | 禁用透明度 | `0.5` |
| `--bt-tag-medium-padding` | 默认内边距 | `4px 7px` |
| `--bt-tag-small-padding` | 小尺寸内边距 | `2px 5px` |
| `--bt-tag-mini-padding` | 迷你尺寸内边距 | `1px 3px` |
| `--bt-tag-medium-fs` | 默认字号 | `12px` |
| `--bt-tag-small-fs` | 小尺寸字号 | `12px` |
| `--bt-tag-mini-fs` | 迷你尺寸字号 | `12px` |
| `--bt-tag-default-color` | 默认文字颜色 | `#fff` |
| `--bt-tag-default-bg` | 默认背景色 | `var(--bt-color-info, #909399)` |
| `--bt-tag-primary-bg` | 主题背景色 | `var(--bt-color-theme, #4d80f0)` |
| `--bt-tag-success-bg` | 成功背景色 | `var(--bt-color-success, #34d19d)` |
| `--bt-tag-warning-bg` | 警告背景色 | `var(--bt-color-warning, #f0883a)` |
| `--bt-tag-error-bg` | 危险背景色 | `var(--bt-color-danger, #fa4350)` |
| `--bt-tag-inverted-bg` | 空心标签背景色 | `transparent` |
