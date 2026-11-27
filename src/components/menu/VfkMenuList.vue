<script setup lang="ts">
import '@fluentui/web-components/menu-list.js'
import { inject, provide, ref } from 'vue'
import { MENU_CONTEXT_KEY, MENU_LIST_CONTEXT_KEY } from './context'

interface FluentMenuListElement extends HTMLElement {
  focus: () => void
  blur: () => void
}

const emit = defineEmits<{
  select: [value: string | undefined, event: Event]
  toggle: [open: boolean, event: Event]
}>()

defineSlots<{
  /** 菜单项与分隔线列表 */
  default?: () => unknown
}>()

const el = ref<FluentMenuListElement | null>(null)
const menuContext = inject(MENU_CONTEXT_KEY, null)
const parentListContext = inject(MENU_LIST_CONTEXT_KEY, null)

provide(MENU_LIST_CONTEXT_KEY, {
  notifySelect: (value, event) => {
    emit('select', value, event)
    parentListContext?.notifySelect(value, event)
  },
})

function handleToggle(event: Event) {
  if (event.target !== el.value) return
  const toggleEvent = event as Event & { newState?: string }
  if (!toggleEvent.newState) return
  const open = toggleEvent.newState === 'open'
  emit('toggle', open, event)
  menuContext?.notifyOpenChange(open, event)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-menu-list ref="el" @toggle="handleToggle">
    <slot />
  </fluent-menu-list>
</template>
