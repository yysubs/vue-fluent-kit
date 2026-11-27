<script setup lang="ts">
import '@fluentui/web-components/checkbox.js'
import { computed, nextTick, onMounted, ref, useAttrs, useId, watch, type StyleValue } from 'vue'
import type { VfkCheckboxProps } from './types'

interface FluentCheckboxElement extends HTMLElement {
  checked: boolean
  indeterminate?: boolean
  focus: () => void
  blur: () => void
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VfkCheckboxProps>(), {
  modelValue: false,
  shape: 'square',
  size: 'medium',
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
  /** 自定义选中图标 */
  checkedIndicator?: () => unknown
  /** 自定义半选图标 */
  indeterminateIndicator?: () => unknown
}>()

const attrs = useAttrs()
const generatedId = useId()
const el = ref<FluentCheckboxElement | null>(null)

const checkboxId = computed(() => props.id || generatedId)
const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style as StyleValue)
const forwardedAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

/** 将底层 fluent-checkbox 的 checked 与 indeterminate 同步为受控 modelValue */
function syncCheckedState() {
  if (!el.value) return
  el.value.checked = props.modelValue === true
  el.value.indeterminate = props.modelValue === 'mixed'
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
    class="vfk-checkbox"
    :class="[
      `vfk-checkbox--label-${labelPosition}`,
      { 'vfk-checkbox--disabled': disabled },
      rootClass,
    ]"
    :style="rootStyle"
  >
    <fluent-checkbox
      v-bind="forwardedAttrs"
      :id="checkboxId"
      ref="el"
      :checked.prop="modelValue === true"
      :indeterminate.prop="modelValue === 'mixed'"
      :shape="shape"
      :size="size"
      :disabled="disabled ? '' : undefined"
      :required="required ? '' : undefined"
      :name="name"
      :value="value"
      @change="handleChange"
    >
      <slot v-if="$slots.checkedIndicator" name="checkedIndicator" slot="checked-indicator" />
      <slot
        v-if="$slots.indeterminateIndicator"
        name="indeterminateIndicator"
        slot="indeterminate-indicator"
      />
    </fluent-checkbox>
    <label v-if="$slots.default || label" :for="checkboxId" class="vfk-checkbox__label">
      <slot>{{ label }}</slot>
      <span v-if="required" aria-hidden="true" class="vfk-checkbox__required">*</span>
    </label>
  </span>
</template>
