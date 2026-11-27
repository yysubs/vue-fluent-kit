<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkCheckbox,
  VfkField,
  VfkInput,
  VfkOption,
  VfkRadio,
  VfkRadioGroup,
  VfkSelect,
  VfkSwitch,
  type FieldOrientation,
  type FieldSize,
  type FieldValidationState,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'field-playground', label: messages.value.controls.playground },
  { id: 'field-validation', label: messages.value.controls.field.secValidation },
  { id: 'field-form', label: messages.value.controls.field.secForm },
  { id: 'field-api', label: 'API' },
])

const sampleVal = ref('vue-fluent-kit')
const orientation = ref<FieldOrientation>('vertical')
const size = ref<FieldSize>('medium')
const validationState = ref<FieldValidationState>('error')
const required = ref(true)
const disabled = ref(false)
const showHint = ref(true)

const formName = ref('vfk-preview')
const formEnv = ref('prod')
const formStrategy = ref('standard')
const formAutoDeploy = ref(true)

const validationMessage = computed(() => {
  if (validationState.value === 'error') return messages.value.controls.field.sampleError
  if (validationState.value === 'warning') return messages.value.controls.field.sampleWarning
  if (validationState.value === 'success') return messages.value.controls.field.sampleSuccess
  return undefined
})

const playgroundCode = computed(() => {
  const attrs: string[] = [`label="${messages.value.controls.field.sampleLabel}"`]
  if (orientation.value !== 'vertical') attrs.push(`orientation="${orientation.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (required.value) attrs.push('required')
  if (disabled.value) attrs.push('disabled')
  if (validationState.value !== 'none') {
    attrs.push(`validation-state="${validationState.value}"`)
    attrs.push(`validation-message="${validationMessage.value}"`)
  }
  if (showHint.value) attrs.push(`hint="${messages.value.controls.field.sampleHint}"`)
  return `<VfkField ${attrs.join(' ')}>\n  <VfkInput v-model="value" />\n</VfkField>`
})

const validationCode = `<VfkField label="Error" validation-state="error" validation-message="Invalid format" required>
  <VfkInput model-value="bad@input" />
</VfkField>
<VfkField label="Warning" validation-state="warning" validation-message="Recommended length >= 8">
  <VfkInput model-value="vfk" />
</VfkField>
<VfkField label="Success" validation-state="success" validation-message="Available">
  <VfkInput model-value="vue-fluent-kit" />
</VfkField>`

const formCode = `<VfkField label="Project" orientation="horizontal" required hint="Lowercase letters and hyphens">
  <VfkInput v-model="name" />
</VfkField>
<VfkField label="Environment" orientation="horizontal">
  <VfkSelect v-model="env">...</VfkSelect>
</VfkField>
<VfkField label="Strategy" orientation="horizontal">
  <VfkRadioGroup v-model="strategy" orientation="horizontal">...</VfkRadioGroup>
</VfkField>
<VfkField label="Auto Deploy" orientation="horizontal">
  <VfkSwitch v-model="autoDeploy" />
</VfkField>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.field.apiLabel,
  },
  {
    name: 'for',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.field.apiFor,
  },
  {
    name: 'orientation',
    type: "'vertical' | 'horizontal'",
    defaultValue: "'vertical'",
    description: messages.value.controls.field.apiOrientation,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.field.apiSize,
  },
  {
    name: 'required / disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.field.apiFlags,
  },
  {
    name: 'validationState',
    type: "'none' | 'error' | 'warning' | 'success'",
    defaultValue: "'none'",
    description: messages.value.controls.field.apiValidationState,
  },
  {
    name: 'validationMessage',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.field.apiValidationMessage,
  },
  {
    name: 'hint',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.field.apiHint,
  },
])

