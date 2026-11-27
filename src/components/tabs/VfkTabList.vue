<script setup lang="ts">
import '@fluentui/web-components/tablist.js'
import { computed, nextTick, onMounted, provide, ref, useId, watch } from 'vue'
import { TABS_CONTEXT_KEY } from './context'
import type { VfkTabListProps } from './types'

interface FluentTabElement extends HTMLElement {
  disabled: boolean
}

interface FluentTablistElement extends HTMLElement {
  activeid: string
  activetab?: FluentTabElement
  focus: () => void
  blur: () => void
}

const props = withDefaults(defineProps<VfkTabListProps>(), {
  modelValue: undefined,
  appearance: 'transparent',
  orientation: 'horizontal',
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, event: Event]
}>()

defineSlots<{
  /** 标签项列表（放置 VfkTab） */
  default?: () => unknown
}>()

const el = ref<FluentTablistElement | null>(null)
const idPrefix = useId()
let isSyncing = false

provide(TABS_CONTEXT_KEY, {
  idPrefix,
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
})

/** 将受控 modelValue 同步到底层 fluent-tablist 的 activeid */
function syncActiveTab() {
  if (props.modelValue === undefined || !el.value) return
  const tabs = Array.from(el.value.querySelectorAll('fluent-tab')) as FluentTabElement[]
  const matched = tabs.find((tab) => tab.dataset.vfkValue === props.modelValue)
  if (!matched || !matched.id) return
  if (el.value.activeid !== matched.id) {
    isSyncing = true
    el.value.activeid = matched.id
    isSyncing = false
  }
}

onMounted(() => {
  syncActiveTab()
  void nextTick(syncActiveTab)
})

watch(() => props.modelValue, syncActiveTab, { flush: 'post' })

function handleChange(event: Event) {
  if (isSyncing || props.disabled) return
  const activeTab =
    el.value?.activetab ?? ((event as CustomEvent).detail as FluentTabElement | undefined)
  const nextValue = activeTab?.dataset?.vfkValue
  if (!nextValue) return
  if (props.modelValue !== undefined && nextValue === props.modelValue) return
  emit('update:modelValue', nextValue)
  emit('change', nextValue, event)
  void nextTick(syncActiveTab)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-tablist
    ref="el"
    :appearance.attr="appearance"
    :orientation.attr="orientation"
    :size.attr="size"
    :disabled.attr="disabled ? '' : undefined"
    @change="handleChange"
  >
    <slot />
  </fluent-tablist>
</template>
