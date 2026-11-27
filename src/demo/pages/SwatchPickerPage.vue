<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkCheckbox,
  VfkColorSwatch,
  VfkSwatchPicker,
  type SwatchPickerLayout,
  type SwatchPickerShape,
  type SwatchPickerSize,
  type SwatchPickerSpacing,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'swatch-playground', label: messages.value.controls.playground },
  { id: 'swatch-sizes-shapes', label: messages.value.controls.swatchPicker.secSizesShapes },
  { id: 'swatch-layout-spacing', label: messages.value.controls.swatchPicker.secLayoutSpacing },
  { id: 'swatch-states', label: messages.value.controls.swatchPicker.secStates },
  { id: 'swatch-api', label: 'API' },
])

interface SwatchOption {
  value: string
  color: string
  label: string
  borderColor?: string
  disabled?: boolean
}

const palette = computed<SwatchOption[]>(() => [
  { value: '#d13438', color: '#d13438', label: messages.value.controls.swatchPicker.colorRed },
  { value: '#f7630c', color: '#f7630c', label: messages.value.controls.swatchPicker.colorOrange },
  { value: '#ffb900', color: '#ffb900', label: messages.value.controls.swatchPicker.colorYellow },
  { value: '#107c10', color: '#107c10', label: messages.value.controls.swatchPicker.colorGreen },
  { value: '#038387', color: '#038387', label: messages.value.controls.swatchPicker.colorTeal },
  { value: '#0f6cbd', color: '#0f6cbd', label: messages.value.controls.swatchPicker.colorBlue },
  { value: '#744da9', color: '#744da9', label: messages.value.controls.swatchPicker.colorViolet },
])

const selected = ref('#0f6cbd')
const size = ref<SwatchPickerSize>('medium')
const shape = ref<SwatchPickerShape>('square')
const layout = ref<SwatchPickerLayout>('row')
const spacing = ref<SwatchPickerSpacing>('medium')
const disabled = ref(false)

const sizes: SwatchPickerSize[] = ['extra-small', 'small', 'medium', 'large']
const shapes: SwatchPickerShape[] = ['square', 'rounded', 'circular']
const layouts: SwatchPickerLayout[] = ['row', 'grid']
const spacings: SwatchPickerSpacing[] = ['small', 'medium']

const sizeValues = ref<Record<SwatchPickerSize, string>>({
  'extra-small': '#0f6cbd',
  small: '#038387',
  medium: '#744da9',
  large: '#d13438',
})
const shapeValues = ref<Record<SwatchPickerShape, string>>({
  square: '#0f6cbd',
  rounded: '#107c10',
  circular: '#f7630c',
})
const gridValue = ref('#038387')
const spacingSmallValue = ref('#0f6cbd')
const spacingMediumValue = ref('#744da9')
const borderDisabledValue = ref('#ffffff')

const selectedLabel = computed(
  () => palette.value.find((item) => item.value === selected.value)?.label ?? selected.value,
)

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="selected"', 'aria-label="Choose color"']
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (shape.value !== 'square') attrs.push(`shape="${shape.value}"`)
  if (layout.value !== 'row') attrs.push(`layout="${layout.value}"`, ':column-count="4"')
  if (spacing.value !== 'medium') attrs.push(`spacing="${spacing.value}"`)
  if (disabled.value) attrs.push('disabled')
  return `<VfkSwatchPicker ${attrs.join(' ')}>
  <VfkColorSwatch value="#d13438" label="Crimson" />
  <VfkColorSwatch value="#107c10" label="Green" />
  <VfkColorSwatch value="#0f6cbd" label="Fluent Blue" />
  <VfkColorSwatch value="#744da9" label="Violet" />
</VfkSwatchPicker>`
})

const sizesCode = `<VfkSwatchPicker v-model="color" size="extra-small">...</VfkSwatchPicker>
<VfkSwatchPicker v-model="color" size="small">...</VfkSwatchPicker>
<VfkSwatchPicker v-model="color" size="medium">...</VfkSwatchPicker>
<VfkSwatchPicker v-model="color" size="large">...</VfkSwatchPicker>`

const shapesCode = `<VfkSwatchPicker v-model="color" shape="square">...</VfkSwatchPicker>
<VfkSwatchPicker v-model="color" shape="rounded">...</VfkSwatchPicker>
<VfkSwatchPicker v-model="color" shape="circular">...</VfkSwatchPicker>`

const gridCode = `<VfkSwatchPicker v-model="color" layout="grid" :column-count="4" shape="rounded">
  <VfkColorSwatch value="#d13438" label="Crimson" />
  ...
</VfkSwatchPicker>`

const spacingCode = `<VfkSwatchPicker v-model="color" spacing="small">...</VfkSwatchPicker>
<VfkSwatchPicker v-model="color" spacing="medium">...</VfkSwatchPicker>`

