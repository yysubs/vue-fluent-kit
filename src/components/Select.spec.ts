import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import VSelect from './Select.vue'

const defaultOptions = `
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
`

describe('VSelect', () => {
  it('renders default outline appearance, medium size, and chevron icon', () => {
    const wrapper = mount(VSelect, {
      slots: { default: defaultOptions },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('vfk-select')
    expect(wrapper.classes()).toContain('vfk-select--outline')
    expect(wrapper.classes()).toContain('vfk-select--medium')
    expect(wrapper.classes()).not.toContain('vfk-select--disabled')
    expect(wrapper.classes()).not.toContain('vfk-select--invalid')

    const select = wrapper.find('select.vfk-select__select')
    expect(select.exists()).toBe(true)
    expect(select.attributes('disabled')).toBeUndefined()
    expect(select.findAll('option')).toHaveLength(3)

    const icon = wrapper.find('.vfk-select__icon')
    expect(icon.exists()).toBe(true)
    const svg = icon.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('aria-hidden')).toBe('true')
    expect(svg.attributes('viewBox')).toBe('0 0 20 20')
  })

  it.each(['outline', 'underline', 'filled-darker', 'filled-lighter'] as const)(
    'applies %s appearance modifier class',
    (appearance) => {
      const wrapper = mount(VSelect, {
        props: { appearance },
        slots: { default: defaultOptions },
      })

      expect(wrapper.classes()).toContain(`vfk-select--${appearance}`)
    },
  )

  it.each(['small', 'medium', 'large'] as const)('applies %s size modifier class', (size) => {
    const wrapper = mount(VSelect, {
      props: { size },
      slots: { default: defaultOptions },
    })

    expect(wrapper.classes()).toContain(`vfk-select--${size}`)
  })

  it('renders optgroup options and custom #icon slot', () => {
    const wrapper = mount(VSelect, {
      slots: {
        default: `
          <optgroup label="Citrus">
            <option value="lemon">Lemon</option>
            <option value="orange">Orange</option>
          </optgroup>
        `,
        icon: '<span class="custom-arrow" aria-hidden="true">▾</span>',
      },
    })

    const optgroup = wrapper.find('select optgroup')
    expect(optgroup.exists()).toBe(true)
    expect(optgroup.attributes('label')).toBe('Citrus')
    expect(optgroup.findAll('option')).toHaveLength(2)

    const icon = wrapper.find('.vfk-select__icon')
    expect(icon.find('svg').exists()).toBe(false)
    expect(icon.find('.custom-arrow').text()).toBe('▾')
  })

  it('preserves native initial option selection when modelValue is undefined', async () => {
    const firstDefault = mount(VSelect, {
      slots: { default: defaultOptions },
    })
    expect((firstDefault.find('select').element as HTMLSelectElement).value).toBe('apple')

    const explicitSelected = mount(VSelect, {
      slots: {
        default: `
          <option value="apple">Apple</option>
          <option value="banana" selected>Banana</option>
          <option value="cherry">Cherry</option>
        `,
      },
    })
    const select = explicitSelected.find('select')
    expect((select.element as HTMLSelectElement).value).toBe('banana')

    await select.setValue('cherry')
    expect((select.element as HTMLSelectElement).value).toBe('cherry')
    expect(explicitSelected.emitted('update:modelValue')).toEqual([['cherry']])
  })

  it('supports controlled v-model two-way binding', async () => {
    const Host = defineComponent({
      components: { VSelect },
      setup() {
        const fruit = ref('banana')
        return { fruit }
      },
      template: `
        <VSelect v-model="fruit">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </VSelect>
      `,
    })

    const wrapper = mount(Host)
    const select = wrapper.find('select')
    expect((select.element as HTMLSelectElement).value).toBe('banana')

    await select.setValue('cherry')
    expect(wrapper.vm.fruit).toBe('cherry')
    expect((select.element as HTMLSelectElement).value).toBe('cherry')

    wrapper.vm.fruit = 'apple'
    await wrapper.vm.$nextTick()
    expect((select.element as HTMLSelectElement).value).toBe('apple')
  })

  it('restores controlled modelValue on the DOM select when parent does not update prop', async () => {
    const wrapper = mount(VSelect, {
      props: { modelValue: 'apple' },
      slots: { default: defaultOptions },
    })

    const select = wrapper.find('select')
    const selectEl = select.element as HTMLSelectElement
    expect(selectEl.value).toBe('apple')

    selectEl.value = 'cherry'
    await select.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toEqual([['cherry']])
    expect(selectEl.value).toBe('apple')
  })

  it('syncs controlled modelValue when options slot updates dynamically', async () => {
    const Host = defineComponent({
      components: { VSelect },
      setup() {
        const value = ref('cherry')
        const options = ref<string[]>(['apple'])
        return { value, options }
      },
      template: `
        <VSelect :model-value="value">
          <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
        </VSelect>
      `,
    })

    const wrapper = mount(Host)
    const selectEl = wrapper.find('select').element as HTMLSelectElement

    wrapper.vm.options = ['apple', 'banana', 'cherry']
    await wrapper.vm.$nextTick()
    expect(selectEl.value).toBe('cherry')
  })

  it('applies disabled state and suppresses update:modelValue', async () => {
    const wrapper = mount(VSelect, {
      props: { modelValue: 'apple', disabled: true },
      slots: { default: defaultOptions },
    })

    expect(wrapper.classes()).toContain('vfk-select--disabled')
    const select = wrapper.find('select')
    const selectEl = select.element as HTMLSelectElement
    expect(select.attributes('disabled')).toBeDefined()
    expect(selectEl.disabled).toBe(true)

    await select.setValue('banana')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    selectEl.value = 'banana'
    selectEl.dispatchEvent(new Event('change'))
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(selectEl.value).toBe('apple')
  })

  it('handles aria-invalid validation state and ignores it when disabled', async () => {
    const stringInvalid = mount(VSelect, {
      attrs: { 'aria-invalid': 'true' },
      slots: { default: defaultOptions },
    })
    expect(stringInvalid.classes()).toContain('vfk-select--invalid')
    expect(stringInvalid.find('select').attributes('aria-invalid')).toBe('true')

    const boolInvalid = mount(VSelect, {
      attrs: { 'aria-invalid': true },
      slots: { default: defaultOptions },
    })
    expect(boolInvalid.classes()).toContain('vfk-select--invalid')

    const falseInvalid = mount(VSelect, {
      attrs: { 'aria-invalid': 'false' },
      slots: { default: defaultOptions },
    })
    expect(falseInvalid.classes()).not.toContain('vfk-select--invalid')

    const disabledInvalid = mount(VSelect, {
      props: { disabled: true },
      attrs: { 'aria-invalid': 'true' },
      slots: { default: defaultOptions },
    })
    expect(disabledInvalid.classes()).toContain('vfk-select--disabled')
    expect(disabledInvalid.classes()).not.toContain('vfk-select--invalid')
  })

  it('splits class and style onto root span and forwards native attrs and listeners to select', async () => {
    const onChange = vi.fn()
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const onKeydown = vi.fn()

    const wrapper = mount(VSelect, {
      props: { appearance: 'filled-darker', size: 'large' },
      attrs: {
        class: 'custom-root',
        style: 'width: 240px;',
        id: 'city-select',
        name: 'city',
        required: true,
        'aria-label': 'Select city',
        'data-testid': 'native-select',
        onChange,
        onFocus,
        onBlur,
        onKeydown,
      },
      slots: { default: defaultOptions },
    })

    expect(wrapper.classes()).toContain('custom-root')
    expect(wrapper.attributes('style')).toContain('width: 240px')
    expect(wrapper.attributes('id')).toBeUndefined()
    expect(wrapper.attributes('name')).toBeUndefined()
    expect(wrapper.attributes('aria-label')).toBeUndefined()
    expect(wrapper.attributes('data-testid')).toBeUndefined()
    expect(wrapper.attributes('appearance')).toBeUndefined()

    const select = wrapper.find('select')
    expect(select.classes()).toEqual(['vfk-select__select'])
    expect(select.attributes('style')).toBeUndefined()
    expect(select.attributes('id')).toBe('city-select')
    expect(select.attributes('name')).toBe('city')
    expect(select.attributes('required')).toBeDefined()
    expect(select.attributes('aria-label')).toBe('Select city')
    expect(select.attributes('data-testid')).toBe('native-select')

    await select.trigger('focus')
    await select.trigger('keydown', { key: 'ArrowDown' })
    await select.setValue('banana')
    await select.trigger('blur')

    expect(onFocus).toHaveBeenCalledOnce()
    expect(onKeydown).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledOnce()
    expect(onBlur).toHaveBeenCalledOnce()
    expect(wrapper.emitted('update:modelValue')).toEqual([['banana']])
  })

  it('exposes select ref, focus(), and blur() via defineExpose', () => {
    const wrapper = mount(VSelect, {
      attachTo: document.body,
      slots: { default: defaultOptions },
    })

    const selectEl = wrapper.find('select').element as HTMLSelectElement
    const exposed = wrapper.vm as unknown as {
      select: HTMLSelectElement | null
      focus: () => void
      blur: () => void
    }

    expect(exposed.select).toBe(selectEl)

    exposed.focus()
    expect(document.activeElement).toBe(selectEl)

    exposed.blur()
    expect(document.activeElement).not.toBe(selectEl)

    wrapper.unmount()
  })
})
