<template>
  <page-wraper>
    <view class="demo-page">
      <demo-block title="基本用法">
        <bt-button @click="show1 = true">打开弹出层</bt-button>
        <bt-popup :show="show1" @close="show1 = false">
          <view class="popup-content">弹出层内容</view>
        </bt-popup>
      </demo-block>

      <demo-block title="圆角">
        <bt-button @click="show2 = true">圆角弹出层</bt-button>
        <bt-popup :show="show2" :radius="16" @close="show2 = false">
          <view class="popup-content">圆角 16px</view>
        </bt-popup>
      </demo-block>

      <demo-block title="自定义背景色">
        <bt-button @click="show3 = true">自定义背景色</bt-button>
        <bt-popup :show="show3" background="#f5f5f5" @close="show3 = false">
          <view class="popup-content popup-content--gray">自定义背景色 #f5f5f5</view>
        </bt-popup>
      </demo-block>

      <demo-block title="禁止点击遮罩关闭">
        <bt-button @click="show4 = true">打开弹出层</bt-button>
        <bt-popup :show="show4" :mask-closable="false" @close="show4 = false">
          <view class="popup-content">
            <view>点击遮罩不会关闭</view>
            <bt-button size="small" @click="show4 = false">手动关闭</bt-button>
          </view>
        </bt-popup>
      </demo-block>

      <demo-block title="自定义遮罩颜色">
        <bt-button @click="show5 = true">半透明遮罩</bt-button>
        <bt-popup :show="show5" mask-background="rgba(0,0,0,0.3)" @close="show5 = false">
          <view class="popup-content">浅色遮罩</view>
        </bt-popup>
      </demo-block>

      <demo-block title="无动画">
        <bt-button @click="show6 = true">无动画弹出</bt-button>
        <bt-popup :show="show6" :anim="false" @close="show6 = false">
          <view class="popup-content">无动画弹出层</view>
        </bt-popup>
      </demo-block>

      <demo-block title="内联模式（嵌入页面）">
        <bt-popup :show-content="true">
          <view class="popup-content popup-content--inline">内联模式，直接嵌入页面，无遮罩</view>
        </bt-popup>
      </demo-block>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 16px;
}

.popup-content {
  padding: 24px 16px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
  color: #333;

  &--gray {
    color: #666;
  }

  &--inline {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #eee;
    min-height: 80px;
  }
}
</style>
