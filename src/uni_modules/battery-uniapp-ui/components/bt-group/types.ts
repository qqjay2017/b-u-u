import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

/** 分组容器模式 */
export type GroupMode = 'default' | 'card'

/** 分组内容内边距 */
export type GroupPadding = boolean | string

export const groupProps = {
  ...baseProps,
  /**
   * 分组标题
   * @default ''
   */
  title: makeStringProp(''),
  /**
   * 分组模式，可选值：default / card
   * @default default
   */
  mode: makeStringProp<GroupMode>('default'),
  /**
   * 顶部外边距，数字会自动补全为 px
   * @default 10
   */
  top: {
    type: [String, Number] as PropType<string | number>,
    default: 10
  },
  /**
   * 是否显示标题和内容之间的分割线
   * @default false
   */
  divider: makeBooleanProp(false),
  /**
   * 内容区域内边距，传入 true 使用默认内边距，传入字符串可自定义
   * @default true
   */
  padding: {
    type: [Boolean, String] as PropType<GroupPadding>,
    default: true
  }
}

export type GroupProps = ExtractPropTypes<typeof groupProps>
export type GroupInstance = ComponentPublicInstance<GroupProps>
