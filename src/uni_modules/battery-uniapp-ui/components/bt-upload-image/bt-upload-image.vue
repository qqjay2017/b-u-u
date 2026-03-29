<template>
  <view :class="rootClass" :style="customStyle">
    <view v-if="title" class="bt-upload-image__header">
      <text class="bt-upload-image__title">{{ title }}</text>
      <text class="bt-upload-image__count">{{ files.length }}/{{ maxCount }}</text>
    </view>

    <bt-file-picker
      :files="files"
      :limit="maxCount"
      :disabled="disabled"
      :readonly="readonly"
      :del-icon="delIcon"
      :image-styles="imageStyles"
      @choose="choose"
      @preview="previewImage"
      @delete="deleteFile"
      @retry="retryUpload"
    >
      <slot />
    </bt-file-picker>
  </view>
</template>

<script lang="ts">
export default {
  name: 'bt-upload-image',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BtFilePicker from './bt-file-picker.vue'
import { chooseAndUploadFile, uploadCloudFiles } from './choose-and-upload-file'
import { buildCloudPath, cloneOutputFile, getExtname, getFileData, getFilesAndIsMax, isCloudFile, normalizeLimit, normalizeModelValue } from './utils'
import { uploadImageProps } from './types'
import type {
  ChooseAndUploadTempFile,
  UploadImageDeleteEvent,
  UploadImageFile,
  UploadImageModelValue,
  UploadImageProgressEvent,
  UploadImageSelectEvent
} from './types'

const props = defineProps(uploadImageProps)
const emit = defineEmits<{
  'update:modelValue': [value: UploadImageModelValue]
  input: [value: UploadImageModelValue]
  select: [event: UploadImageSelectEvent]
  progress: [event: UploadImageProgressEvent]
  success: [event: UploadImageSelectEvent]
  fail: [event: UploadImageSelectEvent]
  delete: [event: UploadImageDeleteEvent]
}>()

const files = ref<UploadImageFile[]>([])

const rootClass = computed(() => {
  const classes = ['bt-upload-image']
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const maxCount = computed(() => normalizeLimit(props.limit, props.returnType))
const canUseCloudUpload = computed(() => !!(globalThis as any).uniCloud?.uploadFile)
const canResolveCloudUrl = computed(() => !!(globalThis as any).uniCloud?.getTempFileURL)

watch(
  () => [props.modelValue, props.value, props.returnType],
  async () => {
    await syncFromProps()
  },
  { immediate: true, deep: true }
)

async function syncFromProps() {
  const source = props.modelValue !== undefined ? props.modelValue : props.value
  const normalizedFiles = normalizeModelValue(source)
  const resolvedFiles = await Promise.all(normalizedFiles.map((item) => resolveIncomingFile(item)))
  files.value = resolvedFiles
}

async function resolveIncomingFile(file: UploadImageFile) {
  const current = cloneOutputFile(file)
  const cloudSource = current.fileID || current.url

  if (isCloudFile(cloudSource) && canResolveCloudUrl.value) {
    current.fileID = cloudSource
    current.url = await getTempFileURL(cloudSource)
  }

  if (!current.url) current.url = current.path || current.fileID || ''
  if (!current.path) current.path = current.url
  if (!current.status) current.status = current.fileID || current.url ? 'success' : 'ready'
  if (typeof current.progress !== 'number') current.progress = current.status === 'success' ? 100 : 0

  return current
}

function chooseSingleReplace() {
  return props.returnType === 'object' || maxCount.value === 1
}

async function choose() {
  if (props.disabled || props.readonly) return

  const remaining = maxCount.value - files.value.length
  if (remaining <= 0 && !chooseSingleReplace()) {
    uni.showToast({
      title: `您最多选择 ${maxCount.value} 张图片`,
      icon: 'none'
    })
    return
  }

  try {
    const result = await chooseAndUploadFile({
      type: 'image',
      count: chooseSingleReplace() ? 1 : remaining,
      sizeType: props.sizeType,
      sourceType: props.sourceType,
      extension: getExtname(props.fileExtname)
    })

    await handleChooseResult(result)
  } catch (error: any) {
    const errMsg = error?.errMsg || error?.message
    if (!errMsg || /cancel/i.test(errMsg)) return

    uni.showToast({
      title: '选择图片失败',
      icon: 'none'
    })
  }
}

async function handleChooseResult(result: { tempFiles: ChooseAndUploadTempFile[]; tempFilePaths: string[] }) {
  const extnames = getExtname(props.fileExtname)
  let selectedFiles = result.tempFiles
  let selectedPaths = result.tempFilePaths

  if (extnames.length) {
    const filtered = getFilesAndIsMax(result as any, extnames)
    selectedFiles = filtered.files
    selectedPaths = filtered.filePaths
  }

  if (!selectedFiles.length) return

  if (chooseSingleReplace()) {
    files.value = []
  }

  const currentFiles: UploadImageFile[] = []
  for (let index = 0; index < selectedFiles.length; index += 1) {
    if (files.value.length >= maxCount.value) break

    const selected = {
      ...selectedFiles[index],
      provider: props.provider,
      cloudPath: buildCloudPath(selectedFiles[index], props.dir, index)
    }
    const fileData = await getFileData(selected)
    currentFiles.push(fileData)
    files.value.push(fileData)
  }

  emit('select', {
    tempFiles: currentFiles.map(cloneOutputFile),
    tempFilePaths: selectedPaths
  })

  emitValue()

  if (props.autoUpload && canUseCloudUpload.value) {
    await upload(currentFiles)
  }
}

async function upload(targetFiles?: UploadImageFile[]) {
  const pendingFiles = (targetFiles || files.value).filter((file) => file.status === 'ready' || file.status === 'error')

  if (!pendingFiles.length) return []

  if (!canUseCloudUpload.value) {
    uni.showToast({
      title: '未检测到 uniCloud 上传能力',
      icon: 'none'
    })
    return []
  }

  pendingFiles.forEach((file) => {
    const index = files.value.findIndex((item) => item.uuid === file.uuid)
    if (index === -1) return
    files.value[index].status = 'uploading'
    files.value[index].progress = 0
    files.value[index].errMsg = ''
  })

  const result = await uploadCloudFiles(
    pendingFiles.map((file) => ({
      name: file.name,
      path: file.path,
      size: file.size,
      fileType: file.fileType,
      cloudPath: file.cloudPath,
      uuid: file.uuid,
      provider: file.provider
    })),
    5,
    (event) => {
      const file = pendingFiles[event.index]
      const currentIndex = files.value.findIndex((item) => item.uuid === file.uuid)
      if (currentIndex === -1) return

      const progress = Math.round((event.loaded * 100) / event.total)
      files.value[currentIndex].status = 'uploading'
      files.value[currentIndex].progress = progress

      emit('progress', {
        index: currentIndex,
        progress,
        tempFile: cloneOutputFile(files.value[currentIndex])
      })
    }
  )

  const successFiles: UploadImageFile[] = []
  const failFiles: UploadImageFile[] = []

  for (const item of result) {
    const index = files.value.findIndex((file) => file.uuid === item.uuid)
    if (index === -1) continue

    if (item.errMsg) {
      files.value[index].status = 'error'
      files.value[index].errMsg = item.errMsg
      files.value[index].progress = 0
      failFiles.push(cloneOutputFile(files.value[index]))
      continue
    }

    files.value[index].fileID = item.url
    files.value[index].url = isCloudFile(item.url) ? await getTempFileURL(item.url || '') : item.url || files.value[index].url
    files.value[index].status = 'success'
    files.value[index].errMsg = ''
    files.value[index].progress = 100
    successFiles.push(cloneOutputFile(files.value[index]))
  }

  emitValue()

  if (successFiles.length) {
    emit('success', {
      tempFiles: successFiles,
      tempFilePaths: successFiles.map((item) => item.fileID || item.url)
    })
  }

  if (failFiles.length) {
    emit('fail', {
      tempFiles: failFiles,
      tempFilePaths: failFiles.map((item) => item.path)
    })
  }

  return result
}

function emitValue() {
  const output = files.value.map(cloneOutputFile)
  const nextValue = props.returnType === 'object' ? output[0] || null : output

  emit('update:modelValue', nextValue)
  emit('input', nextValue)
}

function clearFiles(index?: number) {
  if (typeof index === 'number') {
    files.value.splice(index, 1)
  } else {
    files.value = []
  }

  emitValue()
}

function deleteFile(index: number) {
  const current = files.value[index]
  if (!current) return

  emit('delete', {
    index,
    tempFile: cloneOutputFile(current),
    tempFilePath: current.url || current.path
  })

  files.value.splice(index, 1)
  emitValue()
}

function previewImage(index: number) {
  if (props.disablePreview) {
    if (chooseSingleReplace() && !props.disabled && !props.readonly) {
      void choose()
    }
    return
  }

  const urls = files.value.map((item) => item.url || item.path).filter(Boolean)
  if (!urls.length) return

  uni.previewImage({
    urls,
    current: index
  })
}

async function retryUpload(file: UploadImageFile) {
  await upload([file])
}

async function getTempFileURL(fileID: string) {
  const cloud = (globalThis as any).uniCloud
  if (!cloud?.getTempFileURL || !fileID) return fileID

  const result = await cloud.getTempFileURL({
    fileList: [fileID]
  })

  return result.fileList?.[0]?.tempFileURL || fileID
}

defineExpose({
  choose,
  upload,
  clearFiles
})
</script>

<style lang="scss">
@import './index.scss';
</style>
