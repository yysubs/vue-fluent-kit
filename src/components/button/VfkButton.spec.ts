import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VfkButton } from './index'

describe('VfkButton', () => {
  it('注册 fluent-button 并正确映射默认属性', () => {
    expect(customElements.get('fluent-button')).toBeDefined()

    const wrapper = mount(VfkButton, {
      slots: { default: '提交' },
    })

    const el = wrapper.find('fluent-button')
    expect(el.exists()).toBe(true)
    expect(el.attributes('appearance')).toBeUndefined()
    expect(el.attributes('shape')).toBe('rounded')
    expect(el.attributes('size')).toBe('medium')
    expect((el.element as HTMLElement & { type?: string }).type).toBe('button')
    expect(el.text()).toBe('提交')
  })

  it('传递 appearance、shape、size 与 start/end 插槽', () => {
    const wrapper = mount(VfkButton, {
      props: {
        appearance: 'primary',
        shape: 'circular',
        size: 'large',
      },
      slots: {
        start: '<i class="icon-start">+</i>',
        default: '新建',
        end: '<i class="icon-end">→</i>',
      },
    })

    const el = wrapper.find('fluent-button')
    expect(el.attributes('appearance')).toBe('primary')
    expect(el.attributes('shape')).toBe('circular')
    expect(el.attributes('size')).toBe('large')
    expect(el.find('[slot="start"] .icon-start').exists()).toBe(true)
    expect(el.find('[slot="end"] .icon-end').exists()).toBe(true)
    expect(el.attributes('icon-only')).toBeUndefined()
  })

  it('仅有图标插槽时自动标记 icon-only', () => {
    const wrapper = mount(VfkButton, {
      slots: {
        start: '<svg />',
      },
    })

    expect(wrapper.find('fluent-button').attributes('icon-only')).toBe('')
  })

  it('正常状态触发 click，disabled 或 disabledFocusable 时拦截 click', async () => {
    const enabled = mount(VfkButton, { slots: { default: '点我' } })
    await enabled.find('fluent-button').trigger('click')
    expect(enabled.emitted('click')).toHaveLength(1)

    const disabled = mount(VfkButton, {
      props: { disabled: true },
      slots: { default: '禁用' },
    })
    await disabled.find('fluent-button').trigger('click')
    expect(disabled.emitted('click')).toBeUndefined()

    const focusableDisabled = mount(VfkButton, {
      props: { disabledFocusable: true },
      slots: { default: '可聚焦禁用' },
    })
    expect(focusableDisabled.find('fluent-button').attributes('disabled-focusable')).toBe('')
    await focusableDisabled.find('fluent-button').trigger('click')
    expect(focusableDisabled.emitted('click')).toBeUndefined()
  })
})
