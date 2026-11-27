<script setup lang="ts">
import '@fluentui/web-components/dialog-body.js'
import { computed, inject, onBeforeUnmount, onMounted, ref, useId, useSlots, watch } from 'vue'
import VfkButton from '../button/VfkButton.vue'
import { DIALOG_CONTEXT_KEY } from './context'
import type { VfkDialogBodyProps } from './types'

const props = withDefaults(defineProps<VfkDialogBodyProps>(), {
  title: undefined,
  closable: true,
  closeLabel: '关闭',
})

defineSlots<{
  /** 标题内容（优先于 title 属性） */
  title?: () => unknown
  /** 标题右侧的附加操作 */
  'title-action'?: () => unknown
  /** 自定义关闭按钮 */
  close?: () => unknown
  /** 正文内容 */
  default?: () => unknown
  /** 底部操作区 */
  action?: () => unknown
}>()

const slots = useSlots()
const el = ref<HTMLElement | null>(null)
const dialog = inject(DIALOG_CONTEXT_KEY, null)
const titleId = useId()

const hasTitle = computed(() => Boolean(props.title) || Boolean(slots.title))

/** 标题存在时向父级对话框注册 id，供其生成 aria-labelledby */
function syncTitleId() {
  dialog?.setTitleId(hasTitle.value ? titleId : undefined)
}

onMounted(syncTitleId)
watch(hasTitle, syncTitleId)
onBeforeUnmount(() => dialog?.setTitleId(undefined))

defineExpose({ el })
</script>

<template>
  <fluent-dialog-body ref="el">
    <h2 v-if="hasTitle" :id="titleId" slot="title" class="vfk-dialog-body__title">
      <slot name="title">{{ title }}</slot>
    </h2>
    <span v-if="$slots['title-action']" slot="title-action" class="vfk-dialog-body__title-action">
      <slot name="title-action" />
    </span>
    <span v-if="closable || $slots.close" slot="close" class="vfk-dialog-body__close">
      <slot name="close">
        <VfkButton
          appearance="subtle"
          shape="rounded"
          size="small"
          icon-only
          :aria-label="closeLabel"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="m1 1 10 10M11 1 1 11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </VfkButton>
      </slot>
    </span>
    <slot />
    <span v-if="$slots.action" slot="action" class="vfk-dialog-body__actions">
      <slot name="action" />
    </span>
  </fluent-dialog-body>
</template>
