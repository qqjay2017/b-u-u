<template>
  <page-wraper>
    <view class="demo-page">
      <demo-block title="基本用法（字符串列表）">
        <bt-tabs v-model="tab1" :tabs="tabs1" />
        <view class="tab-content">当前选中：{{ tabs1[tab1] }}</view>
      </demo-block>

      <demo-block title="胶囊样式">
        <bt-tabs v-model="tab2" :tabs="tabs1" type="pills" />
        <view class="tab-content">当前选中：{{ tabs1[tab2] }}</view>
      </demo-block>

      <demo-block title="选中加粗">
        <bt-tabs v-model="tab3" :tabs="tabs1" bold />
      </demo-block>

      <demo-block title="可滚动（多 tab）">
        <bt-tabs v-model="tab4" :tabs="tabsLong" />
        <view class="tab-content">当前选中：{{ tabsLong[tab4] }}</view>
      </demo-block>

      <demo-block title="下划线缩放比例">
        <bt-tabs v-model="tab5" :tabs="tabs1" :line-scale="1" />
        <view class="tab-content">line-scale=1（下划线与 tab 等宽）</view>
      </demo-block>

      <demo-block title="禁用切换动画">
        <bt-tabs v-model="tab6" :tabs="tabs1" :animated="false" />
      </demo-block>

      <demo-block title="对象列表（field 指定显示字段）">
        <bt-tabs v-model="tab7" :tabs="tabsObj" field="label" />
        <view class="tab-content">当前选中：{{ tabsObj[tab7]?.label }}</view>
      </demo-block>

      <demo-block title="禁用某个选项">
        <bt-tabs v-model="tab8" :tabs="tabsDisabled" field="label" />
        <view class="tab-content">第二项已禁用</view>
      </demo-block>

      <demo-block title="自定义插槽">
        <bt-tabs v-model="tab9" :tabs="tabs1">
          <template #default="{ row, index }">
            <view class="custom-tab">
              <text class="custom-tab__dot" :class="{ 'is-active': tab9 === index }"></text>
              {{ row }}
            </view>
          </template>
        </bt-tabs>
      </demo-block>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs1 = ['全部', '进行中', '已完成', '已取消']
const tabsLong = ['首页', '推荐', '热门', '关注', '附近', '直播', '购物', '游戏', '音乐', '电影']
const tabsObj = [
  { label: '待付款', value: 0 },
  { label: '待发货', value: 1 },
  { label: '待收货', value: 2 },
  { label: '已完成', value: 3 }
]
const tabsDisabled = [
  { label: '全部', value: 0 },
  { label: '禁用项', value: 1, disabled: true },
  { label: '进行中', value: 2 }
]

const tab1 = ref(0)
const tab2 = ref(0)
const tab3 = ref(0)
const tab4 = ref(0)
const tab5 = ref(0)
const tab6 = ref(0)
const tab7 = ref(0)
const tab8 = ref(0)
const tab9 = ref(0)
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 0 0 32px;
}

.tab-content {
  margin: 12px 16px 0;
  font-size: 13px;
  color: #888;
}

.custom-tab {
  display: flex;
  align-items: center;
  gap: 4px;

  &__dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ccc;
    transition: background 0.2s;

    &.is-active {
      background: var(--bt-color-theme, #4d80f0);
    }
  }
}
</style>
