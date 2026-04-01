<script lang="ts">
export default {
  name: 'bt-toast',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { toastProps } from './types'

const props = defineProps(toastProps)

const visible = computed(() => props.messages.length > 0)

const hasIcon = computed(() => !!props.status)

const iconClass = computed(() => {
  const map: Record<string, string> = {
    success: 'bt-toast__icon--success',
    error: 'bt-toast__icon--error',
    info: 'bt-toast__icon--info'
  }
  return props.status ? map[props.status] || '' : ''
})
</script>

<template>
  <view v-if="visible" class="bt-toast" :class="[customClass]" :style="customStyle">
    <view class="bt-toast__content" :class="{ 'is-with-icon': hasIcon }">
      <!-- icon 区域 -->
      <view v-if="hasIcon" class="bt-toast__icon" :class="[iconClass]">
        <!-- success -->
        <view v-if="status === 'success'" class="wd-icon icon-item-class wd-icon-check-circle"></view>
        <!-- error -->
        <view v-else-if="status === 'error'" class="wd-icon icon-item-class wd-icon-error-circle"></view>
        <!-- info -->
        <view v-else-if="status === 'info'" class="wd-icon icon-item-class wd-icon-info-circle"></view>
      </view>
      <!-- 消息列表 -->
      <view v-for="(msg, index) in messages" :key="index" class="bt-toast__message">
        {{ msg }}
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index.scss';
</style>
