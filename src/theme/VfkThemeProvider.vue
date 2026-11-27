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

const { resolvedTheme, activeBrand } = useTheme()
const containerRef = ref<HTMLElement | null>(null)

const effectiveTheme = computed<ResolvedTheme>(() => props.theme ?? resolvedTheme.value)
const effectiveBrand = computed<BrandVariants | null>(() => props.brand ?? activeBrand.value)

/** 将局部或全局品牌色按当前容器明暗模式写入，避免 data-vfk-theme 属性重置全局品牌色 */
function syncBrand() {
  if (!containerRef.value) return
  if (effectiveBrand.value) {
    applyBrandTokens(effectiveBrand.value, effectiveTheme.value, containerRef.value)
  } else {
    resetBrandTokens(containerRef.value)
  }
}

onMounted(syncBrand)
watch([effectiveBrand, effectiveTheme], syncBrand)
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
