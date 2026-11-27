<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkButton,
  VfkCheckbox,
  VfkCombobox,
  VfkOption,
  type ComboboxAppearance,
  type ComboboxSize,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'combobox-playground', label: messages.value.controls.playground },
  { id: 'combobox-appearances', label: messages.value.controls.combobox.secAppearances },
  { id: 'combobox-sizes', label: messages.value.controls.combobox.secSizes },
  { id: 'combobox-filter-freeform', label: messages.value.controls.combobox.secFilterFreeform },
  { id: 'combobox-rich-disabled', label: messages.value.controls.combobox.secRichDisabled },
  { id: 'combobox-api', label: 'API' },
])

const selected = ref('vue')
const lastQuery = ref('')
const appearance = ref<ComboboxAppearance>('outline')
const size = ref<ComboboxSize>('medium')
const filter = ref(true)
const freeform = ref(false)
const disabled = ref(false)
const required = ref(false)

const appearances: ComboboxAppearance[] = [
  'outline',
  'transparent',
  'filled-darker',
  'filled-lighter',
]
const sizes: ComboboxSize[] = ['small', 'medium', 'large']

const appearanceValues = ref<Record<ComboboxAppearance, string>>({
  outline: 'vue',
  transparent: 'vite',
  'filled-darker': 'react',
  'filled-lighter': 'svelte',
})

const filterValue = ref('vue')
const freeformValue = ref('vue')
const richValue = ref('vue')

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="selected"']
  if (appearance.value !== 'outline') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  attrs.push(`placeholder="${messages.value.controls.combobox.placeholder}"`)
  if (!filter.value) attrs.push(':filter="false"')
  if (freeform.value) attrs.push('freeform')
  if (disabled.value) attrs.push('disabled')
  if (required.value) attrs.push('required')
  const freeformSlot = freeform.value
    ? `\n  <template #freeform>${messages.value.controls.combobox.freeformPrefix}</template>`
    : ''
  return `<VfkCombobox ${attrs.join(' ')}>${freeformSlot}
  <VfkOption value="vue">Vue</VfkOption>
  <VfkOption value="vite">Vite</VfkOption>
  <VfkOption value="react">React</VfkOption>
  <VfkOption value="svelte">Svelte</VfkOption>
</VfkCombobox>`
})

const appearancesCode = `<VfkCombobox v-model="val" appearance="outline" placeholder="Type...">...</VfkCombobox>
<VfkCombobox v-model="val" appearance="transparent" placeholder="Type...">...</VfkCombobox>
<VfkCombobox v-model="val" appearance="filled-darker" placeholder="Type...">...</VfkCombobox>
<VfkCombobox v-model="val" appearance="filled-lighter" placeholder="Type...">...</VfkCombobox>`

const sizesCode = `<VfkCombobox size="small" placeholder="Small">...</VfkCombobox>
<VfkCombobox size="medium" placeholder="Medium">...</VfkCombobox>
<VfkCombobox size="large" placeholder="Large">...</VfkCombobox>`

const filterCode = `<VfkCombobox v-model="framework" placeholder="Type v...">
  <VfkOption value="vue">Vue</VfkOption>
  <VfkOption value="vite">Vite</VfkOption>
  <VfkOption value="react">React</VfkOption>
  <VfkOption value="svelte">Svelte</VfkOption>
  <VfkOption value="angular">Angular</VfkOption>
</VfkCombobox>`

const freeformCode = `<VfkCombobox v-model="tag" freeform placeholder="Type any tag...">
  <template #freeform>Use: </template>
  <VfkOption value="vue">Vue</VfkOption>
  <VfkOption value="vite">Vite</VfkOption>
  <VfkOption value="react">React</VfkOption>
</VfkCombobox>`

const richCode = `<VfkCombobox v-model="framework" placeholder="Choose framework">
  <VfkOption value="vue" text="Vue">
    <template #start><SparkleIcon /></template>
    Vue
    <template #description>Progressive frontend framework</template>
  </VfkOption>
  <VfkOption value="legacy" disabled>Legacy (deprecated)</VfkOption>
</VfkCombobox>`

