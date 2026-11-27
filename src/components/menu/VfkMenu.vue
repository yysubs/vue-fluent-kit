<script setup lang="ts">
import '@fluentui/web-components/menu.js'
import {
  cloneVNode,
  computed,
  defineComponent,
  Fragment,
  h,
  provide,
  ref,
  type StyleValue,
  type VNode,
} from 'vue'
import { MENU_CONTEXT_KEY } from './context'
import type { VfkMenuProps } from './types'

interface FluentMenuElement extends HTMLElement {
  openMenu: (event?: Event) => void
  closeMenu: (event?: Event) => void
  toggleMenu: () => void
  focusTrigger: () => void
  focusMenuList: () => void
}

function assignSlotToVNodes(vnodes: VNode[], slotName: string): VNode[] {
  return vnodes.map((vnode) => {
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      return h(Fragment, null, assignSlotToVNodes(vnode.children as VNode[], slotName))
    }
    if (typeof vnode.type === 'symbol') {
      return vnode
    }
    return cloneVNode(vnode, { slot: slotName })
  })
}

/** 将原生 slot 属性直接附加到插槽子节点上，避免包裹额外元素破坏 anchor 定位与焦点 */
const SlotAssigner = defineComponent({
  name: 'VfkMenuSlotAssigner',
  props: {
    slotName: { type: String, required: true },
  },
  setup(slotProps, { slots }) {
    return () => assignSlotToVNodes(slots.default?.() ?? [], slotProps.slotName)
  },
})

const props = withDefaults(defineProps<VfkMenuProps>(), {
  openOnHover: false,
  openOnContext: false,
  closeOnScroll: false,
  persistOnItemClick: false,
  split: false,
  maxHeight: undefined,
})

const emit = defineEmits<{
  'open-change': [open: boolean, event: Event]
}>()

defineSlots<{
  /** 拆分模式主操作按钮 */
  'primary-action'?: () => unknown
  /** 触发菜单的按钮或元素 */
  trigger?: () => unknown
  /** 菜单列表（放置 VfkMenuList） */
  default?: () => unknown
}>()

const el = ref<FluentMenuElement | null>(null)

const menuStyle = computed<StyleValue>(() =>
  props.maxHeight ? { '--menu-max-height': props.maxHeight } : undefined,
)

provide(MENU_CONTEXT_KEY, {
  notifyOpenChange: (open, event) => emit('open-change', open, event),
})

defineExpose({
  el,
  openMenu: (event?: Event) => el.value?.openMenu(event),
  closeMenu: (event?: Event) => el.value?.closeMenu(event),
  toggleMenu: () => el.value?.toggleMenu(),
  focusTrigger: () => el.value?.focusTrigger(),
  focusMenuList: () => el.value?.focusMenuList(),
})
</script>

<template>
  <fluent-menu
    ref="el"
    :style="menuStyle"
    :open-on-hover.attr="openOnHover ? '' : undefined"
    :open-on-context.attr="openOnContext ? '' : undefined"
    :close-on-scroll.attr="closeOnScroll ? '' : undefined"
    :persist-on-item-click.attr="persistOnItemClick ? '' : undefined"
    :split.attr="split ? '' : undefined"
  >
    <SlotAssigner v-if="$slots['primary-action']" slot-name="primary-action">
      <slot name="primary-action" />
    </SlotAssigner>
    <SlotAssigner v-if="$slots.trigger" slot-name="trigger">
      <slot name="trigger" />
    </SlotAssigner>
    <slot />
  </fluent-menu>
</template>
