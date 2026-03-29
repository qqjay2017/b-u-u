<script setup lang="ts">
import { type VehicleInputInstance } from '@/uni_modules/battery-uniapp-ui/components/bt-vehicle-input'
import { type VehicleKeyboardInstance } from '@/uni_modules/battery-uniapp-ui/components/bt-vehicle-keyboard'
import { ref } from 'vue'

// --- 示例1：标准车牌输入 ---
const value1 = ref('')
const inputRef1 = ref<VehicleInputInstance>()
const keyboardRef1 = ref<VehicleKeyboardInstance>()

function handleConfirm1(v: string) {
  value1.value = v
  inputRef1.value?.changeValue(v)
}
function openKeyboard1(pos: number) {
  keyboardRef1.value?.toShow(value1.value, pos)
}

// --- 示例2：带标题 ---
const value2 = ref('')
const inputRef2 = ref<VehicleInputInstance>()
const keyboardRef2 = ref<VehicleKeyboardInstance>()

function handleConfirm2(v: string) {
  value2.value = v
  inputRef2.value?.changeValue(v)
}
function openKeyboard2(pos: number) {
  keyboardRef2.value?.toShow(value2.value, pos)
}

// --- 示例3：自定义键盘（字母+数字） ---
const value3 = ref('')
const inputRef3 = ref<VehicleInputInstance>()
const keyboardRef3 = ref<VehicleKeyboardInstance>()

function handleConfirm3(v: string) {
  value3.value = v
  inputRef3.value?.changeValue(v)
}
function openKeyboard3(pos: number) {
  keyboardRef3.value?.toShow(value3.value, pos)
}

// --- 示例4：预填值 ---
const value4 = ref('沪A12345')
const inputRef4 = ref<VehicleInputInstance>()
const keyboardRef4 = ref<VehicleKeyboardInstance>()

function handleConfirm4(v: string) {
  value4.value = v
  inputRef4.value?.changeValue(v)
}
function openKeyboard4(pos: number) {
  keyboardRef4.value?.toShow(value4.value, pos)
}

// --- 示例5：内联模式（嵌入页面，无弹出动画） ---
const value5 = ref('')
const inputRef5 = ref<VehicleInputInstance>()
const keyboardRef5 = ref<VehicleKeyboardInstance>()

function handleConfirm5(v: string) {
  value5.value = v
  inputRef5.value?.changeValue(v)
}
function openKeyboard5(pos: number) {
  keyboardRef5.value?.toShow(value5.value, pos)
}
</script>

<template>
  <page-wraper>
    <view class="demo-page">
      <demo-block title="基本用法">
        <view class="input-wrap">
          <bt-vehicle-input ref="inputRef1" @change="openKeyboard1" />
        </view>
        <view v-if="value1" class="result">确认值：{{ value1 }}</view>
        <bt-vehicle-keyboard ref="keyboardRef1" @confirm="handleConfirm1" />
      </demo-block>

      <demo-block title="带标题">
        <view class="input-wrap">
          <bt-vehicle-input ref="inputRef2" @change="openKeyboard2" />
        </view>
        <view v-if="value2" class="result">确认值：{{ value2 }}</view>
        <bt-vehicle-keyboard ref="keyboardRef2" title="请输入车牌号" @confirm="handleConfirm2" />
      </demo-block>

      <demo-block title="自定义键盘（type=custom）">
        <view class="input-wrap">
          <bt-vehicle-input ref="inputRef3" :show-pointer="false" @change="openKeyboard3" />
        </view>
        <view v-if="value3" class="result">确认值：{{ value3 }}</view>
        <bt-vehicle-keyboard ref="keyboardRef3" type="custom" @confirm="handleConfirm3" />
      </demo-block>

      <demo-block title="预填值">
        <view class="input-wrap">
          <bt-vehicle-input ref="inputRef4" :init-value="value4" @change="openKeyboard4" />
        </view>
        <view v-if="value4" class="result">确认值：{{ value4 }}</view>
        <bt-vehicle-keyboard ref="keyboardRef4" @confirm="handleConfirm4" />
      </demo-block>

      <demo-block title="内联模式（嵌入页面）">
        <view class="input-wrap">
          <bt-vehicle-input ref="inputRef5" @change="openKeyboard5" />
        </view>
        <view v-if="value5" class="result">确认值：{{ value5 }}</view>
        <bt-vehicle-keyboard ref="keyboardRef5" :show-content="true" @confirm="handleConfirm5" />
      </demo-block>
    </view>
  </page-wraper>
</template>

<style lang="scss" scoped>
.demo-page {
  padding: 16px;
}

.input-wrap {
  padding: 0 8px;
}

.result {
  margin-top: 10px;
  padding: 0 8px;
  font-size: 13px;
  color: #888;
}
</style>
