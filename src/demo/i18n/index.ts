import { computed, ref, watchEffect } from 'vue'
import {
  demoLocaleOptions,
  demoMessages,
  type DemoLocale,
  type DemoLocaleOption,
  type DemoMessages,
} from './messages'

export type { DemoLocale, DemoLocaleOption, DemoMessages } from './messages'
export { demoLocaleOptions } from './messages'

const STORAGE_KEY = 'vfk-demo-locale'
export const DEFAULT_DEMO_LOCALE: DemoLocale = 'zh-CN'

function isDemoLocale(value: string | null): value is DemoLocale {
  return value === 'zh-CN' || value === 'zh-TW' || value === 'en-US'
}

function readInitialLocale(): DemoLocale {
  if (typeof window === 'undefined') return DEFAULT_DEMO_LOCALE
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isDemoLocale(saved)) return saved
  } catch {
    // 隐私模式等场景下忽略 storage 读写异常
  }
  return DEFAULT_DEMO_LOCALE
}

const locale = ref<DemoLocale>(readInitialLocale())
const messages = computed<DemoMessages>(() => demoMessages[locale.value])

let synced = false

/** 切换 Demo 展示语言，并同步更新 html lang 与本地存储 */
export function setDemoLocale(next: DemoLocale): void {
  locale.value = next
  if (typeof document !== 'undefined') {
    document.documentElement.lang = next
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // 忽略本地存储不可用场景
    }
  }
}

/** Demo 多语言状态钩子，默认简体中文，支持切换繁体中文与英文 */
export function useDemoI18n() {
  if (!synced && typeof document !== 'undefined') {
    synced = true
    watchEffect(() => {
      document.documentElement.lang = locale.value
    })
  }

  return {
    /** 当前语言代码 */
    locale,
    /** 当前语言对应的文案表 */
    messages,
    /** 可切换语言列表 */
    localeOptions: demoLocaleOptions,
    setLocale: setDemoLocale,
  }
}
