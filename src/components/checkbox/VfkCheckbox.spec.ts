import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { VfkCheckbox } from './index'

describe('VfkCheckbox', () => {
  it('注册 fluent-checkbox 并关联 label 与自动 id', () => {
    expect(customElements.get('fluent-checkbox')).toBeDefined()

    const wrapper = mount(VfkCheckbox, {
      props: {
        label: '同意服务条款',
        required: true,
        shape: 'circular',
        size: 'large',
      },
    })

    const checkbox = wrapper.find('fluent-checkbox')
    const label = wrapper.find('label')
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.attributes('shape')).toBe('circular')
    expect(checkbox.attributes('size')).toBe('large')
    expect(label.exists()).toBe(true)
    expect(label.attributes('for')).toBe(checkbox.attributes('id'))
    expect(label.text()).toContain('同意服务条款')
    expect(wrapper.find('.vfk-checkbox__required').exists()).toBe(true)
  })

  it('支持 boolean 与 mixed 三态同步及 v-model 切换', async () => {
    const wrapper = mount(VfkCheckbox, {
      props: {
        modelValue: 'mixed' as const,
        label: '全选',
        'onUpdate:modelValue': (val: boolean) => wrapper.setProps({ modelValue: val }),
      },
    })

    await nextTick()
    const el = wrapper.find('fluent-checkbox').element as HTMLElement & {
      checked: boolean
      indeterminate?: boolean
    }
    expect(el.checked).toBe(false)
    expect(el.indeterminate).toBe(true)

    el.checked = true
    el.indeterminate = false
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.props('modelValue')).toBe(true)
    expect(el.checked).toBe(true)
    expect(el.indeterminate).toBe(false)
  })

  it('disabled 时不派发 update:modelValue 并保持状态不变', async () => {
    const wrapper = mount(VfkCheckbox, {
      props: {
        modelValue: false,
        disabled: true,
        label: '不可选',
      },
    })

    const el = wrapper.find('fluent-checkbox').element as HTMLElement & { checked: boolean }
    el.checked = true
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()

    expect(wrapper.find('fluent-checkbox').attributes('disabled')).toBe('')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(el.checked).toBe(false)
    expect(wrapper.find('.vfk-checkbox').classes()).toContain('vfk-checkbox--disabled')
  })

  it('支持 labelPosition="before"', () => {
    const wrapper = mount(VfkCheckbox, {
      props: {
        label: '左侧标签',
        labelPosition: 'before',
      },
    })

    expect(wrapper.find('.vfk-checkbox').classes()).toContain('vfk-checkbox--label-before')
  })
})
