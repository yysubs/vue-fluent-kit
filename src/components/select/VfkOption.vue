<script setup lang="ts">
import '@fluentui/web-components/option.js'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { SELECT_CONTEXT_KEY } from './context'
import type { VfkOptionProps } from './types'

interface FluentOptionElement extends HTMLElement {
  selected: boolean
}

const props = withDefaults(defineProps<VfkOptionProps>(), {
  disabled: false,
  text: undefined,
})

defineSlots<{
  /** 选项主文案 */
  default?: () => unknown
  /** 选项前置图标或装饰内容 */
  start?: () => unknown
  /** 选项辅助描述文字 */
  description?: () => unknown
  /** 自定义选中勾选图标 */
  checkedIndicator?: () => unknown
}>()

const el = ref<FluentOptionElement | null>(null)
const selectContext = inject(SELECT_CONTEXT_KEY, null)

const isSelected = computed(
  () =>
    selectContext?.modelValue.value !== undefined &&
    selectContext.modelValue.value === props.value,
)

function syncSelected() {
  if (!el.value || selectContext?.modelValue.value === undefined) return
  el.value.selected = isSelected.value
}

onMounted(syncSelected)
watch(isSelected, syncSelected, { flush: 'post' })

defineExpose({
  el,
})
</script>

<template>
  <fluent-option
    ref="el"
    :value.attr="value"
    :text.attr="text"
    :disabled.attr="disabled ? '' : undefined"
    :selected.attr="isSelected ? '' : undefined"
  >
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline"><slot name="start" /></span>
    <slot />
    <span v-if="$slots.description" slot="description"><slot name="description" /></span>
    <span v-if="$slots.checkedIndicator" slot="checked-indicator" class="vfk-slot-inline">
      <slot name="checkedIndicator" />
    </span>
  </fluent-option>
</template>
