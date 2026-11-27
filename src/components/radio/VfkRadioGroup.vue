<script setup lang="ts">
import '@fluentui/web-components/radio-group.js'
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue'
import { RADIO_GROUP_CONTEXT_KEY } from './context'
import type { VfkRadioGroupProps } from './types'

interface FluentRadioElement extends HTMLElement {
  value: string
  checked: boolean
  disabled?: boolean
}

interface FluentRadioGroupElement extends HTMLElement {
  value: string | null
  focus: () => void
  blur: () => void
}

const props = withDefaults(defineProps<VfkRadioGroupProps>(), {
  modelValue: undefined,
  orientation: 'vertical',
  disabled: false,
  required: false,
  name: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, event: Event]
}>()

defineSlots<{
  /** 单选项列表（放置 VfkRadio） */
  default?: () => unknown
}>()

const el = ref<FluentRadioGroupElement | null>(null)

provide(RADIO_GROUP_CONTEXT_KEY, {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  name: computed(() => props.name),
})

/** 将底层各 fluent-radio 的 checked 状态与受控 modelValue 保持一致 */
function syncCheckedValue() {
  if (props.modelValue === undefined || !el.value) return
  const radios = Array.from(el.value.querySelectorAll('fluent-radio')) as FluentRadioElement[]
  for (const radio of radios) {
    radio.checked = radio.value === props.modelValue
  }
}

onMounted(syncCheckedValue)
watch(() => props.modelValue, syncCheckedValue, { flush: 'post' })

function handleChange(event: Event) {
  if (props.disabled) {
    syncCheckedValue()
    return
  }
  const target = event.target as (HTMLElement & { value?: string }) | null
  const next = target?.value ?? el.value?.value ?? ''
  emit('update:modelValue', next)
  emit('change', next, event)
  void nextTick(syncCheckedValue)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-radio-group
    ref="el"
    :orientation.attr="orientation"
    :disabled.attr="disabled ? '' : undefined"
    :required.attr="required ? '' : undefined"
    :name.attr="name"
    :value.attr="modelValue"
    @change="handleChange"
  >
    <slot />
  </fluent-radio-group>
</template>
