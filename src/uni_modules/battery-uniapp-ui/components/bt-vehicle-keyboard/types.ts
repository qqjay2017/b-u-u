import type { ExtractPropTypes, ComponentPublicInstance } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, makeNumericProp } from '../common/props'

export type VehicleKeyboardType = 'plate' | 'custom'

export const vehicleKeyboardProps = {
  ...baseProps,
  /** 标题 */
  title: makeStringProp(''),
  /** 是否显示光标 */
  cursor: makeBooleanProp(false),
  /** 是否开启震动效果 */
  vibration: makeBooleanProp(false),
  /** 键盘类型 */
  type: makeStringProp<VehicleKeyboardType>('plate'),
  /** 最大输入长度 */
  max: makeNumericProp(8),
  /** 是否直接显示内容（嵌入模式） */
  showContent: makeBooleanProp(false),
  /** 是否加入动画效果 */
  anim: makeBooleanProp(true),
  /** 禁用某些按键 */
  disable: {
    type: String,
    default: '',
  },
}

export type VehicleKeyboardProps = ExtractPropTypes<typeof vehicleKeyboardProps>


// defineExpose declaration

export type VehicleKeyboardInstance = {
  /** 添加一个字符到当前位置 */
  toShow: (v?: string, pos?: number) => void
} & ComponentPublicInstance<VehicleKeyboardProps>