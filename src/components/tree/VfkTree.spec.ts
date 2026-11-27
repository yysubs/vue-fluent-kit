import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { VfkTree, VfkTreeItem } from './index'

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

describe('VfkTree / VfkTreeItem', () => {
  it('渲染嵌套 fluent-tree / fluent-tree-item 并透传外观、尺寸与插槽', () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTree, VfkTreeItem },
        template: `
          <VfkTree appearance="transparent" size="small">
            <VfkTreeItem value="docs" label="文档" expanded>
              <template #start><span class="test-icon">D</span></template>
              <template #aside><span class="test-count">2</span></template>
              <VfkTreeItem value="readme">README</VfkTreeItem>
            </VfkTreeItem>
          </VfkTree>
        `,
      }),
    )

    const tree = wrapper.find('fluent-tree')
    expect(tree.exists()).toBe(true)
    expect(tree.attributes('appearance')).toBe('transparent')
    expect(tree.attributes('size')).toBe('small')

    const items = wrapper.findAll('fluent-tree-item')
    expect(items).toHaveLength(2)
    expect(items[0].attributes('expanded')).toBe('')
    expect(items[0].find('[slot="start"] .test-icon').text()).toBe('D')
    expect(items[0].find('[slot="aside"] .test-count').text()).toBe('2')
    expect(items[1].text()).toContain('README')
  })

  it('支持 v-model 双向绑定与 Light DOM 子节点点击选中', async () => {
    const selected = ref('button')
    const changed: string[] = []

    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTree, VfkTreeItem },
        setup() {
          return {
            selected,
            onChange: (value: string) => changed.push(value),
          }
        },
        template: `
          <VfkTree v-model="selected" @change="onChange">
            <VfkTreeItem value="button">
              <template #start><span class="btn-icon">B</span></template>
              Button
            </VfkTreeItem>
            <VfkTreeItem value="input">
              <template #aside><span class="input-sub">输入框</span></template>
              Input
            </VfkTreeItem>
          </VfkTree>
        `,
      }),
    )

    await nextTick()
    const items = wrapper.findAll('fluent-tree-item')
    expect((items[0].element as HTMLElement & { selected: boolean }).selected).toBe(true)
    expect((items[1].element as HTMLElement & { selected: boolean }).selected).toBe(false)

    await wrapper.find('.input-sub').trigger('click')
    await nextTick()

    expect(selected.value).toBe('input')
    expect(changed).toEqual(['input'])
    expect((items[1].element as HTMLElement & { selected: boolean }).selected).toBe(true)
  })

  it('非可选分组节点点击仅切换展开收起，不影响当前选中项，且不拦截 aside 内部按钮', async () => {
    const selected = ref('button')
    const toggled: Array<{ value?: string; expanded: boolean }> = []
    let asideClicked = 0

    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTree, VfkTreeItem },
        setup() {
          return {
            selected,
            onToggle: (detail: { value?: string; expanded: boolean }) => toggled.push(detail),
            onAsideClick: () => {
              asideClicked += 1
            },
          }
        },
        template: `
          <VfkTree v-model="selected" @toggle="onToggle">
            <VfkTreeItem value="group-components" label="控件" :selectable="false" expanded>
              <template #aside>
                <button type="button" class="aside-action" @click="onAsideClick">操作</button>
              </template>
              <VfkTreeItem value="button">Button</VfkTreeItem>
              <VfkTreeItem value="tree">Tree</VfkTreeItem>
            </VfkTreeItem>
          </VfkTree>
        `,
      }),
    )

    await nextTick()
    const groupEl = wrapper.find('fluent-tree-item[data-vfk-value="group-components"]').element as HTMLElement & {
      expanded: boolean
      selected: boolean
      childTreeItems: HTMLElement[]
    }
    const childItems = wrapper
      .findAll('fluent-tree-item')
      .slice(1)
      .map((w) => w.element as HTMLElement)
    // jsdom 不自动派发 slotchange，手动确保底层 childTreeItems 与真实浏览器一致
    groupEl.childTreeItems = childItems

    // 点击 aside 内部按钮不会折叠分组或改变选中值
    await wrapper.find('.aside-action').trigger('click')
    await nextTick()
    expect(asideClicked).toBe(1)
    expect(groupEl.expanded).toBe(true)
    expect(selected.value).toBe('button')

    // 点击分组节点本身仅收起分组，不抢占 selected
    await wrapper.find('fluent-tree-item[data-vfk-value="group-components"]').trigger('click')
    await nextTick()
    expect(groupEl.expanded).toBe(false)
    expect(groupEl.selected).toBe(false)
    expect(selected.value).toBe('button')
    expect(toggled.at(-1)).toEqual({ value: 'group-components', expanded: false })
  })

  it('受控切换 modelValue 到折叠分支内的子节点时自动展开祖先节点', async () => {
    const selected = ref('overview')

    const wrapper = mountAttached(
      defineComponent({
        components: { VfkTree, VfkTreeItem },
        setup() {
          return { selected }
        },
        template: `
          <VfkTree v-model="selected">
            <VfkTreeItem value="overview">概览</VfkTreeItem>
            <VfkTreeItem value="group-components" label="控件" :selectable="false">
              <VfkTreeItem value="tree">Tree</VfkTreeItem>
            </VfkTreeItem>
          </VfkTree>
        `,
      }),
    )

    await nextTick()
    const groupEl = wrapper.find('fluent-tree-item[data-vfk-value="group-components"]').element as HTMLElement & {
      expanded: boolean
    }
    expect(groupEl.expanded).toBe(false)

    selected.value = 'tree'
    await nextTick()

    expect(groupEl.expanded).toBe(true)
    const treeItemEl = wrapper.find('fluent-tree-item[data-vfk-value="tree"]').element as HTMLElement & {
      selected: boolean
    }
    expect(treeItemEl.selected).toBe(true)
  })
})
