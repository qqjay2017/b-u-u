<template>
  <page-wraper>
    <view class="page-section">
      <demo-block title="基础用法" transparent>
        <bt-section title="设备概览" type="line" />
      </demo-block>

      <demo-block title="副标题和右侧插槽" transparent>
        <bt-section title="电站列表" sub-title="按距离排序" type="circle" @click="showToast('点击了标题栏')">
          <template #right>
            <text class="section-link">更多</text>
          </template>
        </bt-section>
      </demo-block>

      <demo-block title="内容区域内边距" transparent>
        <bt-section title="今日数据" type="square" padding divider>
          <view class="metric-grid">
            <view class="metric-grid__item">
              <text class="metric-grid__value">286</text>
              <text class="metric-grid__label">充电次数</text>
            </view>
            <view class="metric-grid__item">
              <text class="metric-grid__value">1,236</text>
              <text class="metric-grid__label">服务电量</text>
            </view>
            <view class="metric-grid__item">
              <text class="metric-grid__value">18</text>
              <text class="metric-grid__label">异常告警</text>
            </view>
          </view>
        </bt-section>
      </demo-block>

      <demo-block title="自定义装饰插槽" transparent>
        <bt-section title="运营播报">
          <template #decoration>
            <view class="custom-dot" />
          </template>
          <template #right>
            <bt-tag text="NEW" type="error" size="small" />
          </template>
        </bt-section>
      </demo-block>

      <demo-block title="自定义标题插槽" transparent>
        <bt-section padding="0 16px 16px" divider>
          <template #title>
            <view class="custom-heading">
              <text class="custom-heading__title">服务提醒</text>
              <text class="custom-heading__sub">3 条待处理</text>
            </view>
          </template>
          <view class="notice-card">请在今日 20:00 前完成巡检并回传照片。</view>
        </bt-section>
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
.page-section {
  padding-bottom: 32px;
}

.section-link {
  font-size: 13px;
  color: var(--bt-color-theme, #4d80f0);
}

.metric-grid {
  display: flex;
  justify-content: space-between;
  gap: 12px;

  &__item {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 6px;
    padding: 14px 12px;
    border-radius: 10px;
    background: #f7f8fa;
  }

  &__value {
    font-size: 20px;
    font-weight: 700;
    color: #1f1f1f;
  }

  &__label {
    font-size: 12px;
    color: #999;
  }
}

.custom-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8a65, #ff5252);
  box-shadow: 0 0 0 4px rgb(255 82 82 / 12%);
}

.custom-heading {
  display: flex;
  align-items: baseline;
  gap: 8px;

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #1f1f1f;
  }

  &__sub {
    font-size: 12px;
    color: #999;
  }
}

.notice-card {
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: #5c4b2f;
  background: linear-gradient(135deg, #fff9e8, #fff3d6);
}
</style>
