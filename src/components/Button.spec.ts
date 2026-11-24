import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import VButton from './Button.vue'
import VToggleButton from './ToggleButton.vue'

describe('VButton', () => {
  it('renders default appearance, shape, size, and button type', () => {
    const wrapper = mount(VButton, { slots: { default: 'Save' } })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('vfk-button--secondary')
    expect(wrapper.classes()).toContain('vfk-button--rounded')
    expect(wrapper.classes()).toContain('vfk-button--medium')
    expect(wrapper.text()).toBe('Save')
  })

  it('applies selected appearance, shape, size, and explicit type', () => {
    const wrapper = mount(VButton, {
      props: { appearance: 'primary', shape: 'circular', size: 'large', type: 'submit' },
      slots: { default: 'Send' },
    })

    expect(wrapper.attributes('type')).toBe('submit')
    expect(wrapper.classes()).toContain('vfk-button--primary')
    expect(wrapper.classes()).toContain('vfk-button--circular')
    expect(wrapper.classes()).toContain('vfk-button--large')
  })

  it('forwards clicks when enabled', async () => {
    const onClick = vi.fn()
    const wrapper = mount(VButton, { attrs: { onClick }, slots: { default: 'Open' } })

    await wrapper.trigger('click')

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('uses native disabled and does not emit a click', async () => {
    const onClick = vi.fn()
    const wrapper = mount(VButton, {
      props: { disabled: true },
      attrs: { onClick },
      slots: { default: 'Unavailable' },
    })

    await wrapper.trigger('click')

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('keeps disabledFocusable focusable and suppresses click handling', async () => {
    const onClick = vi.fn()
    const wrapper = mount(VButton, {
      props: { disabledFocusable: true },
      attrs: { onClick },
      slots: { default: 'Unavailable' },
    })

    await wrapper.trigger('click')

    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('marks icon-only content and exposes its accessible name', () => {
    const wrapper = mount(VButton, {
      attrs: { 'aria-label': 'Add item' },
      slots: { icon: '<span aria-hidden="true">+</span>' },
    })

    expect(wrapper.classes()).toContain('vfk-button--icon-only')
    expect(wrapper.attributes('aria-label')).toBe('Add item')
    expect(wrapper.find('.vfk-button__icon').text()).toBe('+')
  })
})

describe('VToggleButton', () => {
  it('exposes its initial state with aria-pressed', () => {
    const wrapper = mount(VToggleButton, { props: { modelValue: true }, slots: { default: 'Bold' } })

    expect(wrapper.attributes('aria-pressed')).toBe('true')
    expect(wrapper.classes()).toContain('vfk-toggle-button')
    expect(wrapper.classes()).toContain('vfk-button--secondary')
  })

  it('emits the inverse model value on click without mutating props', async () => {
    const wrapper = mount(VToggleButton, { props: { modelValue: false }, slots: { default: 'Bold' } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.props('modelValue')).toBe(false)
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(VToggleButton, {
      props: { modelValue: false, disabled: true },
      slots: { default: 'Bold' },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
