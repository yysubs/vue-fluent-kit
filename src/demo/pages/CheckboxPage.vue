<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VCheckbox,
  type CheckboxLabelPosition,
  type CheckboxShape,
  type CheckboxSize,
  type CheckboxValue,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'checkbox-playground', label: messages.value.controls.playground },
  { id: 'checkbox-tristate', label: messages.value.controls.checkbox.secTristate },
  { id: 'checkbox-variants', label: messages.value.controls.checkbox.secVariants },
  { id: 'checkbox-api', label: 'API' },
])

const checked = ref<CheckboxValue>(true)
const shape = ref<CheckboxShape>('square')
const size = ref<CheckboxSize>('medium')
const labelPosition = ref<CheckboxLabelPosition>('after')
const disabled = ref(false)
const required = ref(false)

const childOptions = ref([true, false, true])

const allState = computed<CheckboxValue>(() => {
  const count = childOptions.value.filter(Boolean).length
  if (count === 0) return false
  if (count === childOptions.value.length) return true
  return 'mixed'
})

function handleSelectAll(next: boolean) {
  childOptions.value = childOptions.value.map(() => next)
}

const playgroundCode = computed(() => {
  const attrs = ['v-model="checked"']
  if (shape.value !== 'square') attrs.push(`shape="${shape.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (labelPosition.value !== 'after') attrs.push(`label-position="${labelPosition.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (required.value) attrs.push('required')
  attrs.push(`label="${messages.value.controls.checkbox.sampleLabel}"`)
  return `<VCheckbox ${attrs.join(' ')} />`
})

const tristateCode = `<VCheckbox :model-value="allState" label="Select all" @update:model-value="handleSelectAll" />
<VCheckbox v-model="options[0]" label="Option A" />
<VCheckbox v-model="options[1]" label="Option B" />
<VCheckbox v-model="options[2]" label="Option C" />`

const variantCode = `<VCheckbox :model-value="true" size="medium" label="Medium" />
<VCheckbox :model-value="true" size="large" label="Large" />
<VCheckbox :model-value="true" shape="circular" label="Circular" />
<VCheckbox :model-value="true" label-position="before" label="Label Before" />`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: "boolean | 'mixed'",
    defaultValue: 'false',
    description: messages.value.controls.checkbox.apiModelValue,
  },
  {
    name: 'shape',
    type: "'square' | 'circular'",
    defaultValue: "'square'",
    description: messages.value.controls.checkbox.apiShape,
  },
  {
    name: 'size',
    type: "'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.checkbox.apiSize,
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.checkbox.apiLabel,
  },
  {
    name: 'labelPosition',
    type: "'after' | 'before'",
    defaultValue: "'after'",
    description: messages.value.controls.checkbox.apiLabelPosition,
  },
  {
    name: 'disabled / required',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.checkbox.apiFlags,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  { name: '@update:modelValue', type: '(value: boolean) => void', description: messages.value.controls.checkbox.apiUpdate },
  { name: '@change', type: '(value: boolean, event: Event) => void', description: messages.value.controls.checkbox.apiChange },
  { name: '#default', type: 'slot', description: messages.value.controls.checkbox.apiSlotDefault },
  { name: '#checkedIndicator / #indeterminateIndicator', type: 'slot', description: messages.value.controls.checkbox.apiSlotIndicator },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Checkbox</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VCheckbox</span>
            <span class="demo-tag">&lt;fluent-checkbox&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.checkbox.desc }}</p>
      </header>

      <section id="checkbox-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VCheckbox
              v-model="checked"
              :shape="shape"
              :size="size"
              :label-position="labelPosition"
              :disabled="disabled"
              :required="required"
              :label="messages.controls.checkbox.sampleLabel"
            />
          </template>

          <template #readout>
            <span>v-model: <code class="demo-inline-code">{{ JSON.stringify(checked) }}</code></span>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="cb-shape">shape</label>
              <select id="cb-shape" v-model="shape" class="demo-native-select">
                <option value="square">square</option>
                <option value="circular">circular</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="cb-size">size</label>
              <select id="cb-size" v-model="size" class="demo-native-select">
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="cb-label-pos">labelPosition</label>
              <select id="cb-label-pos" v-model="labelPosition" class="demo-native-select">
                <option value="after">after</option>
                <option value="before">before</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VCheckbox v-model="disabled" label="disabled" />
              <VCheckbox v-model="required" label="required" />
              <button
                type="button"
                class="demo-btn demo-btn--subtle demo-btn--small"
                @click="checked = 'mixed'"
              >
                {{ messages.controls.checkbox.setMixed }}
              </button>
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="checkbox-tristate" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.checkbox.secTristate }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.checkbox.cardTristateTitle"
          :description="messages.controls.checkbox.cardTristateDesc"
          :code="tristateCode"
          full
        >
          <div class="demo-stack">
            <VCheckbox
              :model-value="allState"
              :label="messages.controls.checkbox.selectAll"
              @update:model-value="handleSelectAll"
            />
            <div class="demo-row" style="padding-inline-start: 24px">
              <VCheckbox v-model="childOptions[0]" :label="messages.controls.checkbox.optA" />
              <VCheckbox v-model="childOptions[1]" :label="messages.controls.checkbox.optB" />
              <VCheckbox v-model="childOptions[2]" :label="messages.controls.checkbox.optC" />
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="checkbox-variants" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.checkbox.secVariants }}</h2>
        </div>

        <div class="demo-cards-grid">
          <DemoCard :title="messages.controls.checkbox.cardSizesShapesTitle" :code="variantCode">
            <div class="demo-stack">
              <VCheckbox :model-value="true" size="medium" label="Medium (16px)" />
              <VCheckbox :model-value="true" size="large" label="Large (20px)" />
              <VCheckbox :model-value="true" shape="circular" label="Circular" />
              <VCheckbox
                :model-value="true"
                label-position="before"
                :label="messages.controls.checkbox.labelBefore"
              />
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.checkbox.cardDisabledTitle">
            <div class="demo-stack">
              <VCheckbox :model-value="false" disabled label="Disabled Unchecked" />
              <VCheckbox :model-value="true" disabled label="Disabled Checked" />
              <VCheckbox model-value="mixed" disabled label="Disabled Mixed" />
              <VCheckbox :model-value="false" required :label="messages.controls.checkbox.requiredLabel" />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="checkbox-api" class="demo-section">
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
