# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type` 属性设置按钮类型。

```vue
<bt-button>默认按钮</bt-button>
<bt-button type="primary">主要按钮</bt-button>
<bt-button type="success">成功按钮</bt-button>
<bt-button type="warning">警告按钮</bt-button>
<bt-button type="danger">危险按钮</bt-button>
<bt-button type="info">信息按钮</bt-button>
```

## 朴素按钮

设置 `plain` 属性后，按钮为朴素样式（镂空）。

```vue
<bt-button type="primary" plain>主要按钮</bt-button>
<bt-button type="success" plain>成功按钮</bt-button>
<bt-button type="danger" plain>危险按钮</bt-button>
```

## 按钮尺寸

通过 `size` 属性设置按钮大小，可选值为 `small`、`medium`（默认）、`large`。

```vue
<bt-button type="primary" size="large">大型按钮</bt-button>
<bt-button type="primary" size="medium">中型按钮</bt-button>
<bt-button type="primary" size="small">小型按钮</bt-button>
```

## 圆角按钮

设置 `round` 属性后，按钮为圆角样式。

```vue
<bt-button type="primary" round>圆角按钮</bt-button>
```

## 禁用状态

设置 `disabled` 属性后，按钮不可点击。

```vue
<bt-button disabled>禁用按钮</bt-button>
<bt-button type="primary" disabled>禁用按钮</bt-button>
```

## 加载状态

设置 `loading` 属性后，按钮展示加载动画。

```vue
<bt-button type="primary" loading>加载中</bt-button>
```

## 块级按钮

设置 `block` 属性后，按钮宽度为父容器的 100%。

```vue
<bt-button type="primary" block>块级按钮</bt-button>
```

## API

<ApiDoc component="bt-button" />

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-button-height-small` | 小尺寸高度 | `56rpx` |
| `--bt-button-height-medium` | 中尺寸高度 | `72rpx` |
| `--bt-button-height-large` | 大尺寸高度 | `88rpx` |
| `--bt-button-radius` | 圆角大小 | `8rpx` |
| `--bt-button-default-bg` | 默认背景色 | `#f5f5f5` |
| `--bt-button-default-color` | 默认文字色 | `#333333` |
| `--bt-button-disabled-opacity` | 禁用透明度 | `0.5` |
