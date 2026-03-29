<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page">123</view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
</script>

<style lang="scss" scoped>
.page__hd {
  padding: 15px 15px 0 20px;
}

.page__title {
  text-align: left;
  font-size: 24px;
  font-weight: 600;
}

.page__desc {
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
}

.page__intro {
  margin-top: 10px;
  text-align: left;
  font-size: 14px;
}

.page__bd {
  padding: 0 15px 30px 20px;
  user-select: none;
  border-radius: 10px;
}

.core-team {
  margin-top: 20px;
}

.core-team__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.core-team__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.core-team__member {
  flex: 1 1 25%;
  max-width: 25%;
  box-sizing: border-box;
  margin-bottom: 10px;
  text-align: center;
  transition: transform 0.3s;
}

.core-team__member:hover {
  transform: scale(1.05);
}

.core-team__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
  border: 2px solid #0083ff;
}

.core-team__name {
  margin-top: 5px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto;
}

// 移除了不再需要的language-switch相关样式

.additional-links {
  margin-top: 20px;
}

.additional-links__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.additional-links__icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
