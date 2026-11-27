import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DEFAULT_DEMO_LOCALE, setDemoLocale, useDemoI18n } from './index'

afterEach(() => {
  window.localStorage.clear()
  setDemoLocale(DEFAULT_DEMO_LOCALE)
})

describe('demo i18n', () => {
  it('默认使用简体中文并同步 html lang', async () => {
    const { locale, messages } = useDemoI18n()
    await nextTick()

    expect(locale.value).toBe('zh-CN')
    expect(document.documentElement.lang).toBe('zh-CN')
    expect(messages.value.common.onThisPage).toBe('本页目录')
  })

  it('支持手动切换繁体中文与英文并持久化到本地存储', async () => {
    const { locale, messages, setLocale } = useDemoI18n()

    setLocale('zh-TW')
    await nextTick()
    expect(locale.value).toBe('zh-TW')
    expect(document.documentElement.lang).toBe('zh-TW')
    expect(window.localStorage.getItem('vfk-demo-locale')).toBe('zh-TW')
    expect(messages.value.common.onThisPage).toBe('本頁目錄')

    setLocale('en-US')
    await nextTick()
    expect(locale.value).toBe('en-US')
    expect(document.documentElement.lang).toBe('en-US')
    expect(window.localStorage.getItem('vfk-demo-locale')).toBe('en-US')
    expect(messages.value.common.onThisPage).toBe('On this page')
  })
})
