<template>
  <view :class="rootClass" :style="[rootStyle, customStyle]">
    <view v-if="hasHeader" class="bt-group__header" @click="handleClick">
      <view class="bt-group__title">
        <!-- @slot title 自定义标题区域 -->
        <slot name="title">{{ title }}</slot>
      </view>
      <view v-if="hasRightSlot" class="bt-group__right">
        <!-- @slot right 标题右侧内容 -->
        <slot name="right" />
      </view>
    </view>

    <view v-if="hasHeader && divider" class="bt-group__divider" />

    <view :class="contentClass" :style="contentStyle">
      <!-- @slot default 分组内容 -->
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-group',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { addUnit } from '../common/util'
import { groupProps } from './types'

const props = defineProps(groupProps)
const emit = defineEmits<{
  /** 点击标题栏时触发 */
  click: [event: Event]
}>()

const slots = useSlots()

const hasTitleSlot = computed(() => Boolean(slots.title?.().length))
const hasRightSlot = computed(() => Boolean(slots.right?.().length))
const hasHeader = computed(() => Boolean(props.title) || hasTitleSlot.value || hasRightSlot.value)

const rootClass = computed(() => {
  const classes = ['bt-group', `is-${props.mode}`]
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const rootStyle = computed(() => ({
  marginTop: addUnit(props.top)
}))

const contentClass = computed(() => {
  const classes = ['bt-group__content']
  if (props.padding === false) classes.push('is-no-padding')
  if (typeof props.padding === 'string') classes.push('is-custom-padding')
  return classes.join(' ')
})

const contentStyle = computed(() => {
  if (typeof props.padding === 'string') {
    return {
      padding: props.padding
    }
  }

  return {}
})

function handleClick(event: Event) {
  emit('click', event)
}
</script>

<style lang="scss">
@import './index.scss';
</style>
