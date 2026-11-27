import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { VfkTab, VfkTabList } from './index'

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

describe('VfkTabList / VfkTab', () => {
  it('渲染 fluent-tablist / fluent-tab 并映射外观、方向、尺寸与插槽', () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTabList, VfkTab },
        template: `
          <VfkTabList model-value="overview" appearance="subtle" orientation="vertical" size="large">
            <VfkTab value="overview" label="概览">
              <template #start><span class="icon-start">I</span></template>
              <template #end><span class="badge-end">3</span></template>
            </VfkTab>
            <VfkTab value="logs" label="日志" disabled />
          </VfkTabList>
        `,
      }),
    )

    const list = wrapper.find('fluent-tablist')
    expect(list.exists()).toBe(true)
    expect(list.attributes('appearance')).toBe('subtle')
    expect(list.attributes('orientation')).toBe('vertical')
    expect(list.attributes('size')).toBe('large')

    const tabs = wrapper.findAll('fluent-tab')
    expect(tabs).toHaveLength(2)
    expect(tabs[0].attributes('slot')).toBe('tab')
    expect(tabs[0].find('[slot="start"] .icon-start').text()).toBe('I')
    expect(tabs[0].find('[slot="end"] .badge-end').text()).toBe('3')
    expect(tabs[1].attributes('disabled')).toBe('')
  })

  it('支持 v-model 受控双向绑定并在点击标签时更新选中值', async () => {
    const active = ref('overview')
    const changed: string[] = []

    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTabList, VfkTab },
        setup() {
          return {
            active,
            onChange: (value: string) => changed.push(value),
          }
        },
        template: `
          <VfkTabList v-model="active" @change="onChange">
            <VfkTab value="overview" label="概览" />
            <VfkTab value="settings" label="设置" />
            <VfkTab value="disabled" label="禁用项" disabled />
          </VfkTabList>
        `,
      }),
    )

    await nextTick()
    const listEl = wrapper.find('fluent-tablist').element as HTMLElement & {
      tabs: HTMLElement[]
      activeid: string
      setTabs: () => void
    }
    const tabEls = wrapper.findAll('fluent-tab').map((w) => w.element as HTMLElement)
    // jsdom 不会自动派发 slotchange，手动同步底层 tabs 列表与浏览器行为一致
    listEl.tabs = tabEls
    listEl.setTabs()
    await nextTick()

    expect(listEl.activeid).toBe(tabEls[0].id)

    await wrapper.findAll('fluent-tab')[1].trigger('click')
    await nextTick()

    expect(active.value).toBe('settings')
    expect(changed).toEqual(['settings'])
    expect(listEl.activeid).toBe(tabEls[1].id)

    // 禁用项点击不会触发变更
    await wrapper.findAll('fluent-tab')[2].trigger('click')
    await nextTick()
    expect(active.value).toBe('settings')
  })

  it('同页多个 VfkTabList 自动生成不同 DOM id 前缀互不干扰', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTabList, VfkTab },
        template: `
          <div>
            <VfkTabList model-value="a">
              <VfkTab value="a" label="A1" />
            </VfkTabList>
            <VfkTabList model-value="a">
              <VfkTab value="a" label="A2" />
            </VfkTabList>
          </div>
        `,
      }),
    )

    await nextTick()
    const tabs = wrapper.findAll('fluent-tab')
    expect(tabs[0].attributes('id')).toBeTruthy()
    expect(tabs[1].attributes('id')).toBeTruthy()
    expect(tabs[0].attributes('id')).not.toBe(tabs[1].attributes('id'))
  })
})
