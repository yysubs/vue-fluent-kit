<script setup lang="ts">
import '@fluentui/web-components/dropdown.js'
import '@fluentui/web-components/listbox.js'
import '@fluentui/web-components/option.js'
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue'
import { SELECT_CONTEXT_KEY } from '../select/context'
import type { VfkComboboxProps } from './types'

interface FluentOptionElement extends HTMLElement {
  value: string
  text: string
  selected: boolean
  disabled: boolean
  freeform?: boolean
}

interface FluentDropdownElement extends HTMLElement {
  value: string | null
  listbox?: HTMLElement
  enabledOptions?: FluentOptionElement[]
  selectOption: (index?: number, shouldEmit?: boolean) => void
  focus: () => void
  blur: () => void
}

const FILTERED_ATTR = 'data-vfk-filtered'

const props = withDefaults(defineProps<VfkComboboxProps>(), {
  modelValue: undefined,
  appearance: 'outline',
  size: 'medium',
  placeholder: undefined,
  disabled: false,
  required: false,
  name: undefined,
  filter: true,
  freeform: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, event: Event]
  input: [query: string, event: Event]
}>()

defineSlots<{
  /** 下拉选项列表（放置 VfkOption） */
  default?: () => unknown
  /** 自定义右侧展开箭头图标 */
  indicator?: () => unknown
  /** freeform 自定义选项中输入文本前的提示文案 */
  freeform?: () => unknown
}>()

const el = ref<FluentDropdownElement | null>(null)
const uncontrolledValue = ref<string | undefined>(undefined)

/** 父级传入 modelValue 时以其为准，否则使用组件内部记录的选中值 */
const currentValue = computed(() => props.modelValue ?? uncontrolledValue.value)

/** 官方 fluent-dropdown 默认即为 outline，未传 appearance 属性时呈现描边样式 */
const nativeAppearance = computed(() =>
  props.appearance === 'outline' ? undefined : props.appearance,
)

provide(SELECT_CONTEXT_KEY, {
  modelValue: currentValue,
})

let collator: Intl.Collator | undefined

/** 与官方 combobox 一致的前缀匹配规则：忽略大小写与重音 */
function matchesQuery(text: string, query: string) {
  collator ??= new Intl.Collator(undefined, { usage: 'search', sensitivity: 'base' })
  return collator.compare(text.substring(0, Math.min(text.length, query.length)), query) === 0
}

/** 官方在 Light DOM 中插入的 input 输入框 */
function getControl() {
  return el.value?.querySelector<HTMLInputElement>('input[slot="control"]') ?? null
}

function getOptions() {
  if (!el.value) return []
  return Array.from(el.value.querySelectorAll('fluent-option')) as FluentOptionElement[]
}

/**
 * 隐藏与输入文本不匹配的选项，并临时设为不可用，使官方方向键导航与回车选择只落在可见选项上。
 * @param query 输入框当前文本，传空字符串时恢复全部选项
 */
function applyFilter(query: string) {
  const active = props.filter && query !== ''
  for (const option of getOptions()) {
    if (option.freeform) continue
    const hide = active && !matchesQuery(option.text, query)
    const wasHidden = option.hasAttribute(FILTERED_ATTR)
    if (hide === wasHidden) continue
    option.toggleAttribute(FILTERED_ATTR, hide)
    option.hidden = hide
    option.disabled = hide || option.hasAttribute('disabled') || props.disabled
  }
}

/** 将底层选项选中态与当前值保持同步，同时刷新输入框显示文本 */
function syncSelectedValue() {
  const value = currentValue.value
  if (value === undefined || !el.value) return
  if (el.value.listbox) {
    const enabled = el.value.enabledOptions ?? []
    let idx = enabled.findIndex((option) => !option.freeform && option.value === value)
    if (idx < 0 && props.freeform && value !== '') {
      const freeformOption = enabled.find((option) => option.freeform)
      if (freeformOption) {
        freeformOption.value = value
        freeformOption.hidden = false
        idx = enabled.indexOf(freeformOption)
      }
    }
    el.value.selectOption(idx, false)
    return
  }
  for (const option of getOptions()) {
    if (option.freeform) continue
    option.selected = option.value === value
  }
}

onMounted(syncSelectedValue)
watch(currentValue, syncSelectedValue, { flush: 'post' })

/** 捕获阶段先于官方 inputHandler 执行，保证官方计算活动项时已完成过滤 */
function handleInputCapture(event: Event) {
  const control = getControl()
  if (!control || event.target !== control) return
  applyFilter(control.value)
  emit('input', control.value, event)
}

function handleToggle(event: Event) {
  if ((event as ToggleEvent).newState !== 'closed') return
  applyFilter('')
  if (!props.freeform) syncSelectedValue()
}

function handleChange(event: Event) {
  // 输入框原生 change 事件也会冒泡到这里，只处理 fluent-dropdown 自身派发的 change
  if (!el.value || event.target !== el.value) return
  const next = el.value.value
  const text = getControl()?.value ?? ''
  applyFilter('')

  if (props.disabled || (next === null && text !== '' && !props.freeform)) {
    syncSelectedValue()
    return
  }

  const value = next ?? ''
  uncontrolledValue.value = value
  emit('update:modelValue', value)
  emit('change', value, event)
  syncSelectedValue()
  void nextTick(syncSelectedValue)
}

defineExpose({
  el,
  focus: () => el.value?.focus(),
  blur: () => el.value?.blur(),
})
</script>

<template>
  <fluent-dropdown
    ref="el"
    class="vfk-combobox"
    :type.attr="'combobox'"
    :appearance="nativeAppearance"
    :size="size"
    :placeholder.attr="placeholder"
    :disabled.attr="disabled ? '' : undefined"
    :required.attr="required ? '' : undefined"
    :name.attr="name"
    @input.capture="handleInputCapture"
    @change="handleChange"
  >
    <fluent-listbox @toggle="handleToggle">
      <fluent-option v-if="freeform" :freeform.attr="''" class="vfk-combobox__freeform">
        <slot name="freeform" /><output />
      </fluent-option>
      <slot />
    </fluent-listbox>
    <span v-if="$slots.indicator" slot="indicator" class="vfk-slot-inline">
      <slot name="indicator" />
    </span>
  </fluent-dropdown>
</template>
