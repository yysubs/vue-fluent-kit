<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  applyBrandTokens,
  resetBrandTokens,
  useTheme,
  type BrandVariants,
  type ResolvedTheme,
} from './index'

export interface VfkThemeProviderProps {
  /** 局部作用域主题，不传时跟随全局解析后的明暗主题 */
  theme?: ResolvedTheme
  /** 仅作用于当前容器的自定义品牌色阶 */
  brand?: BrandVariants
  /** 容器渲染的 HTML 标签名 */
  as?: string
}

const props = withDefaults(defineProps<VfkThemeProviderProps>(), {
  theme: undefined,
  brand: undefined,
  as: 'div',
})

const { resolvedTheme } = useTheme()
const containerRef = ref<HTMLElement | null>(null)

const effectiveTheme = computed<ResolvedTheme>(() => props.theme ?? resolvedTheme.value)

function syncBrand() {
  if (!containerRef.value) return
  if (props.brand) {
    applyBrandTokens(props.brand, effectiveTheme.value, containerRef.value)
  } else {
    resetBrandTokens(containerRef.value)
  }
}

onMounted(syncBrand)
watch([() => props.brand, effectiveTheme], syncBrand)
onBeforeUnmount(() => {
  if (containerRef.value) {
    resetBrandTokens(containerRef.value)
  }
})
</script>

<template>
  <component :is="as" ref="containerRef" :data-vfk-theme="effectiveTheme">
    <slot />
  </component>
</template>
