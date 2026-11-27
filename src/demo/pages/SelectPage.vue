<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkButton,
  VfkCheckbox,
  VfkOption,
  VfkSelect,
  type SelectAppearance,
  type SelectSize,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'select-playground', label: messages.value.controls.playground },
  { id: 'select-appearances', label: messages.value.controls.select.secAppearances },
  { id: 'select-sizes', label: messages.value.controls.select.secSizes },
  { id: 'select-rich-disabled', label: messages.value.controls.select.secRichDisabled },
  { id: 'select-api', label: 'API' },
])

const selected = ref('prod')
const appearance = ref<SelectAppearance>('outline')
const size = ref<SelectSize>('medium')
const disabled = ref(false)
const required = ref(false)

const appearances: SelectAppearance[] = ['outline', 'transparent', 'filled-darker', 'filled-lighter']
const sizes: SelectSize[] = ['small', 'medium', 'large']

const appearanceValues = ref<Record<SelectAppearance, string>>({
  outline: 'prod',
  transparent: 'staging',
  'filled-darker': 'dev',
  'filled-lighter': 'prod',
})
const richValue = ref('prod')

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="selected"']
  if (appearance.value !== 'outline') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  attrs.push(`placeholder="${messages.value.controls.select.placeholder}"`)
  if (disabled.value) attrs.push('disabled')
  if (required.value) attrs.push('required')
  return `<VfkSelect ${attrs.join(' ')}>
  <VfkOption value="prod">${messages.value.controls.select.optProd}</VfkOption>
  <VfkOption value="staging">${messages.value.controls.select.optStaging}</VfkOption>
  <VfkOption value="dev">${messages.value.controls.select.optDev}</VfkOption>
</VfkSelect>`
})

const appearancesCode = `<VfkSelect v-model="val" appearance="outline" placeholder="Select...">...</VfkSelect>
<VfkSelect v-model="val" appearance="transparent" placeholder="Select...">...</VfkSelect>
<VfkSelect v-model="val" appearance="filled-darker" placeholder="Select...">...</VfkSelect>
<VfkSelect v-model="val" appearance="filled-lighter" placeholder="Select...">...</VfkSelect>`

const sizesCode = `<VfkSelect size="small" placeholder="Small">...</VfkSelect>
<VfkSelect size="medium" placeholder="Medium">...</VfkSelect>
<VfkSelect size="large" placeholder="Large">...</VfkSelect>`

const richCode = `<VfkSelect v-model="env" placeholder="Select environment">
  <VfkOption value="prod" text="Production">
    <template #start><SparkleIcon /></template>
    Production
    <template #description>Live traffic cluster</template>
  </VfkOption>
  <VfkOption value="legacy" disabled>Legacy (deprecated)</VfkOption>
</VfkSelect>`

const disabledCode = `<VfkSelect model-value="prod" disabled>
  <VfkOption value="prod">Production</VfkOption>
</VfkSelect>`

const selectPropRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.select.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'outline' | 'transparent' | 'filled-darker' | 'filled-lighter'",
    defaultValue: "'outline'",
    description: messages.value.controls.select.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.select.apiSize,
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.select.apiPlaceholder,
  },
  {
    name: 'disabled / required',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.select.apiFlags,
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.select.apiName,
  },
])

const selectEventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.select.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: string, event: Event) => void',
    description: messages.value.controls.select.apiChange,
  },
  {
    name: '#default',
    type: 'slot',
    description: messages.value.controls.select.apiSlotDefault,
  },
  {
    name: '#indicator',
    type: 'slot',
    description: messages.value.controls.select.apiSlotIndicator,
  },
])

