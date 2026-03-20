<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import PhonePreview from './components/PhonePreview.vue'

const { Layout } = DefaultTheme
const route = useRoute()

const isComponentPage = computed(() => {
  return /\/component\/[^/]+/.test(route.path)
})
</script>

<template>
  <div :class="{ 'has-phone-preview': isComponentPage }">
    <Layout>
      <template #doc-after />
    </Layout>
    <!-- 手机模拟器：悬浮在右侧 -->
    <div v-if="isComponentPage" class="phone-preview-container">
      <PhonePreview />
    </div>
  </div>
</template>
