<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkButton,
  VfkCheckbox,
  VfkToggleButton,
  type ButtonAppearance,
  type ButtonShape,
  type ButtonSize,
  type ToggleButtonValue,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'toggle-playground', label: messages.value.controls.playground },
  { id: 'toggle-appearances', label: messages.value.controls.toggleButton.secAppearances },
  { id: 'toggle-controlled', label: messages.value.controls.toggleButton.secControlled },
  { id: 'toggle-variants', label: messages.value.controls.toggleButton.secVariants },
  { id: 'toggle-api', label: 'API' },
])

const pressed = ref<ToggleButtonValue>(true)
const appearance = ref<ButtonAppearance>('secondary')
const size = ref<ButtonSize>('medium')
const shape = ref<ButtonShape>('rounded')
const disabled = ref(false)
const disabledFocusable = ref(false)
const withIcon = ref(true)

const appearances: ButtonAppearance[] = ['secondary', 'primary', 'outline', 'subtle', 'transparent']
const sizes: ButtonSize[] = ['small', 'medium', 'large']
const shapes: ButtonShape[] = ['rounded', 'circular', 'square']

const appearanceStates = ref<Record<ButtonAppearance, boolean>>({
  secondary: true,
  primary: true,
  outline: true,
  subtle: true,
  transparent: true,
})

const pinActive = ref(true)
const filterActive = ref(false)
const notifyActive = ref<ToggleButtonValue>('mixed')

const variantStates = ref({
  small: true,
  medium: true,
  large: true,
  circular: true,
  square: true,
})

const stateText = computed(() => {
  if (pressed.value === 'mixed') return messages.value.controls.toggleButton.mixedLabel
  return pressed.value
    ? messages.value.controls.toggleButton.pressedLabel
    : messages.value.controls.toggleButton.unpressedLabel
})

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="pressed"']
  if (appearance.value !== 'secondary') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (shape.value !== 'rounded') attrs.push(`shape="${shape.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (disabledFocusable.value) attrs.push('disabled-focusable')
  const openTag = `<VfkToggleButton ${attrs.join(' ')}>`
  if (!withIcon.value) {
    return `${openTag}${messages.value.controls.toggleButton.sampleLabel}</VfkToggleButton>`
  }
  return `${openTag}\n  <template #start><SparkleIcon /></template>\n  ${messages.value.controls.toggleButton.sampleLabel}\n</VfkToggleButton>`
})

const appearancesCode = `<VfkToggleButton v-model="state" appearance="secondary">Secondary</VfkToggleButton>
<VfkToggleButton v-model="state" appearance="primary">Primary</VfkToggleButton>
<VfkToggleButton v-model="state" appearance="outline">Outline</VfkToggleButton>
<VfkToggleButton v-model="state" appearance="subtle">Subtle</VfkToggleButton>
<VfkToggleButton v-model="state" appearance="transparent">Transparent</VfkToggleButton>`

const controlledCode = `<VfkToggleButton v-model="pinActive" appearance="primary">Pin</VfkToggleButton>
<VfkToggleButton v-model="filterActive" appearance="outline">Filter</VfkToggleButton>
<VfkToggleButton v-model="notifyActive">Mixed</VfkToggleButton>`

const variantsCode = `<VfkToggleButton :model-value="true" size="small">Small</VfkToggleButton>
<VfkToggleButton :model-value="true" size="medium">Medium</VfkToggleButton>
<VfkToggleButton :model-value="true" size="large">Large</VfkToggleButton>
<VfkToggleButton :model-value="true" shape="circular" aria-label="Toggle">
  <template #start><SparkleIcon /></template>
</VfkToggleButton>`

