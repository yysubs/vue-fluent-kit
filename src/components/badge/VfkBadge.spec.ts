import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VfkBadge } from './index'

describe('VfkBadge', () => {
  it('注册 fluent-badge 并映射 appearance、color、size 与 shape', () => {
    expect(customElements.get('fluent-badge')).toBeDefined()

    const wrapper = mount(VfkBadge, {
      props: { appearance: 'outline', color: 'danger', size: 'large', shape: 'rounded' },
      slots: { default: '99+' },
    })

    const el = wrapper.find('fluent-badge')
    expect(el.exists()).toBe(true)
    expect(el.attributes('appearance')).toBe('outline')
    expect(el.attributes('color')).toBe('danger')
    expect(el.attributes('size')).toBe('large')
    expect(el.attributes('shape')).toBe('rounded')
    expect(el.text()).toBe('99+')
  })

  it('未传属性时使用 filled / brand / medium / circular 默认值', () => {
    const wrapper = mount(VfkBadge, { slots: { default: '3' } })

    const el = wrapper.find('fluent-badge')
    expect(el.attributes('appearance')).toBe('filled')
    expect(el.attributes('color')).toBe('brand')
    expect(el.attributes('size')).toBe('medium')
    expect(el.attributes('shape')).toBe('circular')
  })

  it('渲染 start 与 end 图标插槽', () => {
    const wrapper = mount(VfkBadge, {
      slots: {
        default: '2',
        start: '<span class="badge-start">S</span>',
        end: '<span class="badge-end">E</span>',
      },
    })

    const el = wrapper.find('fluent-badge')
    expect(el.find('[slot="start"] .badge-start').text()).toBe('S')
    expect(el.find('[slot="end"] .badge-end').text()).toBe('E')
  })
})
