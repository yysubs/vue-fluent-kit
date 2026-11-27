import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { VfkInput } from './index'

describe('VfkInput', () => {
  it('注册 fluent-text-input 并映射 appearance 与 control-size', () => {
    expect(customElements.get('fluent-text-input')).toBeDefined()

    const wrapper = mount(VfkInput, {
      props: {
        appearance: 'filled-darker',
        size: 'large',
        placeholder: '请输入内容',
      },
    })

    const el = wrapper.find('fluent-text-input')
    expect(el.exists()).toBe(true)
    expect(el.attributes('appearance')).toBe('filled-darker')
    expect(el.attributes('control-size')).toBe('large')
    expect((el.element as HTMLElement & { placeholder?: string }).placeholder).toBe('请输入内容')
  })

  it('支持 v-model 双向绑定与 change 事件', async () => {
    const wrapper = mount(VfkInput, {
      props: {
        modelValue: '初始值',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const el = wrapper.find('fluent-text-input').element as HTMLElement & { value: string }
    expect(el.value).toBe('初始值')

    el.value = '新输入'
    el.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['新输入'])
    expect(wrapper.emitted('input')?.[0]?.[0]).toBe('新输入')
    expect(wrapper.props('modelValue')).toBe('新输入')

    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('新输入')
  })

  it('受控模式下父级未更新 modelValue 时还原底层值', async () => {
    const wrapper = mount(VfkInput, {
      props: {
        modelValue: '固定值',
      },
    })

    const el = wrapper.find('fluent-text-input').element as HTMLElement & { value: string }
    el.value = '尝试改写'
    el.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()

    expect(el.value).toBe('固定值')
  })

  it('渲染 start、end 与默认 label 插槽', () => {
    const wrapper = mount(VfkInput, {
      slots: {
        default: '用户名',
        start: '<span class="prefix">@</span>',
        end: '<span class="suffix">.com</span>',
      },
    })

    const el = wrapper.find('fluent-text-input')
    expect(el.text()).toContain('用户名')
    expect(el.find('[slot="start"] .prefix').exists()).toBe(true)
    expect(el.find('[slot="end"] .suffix').exists()).toBe(true)
  })
})