const disabledCode = `<VfkToggleButton :model-value="true" appearance="primary" disabled>Disabled</VfkToggleButton>
<VfkToggleButton :model-value="false" disabled-focusable>Disabled Focusable</VfkToggleButton>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: "boolean | 'mixed'",
    defaultValue: 'false',
    description: messages.value.controls.toggleButton.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'",
    defaultValue: "'secondary'",
    description: messages.value.controls.toggleButton.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.toggleButton.apiSize,
  },
  {
    name: 'shape',
    type: "'rounded' | 'circular' | 'square'",
    defaultValue: "'rounded'",
    description: messages.value.controls.toggleButton.apiShape,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.toggleButton.apiDisabled,
  },
  {
    name: 'disabledFocusable',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.toggleButton.apiDisabledFocusable,
  },
  {
    name: 'iconOnly',
    type: 'boolean',
    defaultValue: 'auto',
    description: messages.value.controls.toggleButton.apiIconOnly,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: messages.value.controls.toggleButton.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: boolean, event: MouseEvent) => void',
    description: messages.value.controls.toggleButton.apiChange,
  },
  {
    name: '@click',
    type: '(event: MouseEvent) => void',
    description: messages.value.controls.toggleButton.apiClick,
  },
  {
    name: '#default / #start / #end',
    type: 'slot',
    description: messages.value.controls.toggleButton.apiSlots,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">ToggleButton</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkToggleButton</span>
            <span class="demo-tag">&lt;fluent-toggle-button&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.toggleButton.desc }}</p>
      </header>

      <section id="toggle-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkToggleButton
              v-model="pressed"
              :appearance="appearance"
              :size="size"
              :shape="shape"
              :disabled="disabled"
              :disabled-focusable="disabledFocusable"
            >
              <template v-if="withIcon" #start><DemoIcons name="sparkle" :size="15" /></template>
              {{ messages.controls.toggleButton.sampleLabel }}
            </VfkToggleButton>
          </template>

          <template #readout>
            <span>{{ messages.controls.toggleButton.stateLabel }}:</span>
            <code class="demo-inline-code">{{ stateText }}</code>
            <code class="demo-inline-code">modelValue={{ String(pressed) }}</code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tb-appearance">appearance</label>
              <select id="tb-appearance" v-model="appearance" class="demo-native-select">
                <option v-for="item in appearances" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tb-size">size</label>
              <select id="tb-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tb-shape">shape</label>
              <select id="tb-shape" v-model="shape" class="demo-native-select">
                <option v-for="item in shapes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <span class="demo-control-field__label">state</span>
              <VfkButton appearance="outline" size="small" @click="pressed = 'mixed'">
                {{ messages.controls.toggleButton.setMixed }}
              </VfkButton>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="withIcon" label="#start" />
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="disabledFocusable" label="disabledFocusable" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="toggle-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.toggleButton.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.toggleButton.cardAppearancesTitle"
          :description="messages.controls.toggleButton.cardAppearancesDesc"
          :code="appearancesCode"
        >
          <div class="demo-row">
            <VfkToggleButton
              v-for="item in appearances"
              :key="item"
              v-model="appearanceStates[item]"
              :appearance="item"
            >
              {{ item }}
            </VfkToggleButton>
          </div>
        </DemoCard>
      </section>

      <section id="toggle-controlled" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.toggleButton.secControlled }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.toggleButton.cardControlledTitle"
          :description="messages.controls.toggleButton.cardControlledDesc"
          :code="controlledCode"
        >
          <div class="demo-stack">
            <div class="demo-row">
              <VfkToggleButton v-model="pinActive" appearance="primary">
                <template #start><DemoIcons name="sparkle" :size="15" /></template>
                {{ messages.controls.toggleButton.toolbarPin }}
              </VfkToggleButton>
              <VfkToggleButton v-model="filterActive" appearance="outline">
                <template #start><DemoIcons name="search" :size="15" /></template>
                {{ messages.controls.toggleButton.toolbarFilter }}
              </VfkToggleButton>
              <VfkToggleButton v-model="notifyActive">
                {{ messages.controls.toggleButton.toolbarNotify }}
              </VfkToggleButton>
              <VfkButton appearance="subtle" size="small" @click="notifyActive = 'mixed'">
                {{ messages.controls.toggleButton.setMixed }}
              </VfkButton>
            </div>
            <div class="demo-row">
              <code class="demo-inline-code">pin={{ String(pinActive) }}</code>
              <code class="demo-inline-code">filter={{ String(filterActive) }}</code>
              <code class="demo-inline-code">notify={{ String(notifyActive) }}</code>
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="toggle-variants" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.toggleButton.secVariants }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard :title="messages.controls.toggleButton.cardVariantsTitle" :code="variantsCode">
            <div class="demo-row">
              <VfkToggleButton v-model="variantStates.small" size="small">Small</VfkToggleButton>
              <VfkToggleButton v-model="variantStates.medium" size="medium">Medium</VfkToggleButton>
              <VfkToggleButton v-model="variantStates.large" size="large">Large</VfkToggleButton>
              <VfkToggleButton v-model="variantStates.circular" shape="circular" aria-label="Toggle">
                <template #start><DemoIcons name="sparkle" :size="15" /></template>
              </VfkToggleButton>
              <VfkToggleButton v-model="variantStates.square" shape="square">Square</VfkToggleButton>
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.toggleButton.cardDisabledTitle" :code="disabledCode">
            <div class="demo-row">
              <VfkToggleButton :model-value="true" appearance="primary" disabled>Disabled</VfkToggleButton>
              <VfkToggleButton :model-value="false" disabled-focusable>Disabled Focusable</VfkToggleButton>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="toggle-api" class="demo-section">
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