const borderDisabledCode = `<VfkSwatchPicker v-model="color" shape="rounded">
  <VfkColorSwatch value="#ffffff" border-color="var(--colorNeutralStroke1)" label="White" />
  <VfkColorSwatch value="#0f6cbd" label="Fluent Blue" />
  <VfkColorSwatch value="#616161" label="Neutral Gray" disabled />
</VfkSwatchPicker>`

const groupDisabledCode = `<VfkSwatchPicker model-value="#0f6cbd" disabled>
  <VfkColorSwatch value="#d13438" />
  <VfkColorSwatch value="#0f6cbd" />
</VfkSwatchPicker>`

const pickerPropRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.swatchPicker.apiModelValue,
  },
  {
    name: 'size',
    type: "'extra-small' | 'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.swatchPicker.apiSize,
  },
  {
    name: 'shape',
    type: "'square' | 'rounded' | 'circular'",
    defaultValue: "'square'",
    description: messages.value.controls.swatchPicker.apiShape,
  },
  {
    name: 'layout',
    type: "'row' | 'grid'",
    defaultValue: "'row'",
    description: messages.value.controls.swatchPicker.apiLayout,
  },
  {
    name: 'columnCount',
    type: 'number',
    defaultValue: '3',
    description: messages.value.controls.swatchPicker.apiColumnCount,
  },
  {
    name: 'spacing',
    type: "'small' | 'medium'",
    defaultValue: "'medium'",
    description: messages.value.controls.swatchPicker.apiSpacing,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.swatchPicker.apiDisabled,
  },
])

const pickerEventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.swatchPicker.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: string, event: Event) => void',
    description: messages.value.controls.swatchPicker.apiChange,
  },
  {
    name: '#default',
    type: 'slot',
    description: messages.value.controls.swatchPicker.apiSlotDefault,
  },
])

