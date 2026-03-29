import type { ExtractPropTypes, ComponentPublicInstance } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

export const vehicleInputProps = {
  ...baseProps,
  /** 初始输入值 */
  initValue: makeStringProp(''),
  /** 是否显示光标 */
  cursor: makeBooleanProp(false),
  /** 最大输入长度 */
  max: makeNumericProp(8),
  /** 是否显示新能源标识（第8位虚线框） */
  showPointer: makeBooleanProp(true),
  /** 格子最大尺寸 */
  maxSize: makeNumericProp(40),
  /** 对齐方式 */
  align: makeStringProp('center'),
}

export type VehicleInputProps = ExtractPropTypes<typeof vehicleInputProps>

export type VehicleInputInstance = ComponentPublicInstance<VehicleInputProps> & {
  /** 获取当前输入的值数组 */
  getValues: () => string[]
  /** 添加一个字符到当前位置 */
  toAdd: (v: string) => void
  /** 删除当前位置字符 */
  toDel: () => void
  /** 清空所有输入 */
  toClear: () => void
  /** 设置值和光标位置 */
  changeValue: (v: string, pos?: number) => void
}
