import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { VfkButton } from '../button'
import { VfkMenu, VfkMenuButton, VfkMenuDivider, VfkMenuItem, VfkMenuList } from './index'

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

describe('VfkMenu / VfkMenuList / VfkMenuItem / VfkMenuButton', () => {
  it('直接为 trigger 与 primary-action 真实按钮附加 slot 属性，并映射菜单配置属性', () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkButton, VfkMenu, VfkMenuButton, VfkMenuDivider, VfkMenuItem, VfkMenuList },
        template: `
          <VfkMenu split persist-on-item-click max-height="240px">
            <template #primary-action>
              <VfkButton appearance="primary">保存</VfkButton>
            </template>
            <template #trigger>
              <VfkMenuButton appearance="primary" aria-label="更多保存选项" />
            </template>
            <VfkMenuList>
              <VfkMenuItem value="save" label="保存">
                <template #end>Ctrl+S</template>
              </VfkMenuItem>
              <VfkMenuDivider />
              <VfkMenuItem value="save-as" label="另存为" />
            </VfkMenuList>
          </VfkMenu>
        `,
      }),
    )

    const menu = wrapper.find('fluent-menu')
    expect(menu.exists()).toBe(true)
    expect(menu.attributes('split')).toBe('')
    expect(menu.attributes('persist-on-item-click')).toBe('')
    expect((menu.element as HTMLElement).style.getPropertyValue('--menu-max-height')).toBe('240px')

    const primaryBtn = wrapper.find('fluent-button')
    expect(primaryBtn.attributes('slot')).toBe('primary-action')

    const triggerBtn = wrapper.find('fluent-menu-button')
    expect(triggerBtn.attributes('slot')).toBe('trigger')
    expect(triggerBtn.attributes('icon-only')).toBe('')

    expect(wrapper.find('[role="separator"].vfk-menu-divider').exists()).toBe(true)
    expect(wrapper.find('[slot="end"]').text()).toBe('Ctrl+S')
  })

  it('普通菜单项触发 select 事件并冒泡到 VfkMenuList，禁用项不触发', async () => {
    const selected: Array<string | undefined> = []

    const wrapper = mountAttached(
      defineComponent({
        components: { VfkMenuItem, VfkMenuList },
        setup() {
          return {
            onSelect: (value: string | undefined) => selected.push(value),
          }
        },
        template: `
          <VfkMenuList @select="onSelect">
            <VfkMenuItem value="copy" label="复制" />
            <VfkMenuItem value="delete" label="删除" disabled />
          </VfkMenuList>
        `,
      }),
    )

    await nextTick()
    const items = wrapper.findAll('fluent-menu-item')
    await items[0].trigger('click')
    await items[1].trigger('click')
    await nextTick()

    expect(selected).toEqual(['copy'])
  })

  it('支持 menuitemcheckbox 的 v-model:checked 与 menuitemradio 互斥切换', async () => {
    const showGrid = ref(false)
    const sortAsc = ref(true)
    const sortDesc = ref(false)

    const wrapper = mountAttached(
      defineComponent({
        components: { VfkMenuDivider, VfkMenuItem, VfkMenuList },
        setup() {
          return { showGrid, sortAsc, sortDesc }
        },
        template: `
          <VfkMenuList>
            <VfkMenuItem v-model:checked="showGrid" role="menuitemcheckbox" value="grid" label="显示网格" />
            <VfkMenuDivider />
            <VfkMenuItem v-model:checked="sortAsc" role="menuitemradio" value="asc" label="升序" />
            <VfkMenuItem v-model:checked="sortDesc" role="menuitemradio" value="desc" label="降序" />
          </VfkMenuList>
        `,
      }),
    )

    await nextTick()
    const listEl = wrapper.find('fluent-menu-list').element as HTMLElement & {
      setItems: () => void
    }
    listEl.setItems()

    const items = wrapper.findAll('fluent-menu-item')
    await items[0].trigger('click')
    await nextTick()
    expect(showGrid.value).toBe(true)

    await items[2].trigger('click')
    await nextTick()
    expect(sortDesc.value).toBe(true)
    expect(sortAsc.value).toBe(false)
  })
})
