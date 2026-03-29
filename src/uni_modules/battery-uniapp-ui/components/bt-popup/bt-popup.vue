<template>
  <view
    :class="rootClass"
    :style="rootStyle"
    @tap.stop="handleMaskClick"
    @touchmove.stop.prevent="noop"
  >
    <view
      :class="contentClass"
      :style="contentStyle"
      @tap.stop="noop"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-popup',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { popupProps } from './types'

const props = defineProps(popupProps)
const emit = defineEmits<{
  close: []
}>()

const rootClass = computed(() => {
  const classes = ['bt-popup']
  if (props.show) classes.push('is-show')
  if (props.showContent) classes.push('is-inline')
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const rootStyle = computed(() => {
  const styles: string[] = []
  styles.push(`z-index: ${props.zIndex}`)
  styles.push(`background: ${props.maskBackground}`)
  if (props.customStyle) styles.push(props.customStyle)
  return styles.join(';')
})

const contentClass = computed(() => {
  const classes = ['bt-popup__content']
  if (props.anim) classes.push('is-anim')
  if (props.showContent) classes.push('is-inline')
  return classes.join(' ')
})

const contentStyle = computed(() => {
  const styles: string[] = []
  if (props.radius) {
    styles.push(`border-top-left-radius: ${props.radius}px`)
    styles.push(`border-top-right-radius: ${props.radius}px`)
  }
  styles.push(`background: ${props.background}`)
  return styles.join(';')
})

function handleMaskClick() {
  if (!props.maskClosable) return
  emit('close')
}

function noop() {}
</script>

<style lang="scss">
@import './index.scss';
</style>
