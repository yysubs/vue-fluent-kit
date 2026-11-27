<script setup lang="ts">
import { computed, ref } from 'vue'
import { VfkButton, VfkTooltip, type TooltipPositioning } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'tooltip-playground', label: messages.value.controls.playground },
  { id: 'tooltip-directions', label: messages.value.controls.tooltip.secDirections },
  { id: 'tooltip-content', label: messages.value.controls.tooltip.secContent },
  { id: 'tooltip-api', label: 'API' },
])

const positioning = ref<TooltipPositioning>('above')
const delay = ref(250)

const directions: TooltipPositioning[] = [
  'above',
  'below',
  'before',
  'after',
  'above-start',
  'below-end',
]

const anchors = [
  { id: 'tooltip-anchor-edit', label: '编辑' },
  { id: 'tooltip-anchor-share', label: '分享' },
  { id: 'tooltip-anchor-delete', label: '删除' },
]

const playgroundCode = computed(
  () => `<VfkTooltip text="${messages.value.controls.tooltip.triggerLabel}" positioning="${positioning.value}" :delay="${delay.value}">
  <VfkButton appearance="secondary">${messages.value.controls.tooltip.triggerLabel}</VfkButton>
</VfkTooltip>`,
)

const directionsCode = `<VfkTooltip text="Above" positioning="above">...</VfkTooltip>
<VfkTooltip text="Below" positioning="below">...</VfkTooltip>
<VfkTooltip text="Before" positioning="before">...</VfkTooltip>
<VfkTooltip text="After" positioning="after">...</VfkTooltip>`

const contentCode = `<VfkTooltip>
  <VfkButton appearance="outline">发布说明</VfkButton>
  <template #content>
    <strong>发布说明</strong>
    <p>包含破坏性变更，升级前请阅读迁移指引。</p>
  </template>
</VfkTooltip>`

const anchorCode = `<VfkButton id="save-button">保存</VfkButton>
<VfkTooltip anchor="save-button" text="快捷键 Ctrl + S" />`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'text',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.tooltip.apiText,
  },
  {
    name: 'anchor',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.tooltip.apiAnchor,
  },
  {
    name: 'positioning',
    type: 'TooltipPositioning',
    defaultValue: "'above'",
    description: messages.value.controls.tooltip.apiPositioning,
  },
  {
    name: 'delay',
    type: 'number',
    defaultValue: '250',
    description: messages.value.controls.tooltip.apiDelay,
  },
])

const slotRows = computed<ApiRow[]>(() => [
  {
    name: '#default / #content',
    type: 'slot',
    description: messages.value.controls.tooltip.apiSlots,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Tooltip</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkTooltip</span>
            <span class="demo-tag">&lt;fluent-tooltip&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.tooltip.desc }}</p>
      </header>

      <section id="tooltip-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkTooltip
              :text="messages.controls.tooltip.triggerLabel"
              :positioning="positioning"
              :delay="delay"
            >
              <VfkButton appearance="secondary">
                <template #start><DemoIcons name="eye" :size="14" /></template>
                {{ messages.controls.tooltip.triggerLabel }}
              </VfkButton>
            </VfkTooltip>
          </template>

          <template #readout>
            <span>positioning:</span>
            <code class="demo-inline-code">{{ positioning }}</code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tt-positioning">positioning</label>
              <select id="tt-positioning" v-model="positioning" class="demo-native-select">
                <option value="above">above</option>
                <option value="below">below</option>
                <option value="before">before</option>
                <option value="after">after</option>
                <option value="above-start">above-start</option>
                <option value="below-end">below-end</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tt-delay">delay (ms)</label>
              <select id="tt-delay" v-model.number="delay" class="demo-native-select">
                <option :value="0">0</option>
                <option :value="250">250</option>
                <option :value="600">600</option>
              </select>
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="tooltip-directions" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.tooltip.secDirections }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.tooltip.cardDirectionsTitle"
          :description="messages.controls.tooltip.cardDirectionsDesc"
          :code="directionsCode"
          full
        >
          <div class="demo-row">
            <VfkTooltip
              v-for="item in directions"
              :key="item"
              :text="item"
              :positioning="item"
            >
              <VfkButton appearance="subtle">{{ item }}</VfkButton>
            </VfkTooltip>
          </div>
        </DemoCard>
      </section>

      <section id="tooltip-content" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.tooltip.secContent }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.tooltip.cardContentTitle"
          :description="messages.controls.tooltip.cardContentDesc"
          :code="contentCode"
          full
        >
          <div class="demo-row">
            <VfkTooltip>
              <VfkButton appearance="outline">
                <template #start><DemoIcons name="sparkle" :size="14" /></template>
                {{ messages.controls.tooltip.richTextTitle }}
              </VfkButton>
              <template #content>
                <div style="display: flex; flex-direction: column; gap: 4px; max-width: 220px">
                  <strong>{{ messages.controls.tooltip.richTextTitle }}</strong>
                  <span>{{ messages.controls.tooltip.richTextBody }}</span>
                </div>
              </template>
            </VfkTooltip>

            <VfkButton v-for="item in anchors" :id="item.id" :key="item.id" appearance="subtle">
              {{ item.label }}
            </VfkButton>
            <VfkTooltip anchor="tooltip-anchor-edit" :text="messages.controls.tooltip.triggerLabel" />
            <VfkTooltip anchor="tooltip-anchor-share" text="分享到聊天" />
            <VfkTooltip anchor="tooltip-anchor-delete" text="删除后不可恢复" positioning="below" />
          </div>
        </DemoCard>
      </section>

      <section id="tooltip-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="Props" :rows="propRows" />
          <DemoApiTable :title="messages.controls.eventsSlots" :rows="slotRows" kind="event" />
          <DemoCard :title="messages.controls.tooltip.cardContentTitle" :code="anchorCode" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
