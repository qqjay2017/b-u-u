<script lang="ts">
export default {
  name: 'bt-toast-observer',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { showToast } from './bt-toast-utils'
import type { ToastOptions, ToastStatus } from './bt-toast-utils'

const DEFAULT_DURATION = 1500

const status = ref<ToastStatus>('')
const messages = ref<string[]>([])

const timers: ReturnType<typeof setTimeout>[] = []

function clearAllTimers() {
  timers.forEach((t) => clearTimeout(t))
  timers.length = 0
}

function handleToast(options: ToastOptions) {
  const duration = options.duration ?? DEFAULT_DURATION
  const hasIcon = !!options.status

  if (hasIcon) {
    // 带图标状态：清除旧消息和定时器，只展示当前
    clearAllTimers()
    status.value = options.status!
    messages.value = [options.message]

    const timer = setTimeout(() => {
      status.value = ''
      messages.value = []
    }, duration)
    timers.push(timer)
  } else {
    // 纯文字：累加消息
    status.value = ''
    const msg = options.message
    messages.value = [...messages.value, msg]

    const timer = setTimeout(() => {
      const idx = messages.value.indexOf(msg)
      if (idx !== -1) {
        messages.value = messages.value.filter((_, i) => i !== idx)
      }
    }, duration)
    timers.push(timer)
  }
}

const unsubscribe = showToast.subscribe(handleToast)

onUnmounted(() => {
  unsubscribe()
  clearAllTimers()
})
</script>

<template>
  <slot />
  <bt-toast :status="status" :messages="messages" />
</template>

<style lang="scss">
@import './index.scss';
</style>
