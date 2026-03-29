<template>
  <details class="demo-code details custom-block">
    <summary>{{ title }}</summary>
    <div class="demo-code-body">
      <div class="demo-code-toolbar">
        <span v-if="copied" class="demo-code-copied">已复制!</span>
        <button class="demo-code-copy" title="复制代码" @click="copy">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <div class="vp-code-group">
        <div class="language-vue vp-adaptive-theme">
          <span class="lang">vue</span>
          <pre class="shiki"><code>{{ source }}</code></pre>
        </div>
      </div>
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  /** 源码字符串 */
  source: string
  /** 折叠标题 */
  title?: string
}>(), {
  title: 'Demo 源码',
})

const copied = ref(false)

async function copy() {
  if (!props.source) return
  try {
    await navigator.clipboard.writeText(props.source)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = props.source
    textarea.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style scoped>
.demo-code-body {
  position: relative;
}

.demo-code-toolbar {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.demo-code-copied {
  font-size: 12px;
  color: var(--vp-c-brand);
}

.demo-code-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;
}

.demo-code-copy:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.demo-code-body pre {
  max-height: 600px;
  overflow: auto;
}
</style>
