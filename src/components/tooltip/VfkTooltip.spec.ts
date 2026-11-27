import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { VfkTooltip } from './index'

const mountedWrappers: VueWrapper[] = []

function mountAttached(component: Parameters<typeof mount>[0]) {
  const wrapper = mount(component, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

afterEach(() => {
  while (mountedWrappers.length > 0) {
    mountedWrappers.pop()?.unmount()
  }
})

describe('VfkTooltip', () => {
  it('自动为触发元素注入 id，并与提示元素的 anchor 关联', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTooltip },
        template: `
          <VfkTooltip text="保存" positioning="below-end" :delay="120">
            <button class="trigger" type="button">保存</button>
          </VfkTooltip>
        `,
      }),
    )

    await nextTick()

    const trigger = wrapper.find('.trigger')
    const triggerId = trigger.attributes('id')
    expect(triggerId).toBeTruthy()

    const tooltip = wrapper.find('fluent-tooltip')
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.attributes('anchor')).toBe(triggerId)
    expect(tooltip.attributes('positioning')).toBe('below-end')
    expect(tooltip.attributes('delay')).toBe('120')
    expect(tooltip.text()).toBe('保存')

    // 官方元素在连接时把提示 id 写入锚点的 aria-describedby
    const tooltipId = tooltip.element.id
    expect(tooltipId).toBeTruthy()
    expect(trigger.attributes('aria-describedby')).toContain(tooltipId)
  })

  it('传入 anchor 时复用已有 id，不改写触发元素', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTooltip },
        template: `
          <div>
            <button id="custom-anchor" class="trigger" type="button">删除</button>
            <VfkTooltip anchor="custom-anchor" text="不可恢复">
              <span class="placeholder">无</span>
            </VfkTooltip>
          </div>
        `,
      }),
    )

    await nextTick()

    expect(wrapper.find('.placeholder').attributes('id')).toBeUndefined()
    const tooltip = wrapper.find('fluent-tooltip')
    expect(tooltip.attributes('anchor')).toBe('custom-anchor')
    expect(wrapper.find('#custom-anchor').attributes('aria-describedby')).toContain(
      tooltip.element.id,
    )
  })

  it('content 插槽优先于 text 属性渲染富文本', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTooltip },
        template: `
          <VfkTooltip text="纯文本">
            <button type="button">触发</button>
            <template #content><strong class="rich">富文本<em>内容</em></strong></template>
          </VfkTooltip>
        `,
      }),
    )

    await nextTick()

    const tooltip = wrapper.find('fluent-tooltip')
    expect(tooltip.find('.rich').exists()).toBe(true)
    expect(tooltip.text()).not.toContain('纯文本')
  })

  it('提示元素被移除时清理锚点上的 aria-describedby', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTooltip },
        setup() {
          const visible = ref(true)
          return { visible }
        },
        template: `
          <div>
            <button id="keep-anchor" class="trigger" type="button">触发</button>
            <VfkTooltip v-if="visible" anchor="keep-anchor" text="提示" />
          </div>
        `,
      }),
    )

    await nextTick()
    const trigger = wrapper.find('.trigger').element as HTMLElement
    expect(trigger.getAttribute('aria-describedby')).toBeTruthy()

    ;(wrapper.vm as unknown as { visible: boolean }).visible = false
    await nextTick()

    expect(trigger.getAttribute('aria-describedby')).toBeNull()
  })
})