const disabledCode = `<VfkCombobox model-value="vue" disabled>
  <VfkOption value="vue">Vue</VfkOption>
</VfkCombobox>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.combobox.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'outline' | 'transparent' | 'filled-darker' | 'filled-lighter'",
    defaultValue: "'outline'",
    description: messages.value.controls.combobox.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.combobox.apiSize,
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.combobox.apiPlaceholder,
  },
  {
    name: 'filter',
    type: 'boolean',
    defaultValue: 'true',
    description: messages.value.controls.combobox.apiFilter,
  },
  {
    name: 'freeform',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.combobox.apiFreeform,
  },
  {
    name: 'disabled / required',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.combobox.apiFlags,
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.combobox.apiName,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.combobox.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: string, event: Event) => void',
    description: messages.value.controls.combobox.apiChange,
  },
  {
    name: '@input',
    type: '(query: string, event: Event) => void',
    description: messages.value.controls.combobox.apiInput,
  },
  {
    name: '#default',
    type: 'slot',
    description: messages.value.controls.combobox.apiSlotDefault,
  },
  {
    name: '#indicator',
    type: 'slot',
    description: messages.value.controls.combobox.apiSlotIndicator,
  },
  {
    name: '#freeform',
    type: 'slot',
    description: messages.value.controls.combobox.apiSlotFreeform,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Combobox</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkCombobox / VfkOption</span>
            <span class="demo-tag">&lt;fluent-dropdown type="combobox"&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.combobox.desc }}</p>
      </header>

      <section id="combobox-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkCombobox
              v-model="selected"
              :appearance="appearance"
              :size="size"
              :placeholder="messages.controls.combobox.placeholder"
              :filter="filter"
              :freeform="freeform"
              :disabled="disabled"
              :required="required"
              style="width: 100%; max-width: 280px"
              @input="(q) => (lastQuery = q)"
            >
              <template #freeform>{{ messages.controls.combobox.freeformPrefix }}</template>
              <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
              <VfkOption value="vite">{{ messages.controls.combobox.optVite }}</VfkOption>
              <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
              <VfkOption value="svelte">{{ messages.controls.combobox.optSvelte }}</VfkOption>
              <VfkOption value="angular">{{ messages.controls.combobox.optAngular }}</VfkOption>
              <VfkOption value="legacy" disabled>{{ messages.controls.combobox.optLegacy }}</VfkOption>
            </VfkCombobox>
          </template>

          <template #readout>
            <span>{{ messages.controls.combobox.currentValue }}:</span>
            <code class="demo-inline-code">
              {{ selected || messages.controls.combobox.emptyValue }}
            </code>
            <span v-if="lastQuery" style="margin-inline-start: 12px">
              {{ messages.controls.combobox.lastInput }}:
              <code class="demo-inline-code">{{ lastQuery }}</code>
            </span>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="cb-appearance">appearance</label>
              <select id="cb-appearance" v-model="appearance" class="demo-native-select">
                <option v-for="item in appearances" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="cb-size">size</label>
              <select id="cb-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <span class="demo-control-field__label">value</span>
              <VfkButton appearance="outline" size="small" @click="selected = ''">
                {{ messages.controls.combobox.clearSelection }}
              </VfkButton>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="filter" label="filter" />
              <VfkCheckbox v-model="freeform" label="freeform" />
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="required" label="required" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="combobox-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.combobox.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.combobox.cardAppearancesTitle"
          :description="messages.controls.combobox.cardAppearancesDesc"
          :code="appearancesCode"
        >
          <div class="demo-field-grid">
            <VfkCombobox
              v-for="item in appearances"
              :key="item"
              v-model="appearanceValues[item]"
              :appearance="item"
              :placeholder="item"
            >
              <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
              <VfkOption value="vite">{{ messages.controls.combobox.optVite }}</VfkOption>
              <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
              <VfkOption value="svelte">{{ messages.controls.combobox.optSvelte }}</VfkOption>
            </VfkCombobox>
          </div>
        </DemoCard>
      </section>

      <section id="combobox-sizes" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.combobox.secSizes }}</h2>
        </div>

        <DemoCard :title="messages.controls.combobox.cardSizesTitle" :code="sizesCode">
          <div class="demo-field-grid">
            <VfkCombobox size="small" placeholder="Small">
              <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
              <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
            </VfkCombobox>
            <VfkCombobox size="medium" placeholder="Medium">
              <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
              <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
            </VfkCombobox>
            <VfkCombobox size="large" placeholder="Large">
              <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
              <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
            </VfkCombobox>
          </div>
        </DemoCard>
      </section>

      <section id="combobox-filter-freeform" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.combobox.secFilterFreeform }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard
            :title="messages.controls.combobox.cardFilterTitle"
            :description="messages.controls.combobox.cardFilterDesc"
            :code="filterCode"
          >
            <div class="demo-row" style="align-items: center; gap: 12px; flex-wrap: wrap">
              <VfkCombobox
                v-model="filterValue"
                :placeholder="messages.controls.combobox.placeholder"
                style="width: 100%; max-width: 280px"
              >
                <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
                <VfkOption value="vite">{{ messages.controls.combobox.optVite }}</VfkOption>
                <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
                <VfkOption value="svelte">{{ messages.controls.combobox.optSvelte }}</VfkOption>
                <VfkOption value="angular">{{ messages.controls.combobox.optAngular }}</VfkOption>
              </VfkCombobox>
              <code class="demo-inline-code">
                {{ filterValue || messages.controls.combobox.emptyValue }}
              </code>
            </div>
          </DemoCard>

          <DemoCard
            :title="messages.controls.combobox.cardFreeformTitle"
            :description="messages.controls.combobox.cardFreeformDesc"
            :code="freeformCode"
          >
            <div class="demo-row" style="align-items: center; gap: 12px; flex-wrap: wrap">
              <VfkCombobox
                v-model="freeformValue"
                freeform
                :placeholder="messages.controls.combobox.freeformPlaceholder"
                style="width: 100%; max-width: 280px"
              >
                <template #freeform>{{ messages.controls.combobox.freeformPrefix }}</template>
                <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
                <VfkOption value="vite">{{ messages.controls.combobox.optVite }}</VfkOption>
                <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
                <VfkOption value="svelte">{{ messages.controls.combobox.optSvelte }}</VfkOption>
              </VfkCombobox>
              <code class="demo-inline-code">
                {{ freeformValue || messages.controls.combobox.emptyValue }}
              </code>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="combobox-rich-disabled" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.combobox.secRichDisabled }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard
            :title="messages.controls.combobox.cardRichTitle"
            :description="messages.controls.combobox.cardRichDesc"
            :code="richCode"
          >
            <VfkCombobox
              v-model="richValue"
              :placeholder="messages.controls.combobox.placeholder"
              style="width: 100%; max-width: 320px"
            >
              <VfkOption value="vue" :text="messages.controls.combobox.optVue">
                <template #start><DemoIcons name="sparkle" :size="15" /></template>
                {{ messages.controls.combobox.optVue }}
                <template #description>{{ messages.controls.combobox.optVueDesc }}</template>
              </VfkOption>
              <VfkOption value="vite" :text="messages.controls.combobox.optVite">
                <template #start><DemoIcons name="layers" :size="15" /></template>
                {{ messages.controls.combobox.optVite }}
                <template #description>{{ messages.controls.combobox.optViteDesc }}</template>
              </VfkOption>
              <VfkOption value="react" :text="messages.controls.combobox.optReact">
                <template #start><DemoIcons name="code" :size="15" /></template>
                {{ messages.controls.combobox.optReact }}
                <template #description>{{ messages.controls.combobox.optReactDesc }}</template>
              </VfkOption>
              <VfkOption value="legacy" :text="messages.controls.combobox.optLegacy" disabled>
                {{ messages.controls.combobox.optLegacy }}
                <template #description>{{ messages.controls.combobox.optLegacyDesc }}</template>
              </VfkOption>
            </VfkCombobox>
          </DemoCard>

          <DemoCard :title="messages.controls.combobox.cardDisabledTitle" :code="disabledCode">
            <VfkCombobox model-value="vue" disabled style="width: 100%; max-width: 280px">
              <VfkOption value="vue">{{ messages.controls.combobox.optVue }}</VfkOption>
              <VfkOption value="react">{{ messages.controls.combobox.optReact }}</VfkOption>
            </VfkCombobox>
          </DemoCard>
        </div>
      </section>

      <section id="combobox-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="VfkCombobox Props" :rows="propRows" />
          <DemoApiTable
            :title="`VfkCombobox ${messages.controls.eventsSlots}`"
            :rows="eventSlotRows"
            kind="event"
          />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
