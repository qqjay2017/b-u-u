# Group 分组

用于承载一组相关内容，可用于表单、信息块、统计卡片等场景。

## 基础用法

通过 `title` 设置分组标题，默认内容区域带有内边距。

```html
<bt-group title="基础信息">
  <view>这里放分组内容</view>
</bt-group>
```

## 卡片模式

设置 `mode="card"` 后，组件会采用卡片式圆角和阴影样式。

```html
<bt-group title="电池工单" mode="card">
  <view>卡片内容</view>
</bt-group>
```

## 分割线

设置 `divider` 可以在标题栏和内容区之间显示分割线。

```html
<bt-group title="充电记录" divider>
  <view>内容区</view>
</bt-group>
```

## 内容内边距

`padding` 支持三种写法：

- `true`：使用默认内边距
- `false`：移除默认内边距
- 自定义字符串：使用指定内边距

```html
<bt-group title="无内边距" :padding="false">
  <image src="/static/icon/app.png" />
</bt-group>

<bt-group title="自定义内边距" padding="20px 24px">
  <view>内容区</view>
</bt-group>
```

## 标题插槽和右侧插槽

通过 `title` 插槽可以完全接管标题区域，通过 `right` 插槽补充右侧操作区。

```html
<bt-group mode="card">
  <template #title>
    <view class="custom-title">
      <text>服务状态</text>
    </view>
  </template>

  <template #right>
    <text>查看全部</text>
  </template>
</bt-group>
```

## 点击事件

点击标题栏会触发 `click` 事件。

```html
<bt-group title="充电记录" @click="handleClick">
  <view>内容区</view>
</bt-group>
```

## 完整 Demo 源码

<DemoCode src="subPages/group/Index.vue" />

<!-- API_START:bt-group -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | `string` | '' |
| mode | 分组模式，可选值：default / card | `GroupMode` | default |
| top | 顶部外边距，数字会自动补全为 px | `string \| number` | 10 |
| divider | 是否显示标题和内容之间的分割线 | `boolean` | false |
| padding | 内容区域内边距，传入 true 使用默认内边距，传入字符串可自定义 | `GroupPadding` | true |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click |  | Event |

## 组件插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| title |  | `{}` |
| right |  | `{}` |
| default |  | `{}` |

<!-- API_END -->

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-group-bg` | 分组背景色 | `#ffffff` |
| `--bt-group-radius` | 默认圆角 | `0` |
| `--bt-group-header-bg` | 标题栏背景色 | `#f7f8fa` |
| `--bt-group-header-padding` | 标题栏内边距 | `12px 16px` |
| `--bt-group-header-min-height` | 标题栏最小高度 | `44px` |
| `--bt-group-title-fs` | 标题字号 | `14px` |
| `--bt-group-title-fw` | 标题字重 | `500` |
| `--bt-group-title-color` | 标题颜色 | `#333333` |
| `--bt-group-right-fs` | 右侧区域字号 | `13px` |
| `--bt-group-right-color` | 右侧区域颜色 | `#999999` |
| `--bt-group-divider-color` | 分割线颜色 | `#ebedf0` |
| `--bt-group-content-padding` | 默认内容内边距 | `16px` |
| `--bt-group-content-color` | 内容文字颜色 | `#333333` |
| `--bt-group-content-fs` | 内容字号 | `14px` |
| `--bt-group-card-side-margin` | 卡片模式左右外边距 | `10px` |
| `--bt-group-card-radius` | 卡片模式圆角 | `8px` |
| `--bt-group-card-shadow` | 卡片模式阴影 | `0 6px 18px rgba(0, 0, 0, 0.06)` |
