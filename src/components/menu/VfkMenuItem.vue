<script setup lang="ts">
import '@fluentui/web-components/menu-item.js'
import { inject, onMounted, ref, watch } from 'vue'
import { MENU_LIST_CONTEXT_KEY } from './context'
import type { VfkMenuItemProps } from './types'

interface FluentMenuItemElement extends HTMLElement {
  checked: boolean
  disabled: boolean
  focus: () => void
  blur: () => void
}

const props = withDefaults(defineProps<VfkMenuItemProps>(), {
  value: undefined,
  label: undefined,
  role: 'menuitem',
  checked: undefined,
  disabled: false,
})

const emit = defineEmits<{
  select: [value: string | undefined, event: Event]
  'update:checked': [checked: boolean]
  change: [checked: boolean, event: Event]
}>()

defineSlots<{
  /** 菜单项主内容（也可直接嵌套子级 VfkMenuList） */
  default?: () => unknown
  /** 显式放置子级 VfkMenuList */
  submenu?: () => unknown
  /** 前置图标区域 */
  start?: () => unknown
  /** 后置辅助信息（如快捷键） */
  end?: () => unknown
  /** 自定义复选/单选勾选图标 */
  indicator?: () => unknown
  /** 自定义子菜单展开箭头 */
  'submenu-glyph'?: () => unknown
}>()

const el = ref<FluentMenuItemElement | null>(null)
const listContext = inject(MENU_LIST_CONTEXT_KEY, null)
const internalChecked = ref(Boolean(props.checked))
let isSyncing = false

function syncChecked(next: boolean) {
  internalChecked.value = next
  if (!el.value || el.value.checked === next) return
  isSyncing = true
  el.value.checked = next
  isSyncing = false
}

onMounted(() => {
  if (props.checked !== undefined) {
    syncChecked(props.checked)
  }
})

watch(
  () => props.checked,
  (next) => {
    if (next !== undefined) {
      syncChecked(next)
    }
  },
  { flush: 'post' },
)

function handleChange(event: Event) {
  if (event.target !== el.value || isSyncing || props.disabled) return
  if (props.role === 'menuitem') {
    emit('select', props.value, event)
    listContext?.notifySelect(props.value, event)
    return
  }

  const nextChecked = Boolean(el.value?.checked)
  if (nextChecked !== internalChecked.value) {
    internalChecked.value = nextChecked
    emit('update:checked', nextChecked)
    emit('change', nextChecked, event)
  }
  if (props.role === 'menuitemcheckbox' || nextChecked) {
    emit('select', props.value, event)
    listContext?.notifySelect(props.value, event)
  }
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-menu-item
    ref="el"
    :role.attr="role"
    :checked.attr="role !== 'menuitem' && internalChecked ? '' : undefined"
    :disabled.attr="disabled ? '' : undefined"
    :data-vfk-value="value"
    @change="handleChange"
  >
    <span v-if="$slots.indicator" slot="indicator" class="vfk-slot-inline">
      <slot name="indicator" />
    </span>
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline">
      <slot name="start" />
    </span>
    <template v-if="label">{{ label }}</template>
    <slot />
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline">
      <slot name="end" />
    </span>
    <span v-if="$slots['submenu-glyph']" slot="submenu-glyph" class="vfk-slot-inline">
      <slot name="submenu-glyph" />
    </span>
    <slot name="submenu" />
  </fluent-menu-item>
</template>
