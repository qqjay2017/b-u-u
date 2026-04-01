<template>
  <bt-toast-observer />
  <page-wraper>
    <bt-toast-observer>
      <view class="page-toast">
        <!-- 纯文字提示 -->
        <demo-block title="纯文字提示">
          <bt-button @click="handleMessage">文字提示</bt-button>
        </demo-block>

        <!-- 成功提示 -->
        <demo-block title="成功提示">
          <bt-button type="success" @click="handleSuccess">成功提示</bt-button>
        </demo-block>

        <!-- 错误提示 -->
        <demo-block title="错误提示">
          <bt-button type="error" @click="handleError">错误提示</bt-button>
        </demo-block>

        <!-- 信息提示 -->
        <demo-block title="信息提示">
          <bt-button @click="handleInfo">信息提示</bt-button>
        </demo-block>

        <!-- 多条文字累加 -->
        <demo-block title="多条文字累加">
          <bt-button @click="handleMultiple">连续发送 3 条</bt-button>
        </demo-block>

        <!-- 自定义时长 -->
        <demo-block title="自定义时长">
          <bt-button @click="handleCustomDuration">显示 5 秒</bt-button>
        </demo-block>
      </view>
    </bt-toast-observer>
  </page-wraper>
</template>

<script lang="ts" setup>
import btToastObserver from '@/uni_modules/battery-uniapp-ui/components/bt-toast/bt-toast-observer.vue'
import { showToast } from '@/uni_modules/battery-uniapp-ui/components/bt-toast/bt-toast-utils'

function handleMessage() {
  showToast.message('这是一条纯文字提示')
}

function handleSuccess() {
  showToast.success('操作成功')
}

function handleError() {
  showToast.error('操作失败')
}

function handleInfo() {
  showToast.info('这是一条信息提示')
}

function handleMultiple() {
  showToast.message('第一条消息')
  setTimeout(() => showToast.message('第二条消息'), 300)
  setTimeout(() => showToast.message('第三条消息'), 600)
}

function handleCustomDuration() {
  showToast.success('我会显示 5 秒', 5000)
}
</script>
