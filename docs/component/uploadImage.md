# UploadImage 图片上传

用于图片选择、预览、删除以及基于 `uniCloud` 的上传。

## 使用前提

组件本身支持本地选择和回显。

开启上传能力时，需要运行环境提供：

```ts
uniCloud.uploadFile
uniCloud.getTempFileURL
```

若当前环境未接入 `uniCloud`，组件仍可正常选择和预览图片，但不会真正上传。

## 基础用法

通过 `v-model` 绑定图片列表，默认选择后自动上传。

```html
<bt-upload-image v-model="images" title="上传凭证" />
```

```ts
const images = ref([])
```

## 单图模式

设置 `return-type="object"` 或 `:limit="1"` 时，组件会按单图模式工作。

```html
<bt-upload-image v-model="cover" return-type="object" :limit="1" title="封面图" />
```

## 手动上传

设置 `:auto-upload="false"` 后，选择完成不会自动上传，可通过组件实例手动触发。

```html
<bt-upload-image ref="uploader" v-model="images" :auto-upload="false" />
<bt-button @click="uploader?.upload()">开始上传</bt-button>
```

## 只读模式

设置 `readonly` 可用于图片回显。

```html
<bt-upload-image v-model="images" readonly title="已上传图片" />
```

## 禁用预览

设置 `disable-preview` 后点击图片不会打开预览。单图模式下，点击已有图片会直接重新选择。

```html
<bt-upload-image v-model="cover" :limit="1" disable-preview />
```

## 自定义宫格样式

通过 `image-styles` 调整宫格尺寸和边框。

```html
<bt-upload-image
  v-model="images"
  :image-styles="{ width: 140, height: 96, border: { radius: 12, color: '#d7deeb' } }"
/>
```

## 事件

组件会在选择、上传进度、上传成功、上传失败、删除时分别触发 `select`、`progress`、`success`、`fail`、`delete` 事件。

## 完整 Demo 源码

<DemoCode src="subPages/uploadImage/Index.vue" />

<!-- API_START:bt-upload-image -->

## 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 组件标题 | `string` | - |
| disabled | 是否禁用 | `boolean` | - |
| model-value | 绑定值 | `UploadImageModelValue` | undefined |
| value | 兼容旧版 value 写法 | `UploadImageModelValue` | undefined |
| readonly | 是否只读 | `boolean` | - |
| disable-preview | 是否禁用图片预览 | `boolean` | - |
| del-icon | 是否显示删除按钮 | `boolean` | - |
| auto-upload | 是否自动上传 | `boolean` | - |
| limit | 最大上传数量 | `string \| number` | 9 |
| return-type | 返回值类型 | `UploadImageReturnType` | - |
| image-styles | 图片宫格样式 | `UploadImageStyles` | {     width: 'auto',     height: 'auto',     border: {} } |
| file-extname | 文件后缀白名单 | `string \| string[]` | [] |
| size-type | 图片压缩类型 | `UploadImageSizeType[]` | ['original', 'compressed'] |
| source-type | 图片来源 | `UploadImageSourceType[]` | ['album', 'camera'] |
| dir | 上传目录前缀 | `string` | - |
| provider | 服务商标识，会透传到文件元数据中 | `string` | - |

## 组件事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| select |  | UploadImageSelectEvent |
| success |  | UploadImageSelectEvent |
| update:modelValue |  | UploadImageModelValue |
| input |  | UploadImageModelValue |
| progress |  | UploadImageProgressEvent |
| fail |  | UploadImageSelectEvent |
| delete |  | UploadImageDeleteEvent |

## 组件插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default |  | `{}` |

<!-- API_END -->

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--bt-upload-image-gap` | 宫格间距 | `10rpx` |
| `--bt-upload-image-radius` | 宫格圆角 | `10px` |
| `--bt-upload-image-bg` | 宫格背景色 | `#ffffff` |
| `--bt-upload-image-border-color` | 宫格边框色 | `#e5e7eb` |
| `--bt-upload-image-add-bg` | 新增按钮背景色 | `#f7f8fa` |
| `--bt-upload-image-add-icon-color` | 新增图标颜色 | `#c0c4cc` |
| `--bt-upload-image-delete-size` | 删除按钮尺寸 | `36rpx` |
| `--bt-upload-image-delete-bg` | 删除按钮背景色 | `rgba(0, 0, 0, 0.45)` |
| `--bt-upload-image-delete-color` | 删除按钮颜色 | `#ffffff` |
| `--bt-upload-image-mask-bg` | 失败遮罩背景色 | `rgba(0, 0, 0, 0.42)` |
| `--bt-upload-image-mask-color` | 失败遮罩文字颜色 | `#ffffff` |
| `--bt-upload-image-title-color` | 标题颜色 | `#333333` |
| `--bt-upload-image-count-color` | 计数颜色 | `#999999` |
