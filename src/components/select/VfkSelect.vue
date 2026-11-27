<script setup lang="ts">
import '@fluentui/web-components/dropdown.js'
import '@fluentui/web-components/listbox.js'
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue'
import { SELECT_CONTEXT_KEY } from './context'
import type { VfkSelectProps } from './types'

interface FluentOptionElement extends HTMLElement {
  value: string
  selected: boolean
  disabled?: boolean
}

interface FluentDropdownElement extends HTMLElement {
  value: string | null
  listbox?: HTMLElement
  enabledOptions?: FluentOptionElement[]
  selectOption: (index?: number, shouldEmit?: boolean) => void
  focus: () => void
  blur: () => void
}

const props = withDefaults(defineProps<VfkSelectProps>(), {
  modelValue: undefined,
  appearance: 'outline',
  size: 'medium',
  placeholder: undefined,
  disabled: false,
  required: false,
  name: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, event: Event]
}>()

defineSlots<{
  /** 下拉选项列表（放置 VfkOption） */
  default?: () => unknown
  /** 自定义右侧展开箭头图标 */
  indicator?: () => unknown
}>()

const el = ref<FluentDropdownElement | null>(null)

/** 官方 fluent-dropdown 默认即为 outline，未传 appearance 属性时呈现描边样式 */
const nativeAppearance = computed(() =>
  props.appearance === 'outline' ? undefined : props.appearance,
)

provide(SELECT_CONTEXT_KEY, {
  modelValue: computed(() => props.modelValue),
})

/** 将底层选项选中态与受控 modelValue 保持同步 */
function syncSelectedValue() {
  if (props.modelValue === undefined || !el.value) return
  if (el.value.listbox) {
    const enabled = el.value.enabledOptions ?? []
    const idx = enabled.findIndex((option) => option.value === props.modelValue)
    el.value.selectOption(idx, false)
    return
  }
  const options = Array.from(el.value.querySelectorAll('fluent-option')) as FluentOptionElement[]
  for (const option of options) {
    option.selected = option.value === props.modelValue
  }
}

onMounted(syncSelectedValue)
watch(() => props.modelValue, syncSelectedValue, { flush: 'post' })

function handleChange(event: Event) {
  if (props.disabled) {
    syncSelectedValue()
    return
  }
  const next = el.value?.value ?? ''
  emit('update:modelValue', next)
  emit('change', next, event)
  void nextTick(syncSelectedValue)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <!-- 显式置空 initial-display，避免 Chromium @scope 伪元素把 placeholder 叠画在已挂载的 control 按钮上 -->
  <fluent-dropdown
    ref="el"
    initial-display=""
    :type.attr="'dropdown'"
    :appearance="nativeAppearance"
    :size="size"
    :placeholder.attr="placeholder"
    :disabled.attr="disabled ? '' : undefined"
    :required.attr="required ? '' : undefined"
    :name.attr="name"
    @change="handleChange"
  >
    <fluent-listbox>
      <slot />
    </fluent-listbox>
    <span v-if="$slots.indicator" slot="indicator" class="vfk-slot-inline">
      <slot name="indicator" />
    </span>
  </fluent-dropdown>
</template>
