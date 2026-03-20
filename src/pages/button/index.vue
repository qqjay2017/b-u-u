<template>
  <view class="demo-page">
    <!-- 按钮类型 -->
    <view class="demo-block">
      <view class="demo-block__title">按钮类型</view>
      <view class="demo-block__content">
        <bt-button>默认按钮</bt-button>
        <bt-button type="primary">主要按钮</bt-button>
        <bt-button type="success">成功按钮</bt-button>
        <bt-button type="warning">警告按钮</bt-button>
        <bt-button type="danger">危险按钮</bt-button>
        <bt-button type="info">信息按钮</bt-button>
      </view>
    </view>

    <!-- 朴素按钮 -->
    <view class="demo-block">
      <view class="demo-block__title">朴素按钮</view>
      <view class="demo-block__content">
        <bt-button type="primary" plain>主要按钮</bt-button>
        <bt-button type="success" plain>成功按钮</bt-button>
        <bt-button type="danger" plain>危险按钮</bt-button>
      </view>
    </view>

    <!-- 按钮尺寸 -->
    <view class="demo-block">
      <view class="demo-block__title">按钮尺寸</view>
      <view class="demo-block__content">
        <bt-button type="primary" size="large">大型按钮</bt-button>
        <bt-button type="primary" size="medium">中型按钮</bt-button>
        <bt-button type="primary" size="small">小型按钮</bt-button>
      </view>
    </view>

    <!-- 圆角按钮 -->
    <view class="demo-block">
      <view class="demo-block__title">圆角按钮</view>
      <view class="demo-block__content">
        <bt-button type="primary" round>圆角按钮</bt-button>
        <bt-button type="success" round plain>圆角朴素</bt-button>
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-block">
      <view class="demo-block__title">禁用状态</view>
      <view class="demo-block__content">
        <bt-button disabled>禁用按钮</bt-button>
        <bt-button type="primary" disabled>禁用按钮</bt-button>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="demo-block">
      <view class="demo-block__title">加载状态</view>
      <view class="demo-block__content">
        <bt-button type="primary" loading>加载中</bt-button>
      </view>
    </view>

    <!-- 块级按钮 -->
    <view class="demo-block">
      <view class="demo-block__title">块级按钮</view>
      <view class="demo-block__content">
        <bt-button type="primary" block>块级按钮</bt-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.demo-page {
  padding: 20rpx 30rpx;
}

.demo-block {
  margin-bottom: 40rpx;

  &__title {
    font-size: 28rpx;
    font-weight: 500;
    color: #666;
    margin-bottom: 20rpx;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }
}
</style>
