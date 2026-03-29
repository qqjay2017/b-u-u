<template>
  <view :class="rootClass" :style="customStyle">
    <scroll-view
      :id="domId"
      :enhanced="true"
      :show-scrollbar="false"
      :scroll-x="scroll"
      :scroll-left="scroll ? scrollViewScrollLeft : 0"
      :scroll-with-animation="scroll"
      :style="scrollViewStyle"
    >
      <view :class="containerClass">
        <view v-for="(item, index) in tabs" :key="index" :class="getItemClass(index)" @click="handleChange(index)">
          <!-- @slot default 自定义选项卡内容 -->
          <slot :row="item" :index="index">{{ getLabel(item) }}</slot>
        </view>
        <template v-if="tabs.length">
          <view v-if="type === 'line'" :class="lineClass" :style="lineStyle" />
          <view v-else :class="pillsClass" :style="pillsStyle" />
        </template>
      </view>
    </scroll-view>
    <view v-if="fixed" class="bt-tabs__placeholder" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-tabs',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { ref, computed, watch, nextTick, getCurrentInstance } from 'vue'
import { tabsProps } from './types'

const props = defineProps(tabsProps)
const emit = defineEmits<{
  /** 选中项变化时触发 */
  'update:modelValue': [index: number]
  /** 切换选项卡时触发 */
  change: [index: number]
}>()

const instance = getCurrentInstance()
const domId = `bt_tabs_${Math.random().toString(36).slice(2, 10)}`

const indicatorWidth = ref(0)
const indicatorLeft = ref(0)
const scrollViewScrollLeft = ref(0)

let lastClicked = 0

const rootClass = computed(() => {
  const classes = ['bt-tabs']
  if (props.fixed) classes.push('is-fixed')
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const scrollViewStyle = computed(() => {
  if (!props.fixed) return { width: '100%' }
  return { width: '100%', position: 'fixed' as const, zIndex: props.zIndex }
})

const containerClass = computed(() => {
  const classes = ['bt-tabs__container']
  if (props.scroll) classes.push('is-scroll')
  return classes.join(' ')
})

const lineClass = computed(() => {
  const classes = ['bt-tabs__line']
  if (props.animated) classes.push('is-animated')
  return classes.join(' ')
})

const pillsClass = computed(() => {
  const classes = ['bt-tabs__pills']
  if (props.animated) classes.push('is-animated')
  return classes.join(' ')
})

const lineStyle = computed(() => ({
  width: `${indicatorWidth.value}px`,
  transform: `translate3d(${indicatorLeft.value}px, 0, 0)`
}))

const pillsStyle = computed(() => ({
  width: `${indicatorWidth.value}px`,
  transform: `translate3d(${indicatorLeft.value}px, 0, 0)`
}))

function getItemClass(index: number) {
  const classes = ['bt-tabs__item']
  if (props.modelValue === index) classes.push('is-active')
  if (props.bold && props.modelValue === index) classes.push('is-bold')
  if (!props.scroll) classes.push('is-flex')
  const tab = props.tabs[index]
  if (tab && typeof tab === 'object' && tab.disabled) classes.push('is-disabled')
  return classes.join(' ')
}

function getLabel(item: string | Record<string, any>) {
  if (props.field && typeof item === 'object') return item[props.field]
  return item
}

function handleChange(index: number) {
  const now = Date.now()
  if (now - lastClicked < 300) return
  lastClicked = now

  const tab = props.tabs[index]
  const isDisabled = tab && typeof tab === 'object' && !!tab.disabled
  if (props.modelValue !== index && !isDisabled) {
    emit('update:modelValue', index)
    emit('change', index)
  }
}

function createQuery() {
  // #ifndef MP-ALIPAY
  return uni.createSelectorQuery().in(instance)
  // #endif
}

function updateLayout() {
  nextTick(() => {
    if (!props.tabs.length) return

    const query = createQuery()
    query.select(`#${domId}`).boundingClientRect()
    query.select(`#${domId}`).fields({ scrollOffset: true }, () => {})
    query.select(`#${domId} .bt-tabs__item.is-active`).boundingClientRect()

    query.exec((results: any[]) => {
      const containerRect = results[0]
      const scrollInfo = results[1]
      const activeRect = results[2]
      if (!containerRect || !activeRect) return

      const containerLeft = containerRect.left
      const containerWidth = containerRect.width
      const currentScroll = scrollInfo?.scrollLeft ?? 0
      const totalScrollWidth = scrollInfo?.scrollWidth ?? containerWidth

      // Center active tab in scroll view
      if (props.scroll) {
        const halfSpace = (containerWidth - activeRect.width) / 2
        let newScrollLeft = currentScroll + activeRect.left - halfSpace - containerLeft
        const maxScroll = totalScrollWidth - containerWidth
        newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll))
        scrollViewScrollLeft.value = newScrollLeft
      }

      // Update indicator position
      const itemAbsoluteLeft = currentScroll + activeRect.left - containerLeft
      if (props.type === 'pills') {
        indicatorWidth.value = activeRect.width
        indicatorLeft.value = itemAbsoluteLeft
      } else {
        indicatorWidth.value = activeRect.width * props.lineScale
        indicatorLeft.value = itemAbsoluteLeft + (activeRect.width - activeRect.width * props.lineScale) / 2
      }
    })
  })
}

watch(
  () => props.modelValue,
  () => updateLayout(),
  { immediate: true }
)
watch(
  () => props.tabs,
  () => updateLayout(),
  { deep: true }
)
</script>

<style lang="scss">
@import './index.scss';
</style>
