<template>
  <page-wraper>
    <view class="page-upload-image">
      <demo-block title="基础用法">
        <bt-upload-image v-model="images" title="上传凭证" @select="handleSelect" @success="handleSuccess" @delete="handleDelete" />
      </demo-block>

      <demo-block title="单图模式">
        <bt-upload-image v-model="cover" title="封面图" return-type="object" :limit="1" disable-preview>
          <view class="upload-trigger">
            <text class="upload-trigger__text">上传封面</text>
          </view>
        </bt-upload-image>
      </demo-block>

      <demo-block title="手动上传">
        <bt-upload-image ref="manualRef" v-model="manualImages" title="手动上传" :auto-upload="false" />
        <view class="button-row">
          <bt-button size="small" @click="triggerManualUpload">开始上传</bt-button>
          <bt-button size="small" type="info" plain @click="clearManualFiles">清空</bt-button>
        </view>
        <view class="tip">未接入 uniCloud 时，可选择和预览，本地不会真正上传。</view>
      </demo-block>

      <demo-block title="只读回显">
        <bt-upload-image v-model="readonlyImages" title="已上传图片" readonly />
      </demo-block>

      <demo-block title="自定义宫格尺寸">
        <bt-upload-image
          v-model="customImages"
          title="驾驶证照片"
          :limit="2"
          :image-styles="{ width: 140, height: 96, border: { radius: 12, color: '#d7deeb' } }"
        />
      </demo-block>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadImageFile, UploadImageModelValue } from '../../uni_modules/battery-uniapp-ui/components/bt-upload-image'

const images = ref<UploadImageFile[]>([])
const cover = ref<UploadImageModelValue>(null)
const manualImages = ref<UploadImageFile[]>([])
const customImages = ref<UploadImageFile[]>([])
const manualRef = ref<any>(null)
const readonlyImages = ref<UploadImageFile[]>([
  {
    name: 'app.png',
    extname: 'png',
    fileType: 'image',
    path: '/static/icon/app.png',
    url: '/static/icon/app.png',
    size: 0,
    uuid: 'demo_app',
    status: 'success',
    progress: 100
  },
  {
    name: 'about.png',
    extname: 'png',
    fileType: 'image',
    path: '/static/icon/about.png',
    url: '/static/icon/about.png',
    size: 0,
    uuid: 'demo_about',
    status: 'success',
    progress: 100
  }
])

function handleSelect(event: any) {
  uni.showToast({
    title: `已选择 ${event.tempFiles.length} 张图片`,
    icon: 'none'
  })
}

function handleSuccess(event: any) {
  uni.showToast({
    title: `上传成功 ${event.tempFiles.length} 张`,
    icon: 'none'
  })
}

function handleDelete() {
  uni.showToast({
    title: '已删除图片',
    icon: 'none'
  })
}

function triggerManualUpload() {
  manualRef.value?.upload()
}

function clearManualFiles() {
  manualRef.value?.clearFiles()
}
</script>

<style lang="scss" scoped>
.page-upload-image {
  padding-bottom: 32px;
}

.upload-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__text {
    font-size: 14px;
    color: var(--bt-color-theme, #4d80f0);
  }
}

.button-row {
  display: flex;
  gap: 12px;
  margin: 12px 0 0 16px;
}

.tip {
  margin: 10px 16px 0;
  font-size: 12px;
  color: #999;
}
</style>
