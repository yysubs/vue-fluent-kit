import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { VfkCombobox, VfkOption } from './index'

type OptionEl = HTMLElement & { selected: boolean; disabled: boolean; text: string; value: string }

function mockOptionProps(option: HTMLElement, text: string) {
  Object.defineProperty(option, 'text', { configurable: true, get: () => text })
}

describe('VfkCombobox', () => {
  it('以 combobox 类型渲染 fluent-dropdown 并映射属性', () => {
    expect(customElements.get('fluent-dropdown')).toBeDefined()

    const wrapper = mount(VfkCombobox, {
      props: {
        appearance: 'filled-lighter',
        size: 'small',
        placeholder: '输入框架名称',
        required: true,
        name: 'framework',
      },
      slots: {
        default: () => [h(VfkOption, { value: 'vue' }, () => 'Vue')],
        indicator: () => h('span', { class: 'custom-arrow' }, 'v'),
      },
    })

    const dropdown = wrapper.find('fluent-dropdown')
    expect(dropdown.classes()).toContain('vfk-combobox')
    expect(dropdown.attributes('type')).toBe('combobox')
    expect(dropdown.attributes('appearance')).toBe('filled-lighter')
    expect(dropdown.attributes('size')).toBe('small')
    expect(dropdown.attributes('placeholder')).toBe('输入框架名称')
    expect(dropdown.attributes('required')).toBe('')
    expect(dropdown.attributes('name')).toBe('framework')
    expect(dropdown.find('fluent-listbox fluent-option').exists()).toBe(true)
    expect(dropdown.find('[slot="indicator"] .custom-arrow').exists()).toBe(true)
    expect(dropdown.find('fluent-option[freeform]').exists()).toBe(false)
  })

  it('默认 outline 不输出 appearance，并通过 VfkOption 同步选中状态', async () => {
    const Host = defineComponent({
      components: { VfkCombobox, VfkOption },
      setup() {
        const value = ref('react')
        return { value }
      },
      template: `
        <VfkCombobox v-model="value">
          <VfkOption value="vue">Vue</VfkOption>
          <VfkOption value="react">React</VfkOption>
        </VfkCombobox>
      `,
    })

    const wrapper = mount(Host)
    await nextTick()

    expect(wrapper.find('fluent-dropdown').attributes('appearance')).toBeUndefined()
    const options = wrapper.findAll('fluent-option')
    expect((options[0].element as OptionEl).selected).toBe(false)
    expect((options[1].element as OptionEl).selected).toBe(true)

    wrapper.vm.value = 'vue'
    await nextTick()
    expect((options[0].element as OptionEl).selected).toBe(true)
    expect((options[1].element as OptionEl).selected).toBe(false)
  })

  it('freeform 时在列表首位渲染自定义选项与提示插槽', () => {
    const wrapper = mount(VfkCombobox, {
      props: { freeform: true },
      slots: {
        default: () => [h(VfkOption, { value: 'vue' }, () => 'Vue')],
        freeform: () => '使用：',
      },
    })

    const first = wrapper.find('fluent-listbox').element.firstElementChild as HTMLElement
    expect(first.tagName.toLowerCase()).toBe('fluent-option')
    expect(first.hasAttribute('freeform')).toBe(true)
    expect(first.textContent).toContain('使用：')
    expect(first.querySelector('output')).not.toBeNull()
  })

  it('输入时按前缀过滤选项并派发 input，收起后恢复全部选项', async () => {
    const wrapper = mount(VfkCombobox, {
      slots: {
        default: () => [
          h(VfkOption, { value: 'vue' }, () => 'Vue'),
          h(VfkOption, { value: 'vite' }, () => 'Vite'),
          h(VfkOption, { value: 'react' }, () => 'React'),
          h(VfkOption, { value: 'svelte', disabled: true }, () => 'Svelte'),
        ],
      },
    })

    const dropdown = wrapper.find('fluent-dropdown').element
    const options = wrapper.findAll('fluent-option').map((o) => o.element as OptionEl)
    options.forEach((option) => mockOptionProps(option, option.textContent?.trim() ?? ''))

    const input = document.createElement('input')
    input.setAttribute('slot', 'control')
    dropdown.querySelectorAll('input[slot="control"]').forEach((node) => node.remove())
    dropdown.appendChild(input)

    input.value = 'v'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('input')?.[0]?.[0]).toBe('v')
    expect(options.map((o) => o.hidden)).toEqual([false, false, true, true])
    expect(options[2].disabled).toBe(true)

    const listbox = wrapper.find('fluent-listbox').element
    const toggle = new Event('toggle') as Event & { newState: string }
    Object.defineProperty(toggle, 'newState', { value: 'closed' })
    listbox.dispatchEvent(toggle)

    expect(options.map((o) => o.hidden)).toEqual([false, false, false, false])
    expect(options[2].disabled).toBe(false)
    expect(options[3].disabled).toBe(true)
  })

  it('filter 为 false 时不隐藏选项', async () => {
    const wrapper = mount(VfkCombobox, {
      props: { filter: false },
      slots: {
        default: () => [
          h(VfkOption, { value: 'vue' }, () => 'Vue'),
          h(VfkOption, { value: 'react' }, () => 'React'),
        ],
      },
    })

    const dropdown = wrapper.find('fluent-dropdown').element
    const options = wrapper.findAll('fluent-option').map((o) => o.element as OptionEl)
    options.forEach((option) => mockOptionProps(option, option.textContent?.trim() ?? ''))
    const input = document.createElement('input')
    input.setAttribute('slot', 'control')
    dropdown.querySelectorAll('input[slot="control"]').forEach((node) => node.remove())
    dropdown.appendChild(input)

    input.value = 'v'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()

    expect(options.map((o) => o.hidden)).toEqual([false, false])
    expect(wrapper.emitted('input')?.[0]?.[0]).toBe('v')
  })

  it('仅处理 fluent-dropdown 自身派发的 change 并更新 v-model', async () => {
    const wrapper = mount(VfkCombobox, {
      props: {
        modelValue: 'vue',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const el = wrapper.find('fluent-dropdown').element
    Object.defineProperty(el, 'value', { configurable: true, get: () => 'react' })

    const inner = document.createElement('span')
    el.appendChild(inner)
    inner.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['react'])
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('react')
    expect(wrapper.props('modelValue')).toBe('react')
  })

  it('非 freeform 时输入不匹配文本不会清空选中值，清空输入则提交空字符串', async () => {
    const wrapper = mount(VfkCombobox, {
      props: { modelValue: 'vue' },
    })

    const el = wrapper.find('fluent-dropdown').element
    Object.defineProperty(el, 'value', { configurable: true, get: () => null })
    const input = document.createElement('input')
    input.setAttribute('slot', 'control')
    el.querySelectorAll('input[slot="control"]').forEach((node) => node.remove())
    el.appendChild(input)

    input.value = 'xyz'
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    input.value = ''
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('disabled 时忽略 change 事件', async () => {
    const wrapper = mount(VfkCombobox, {
      props: { modelValue: 'vue', disabled: true },
    })

    const dropdown = wrapper.find('fluent-dropdown')
    expect(dropdown.attributes('disabled')).toBe('')
    Object.defineProperty(dropdown.element, 'value', { configurable: true, get: () => 'react' })
    dropdown.element.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
