<script setup lang="ts">
import '@fluentui/web-components/tree-item.js'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { TREE_CONTEXT_KEY } from './context'
import type { VfkTreeItemProps } from './types'

interface FluentTreeItemElement extends HTMLElement {
  expanded: boolean
  selected: boolean
  toggleExpansion: () => void
  focus: () => void
  blur: () => void
}

const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, fluent-button, fluent-toggle-button, fluent-checkbox, fluent-switch, fluent-radio, [role="button"]'

const props = withDefaults(defineProps<VfkTreeItemProps>(), {
  value: undefined,
  label: undefined,
  expanded: undefined,
  selected: undefined,
  selectable: true,
  appearance: undefined,
  size: undefined,
})

const emit = defineEmits<{
  'update:expanded': [expanded: boolean]
  'update:selected': [selected: boolean]
  toggle: [expanded: boolean, event: Event]
  select: [selected: boolean, event: Event]
}>()

defineSlots<{
  /** 节点主内容，也可直接嵌套子级 VfkTreeItem */
  default?: () => unknown
  /** 显式放置子级 VfkTreeItem（与默认插槽嵌套等效） */
  items?: () => unknown
  /** 标签前置内容（如图标） */
  start?: () => unknown
  /** 紧贴标签后的内容（如徽标） */
  end?: () => unknown
  /** 行尾右对齐区域（如计数或操作按钮） */
  aside?: () => unknown
  /** 自定义展开/收起箭头 */
  chevron?: () => unknown
}>()

const el = ref<FluentTreeItemElement | null>(null)
const treeContext = inject(TREE_CONTEXT_KEY, null)

const effectiveAppearance = computed(() => props.appearance ?? treeContext?.appearance.value)
const effectiveSize = computed(() => props.size ?? treeContext?.size.value)

const internalExpanded = ref(Boolean(props.expanded))
const internalSelected = ref(Boolean(props.selected))
let isSyncing = false

const isControlledByTree = computed(
  () => treeContext !== null && treeContext.modelValue.value !== undefined,
)

const isSelected = computed(() => {
  if (!props.selectable) return false
  if (isControlledByTree.value) {
    return props.value !== undefined && treeContext!.modelValue.value === props.value
  }
  if (props.selected !== undefined) {
    return props.selected
  }
  return internalSelected.value
})

function syncExpanded(next: boolean) {
  internalExpanded.value = next
  if (!el.value || el.value.expanded === next) return
  isSyncing = true
  el.value.expanded = next
  isSyncing = false
}

function syncSelected(next: boolean) {
  internalSelected.value = next
  if (!el.value || el.value.selected === next) return
  isSyncing = true
  el.value.selected = next
  isSyncing = false
}

onMounted(() => {
  if (props.expanded !== undefined) {
    syncExpanded(props.expanded)
  }
  syncSelected(isSelected.value)
})

watch(
  () => props.expanded,
  (next) => {
    if (next !== undefined) {
      syncExpanded(next)
    }
  },
  { flush: 'post' },
)

watch(
  isSelected,
  (next) => {
    syncSelected(next)
  },
  { flush: 'post' },
)

function handleToggle(event: Event) {
  if (event.target !== el.value || isSyncing) return
  const nextExpanded = Boolean(el.value?.expanded)
  if (nextExpanded === internalExpanded.value) return
  internalExpanded.value = nextExpanded
  emit('update:expanded', nextExpanded)
  emit('toggle', nextExpanded, event)
  treeContext?.notifyToggle(props.value, nextExpanded, event)
}

function handleChange(event: Event) {
  if (event.target !== el.value || isSyncing) return
  const nextSelected = Boolean(el.value?.selected)
  if (!props.selectable) {
    if (nextSelected && el.value) {
      syncSelected(false)
    }
    return
  }
  if (nextSelected !== internalSelected.value) {
    internalSelected.value = nextSelected
    emit('update:selected', nextSelected)
    emit('select', nextSelected, event)
  }
  if (nextSelected && props.value !== undefined) {
    treeContext?.selectValue(props.value, event)
  }
}

function isInteractiveTarget(target: Element | null): boolean {
  if (!target || !el.value) return false
  const interactive = target.closest(INTERACTIVE_SELECTOR)
  return Boolean(interactive && el.value.contains(interactive))
}

function handleClick(event: MouseEvent) {
  if (!el.value) return
  const target = event.target as Element | null
  const closestItem = target?.closest?.('fluent-tree-item')
  if (closestItem !== el.value) return
  if (isInteractiveTarget(target)) return

  if (!props.selectable) {
    event.preventDefault()
    el.value.toggleExpansion()
    return
  }

  // 官方 fluent-tree 仅处理 e.target === fluent-tree-item 的点击，补齐 Light DOM 图标/文案子节点点击
  if (event.target !== el.value) {
    el.value.toggleExpansion()
    if (!el.value.selected) {
      el.value.selected = true
    } else if (props.value !== undefined) {
      treeContext?.selectValue(props.value, event)
    }
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (!el.value || event.target !== el.value) return
  if (!props.selectable && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    el.value.toggleExpansion()
  }
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
  toggleExpansion: () => el.value?.toggleExpansion(),
})
</script>

<template>
  <fluent-tree-item
    ref="el"
    :appearance.attr="effectiveAppearance"
    :size.attr="effectiveSize"
    :expanded.attr="internalExpanded ? '' : undefined"
    :selected.attr="isSelected ? '' : undefined"
    :data-vfk-value="value"
    :data-vfk-selectable="selectable ? undefined : 'false'"
    @toggle="handleToggle"
    @change="handleChange"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span v-if="$slots.chevron" slot="chevron" class="vfk-slot-inline">
      <slot name="chevron" />
    </span>
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline">
      <slot name="start" />
    </span>
    <template v-if="label">{{ label }}</template>
    <slot />
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline">
      <slot name="end" />
    </span>
    <span v-if="$slots.aside" slot="aside" class="vfk-slot-inline">
      <slot name="aside" />
    </span>
    <slot name="items" />
  </fluent-tree-item>
</template>
