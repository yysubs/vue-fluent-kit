<script setup lang="ts">
import { computed, inject } from 'vue'
import { SWATCH_PICKER_CONTEXT_KEY } from './context'
import type { VfkColorSwatchProps } from './types'

const props = withDefaults(defineProps<VfkColorSwatchProps>(), {
  color: undefined,
  borderColor: undefined,
  label: undefined,
  disabled: false,
})

defineSlots<{
  /** 色块内的图标或文字（如「无颜色」标记） */
  default?: () => unknown
}>()

const picker = inject(SWATCH_PICKER_CONTEXT_KEY, null)

const isSelected = computed(
  () => picker?.modelValue.value !== undefined && picker.modelValue.value === props.value,
)
const isDisabled = computed(() => props.disabled || !!picker?.disabled.value)
const isTabStop = computed(() => !isDisabled.value && picker?.tabStopValue.value === props.value)
const accessibleName = computed(() => props.label ?? props.value)

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }
  picker?.select(props.value, event)
}
</script>

<template>
  <button
    type="button"
    role="radio"
    class="vfk-color-swatch"
    :class="[
      `vfk-color-swatch--${picker?.size.value ?? 'medium'}`,
      `vfk-color-swatch--${picker?.shape.value ?? 'square'}`,
    ]"
    :style="{ '--vfk-swatch-color': color ?? value, '--vfk-swatch-border': borderColor }"
    :data-value="value"
    :aria-checked="isSelected ? 'true' : 'false'"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :aria-label="accessibleName"
    :title="accessibleName"
    :tabindex="isTabStop ? 0 : -1"
    @click="handleClick"
  >
    <span v-if="$slots.default" class="vfk-color-swatch__content"><slot /></span>
  </button>
</template>
