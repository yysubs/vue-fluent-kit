<script setup lang="ts">
import '@fluentui/web-components/dialog.js'
import { computed, onBeforeUnmount, onMounted, provide, ref, watch, type StyleValue } from 'vue'
import { DIALOG_CONTEXT_KEY } from './context'
import type { VfkDialogProps } from './types'

interface FluentDialogElement extends HTMLElement {
  show: () => void
  hide: () => void
}

const props = withDefaults(defineProps<VfkDialogProps>(), {
  modelValue: false,
  type: 'modal',
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  maxWidth: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [open: boolean]
  'open-change': [open: boolean, event: Event]
}>()

defineSlots<{
  /** 对话框内容（放置 VfkDialogBody） */
  default?: () => unknown
}>()

const el = ref<FluentDialogElement | null>(null)
const titleId = ref<string | undefined>()
const isOpen = ref(false)

provide(DIALOG_CONTEXT_KEY, {
  setTitleId: (id) => {
    titleId.value = id
  },
})

const labelledBy = computed(() => props.ariaLabelledby ?? titleId.value)

const rootStyle = computed<StyleValue>(() =>
  props.maxWidth ? { '--vfk-dialog-max-width': props.maxWidth } : undefined,
)

/** 将受控 modelValue 同步到底层 fluent-dialog 的打开状态 */
function applyOpen(open: boolean) {
  const node = el.value
  if (!node || open === isOpen.value) return
  isOpen.value = open
  if (open) {
    node.show()
  } else {
    node.hide()
  }
}

function handleToggle(event: Event) {
  const detail = (event as CustomEvent<{ newState?: string }>).detail
  const open = detail?.newState === 'open'
  if (open === isOpen.value) return
  isOpen.value = open
  emit('update:modelValue', open)
  emit('open-change', open, event)
}

onMounted(() => applyOpen(Boolean(props.modelValue)))
watch(() => props.modelValue, (next) => applyOpen(Boolean(next)), { flush: 'post' })

onBeforeUnmount(() => {
  if (isOpen.value) {
    el.value?.hide()
  }
})

defineExpose({
  el,
  /** 命令式打开，由底层 toggle 事件回写 v-model */
  show: () => {
    if (!isOpen.value) el.value?.show()
  },
  /** 命令式关闭，由底层 toggle 事件回写 v-model */
  hide: () => {
    if (isOpen.value) el.value?.hide()
  },
})
</script>

<template>
  <fluent-dialog
    ref="el"
    :style="rootStyle"
    :type.attr="type"
    :aria-label.attr="ariaLabel"
    :aria-labelledby.attr="ariaLabel ? undefined : labelledBy"
    :aria-describedby.attr="ariaDescribedby"
    @toggle="handleToggle"
  >
    <slot />
  </fluent-dialog>
</template>
