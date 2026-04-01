# Toast 轻提示

常用于操作后的反馈提示，支持纯文字、成功、错误、信息等状态。

## 基本用法

在页面根节点放置 `bt-toast-observer`，然后通过 `showToast` 实例方法调用。

```html
<bt-toast-observer>
  <!-- 页面内容 -->
</bt-toast-observer>
```

```ts
import { showToast } from '@/uni_modules/battery-uniapp-ui/components/bt-toast/bt-toast-utils'

showToast.message('这是一条提示')
```

## 纯文字提示

调用 `showToast.message()` 显示纯文字提示，不带图标。多次调用会累加显示多条消息，每条消息独立在 1.5 秒后自动消失。

```ts
showToast.message('这是一条纯文字提示')
```

## 成功提示

调用 `showToast.success()` 显示成功图标和提示文字。带图标状态的调用会清除之前的所有消息，只展示当前内容。

```ts
showToast.success('操作成功')
```

## 错误提示

```ts
showToast.error('操作失败')
```

## 信息提示

```ts
showToast.info('这是一条信息提示')
```

## 多条文字累加

纯文字模式下（`message()`），连续多次调用会累加显示所有消息，每条在 1.5 秒后独立消失。

```ts
showToast.message('第一条消息')
setTimeout(() => showToast.message('第二条消息'), 300)
setTimeout(() => showToast.message('第三条消息'), 600)
```

## 自定义时长

所有方法都支持第二个参数指定展示时长（ms），默认 1500ms。

```ts
showToast.success('我会显示 5 秒', 5000)
```

## 完整示例

<DemoCode src="subPages/toast/Index.vue" />

## API

### showToast 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| message | 纯文字提示，无图标，多次调用累加 | `(msg: string, duration?: number)` |
| success | 成功提示，带 ✓ 图标，清除旧消息 | `(msg: string, duration?: number)` |
| error | 错误提示，带 ✕ 图标，清除旧消息 | `(msg: string, duration?: number)` |
| info | 信息提示，带 i 图标，清除旧消息 | `(msg: string, duration?: number)` |

### BtToast 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 当前状态 | `'success' \| 'error' \| 'info' \| ''` | `''` |
| messages | 展示的消息列表 | `string[]` | `[]` |
| customStyle | 自定义根节点样式 | `string` | `''` |
| customClass | 自定义根节点样式类 | `string` | `''` |

### 行为说明

| 场景 | 行为 |
| --- | --- |
| 调用带图标方法 (`success` / `error` / `info` / `loading`) | 清除所有旧消息和定时器，只展示当前图标 + 消息 |
| 调用 `message()` | 累加一条消息，1.5s 后该条消息独立消失 |
| 自定义时长 | 所有方法第二个参数可传 `duration`（ms） |
