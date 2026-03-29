# VehicleKeyboard 车牌键盘

专用于车牌号输入的键盘组件，包含省份/字母数字/特殊字符三种键盘模式，并自带输入框展示。

## 基本用法

通过 `ref` 调用 `toShow` 方法弹出键盘，监听 `confirm` 事件获取最终值。`bt-vehicle-input` 负责展示输入框格子，点击格子时传入当前位置，触发对应位置的键盘弹出。

```html
<bt-vehicle-input ref="inputRef" @change="openKeyboard" />
<bt-vehicle-keyboard ref="keyboardRef" @confirm="handleConfirm" />
```

```ts
const value = ref('')
const inputRef = ref<VehicleInputInstance>()
const keyboardRef = ref<VehicleKeyboardInstance>()

function handleConfirm(v: string) {
  value.value = v
  inputRef.value?.changeValue(v)
}

function openKeyboard(pos: number) {
  keyboardRef.value?.toShow(value.value, pos)
}
```

## 带标题

通过 `title` 属性在键盘顶部显示标题文字。

```html
<bt-vehicle-keyboard ref="keyboardRef" title="请输入车牌号" @confirm="handleConfirm" />
```

## 自定义键盘模式

设置 `type="custom"` 时，键盘固定显示字母+数字键盘（不显示省份切换按钮），适合非标准车牌场景（如工程车、临牌等）。

```html
<bt-vehicle-input ref="inputRef" :show-pointer="false" @change="openKeyboard" />
<bt-vehicle-keyboard ref="keyboardRef" type="custom" @confirm="handleConfirm" />
```

## 预填值

通过 `bt-vehicle-input` 的 `init-value` 设置初始显示值，`toShow` 方法的第一个参数传入当前值，键盘将从已有内容继续编辑。

```html
<bt-vehicle-input ref="inputRef" init-value="沪A12345" @change="openKeyboard" />
<bt-vehicle-keyboard ref="keyboardRef" @confirm="handleConfirm" />
```

## 光标显示

设置 `cursor` 属性，当前聚焦格子为空时显示闪烁光标。

```html
<bt-vehicle-input ref="inputRef" cursor @change="openKeyboard" />
```

## 震动反馈

设置 `vibration` 属性，按键时触发设备震动（需平台支持）。

```html
<bt-vehicle-keyboard ref="keyboardRef" vibration @confirm="handleConfirm" />
```

## 内联模式

设置 `show-content` 为 `true` 时，键盘直接嵌入页面布局，不以弹出层形式展示，适合页面内固定显示键盘的场景。

```html
<bt-vehicle-input ref="inputRef" @change="openKeyboard" />
<bt-vehicle-keyboard ref="keyboardRef" :show-content="true" @confirm="handleConfirm" />
```

<!-- API_START:bt-vehicle-keyboard -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| type | 键盘类型 | `VehicleKeyboardType` | - |
| show-content | 是否直接显示内容（嵌入模式） | `boolean` | - |
| anim | 是否加入动画效果 | `boolean` | - |
| cursor | 是否显示光标 | `boolean` | - |
| vibration | 是否开启震动效果 | `boolean` | - |
| max | 最大输入长度 | `number` | - |
| disable | 禁用某些按键 | `string` | '' |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| cancel |  | - |
| confirm |  | string |

<!-- API_END -->


<!-- API_START:bt-vehicle-input -->

## Attributes（bt-vehicle-input）

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| init-value | 初始输入值 | `string` | - |
| max | 最大输入长度 | `number` | 8 |
| cursor | 当前格子为空时是否显示光标 | `boolean` | false |
| show-pointer | 是否显示新能源第8位标识（虚线框） | `boolean` | true |
| max-size | 每个格子的最大尺寸（px） | `number` | 40 |
| align | 格子对齐方式，同 CSS justify-content | `string` | center |

## Events（bt-vehicle-input）

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 当前聚焦格子变化时触发 | `pos: number` |

## Methods（bt-vehicle-keyboard）

通过 `ref` 调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| toShow | 显示键盘，可传入当前值和光标位置 | `(value?: string, pos?: number) => void` |

## Methods（bt-vehicle-input）

通过 `ref` 调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| getValues | 获取当前输入的值数组 | `() => string[]` |
| changeValue | 设置值和光标位置 | `(v: string, pos?: number) => void` |
| toAdd | 在当前位置添加一个字符 | `(v: string) => void` |
| toDel | 删除当前位置的字符 | `() => void` |
| toClear | 清空所有输入 | `() => void` |

<!-- API_END -->




## 车牌输入框 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-vehicle-input-active-bg` | 当前选中格背景色 | `rgba(0, 73, 255, 0.03)` |
| `--bt-vehicle-input-energy-border` | 新能源位边框色 | `#4dc790` |
| `--bt-vehicle-input-energy-bg` | 新能源位背景色 | `#e9faf2` |
| `--bt-vehicle-input-energy-color` | 新能源位文字色 | `#28cd80` |

## 车牌键盘 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-keyboard-bg` | 键盘背景色 | `#d4d5d9` |
| `--bt-keyboard-key-bg` | 按键背景色 | `#fff` |
| `--bt-keyboard-key-color` | 按键文字色 | `#000` |
| `--bt-keyboard-key-disabled-bg` | 禁用按键背景色 | `#bdbec3` |
| `--bt-keyboard-btn-bg` | 功能按钮背景色 | `#b6bcc4` |