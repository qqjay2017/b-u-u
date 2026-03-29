<script lang="ts">
export default {
  name: 'bt-action-sheet-provider'
}
</script>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import type { ActionSheetAction } from './types'
import type { ActionSheetOptions } from './action-sheet-observer'
import actionSheetObserver from './action-sheet-observer'
import BtActionSheet from './bt-action-sheet.vue'

const show = ref(false)
const actions = ref<ActionSheetAction[]>([])
const title = ref('')
const description = ref('')
const cancelText = ref('')
const closeOnClickAction = ref(true)
const closeOnClickOverlay = ref(false)

let currentResolve: ((val: { action: ActionSheetAction; index: number } | null) => void) | null = null

const unsubscribe = actionSheetObserver.subscribe((options: ActionSheetOptions & { _resolve?: typeof currentResolve }) => {
  actions.value = options.actions
  title.value = options.title ?? ''
  description.value = options.description ?? ''
  cancelText.value = options.cancelText ?? ''
  closeOnClickAction.value = options.closeOnClickAction ?? true
  closeOnClickOverlay.value = options.closeOnClickOverlay ?? false
  currentResolve = options._resolve ?? null
  show.value = true
})

onUnmounted(() => {
  unsubscribe()
})

function onSelect(action: ActionSheetAction, index: number) {
  currentResolve?.({ action, index })
  currentResolve = null
}

function onCancel() {
  currentResolve?.(null)
  currentResolve = null
}

function onClose() {
  if (currentResolve) {
    currentResolve(null)
    currentResolve = null
  }
}
</script>

<template>
  <slot />
  <BtActionSheet
    v-model:show="show"
    :actions="actions"
    :title="title"
    :description="description"
    :cancel-text="cancelText"
    :close-on-click-action="closeOnClickAction"
    :close-on-click-overlay="closeOnClickOverlay"
    @select="onSelect"
    @cancel="onCancel"
    @close="onClose"
  />
</template>
