import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp, makeArrayProp } from '../common/props'
import type { ToastStatus } from './bt-toast-utils'

export const toastProps = {
  ...baseProps,
  /**
   * 当前状态：loading | success | error | info | ''
   * @default ''
   */
  status: makeStringProp<ToastStatus>(''),
  /**
   * 展示的消息列表
   * @default []
   */
  messages: makeArrayProp<string>(),
}

export type ToastProps = ExtractPropTypes<typeof toastProps>
