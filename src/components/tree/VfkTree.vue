<script setup lang="ts">
import '@fluentui/web-components/tree.js'
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue'
import { TREE_CONTEXT_KEY } from './context'
import type { TreeToggleDetail, VfkTreeProps } from './types'

interface FluentTreeItemElement extends HTMLElement {
  expanded: boolean
  selected: boolean
}

interface FluentTreeElement extends HTMLElement {
  currentSelected: FluentTreeItemElement | null
  focus: () => void
  blur: () => void
}

const props = withDefaults(defineProps<VfkTreeProps>(), {
  modelValue: undefined,
  appearance: 'subtle',
  size: 'medium',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, event: Event]
  toggle: [detail: TreeToggleDetail, event: Event]
}>()

defineSlots<{
  /** 顶层树节点（放置 VfkTreeItem） */
  default?: () => unknown
}>()

const el = ref<FluentTreeElement | null>(null)

/** 将底层各 fluent-tree-item 的 selected 与受控 modelValue 保持一致 */
function syncSelectedState(expandAncestors = false) {
  if (props.modelValue === undefined || !el.value) return
  const items = Array.from(el.value.querySelectorAll('fluent-tree-item')) as FluentTreeItemElement[]
  let matched: FluentTreeItemElement | null = null

  for (const item of items) {
    const isMatched =
      item.dataset.vfkSelectable !== 'false' && item.dataset.vfkValue === props.modelValue
    if (isMatched) {
      matched = item
    }
    if (item.selected !== isMatched) {
      item.selected = isMatched
    }
  }

  if (matched && expandAncestors) {
    let parent = matched.parentElement
    while (parent && parent.tagName.toLowerCase() === 'fluent-tree-item') {
      const parentItem = parent as FluentTreeItemElement
      if (!parentItem.expanded) {
        parentItem.expanded = true
      }
      parent = parent.parentElement
    }
  }

  el.value.currentSelected = matched
}

function selectValue(value: string, event: Event) {
  if (props.modelValue !== undefined && props.modelValue === value) return
  emit('update:modelValue', value)
  emit('change', value, event)
  void nextTick(() => syncSelectedState(false))
}

function notifyToggle(value: string | undefined, expanded: boolean, event: Event) {
  emit('toggle', { value, expanded }, event)
  if (expanded && props.modelValue !== undefined) {
    void nextTick(() => {
      syncSelectedState(false)
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => syncSelectedState(false))
      }
    })
  }
}

provide(TREE_CONTEXT_KEY, {
  modelValue: computed(() => props.modelValue),
  appearance: computed(() => props.appearance),
  size: computed(() => props.size),
  selectValue,
  notifyToggle,
})

onMounted(() => syncSelectedState(true))
watch(() => props.modelValue, () => syncSelectedState(true), { flush: 'post' })

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-tree
    ref="el"
    :appearance.attr="appearance"
    :size.attr="size"
  >
    <slot />
  </fluent-tree>
</template>
