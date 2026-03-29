<template>
  <view>
    <view class="page-wraper" @click="closeOutside">
      <wd-cell :title="$t('qie-huan-an-hei')" title-width="240px" center v-if="showDarkMode">
        <wd-switch v-model="isDark" />
      </wd-cell>
      <wd-cell :title="$t('qie-huan-zhu-ti-se')" title-width="240px" center v-if="showDarkMode">
        <wd-switch v-model="isRed" />
      </wd-cell>
      <slot />

      <wd-gap height="0" v-if="safeAreaInsetBottom" safe-area-bottom></wd-gap>
    </view>

    <!-- #ifdef MP-WEIXIN -->
    <wd-fab v-model:active="fabActive" draggable type="error" :gap="{ bottom: 58 }" direction="left" v-if="enableRewardFab">
      <bt-button type="error" round @click="goToReward">
        <view style="display: flex; align-items: center">
          <wd-icon name="thumb-up" size="22px"></wd-icon>
          <text>{{ $t('kan-shi-pin-mian-guang-gao') }}</text>
        </view>
      </bt-button>
    </wd-fab>
    <!-- #endif -->
  </view>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, ref, onMounted, nextTick } from 'vue'
// import { setNotifyDefaultOptions, useQueue, type ConfigProviderThemeVars, useConfigProvider } from '@/uni_modules/battery-uniapp-ui'
import { useDark } from '../../store'

interface Props {
  showDarkMode?: boolean
  safeAreaInsetBottom?: boolean
  useWxAd?: boolean
  useRewardFab?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDarkMode: false,
  safeAreaInsetBottom: true,
  useWxAd: process.env.NODE_ENV === 'development' ? false : true,
  useRewardFab: false
})

const enableRewardFab = computed(() => {
  return props.useRewardFab && (process.env.NODE_ENV === 'development' ? false : true)
})

const darkMode = useDark()

const isDark = ref<boolean>(false)
const isRed = ref<boolean>(false)
// #ifdef MP-WEIXIN
const fabActive = ref<boolean>(false)
// 横幅广告和格子广告可以共存，但插屏广告展示时，不显示横幅广告和格子广告

// #endif

// const themeVars = computed<ConfigProviderThemeVars>(() => {
//   return isRed.value ? { colorTheme: 'red' } : {}
// })

// useConfigProvider({ themeVars })

function closeOutside() {
  //
}

const theme = computed(() => {
  return darkMode.isDark.value || isDark.value ? 'dark' : 'light'
})

function goToReward() {
  fabActive.value = false
  uni.navigateTo({
    url: '/subPages/wxRewardAd/Index'
  })
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .page-wraper {
    background: #000;
  }
}
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
}
</style>
