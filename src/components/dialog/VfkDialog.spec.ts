import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { VfkDialog, VfkDialogBody } from './index'

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

describe('VfkDialog / VfkDialogBody', () => {
  it('渲染 fluent-dialog / fluent-dialog-body 并映射类型、无障碍属性与面板宽度', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDialog, VfkDialogBody },
        template: `
          <VfkDialog
            type="alert"
            aria-describedby="dlg-desc"
            max-width="720px"
          >
            <VfkDialogBody title="删除确认" close-label="关闭对话框">
              <p id="dlg-desc">删除后不可恢复</p>
            </VfkDialogBody>
          </VfkDialog>
        `,
      }),
    )

    await flushUpdates()

    const host = wrapper.find('fluent-dialog')
    expect(host.exists()).toBe(true)
    expect(host.attributes('type')).toBe('alert')
    expect(host.attributes('aria-describedby')).toBe('dlg-desc')
    expect(host.attributes('style')).toContain('--vfk-dialog-max-width: 720px')

    const body = wrapper.find('fluent-dialog-body')
    expect(body.exists()).toBe(true)
    expect(body.find('.vfk-dialog-body__title').text()).toBe('删除确认')

    const closeButton = body.find('.vfk-dialog-body__close fluent-button')
    expect(closeButton.exists()).toBe(true)
    expect(closeButton.attributes('aria-label')).toBe('关闭对话框')
    expect(closeButton.attributes('icon-only')).toBe('')
  })

  it('v-model 受控开关驱动底层 dialog 的 show / hide', async () => {
    const open = ref(false)
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDialog, VfkDialogBody },
        setup: () => ({ open }),
        template: `<VfkDialog v-model="open"><VfkDialogBody title="受控对话框">内容</VfkDialogBody></VfkDialog>`,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-dialog').element as HTMLElement
    expect(innerDialog(host)?.open).toBe(false)

    open.value = true
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(true)

    open.value = false
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(false)
  })

  it('标题自动关联 aria-labelledby，外部 ariaLabel 优先', async () => {
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDialog, VfkDialogBody },
        template: `
          <div>
            <VfkDialog aria-label="外部名称">
              <VfkDialogBody title="内部标题">内容</VfkDialogBody>
            </VfkDialog>
            <VfkDialog>
              <VfkDialogBody title="自动关联标题">内容</VfkDialogBody>
            </VfkDialog>
          </div>
        `,
      }),
    )

    await flushUpdates()
    const hosts = wrapper.findAll('fluent-dialog')
    expect(hosts[0].attributes('aria-label')).toBe('外部名称')
    expect(hosts[0].attributes('aria-labelledby')).toBeUndefined()

    const titleEl = wrapper.findAll('.vfk-dialog-body__title')[1]
    expect(titleEl.attributes('id')).toBeTruthy()
    expect(titleEl.attributes('slot')).toBe('title')
    expect(hosts[1].attributes('aria-labelledby')).toBe(titleEl.attributes('id'))
  })

  it('非受控关闭（遮罩或 Escape）通过 toggle 事件回写 modelValue', async () => {
    const open = ref(true)
    const changes: boolean[] = []
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDialog, VfkDialogBody },
        setup: () => ({ open, onChange: (value: boolean) => changes.push(value) }),
        template: `
          <VfkDialog v-model="open" @open-change="onChange">
            <VfkDialogBody title="可关闭对话框">内容</VfkDialogBody>
          </VfkDialog>
        `,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-dialog').element as HTMLElement
    expect(innerDialog(host)?.open).toBe(true)

    // 原生 cancel（Escape）会由官方元素调用 hide，再通过 toggle 事件回写受控值
    innerDialog(host)?.dispatchEvent(new Event('cancel'))
    await flushUpdates()

    expect(open.value).toBe(false)
    expect(changes).toEqual([false])
    expect(innerDialog(host)?.open).toBe(false)
  })

  it('内置关闭按钮通过官方 close 插槽关闭对话框', async () => {
    const open = ref(true)
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDialog, VfkDialogBody },
        setup: () => ({ open }),
        template: `<VfkDialog v-model="open"><VfkDialogBody title="关闭测试">内容</VfkDialogBody></VfkDialog>`,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-dialog').element as HTMLElement
    expect(innerDialog(host)?.open).toBe(true)

    await wrapper.find('.vfk-dialog-body__close fluent-button').trigger('click')
    await flushUpdates()

    expect(innerDialog(host)?.open).toBe(false)
    expect(open.value).toBe(false)
  })

  it('暴露 show / hide 命令式方法，双向同步打开状态', async () => {
    const open = ref(false)
    const wrapper = mountAttached(
      defineComponent({
        components: { VfkDialog, VfkDialogBody },
        setup: () => ({ open }),
        template: `<VfkDialog v-model="open"><VfkDialogBody title="命令式">内容</VfkDialogBody></VfkDialog>`,
      }),
    )

    await flushUpdates()
    const host = wrapper.find('fluent-dialog').element as HTMLElement
    const dialogInstance = wrapper.findComponent(VfkDialog).vm as unknown as {
      show: () => void
      hide: () => void
    }

    dialogInstance.show()
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(true)
    expect(open.value).toBe(true)

    dialogInstance.hide()
    await flushUpdates()
    expect(innerDialog(host)?.open).toBe(false)
    expect(open.value).toBe(false)
  })
})
