# Section 标题栏

用于在页面中组织标题、说明和局部内容，适合列表区块、统计面板等场景。

## 基础用法

通过 `title` 和 `type` 渲染一个带装饰的标题栏。

```html
<bt-section title="设备概览" type="line" />
```

## 副标题和右侧插槽

通过 `sub-title` 补充说明信息，通过 `right` 插槽放置操作内容。

```html
<bt-section title="电站列表" sub-title="按距离排序" type="circle">
  <template #right>
    <text>更多</text>
  </template>
</bt-section>
```

## 内容区域

默认插槽用于渲染 section 内容。设置 `padding` 后，组件会为内容区增加内边距。

```html
<bt-section title="今日数据" type="square" padding divider>
  <view>内容区</view>
</bt-section>
```

## 自定义装饰

当 `type` 为空时，可通过 `decoration` 插槽完全自定义标题装饰。

```html
<bt-section title="运营播报">
  <template #decoration>
    <view class="custom-dot" />
  </template>
</bt-section>
```

## 自定义标题和副标题

通过 `title`、`subTitle` 插槽可完全接管标题区域。

```html
<bt-section>
  <template #title>
    <view class="custom-heading">服务提醒</view>
  </template>
</bt-section>
```

## 点击事件

点击标题栏会触发 `click` 事件。

```html
<bt-section title="电站列表" @click="handleClick" />
```

## 完整 Demo 源码

<DemoCode src="subPages/section/Index.vue" />

<!-- API_START:bt-section -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 主标题 | `string` | '' |
| type | 标题装饰类型，可选值：line / circle / square | `"" \| SectionType` | '' |
| divider | 是否显示内容区域顶部的分割线 | `boolean` | false |
| padding | 内容区域内边距，传入 true 使用默认内边距，传入字符串可自定义 | `SectionPadding` | false |
| title-font-size | 主标题字号，数字会自动补全为 px | `string \| number` | 16 |
| title-color | 主标题颜色 | `string` | '' |
| sub-title | 副标题 | `string` | '' |
| sub-title-font-size | 副标题字号，数字会自动补全为 px | `string \| number` | 12 |
| sub-title-color | 副标题颜色 | `string` | '' |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click |  | Event |

## 组件插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| decoration |  | `{}` |
| title |  | `{}` |
| subTitle |  | `{}` |
| right |  | `{}` |
| default |  | `{}` |

<!-- API_END -->

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-section-bg` | 组件背景色 | `#ffffff` |
| `--bt-section-radius` | 组件圆角 | `0` |
| `--bt-section-header-padding` | 标题栏内边距 | `12px 16px` |
| `--bt-section-header-min-height` | 标题栏最小高度 | `48px` |
| `--bt-section-decoration-color` | 标题装饰颜色 | `var(--bt-color-theme, #4d80f0)` |
| `--bt-section-line-width` | 线型装饰宽度 | `4px` |
| `--bt-section-line-height` | 线型装饰高度 | `14px` |
| `--bt-section-line-radius` | 线型装饰圆角 | `999px` |
| `--bt-section-point-size` | 点状装饰尺寸 | `8px` |
| `--bt-section-square-radius` | 方块装饰圆角 | `2px` |
| `--bt-section-title-fs` | 标题字号 | `16px` |
| `--bt-section-title-fw` | 标题字重 | `600` |
| `--bt-section-title-color` | 标题颜色 | `#333333` |
| `--bt-section-sub-title-fs` | 副标题字号 | `12px` |
| `--bt-section-sub-title-color` | 副标题颜色 | `#999999` |
| `--bt-section-right-fs` | 右侧区域字号 | `14px` |
| `--bt-section-right-color` | 右侧区域颜色 | `#666666` |
| `--bt-section-body-padding` | 默认内容内边距 | `12px 16px 16px` |
| `--bt-section-body-fs` | 内容字号 | `14px` |
| `--bt-section-body-color` | 内容颜色 | `#333333` |
| `--bt-section-divider-color` | 内容分割线颜色 | `#ebedf0` |
