import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { VInput } from '../index'

describe('VInput', () => {
  it('renders default appearance, size, type, and omits empty slot wrappers', () => {
    const wrapper = mount(VInput)
    const input = wrapper.find('input')

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('vfk-input')
    expect(wrapper.classes()).toContain('vfk-input--outline')
    expect(wrapper.classes()).toContain('vfk-input--medium')
    expect(wrapper.classes()).not.toContain('vfk-input--disabled')
    expect(wrapper.classes()).not.toContain('vfk-input--invalid')
    expect(wrapper.classes()).not.toContain('vfk-input--with-before')
    expect(wrapper.classes()).not.toContain('vfk-input--with-after')
    expect(wrapper.find('.vfk-input__content-before').exists()).toBe(false)
    expect(wrapper.find('.vfk-input__content-after').exists()).toBe(false)

    expect(input.exists()).toBe(true)
    expect(input.classes()).toEqual(['vfk-input__input'])
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('disabled')).toBeUndefined()
  })

  it.each(['outline', 'underline', 'filled-darker', 'filled-lighter'] as const)(
    'applies %s appearance modifier',
    (appearance) => {
      const wrapper = mount(VInput, { props: { appearance } })

      expect(wrapper.classes()).toContain(`vfk-input--${appearance}`)
    },
  )

  it.each(['small', 'medium', 'large'] as const)('applies %s size modifier', (size) => {
    const wrapper = mount(VInput, { props: { size } })

    expect(wrapper.classes()).toContain(`vfk-input--${size}`)
  })

  it.each(['text', 'email', 'password', 'search', 'tel', 'url', 'number', 'date'] as const)(
    'forwards %s type to the inner input element',
    (type) => {
      const wrapper = mount(VInput, { props: { type } })

      expect(wrapper.find('input').attributes('type')).toBe(type)
    },
  )

  it('supports controlled v-model binding and external updates', async () => {
    const Host = defineComponent({
      components: { VInput },
      setup() {
        const text = ref('initial')
        return { text }
      },
      template: '<VInput v-model="text" />',
    })

    const wrapper = mount(Host)
    const input = wrapper.find('input')

    expect(input.element.value).toBe('initial')

    await input.setValue('updated')
    expect(wrapper.vm.text).toBe('updated')
    expect(input.element.value).toBe('updated')

    wrapper.vm.text = 'external'
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe('external')
  })

  it('keeps DOM value aligned with controlled modelValue when parent does not update it', async () => {
    const wrapper = mount(VInput, {
      props: { modelValue: 'locked' },
    })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('locked')

    await input.setValue('attempted edit')

    expect(wrapper.emitted('update:modelValue')).toEqual([['attempted edit']])
    expect(input.element.value).toBe('locked')
  })

  it('supports uncontrolled input when modelValue is undefined', async () => {
    const wrapper = mount(VInput)
    const input = wrapper.find('input')

    expect(input.element.value).toBe('')

    await input.setValue('free typing')
    expect(input.element.value).toBe('free typing')
    expect(wrapper.emitted('update:modelValue')).toEqual([['free typing']])

    await wrapper.setProps({ size: 'large' })
    expect(input.element.value).toBe('free typing')

    const withValueAttr = mount(VInput, { attrs: { value: 'seed' } })
    expect(withValueAttr.find('input').element.value).toBe('seed')
  })

  it('applies disabled state and suppresses update:modelValue emissions', async () => {
    const wrapper = mount(VInput, {
      props: { modelValue: 'fixed', disabled: true },
    })
    const input = wrapper.find('input')

    expect(wrapper.classes()).toContain('vfk-input--disabled')
    expect(input.attributes('disabled')).toBeDefined()

    await input.setValue('changed')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    input.element.value = 'changed'
    input.element.dispatchEvent(new Event('input'))

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(input.element.value).toBe('fixed')
  })

  it('renders contentBefore and contentAfter slots with corresponding root modifiers', () => {
    const beforeOnly = mount(VInput, {
      slots: { contentBefore: '<span>$</span>' },
    })
    expect(beforeOnly.classes()).toContain('vfk-input--with-before')
    expect(beforeOnly.classes()).not.toContain('vfk-input--with-after')
    expect(beforeOnly.find('.vfk-input__content-before').text()).toBe('$')
    expect(beforeOnly.find('.vfk-input__content-after').exists()).toBe(false)

    const afterOnly = mount(VInput, {
      slots: { contentAfter: '<span>USD</span>' },
    })
    expect(afterOnly.classes()).not.toContain('vfk-input--with-before')
    expect(afterOnly.classes()).toContain('vfk-input--with-after')
    expect(afterOnly.find('.vfk-input__content-before').exists()).toBe(false)
    expect(afterOnly.find('.vfk-input__content-after').text()).toBe('USD')

    const both = mount(VInput, {
      slots: {
        contentBefore: '<svg data-testid="prefix-icon"></svg>',
        contentAfter: '<button type="button" aria-label="Clear">x</button>',
      },
    })
    expect(both.classes()).toContain('vfk-input--with-before')
    expect(both.classes()).toContain('vfk-input--with-after')
    expect(both.find('[data-testid="prefix-icon"]').exists()).toBe(true)
    expect(both.find('.vfk-input__content-after button').attributes('aria-label')).toBe('Clear')
  })

  it('tracks aria-invalid state on root and forwards aria-invalid to input', async () => {
    const invalidString = mount(VInput, {
      attrs: { 'aria-invalid': 'true' },
    })
    expect(invalidString.classes()).toContain('vfk-input--invalid')
    expect(invalidString.find('input').attributes('aria-invalid')).toBe('true')

    const invalidBoolean = mount(VInput, {
      attrs: { 'aria-invalid': true },
    })
    expect(invalidBoolean.classes()).toContain('vfk-input--invalid')
    expect(invalidBoolean.find('input').attributes('aria-invalid')).toBe('true')

    const validFalse = mount(VInput, {
      attrs: { 'aria-invalid': 'false' },
    })
    expect(validFalse.classes()).not.toContain('vfk-input--invalid')

    const disabledInvalid = mount(VInput, {
      props: { disabled: true },
      attrs: { 'aria-invalid': 'true' },
    })
    expect(disabledInvalid.classes()).toContain('vfk-input--disabled')
    expect(disabledInvalid.classes()).not.toContain('vfk-input--invalid')
  })

  it('routes class and style to root span and native attributes and events to inner input', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const onKeydown = vi.fn()

    const wrapper = mount(VInput, {
      attrs: {
        class: 'custom-field',
        style: 'width: 240px;',
        id: 'email-field',
        name: 'email',
        placeholder: 'name@example.com',
        readonly: true,
        required: true,
        'data-testid': 'inner-input',
        onInput,
        onChange,
        onFocus,
        onBlur,
        onKeydown,
      },
    })
    const input = wrapper.find('input')

    expect(wrapper.classes()).toContain('custom-field')
    expect(wrapper.attributes('style')).toContain('width: 240px')
    expect(wrapper.attributes('id')).toBeUndefined()
    expect(wrapper.attributes('name')).toBeUndefined()
    expect(wrapper.attributes('placeholder')).toBeUndefined()
    expect(wrapper.attributes('data-testid')).toBeUndefined()

    expect(input.classes()).not.toContain('custom-field')
    expect(input.attributes('style')).toBeUndefined()
    expect(input.attributes('id')).toBe('email-field')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('placeholder')).toBe('name@example.com')
    expect(input.attributes('readonly')).toBeDefined()
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('data-testid')).toBe('inner-input')

    await input.trigger('focus')
    await input.setValue('hello@example.com')
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('blur')

    expect(onFocus).toHaveBeenCalledOnce()
    expect(onInput).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledOnce()
    expect(onKeydown).toHaveBeenCalledOnce()
    expect(onBlur).toHaveBeenCalledOnce()
  })

  it('exposes input element reference and focus, blur, select helpers', () => {
    const wrapper = mount(VInput, {
      attachTo: document.body,
      props: { modelValue: 'selectable' },
    })
    const inputEl = wrapper.find('input').element
    const selectSpy = vi.spyOn(inputEl, 'select')

    expect(wrapper.vm.input).toBe(inputEl)

    wrapper.vm.focus()
    expect(document.activeElement).toBe(inputEl)

    wrapper.vm.select()
    expect(selectSpy).toHaveBeenCalledOnce()

    wrapper.vm.blur()
    expect(document.activeElement).not.toBe(inputEl)

    wrapper.unmount()
  })
})
