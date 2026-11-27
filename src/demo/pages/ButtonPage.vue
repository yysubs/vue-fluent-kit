<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkButton,
  VfkCheckbox,
  type ButtonAppearance,
  type ButtonShape,
  type ButtonSize,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'button-playground', label: messages.value.controls.playground },
  { id: 'button-appearances', label: messages.value.controls.button.secAppearances },
  { id: 'button-sizes-shapes', label: messages.value.controls.button.secSizesShapes },
  { id: 'button-icons-states', label: messages.value.controls.button.secIconsStates },
  { id: 'button-api', label: 'API' },
])

const appearance = ref<ButtonAppearance>('primary')
const size = ref<ButtonSize>('medium')
const shape = ref<ButtonShape>('rounded')
const disabled = ref(false)
const disabledFocusable = ref(false)
const withStartIcon = ref(true)
const withEndIcon = ref(false)
const clickCount = ref(0)

const appearances: ButtonAppearance[] = ['secondary', 'primary', 'outline', 'subtle', 'transparent']
const sizes: ButtonSize[] = ['small', 'medium', 'large']
const shapes: ButtonShape[] = ['rounded', 'circular', 'square']

const playgroundCode = computed(() => {
  const attrs: string[] = []
  if (appearance.value !== 'secondary') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (shape.value !== 'rounded') attrs.push(`shape="${shape.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (disabledFocusable.value) attrs.push('disabled-focusable')
  const openTag = attrs.length ? `<VfkButton ${attrs.join(' ')}>` : '<VfkButton>'
  const lines = [openTag]
  if (withStartIcon.value) lines.push('  <template #start><PlusIcon /></template>')
  lines.push(`  ${messages.value.controls.button.actionLabel}`)
  if (withEndIcon.value) lines.push('  <template #end><ArrowRightIcon /></template>')
  lines.push('</VfkButton>')
  return lines.join('\n')
})

const appearanceCode = `<VfkButton appearance="secondary">Secondary</VfkButton>
<VfkButton appearance="primary">Primary</VfkButton>
<VfkButton appearance="outline">Outline</VfkButton>
<VfkButton appearance="subtle">Subtle</VfkButton>
<VfkButton appearance="transparent">Transparent</VfkButton>`

const sizeShapeCode = `<VfkButton size="small">Small</VfkButton>
<VfkButton size="medium">Medium</VfkButton>
<VfkButton size="large">Large</VfkButton>
<VfkButton shape="rounded">Rounded</VfkButton>
<VfkButton shape="circular">Circular</VfkButton>
<VfkButton shape="square">Square</VfkButton>`

const iconCode = `<VfkButton appearance="primary">
  <template #start><PlusIcon /></template>
  New Item
</VfkButton>
<VfkButton appearance="outline">
  Next
  <template #end><ArrowRightIcon /></template>
</VfkButton>
<VfkButton appearance="subtle" aria-label="Add">
  <template #start><PlusIcon /></template>
</VfkButton>`

const disabledCode = `<VfkButton appearance="primary" disabled>Disabled</VfkButton>
<VfkButton appearance="secondary" disabled-focusable>Disabled Focusable</VfkButton>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'appearance',
    type: "'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'",
    defaultValue: "'secondary'",
    description: messages.value.controls.button.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.button.apiSize,
  },
  {
    name: 'shape',
    type: "'rounded' | 'circular' | 'square'",
    defaultValue: "'rounded'",
    description: messages.value.controls.button.apiShape,
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
    description: messages.value.controls.button.apiType,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.button.apiDisabled,
  },
  {
    name: 'disabledFocusable',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.button.apiDisabledFocusable,
  },
  {
    name: 'iconOnly',
    type: 'boolean',
    defaultValue: 'auto',
    description: messages.value.controls.button.apiIconOnly,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  { name: '@click', type: '(event: MouseEvent) => void', description: messages.value.controls.button.apiClick },
  { name: '#default', type: 'slot', description: messages.value.controls.button.apiSlotDefault },
  { name: '#start', type: 'slot', description: messages.value.controls.button.apiSlotStart },
  { name: '#end', type: 'slot', description: messages.value.controls.button.apiSlotEnd },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Button</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkButton</span>
            <span class="demo-tag">&lt;fluent-button&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.button.desc }}</p>
      </header>

      <section id="button-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkButton
              :appearance="appearance"
              :size="size"
              :shape="shape"
              :disabled="disabled"
              :disabled-focusable="disabledFocusable"
              @click="clickCount++"
            >
              <template v-if="withStartIcon" #start>
                <DemoIcons name="plus" :size="15" />
              </template>
              {{ messages.controls.button.actionLabel }}
              <template v-if="withEndIcon" #end>
                <DemoIcons name="arrow-right" :size="15" />
              </template>
            </VfkButton>
          </template>

          <template #readout>
            <span>{{ messages.controls.button.clickCountLabel }}: <strong>{{ clickCount }}</strong></span>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="btn-appearance">appearance</label>
              <select id="btn-appearance" v-model="appearance" class="demo-native-select">
                <option v-for="item in appearances" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="btn-size">size</label>
              <select id="btn-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="btn-shape">shape</label>
              <select id="btn-shape" v-model="shape" class="demo-native-select">
                <option v-for="item in shapes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="withStartIcon" label="#start" />
              <VfkCheckbox v-model="withEndIcon" label="#end" />
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="disabledFocusable" label="disabledFocusable" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="button-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.button.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.button.cardAppearancesTitle"
          :description="messages.controls.button.cardAppearancesDesc"
          :code="appearanceCode"
          full
        >
          <div class="demo-row">
            <VfkButton appearance="secondary">Secondary</VfkButton>
            <VfkButton appearance="primary">Primary</VfkButton>
            <VfkButton appearance="outline">Outline</VfkButton>
            <VfkButton appearance="subtle">Subtle</VfkButton>
            <VfkButton appearance="transparent">Transparent</VfkButton>
          </div>
        </DemoCard>
      </section>

      <section id="button-sizes-shapes" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.button.secSizesShapes }}</h2>
        </div>

        <div class="demo-cards-grid">
          <DemoCard :title="messages.controls.button.cardSizesTitle" :code="sizeShapeCode">
            <div class="demo-row" style="align-items: center">
              <VfkButton size="small" appearance="primary">Small</VfkButton>
              <VfkButton size="medium" appearance="primary">Medium</VfkButton>
              <VfkButton size="large" appearance="primary">Large</VfkButton>
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.button.cardShapesTitle" :code="sizeShapeCode">
            <div class="demo-row">
              <VfkButton shape="rounded">Rounded</VfkButton>
              <VfkButton shape="circular">Circular</VfkButton>
              <VfkButton shape="square">Square</VfkButton>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="button-icons-states" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.button.secIconsStates }}</h2>
        </div>

        <div class="demo-cards-grid">
          <DemoCard :title="messages.controls.button.cardIconsTitle" :code="iconCode">
            <div class="demo-row">
              <VfkButton appearance="primary">
                <template #start><DemoIcons name="plus" :size="15" /></template>
                {{ messages.controls.button.actionLabel }}
              </VfkButton>
              <VfkButton appearance="outline">
                {{ messages.controls.button.nextLabel }}
                <template #end><DemoIcons name="arrow-right" :size="15" /></template>
              </VfkButton>
              <VfkButton appearance="subtle" :aria-label="messages.controls.button.actionLabel">
                <template #start><DemoIcons name="plus" :size="15" /></template>
              </VfkButton>
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.button.cardDisabledTitle" :code="disabledCode">
            <div class="demo-row">
              <VfkButton appearance="primary" disabled>Disabled</VfkButton>
              <VfkButton appearance="secondary" disabled-focusable>Disabled Focusable</VfkButton>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="button-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable :rows="propRows" />
          <DemoApiTable
            :kind-label="messages.controls.eventsSlots"
            :rows="eventSlotRows"
            :show-default="false"
          />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
