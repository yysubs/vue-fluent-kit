import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { VfkToggleButton } from './index'

describe('VfkToggleButton', () => {
  it('注册 fluent-toggle-button 并正确映射默认属性', () => {
    expect(customElements.get('fluent-toggle-button')).toBeDefined()

    const wrapper = mount(VfkToggleButton, {
      slots: { default: '置顶' },
    })

    const el = wrapper.find('fluent-toggle-button')
    expect(el.exists()).toBe(true)
    expect(el.attributes('appearance')).toBeUndefined()
    expect(el.attributes('shape')).toBe('rounded')
    expect(el.attributes('size')).toBe('medium')
    expect(el.attributes('pressed')).toBeUndefined()
    expect(el.attributes('mixed')).toBeUndefined()
    expect(el.text()).toBe('置顶')
  })

  it('支持 v-model 切换按压态及 mixed 状态', async () => {
    const wrapper = mount(VfkToggleButton, {
      props: {
        modelValue: 'mixed' as const,
        appearance: 'primary' as const,
        'onUpdate:modelValue': (val: boolean) => wrapper.setProps({ modelValue: val }),
      },
      slots: { default: '加粗' },
    })

    await nextTick()
    const el = wrapper.find('fluent-toggle-button')
    const dom = el.element as HTMLElement & { pressed: boolean; mixed?: boolean }
    expect(dom.mixed).toBe(true)
    expect(dom.pressed).toBe(false)

    await el.trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe(true)
    expect(dom.pressed).toBe(true)
    expect(dom.mixed).toBe(false)

    await el.trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
    expect(dom.pressed).toBe(false)
  })

  it('受控模式下父级未更新 modelValue 时保持原状态', async () => {
    const wrapper = mount(VfkToggleButton, {
      props: { modelValue: false },
      slots: { default: '锁定' },
    })

    const el = wrapper.find('fluent-toggle-button')
    const dom = el.element as HTMLElement & { pressed: boolean }
    await el.trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(dom.pressed).toBe(false)
  })

  it('仅有图标插槽时自动标记 icon-only，禁用态拦截点击', async () => {
    const iconOnly = mount(VfkToggleButton, {
      slots: { start: '<svg />' },
    })
    expect(iconOnly.find('fluent-toggle-button').attributes('icon-only')).toBe('')

    const disabled = mount(VfkToggleButton, {
      props: { modelValue: false, disabled: true },
      slots: { default: '禁用' },
    })
    await disabled.find('fluent-toggle-button').trigger('click')
    expect(disabled.emitted('update:modelValue')).toBeUndefined()
    expect(disabled.emitted('click')).toBeUndefined()

    const focusableDisabled = mount(VfkToggleButton, {
      props: { modelValue: false, disabledFocusable: true },
      slots: { default: '可聚焦禁用' },
    })
    expect(focusableDisabled.find('fluent-toggle-button').attributes('disabled-focusable')).toBe('')
    await focusableDisabled.find('fluent-toggle-button').trigger('click')
    expect(focusableDisabled.emitted('update:modelValue')).toBeUndefined()
  })
})
