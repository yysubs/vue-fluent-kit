import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { VfkColorSwatch, VfkSwatchPicker } from './index'

const Host = defineComponent({
  components: { VfkSwatchPicker, VfkColorSwatch },
  props: {
    initial: { type: String, default: 'blue' },
    layout: { type: String, default: 'row' },
  },
  setup(props) {
    const value = ref<string>(props.initial)
    return { value }
  },
  template: `
    <VfkSwatchPicker v-model="value" aria-label="主题色" :layout="layout" :column-count="2">
      <VfkColorSwatch value="red" color="#d13438" label="红色" />
      <VfkColorSwatch value="blue" color="#0f6cbd" label="蓝色" />
      <VfkColorSwatch value="gray" color="#616161" disabled />
      <VfkColorSwatch value="green" color="#107c10" />
    </VfkSwatchPicker>
  `,
})

describe('VfkSwatchPicker / VfkColorSwatch', () => {
  it('渲染 radiogroup 与 radio 结构，并映射尺寸、形状与颜色', () => {
    const wrapper = mount(VfkSwatchPicker, {
      props: { modelValue: 'red', size: 'large', shape: 'circular', spacing: 'small' },
      attrs: { 'aria-label': '颜色' },
      slots: {
        default: () => [
          h(VfkColorSwatch, { value: 'red', color: '#d13438', label: '红色' }),
          h(VfkColorSwatch, { value: '#ffffff', borderColor: '#d1d1d1' }),
        ],
      },
    })

    const root = wrapper.find('.vfk-swatch-picker')
    expect(root.attributes('role')).toBe('radiogroup')
    expect(root.attributes('aria-label')).toBe('颜色')
    expect(root.classes()).toContain('vfk-swatch-picker--row')
    expect(root.classes()).toContain('vfk-swatch-picker--spacing-small')

    const swatches = wrapper.findAll('.vfk-color-swatch')
    expect(swatches).toHaveLength(2)
    expect(swatches[0].attributes('role')).toBe('radio')
    expect(swatches[0].attributes('type')).toBe('button')
    expect(swatches[0].attributes('aria-checked')).toBe('true')
    expect(swatches[0].attributes('aria-label')).toBe('红色')
    expect(swatches[0].classes()).toEqual(
      expect.arrayContaining(['vfk-color-swatch--large', 'vfk-color-swatch--circular']),
    )
    expect((swatches[0].element as HTMLElement).style.getPropertyValue('--vfk-swatch-color')).toBe(
      '#d13438',
    )
    expect(swatches[1].attributes('aria-checked')).toBe('false')
    expect(swatches[1].attributes('aria-label')).toBe('#ffffff')
    expect((swatches[1].element as HTMLElement).style.getPropertyValue('--vfk-swatch-color')).toBe(
      '#ffffff',
    )
    expect(
      (swatches[1].element as HTMLElement).style.getPropertyValue('--vfk-swatch-border'),
    ).toBe('#d1d1d1')
  })

  it('点击色块更新 v-model，禁用色块不可选', async () => {
    const wrapper = mount(Host)
    await nextTick()
    const swatches = wrapper.findAll('.vfk-color-swatch')

    await swatches[0].trigger('click')
    expect(wrapper.vm.value).toBe('red')
    expect(swatches[0].attributes('aria-checked')).toBe('true')
    expect(swatches[1].attributes('aria-checked')).toBe('false')

    expect(swatches[2].attributes('aria-disabled')).toBe('true')
    await swatches[2].trigger('click')
    expect(wrapper.vm.value).toBe('red')
  })

  it('选中色块作为唯一 Tab 停靠点，方向键跳过禁用色块移动焦点', async () => {
    const wrapper = mount(Host, { attachTo: document.body })
    await nextTick()
    const swatches = wrapper.findAll('.vfk-color-swatch')

    expect(swatches.map((s) => s.attributes('tabindex'))).toEqual(['-1', '0', '-1', '-1'])

    await swatches[1].trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(swatches[3].element)
    expect(swatches[3].attributes('tabindex')).toBe('0')
    expect(wrapper.vm.value).toBe('blue')

    await swatches[3].trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(swatches[0].element)

    await swatches[0].trigger('keydown', { key: 'End' })
    expect(document.activeElement).toBe(swatches[3].element)

    await swatches[3].trigger('keydown', { key: 'Home' })
    expect(document.activeElement).toBe(swatches[0].element)

    wrapper.unmount()
  })

  it('grid 布局按 columnCount 设置列数，上下方向键按列跳转', async () => {
    const wrapper = mount(Host, { props: { layout: 'grid' }, attachTo: document.body })
    await nextTick()

    const root = wrapper.find('.vfk-swatch-picker')
    expect(root.classes()).toContain('vfk-swatch-picker--grid')
    expect((root.element as HTMLElement).style.gridTemplateColumns).toBe('repeat(2, max-content)')

    const swatches = wrapper.findAll('.vfk-color-swatch')
    await swatches[0].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(swatches[3].element)

    await swatches[3].trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(swatches[0].element)

    wrapper.unmount()
  })

  it('整体禁用时不响应点击，且不派发事件', async () => {
    const wrapper = mount(VfkSwatchPicker, {
      props: { modelValue: 'red', disabled: true },
      slots: {
        default: () => [
          h(VfkColorSwatch, { value: 'red' }),
          h(VfkColorSwatch, { value: 'blue' }),
        ],
      },
    })

    expect(wrapper.find('.vfk-swatch-picker').attributes('aria-disabled')).toBe('true')
    const swatches = wrapper.findAll('.vfk-color-swatch')
    expect(swatches.every((s) => s.attributes('aria-disabled') === 'true')).toBe(true)

    await swatches[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('重复点击已选色块不重复派发 change', async () => {
    const wrapper = mount(VfkSwatchPicker, {
      props: { modelValue: 'red' },
      slots: { default: () => [h(VfkColorSwatch, { value: 'red' })] },
    })

    await wrapper.find('.vfk-color-swatch').trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
