<template>
  <view class="bt-upload-image-picker">
    <view v-for="(item, index) in files" :key="item.uuid || index" class="bt-upload-image-picker__item" :style="boxStyle">
      <view class="bt-upload-image-picker__card" :style="borderStyle">
        <image class="bt-upload-image-picker__image" :src="item.url || item.path" mode="aspectFill" @click="handlePreview(index)" />
        <view v-if="showDelete" class="bt-upload-image-picker__delete" @click.stop="emit('delete', index)">
          <view class="bt-upload-image-picker__delete-line" />
          <view class="bt-upload-image-picker__delete-line is-rotate" />
        </view>
        <view v-if="showProgress(item)" class="bt-upload-image-picker__progress">
          <progress
            class="bt-upload-image-picker__progress-bar"
            :percent="Math.max(item.progress, 0)"
            :stroke-width="4"
            :backgroundColor="item.errMsg ? '#ff5a5f' : '#ebebeb'"
          />
        </view>
        <view v-if="item.errMsg" class="bt-upload-image-picker__mask" @click.stop="emit('retry', item)">点击重试</view>
      </view>
    </view>

    <view v-if="showAdd" class="bt-upload-image-picker__item" :style="boxStyle">
      <view class="bt-upload-image-picker__card is-add" :style="borderStyle" @click="emit('choose')">
        <slot>
          <view class="bt-upload-image__add">
            <view class="bt-upload-image__add-icon" />
            <view class="bt-upload-image__add-icon is-rotate" />
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-file-picker',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { getPickerBorderStyle, getPickerBoxStyle } from './utils'
import type { PropType } from 'vue'
import type { UploadImageFile, UploadImageStyles } from './types'

const props = defineProps({
  files: {
    type: Array as PropType<UploadImageFile[]>,
    default: () => []
  },
  limit: {
    type: Number,
    default: 9
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  delIcon: {
    type: Boolean,
    default: true
  },
  imageStyles: {
    type: Object as PropType<UploadImageStyles>,
    default: () => ({
      width: 'auto',
      height: 'auto',
      border: {}
    })
  }
})

const emit = defineEmits<{
  choose: []
  preview: [index: number]
  delete: [index: number]
  retry: [file: UploadImageFile]
}>()

const boxStyle = computed(() => getPickerBoxStyle(props.imageStyles))
const borderStyle = computed(() => getPickerBorderStyle(props.imageStyles))
const showDelete = computed(() => props.delIcon && !props.readonly && !props.disabled)
const showAdd = computed(() => !props.readonly && !props.disabled && props.files.length < props.limit)

function showProgress(file: UploadImageFile) {
  return file.status === 'uploading' || (file.progress >= 0 && file.progress < 100)
}

function handlePreview(index: number) {
  emit('preview', index)
}
</script>
