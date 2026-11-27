<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkCheckbox,
  VfkTextarea,
  type TextareaAppearance,
  type TextareaResize,
  type TextareaSize,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'textarea-playground', label: messages.value.controls.playground },
  { id: 'textarea-appearances', label: messages.value.controls.textarea.secAppearances },
  { id: 'textarea-resize', label: messages.value.controls.textarea.secResize },
  { id: 'textarea-states', label: messages.value.controls.textarea.secStates },
  { id: 'textarea-api', label: 'API' },
])

const text = ref('')
const appearance = ref<TextareaAppearance>('outline')
const size = ref<TextareaSize>('medium')
const resize = ref<TextareaResize>('none')
const block = ref(true)

const outlineText = ref('简述本次改动')
const filledLighterText = ref('简述本次改动')
const filledDarkerText = ref('简述本次改动')
const autoText = ref('这段文字会随着输入不断增高，不需要手动拖拽右下角。')
const fixedText = ref('固定高度，内容超出后内部滚动。')
const disabledText = ref('禁用状态不可编辑')
const readonlyText = ref('只读状态可以选中复制')

const playgroundCode = computed(() => {
  const attrs = ['v-model="text"']
  if (appearance.value !== 'outline') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (resize.value !== 'none') attrs.push(`resize="${resize.value}"`)
  if (block.value) attrs.push('block')
  return `<VfkTextarea ${attrs.join(' ')} placeholder="${messages.value.controls.textarea.placeholder}" />`
})

const appearancesCode = `<VfkTextarea v-model="a" appearance="outline" />
<VfkTextarea v-model="b" appearance="filled-lighter" />
<VfkTextarea v-model="c" appearance="filled-darker" />`

const resizeCode = `<VfkTextarea v-model="d" resize="vertical" min-height="120px" />
<VfkTextarea v-model="e" auto-resize />`

const statesCode = `<VfkTextarea v-model="f" disabled />
<VfkTextarea v-model="g" readonly />
<VfkTextarea v-model="h" required>
  <template #label>备注</template>
</VfkTextarea>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.textarea.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'outline' | 'filled-lighter' | 'filled-darker'",
    defaultValue: "'outline'",
    description: messages.value.controls.textarea.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.textarea.apiSize,
  },
  {
    name: 'resize',
    type: "'none' | 'both' | 'horizontal' | 'vertical'",
    defaultValue: "'none'",
    description: messages.value.controls.textarea.apiResize,
  },
  {
    name: 'autoResize',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.textarea.apiAutoResize,
  },
  {
    name: 'block',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.textarea.apiBlock,
  },
  {
    name: 'minHeight',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.textarea.apiMinHeight,
  },
  {
    name: 'placeholder / disabled / readonly / required / maxlength',
    type: '原生属性',
    defaultValue: '—',
    description: messages.value.controls.textarea.apiFlags,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.textarea.apiUpdate,
  },
  {
    name: '@input / @change',
    type: '(value: string, event: Event) => void',
    description: messages.value.controls.textarea.apiChange,
  },
  {
    name: '#label',
    type: 'slot',
    description: messages.value.controls.textarea.apiSlotLabel,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Textarea</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkTextarea</span>
            <span class="demo-tag">&lt;fluent-textarea&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.textarea.desc }}</p>
      </header>

      <section id="textarea-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <div class="demo-row" style="width: 100%">
              <VfkTextarea
                v-model="text"
                :appearance="appearance"
                :size="size"
                :resize="resize"
                :block="block"
                :placeholder="messages.controls.textarea.placeholder"
                style="width: 100%"
              />
            </div>
          </template>

          <template #readout>
            <span>{{ text.length }} / 200</span>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="ta-appearance">appearance</label>
              <select id="ta-appearance" v-model="appearance" class="demo-native-select">
                <option value="outline">outline</option>
                <option value="filled-lighter">filled-lighter</option>
                <option value="filled-darker">filled-darker</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="ta-size">size</label>
              <select id="ta-size" v-model="size" class="demo-native-select">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="ta-resize">resize</label>
              <select id="ta-resize" v-model="resize" class="demo-native-select">
                <option value="none">none</option>
                <option value="vertical">vertical</option>
                <option value="horizontal">horizontal</option>
                <option value="both">both</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="block" label="block" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="textarea-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.textarea.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.textarea.cardAppearancesTitle"
          :description="messages.controls.textarea.cardAppearancesDesc"
          :code="appearancesCode"
          full
        >
          <div class="demo-stack">
            <VfkTextarea
              v-model="outlineText"
              appearance="outline"
              block
              :placeholder="messages.controls.textarea.placeholder"
            />
            <VfkTextarea
              v-model="filledLighterText"
              appearance="filled-lighter"
              block
              :placeholder="messages.controls.textarea.placeholder"
            />
            <VfkTextarea
              v-model="filledDarkerText"
              appearance="filled-darker"
              block
              :placeholder="messages.controls.textarea.placeholder"
            />
            <div class="demo-row">
              <VfkTextarea v-model="outlineText" size="small" style="width: 220px" />
              <VfkTextarea v-model="outlineText" size="medium" style="width: 220px" />
              <VfkTextarea v-model="outlineText" size="large" style="width: 220px" />
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="textarea-resize" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.textarea.secResize }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.textarea.cardResizeTitle"
          :description="messages.controls.textarea.cardResizeDesc"
          :code="resizeCode"
          full
        >
          <div class="demo-stack">
            <VfkTextarea
              v-model="fixedText"
              resize="vertical"
              min-height="120px"
              block
            />
            <VfkTextarea v-model="autoText" auto-resize block />
          </div>
        </DemoCard>
      </section>

      <section id="textarea-states" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.textarea.secStates }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.textarea.cardStatesTitle"
          :code="statesCode"
          full
        >
          <div class="demo-stack">
            <VfkTextarea v-model="disabledText" disabled block />
            <VfkTextarea v-model="readonlyText" readonly block />
            <VfkTextarea v-model="fixedText" required min-height="96px" block>
              <template #label>{{ messages.controls.textarea.sampleLabel }}</template>
            </VfkTextarea>
          </div>
        </DemoCard>
      </section>

      <section id="textarea-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="Props" :rows="propRows" />
          <DemoApiTable :title="messages.controls.eventsSlots" :rows="eventSlotRows" kind="event" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
