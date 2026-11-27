import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import {
  applyBrandTokens,
  resetBrandTokens,
  setVfkTheme,
  useTheme,
  VfkThemeProvider,
  type BrandVariants,
} from './index'

const sampleBrand: BrandVariants = {
  10: '#021a1b',
  20: '#043234',
  30: '#05494c',
  40: '#056064',
  50: '#04777c',
  60: '#038387',
  70: '#0f9599',
  80: '#27a6aa',
  90: '#42b8bc',
  100: '#5fc9cd',
  110: '#7ed8db',
  120: '#9de5e7',
  130: '#bceff0',
  140: '#d7f6f7',
  150: '#ecfbfb',
  160: '#f7fefe',
}

afterEach(() => {
  resetBrandTokens()
  setVfkTheme('system')
})

describe('theme utilities', () => {
  it('默认跟随系统主题，并支持通过 useTheme 手动切换浅色与深色模式', async () => {
    const { mode, resolvedTheme, setTheme, toggleTheme } = useTheme()

    expect(mode.value).toBe('system')
    expect(resolvedTheme.value).toBe('light')

    setTheme('dark')
    await nextTick()
    expect(mode.value).toBe('dark')
    expect(resolvedTheme.value).toBe('dark')
    expect(document.documentElement.getAttribute('data-vfk-theme')).toBe('dark')

    toggleTheme()
    await nextTick()
    expect(resolvedTheme.value).toBe('light')
    expect(document.documentElement.getAttribute('data-vfk-theme')).toBe('light')
  })

  it('应用与重置自定义品牌色变量', () => {
    const host = document.createElement('div')
    applyBrandTokens(sampleBrand, 'light', host)
    expect(host.style.getPropertyValue('--colorBrandBackground')).toBe(sampleBrand[80])

    applyBrandTokens(sampleBrand, 'dark', host)
    expect(host.style.getPropertyValue('--colorBrandBackground')).toBe(sampleBrand[70])

    resetBrandTokens(host)
    expect(host.style.getPropertyValue('--colorBrandBackground')).toBe('')
  })

  it('VfkThemeProvider 支持局部主题与局部品牌色隔离', async () => {
    const wrapper = mount(VfkThemeProvider, {
      props: {
        theme: 'dark',
        brand: sampleBrand,
      },
      slots: {
        default: '<span>Scoped Content</span>',
      },
    })

    await nextTick()
    const el = wrapper.element as HTMLElement
    expect(el.getAttribute('data-vfk-theme')).toBe('dark')
    expect(el.style.getPropertyValue('--colorBrandBackground')).not.toBe('')

    await wrapper.setProps({ brand: undefined })
    await nextTick()
    expect(el.style.getPropertyValue('--colorBrandBackground')).toBe('')
  })

  it('VfkThemeProvider 未传 brand 时沿用全局品牌色并按局部明暗计算色阶', async () => {
    const lightWrapper = mount(VfkThemeProvider, { props: { theme: 'light' } })
    const darkWrapper = mount(VfkThemeProvider, { props: { theme: 'dark' } })

    applyBrandTokens(sampleBrand)
    await nextTick()

    const lightEl = lightWrapper.element as HTMLElement
    const darkEl = darkWrapper.element as HTMLElement
    expect(lightEl.style.getPropertyValue('--colorBrandBackground')).toBe(sampleBrand[80])
    expect(darkEl.style.getPropertyValue('--colorBrandBackground')).toBe(sampleBrand[70])

    resetBrandTokens()
    await nextTick()
    expect(lightEl.style.getPropertyValue('--colorBrandBackground')).toBe('')
    expect(darkEl.style.getPropertyValue('--colorBrandBackground')).toBe('')
  })
})
