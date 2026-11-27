<script setup lang="ts">
import { computed, ref } from 'vue'
import { VfkCheckbox, VfkSwitch, type SwitchLabelPosition } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'switch-playground', label: messages.value.controls.playground },
  { id: 'switch-basic', label: messages.value.controls.switch.secBasic },
  { id: 'switch-states', label: messages.value.controls.switch.secStates },
  { id: 'switch-api', label: 'API' },
])

const checked = ref(true)
const labelPosition = ref<SwitchLabelPosition>('after')
const disabled = ref(false)
const required = ref(false)

const autoSync = ref(true)
const beforeSwitch = ref(false)

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="checked"']
  attrs.push(`label="${messages.value.controls.switch.sampleLabel}"`)
  if (labelPosition.value !== 'after') attrs.push(`label-position="${labelPosition.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (required.value) attrs.push('required')
  return `<VfkSwitch ${attrs.join(' ')} />`
})

const basicCode = `<VfkSwitch v-model="autoSync" label="Auto sync" />
<VfkSwitch v-model="beforeSwitch" label="Label before" label-position="before" />`

const statesCode = `<VfkSwitch :model-value="true" label="Disabled (On)" disabled />
<VfkSwitch :model-value="false" label="Disabled (Off)" disabled />
<VfkSwitch :model-value="false" label="Required option" required />`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.switch.apiModelValue,
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.switch.apiLabel,
  },
  {
    name: 'labelPosition',
    type: "'after' | 'before'",
    defaultValue: "'after'",
    description: messages.value.controls.switch.apiLabelPosition,
  },
  {
    name: 'disabled / required',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.switch.apiFlags,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: messages.value.controls.switch.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: boolean, event: Event) => void',
    description: messages.value.controls.switch.apiChange,
  },
  {
    name: '#default',
    type: 'slot',
    description: messages.value.controls.switch.apiSlotDefault,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Switch</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkSwitch</span>
            <span class="demo-tag">&lt;fluent-switch&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.switch.desc }}</p>
      </header>

      <section id="switch-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkSwitch
              v-model="checked"
              :label="messages.controls.switch.sampleLabel"
              :label-position="labelPosition"
              :disabled="disabled"
              :required="required"
            />
          </template>

          <template #readout>
            <span>{{ messages.controls.switch.stateLabel }}:</span>
            <code class="demo-inline-code">
              {{ checked ? messages.controls.switch.stateOn : messages.controls.switch.stateOff }}
            </code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sw-label-pos">labelPosition</label>
              <select id="sw-label-pos" v-model="labelPosition" class="demo-native-select">
                <option value="after">after</option>
                <option value="before">before</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="required" label="required" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="switch-basic" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.switch.secBasic }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.switch.cardBasicTitle"
          :description="messages.controls.switch.cardBasicDesc"
          :code="basicCode"
        >
          <div class="demo-row">
            <VfkSwitch v-model="autoSync" :label="messages.controls.switch.sampleLabel" />
            <VfkSwitch
              v-model="beforeSwitch"
              :label="messages.controls.switch.labelBefore"
              label-position="before"
            />
          </div>
        </DemoCard>
      </section>

      <section id="switch-states" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.switch.secStates }}</h2>
        </div>

        <DemoCard :title="messages.controls.switch.cardStatesTitle" :code="statesCode">
          <div class="demo-row">
            <VfkSwitch :model-value="true" :label="messages.controls.switch.disabledOn" disabled />
            <VfkSwitch :model-value="false" :label="messages.controls.switch.disabledOff" disabled />
            <VfkSwitch :model-value="false" :label="messages.controls.switch.requiredLabel" required />
          </div>
        </DemoCard>
      </section>

      <section id="switch-api" class="demo-section">
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
