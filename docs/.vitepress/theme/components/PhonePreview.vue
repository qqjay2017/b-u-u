<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { frontmatter, theme } = useData()

const simulatorBaseUrl = computed(() => {
  return (
    frontmatter.value.simulatorUrl ||
    theme.value.simulatorUrl ||
    'http://localhost:5173'
  )
})

const iframeSrc = computed(() => {
  // /component/button → /#/pages/button/index
  const match = route.path.match(/\/component\/([^/.]+)/)
  if (!match) return ''
  const componentName = match[1]
  return `${simulatorBaseUrl.value}/#/pages/${componentName}/index`
})
</script>

<template>
  <div v-if="iframeSrc" class="phone-preview">
    <div class="phone-shell">
      <div class="phone-shell__header"></div>
      <!-- iframe 内容区 -->
      <div class="phone-shell__screen">
        <iframe
          :src="iframeSrc"
          frameborder="0"
          allow="clipboard-write"
          loading="lazy"
        />
      </div>
      <!-- 底部横条 -->
      <div class="phone-shell__footer">
        <div class="phone-shell__home-bar"></div>
      </div>
    </div>
  </div>
</template>
