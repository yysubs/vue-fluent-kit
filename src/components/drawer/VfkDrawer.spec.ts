import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { VfkDrawer, VfkDrawerBody } from './index'

const mountedWrappers: VueWrapper[] = []

function mountAttached(component: Parameters<typeof mount>[0]) {
  const wrapper = mount(component, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

/** 等待 Vue 更新与底层 FAST 元素排队的渲染任务完成 */
async function flushUpdates() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 60))
  await nextTick()
}

function innerDialog(host: HTMLElement): HTMLDialogElement | null {
  return host.shadowRoot?.querySelector('dialog') ?? null
}

afterEach(() => {
  while (mountedWrappers.length > 0) {
    mountedWrappers.pop()?.unmount()
  }
})

describe('VfkDrawer / VfkDrawerBody', () => {
  it('渲染 fluent-drawer / fluent-drawer-body 并映射类型、位置、尺寸与自定义宽度', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDrawer, VfkDrawerBody },
        template: `
          <VfkDrawer type="modal" position="end" size="large" width="420px" aria-describedby="drawer-desc">
            <VfkDrawerBody title="筛选条件" close-label="关闭抽屉">
              <p id="drawer-desc">按标签筛选</p>
              <template #footer>
                <span class="drawer-apply">应用</span>
              </template>
            </VfkDrawerBody>
          </VfkDrawer>
        `,
      }),
    )

    await flushUpdates()

    const host = wrapper.find('fluent-drawer')
    expect(host.exists()).toBe(true)
    expect(host.attributes('type')).toBe('modal')
    expect(host.attributes('position')).toBe('end')
    expect(host.attributes('size')).toBe('large')
    expect(host.attributes('aria-describedby')).toBe('drawer-desc')
    expect(host.attributes('style')).toContain('--drawer-width: 420px')

    const body = wrapper.find('fluent-drawer-body')
    expect(body.exists()).toBe(true)
    expect(body.find('.vfk-drawer-body__title').text()).toBe('筛选条件')
    expect(body.find('.vfk-drawer-body__footer .drawer-apply').text()).toBe('应用')

    const closeButton = body.find('.vfk-drawer-body__close fluent-button')
    expect(closeButton.exists()).toBe(true)
    expect(closeButton.attributes('aria-label')).toBe('关闭抽屉')
  })

  it('标题自动关联 aria-labelledby，外部 ariaLabelledby 优先', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDrawer, VfkDrawerBody },
        template: `
          <div>
            <VfkDrawer aria-labelledby="external-title">
              <VfkDrawerBody title="内部标题">内容</VfkDrawerBody>
            </VfkDrawer>
            <VfkDrawer>
              <VfkDrawerBody title="自动关联标题">内容</VfkDrawerBody>
            </VfkDrawer>
          </div>
        `,
      }),
    )

    await flushUpdates()
    const hosts = wrapper.findAll('fluent-drawer')
    expect(hosts[0].attributes('aria-labelledby')).toBe('external-title')

    const titleEl = wrapper.findAll('.vfk-drawer-body__title')[1]
    expect(titleEl.attributes('id')).toBeTruthy()
    expect(hosts[1].attributes('aria-labelledby')).toBe(titleEl.attributes('id'))
  })

  it('v-model 受控开关驱动底层 dialog 的 show / hide', async () => {
    const open = ref(false)
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDrawer, VfkDrawerBody },
        setup: () => ({ open }),
        template: `<VfkDrawer v-model="open"><VfkDrawerBody title="受控抽屉">内容</VfkDrawerBody></VfkDrawer>`,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-drawer').element as HTMLElement
    expect(innerDialog(host)?.open).toBe(false)

    open.value = true
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(true)

    open.value = false
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(false)
  })

  it('非受控关闭（遮罩或 Escape）通过 toggle 事件回写 modelValue', async () => {
    const open = ref(true)
    const changes: boolean[] = []
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDrawer, VfkDrawerBody },
        setup: () => ({ open, onChange: (value: boolean) => changes.push(value) }),
        template: `
          <VfkDrawer v-model="open" @open-change="onChange">
            <VfkDrawerBody title="可关闭抽屉">内容</VfkDrawerBody>
          </VfkDrawer>
        `,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-drawer').element as HTMLElement
    expect(innerDialog(host)?.open).toBe(true)

    // 原生 cancel（Escape）会由官方元素调用 hide，再通过 toggle 事件回写受控值
    innerDialog(host)?.dispatchEvent(new Event('cancel'))
    await flushUpdates()

    expect(open.value).toBe(false)
    expect(changes).toEqual([false])
    expect(innerDialog(host)?.open).toBe(false)
  })

  it('内置关闭按钮通过官方 close 插槽关闭抽屉', async () => {
    const open = ref(true)
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDrawer, VfkDrawerBody },
        setup: () => ({ open }),
        template: `<VfkDrawer v-model="open"><VfkDrawerBody title="关闭测试">内容</VfkDrawerBody></VfkDrawer>`,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-drawer').element as HTMLElement
    expect(innerDialog(host)?.open).toBe(true)

    await wrapper.find('.vfk-drawer-body__close fluent-button').trigger('click')
    await flushUpdates()

    expect(innerDialog(host)?.open).toBe(false)
    expect(open.value).toBe(false)
  })

  it('暴露 show / hide 命令式方法，双向同步打开状态', async () => {
    const open = ref(false)
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDrawer, VfkDrawerBody },
        setup: () => ({ open }),
        template: `<VfkDrawer v-model="open"><VfkDrawerBody title="命令式">内容</VfkDrawerBody></VfkDrawer>`,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-drawer').element as HTMLElement
    const drawerInstance = wrapper.findComponent(VfkDrawer).vm as unknown as {
      show: () => void
      hide: () => void
    }

    drawerInstance.show()
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(true)
    expect(open.value).toBe(true)

    drawerInstance.hide()
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(false)
    expect(open.value).toBe(false)
  })
})
