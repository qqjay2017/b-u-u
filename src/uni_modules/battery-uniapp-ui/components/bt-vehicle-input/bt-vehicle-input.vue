<template>
  <view :class="rootClass" :style="rootStyle">
    <view
      v-for="(item, index) in values"
      :key="index"
      :class="itemClass(index)"
      :style="itemStyle(index)"
      @click="handleCurChange(index)"
    >
      <view class="bt-vehicle-input__square">
        <view
          :class="cellClass(index, item)"
          :style="cellStyle"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-vehicle-input',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { vehicleInputProps } from './types'

const props = defineProps(vehicleInputProps)
const emit = defineEmits<{
  change: [cur: number]
}>()

const cur = ref(0)
const values = ref<string[]>([])

const rootClass = computed(() => {
  const classes = ['bt-vehicle-input']
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const rootStyle = computed(() => {
  const styles: string[] = [`justify-content: ${props.align}`]
  if (props.customStyle) styles.push(props.customStyle)
  return styles.join(';')
})

function itemClass(index: number) {
  const classes = ['bt-vehicle-input__item']
  if (cur.value === index) classes.push('is-cur')
  if (props.showPointer) classes.push('is-show-pointer')
  return classes.join(' ')
}

function itemStyle(index: number) {
  const styles: string[] = []
  if (index > 0) styles.push(`margin-left: ${18 - props.max}px`)
  if (props.maxSize) {
    styles.push(`max-width: ${props.maxSize}px`)
    styles.push(`max-height: ${props.maxSize}px`)
  }
  return styles.join(';')
}

const cellStyle = computed(() => {
  if (!props.maxSize) return ''
  return `max-width: ${props.maxSize}px; max-height: ${props.maxSize}px`
})

function cellClass(index: number, item: string) {
  const classes = ['bt-vehicle-input__cell']
  if (props.cursor && cur.value === index && !item) classes.push('is-cursor')
  return classes.join(' ')
}

function handleCurChange(index: number) {
  cur.value = index
  emitChange()
}

function emitChange() {
  emit('change', cur.value)
}

function toAdd(v: string) {
  values.value[cur.value] = v
  // trigger reactivity
  values.value = [...values.value]
  if (cur.value < props.max - 1) {
    cur.value++
    emitChange()
  }
}

function toDel() {
  if ((cur.value === props.max - 1 && values.value[cur.value]) || values.value[cur.value]) {
    resetCurValue()
    return
  }
  if (cur.value <= 0) {
    cur.value = 0
  } else {
    cur.value--
    resetCurValue()
    emitChange()
  }
}

function resetCurValue() {
  values.value[cur.value] = ''
  values.value = [...values.value]
  emitChange()
}

function toClear() {
  cur.value = 0
  initValues()
  emitChange()
}

function changeValue(v: string, pos?: number, skipEmit = false) {
  const max = Math.max(v.length, props.max)
  for (let i = 0; i < max; i++) {
    values.value[i] = v.charAt(i)
  }
  values.value = [...values.value]

  const emptyIndex = values.value.findIndex((x) => !x)
  cur.value = emptyIndex === -1 ? props.max - 1 : emptyIndex
  if (pos != null) {
    cur.value = pos
  }
  if (!skipEmit) {
    emitChange()
  }
}

function initValues() {
  const vs: string[] = []
  vs.length = props.max
  vs.fill('')
  values.value = vs
}

function getValues(){
  return values.value||[]
}

onMounted(() => {
  initValues()
  changeValue(props.initValue || '', undefined, true)
})

defineExpose({ toAdd, toDel, toClear, changeValue ,getValues})
</script>

<style lang="scss">
@import './index.scss';
</style>
