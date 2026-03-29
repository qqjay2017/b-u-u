<template>
  <view :class="rootClass" :style="customStyle">
    <view v-if="hasHeader" class="bt-section__header" @click="handleClick">
      <view v-if="type" :class="['bt-section__decoration', `is-${type}`]" />
      <view v-else-if="hasDecorationSlot" class="bt-section__decoration is-custom">
        <!-- @slot decoration 自定义标题装饰 -->
        <slot name="decoration" />
      </view>

      <view class="bt-section__content">
        <!-- @slot title 自定义主标题 -->
        <slot name="title">
          <text v-if="title" class="bt-section__title" :style="titleStyle">{{ title }}</text>
        </slot>

        <!-- @slot subTitle 自定义副标题 -->
        <slot name="subTitle">
          <text v-if="subTitle" class="bt-section__sub-title" :style="subTitleStyle">{{ subTitle }}</text>
        </slot>
      </view>

      <view v-if="hasRightSlot" class="bt-section__right">
        <!-- @slot right 标题右侧内容 -->
        <slot name="right" />
      </view>
    </view>

    <view v-if="hasDefaultSlot" :class="bodyClass" :style="bodyStyle">
      <!-- @slot default 默认内容 -->
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-section',
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
import { sectionProps } from './types'

const props = defineProps(sectionProps)
const emit = defineEmits<{
  /** 点击标题栏时触发 */
  click: [event: Event]
}>()

const slots = useSlots()

const hasDecorationSlot = computed(() => Boolean(slots.decoration?.().length))
const hasRightSlot = computed(() => Boolean(slots.right?.().length))
const hasDefaultSlot = computed(() => Boolean(slots.default?.().length))
const hasTitleSlot = computed(() => Boolean(slots.title?.().length))
const hasSubTitleSlot = computed(() => Boolean(slots.subTitle?.().length))
const hasHeader = computed(
  () =>
    Boolean(props.type) ||
    Boolean(props.title) ||
    Boolean(props.subTitle) ||
    hasDecorationSlot.value ||
    hasTitleSlot.value ||
    hasSubTitleSlot.value ||
    hasRightSlot.value
)

const rootClass = computed(() => {
  const classes = ['bt-section']
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const titleStyle = computed(() => ({
  ...(props.titleFontSize ? { fontSize: addUnit(props.titleFontSize) } : {}),
  ...(props.titleColor ? { color: props.titleColor } : {})
}))

const subTitleStyle = computed(() => ({
  ...(props.subTitleFontSize ? { fontSize: addUnit(props.subTitleFontSize) } : {}),
  ...(props.subTitleColor ? { color: props.subTitleColor } : {})
}))

const bodyClass = computed(() => {
  const classes = ['bt-section__body']
  if (props.padding === true) classes.push('is-padded')
  if (props.divider) classes.push('is-divider')
  return classes.join(' ')
})

const bodyStyle = computed(() => {
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
