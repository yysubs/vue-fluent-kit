<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import VfkInput from '../input/VfkInput.vue'
import type { VfkSearchBoxProps } from './types'

interface VfkInputExpose {
  el: (HTMLElement & { value: string }) | null
  focus: () => void
  blur: () => void
  select: () => void
}

const props = withDefaults(defineProps<VfkSearchBoxProps>(), {
  modelValue: undefined,
  appearance: 'outline',
  size: 'medium',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  required: false,
  name: undefined,
  autocomplete: undefined,
  maxlength: undefined,
  minlength: undefined,
  dismissLabel: 'Clear',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string, event: Event]
  change: [value: string, event: Event]
  clear: [event: Event]
  search: [value: string, event: KeyboardEvent]
}>()

defineSlots<{
  /** 内置标签内容 */
  default?: () => unknown
  /** 自定义前置搜索图标 */
  start?: () => unknown
  /** 自定义清除按钮图标 */
  dismiss?: () => unknown
  /** 清除按钮之后的附加后缀内容 */
  end?: () => unknown
}>()

const inputRef = ref<VfkInputExpose | null>(null)
const internalValue = ref(props.modelValue ?? '')
const isFocused = ref(false)

watch(
  () => props.modelValue,
  (next) => {
    if (next !== undefined) {
      internalValue.value = next
    }
  },
)

const currentValue = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
)

const hasValue = computed(() => currentValue.value.length > 0)
const showDismiss = computed(
  () => !props.disabled && !props.readonly && (isFocused.value || hasValue.value),
)

const iconSize = computed(() => {
  if (props.size === 'small') return 14
  if (props.size === 'large') return 18
  return 16
})

const dismissIconSize = computed(() => {
  if (props.size === 'small') return 12
  if (props.size === 'large') return 16
  return 14
})

const el = computed(() => inputRef.value?.el ?? null)

function handleUpdateModelValue(value: string) {
  internalValue.value = value
  emit('update:modelValue', value)
}

function handleInput(value: string, event: Event) {
  internalValue.value = value
  emit('input', value, event)
}

function handleChange(value: string, event: Event) {
  internalValue.value = value
  emit('change', value, event)
}

function handleFocusIn() {
  if (props.disabled) return
  isFocused.value = true
}

function handleFocusOut(event: FocusEvent) {
  const host = inputRef.value?.el
  const nextTarget = event.relatedTarget as Node | null
  if (host && nextTarget && host.contains(nextTarget)) {
    return
  }
  isFocused.value = false
}

/** 清空当前搜索文本并把焦点归还给输入框 */
function clear(event?: Event) {
  if (props.disabled || props.readonly) return
  const clearEvent = event ?? new Event('clear')
  internalValue.value = ''
  if (props.modelValue === undefined && inputRef.value?.el) {
    inputRef.value.el.value = ''
  }
  emit('update:modelValue', '')
  emit('input', '', clearEvent)
  emit('change', '', clearEvent)
  emit('clear', clearEvent)
  void nextTick(() => {
    inputRef.value?.focus()
  })
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  if (event.key === 'Escape' && !props.readonly && hasValue.value) {
    event.preventDefault()
    clear(event)
    return
  }
  if (event.key === 'Enter' && !event.isComposing) {
    emit('search', currentValue.value, event)
  }
}

defineExpose({
  el,
  inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  clear: () => clear(),
})
</script>

<template>
  <VfkInput
    ref="inputRef"
    class="vfk-search-box"
    :class="`vfk-search-box--${size}`"
    :model-value="modelValue"
    :appearance="appearance"
    :size="size"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :name="name"
    :autocomplete="autocomplete"
    :maxlength="maxlength"
    :minlength="minlength"
    @update:model-value="handleUpdateModelValue"
    @input="handleInput"
    @change="handleChange"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @keydown="handleKeydown"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <template #start>
      <slot name="start">
        <span class="vfk-search-box__icon" aria-hidden="true">
          <svg
            :width="iconSize"
            :height="iconSize"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8.75" cy="8.75" r="5" stroke="currentColor" stroke-width="1.5" />
            <path d="m12.5 12.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </span>
      </slot>
    </template>

    <template v-if="showDismiss || $slots.end" #end>
      <span class="vfk-search-box__end">
        <button
          v-if="showDismiss"
          type="button"
          class="vfk-search-box__dismiss"
          :aria-label="dismissLabel"
          @mousedown.prevent
          @click="clear($event)"
        >
          <slot name="dismiss">
            <svg
              aria-hidden="true"
              :width="dismissIconSize"
              :height="dismissIconSize"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m5.25 5.25 9.5 9.5M14.75 5.25l-9.5 9.5"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </slot>
        </button>
        <slot name="end" />
      </span>
    </template>
  </VfkInput>
</template>
