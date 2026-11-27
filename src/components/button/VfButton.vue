<script setup lang="ts">
import '@fluentui/web-components/button.js'
import { computed, ref, useSlots } from 'vue'
import type { VfButtonProps } from './types'

const props = withDefaults(defineProps<VfButtonProps>(), {
  appearance: 'secondary',
  shape: 'rounded',
  size: 'medium',
  type: 'button',
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
  /** 前置图标或装饰内容 */
  start?: () => unknown
  /** 后置图标或装饰内容 */
  end?: () => unknown
}>()

const slots = useSlots()
const el = ref<HTMLElement | null>(null)

/** 官方 fluent-button 默认即为 secondary，未传 appearance 属性时呈现次级按钮样式 */
const nativeAppearance = computed(() =>
  props.appearance === 'secondary' ? undefined : props.appearance,
)

const isIconOnly = computed(() => {
  if (props.iconOnly !== undefined) return props.iconOnly
  return !slots.default && (Boolean(slots.start) || Boolean(slots.end))
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
  <fluent-button
    ref="el"
    :appearance="nativeAppearance"
    :shape="shape"
    :size="size"
    :type="type"
    :disabled="disabled ? '' : undefined"
    :disabled-focusable="disabledFocusable ? '' : undefined"
    :icon-only="isIconOnly ? '' : undefined"
    @click="handleClick"
  >
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline"><slot name="start" /></span>
    <slot />
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline"><slot name="end" /></span>
  </fluent-button>
</template>
