<script setup lang="ts">
import '@fluentui/web-components/tab.js'
import { computed, inject, ref, useId } from 'vue'
import { TABS_CONTEXT_KEY } from './context'
import type { VfkTabProps } from './types'

interface FluentTabElement extends HTMLElement {
  focus: () => void
  blur: () => void
}

const props = withDefaults(defineProps<VfkTabProps>(), {
  label: undefined,
  disabled: false,
  id: undefined,
})

defineSlots<{
  /** 标签主内容（优先于 label） */
  default?: () => unknown
  /** 标签前置图标区域 */
  start?: () => unknown
  /** 标签后置内容区域 */
  end?: () => unknown
}>()

const el = ref<FluentTabElement | null>(null)
const fallbackId = useId()
const tabsContext = inject(TABS_CONTEXT_KEY, null)

const tabId = computed(() => props.id || `${tabsContext?.idPrefix ?? fallbackId}-${props.value}`)
const isDisabled = computed(() => props.disabled || Boolean(tabsContext?.disabled.value))

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-tab
    ref="el"
    slot="tab"
    :id="tabId"
    :disabled.attr="isDisabled ? '' : undefined"
    :data-vfk-value="value"
  >
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline">
      <slot name="start" />
    </span>
    <slot>{{ label }}</slot>
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline">
      <slot name="end" />
    </span>
  </fluent-tab>
</template>