const swatchRows = computed<ApiRow[]>(() => [
  {
    name: 'value',
    type: 'string',
    description: messages.value.controls.swatchPicker.apiSwatchValue,
  },
  {
    name: 'color',
    type: 'string',
    defaultValue: 'value',
    description: messages.value.controls.swatchPicker.apiSwatchColor,
  },
  {
    name: 'borderColor',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.swatchPicker.apiSwatchBorderColor,
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'value',
    description: messages.value.controls.swatchPicker.apiSwatchLabel,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.swatchPicker.apiSwatchDisabled,
  },
  {
    name: '#default',
    type: 'slot',
    description: messages.value.controls.swatchPicker.apiSwatchSlotDefault,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">SwatchPicker</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkSwatchPicker / VfkColorSwatch</span>
            <span class="demo-tag">role="radiogroup"</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.swatchPicker.desc }}</p>
      </header>

      <section id="swatch-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkSwatchPicker
              v-model="selected"
              :aria-label="messages.controls.swatchPicker.ariaLabel"
              :size="size"
              :shape="shape"
              :layout="layout"
              :column-count="4"
              :spacing="spacing"
              :disabled="disabled"
            >
              <VfkColorSwatch
                v-for="item in palette"
                :key="item.value"
                :value="item.value"
                :color="item.color"
                :label="item.label"
              />
            </VfkSwatchPicker>
          </template>

          <template #readout>
            <span>{{ messages.controls.swatchPicker.currentColor }}:</span>
            <span
              style="
                display: inline-block;
                width: 14px;
                height: 14px;
                border-radius: 3px;
                vertical-align: middle;
                border: 1px solid var(--colorNeutralStroke1);
              "
              :style="{ background: selected }"
            />
            <code class="demo-inline-code">
              {{ selected ? `${selectedLabel} (${selected})` : messages.controls.swatchPicker.emptyValue }}
            </code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sp-size">size</label>
              <select id="sp-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sp-shape">shape</label>
              <select id="sp-shape" v-model="shape" class="demo-native-select">
                <option v-for="item in shapes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sp-layout">layout</label>
              <select id="sp-layout" v-model="layout" class="demo-native-select">
                <option v-for="item in layouts" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sp-spacing">spacing</label>
              <select id="sp-spacing" v-model="spacing" class="demo-native-select">
                <option v-for="item in spacings" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="disabled" label="disabled" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="swatch-sizes-shapes" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.swatchPicker.secSizesShapes }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard :title="messages.controls.swatchPicker.cardSizesTitle" :code="sizesCode">
            <div class="demo-stack" style="gap: 14px">
              <div
                v-for="item in sizes"
                :key="item"
                class="demo-row"
                style="align-items: center; gap: 12px"
              >
                <code class="demo-inline-code" style="min-width: 96px">{{ item }}</code>
                <VfkSwatchPicker
                  v-model="sizeValues[item]"
                  :size="item"
                  shape="rounded"
                  :aria-label="item"
                >
                  <VfkColorSwatch
                    v-for="swatch in palette"
                    :key="swatch.value"
                    :value="swatch.value"
                    :color="swatch.color"
                    :label="swatch.label"
                  />
                </VfkSwatchPicker>
              </div>
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.swatchPicker.cardShapesTitle" :code="shapesCode">
            <div class="demo-stack" style="gap: 14px">
              <div
                v-for="item in shapes"
                :key="item"
                class="demo-row"
                style="align-items: center; gap: 12px"
              >
                <code class="demo-inline-code" style="min-width: 80px">{{ item }}</code>
                <VfkSwatchPicker
                  v-model="shapeValues[item]"
                  :shape="item"
                  :aria-label="item"
                >
                  <VfkColorSwatch
                    v-for="swatch in palette"
                    :key="swatch.value"
                    :value="swatch.value"
                    :color="swatch.color"
                    :label="swatch.label"
                  />
                </VfkSwatchPicker>
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="swatch-layout-spacing" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.swatchPicker.secLayoutSpacing }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard
            :title="messages.controls.swatchPicker.cardGridTitle"
            :description="messages.controls.swatchPicker.cardGridDesc"
            :code="gridCode"
          >
            <VfkSwatchPicker
              v-model="gridValue"
              layout="grid"
              :column-count="4"
              shape="rounded"
              :aria-label="messages.controls.swatchPicker.ariaLabel"
            >
              <VfkColorSwatch
                v-for="swatch in palette"
                :key="swatch.value"
                :value="swatch.value"
                :color="swatch.color"
                :label="swatch.label"
              />
              <VfkColorSwatch
                value="#ffffff"
                color="#ffffff"
                border-color="var(--colorNeutralStroke1)"
                :label="messages.controls.swatchPicker.colorWhite"
              />
            </VfkSwatchPicker>
          </DemoCard>

          <DemoCard :title="messages.controls.swatchPicker.cardSpacingTitle" :code="spacingCode">
            <div class="demo-stack" style="gap: 14px">
              <div class="demo-row" style="align-items: center; gap: 12px">
                <code class="demo-inline-code" style="min-width: 80px">small</code>
                <VfkSwatchPicker v-model="spacingSmallValue" spacing="small" shape="rounded">
                  <VfkColorSwatch
                    v-for="swatch in palette"
                    :key="swatch.value"
                    :value="swatch.value"
                    :color="swatch.color"
                    :label="swatch.label"
                  />
                </VfkSwatchPicker>
              </div>
              <div class="demo-row" style="align-items: center; gap: 12px">
                <code class="demo-inline-code" style="min-width: 80px">medium</code>
                <VfkSwatchPicker v-model="spacingMediumValue" spacing="medium" shape="rounded">
                  <VfkColorSwatch
                    v-for="swatch in palette"
                    :key="swatch.value"
                    :value="swatch.value"
                    :color="swatch.color"
                    :label="swatch.label"
                  />
                </VfkSwatchPicker>
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="swatch-states" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.swatchPicker.secStates }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard
            :title="messages.controls.swatchPicker.cardBorderDisabledTitle"
            :description="messages.controls.swatchPicker.cardBorderDisabledDesc"
            :code="borderDisabledCode"
          >
            <VfkSwatchPicker
              v-model="borderDisabledValue"
              shape="rounded"
              :aria-label="messages.controls.swatchPicker.ariaLabel"
            >
              <VfkColorSwatch
                value="#ffffff"
                color="#ffffff"
                border-color="var(--colorNeutralStroke1)"
                :label="messages.controls.swatchPicker.colorWhite"
              />
              <VfkColorSwatch
                value="#0f6cbd"
                color="#0f6cbd"
                :label="messages.controls.swatchPicker.colorBlue"
              />
              <VfkColorSwatch
                value="#616161"
                color="#616161"
                :label="messages.controls.swatchPicker.colorGray"
                disabled
              />
              <VfkColorSwatch
                value="#107c10"
                color="#107c10"
                :label="messages.controls.swatchPicker.colorGreen"
              />
            </VfkSwatchPicker>
          </DemoCard>

          <DemoCard
            :title="messages.controls.swatchPicker.cardGroupDisabledTitle"
            :code="groupDisabledCode"
          >
            <VfkSwatchPicker
              model-value="#0f6cbd"
              shape="circular"
              disabled
              :aria-label="messages.controls.swatchPicker.ariaLabel"
            >
              <VfkColorSwatch
                v-for="swatch in palette.slice(0, 5)"
                :key="swatch.value"
                :value="swatch.value"
                :color="swatch.color"
                :label="swatch.label"
              />
            </VfkSwatchPicker>
          </DemoCard>
        </div>
      </section>

      <section id="swatch-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="VfkSwatchPicker Props" :rows="pickerPropRows" />
          <DemoApiTable
            :title="`VfkSwatchPicker ${messages.controls.eventsSlots}`"
            :rows="pickerEventSlotRows"
            kind="event"
          />
          <DemoApiTable title="VfkColorSwatch Props / Slots" :rows="swatchRows" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
