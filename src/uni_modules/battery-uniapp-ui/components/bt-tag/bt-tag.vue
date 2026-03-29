<template>
  <view v-if="visible" :class="rootClass" :style="customStyle" @click="handleClick">
    <!-- @slot default 自定义标签内容 -->
    <slot>{{ text }}</slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-tag',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { tagProps } from './types'

const props = defineProps(tagProps)
const emit = defineEmits<{
  /** 点击标签时触发 */
  click: [event: Event]
}>()

const slots = useSlots()

const normalizedType = computed(() => props.type)
const normalizedSize = computed(() => (props.size === 'normal' ? 'medium' : props.size))
const visible = computed(() => Boolean(props.text) || Boolean(slots.default?.().length))

const rootClass = computed(() => {
  const classes = ['bt-tag', `is-${normalizedType.value}`, `is-${normalizedSize.value}`]
  if (props.disabled) classes.push('is-disabled')
  if (props.inverted) classes.push('is-inverted')
  if (props.circle) classes.push('is-circle')
  if (props.mark) classes.push('is-mark')
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

function handleClick(event: Event) {
  if (props.disabled) return
  emit('click', event)
}
</script>

<style lang="scss">
@import './index.scss';
</style>
