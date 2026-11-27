<script setup lang="ts">
import '@fluentui/web-components/drawer.js'
import { computed, onBeforeUnmount, onMounted, provide, ref, watch, type StyleValue } from 'vue'
import { DRAWER_CONTEXT_KEY } from './context'
import type { VfkDrawerProps } from './types'

interface FluentDrawerElement extends HTMLElement {
  show: () => void
  hide: () => void
}

const props = withDefaults(defineProps<VfkDrawerProps>(), {
  modelValue: false,
  type: 'modal',
  position: 'start',
  size: 'medium',
  width: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [open: boolean]
  'open-change': [open: boolean, event: Event]
}>()

defineSlots<{
  /** 抽屉内容（放置 VfkDrawerBody） */
  default?: () => unknown
}>()

const el = ref<FluentDrawerElement | null>(null)
const titleId = ref<string | undefined>()
const isOpen = ref(false)

provide(DRAWER_CONTEXT_KEY, {
  setTitleId: (id) => {
    titleId.value = id
  },
})

const labelledBy = computed(() => props.ariaLabelledby ?? titleId.value)

const rootStyle = computed<StyleValue>(() =>
  props.width ? { '--drawer-width': props.width } : undefined,
)

/** 将受控 modelValue 同步到底层 fluent-drawer 的打开状态 */
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
  <fluent-drawer
    ref="el"
    :style="rootStyle"
    :type.attr="type"
    :position.attr="position"
    :size.attr="size"
    :aria-labelledby.attr="labelledBy"
    :aria-describedby.attr="ariaDescribedby"
    @toggle="handleToggle"
  >
    <slot />
  </fluent-drawer>
</template>
