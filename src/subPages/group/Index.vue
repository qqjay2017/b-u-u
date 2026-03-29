<template>
  <page-wraper>
    <view class="page-group">
      <demo-block title="基础用法" transparent>
        <bt-group title="基础信息">
          <view class="group-cell">
            <text class="group-cell__label">联系人</text>
            <text class="group-cell__value">张三</text>
          </view>
          <view class="group-cell">
            <text class="group-cell__label">联系电话</text>
            <text class="group-cell__value">13800000000</text>
          </view>
        </bt-group>
      </demo-block>

      <demo-block title="卡片模式" transparent>
        <bt-group title="电池工单" mode="card" divider>
          <view class="card-panel">
            <view class="card-panel__item">
              <text class="card-panel__value">12</text>
              <text class="card-panel__label">待处理</text>
            </view>
            <view class="card-panel__item">
              <text class="card-panel__value">6</text>
              <text class="card-panel__label">已完成</text>
            </view>
            <view class="card-panel__item">
              <text class="card-panel__value">98%</text>
              <text class="card-panel__label">完成率</text>
            </view>
          </view>
        </bt-group>
      </demo-block>

      <demo-block title="标题右侧插槽和点击事件" transparent>
        <bt-group title="充电记录" divider @click="showToast('点击了标题栏')">
          <template #right>
            <text class="group-link">查看全部</text>
          </template>
          <view class="record-list">
            <view class="record-list__item">
              <text>昨天 18:20</text>
              <text>充电 32.5 kWh</text>
            </view>
            <view class="record-list__item">
              <text>昨天 09:10</text>
              <text>充电 18.0 kWh</text>
            </view>
          </view>
        </bt-group>
      </demo-block>

      <demo-block title="关闭默认内边距" transparent>
        <bt-group title="自定义内容区域" :padding="false" mode="card">
          <image class="group-banner" src="/static/icon/app_selected.png" mode="aspectFill" />
        </bt-group>
      </demo-block>

      <demo-block title="自定义标题插槽" transparent>
        <bt-group mode="card" padding="20px">
          <template #title>
            <view class="custom-title">
              <text class="custom-title__main">服务状态</text>
              <bt-tag text="实时" type="success" size="small" />
            </view>
          </template>
          <view class="status-panel">
            <view class="status-panel__bar">
              <view class="status-panel__bar-inner" />
            </view>
            <text class="status-panel__text">今日服务可用率 99.98%</text>
          </view>
        </bt-group>
      </demo-block>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
function showToast(title: string) {
  uni.showToast({
    title,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.page-group {
  padding-bottom: 32px;
}

.group-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
  }

  &__label {
    color: #666;
    font-size: 14px;
  }

  &__value {
    color: #222;
    font-size: 14px;
    font-weight: 500;
  }
}

.card-panel {
  display: flex;
  justify-content: space-between;

  &__item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  &__value {
    font-size: 22px;
    font-weight: 700;
    color: var(--bt-color-theme, #4d80f0);
  }

  &__label {
    font-size: 12px;
    color: #999;
  }
}

.group-link {
  font-size: 13px;
  color: var(--bt-color-theme, #4d80f0);
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #444;
  }
}

.group-banner {
  display: block;
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #edf4ff, #dce8ff);
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;

  &__main {
    font-size: 15px;
    font-weight: 600;
    color: #1f1f1f;
  }
}

.status-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__bar {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    overflow: hidden;
    background: #edf2ff;
  }

  &__bar-inner {
    width: 82%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #4d80f0, #37c2a7);
  }

  &__text {
    font-size: 14px;
    color: #666;
  }
}
</style>
