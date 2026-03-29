import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type UploadImageReturnType = 'array' | 'object'
export type UploadImageStatus = 'ready' | 'uploading' | 'success' | 'error'
export type UploadImageSizeType = 'original' | 'compressed'
export type UploadImageSourceType = 'album' | 'camera'

export interface UploadImageBorderStyle {
  width?: number | string
  radius?: number | string
  style?: string
  color?: string
}

export interface UploadImageStyles {
  width?: number | string | 'auto'
  height?: number | string | 'auto'
  border?: boolean | UploadImageBorderStyle
}

export interface UploadImageMeta {
  width: number
  height: number
  location?: string
}

export interface ChooseAndUploadTempFile {
  name?: string
  path: string
  size: number
  type?: string
  fileType?: string
  cloudPath?: string
  thumbTempFilePath?: string
  uuid?: string
  provider?: string
  [key: string]: any
}

export interface ChooseAndUploadResult {
  errMsg: string
  tempFilePaths: string[]
  tempFiles: ChooseAndUploadTempFile[]
}

export interface UploadImageFile {
  name: string
  extname: string
  fileType: string
  path: string
  url: string
  size: number
  image?: UploadImageMeta
  fileID?: string
  cloudPath?: string
  uuid: string
  status: UploadImageStatus
  progress: number
  errMsg?: string
  provider?: string
  file?: ChooseAndUploadTempFile
}

export interface UploadImageSelectEvent {
  tempFiles: UploadImageFile[]
  tempFilePaths: string[]
}

export interface UploadImageProgressEvent {
  index: number
  progress: number
  tempFile: UploadImageFile
}

export interface UploadImageDeleteEvent {
  index: number
  tempFile: UploadImageFile
  tempFilePath: string
}

export type UploadImageModelValue = UploadImageFile[] | UploadImageFile | null | undefined

export const uploadImageProps = {
  ...baseProps,
  /** 绑定值 */
  modelValue: {
    type: [Array, Object] as unknown as PropType<UploadImageModelValue>,
    default: undefined
  },
  /** 兼容旧版 value 写法 */
  value: {
    type: [Array, Object] as unknown as PropType<UploadImageModelValue>,
    default: undefined
  },
  /** 组件标题 */
  title: makeStringProp(''),
  /** 是否禁用 */
  disabled: makeBooleanProp(false),
  /** 是否只读 */
  readonly: makeBooleanProp(false),
  /** 是否禁用图片预览 */
  disablePreview: makeBooleanProp(false),
  /** 是否显示删除按钮 */
  delIcon: makeBooleanProp(true),
  /** 是否自动上传 */
  autoUpload: makeBooleanProp(true),
  /** 最大上传数量 */
  limit: {
    type: [Number, String] as PropType<number | string>,
    default: 9
  },
  /** 返回值类型 */
  returnType: makeStringProp<UploadImageReturnType>('array'),
  /** 图片宫格样式 */
  imageStyles: {
    type: Object as PropType<UploadImageStyles>,
    default: () => ({
      width: 'auto',
      height: 'auto',
      border: {}
    })
  },
  /** 文件后缀白名单 */
  fileExtname: {
    type: [Array, String] as unknown as PropType<string[] | string>,
    default: () => []
  },
  /** 图片压缩类型 */
  sizeType: {
    type: Array as PropType<UploadImageSizeType[]>,
    default: () => ['original', 'compressed']
  },
  /** 图片来源 */
  sourceType: {
    type: Array as PropType<UploadImageSourceType[]>,
    default: () => ['album', 'camera']
  },
  /** 上传目录前缀 */
  dir: makeStringProp(''),
  /** 服务商标识，会透传到文件元数据中 */
  provider: makeStringProp('')
}

export type UploadImageProps = ExtractPropTypes<typeof uploadImageProps>
export type UploadImageInstance = ComponentPublicInstance<UploadImageProps>
