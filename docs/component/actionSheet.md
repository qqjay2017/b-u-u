# ActionSheet 动作面板

底部弹出的动作菜单面板，用于提供与当前操作上下文相关的操作选项。

## 基本用法

通过 `v-model:show` 控制面板的显示与隐藏，`actions` 传入选项列表。

```html
<bt-button @click="show = true">打开 ActionSheet</bt-button>
<bt-action-sheet
  v-model:show="show"
  :actions="actions"
  @select="onSelect"
/>
```

```js
const show = ref(false)
const actions = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' },
]
function onSelect(action, index) {
  console.log(action.name, index)
}
```

## 带取消按钮

设置 `cancel-text` 属性，底部将显示取消按钮，点击触发 `cancel` 事件并关闭面板。

```html
<bt-action-sheet
  v-model:show="show"
  :actions="actions"
  cancel-text="取消"
  @cancel="onCancel"
/>
```

## 带标题

设置 `title` 属性显示顶部标题，同时会出现关闭图标。

```html
<bt-action-sheet
  v-model:show="show"
  title="请选择操作"
  :actions="actions"
  cancel-text="取消"
/>
```

## 带描述信息

设置 `description` 属性在标题下方展示描述文字。

```html
<bt-action-sheet
  v-model:show="show"
  title="请选择操作"
  description="这是一段描述信息"
  :actions="actions"
  cancel-text="取消"
/>
```

## 禁用选项

在 `actions` 中设置 `disabled: true` 可禁用对应选项，禁用后颜色变灰且不可点击。

```html
<bt-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" />
```

```js
const actions = [
  { name: '选项一' },
  { name: '禁用选项', disabled: true },
  { name: '选项三' },
]
```

## 加载状态

在 `actions` 中设置 `loading: true` 可让选项显示加载中状态，加载中不可点击。

```js
const actions = [
  { name: '选项一' },
  { name: '加载中', loading: true },
  { name: '选项三' },
]
```

## 自定义颜色

通过 `actions` 中的 `color` 字段自定义选项文字颜色。

```js
const actions = [
  { name: '删除', color: '#ee0a24' },
  { name: '普通操作' },
]
```

## 带子标题

通过 `actions` 中的 `subname` 字段为选项添加描述文字。

```js
const actions = [
  { name: '选项一', subname: '这是描述信息' },
  { name: '选项二', subname: '这是描述信息' },
]
```

## 点击选项关闭

设置 `close-on-click-action` 为 `true`，点击选项后自动关闭面板。

```html
<bt-action-sheet
  v-model:show="show"
  :actions="actions"
  :close-on-click-action="true"
/>
```

## 点击遮罩关闭

设置 `close-on-click-overlay` 为 `true`，点击遮罩层后自动关闭面板。

```html
<bt-action-sheet
  v-model:show="show"
  :actions="actions"
  :close-on-click-overlay="true"
/>
```

## 函数式调用

通过 `showActionSheet` 方法以 Promise 方式调用，需在页面根节点放置 `bt-action-sheet-provider`。

```html
<!-- 放置于页面根节点 -->
<bt-action-sheet-provider />
```

```js
import { showActionSheet } from '@/uni_modules/battery-uniapp-ui/components/bt-action-sheet/action-sheet-observer'

const result = await showActionSheet({
  actions: [{ name: '选项一' }, { name: '选项二' }],
  cancelText: '取消',
})

if (result) {
  console.log('选中了', result.action.name, '索引', result.index)
} else {
  console.log('取消了')
}
```

<!-- API_START:bt-action-sheet -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示 | `boolean` | false |
| actions | 选项列表 | `ActionSheetAction[]` | [] |
| title | 顶部标题 | `string` | '' |
| description | 标题下方的描述信息 | `string` | '' |
| cancel-text | 取消按钮文字，为空时不显示 | `string` | '取消' |
| close-on-click-action | 点击选项后是否关闭 | `boolean` | false |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | false |
| round | 是否显示圆角 | `boolean` | true |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| cancel |  | - |
| open |  | - |
| close |  | - |
| opened |  | - |
| closed |  | - |
| select |  | ActionSheetAction, number |
| update:show |  | boolean |

<!-- API_END -->
