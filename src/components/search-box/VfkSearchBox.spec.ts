import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { VfkSearchBox } from './index'

describe('VfkSearchBox', () => {
  it('默认渲染前置搜索图标，空值未聚焦时不显示清除按钮', () => {
    const wrapper = mount(VfkSearchBox, {
      props: {
        modelValue: '',
        placeholder: '搜索控件',
      },
    })

    const el = wrapper.find('fluent-text-input')
    expect(el.exists()).toBe(true)
    expect(el.attributes('appearance')).toBe('outline')
    expect(el.attributes('control-size')).toBe('medium')
    expect(el.attributes('placeholder')).toBe('搜索控件')
    expect(wrapper.find('.vfk-search-box__icon').exists()).toBe(true)
    expect(wrapper.find('.vfk-search-box__dismiss').exists()).toBe(false)
  })

  it('聚焦或有值时显示清除按钮，点击清空并把焦点还给输入框', async () => {
    const wrapper = mount(VfkSearchBox, {
      props: {
        modelValue: '',
        dismissLabel: '清空搜索',
        'onUpdate:modelValue': (val: string) => {
          void wrapper.setProps({ modelValue: val })
        },
      },
    })

    const el = wrapper.find('fluent-text-input')
    const dom = el.element as HTMLElement & { value: string; focus: () => void }
    const focusSpy = vi.spyOn(dom, 'focus')

    // 聚焦空输入框时显示清除按钮
    await el.trigger('focusin')
    expect(wrapper.find('.vfk-search-box__dismiss').exists()).toBe(true)
    expect(wrapper.find('.vfk-search-box__dismiss').attributes('aria-label')).toBe('清空搜索')

    // 失焦且仍为空时隐藏清除按钮
    await el.trigger('focusout')
    expect(wrapper.find('.vfk-search-box__dismiss').exists()).toBe(false)

    // 有值时即使未聚焦也显示清除按钮
    dom.value = 'Fluent 2'
    dom.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()
    expect(wrapper.props('modelValue')).toBe('Fluent 2')
    expect(wrapper.find('.vfk-search-box__dismiss').exists()).toBe(true)

    // 点击清除按钮清空内容并归还焦点
    await wrapper.find('.vfk-search-box__dismiss').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.props('modelValue')).toBe('')
    expect(focusSpy).toHaveBeenCalled()
  })

  it('支持 Enter 触发 search 与 Escape 清空输入', async () => {
    const wrapper = mount(VfkSearchBox, {
      props: {
        modelValue: 'Button',
        'onUpdate:modelValue': (val: string) => {
          void wrapper.setProps({ modelValue: val })
        },
      },
    })

    const el = wrapper.find('fluent-text-input')
    await el.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')?.[0]?.[0]).toBe('Button')

    await el.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.props('modelValue')).toBe('')
  })

  it('disabled 与 readonly 时不显示清除按钮且不响应清空', async () => {
    const disabledWrapper = mount(VfkSearchBox, {
      props: {
        modelValue: '禁用内容',
        disabled: true,
      },
    })
    expect(disabledWrapper.find('fluent-text-input').attributes('disabled')).toBe('')
    expect(disabledWrapper.find('.vfk-search-box__dismiss').exists()).toBe(false)

    const readonlyWrapper = mount(VfkSearchBox, {
      props: {
        modelValue: '只读内容',
        readonly: true,
      },
    })
    expect(readonlyWrapper.find('fluent-text-input').attributes('readonly')).toBe('')
    await readonlyWrapper.find('fluent-text-input').trigger('focusin')
    expect(readonlyWrapper.find('.vfk-search-box__dismiss').exists()).toBe(false)
    await readonlyWrapper.find('fluent-text-input').trigger('keydown', { key: 'Escape' })
    expect(readonlyWrapper.emitted('clear')).toBeUndefined()
  })

  it('支持自定义 start、dismiss、end 与默认标签插槽', () => {
    const wrapper = mount(VfkSearchBox, {
      props: {
        modelValue: '筛选',
        appearance: 'filled-darker',
        size: 'large',
      },
      slots: {
        default: '检索条件',
        start: '<span class="custom-start">S</span>',
        dismiss: '<span class="custom-dismiss">X</span>',
        end: '<span class="custom-end">⌘K</span>',
      },
    })

    const el = wrapper.find('fluent-text-input')
    expect(el.attributes('appearance')).toBe('filled-darker')
    expect(el.attributes('control-size')).toBe('large')
    expect(el.text()).toContain('检索条件')
    expect(el.find('.custom-start').exists()).toBe(true)
    expect(el.find('.custom-dismiss').exists()).toBe(true)
    expect(el.find('.custom-end').exists()).toBe(true)
  })
})
