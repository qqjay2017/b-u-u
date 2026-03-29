import type { ExtractPropTypes, ComponentPublicInstance } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, makeNumericProp } from '../common/props'

export const popupProps = {
  ...baseProps,
  /** 是否显示弹出层 */
  show: makeBooleanProp(false),
  /** 弹出层内容背景颜色 */
  background: makeStringProp('#ffffff'),
  /** 弹出层内容圆角 */
  radius: makeNumericProp(0),
  /** 弹出层的 z-index */
  zIndex: makeNumericProp(1992),
  /** 点击遮罩是否可关闭 */
  maskClosable: makeBooleanProp(true),
  /** 遮罩的背景色 */
  maskBackground: makeStringProp('rgba(0,0,0,0.6)'),
  /** 是否直接显示内容（不使用弹出模式） */
  showContent: makeBooleanProp(false),
  /** 是否加入动画效果 */
  anim: makeBooleanProp(true),
}

export type PopupProps = ExtractPropTypes<typeof popupProps>

export type PopupInstance = ComponentPublicInstance<PopupProps>
