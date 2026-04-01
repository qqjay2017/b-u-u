export type ToastStatus = 'success' | 'error' | 'info' | ''

export interface ToastOptions {
  /** 提示信息 */
  message: string
  /** 状态类型 */
  status?: ToastStatus
  /** 显示时长（ms），默认 1500 */
  duration?: number
}

type Listener = (options: ToastOptions) => void

class ToastObserver {
  private listeners = new Set<Listener>()

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private emit(options: ToastOptions) {
    this.listeners.forEach((fn) => fn(options))
  }

  /**
   * 纯文字提示（无图标，可累加）
   */
  message(msg: string, duration?: number) {
    this.emit({ message: msg, status: '', duration })
  }

  /**
   * 成功提示（带图标，清除旧消息）
   */
  success(msg: string, duration?: number) {
    this.emit({ message: msg, status: 'success', duration })
  }

  /**
   * 错误提示（带图标，清除旧消息）
   */
  error(msg: string, duration?: number) {
    this.emit({ message: msg, status: 'error', duration })
  }

  /**
   * 信息提示（带图标，清除旧消息）
   */
  info(msg: string, duration?: number) {
    this.emit({ message: msg, status: 'info', duration })
  }
}

const showToast = new ToastObserver()

export { showToast }
