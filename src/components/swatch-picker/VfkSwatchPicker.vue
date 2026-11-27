<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, provide, ref, watch } from 'vue'
import { SWATCH_PICKER_CONTEXT_KEY } from './context'
import type { VfkSwatchPickerProps } from './types'

const SWATCH_SELECTOR = '.vfk-color-swatch'
const ENABLED_SWATCH_SELECTOR = '.vfk-color-swatch:not([aria-disabled="true"])'

const props = withDefaults(defineProps<VfkSwatchPickerProps>(), {
  modelValue: undefined,
  size: 'medium',
  shape: 'square',
  layout: 'row',
  columnCount: 3,
  spacing: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, event: Event]
}>()

defineSlots<{
  /** 色块列表（放置 VfkColorSwatch） */
  default?: () => unknown
}>()

const el = ref<HTMLDivElement | null>(null)
const uncontrolledValue = ref<string | undefined>(undefined)
const tabStopValue = ref<string | undefined>(undefined)

/** 父级传入 modelValue 时以其为准，否则使用组件内部记录的选中值 */
const currentValue = computed(() => props.modelValue ?? uncontrolledValue.value)

const gridStyle = computed(() =>
  props.layout === 'grid'
    ? { gridTemplateColumns: `repeat(${Math.max(1, Math.floor(props.columnCount))}, max-content)` }
    : undefined,
)

function getSwatches(selector: string) {
  if (!el.value) return []
  return Array.from(el.value.querySelectorAll<HTMLElement>(selector))
}

/** 维护 roving tabindex：优先选中色块，其次保留上次聚焦的色块，否则取第一个可用色块 */
function updateTabStop() {
  const values = getSwatches(ENABLED_SWATCH_SELECTOR).map((swatch) => swatch.dataset.value)
  if (currentValue.value !== undefined && values.includes(currentValue.value)) {
    tabStopValue.value = currentValue.value
  } else if (tabStopValue.value === undefined || !values.includes(tabStopValue.value)) {
    tabStopValue.value = values[0]
  }
}

onMounted(updateTabStop)
onUpdated(updateTabStop)
watch(currentValue, () => void nextTick(updateTabStop))

function select(value: string, event: Event) {
  if (props.disabled) return
  tabStopValue.value = value
  if (value === currentValue.value) return
  uncontrolledValue.value = value
  emit('update:modelValue', value)
  emit('change', value, event)
}

provide(SWATCH_PICKER_CONTEXT_KEY, {
  modelValue: currentValue,
  tabStopValue,
  size: computed(() => props.size),
  shape: computed(() => props.shape),
  disabled: computed(() => props.disabled),
  select,
})

/** 方向键与 Home/End 在可用色块间移动焦点，Enter/空格由色块按钮原生点击完成选择 */
function handleKeydown(event: KeyboardEvent) {
  const current = (event.target as HTMLElement | null)?.closest<HTMLElement>(SWATCH_SELECTOR)
  if (!current || !el.value) return
  const enabled = getSwatches(ENABLED_SWATCH_SELECTOR)
  if (!enabled.length) return

  const index = enabled.indexOf(current)
  const rtl = getComputedStyle(el.value).direction === 'rtl'
  const columnStep = props.layout === 'grid' ? Math.max(1, Math.floor(props.columnCount)) : 1
  const last = enabled.length - 1
  let next: number | undefined

  switch (event.key) {
    case 'ArrowRight':
      next = index + (rtl ? -1 : 1)
      break
    case 'ArrowLeft':
      next = index + (rtl ? 1 : -1)
      break
    case 'ArrowDown':
      next = columnStep > 1 ? Math.min(index + columnStep, last) : index + 1
      break
    case 'ArrowUp':
      next = columnStep > 1 ? Math.max(index - columnStep, 0) : index - 1
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = last
      break
    default:
      return
  }

  event.preventDefault()
  const target = enabled[(next + enabled.length) % enabled.length]
  tabStopValue.value = target.dataset.value
  target.focus()
}

defineExpose({
  el,
  focus: () => {
    const target =
      getSwatches(ENABLED_SWATCH_SELECTOR).find(
        (swatch) => swatch.dataset.value === tabStopValue.value,
      ) ?? getSwatches(ENABLED_SWATCH_SELECTOR)[0]
    target?.focus()
  },
})
</script>

<template>
  <div
    ref="el"
    role="radiogroup"
    class="vfk-swatch-picker"
    :class="[
      `vfk-swatch-picker--${layout}`,
      `vfk-swatch-picker--spacing-${spacing}`,
      { 'vfk-swatch-picker--disabled': disabled },
    ]"
    :style="gridStyle"
    :aria-disabled="disabled ? 'true' : undefined"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>
