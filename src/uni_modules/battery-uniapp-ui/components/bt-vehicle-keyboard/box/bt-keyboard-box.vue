<template>
  <view class="bt-keyboard-box">
    <view
      v-for="(line, li) in currentLines"
      :key="li"
      class="bt-keyboard-box-line"
      :style="lineStyle(line.diff)"
    >
      <view
        v-for="(item, index) in line.list"
        :key="index"
        :class="keyClass(item)"
        :style="keyStyle"
        @click="handleKeyClick(item)"
      >
        {{ item }}
      </view>
    </view>

    <!-- 底部工具栏 -->
    <view class="bt-keyboard-box-line bt-keyboard-box-toolbar">
      <view
        v-if="showCancelBtn"
        class="bt-keyboard-box-item bt-keyboard-box-btn bt-keyboard-box-btn-cancel"
        :style="toolbarBtnStyle"
        @click="handleCancel"
      >取消</view>
      <view
        class="bt-keyboard-box-item bt-keyboard-box-btn bt-keyboard-box-btn-clear"
        :style="toolbarBtnStyle"
        @click="handleClear"
      >清空</view>
      <view
        class="bt-keyboard-box-item bt-keyboard-box-btn-over"
        :style="toolbarBtnStyle"
        @click="handleConfirm"
      >完成</view>
    </view>

    <!-- 切换键盘按钮 -->
    <view
      v-if="showChangeBtn"
      class="bt-keyboard-box-item bt-keyboard-box-btn bt-keyboard-box-btn-change
      box-icon  box-icon-jianpan
      "
      :style="handlerBtnStyle"
      @click="handleChangeMode()"
    ></view>

    <!-- 删除按钮 -->
    <view
      class="bt-keyboard-box-item bt-keyboard-box-btn bt-keyboard-box-btn-del
       box-icon  box-icon-backspace
      "
      :style="handlerBtnStyle"
      @click="handleDel"
    ></view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-keyboard-box',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { boxProps } from './types';

const props = defineProps(boxProps)

const emit = defineEmits<{
  add: [key: string]
  del: []
  confirm: []
  cancel: []
  clear: []
}>()

const mode = ref(0)
const ratio = 7
const max = 10
const gutter = 10
const btnWidth = ref(10)
const btnHeight = ref(10)
const handlerWidth = ref(10)

const lines = [
  // 省份键盘
  [
    { list: ['京', '沪', '浙', '苏', '粤', '鲁', '晋', '冀', '豫', '川'], diff: 0 },
    { list: ['渝', '辽', '吉', '黑', '皖', '鄂', '津', '贵', '云', '桂'], diff: 0 },
    { list: ['琼', '青', '新', '藏', '蒙', '宁', '甘', '陕', '闽', '赣'], diff: 0 },
    { list: ['湘', '使', '领', '警', '学', '挂', '...', '', '', ''], diff: 3 },
  ],
  // 字母数字键盘
  [
    { list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], diff: 0 },
    { list: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], diff: 0 },
    { list: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''], diff: 1 },
    { list: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''], diff: 3 },
  ],
  // 特殊字符键盘
  [
    { list: ['港', '澳', '台', '临', '试', '', '', '', '', ''], diff: 0 },
    { list: ['', '', '', '', '', '', '', '', '', ''], diff: 0 },
    { list: ['', '', '', '', '', '', '', '', '', ''], diff: 0 },
    { list: ['', '', '', '', '', '', '...', '', '', ''], diff: 3 },
  ],
]

const currentLines = computed(() => lines[mode.value])

const keyStyle = computed(() => `width: ${btnWidth.value}px; height: ${btnHeight.value}px`)

const toolbarBtnStyle = computed(
  () => `margin-right: ${(btnWidth.value / ratio).toFixed(2)}px; height: ${btnHeight.value}px`,
)

const handlerBtnStyle = computed(
  () =>
    `width: ${handlerWidth.value}px; height: ${btnHeight.value}px; bottom: calc(20px + ${btnHeight.value}px); font-size: 20px`,
)

function lineStyle(diff: number) {
  if (diff === 0) return ''
  const offset = ((diff * btnWidth.value + (diff * btnWidth.value) / ratio) / 2).toFixed(2)
  return `margin-left: ${offset}px; margin-right: ${-Number(offset)}px`
}

function keyClass(item: string) {
  const classes = ['bt-keyboard-box-item']
  if (item === '') classes.push('bt-keyboard-box-item-empty')
  if ((mode.value === 2 || props.disable) && props.disable.indexOf(item) !== -1 && item !== '') {
    classes.push('bt-keyboard-box-item-disable')
  }
  return classes.join(' ')
}

function changeMode(v?: number) {
  mode.value = v != null ? v : mode.value === 0 ? 1 : 0
}

function handleKeyClick(item: string) {
  if (item === '') return
  if (item === '...') {
    mode.value = mode.value === 2 ? 0 : 2
    return
  }
  if (props.disable && props.disable.indexOf(item) !== -1) return
  vibrate()
  emit('add', item)
}

function handleDel() {
  vibrate()
  emit('del')
}

function handleCancel() {
  vibrate()
  emit('cancel')
}

function handleConfirm() {
  vibrate()
  emit('confirm')
}

function handleClear() {
  vibrate()
  emit('clear')
}

function handleChangeMode(v?: number) {
  changeMode(v)
}

function vibrate() {
  if (props.vibration && uni.vibrateShort) {
    uni.vibrateShort()
  }
}

onMounted(() => {
  const { windowWidth } = uni.getSystemInfoSync()
  const w = ((windowWidth - gutter * 2) * ratio) / (max * ratio + max - 1)
  btnWidth.value = Number(w.toFixed(2))
  btnHeight.value = Number(((w / 3) * 4).toFixed(2))
  handlerWidth.value = Number((w * 1.5 + w / (ratio * 2)).toFixed(2))
})

defineExpose({ changeMode })
</script>

<style lang="scss">
@import './index.scss';
@import './iconfont.css'
</style>
