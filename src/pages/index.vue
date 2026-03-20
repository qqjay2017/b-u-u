<template>
  <view class="demo-page">
    <view class="demo-title">Battery UI 组件库</view>
    <view class="demo-desc">基于 Vue 3 + TypeScript 的 uni-app 组件库</view>

    <view class="demo-section">
      <view class="demo-section-title">基础组件</view>
      <view class="demo-nav-item" @click="navigateTo('/pages/button/index')">
        <text>Button 按钮</text>
        <text class="demo-nav-arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
function navigateTo(url: string) {
  uni.navigateTo({ url });
}
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 40rpx 30rpx;
}

.demo-title {
  font-size: 44rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
}

.demo-desc {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 60rpx;
}

.demo-section {
  margin-bottom: 40rpx;
}

.demo-section-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #666;
  margin-bottom: 20rpx;
  padding-left: 10rpx;
}

.demo-nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 24rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  font-size: 30rpx;
  color: #333;
}

.demo-nav-arrow {
  color: #ccc;
  font-size: 36rpx;
}
</style>
