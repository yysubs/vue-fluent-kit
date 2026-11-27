<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkCheckbox,
  VfkSearchBox,
  type SearchBoxAppearance,
  type SearchBoxSize,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'searchbox-playground', label: messages.value.controls.playground },
  { id: 'searchbox-appearances', label: messages.value.controls.searchBox.secAppearances },
  { id: 'searchbox-sizes-slots', label: messages.value.controls.searchBox.secSizes },
  { id: 'searchbox-states', label: messages.value.controls.searchBox.secStates },
  { id: 'searchbox-api', label: 'API' },
])

const query = ref('Fluent 2')
const appearance = ref<SearchBoxAppearance>('outline')
const size = ref<SearchBoxSize>('medium')
const disabled = ref(false)
const readonly = ref(false)
const withLabel = ref(true)
const lastSearch = ref('')
const clearCount = ref(0)

const appearanceValues = ref<Record<SearchBoxAppearance, string>>({
  outline: '',
  underline: '',
  'filled-darker': '',
  'filled-lighter': '',
})

const sizeValues = ref<Record<SearchBoxSize, string>>({
  small: '',
  medium: '',
  large: '',
})

const customQuery = ref('tokens')

const appearances: SearchBoxAppearance[] = ['outline', 'underline', 'filled-darker', 'filled-lighter']
const sizes: SearchBoxSize[] = ['small', 'medium', 'large']

const playgroundCode = computed(() => {
  const attrs = ['v-model="query"']
  if (appearance.value !== 'outline') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (readonly.value) attrs.push('readonly')
  attrs.push(`placeholder="${messages.value.controls.searchBox.placeholder}"`)
  if (!withLabel.value) {
    return `<VfkSearchBox ${attrs.join(' ')} @search="onSearch" @clear="onClear" />`
  }
  return `<VfkSearchBox ${attrs.join(' ')} @search="onSearch" @clear="onClear">\n  ${messages.value.controls.searchBox.fieldLabel}\n</VfkSearchBox>`
})

const appearanceCode = `<VfkSearchBox v-model="q1" appearance="outline" placeholder="Outline" />
<VfkSearchBox v-model="q2" appearance="underline" placeholder="Underline" />
<VfkSearchBox v-model="q3" appearance="filled-darker" placeholder="Filled Darker" />
<VfkSearchBox v-model="q4" appearance="filled-lighter" placeholder="Filled Lighter" />`

const sizeCode = `<VfkSearchBox v-model="qSmall" size="small" placeholder="Small" />
<VfkSearchBox v-model="qMedium" size="medium" placeholder="Medium" />
<VfkSearchBox v-model="qLarge" size="large" placeholder="Large" />`

const slotsCode = `<VfkSearchBox v-model="customQuery" placeholder="Search...">
  <template #start><SparkleIcon /></template>
  <template #end><kbd class="demo-kbd">⌘K</kbd></template>
</VfkSearchBox>`

const stateCode = `<VfkSearchBox model-value="Read-only search text" readonly />
<VfkSearchBox model-value="Disabled search box" disabled />`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.searchBox.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'outline' | 'underline' | 'filled-darker' | 'filled-lighter'",
    defaultValue: "'outline'",
    description: messages.value.controls.searchBox.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.searchBox.apiSize,
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.searchBox.apiPlaceholder,
  },
  {
    name: 'dismissLabel',
    type: 'string',
    defaultValue: "'Clear'",
    description: messages.value.controls.searchBox.apiDismissLabel,
  },
  {
    name: 'disabled / readonly / required',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.searchBox.apiFlags,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.searchBox.apiUpdate,
  },
  {
    name: '@search',
    type: '(value: string, event: KeyboardEvent) => void',
    description: messages.value.controls.searchBox.apiSearch,
  },
  {
    name: '@clear',
    type: '(event: Event) => void',
    description: messages.value.controls.searchBox.apiClear,
  },
  {
    name: '#default / #start / #dismiss / #end',
    type: 'slot',
    description: messages.value.controls.searchBox.apiSlots,
  },
])

