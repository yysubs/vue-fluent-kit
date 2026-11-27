import {
  createDarkTheme,
  createLightTheme,
  type BrandVariants,
  type Theme,
} from '@fluentui/tokens'
import { computed, ref, watchEffect } from 'vue'

export type { BrandVariants } from '@fluentui/tokens'

/** 主题模式：浅色、深色或跟随系统 */
export type ThemeMode = 'light' | 'dark' | 'system'

/** 解析后的实际明暗主题 */
export type ResolvedTheme = 'light' | 'dark'

const THEME_ATTR = 'data-vfk-theme'

const appliedBrandKeys = new WeakMap<HTMLElement, string[]>()

function readSystemDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const mode = ref<ThemeMode>('light')
const systemDark = ref<boolean>(readSystemDark())
const activeBrand = ref<BrandVariants | null>(null)

let mediaQueryBound = false
let effectInitialized = false

function bindSystemThemeListener(): void {
  if (mediaQueryBound || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return
  }
  mediaQueryBound = true
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = (event: MediaQueryListEvent) => {
    systemDark.value = event.matches
  }
  query.addEventListener('change', handleChange)
}

const resolvedTheme = computed<ResolvedTheme>(() => {
  if (mode.value === 'system') {
    return systemDark.value ? 'dark' : 'light'
  }
  return mode.value
})

/** 从 Fluent 2 主题对象中提取品牌色相关变量，写入目标节点行内样式 */
export function applyBrandTokens(
  brand: BrandVariants,
  resolved: ResolvedTheme = resolvedTheme.value,
  target?: HTMLElement,
): void {
  const host = target ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!host) return

  if (!target) {
    activeBrand.value = brand
  }

  const theme: Theme = resolved === 'dark' ? createDarkTheme(brand) : createLightTheme(brand)
  const keys: string[] = []
  for (const [key, value] of Object.entries(theme)) {
    if (key.includes('Brand')) {
      const cssVar = `--${key}`
      host.style.setProperty(cssVar, String(value))
      keys.push(cssVar)
    }
  }
  appliedBrandKeys.set(host, keys)
}

/** 清除目标节点上通过 applyBrandTokens 写入的品牌色覆盖，恢复默认中性/官方变量 */
export function resetBrandTokens(target?: HTMLElement): void {
  const host = target ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!target) {
    activeBrand.value = null
  }
  if (!host) return

  const keys = appliedBrandKeys.get(host)
  if (keys) {
    for (const cssVar of keys) {
      host.style.removeProperty(cssVar)
    }
    appliedBrandKeys.delete(host)
  }
}

/** 将浅色/深色主题属性写入指定节点或全局根节点 */
export function setVfkTheme(next: ThemeMode, target?: HTMLElement): void {
  if (target) {
    const resolved: ResolvedTheme =
      next === 'system' ? (systemDark.value ? 'dark' : 'light') : next
    target.setAttribute(THEME_ATTR, resolved)
    return
  }

  mode.value = next
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute(THEME_ATTR, resolvedTheme.value)
    if (activeBrand.value) {
      applyBrandTokens(activeBrand.value, resolvedTheme.value, document.documentElement)
    }
  }
}

/** 全局响应式主题控制器，首次调用时自动监听系统主题并同步到文档根节点 */
export function useTheme() {
  bindSystemThemeListener()

  if (!effectInitialized && typeof document !== 'undefined') {
    effectInitialized = true
    watchEffect(() => {
      const current = resolvedTheme.value
      document.documentElement.setAttribute(THEME_ATTR, current)
      if (activeBrand.value) {
        applyBrandTokens(activeBrand.value, current, document.documentElement)
      }
    })
  }

  return {
    /** 当前选择的主题模式（light / dark / system） */
    mode,
    /** 解析后的实际明暗主题（light / dark） */
    resolvedTheme,
    /** 当前全局生效的自定义品牌色阶，null 表示使用默认主题色 */
    activeBrand,
    setTheme: (next: ThemeMode) => setVfkTheme(next),
    toggleTheme: () => {
      setVfkTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
    },
    applyBrandTokens,
    resetBrandTokens,
  }
}

export { default as VfThemeProvider } from './VfThemeProvider.vue'
export type { VfThemeProviderProps } from './VfThemeProvider.vue'
