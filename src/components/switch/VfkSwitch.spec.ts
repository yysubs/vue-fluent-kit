import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { VfkSwitch } from './index'

describe('VfkSwitch', () => {
  it('注册 fluent-switch 并自动关联 label 与 id', () => {
    expect(customElements.get('fluent-switch')).toBeDefined()

    const wrapper = mount(VfkSwitch, {
      props: {
        label: '开启自动同步',
        required: true,
        name: 'sync',
      },
    })

    const sw = wrapper.find('fluent-switch')
    const label = wrapper.find('label')
    expect(sw.exists()).toBe(true)
    expect(sw.attributes('name')).toBe('sync')
    expect(sw.attributes('required')).toBe('')
    expect(label.exists()).toBe(true)
    expect(label.attributes('for')).toBe(sw.attributes('id'))
    expect(label.text()).toContain('开启自动同步')
    expect(wrapper.find('.vfk-switch__required').exists()).toBe(true)
  })

  it('支持 v-model 切换与受控同步', async () => {
    const wrapper = mount(VfkSwitch, {
      props: {
        modelValue: false,
        label: '暗色模式',
        'onUpdate:modelValue': (val: boolean) => wrapper.setProps({ modelValue: val }),
      },
    })

    const el = wrapper.find('fluent-switch').element as HTMLElement & { checked: boolean }
    expect(el.checked).toBe(false)

    el.checked = true
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe(true)
    expect(wrapper.props('modelValue')).toBe(true)
    expect(el.checked).toBe(true)
  })

  it('disabled 时拦截变更并支持 labelPosition="before"', async () => {
    const wrapper = mount(VfkSwitch, {
      props: {
        modelValue: false,
        disabled: true,
        label: '左侧标签',
        labelPosition: 'before',
      },
    })

    expect(wrapper.find('.vfk-switch').classes()).toContain('vfk-switch--label-before')
    expect(wrapper.find('.vfk-switch').classes()).toContain('vfk-switch--disabled')

    const el = wrapper.find('fluent-switch').element as HTMLElement & { checked: boolean }
    el.checked = true
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(el.checked).toBe(false)
  })
})
