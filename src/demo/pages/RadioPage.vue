<script setup lang="ts">
import { computed, ref } from 'vue'
import { VfkCheckbox, VfkRadio, VfkRadioGroup, type RadioGroupOrientation } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'radio-playground', label: messages.value.controls.playground },
  { id: 'radio-orientation', label: messages.value.controls.radio.secOrientation },
  { id: 'radio-states', label: messages.value.controls.radio.secStates },
  { id: 'radio-api', label: 'API' },
])

const selected = ref('standard')
const orientation = ref<RadioGroupOrientation>('vertical')
const disabled = ref(false)
const required = ref(false)

const horizontalVal = ref('fast')

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="selected"']
  if (orientation.value !== 'vertical') attrs.push(`orientation="${orientation.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (required.value) attrs.push('required')
  return `<VfkRadioGroup ${attrs.join(' ')}>
  <VfkRadio value="standard" label="${messages.value.controls.radio.optStandard}" />
  <VfkRadio value="fast" label="${messages.value.controls.radio.optFast}" />
  <VfkRadio value="custom" label="${messages.value.controls.radio.optCustom}" />
</VfkRadioGroup>`
})

const orientationCode = `<VfkRadioGroup v-model="val" orientation="horizontal">
  <VfkRadio value="standard" label="Standard" />
  <VfkRadio value="fast" label="Fast" />
  <VfkRadio value="custom" label="Custom" />
</VfkRadioGroup>`

const statesCode = `<VfkRadioGroup model-value="standard" disabled>
  <VfkRadio value="standard" label="Standard" />
  <VfkRadio value="fast" label="Fast" />
</VfkRadioGroup>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.radio.apiModelValue,
  },
  {
    name: 'orientation',
    type: "'vertical' | 'horizontal'",
    defaultValue: "'vertical'",
    description: messages.value.controls.radio.apiOrientation,
  },
  {
    name: 'disabled / required',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.radio.apiFlags,
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.radio.apiName,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.radio.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: string, event: Event) => void',
    description: messages.value.controls.radio.apiChange,
  },
  {
    name: 'VfkRadio (value / label / disabled)',
    type: 'component',
    description: messages.value.controls.radio.apiRadioProps,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">RadioGroup</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkRadioGroup / VfkRadio</span>
            <span class="demo-tag">&lt;fluent-radio-group&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.radio.desc }}</p>
      </header>

      <section id="radio-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkRadioGroup
              v-model="selected"
              :orientation="orientation"
              :disabled="disabled"
              :required="required"
              name="demo-strategy"
            >
              <VfkRadio value="standard" :label="messages.controls.radio.optStandard" />
              <VfkRadio value="fast" :label="messages.controls.radio.optFast" />
              <VfkRadio value="custom" :label="messages.controls.radio.optCustom" />
              <VfkRadio value="legacy" :label="messages.controls.radio.optDisabled" disabled />
            </VfkRadioGroup>
          </template>

          <template #readout>
            <span>{{ messages.controls.radio.currentValue }}:</span>
            <code class="demo-inline-code">{{ selected }}</code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="rg-orientation">orientation</label>
              <select id="rg-orientation" v-model="orientation" class="demo-native-select">
                <option value="vertical">vertical</option>
                <option value="horizontal">horizontal</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="required" label="required" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="radio-orientation" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.radio.secOrientation }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.radio.cardOrientationTitle"
          :description="messages.controls.radio.cardOrientationDesc"
          :code="orientationCode"
        >
          <VfkRadioGroup v-model="horizontalVal" orientation="horizontal" name="demo-horizontal">
            <VfkRadio value="standard" :label="messages.controls.radio.optStandard" />
            <VfkRadio value="fast" :label="messages.controls.radio.optFast" />
            <VfkRadio value="custom" :label="messages.controls.radio.optCustom" />
          </VfkRadioGroup>
        </DemoCard>
      </section>

      <section id="radio-states" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.radio.secStates }}</h2>
        </div>

        <DemoCard :title="messages.controls.radio.cardStatesTitle" :code="statesCode">
          <VfkRadioGroup model-value="standard" orientation="horizontal" disabled>
            <VfkRadio value="standard" :label="messages.controls.radio.optStandard" />
            <VfkRadio value="fast" :label="messages.controls.radio.optFast" />
          </VfkRadioGroup>
        </DemoCard>
      </section>

      <section id="radio-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="VfkRadioGroup Props" :rows="propRows" />
          <DemoApiTable :title="messages.controls.eventsSlots" :rows="eventSlotRows" kind="event" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
