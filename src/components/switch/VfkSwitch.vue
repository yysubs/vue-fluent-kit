<script setup lang="ts">
import '@fluentui/web-components/switch.js'
import { computed, nextTick, onMounted, ref, useAttrs, useId, watch, type StyleValue } from 'vue'
import type { VfkSwitchProps } from './types'

interface FluentSwitchElement extends HTMLElement {
  checked: boolean
  focus: () => void
  blur: () => void
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VfkSwitchProps>(), {
  modelValue: false,
  disabled: false,
  required: false,
  label: undefined,
  labelPosition: 'after',
  id: undefined,
  name: undefined,
  value: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean, event: Event]
}>()

defineSlots<{
  /** 标签内容 */
  default?: () => unknown
}>()

const attrs = useAttrs()
const generatedId = useId()
const el = ref<FluentSwitchElement | null>(null)

const switchId = computed(() => props.id || generatedId)
const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style as StyleValue)
const forwardedAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

/** 将底层 fluent-switch 的 checked 同步为受控 modelValue */
function syncCheckedState() {
  if (!el.value) return
  el.value.checked = Boolean(props.modelValue)
}

onMounted(syncCheckedState)
watch(() => props.modelValue, syncCheckedState, { flush: 'post' })

function handleChange(event: Event) {
  if (props.disabled) {
    syncCheckedState()
    return
  }
  const target = event.target as (HTMLElement & { checked?: boolean }) | null
  const next = Boolean(target?.checked)
  emit('update:modelValue', next)
  emit('change', next, event)
  void nextTick(syncCheckedState)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <span
    class="vfk-switch"
    :class="[
      `vfk-switch--label-${labelPosition}`,
      { 'vfk-switch--disabled': disabled },
      rootClass,
    ]"
    :style="rootStyle"
  >
    <fluent-switch
      v-bind="forwardedAttrs"
      :id="switchId"
      ref="el"
      :checked.prop="Boolean(modelValue)"
      :disabled.attr="disabled ? '' : undefined"
      :required.attr="required ? '' : undefined"
      :name.attr="name"
      :value.attr="value"
      @change="handleChange"
    />
    <label v-if="$slots.default || label" :for="switchId" class="vfk-switch__label">
      <slot>{{ label }}</slot>
      <span v-if="required" aria-hidden="true" class="vfk-switch__required">*</span>
    </label>
  </span>
</template>
