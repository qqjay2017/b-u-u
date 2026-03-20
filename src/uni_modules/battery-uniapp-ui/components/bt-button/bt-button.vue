<template>
  <button
    :class="rootClass"
    :style="customStyle"
    :disabled="disabled || loading"
    :hover-class="disabled || loading ? '' : 'bt-button--active'"
    @click="handleClick"
  >
    <view v-if="loading" class="bt-button__loading">
      <view class="bt-button__loading-icon" />
    </view>
    <view class="bt-button__text">
      <!-- @slot default 按钮内容 -->
      <slot />
    </view>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { buttonProps } from "./types";

const props = defineProps(buttonProps);
const emit = defineEmits<{
  /** 点击按钮时触发 */
  click: [event: Event];
}>();

const rootClass = computed(() => {
  const classes = ["bt-button"];
  if (props.type !== "default") {
    classes.push(`bt-button--${props.type}`);
  }
  if (props.size !== "medium") {
    classes.push(`bt-button--${props.size}`);
  }
  if (props.plain) classes.push("is-plain");
  if (props.round) classes.push("is-round");
  if (props.disabled) classes.push("is-disabled");
  if (props.block) classes.push("is-block");
  if (props.loading) classes.push("is-loading");
  if (props.customClass) classes.push(props.customClass);
  return classes.join(" ");
});

function handleClick(event: Event) {
  if (props.disabled || props.loading) return;
  emit("click", event);
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
