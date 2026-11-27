<script setup lang="ts">
import '@fluentui/web-components/field.js'
import { computed, ref, useSlots } from 'vue'
import type { VfkFieldProps } from './types'

const props = withDefaults(defineProps<VfkFieldProps>(), {
  label: undefined,
  for: undefined,
  orientation: 'vertical',
  size: 'medium',
  required: false,
  disabled: false,
  validationState: 'none',
  validationMessage: undefined,
  hint: undefined,
})

defineSlots<{
  /** 表单控件内容 */
  default?: () => unknown
  /** 自定义标签内容 */
  label?: () => unknown
  /** 自定义校验消息内容 */
  validationMessage?: () => unknown
  /** 自定义辅助提示内容 */
  hint?: () => unknown
}>()

const slots = useSlots()
const el = ref<HTMLElement | null>(null)

const labelPosition = computed(() => (props.orientation === 'horizontal' ? 'before' : 'above'))
const hasLabel = computed(() => Boolean(slots.label || props.label))
const hasValidation = computed(() => Boolean(slots.validationMessage || props.validationMessage))
const hasHint = computed(() => Boolean(slots.hint || props.hint))
const hasFooter = computed(() => hasValidation.value || hasHint.value)
const showStatusIcon = computed(() => props.validationState !== 'none')

defineExpose({
  el,
})
</script>

<template>
  <fluent-field
    ref="el"
    class="vfk-field"
    :class="[
      `vfk-field--${orientation}`,
      { 'vfk-field--disabled': disabled },
    ]"
    :label-position.attr="labelPosition"
    :size.attr="size"
  >
    <label v-if="hasLabel" slot="label" :for="props.for" class="vfk-field__label">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" aria-hidden="true" class="vfk-field__required">*</span>
    </label>

    <div slot="input" class="vfk-field__control">
      <slot />
    </div>

    <div v-if="hasFooter" slot="message" class="vfk-field__messages">
      <div
        v-if="hasValidation"
        class="vfk-field__validation"
        :class="`vfk-field__validation--${validationState}`"
        :role="validationState === 'error' ? 'alert' : undefined"
      >
        <span v-if="showStatusIcon" class="vfk-field__icon" aria-hidden="true">
          <svg
            v-if="validationState === 'error'"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path
              d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1Zm-.5 2.5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0v-3ZM6 9a.625.625 0 1 1 0-1.25A.625.625 0 0 1 6 9Z"
            />
          </svg>
          <svg
            v-else-if="validationState === 'warning'"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path
              d="M5.13 1.75a1 1 0 0 1 1.74 0l4 7A1 1 0 0 1 10 10.25H2a1 1 0 0 1-.87-1.5l4-7ZM5.5 4.25v2.5a.5.5 0 0 0 1 0v-2.5a.5.5 0 0 0-1 0ZM6 9a.625.625 0 1 0 0-1.25A.625.625 0 0 0 6 9Z"
            />
          </svg>
          <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path
              d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1Zm2.35 4.1-2.75 2.75a.5.5 0 0 1-.7 0L3.65 6.6a.5.5 0 1 1 .7-.7l.9.9 2.4-2.4a.5.5 0 1 1 .7.7Z"
            />
          </svg>
        </span>
        <span><slot name="validationMessage">{{ validationMessage }}</slot></span>
      </div>

      <div v-if="hasHint" class="vfk-field__hint">
        <slot name="hint">{{ hint }}</slot>
      </div>
    </div>
  </fluent-field>
</template>
