<script setup lang="ts">
import '@fluentui/web-components/radio.js'
import { computed, inject, onMounted, ref, useAttrs, useId, watch, type StyleValue } from 'vue'
import { RADIO_GROUP_CONTEXT_KEY } from './context'
import type { VfkRadioProps } from './types'

interface FluentRadioElement extends HTMLElement {
  checked: boolean
  focus: () => void
  blur: () => void
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VfkRadioProps>(), {
  label: undefined,
  disabled: false,
  id: undefined,
})

defineSlots<{
  /** 选项标签内容 */
  default?: () => unknown
}>()

const attrs = useAttrs()
const generatedId = useId()
const el = ref<FluentRadioElement | null>(null)
const groupContext = inject(RADIO_GROUP_CONTEXT_KEY, null)

const radioId = computed(() => props.id || generatedId)
const isDisabled = computed(() => props.disabled || Boolean(groupContext?.disabled.value))
const isChecked = computed(
  () =>
    groupContext?.modelValue.value !== undefined && groupContext.modelValue.value === props.value,
)
const groupName = computed(() => groupContext?.name.value)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style as StyleValue)
const forwardedAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

function syncChecked() {
  if (!el.value || groupContext?.modelValue.value === undefined) return
  el.value.checked = isChecked.value
}

onMounted(syncChecked)
watch(isChecked, syncChecked, { flush: 'post' })

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <span
    class="vfk-radio"
    :class="[{ 'vfk-radio--disabled': isDisabled }, rootClass]"
    :style="rootStyle"
  >
    <fluent-radio
      v-bind="forwardedAttrs"
      :id="radioId"
      ref="el"
      :value.attr="value"
      :name.attr="groupName"
      :checked.attr="isChecked ? '' : undefined"
      :disabled.attr="isDisabled ? '' : undefined"
    />
    <label v-if="$slots.default || label" :for="radioId" class="vfk-radio__label">
      <slot>{{ label }}</slot>
    </label>
  </span>
</template>
