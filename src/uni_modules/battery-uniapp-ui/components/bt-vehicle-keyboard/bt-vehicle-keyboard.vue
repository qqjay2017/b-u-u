<template>
  <view :class="rootClass">
    <bt-popup :show="isShow" :show-content="showContent" :anim="anim" background="#d4d5d9" @close="handleCancel">
      <view class="bt-vehicle-keyboard__input-wrap">
        <view v-if="title" class="bt-vehicle-keyboard__title">
          {{ title }}
        </view>
        <view style="padding: 10px">
          <bt-vehicle-input
            ref="inputRef"
            :cursor="cursor"
            :show-pointer="type === 'plate'"
            :max="max"
            @change="handleInputChange"
          />
        </view>
      </view>
      <bt-keyboard-box
        ref="boxRef"
        :show-change-btn="type === 'plate'"
        :show-cancel-btn="!showContent"
        :vibration="vibration"
        :disable="disable"
        @add="handleAdd"
        @del="handleDel"
        @clear="handleClear"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      />
    </bt-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-vehicle-keyboard',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { vehicleKeyboardProps } from './types'
import type { VehicleInputInstance } from '../bt-vehicle-input/types'
import BtKeyboardBox from './box/bt-keyboard-box.vue'

const props = defineProps(vehicleKeyboardProps)
const emit = defineEmits<{
  confirm: [value: string]
  cancel: []
}>()

const isShow = ref(false)
const inputRef = ref<VehicleInputInstance>()
const boxRef = ref<InstanceType<typeof import('./box/bt-keyboard-box.vue').default>>()

/** 获取内部 input 的当前值 */
function getInputValue(): string {
  const el = inputRef.value?.getValues() || []
  return el.join('') ?? ''
}

const rootClass = computed(() => {
  const classes = ['bt-vehicle-keyboard']
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

/** 显示键盘并设置初始值 */
function toShow(value?: string, pos?: number) {
  isShow.value = true
  inputRef.value?.changeValue(value || '', pos)
}

function handleInputChange(index: number) {
  if (props.type === 'plate') {
    boxRef.value?.changeMode(index === 0 ? 0 : 1)
  } else {
    boxRef.value?.changeMode(1)
  }
}

function handleAdd(key: string) {
  inputRef.value?.toAdd(key)
}

function handleDel() {
  inputRef.value?.toDel()
}

function handleClear() {
  inputRef.value?.toClear()
}

function handleCancel() {
  isShow.value = false
  emit('cancel')
}

function handleConfirm() {
  isShow.value = false
  const value = getInputValue()
  emit('confirm', value)
}

defineExpose({ toShow })
</script>

<style lang="scss">
@import './index.scss';
</style>