function handleSearch(value: string) {
  lastSearch.value = value
}

function handleClear() {
  clearCount.value += 1
}
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">SearchBox</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkSearchBox</span>
            <span class="demo-tag">VfkInput</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.searchBox.desc }}</p>
      </header>

      <section id="searchbox-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkSearchBox
              v-model="query"
              :appearance="appearance"
              :size="size"
              :disabled="disabled"
              :readonly="readonly"
              :placeholder="messages.controls.searchBox.placeholder"
              :dismiss-label="messages.controls.searchBox.dismissLabel"
              style="width: 300px"
              @search="handleSearch"
              @clear="handleClear"
            >
              <template v-if="withLabel">{{ messages.controls.searchBox.fieldLabel }}</template>
            </VfkSearchBox>
          </template>

          <template #readout>
            <span>v-model:</span>
            <code class="demo-inline-code">{{ JSON.stringify(query) }}</code>
            <span>{{ messages.controls.searchBox.lastSearchLabel }}:</span>
            <code class="demo-inline-code">
              {{ lastSearch || messages.controls.searchBox.noneYet }}
            </code>
            <span>{{ messages.controls.searchBox.clearCountLabel }}:</span>
            <code class="demo-inline-code">{{ clearCount }}</code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sb-appearance">appearance</label>
              <select id="sb-appearance" v-model="appearance" class="demo-native-select">
                <option v-for="item in appearances" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="sb-size">size</label>
              <select id="sb-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="withLabel" label="label" />
              <VfkCheckbox v-model="disabled" label="disabled" />
              <VfkCheckbox v-model="readonly" label="readonly" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="searchbox-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.searchBox.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.searchBox.cardAppearancesTitle"
          :description="messages.controls.searchBox.cardAppearancesDesc"
          :code="appearanceCode"
          full
        >
          <div class="demo-input-grid">
            <VfkSearchBox
              v-for="item in appearances"
              :key="item"
              v-model="appearanceValues[item]"
              :appearance="item"
              :placeholder="item"
              :dismiss-label="messages.controls.searchBox.dismissLabel"
            >
              {{ item }}
            </VfkSearchBox>
          </div>
        </DemoCard>
      </section>

      <section id="searchbox-sizes-slots" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.searchBox.secSizes }}</h2>
        </div>

        <div class="demo-cards-grid">
          <DemoCard :title="messages.controls.searchBox.cardSizesTitle" :code="sizeCode">
            <div class="demo-stack">
              <VfkSearchBox
                v-for="item in sizes"
                :key="item"
                v-model="sizeValues[item]"
                :size="item"
                :placeholder="`size=&quot;${item}&quot;`"
                :dismiss-label="messages.controls.searchBox.dismissLabel"
              />
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.searchBox.cardSlotsTitle" :code="slotsCode">
            <div class="demo-stack">
              <VfkSearchBox
                v-model="customQuery"
                :placeholder="messages.controls.searchBox.placeholder"
                :dismiss-label="messages.controls.searchBox.dismissLabel"
              >
                <template #start><DemoIcons name="sparkle" :size="15" /></template>
                <template #end><kbd class="demo-kbd">⌘K</kbd></template>
              </VfkSearchBox>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="searchbox-states" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.searchBox.secStates }}</h2>
        </div>

        <DemoCard :title="messages.controls.searchBox.cardStatesTitle" :code="stateCode" full>
          <div class="demo-input-grid">
            <VfkSearchBox
              :model-value="messages.controls.searchBox.readonlySample"
              readonly
              :dismiss-label="messages.controls.searchBox.dismissLabel"
            >
              readonly
            </VfkSearchBox>
            <VfkSearchBox
              :model-value="messages.controls.searchBox.disabledSample"
              disabled
              :dismiss-label="messages.controls.searchBox.dismissLabel"
            >
              disabled
            </VfkSearchBox>
          </div>
        </DemoCard>
      </section>

      <section id="searchbox-api" class="demo-section">
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
