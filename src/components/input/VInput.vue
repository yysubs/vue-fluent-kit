<script setup lang="ts">
import '@fluentui/web-components/text-input.js'
import { nextTick, onMounted, ref, watch } from 'vue'
import type { VInputProps } from './types'

interface FluentTextInputElement extends HTMLElement {
  value: string
  focus: () => void
  blur: () => void
  select?: () => void
}

const props = withDefaults(defineProps<VInputProps>(), {
  modelValue: undefined,
  appearance: 'outline',
  size: 'medium',
  type: 'text',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  required: false,
  name: undefined,
  autocomplete: undefined,
  maxlength: undefined,
  minlength: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string, event: Event]
  change: [value: string, event: Event]
}>()

defineSlots<{
  /** 内置标签内容 */
  default?: () => unknown
  /** 输入框前缀内容 */
  start?: () => unknown
  /** 输入框后缀内容 */
  end?: () => unknown
}>()

const el = ref<FluentTextInputElement | null>(null)

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
  select: () => el.value?.select?.(),
})
</script>

<template>
  <fluent-text-input
    ref="el"
    :value.prop="modelValue"
    :appearance="appearance"
    :control-size="size"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled ? '' : undefined"
    :readonly="readonly ? '' : undefined"
    :required="required ? '' : undefined"
    :name="name"
    :autocomplete="autocomplete"
    :maxlength="maxlength"
    :minlength="minlength"
    @input="handleInput"
    @change="handleChange"
  >
    <template v-if="$slots.default"><slot /></template>
    <span v-if="$slots.start" slot="start" class="vfk-slot-inline"><slot name="start" /></span>
    <span v-if="$slots.end" slot="end" class="vfk-slot-inline"><slot name="end" /></span>
  </fluent-text-input>
</template>
