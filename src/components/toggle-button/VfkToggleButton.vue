<script setup lang="ts">
import '@fluentui/web-components/toggle-button.js'
import { computed, nextTick, onMounted, ref, useSlots, watch } from 'vue'
import type { VfkToggleButtonProps } from './types'

interface FluentToggleButtonElement extends HTMLElement {
  pressed: boolean
  mixed?: boolean
  focus: () => void
  blur: () => void
}

const props = withDefaults(defineProps<VfkToggleButtonProps>(), {
  modelValue: false,
  appearance: 'secondary',
  shape: 'rounded',
  size: 'medium',
  type: 'button',
  disabled: false,
  disabledFocusable: false,
  iconOnly: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean, event: MouseEvent]
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
const el = ref<FluentToggleButtonElement | null>(null)

/** 官方 fluent-toggle-button 默认即为 secondary，未传 appearance 属性时呈现次级按钮样式 */
const nativeAppearance = computed(() =>
  props.appearance === 'secondary' ? undefined : props.appearance,
)

const isIconOnly = computed(() => {
  if (props.iconOnly !== undefined) return props.iconOnly
  return !slots.default && (Boolean(slots.start) || Boolean(slots.end))
})

/** 将底层 fluent-toggle-button 的 pressed 与 mixed 同步为受控 modelValue */
function syncPressedState() {
  if (!el.value) return
  el.value.pressed = props.modelValue === true
  el.value.mixed = props.modelValue === 'mixed'
}

onMounted(syncPressedState)
watch(() => props.modelValue, syncPressedState, { flush: 'post' })

function handleClick(event: MouseEvent) {
  if (props.disabled || props.disabledFocusable) {
    event.preventDefault()
    event.stopPropagation()
    syncPressedState()
    return
  }
  const next = props.modelValue !== true
  emit('update:modelValue', next)
  emit('change', next, event)
  emit('click', event)
  void nextTick(syncPressedState)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-toggle-button
    ref="el"
    :appearance="nativeAppearance"
    :shape="shape"
    :size="size"
    :type.attr="type"
    :pressed.attr="modelValue === true ? '' : undefined"
    :mixed.attr="modelValue === 'mixed' ? '' : undefined"
    :disabled.attr="disabled ? '' : undefined"
    :disabled-focusable.attr="disabledFocusable ? '' : undefined"
    :icon-only.attr="isIconOnly ? '' : undefined"
    @click="handleClick"
  >
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline"><slot name="start" /></span>
    <slot />
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline"><slot name="end" /></span>
  </fluent-toggle-button>
</template>
