<template>
  <page-wraper>
    <view class="page-action-sheet">
      <!-- 基本用法 -->
      <demo-block title="基本用法">
        <bt-button @click="showBasic = true">打开 ActionSheet</bt-button>
        <bt-action-sheet
          v-model:show="showBasic"
          :actions="basicActions"
          @select="onSelect"
        />
      </demo-block>

      <!-- 带取消按钮 -->
      <demo-block title="带取消按钮">
        <bt-button @click="showCancel = true">带取消按钮</bt-button>
        <bt-action-sheet
          v-model:show="showCancel"
          :actions="basicActions"
          cancel-text="取消"
          @select="onSelect"
          @cancel="onCancel"
        />
      </demo-block>

      <!-- 带标题 -->
      <demo-block title="带标题">
        <bt-button @click="showTitle = true">带标题</bt-button>
        <bt-action-sheet
          v-model:show="showTitle"
          title="请选择操作"
          :actions="basicActions"
          cancel-text="取消"
          @select="onSelect"
        />
      </demo-block>

      <!-- 带描述信息 -->
      <demo-block title="带描述信息">
        <bt-button @click="showDesc = true">带描述信息</bt-button>
        <bt-action-sheet
          v-model:show="showDesc"
          title="请选择操作"
          description="这是一段描述信息，用于说明操作的详细内容"
          :actions="basicActions"
          cancel-text="取消"
          @select="onSelect"
        />
      </demo-block>

      <!-- 禁用选项 -->
      <demo-block title="禁用选项">
        <bt-button @click="showDisabled = true">含禁用选项</bt-button>
        <bt-action-sheet
          v-model:show="showDisabled"
          :actions="disabledActions"
          cancel-text="取消"
          @select="onSelect"
        />
      </demo-block>

      <!-- 加载状态 -->
      <demo-block title="加载状态">
        <bt-button @click="showLoading = true">含加载选项</bt-button>
        <bt-action-sheet
          v-model:show="showLoading"
          :actions="loadingActions"
          cancel-text="取消"
          @select="onSelect"
        />
      </demo-block>

      <!-- 自定义颜色 -->
      <demo-block title="自定义颜色">
        <bt-button @click="showColor = true">自定义颜色</bt-button>
        <bt-action-sheet
          v-model:show="showColor"
          :actions="colorActions"
          cancel-text="取消"
          @select="onSelect"
        />
      </demo-block>

      <!-- 带子标题 -->
      <demo-block title="带子标题">
        <bt-button @click="showSubname = true">带子标题</bt-button>
        <bt-action-sheet
          v-model:show="showSubname"
          :actions="subnameActions"
          cancel-text="取消"
          @select="onSelect"
        />
      </demo-block>

      <!-- 点击选项关闭 -->
      <demo-block title="点击选项自动关闭">
        <bt-button @click="showAutoClose = true">点击选项自动关闭</bt-button>
        <bt-action-sheet
          v-model:show="showAutoClose"
          :actions="basicActions"
          cancel-text="取消"
          :close-on-click-action="true"
          @select="onSelect"
        />
      </demo-block>

      <!-- 点击遮罩关闭 -->
      <demo-block title="点击遮罩关闭">
        <bt-button @click="showOverlay = true">点击遮罩关闭</bt-button>
        <bt-action-sheet
          v-model:show="showOverlay"
          :actions="basicActions"
          cancel-text="取消"
          :close-on-click-overlay="true"
          @select="onSelect"
        />
      </demo-block>

      <!-- 函数式调用 -->
      <demo-block title="函数式调用">
        <bt-button @click="handleShowActionSheet">函数式调用</bt-button>
        <bt-action-sheet-provider ref="providerRef" />
      </demo-block>

      <!-- 操作结果提示 -->
      <view v-if="result" class="page-action-sheet__result">
        {{ result }}
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showActionSheet } from '@/uni_modules/battery-uniapp-ui/components/bt-action-sheet/action-sheet-observer'
import type { ActionSheetAction } from '@/uni_modules/battery-uniapp-ui/components/bt-action-sheet/types'

const showBasic = ref(false)
const showCancel = ref(false)
const showTitle = ref(false)
const showDesc = ref(false)
const showDisabled = ref(false)
const showLoading = ref(false)
const showColor = ref(false)
const showSubname = ref(false)
const showAutoClose = ref(false)
const showOverlay = ref(false)

const result = ref('')

const basicActions: ActionSheetAction[] = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' },
]

const disabledActions: ActionSheetAction[] = [
  { name: '选项一' },
  { name: '选项二（禁用）', disabled: true },
  { name: '选项三' },
]

const loadingActions: ActionSheetAction[] = [
  { name: '选项一' },
  { name: '加载中', loading: true },
  { name: '选项三' },
]

const colorActions: ActionSheetAction[] = [
  { name: '红色选项', color: '#ee0a24' },
  { name: '蓝色选项', color: '#1989fa' },
  { name: '普通选项' },
]

const subnameActions: ActionSheetAction[] = [
  { name: '选项一', subname: '描述信息' },
  { name: '选项二', subname: '描述信息' },
  { name: '选项三', subname: '描述信息' },
]

function onSelect(action: ActionSheetAction, index: number) {
  result.value = `选中：${action.name}（索引 ${index}）`
}

function onCancel() {
  result.value = '已取消'
}

async function handleShowActionSheet() {
  const res = await showActionSheet({
    actions: basicActions,
    title: '函数式调用',
    cancelText: '取消',
  })
  if (res) {
    result.value = `函数式选中：${res.action.name}（索引 ${res.index}）`
  }
  else {
    result.value = '函数式取消'
  }
}
</script>

<style lang="scss" scoped>
.page-action-sheet {
  :deep(button) {
    margin-bottom: 12rpx;
  }

  &__result {
    margin: 24rpx 32rpx;
    padding: 20rpx 24rpx;
    background: #f2f3f5;
    border-radius: 8rpx;
    font-size: 28rpx;
    color: #323233;
  }
}
</style>