const slotRows = computed<ApiRow[]>(() => [
  {
    name: '#default / #label / #validationMessage / #hint',
    type: 'slot',
    description: messages.value.controls.field.apiSlots,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Field</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkField</span>
            <span class="demo-tag">&lt;fluent-field&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.field.desc }}</p>
      </header>

      <section id="field-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkField
              :label="messages.controls.field.sampleLabel"
              for="demo-field-input"
              :orientation="orientation"
              :size="size"
              :required="required"
              :disabled="disabled"
              :validation-state="validationState"
              :validation-message="validationMessage"
              :hint="showHint ? messages.controls.field.sampleHint : undefined"
              style="max-width: 380px"
            >
              <VfkInput
                id="demo-field-input"
                v-model="sampleVal"
                :disabled="disabled"
                style="width: 100%"
              />
            </VfkField>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="fld-orientation">orientation</label>
              <select id="fld-orientation" v-model="orientation" class="demo-native-select">
                <option value="vertical">vertical</option>
                <option value="horizontal">horizontal</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="fld-size">size</label>
              <select id="fld-size" v-model="size" class="demo-native-select">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="fld-state">validationState</label>
              <select id="fld-state" v-model="validationState" class="demo-native-select">
                <option value="none">none</option>
                <option value="error">error</option>
                <option value="warning">warning</option>
                <option value="success">success</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="required" label="required" />
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="showHint" label="hint" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="field-validation" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.field.secValidation }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.field.cardValidationTitle"
          :description="messages.controls.field.cardValidationDesc"
          :code="validationCode"
        >
          <div class="demo-field-grid">
            <VfkField
              label="Error"
              required
              validation-state="error"
              :validation-message="messages.controls.field.sampleError"
            >
              <VfkInput model-value="bad@slug" style="width: 100%" />
            </VfkField>
            <VfkField
              label="Warning"
              validation-state="warning"
              :validation-message="messages.controls.field.sampleWarning"
            >
              <VfkInput model-value="vfk" style="width: 100%" />
            </VfkField>
            <VfkField
              label="Success"
              validation-state="success"
              :validation-message="messages.controls.field.sampleSuccess"
            >
              <VfkInput model-value="vue-fluent-kit" style="width: 100%" />
            </VfkField>
            <VfkField label="Hint only" :hint="messages.controls.field.sampleHint">
              <VfkInput model-value="my-app" style="width: 100%" />
            </VfkField>
          </div>
        </DemoCard>
      </section>

      <section id="field-form" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.field.secForm }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.field.cardFormTitle"
          :description="messages.controls.field.cardFormDesc"
          :code="formCode"
        >
          <div class="demo-stack" style="max-width: 520px">
            <VfkField
              :label="messages.controls.field.formNameLabel"
              orientation="horizontal"
              required
              :hint="messages.controls.field.formNameHint"
            >
              <VfkInput
                v-model="formName"
                :placeholder="messages.controls.field.formNamePlaceholder"
                style="width: 100%"
              />
            </VfkField>

            <VfkField :label="messages.controls.field.formEnvLabel" orientation="horizontal">
              <VfkSelect v-model="formEnv" style="width: 100%">
                <VfkOption value="prod">{{ messages.controls.select.optProd }}</VfkOption>
                <VfkOption value="staging">{{ messages.controls.select.optStaging }}</VfkOption>
                <VfkOption value="dev">{{ messages.controls.select.optDev }}</VfkOption>
              </VfkSelect>
            </VfkField>

            <VfkField :label="messages.controls.field.formStrategyLabel" orientation="horizontal">
              <VfkRadioGroup v-model="formStrategy" orientation="horizontal">
                <VfkRadio value="standard" :label="messages.controls.radio.optStandard" />
                <VfkRadio value="fast" :label="messages.controls.radio.optFast" />
              </VfkRadioGroup>
            </VfkField>

            <VfkField :label="messages.controls.field.formAutoDeployLabel" orientation="horizontal">
              <VfkSwitch v-model="formAutoDeploy" :label="messages.controls.switch.sampleLabel" />
            </VfkField>
          </div>
        </DemoCard>
      </section>

      <section id="field-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="Props" :rows="propRows" />
          <DemoApiTable :title="messages.controls.eventsSlots" :rows="slotRows" kind="event" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
