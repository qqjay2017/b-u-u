<template>
  <page-wraper>
    <view class="tag-page">
      <demo-block title="基本用法">
        <view class="tag-row">
          <bt-tag text="默认标签" />
          <bt-tag text="主题标签" type="primary" @click="showToast('主题标签')" />
          <bt-tag text="成功标签" type="success" />
          <bt-tag text="警告标签" type="warning" />
          <bt-tag text="危险标签" type="error" />
        </view>
      </demo-block>

      <demo-block title="不同尺寸">
        <view class="tag-row">
          <bt-tag text="Small" size="small" />
          <bt-tag text="Medium" size="medium" />
          <bt-tag text="Mini" size="mini" />
        </view>
      </demo-block>

      <demo-block title="空心样式">
        <view class="tag-row">
          <bt-tag text="默认空心" inverted />
          <bt-tag text="主题空心" type="primary" inverted />
          <bt-tag text="成功空心" type="success" inverted />
          <bt-tag text="警告空心" type="warning" inverted />
          <bt-tag text="危险空心" type="error" inverted />
        </view>
      </demo-block>

      <demo-block title="圆角和标记样式">
        <view class="tag-row">
          <bt-tag text="圆角标签" type="primary" circle />
          <bt-tag text="标记标签" type="warning" mark />
          <bt-tag text="圆角空心" type="success" circle inverted />
        </view>
      </demo-block>

      <demo-block title="禁用状态">
        <view class="tag-row">
          <bt-tag text="默认禁用" disabled />
          <bt-tag text="主题禁用" type="primary" disabled />
          <bt-tag text="空心禁用" type="success" inverted disabled />
        </view>
      </demo-block>

      <demo-block title="插槽内容">
        <view class="tag-row">
          <bt-tag type="primary" circle>
            <text>消息 12</text>
          </bt-tag>
          <bt-tag type="error" custom-class="tag-hot">
            <text>HOT</text>
          </bt-tag>
        </view>
      </demo-block>

      <demo-block title="自定义样式">
        <view class="tag-row">
          <bt-tag text="渐变标签" custom-class="tag-gradient" />
          <bt-tag text="深色标签" custom-style="background:#222;color:#fff;border-color:#222;" />
        </view>
      </demo-block>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
function showToast(label: string) {
  uni.showToast({
    title: `点击了${label}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.tag-page {
  padding-bottom: 32px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;

  :deep(.bt-tag) {
    margin: 0 10px 10px 0;
  }

  :deep(.tag-gradient) {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, #4d80f0, #37c2a7);
  }

  :deep(.tag-hot) {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, #ff7a18, #ff3d54);
    box-shadow: 0 4px 10px rgb(255 61 84 / 18%);
  }
}
</style>
