<script setup lang="ts">
import '@fluentui/web-components/menu-button.js'
import { computed, ref, useSlots } from 'vue'
import type { VfkMenuButtonProps } from './types'

const props = withDefaults(defineProps<VfkMenuButtonProps>(), {
  appearance: 'secondary',
  shape: 'rounded',
  size: 'medium',
  disabled: false,
  disabledFocusable: false,
  iconOnly: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

defineSlots<{
  /** 按钮正文内容 */
  default?: () => unknown
  /** 前置图标 */
  start?: () => unknown
  /** 后置图标（未传时保留官方默认下拉箭头） */
  end?: () => unknown
}>()

const slots = useSlots()
const el = ref<HTMLElement | null>(null)

const nativeAppearance = computed(() =>
  props.appearance === 'secondary' ? undefined : props.appearance,
)

const isIconOnly = computed(() => {
  if (props.iconOnly !== undefined) return props.iconOnly
  return !slots.default
})

function handleClick(event: MouseEvent) {
  if (props.disabled || props.disabledFocusable) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-menu-button
    ref="el"
    :appearance.attr="nativeAppearance"
    :shape.attr="shape"
    :size.attr="size"
    :disabled.attr="disabled ? '' : undefined"
    :disabled-focusable.attr="disabledFocusable ? '' : undefined"
    :icon-only.attr="isIconOnly ? '' : undefined"
    @click="handleClick"
  >
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline">
      <slot name="start" />
    </span>
    <slot />
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline">
      <slot name="end" />
    </span>
  </fluent-menu-button>
</template>
