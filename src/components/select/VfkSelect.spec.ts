import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { VfkOption, VfkSelect } from './index'

describe('VfkSelect / VfkOption', () => {
  it('注册 fluent-dropdown、fluent-listbox 与 fluent-option 并正确映射属性', () => {
    expect(customElements.get('fluent-dropdown')).toBeDefined()
    expect(customElements.get('fluent-listbox')).toBeDefined()
    expect(customElements.get('fluent-option')).toBeDefined()

    const wrapper = mount(VfkSelect, {
      props: {
        appearance: 'filled-darker',
        size: 'large',
        placeholder: '请选择环境',
        required: true,
        name: 'env',
      },
      slots: {
        default: () => [h(VfkOption, { value: 'dev' }, () => '开发')],
        indicator: () => h('span', { class: 'custom-arrow' }, 'v'),
      },
    })

    const dropdown = wrapper.find('fluent-dropdown')
    expect(dropdown.exists()).toBe(true)
    expect(dropdown.attributes('initial-display')).toBe('')
    expect(dropdown.attributes('type')).toBe('dropdown')
    expect(dropdown.attributes('appearance')).toBe('filled-darker')
    expect(dropdown.attributes('size')).toBe('large')
    expect(dropdown.attributes('placeholder')).toBe('请选择环境')
    expect(dropdown.attributes('required')).toBe('')
    expect(dropdown.attributes('name')).toBe('env')
    expect(dropdown.find('fluent-listbox').exists()).toBe(true)
    expect(dropdown.find('[slot="indicator"] .custom-arrow').exists()).toBe(true)
  })

  it('默认 outline 不输出 appearance 属性，并同步 VfkOption 选中状态', async () => {
    const Host = defineComponent({
      components: { VfkSelect, VfkOption },
      setup() {
        const value = ref('beta')
        return { value }
      },
      template: `
        <VfkSelect v-model="value" placeholder="选择版本">
          <VfkOption value="alpha">Alpha</VfkOption>
          <VfkOption value="beta" text="Beta">
            Beta
            <template #description>测试通道</template>
          </VfkOption>
          <VfkOption value="rc" disabled>RC</VfkOption>
        </VfkSelect>
      `,
    })

    const wrapper = mount(Host)
    await nextTick()

    const dropdown = wrapper.find('fluent-dropdown')
    expect(dropdown.attributes('appearance')).toBeUndefined()

    const options = wrapper.findAll('fluent-option')
    expect(options).toHaveLength(3)
    expect((options[0].element as HTMLElement & { selected: boolean }).selected).toBe(false)
    expect((options[1].element as HTMLElement & { selected: boolean }).selected).toBe(true)
    expect(options[1].attributes('text')).toBe('Beta')
    expect(options[1].find('[slot="description"]').text()).toBe('测试通道')
    expect(options[2].attributes('disabled')).toBe('')

    wrapper.vm.value = 'alpha'
    await nextTick()
    expect((options[0].element as HTMLElement & { selected: boolean }).selected).toBe(true)
    expect((options[1].element as HTMLElement & { selected: boolean }).selected).toBe(false)
  })

  it('底层派发 change 事件时更新 v-model 并触发 change', async () => {
    const wrapper = mount(VfkSelect, {
      props: {
        modelValue: 'a',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
      slots: {
        default: () => [
          '<fluent-option value="a">A</fluent-option>',
          '<fluent-option value="b">B</fluent-option>',
        ],
      },
    })

    const el = wrapper.find('fluent-dropdown').element as HTMLElement & { value: string | null }
    Object.defineProperty(el, 'value', { configurable: true, get: () => 'b' })
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('b')
    expect(wrapper.props('modelValue')).toBe('b')
  })

  it('disabled 时忽略 change 事件并保持禁用属性', async () => {
    const wrapper = mount(VfkSelect, {
      props: {
        modelValue: 'a',
        disabled: true,
      },
    })

    const dropdown = wrapper.find('fluent-dropdown')
    expect(dropdown.attributes('disabled')).toBe('')

    const el = dropdown.element as HTMLElement
    Object.defineProperty(el, 'value', { configurable: true, get: () => 'b' })
    el.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
