<script setup lang="ts">
import '@fluentui/web-components/textarea.js'
import { computed, nextTick, onMounted, ref, watch, type StyleValue } from 'vue'
import type { VfkTextareaProps } from './types'

interface FluentTextareaElement extends HTMLElement {
  value: string
  focus: () => void
  blur: () => void
  select: () => void
}

const props = withDefaults(defineProps<VfkTextareaProps>(), {
  modelValue: undefined,
  appearance: 'outline',
  size: 'medium',
  resize: 'none',
  autoResize: false,
  block: false,
  minHeight: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  required: false,
  name: undefined,
  maxlength: undefined,
  minlength: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string, event: Event]
  change: [value: string, event: Event]
}>()

defineSlots<{
  /** 控件标签内容（放置 <fluent-label>） */
  label?: () => unknown
}>()

const el = ref<FluentTextareaElement | null>(null)

const rootStyle = computed<StyleValue>(() =>
  props.minHeight ? { '--vfk-textarea-min-height': props.minHeight } : undefined,
)

/** 受控模式下将底层元素 value 同步回 modelValue，防止父级未更新时界面偏离受控状态 */
function syncControlledValue() {
  if (props.modelValue !== undefined && el.value && el.value.value !== props.modelValue) {
    el.value.value = props.modelValue
  }
}

onMounted(syncControlledValue)
watch(() => props.modelValue, syncControlledValue)

function readTargetValue(event: Event): string {
  const target = event.target as (HTMLElement & { value?: string }) | null
  return target?.value ?? el.value?.value ?? ''
}

function handleInput(event: Event) {
  if (props.disabled) {
    syncControlledValue()
    return
  }
  const value = readTargetValue(event)
  emit('update:modelValue', value)
  emit('input', value, event)
  void nextTick(syncControlledValue)
}

function handleChange(event: Event) {
  if (props.disabled) {
    syncControlledValue()
    return
  }
  const value = readTargetValue(event)
  emit('change', value, event)
  void nextTick(syncControlledValue)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
  select: () => el.value?.select(),
})
</script>

<template>
  <fluent-textarea
    ref="el"
    :style="rootStyle"
    :value.prop="modelValue"
    :appearance.attr="appearance"
    :size.attr="size"
    :resize.attr="resize"
    :block.attr="block ? '' : undefined"
    :auto-resize.attr="autoResize ? '' : undefined"
    :placeholder.attr="placeholder"
    :disabled.attr="disabled ? '' : undefined"
    :readonly.attr="readonly ? '' : undefined"
    :required.attr="required ? '' : undefined"
    :name.attr="name"
    :maxlength.attr="maxlength"
    :minlength.attr="minlength"
    @input="handleInput"
    @change="handleChange"
  >
    <span v-if="$slots.label" slot="label" class="vfk-textarea__label"><slot name="label" /></span>
  </fluent-textarea>
</template>
