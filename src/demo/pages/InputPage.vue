<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VButton,
  VCheckbox,
  VInput,
  type InputAppearance,
  type InputSize,
  type InputType,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'input-playground', label: messages.value.controls.playground },
  { id: 'input-appearances', label: messages.value.controls.input.secAppearances },
  { id: 'input-sizes-slots', label: messages.value.controls.input.secSizesSlots },
  { id: 'input-states', label: messages.value.controls.input.secStates },
  { id: 'input-api', label: 'API' },
])

const modelValue = ref('vue-fluent-kit')
const appearance = ref<InputAppearance>('outline')
const size = ref<InputSize>('medium')
const type = ref<InputType>('text')
const disabled = ref(false)
const readonly = ref(false)
const withLabel = ref(true)
const withStart = ref(true)

const passwordValue = ref('Fluent2@2026')
const showPassword = ref(false)
const searchText = ref('')

const appearances: InputAppearance[] = ['outline', 'underline', 'filled-darker', 'filled-lighter']
const sizes: InputSize[] = ['small', 'medium', 'large']
const types: InputType[] = ['text', 'email', 'password', 'tel', 'url']

const playgroundCode = computed(() => {
  const attrs = ['v-model="value"']
  if (appearance.value !== 'outline') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (type.value !== 'text') attrs.push(`type="${type.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (readonly.value) attrs.push('readonly')
  attrs.push(`placeholder="${messages.value.controls.input.placeholder}"`)
  const openTag = `<VInput ${attrs.join(' ')}>`
  if (!withLabel.value && !withStart.value) {
    return `<VInput ${attrs.join(' ')} />`
  }
  const lines = [openTag]
  if (withLabel.value) lines.push(`  ${messages.value.controls.input.fieldLabel}`)
  if (withStart.value) lines.push('  <template #start><SearchIcon /></template>')
  lines.push('</VInput>')
  return lines.join('\n')
})

const appearanceCode = `<VInput appearance="outline" placeholder="Outline" />
<VInput appearance="underline" placeholder="Underline" />
<VInput appearance="filled-darker" placeholder="Filled Darker" />
<VInput appearance="filled-lighter" placeholder="Filled Lighter" />`

const slotsCode = `<VInput v-model="search" placeholder="Search...">
  <template #start><SearchIcon /></template>
  <template #end>
    <VButton appearance="transparent" size="small" @click="search = ''">Clear</VButton>
  </template>
</VInput>`

const stateCode = `<VInput model-value="Read-only value" readonly />
<VInput model-value="Disabled value" disabled />`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.input.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'outline' | 'underline' | 'filled-darker' | 'filled-lighter'",
    defaultValue: "'outline'",
    description: messages.value.controls.input.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.input.apiSize,
  },
  {
    name: 'type',
    type: "'text' | 'email' | 'password' | 'tel' | 'url'",
    defaultValue: "'text'",
    description: messages.value.controls.input.apiType,
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.input.apiPlaceholder,
  },
  {
    name: 'disabled / readonly / required',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.input.apiFlags,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  { name: '@update:modelValue', type: '(value: string) => void', description: messages.value.controls.input.apiUpdate },
  { name: '@change', type: '(value: string, event: Event) => void', description: messages.value.controls.input.apiChange },
  { name: '#default', type: 'slot', description: messages.value.controls.input.apiSlotDefault },
  { name: '#start / #end', type: 'slot', description: messages.value.controls.input.apiSlotStartEnd },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Input</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VInput</span>
            <span class="demo-tag">&lt;fluent-text-input&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.input.desc }}</p>
      </header>

      <section id="input-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VInput
              v-model="modelValue"
              :appearance="appearance"
              :size="size"
              :type="type"
              :disabled="disabled"
              :readonly="readonly"
              :placeholder="messages.controls.input.placeholder"
              style="width: 280px"
            >
              <template v-if="withLabel">{{ messages.controls.input.fieldLabel }}</template>
              <template v-if="withStart" #start>
                <DemoIcons name="sparkle" :size="15" />
              </template>
            </VInput>
          </template>

          <template #readout>
            <span>v-model: <code class="demo-inline-code">{{ JSON.stringify(modelValue) }}</code></span>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="input-appearance">appearance</label>
              <select id="input-appearance" v-model="appearance" class="demo-native-select">
                <option v-for="item in appearances" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="input-size">size (control-size)</label>
              <select id="input-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="input-type">type</label>
              <select id="input-type" v-model="type" class="demo-native-select">
                <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VCheckbox v-model="withLabel" label="#default (label)" />
              <VCheckbox v-model="withStart" label="#start" />
              <VCheckbox v-model="disabled" label="disabled" />
              <VCheckbox v-model="readonly" label="readonly" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="input-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.input.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.input.cardAppearancesTitle"
          :description="messages.controls.input.cardAppearancesDesc"
          :code="appearanceCode"
          tinted
          full
        >
          <div class="demo-field-grid">
            <VInput appearance="outline" placeholder="Outline">Outline</VInput>
            <VInput appearance="underline" placeholder="Underline">Underline</VInput>
            <VInput appearance="filled-darker" placeholder="Filled Darker">Filled Darker</VInput>
            <VInput appearance="filled-lighter" placeholder="Filled Lighter">Filled Lighter</VInput>
          </div>
        </DemoCard>
      </section>

      <section id="input-sizes-slots" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.input.secSizesSlots }}</h2>
        </div>

        <div class="demo-cards-grid">
          <DemoCard :title="messages.controls.input.cardSizesTitle">
            <div class="demo-stack">
              <VInput size="small" placeholder="Small (24px)" />
              <VInput size="medium" placeholder="Medium (32px)" />
              <VInput size="large" placeholder="Large (40px)" />
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.input.cardSlotsTitle" :code="slotsCode">
            <div class="demo-stack">
              <VInput v-model="searchText" :placeholder="messages.controls.input.searchPlaceholder">
                <template #start><DemoIcons name="search" :size="15" /></template>
                <template v-if="searchText" #end>
                  <VButton
                    appearance="transparent"
                    size="small"
                    :aria-label="messages.shell.clearSearchAriaLabel"
                    @click="searchText = ''"
                  >
                    <template #start><DemoIcons name="close" :size="12" /></template>
                  </VButton>
                </template>
              </VInput>

              <VInput
                v-model="passwordValue"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="messages.controls.input.passwordPlaceholder"
              >
                <template #end>
                  <VButton
                    appearance="transparent"
                    size="small"
                    :aria-label="messages.controls.input.togglePasswordAria"
                    @click="showPassword = !showPassword"
                  >
                    <template #start>
                      <DemoIcons :name="showPassword ? 'eye-off' : 'eye'" :size="15" />
                    </template>
                  </VButton>
                </template>
              </VInput>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="input-states" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.input.secStates }}</h2>
        </div>

        <DemoCard :title="messages.controls.input.cardStatesTitle" :code="stateCode" full>
          <div class="demo-field-grid">
            <VInput :model-value="messages.controls.input.readonlySample" readonly>Readonly</VInput>
            <VInput :model-value="messages.controls.input.disabledSample" disabled>Disabled</VInput>
          </div>
        </DemoCard>
      </section>

      <section id="input-api" class="demo-section">
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
