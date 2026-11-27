import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { VfkRadio, VfkRadioGroup } from './index'

describe('VfkRadioGroup / VfkRadio', () => {
  it('注册 fluent-radio-group 与 fluent-radio 并同步方向与选中态', async () => {
    expect(customElements.get('fluent-radio-group')).toBeDefined()
    expect(customElements.get('fluent-radio')).toBeDefined()

    const Host = defineComponent({
      components: { VfkRadioGroup, VfkRadio },
      setup() {
        const plan = ref('pro')
        return { plan }
      },
      template: `
        <VfkRadioGroup v-model="plan" orientation="horizontal" name="plan" required>
          <VfkRadio value="free" label="免费版" />
          <VfkRadio value="pro" label="专业版" />
          <VfkRadio value="enterprise" label="企业版" disabled />
        </VfkRadioGroup>
      `,
    })

    const wrapper = mount(Host)
    await nextTick()

    const group = wrapper.find('fluent-radio-group')
    expect(group.attributes('orientation')).toBe('horizontal')
    expect(group.attributes('name')).toBe('plan')
    expect(group.attributes('required')).toBe('')

    const radios = wrapper.findAll('fluent-radio')
    expect(radios).toHaveLength(3)
    expect((radios[0].element as HTMLElement & { checked: boolean }).checked).toBe(false)
    expect((radios[1].element as HTMLElement & { checked: boolean }).checked).toBe(true)
    expect(radios[2].attributes('disabled')).toBe('')

    const labels = wrapper.findAll('label')
    expect(labels[0].attributes('for')).toBe(radios[0].attributes('id'))
    expect(labels[1].text()).toBe('专业版')

    wrapper.vm.plan = 'free'
    await nextTick()
    expect((radios[0].element as HTMLElement & { checked: boolean }).checked).toBe(true)
    expect((radios[1].element as HTMLElement & { checked: boolean }).checked).toBe(false)
  })

  it('派发 change 时更新 v-model，整组 disabled 时拦截变更', async () => {
    const Host = defineComponent({
      components: { VfkRadioGroup, VfkRadio },
      setup() {
        const value = ref('a')
        const disabled = ref(false)
        return { value, disabled }
      },
      template: `
        <VfkRadioGroup v-model="value" :disabled="disabled">
          <VfkRadio value="a" label="选项 A" />
          <VfkRadio value="b" label="选项 B" />
        </VfkRadioGroup>
      `,
    })

    const wrapper = mount(Host)
    await nextTick()

    const radios = wrapper.findAll('fluent-radio')
    const radioB = radios[1].element as HTMLElement & { checked: boolean }
    radioB.checked = true
    radioB.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.vm.value).toBe('b')

    wrapper.vm.disabled = true
    await nextTick()
    expect(wrapper.find('fluent-radio-group').attributes('disabled')).toBe('')
    expect(radios[0].attributes('disabled')).toBe('')

    const radioA = radios[0].element as HTMLElement & { checked: boolean }
    radioA.checked = true
    radioA.dispatchEvent(new Event('change', { bubbles: true }))
    await nextTick()
    expect(wrapper.vm.value).toBe('b')
  })
})
