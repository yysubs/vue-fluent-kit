<script setup lang="ts">
import { computed } from 'vue'
import Button from './Button.vue'

type Appearance = 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'
type Shape = 'rounded' | 'circular' | 'square'
type Size = 'small' | 'medium' | 'large'
type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    appearance?: Appearance
    shape?: Shape
    size?: Size
    disabled?: boolean
    disabledFocusable?: boolean
    type?: ButtonType
    modelValue?: boolean
  }>(),
  {
    appearance: 'secondary',
    shape: 'rounded',
    size: 'medium',
    disabled: false,
    disabledFocusable: false,
    type: 'button',
    modelValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  click: [event: MouseEvent]
}>()

const forwardedProps = computed(() => ({
  appearance: props.appearance,
  shape: props.shape,
  size: props.size,
  disabled: props.disabled,
  disabledFocusable: props.disabledFocusable,
  type: props.type,
}))

function handleClick(event: MouseEvent) {
  if (props.disabled || props.disabledFocusable) return
  emit('click', event)
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <Button
    v-bind="forwardedProps"
    class="vfk-toggle-button"
    :aria-pressed="modelValue"
    @click="handleClick"
  >
    <template v-if="$slots.icon" #icon><slot name="icon" /></template>
    <slot />
  </Button>
</template>

<style>
.vfk-toggle-button[aria-pressed='true'].vfk-button--secondary {
  background: var(--colorNeutralBackground1Selected);
}

.vfk-toggle-button[aria-pressed='true'].vfk-button--primary {
  background: var(--colorBrandBackgroundSelected);
}
</style>