const optionRows = computed<ApiRow[]>(() => [
  {
    name: 'value',
    type: 'string',
    description: messages.value.controls.select.apiOptionValue,
  },
  {
    name: 'text',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.select.apiOptionText,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.select.apiOptionDisabled,
  },
  {
    name: '#default / #start / #description / #checkedIndicator',
    type: 'slot',
    description: messages.value.controls.select.apiOptionSlots,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Select</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkSelect / VfkOption</span>
            <span class="demo-tag">&lt;fluent-dropdown&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.select.desc }}</p>
      </header>

      <section id="select-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkSelect
              v-model="selected"
              :appearance="appearance"
              :size="size"
              :placeholder="messages.controls.select.placeholder"
              :disabled="disabled"
              :required="required"
              style="width: 100%; max-width: 280px"
            >
              <VfkOption value="prod">{{ messages.controls.select.optProd }}</VfkOption>
              <VfkOption value="staging">{{ messages.controls.select.optStaging }}</VfkOption>
              <VfkOption value="dev">{{ messages.controls.select.optDev }}</VfkOption>
              <VfkOption value="legacy" disabled>{{ messages.controls.select.optLegacy }}</VfkOption>
            </VfkSelect>
          </template>

          <template #readout>
            <span>{{ messages.controls.select.currentValue }}:</span>
            <code class="demo-inline-code">
              {{ selected || messages.controls.select.emptyValue }}
            </code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sel-appearance">appearance</label>
              <select id="sel-appearance" v-model="appearance" class="demo-native-select">
                <option v-for="item in appearances" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sel-size">size</label>
              <select id="sel-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <span class="demo-control-field__label">value</span>
              <VfkButton appearance="outline" size="small" @click="selected = ''">
                {{ messages.controls.select.clearSelection }}
              </VfkButton>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="required" label="required" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="select-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.select.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.select.cardAppearancesTitle"
          :description="messages.controls.select.cardAppearancesDesc"
          :code="appearancesCode"
        >
          <div class="demo-field-grid">
            <VfkSelect
              v-for="item in appearances"
              :key="item"
              v-model="appearanceValues[item]"
              :appearance="item"
              :placeholder="item"
            >
              <VfkOption value="prod">{{ messages.controls.select.optProd }}</VfkOption>
              <VfkOption value="staging">{{ messages.controls.select.optStaging }}</VfkOption>
              <VfkOption value="dev">{{ messages.controls.select.optDev }}</VfkOption>
            </VfkSelect>
          </div>
        </DemoCard>
      </section>

      <section id="select-sizes" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.select.secSizes }}</h2>
        </div>

        <DemoCard :title="messages.controls.select.cardSizesTitle" :code="sizesCode">
          <div class="demo-field-grid">
            <VfkSelect size="small" placeholder="Small">
              <VfkOption value="prod">{{ messages.controls.select.optProd }}</VfkOption>
              <VfkOption value="dev">{{ messages.controls.select.optDev }}</VfkOption>
            </VfkSelect>
            <VfkSelect size="medium" placeholder="Medium">
              <VfkOption value="prod">{{ messages.controls.select.optProd }}</VfkOption>
              <VfkOption value="dev">{{ messages.controls.select.optDev }}</VfkOption>
            </VfkSelect>
            <VfkSelect size="large" placeholder="Large">
              <VfkOption value="prod">{{ messages.controls.select.optProd }}</VfkOption>
              <VfkOption value="dev">{{ messages.controls.select.optDev }}</VfkOption>
            </VfkSelect>
          </div>
        </DemoCard>
      </section>

      <section id="select-rich-disabled" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.select.secRichDisabled }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard
            :title="messages.controls.select.cardRichTitle"
            :description="messages.controls.select.cardRichDesc"
            :code="richCode"
          >
            <VfkSelect
              v-model="richValue"
              :placeholder="messages.controls.select.placeholder"
              style="width: 100%; max-width: 320px"
            >
              <VfkOption value="prod" :text="messages.controls.select.optProd">
                <template #start><DemoIcons name="sparkle" :size="15" /></template>
                {{ messages.controls.select.optProd }}
                <template #description>{{ messages.controls.select.optProdDesc }}</template>
              </VfkOption>
              <VfkOption value="staging" :text="messages.controls.select.optStaging">
                <template #start><DemoIcons name="layers" :size="15" /></template>
                {{ messages.controls.select.optStaging }}
                <template #description>{{ messages.controls.select.optStagingDesc }}</template>
              </VfkOption>
              <VfkOption value="dev" :text="messages.controls.select.optDev">
                <template #start><DemoIcons name="code" :size="15" /></template>
                {{ messages.controls.select.optDev }}
                <template #description>{{ messages.controls.select.optDevDesc }}</template>
              </VfkOption>
              <VfkOption value="legacy" :text="messages.controls.select.optLegacy" disabled>
                {{ messages.controls.select.optLegacy }}
                <template #description>{{ messages.controls.select.optLegacyDesc }}</template>
              </VfkOption>
            </VfkSelect>
          </DemoCard>

          <DemoCard :title="messages.controls.select.cardDisabledTitle" :code="disabledCode">
            <VfkSelect model-value="prod" disabled style="width: 100%; max-width: 280px">
              <VfkOption value="prod">{{ messages.controls.select.optProd }}</VfkOption>
              <VfkOption value="dev">{{ messages.controls.select.optDev }}</VfkOption>
            </VfkSelect>
          </DemoCard>
        </div>
      </section>

      <section id="select-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="VfkSelect Props" :rows="selectPropRows" />
          <DemoApiTable
            :title="`VfkSelect ${messages.controls.eventsSlots}`"
            :rows="selectEventSlotRows"
            kind="event"
          />
          <DemoApiTable title="VfkOption Props / Slots" :rows="optionRows" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
