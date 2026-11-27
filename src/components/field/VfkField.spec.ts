import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VfkField } from './index'

describe('VfkField', () => {
  it('注册 fluent-field 并渲染标签、必填星号、控件与提示文案', () => {
    expect(customElements.get('fluent-field')).toBeDefined()

    const wrapper = mount(VfkField, {
      props: {
        label: '项目名称',
        for: 'proj-name',
        required: true,
        hint: '支持字母、数字与连字符',
      },
      slots: {
        default: '<input id="proj-name" />',
      },
    })

    const field = wrapper.find('fluent-field')
    expect(field.exists()).toBe(true)
    expect(field.attributes('label-position')).toBe('above')
    expect(field.attributes('size')).toBe('medium')

    const label = wrapper.find('label[slot="label"]')
    expect(label.attributes('for')).toBe('proj-name')
    expect(label.text()).toContain('项目名称')
    expect(wrapper.find('.vfk-field__required').exists()).toBe(true)
    expect(wrapper.find('[slot="input"] #proj-name').exists()).toBe(true)
    expect(wrapper.find('.vfk-field__hint').text()).toBe('支持字母、数字与连字符')
  })

  it('支持 horizontal 方向与 error / warning / success 校验态', () => {
    const errorField = mount(VfkField, {
      props: {
        label: '邮箱',
        orientation: 'horizontal',
        size: 'large',
        validationState: 'error',
        validationMessage: '邮箱格式不正确',
      },
    })

    expect(errorField.find('fluent-field').attributes('label-position')).toBe('before')
    expect(errorField.find('fluent-field').attributes('size')).toBe('large')
    const validation = errorField.find('.vfk-field__validation')
    expect(validation.classes()).toContain('vfk-field__validation--error')
    expect(validation.attributes('role')).toBe('alert')
    expect(validation.text()).toBe('邮箱格式不正确')
    expect(errorField.find('.vfk-field__icon svg').exists()).toBe(true)

    const successField = mount(VfkField, {
      props: {
        label: '域名',
        validationState: 'success',
        validationMessage: '域名可用',
      },
    })
    const successMsg = successField.find('.vfk-field__validation')
    expect(successMsg.classes()).toContain('vfk-field__validation--success')
    expect(successMsg.attributes('role')).toBeUndefined()
    expect(successField.find('.vfk-field__icon svg').exists()).toBe(true)
  })

  it('支持 disabled 样式与自定义插槽', () => {
    const wrapper = mount(VfkField, {
      props: {
        disabled: true,
        validationState: 'warning',
      },
      slots: {
        label: '<strong>自定义标签</strong>',
        validationMessage: '<em>弱密码警告</em>',
        hint: '<span>至少 8 位字符</span>',
      },
    })

    expect(wrapper.find('fluent-field').classes()).toContain('vfk-field--disabled')
    expect(wrapper.find('label strong').text()).toBe('自定义标签')
    expect(wrapper.find('.vfk-field__validation em').text()).toBe('弱密码警告')
    expect(wrapper.find('.vfk-field__hint span').text()).toBe('至少 8 位字符')
  })
})
