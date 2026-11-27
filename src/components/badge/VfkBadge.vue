<script setup lang="ts">
import '@fluentui/web-components/badge.js'
import { ref } from 'vue'
import type { VfkBadgeProps } from './types'

withDefaults(defineProps<VfkBadgeProps>(), {
  appearance: 'filled',
  color: 'brand',
  size: 'medium',
  shape: 'circular',
})

defineSlots<{
  /** 徽标文字 */
  default?: () => unknown
  /** 前置图标 */
  start?: () => unknown
  /** 后置内容 */
  end?: () => unknown
}>()

const el = ref<HTMLElement | null>(null)

defineExpose({ el })
</script>

<template>
  <fluent-badge
    ref="el"
    :appearance.attr="appearance"
    :color.attr="color"
    :size.attr="size"
    :shape.attr="shape"
  >
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline"><slot name="start" /></span>
    <slot />
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline"><slot name="end" /></span>
  </fluent-badge>
</template>
