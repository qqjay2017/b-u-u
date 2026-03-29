import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

/** 标题装饰类型 */
export type SectionType = 'line' | 'circle' | 'square'

/** 内容区域内边距 */
export type SectionPadding = boolean | string

export const sectionProps = {
  ...baseProps,
  /**
   * 主标题
   * @default ''
   */
  title: makeStringProp(''),
  /**
   * 标题装饰类型，可选值：line / circle / square
   * @default ''
   */
  type: makeStringProp<SectionType | ''>(''),
  /**
   * 主标题字号，数字会自动补全为 px
   * @default 16
   */
  titleFontSize: {
    type: [String, Number] as PropType<string | number>,
    default: 16
  },
  /**
   * 主标题颜色
   * @default ''
   */
  titleColor: makeStringProp(''),
  /**
   * 副标题
   * @default ''
   */
  subTitle: makeStringProp(''),
  /**
   * 副标题字号，数字会自动补全为 px
   * @default 12
   */
  subTitleFontSize: {
    type: [String, Number] as PropType<string | number>,
    default: 12
  },
  /**
   * 副标题颜色
   * @default ''
   */
  subTitleColor: makeStringProp(''),
  /**
   * 内容区域内边距，传入 true 使用默认内边距，传入字符串可自定义
   * @default false
   */
  padding: {
    type: [Boolean, String] as PropType<SectionPadding>,
    default: false
  },
  /**
   * 是否显示内容区域顶部的分割线
   * @default false
   */
  divider: makeBooleanProp(false)
}

export type SectionProps = ExtractPropTypes<typeof sectionProps>
export type SectionInstance = ComponentPublicInstance<SectionProps>
