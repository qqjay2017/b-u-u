import type { ExtractPropTypes, ComponentPublicInstance } from 'vue'
import { baseProps, makeStringProp, makeBooleanProp, makeNumericProp, makeArrayProp } from '../common/props'

/** 选项卡指示器类型 */
export type TabsType = 'line' | 'pills'

export const tabsProps = {
  ...baseProps,
  /** 当前选中项的下标 */
  modelValue: makeNumericProp(0),
  /** tabs 列表 */
  tabs: makeArrayProp<string | Record<string, any>>([]),
  /** 对象列表时显示的键名 */
  field: makeStringProp(''),
  /** 选项卡指示器类型 */
  type: makeStringProp<TabsType>('line'),
  /** 是否可滚动 */
  scroll: makeBooleanProp(true),
  /** 选中文字是否加粗 */
  bold: makeBooleanProp(false),
  /** 是否固定在顶部 */
  fixed: makeBooleanProp(false),
  /** 下划线宽度相对于选项宽度的缩放比例 */
  lineScale: makeNumericProp(0.5),
  /** 是否开启切换动画 */
  animated: makeBooleanProp(true),
  /** 固定定位时的 z-index */
  zIndex: makeNumericProp(1993),
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export type TabsInstance = ComponentPublicInstance<TabsProps>