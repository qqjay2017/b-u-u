import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeArrayProp, makeStringProp } from '../common/props'

export interface ActionSheetAction {
  /** 选项名称 */
  name: string
  /** 描述信息 */
  subname?: string
  /** 选项文字颜色 */
  color?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 额外类名 */
  className?: string
  /** 唯一标识 */
  key?: string | number
  /** 选项 id */
  id?: string | number
  /** 选项类型 */
  type?: string | number
  [field: string]: any
}

export const actionSheetProps = {
  ...baseProps,
  /**
   * 是否显示
   * @default false
   */
  show: makeBooleanProp(false),
  /**
   * 选项列表
   * @default []
   */
  actions: makeArrayProp<ActionSheetAction>(),
  /**
   * 顶部标题
   * @default ''
   */
  title: makeStringProp(''),
  /**
   * 标题下方的描述信息
   * @default ''
   */
  description: makeStringProp(''),
  /**
   * 取消按钮文字，为空时不显示
   * @default '取消'
   */
  cancelText: makeStringProp('取消'),
  /**
   * 点击选项后是否关闭
   * @default false
   */
  closeOnClickAction: makeBooleanProp(false),
  /**
   * 点击遮罩是否关闭
   * @default false
   */
  closeOnClickOverlay: makeBooleanProp(false),
  /**
   * 是否显示圆角
   * @default true
   */
  round: makeBooleanProp(true),
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
