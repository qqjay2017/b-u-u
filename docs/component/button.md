# Button 按钮

按钮用于触发一个操作，如提交表单或打开链接。


## 基本用法

基本按钮。

```html
<bt-button>主要按钮</bt-button>
<bt-button type="success">成功按钮</bt-button>
<bt-button type="info">信息按钮</bt-button>
<bt-button type="warning">警告按钮</bt-button>
<bt-button type="error">危险按钮</bt-button>
```

## 禁用

设置 `disabled` 属性。

```html
<bt-button disabled>默认按钮</bt-button>
```

## 幽灵按钮

设置 `plain` 属性。

```html
<bt-button plain>主要按钮</bt-button>
```

## 细边框幽灵按钮

设置 `hairline` 属性。

```html
<bt-button plain hairline>主要按钮</bt-button>
```

## 按钮大小

设置 `size` ，支持 'small'、'medium'、'large'，默认为 'medium'。

```html
<bt-button size="small">小号按钮</bt-button>
<bt-button size="medium">中号按钮</bt-button>
<bt-button size="large">大号按钮</bt-button>
```

## 加载中按钮

设置 `loading` 属性，让按钮处于加载中状态。加载中的按钮是禁止点击的。

```html
<bt-button loading>加载中</bt-button>
```

## 文字按钮

将 `type` 设置为 `text`。文字按钮不支持其他颜色。

```html
<bt-button type="text">文字按钮</bt-button>
```

## 图标按钮

将 `type` 设置为 `icon`，同时设置 `icon` 属性，icon 为图标的类名，可以直接使用 `Icon 图标` 章节中的图标类名。

```html
<bt-button type="icon" icon="picture"></bt-button>
```

## 带图标的按钮

设置 `icon` 属性，不需要设置 `type` 为 `icon`，即可以直接使用带图标的按钮。

```html
<bt-button icon="edit-outline"></bt-button>
```

结合`classPrefix`可以使用自定义图标。

```html
<bt-button classPrefix="fish" icon="kehuishouwu">可回收</bt-button>
```

## 块状按钮

设置 `block` 属性。

```html
<bt-button block>主要按钮</bt-button>
```

## 自定义样式

通过 `custom-class` 和 `custom-style` 属性可以自定义按钮的样式，这里我们使用`custom-class`给按钮添加一个 `Material Design 3` 风格的`box-shadow`。

```html
<view class="page-class">
  <bt-button custom-class="custom-shadow">主要按钮</bt-button>
  <bt-button type="success" custom-class="custom-shadow">成功按钮</bt-button>
  <bt-button type="info" custom-class="custom-shadow">信息按钮</bt-button>
  <bt-button type="warning" custom-class="custom-shadow">警告按钮</bt-button>
  <bt-button type="error" custom-class="custom-shadow">危险按钮</bt-button>
</view>
```

```scss
.page-class {
  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
}
```

<!-- API_START:bt-button -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| round | 圆角按钮 | `boolean` | true |
| type | 按钮类型，可选值：primary / success / info / warning / error / text / icon | `ButtonType` | primary |
| plain | 幽灵按钮 | `boolean` | false |
| disabled | 禁用按钮 | `boolean` | false |
| hairline | 是否细边框 | `boolean` | false |
| block | 块状按钮 | `boolean` | false |
| size | 按钮尺寸，可选值：small / medium / large | `ButtonSize` | medium |
| class-prefix | 类名前缀，用于使用自定义图标，用法参考Icon组件 | `string` | wd-icon |
| loading | 加载中按钮 | `boolean` | false |
| hover-stop-propagation | 指定是否阻止本节点的祖先节点出现点击态 | `boolean` | - |
| show-message-card | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | `boolean` | - |
| icon | 图标类名 | `string` | - |
| loading-color | 加载图标颜色 | `string` | - |
| open-type | 开放能力 | `ButtonOpenType` | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 | `ButtonLang` | - |
| session-from | 会话来源，open-type="contact"时有效 | `string` | - |
| send-message-title | 会话内消息卡片标题，open-type="contact"时有效 | `string` | - |
| send-message-path | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 | `string` | - |
| send-message-img | 会话内消息卡片图片，open-type="contact"时有效 | `string` | - |
| app-parameter | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 | `string` | - |
| button-id | 按钮的唯一标识，可用于设置隐私同意授权按钮的id | `string` | - |
| scope | 支付宝小程序，当 open-type 为 getAuthorize 时有效。 可选值：'phoneNumber' | 'userInfo' | `ButtonScope` | - |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click |  | any |
| getuserinfo |  | any |
| contact |  | any |
| getphonenumber |  | any |
| getrealtimephonenumber |  | any |
| error |  | any |
| launchapp |  | any |
| opensetting |  | any |
| chooseavatar |  | any |
| agreeprivacyauthorization |  | any |

## 组件插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default |  | `{}` |

<!-- API_END -->
