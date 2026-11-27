import { describe, expect, it } from 'vitest'
import { isFluentCustomElement } from './custom-elements'

describe('isFluentCustomElement', () => {
  it('识别 fluent- 前缀的自定义元素', () => {
    expect(isFluentCustomElement('fluent-button')).toBe(true)
    expect(isFluentCustomElement('fluent-text-input')).toBe(true)
    expect(isFluentCustomElement('fluent-checkbox')).toBe(true)
  })

  it('不误判普通 HTML 与 Vue 组件标签', () => {
    expect(isFluentCustomElement('button')).toBe(false)
    expect(isFluentCustomElement('div')).toBe(false)
    expect(isFluentCustomElement('vf-button')).toBe(false)
    expect(isFluentCustomElement('VfButton')).toBe(false)
  })
})
