import type { ActionSheetAction } from './types'

export interface ActionSheetOptions {
  actions: ActionSheetAction[]
  title?: string
  description?: string
  cancelText?: string
  closeOnClickAction?: boolean
  closeOnClickOverlay?: boolean
}

type Listener = (options: ActionSheetOptions) => void

class ActionSheetObserver {
  private listeners = new Set<Listener>()

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  emit(options: ActionSheetOptions) {
    this.listeners.forEach((fn) => fn(options))
  }
}

const actionSheetObserver = new ActionSheetObserver()

/**
 * 函数式调用 ActionSheet
 * @returns Promise，select 时 resolve 选中的 action 和 index，cancel 时 resolve null
 */
export function showActionSheet(options: ActionSheetOptions): Promise<{ action: ActionSheetAction; index: number } | null> {
  return new Promise((resolve) => {
    const wrappedOptions: ActionSheetOptions & {
      _resolve?: (val: { action: ActionSheetAction; index: number } | null) => void
    } = { ...options }
    wrappedOptions._resolve = resolve
    actionSheetObserver.emit(wrappedOptions)
  })
}

export default actionSheetObserver

/**
 * const result = await showActionSheet({
  actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
  cancelText: '取消',
})

if (result) {
  console.log('选中了', result.action.name, '索引', result.index)
} else {
  console.log('取消了')
}
 */
