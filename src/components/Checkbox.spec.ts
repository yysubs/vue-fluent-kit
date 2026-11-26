import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { VCheckbox } from '../index'

describe('VCheckbox', () => {
  it('renders default unchecked state, medium size, square shape, and auto-generated id', () => {
    const wrapper = mount(VCheckbox, { props: { label: 'Remember me' } })
    const input = wrapper.find<HTMLInputElement>('.vfk-checkbox__input')
    const indicator = wrapper.find('.vfk-checkbox__indicator')
    const label = wrapper.find('.vfk-checkbox__label')

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('vfk-checkbox')
    expect(wrapper.classes()).toContain('vfk-checkbox--medium')
    expect(wrapper.classes()).toContain('vfk-checkbox--square')
    expect(wrapper.classes()).toContain('vfk-checkbox--label-after')
    expect(wrapper.classes()).toContain('vfk-checkbox--unchecked')

    expect(input.attributes('type')).toBe('checkbox')
    expect(input.element.checked).toBe(false)
    expect(input.element.indeterminate).toBe(false)
    expect(input.attributes('aria-checked')).toBeUndefined()

    expect(indicator.attributes('aria-hidden')).toBe('true')
    expect(indicator.find('svg').exists()).toBe(false)

    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Remember me')
    expect(input.attributes('id')).toBeTruthy()
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('supports medium and large sizes with matching checkmark and mixed SVGs', async () => {
    const wrapper = mount(VCheckbox, {
      props: { modelValue: true, size: 'medium', label: 'Medium' },
    })

    expect(wrapper.classes()).toContain('vfk-checkbox--medium')
    expect(wrapper.find('.vfk-checkbox__indicator svg').attributes('viewBox')).toBe('0 0 12 12')
    expect(wrapper.find('.vfk-checkbox__indicator svg').attributes('width')).toBe('12')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.classes()).toContain('vfk-checkbox--large')
    expect(wrapper.find('.vfk-checkbox__indicator svg').attributes('viewBox')).toBe('0 0 16 16')
    expect(wrapper.find('.vfk-checkbox__indicator svg').attributes('width')).toBe('16')

    await wrapper.setProps({ modelValue: 'mixed', size: 'medium' })
    expect(wrapper.find('.vfk-checkbox__indicator svg').attributes('viewBox')).toBe('0 0 12 12')

    await wrapper.setProps({ modelValue: 'mixed', size: 'large' })
    expect(wrapper.find('.vfk-checkbox__indicator svg').attributes('viewBox')).toBe('0 0 16 16')
  })

  it('supports square and circular shapes including circular mixed icon', async () => {
    const wrapper = mount(VCheckbox, {
      props: { shape: 'circular', modelValue: 'mixed', label: 'Task' },
    })

    expect(wrapper.classes()).toContain('vfk-checkbox--circular')
    const svg = wrapper.find('.vfk-checkbox__indicator svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('viewBox')).toBe('0 0 20 20')
    expect(svg.attributes('width')).toBe('1em')

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('.vfk-checkbox__indicator svg').attributes('viewBox')).toBe('0 0 12 12')
  })

  it('toggles boolean v-model and emits change once per user interaction', async () => {
    const onChange = vi.fn()
    const Host = defineComponent({
      components: { VCheckbox },
      setup() {
        const checked = ref(false)
        return { checked, onChange }
      },
      template: '<VCheckbox v-model="checked" label="Accept" @change="onChange" />',
    })

    const wrapper = mount(Host, { attachTo: document.body })
    const checkbox = wrapper.findComponent(VCheckbox)
    const input = wrapper.find<HTMLInputElement>('.vfk-checkbox__input')
    const label = wrapper.find('.vfk-checkbox__label')

    expect(checkbox.classes()).toContain('vfk-checkbox--unchecked')
    expect(input.element.checked).toBe(false)

    await input.trigger('click')
    expect(wrapper.vm.checked).toBe(true)
    expect(checkbox.classes()).toContain('vfk-checkbox--checked')
    expect(input.element.checked).toBe(true)
    expect(input.element.indeterminate).toBe(false)
    expect(onChange).toHaveBeenCalledTimes(1)

    await label.trigger('click')
    expect(wrapper.vm.checked).toBe(false)
    expect(checkbox.classes()).toContain('vfk-checkbox--unchecked')
    expect(input.element.checked).toBe(false)
    expect(onChange).toHaveBeenCalledTimes(2)

    wrapper.unmount()
  })

  it('syncs mixed indeterminate state, toggles mixed to true, and preserves controlled state when parent does not update', async () => {
    const controlled = mount(VCheckbox, {
      props: { modelValue: 'mixed', label: 'Select all' },
      attachTo: document.body,
    })
    const controlledInput = controlled.find<HTMLInputElement>('.vfk-checkbox__input')

    expect(controlled.classes()).toContain('vfk-checkbox--mixed')
    expect(controlledInput.element.checked).toBe(false)
    expect(controlledInput.element.indeterminate).toBe(true)
    expect(controlledInput.attributes('aria-checked')).toBe('mixed')

    await controlledInput.trigger('click')
    expect(controlled.emitted('update:modelValue')).toEqual([[true]])
    expect(controlled.emitted('change')).toHaveLength(1)
    expect(controlledInput.element.checked).toBe(false)
    expect(controlledInput.element.indeterminate).toBe(true)
    expect(controlledInput.attributes('aria-checked')).toBe('mixed')
    controlled.unmount()

    const Host = defineComponent({
      components: { VCheckbox },
      setup() {
        const state = ref<boolean | 'mixed'>('mixed')
        return { state }
      },
      template: '<VCheckbox v-model="state" label="All items" />',
    })

    const hostWrapper = mount(Host)
    const hostInput = hostWrapper.find<HTMLInputElement>('.vfk-checkbox__input')
    expect(hostInput.element.indeterminate).toBe(true)

    await hostInput.trigger('click')
    expect(hostWrapper.vm.state).toBe(true)
    expect(hostInput.element.checked).toBe(true)
    expect(hostInput.element.indeterminate).toBe(false)
    expect(hostInput.attributes('aria-checked')).toBeUndefined()

    hostInput.element.click()
    await hostWrapper.vm.$nextTick()
    expect(hostWrapper.vm.state).toBe(false)
    expect(hostInput.element.checked).toBe(false)

    await hostInput.setValue(true)
    expect(hostWrapper.vm.state).toBe(true)
    expect(hostInput.element.checked).toBe(true)
  })

  it('renders default slot with priority over label prop and supports explicit id', async () => {
    const wrapper = mount(VCheckbox, {
      props: { id: 'terms-checkbox', label: 'Fallback label' },
      slots: { default: 'Agree to <a href="#terms">Terms</a>' },
    })

    const input = wrapper.find('.vfk-checkbox__input')
    const label = wrapper.find('.vfk-checkbox__label')
    const link = label.find('a')

    expect(input.attributes('id')).toBe('terms-checkbox')
    expect(label.attributes('for')).toBe('terms-checkbox')
    expect(label.text()).toBe('Agree to Terms')
    expect(link.attributes('href')).toBe('#terms')

    await link.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    await label.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('positions label after or before the indicator based on labelPosition', async () => {
    const wrapper = mount(VCheckbox, {
      props: { label: 'Left label', labelPosition: 'before' },
    })

    expect(wrapper.classes()).toContain('vfk-checkbox--label-before')
    const childrenBefore = Array.from<Element>(wrapper.element.children).map((el) => el.className)
    expect(childrenBefore.indexOf('vfk-checkbox__label')).toBeLessThan(
      childrenBefore.indexOf('vfk-checkbox__indicator'),
    )

    await wrapper.setProps({ labelPosition: 'after' })
    expect(wrapper.classes()).toContain('vfk-checkbox--label-after')
    const childrenAfter = Array.from<Element>(wrapper.element.children).map((el) => el.className)
    expect(childrenAfter.indexOf('vfk-checkbox__indicator')).toBeLessThan(
      childrenAfter.indexOf('vfk-checkbox__label'),
    )
  })

  it('omits label element when neither label prop nor default slot is provided', () => {
    const wrapper = mount(VCheckbox, {
      props: { required: true },
      attrs: { 'aria-label': 'Select row 1' },
    })

    expect(wrapper.find('.vfk-checkbox__label').exists()).toBe(false)
    expect(wrapper.find('.vfk-checkbox__required').exists()).toBe(false)
    expect(wrapper.find('.vfk-checkbox__input').attributes('aria-label')).toBe('Select row 1')
    expect(wrapper.find('.vfk-checkbox__input').attributes('required')).toBeDefined()
  })

  it('renders required indicator inside label and sets native required attribute', () => {
    const wrapper = mount(VCheckbox, {
      props: { label: 'Accept policy', required: true },
    })

    const input = wrapper.find('.vfk-checkbox__input')
    const requiredMark = wrapper.find('.vfk-checkbox__required')

    expect(input.attributes('required')).toBeDefined()
    expect(requiredMark.exists()).toBe(true)
    expect(requiredMark.attributes('aria-hidden')).toBe('true')
    expect(requiredMark.text()).toBe('*')
  })

  it('applies disabled state across unchecked, checked, and mixed without emitting events', async () => {
    const wrapper = mount(VCheckbox, {
      props: { modelValue: true, disabled: true, label: 'Locked' },
    })
    const input = wrapper.find<HTMLInputElement>('.vfk-checkbox__input')

    expect(wrapper.classes()).toContain('vfk-checkbox--disabled')
    expect(wrapper.classes()).not.toContain('vfk-checkbox--checked')
    expect(input.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.vfk-checkbox__indicator svg').exists()).toBe(true)

    await input.trigger('click')
    await input.trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    await wrapper.setProps({ modelValue: 'mixed' })
    expect(wrapper.classes()).toContain('vfk-checkbox--disabled')
    expect(wrapper.classes()).not.toContain('vfk-checkbox--mixed')
    expect(input.element.indeterminate).toBe(true)
    expect(wrapper.find('.vfk-checkbox__indicator svg').exists()).toBe(true)
  })

  it('supports custom indicator slot', () => {
    const wrapper = mount(VCheckbox, {
      props: { modelValue: true, label: 'Custom' },
      slots: {
        indicator: '<span class="custom-indicator">+</span>',
      },
    })

    const indicator = wrapper.find('.vfk-checkbox__indicator')
    expect(indicator.find('svg').exists()).toBe(false)
    expect(indicator.find('.custom-indicator').text()).toBe('+')
  })

  it('splits class and style onto root span while forwarding other attributes to input', () => {
    const wrapper = mount(VCheckbox, {
      props: { label: 'Newsletter' },
      attrs: {
        class: 'custom-root',
        style: 'margin-top: 8px;',
        name: 'newsletter',
        value: 'weekly',
        'data-testid': 'newsletter-input',
      },
    })

    const input = wrapper.find('.vfk-checkbox__input')

    expect(wrapper.classes()).toContain('custom-root')
    expect(wrapper.attributes('style')).toContain('margin-top: 8px')
    expect(wrapper.attributes('name')).toBeUndefined()
    expect(wrapper.attributes('data-testid')).toBeUndefined()

    expect(input.classes()).not.toContain('custom-root')
    expect(input.attributes('style')).toBeUndefined()
    expect(input.attributes('name')).toBe('newsletter')
    expect(input.attributes('value')).toBe('weekly')
    expect(input.attributes('data-testid')).toBe('newsletter-input')
  })

  it('exposes input element ref, focus, and blur methods', () => {
    const wrapper = mount(VCheckbox, {
      props: { label: 'Focusable' },
      attachTo: document.body,
    })

    const exposed = wrapper.vm as unknown as {
      input: HTMLInputElement | null
      focus: () => void
      blur: () => void
    }
    const inputEl = wrapper.find<HTMLInputElement>('.vfk-checkbox__input').element

    expect(exposed.input).toBe(inputEl)

    exposed.focus()
    expect(document.activeElement).toBe(inputEl)

    exposed.blur()
    expect(document.activeElement).not.toBe(inputEl)

    wrapper.unmount()
  })
})
