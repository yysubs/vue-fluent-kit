import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { VfkTextarea } from './index'

describe('VfkTextarea', () => {
  it('注册 fluent-textarea 并映射 appearance、size、resize 与布尔属性', () => {
    expect(customElements.get('fluent-textarea')).toBeDefined()

    const wrapper = mount(VfkTextarea, {
      props: {
        appearance: 'filled-darker',
        size: 'large',
        resize: 'vertical',
        block: true,
        autoResize: true,
        placeholder: '请输入描述',
        maxlength: 200,
      },
    })

    const el = wrapper.find('fluent-textarea')
    expect(el.exists()).toBe(true)
    expect(el.attributes('appearance')).toBe('filled-darker')
    expect(el.attributes('size')).toBe('large')
    expect(el.attributes('resize')).toBe('vertical')
    expect(el.attributes('block')).toBe('')
    expect(el.attributes('auto-resize')).toBe('')
    expect(el.attributes('placeholder')).toBe('请输入描述')
    expect(el.attributes('maxlength')).toBe('200')
    expect(el.attributes('disabled')).toBeUndefined()
  })

  it('支持 v-model 双向绑定与 change 事件', async () => {
    const wrapper = mount(VfkTextarea, {
      props: {
        modelValue: '初始文本',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const el = wrapper.find('fluent-textarea').element as HTMLElement & { value: string }
    expect(el.value).toBe('初始文本')

    el.value = '换行\n第二行'
    el.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['换行\n第二行'])
    expect(wrapper.emitted('input')?.[0]?.[0]).toBe('换行\n第二行')
    expect(wrapper.props('modelValue')).toBe('换行\n第二行')

    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('换行\n第二行')
  })

  it('受控模式下父级未更新 modelValue 时还原底层值', async () => {
    const wrapper = mount(VfkTextarea, { props: { modelValue: '固定值' } })

    const el = wrapper.find('fluent-textarea').element as HTMLElement & { value: string }
    el.value = '尝试改写'
    el.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()

    expect(el.value).toBe('固定值')
  })

  it('禁用态不派发 input 事件', async () => {
    const wrapper = mount(VfkTextarea, { props: { modelValue: '锁定', disabled: true } })

    const el = wrapper.find('fluent-textarea').element as HTMLElement & { value: string }
    el.value = '修改'
    el.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(el.value).toBe('锁定')
  })

  it('minHeight 映射到 --vfk-textarea-min-height，并渲染 label 插槽', () => {
    const wrapper = mount(VfkTextarea, {
      props: { minHeight: '120px' },
      slots: { label: '<span class="label-text">备注</span>' },
    })

    const el = wrapper.find('fluent-textarea')
    expect(el.attributes('style')).toContain('--vfk-textarea-min-height: 120px')

    const labelSlot = el.find('[slot="label"]')
    expect(labelSlot.exists()).toBe(true)
    expect(labelSlot.find('.label-text').text()).toBe('备注')
  })
})
