<template>
  <bt-popup :show="show" :maskClosable="closeOnClickOverlay" :background="'transparent'" @close="handlePopupClose">
    <view :class="['bt-action-sheet', round ? 'is-round' : '', customClass]" :style="customStyle">
      <!-- 标题 -->
      <view v-if="title" class="bt-action-sheet__header">
        {{ title }}
        <view class="bt-action-sheet__close" @tap="close">✕</view>
      </view>

      <!-- 描述 -->
      <view v-if="description" class="bt-action-sheet__description">
        {{ description }}
      </view>

      <!-- 选项列表 -->
      <view class="bt-action-sheet__content">
        <view
          v-for="(action, index) in actions"
          :key="action.key ?? action.id ?? index"
          :class="['bt-action-sheet__item', action.disabled ? 'is-disabled' : '', action.loading ? 'is-loading' : '', action.className ?? '']"
          :style="action.color ? `color: ${action.color}` : ''"
          hover-class="is-hover"
          :hover-stay-time="70"
          @tap="onSelect(action, index)"
        >
          <text v-if="action.loading" class="bt-action-sheet__loading-icon">•••</text>
          <template v-else>
            <text class="bt-action-sheet__name">{{ action.name }}</text>
            <text v-if="action.subname" class="bt-action-sheet__subname">{{ action.subname }}</text>
          </template>
        </view>
      </view>

      <!-- 取消按钮 -->
      <template v-if="cancelText">
        <view class="bt-action-sheet__gap" />
        <view class="bt-action-sheet__cancel" hover-class="is-hover" :hover-stay-time="70" @tap="onCancel">
          {{ cancelText }}
        </view>
      </template>
    </view>
  </bt-popup>
</template>

<script lang="ts">
export default {
  name: 'bt-action-sheet',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { actionSheetProps } from './types'
import type { ActionSheetAction } from './types'

const props = defineProps(actionSheetProps)

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'select', action: ActionSheetAction, index: number): void
  (e: 'cancel'): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'opened'): void
  (e: 'closed'): void
}>()

function close() {
  emit('update:show', false)
  emit('close')
}

function handlePopupClose() {
  close()
}

function onSelect(action: ActionSheetAction, index: number) {
  if (action.disabled || action.loading) return
  emit('select', action, index)
  if (props.closeOnClickAction) {
    close()
  }
}

function onCancel() {
  close()
  emit('cancel')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
