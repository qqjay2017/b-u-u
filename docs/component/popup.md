# Popup 弹出层

从底部弹出的模态层，用于展示内容或接收用户操作。

## 基本用法

通过 `show` 控制弹出层的显隐，监听 `close` 事件来关闭。

```html
<bt-button @click="show = true">打开弹出层</bt-button>
<bt-popup :show="show" @close="show = false">
  <view style="padding: 24px">弹出层内容</view>
</bt-popup>
```

## 圆角

设置 `radius` 属性，可以让内容区域顶部呈现圆角效果。

```html
<bt-popup :show="show" :radius="16" @close="show = false">
  <view style="padding: 24px">圆角 16px</view>
</bt-popup>
```

## 自定义背景色

通过 `background` 属性修改内容区域背景颜色。

```html
<bt-popup :show="show" background="#f5f5f5" @close="show = false">
  <view style="padding: 24px">自定义背景色</view>
</bt-popup>
```

## 自定义遮罩颜色

通过 `mask-background` 属性修改遮罩颜色，支持任意 CSS 颜色值。

```html
<bt-popup :show="show" mask-background="rgba(0,0,0,0.3)" @close="show = false">
  <view style="padding: 24px">浅色遮罩</view>
</bt-popup>
```

## 禁止点击遮罩关闭

设置 `:mask-closable="false"` 后，点击遮罩不会触发 `close` 事件。

```html
<bt-popup :show="show" :mask-closable="false" @close="show = false">
  <view style="padding: 24px">点击遮罩不关闭</view>
</bt-popup>
```

## 无动画

设置 `:anim="false"` 禁用弹出动画。

```html
<bt-popup :show="show" :anim="false" @close="show = false">
  <view style="padding: 24px">无动画</view>
</bt-popup>
```

## 内联模式

设置 `show-content` 为 `true` 时，弹出层以内联方式嵌入页面，不显示遮罩，适合作为布局容器（如车牌键盘的内容区域）。

```html
<bt-popup :show-content="true">
  <view style="padding: 24px">内联嵌入，无遮罩</view>
</bt-popup>
```

<!-- API_START:bt-popup -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示弹出层 | `boolean` | - |
| background | 弹出层内容背景颜色 | `string` | - |
| radius | 弹出层内容圆角 | `number` | - |
| z-index | 弹出层的 z-index | `number` | - |
| mask-closable | 点击遮罩是否可关闭 | `boolean` | - |
| mask-background | 遮罩的背景色 | `string` | - |
| show-content | 是否直接显示内容（不使用弹出模式） | `boolean` | - |
| anim | 是否加入动画效果 | `boolean` | - |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| close |  | - |

## 组件插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default |  | `{}` |

<!-- API_END -->

