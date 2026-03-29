import type { ExtractPropTypes, ComponentPublicInstance } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

/** 标签类型 */
export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'error'

/** 标签尺寸，`normal` 为历史兼容别名 */
export type TagSize = 'small' | 'medium' | 'mini' | 'normal'

export const tagProps = {
  ...baseProps,
  /** 标签内容 */
  text: makeStringProp(''),
  /** 标签类型 */
  type: makeStringProp<TagType>('default'),
  /** 标签尺寸 */
  size: makeStringProp<TagSize>('medium'),
  /** 是否禁用 */
  disabled: makeBooleanProp(false),
  /** 是否为空心样式 */
  inverted: makeBooleanProp(false),
  /** 是否为圆角样式 */
  circle: makeBooleanProp(false),
  /** 是否为标记样式 */
  mark: makeBooleanProp(false)
}

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagInstance = ComponentPublicInstance<TagProps>
