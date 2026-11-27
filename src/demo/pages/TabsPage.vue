<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkCheckbox,
  VfkTab,
  VfkTabList,
  type TabAppearance,
  type TabOrientation,
  type TabSize,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'tabs-playground', label: messages.value.controls.playground },
  { id: 'tabs-layout', label: messages.value.controls.tabs.secLayout },
  { id: 'tabs-icons', label: messages.value.controls.tabs.secIcons },
  { id: 'tabs-api', label: 'API' },
])

const active = ref('overview')
const appearance = ref<TabAppearance>('transparent')
const orientation = ref<TabOrientation>('horizontal')
const size = ref<TabSize>('medium')
const disabled = ref(false)

const verticalActive = ref('specs')
const smallActive = ref('overview')
const mediumActive = ref('overview')
const largeActive = ref('overview')
const panelActive = ref('overview')

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="active"']
  if (appearance.value !== 'transparent') attrs.push(`appearance="${appearance.value}"`)
  if (orientation.value !== 'horizontal') attrs.push(`orientation="${orientation.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (disabled.value) attrs.push('disabled')
  return `<VfkTabList ${attrs.join(' ')}>
  <VfkTab value="overview" label="${messages.value.controls.tabs.tabOverview}" />
  <VfkTab value="specs" label="${messages.value.controls.tabs.tabSpecs}" />
  <VfkTab value="logs" label="${messages.value.controls.tabs.tabLogs}" />
</VfkTabList>`
})

const verticalCode = `<VfkTabList v-model="active" orientation="vertical" appearance="subtle">
  <VfkTab value="overview" label="Overview" />
  <VfkTab value="specs" label="Specifications" />
  <VfkTab value="logs" label="Changelog" />
</VfkTabList>`

const sizesCode = `<VfkTabList v-model="s" size="small">...</VfkTabList>
<VfkTabList v-model="m" size="medium">...</VfkTabList>
<VfkTabList v-model="l" size="large">...</VfkTabList>`

const iconsCode = `<VfkTabList v-model="panelActive" appearance="subtle">
  <VfkTab value="overview">
    <template #start><DemoIcons name="grid" :size="15" /></template>
    Overview
  </VfkTab>
  <VfkTab value="specs">
    <template #start><DemoIcons name="code" :size="15" /></template>
    Specifications
    <template #end><span class="demo-tag">8</span></template>
  </VfkTab>
</VfkTabList>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.tabs.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'transparent' | 'subtle'",
    defaultValue: "'transparent'",
    description: messages.value.controls.tabs.apiAppearance,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: messages.value.controls.tabs.apiOrientation,
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: messages.value.controls.tabs.apiSize,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.tabs.apiDisabled,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.tabs.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: string, event: Event) => void',
    description: messages.value.controls.tabs.apiChange,
  },
  {
    name: 'VfkTab',
    type: 'component',
    description: messages.value.controls.tabs.apiTabProps,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Tabs</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkTabList / VfkTab</span>
            <span class="demo-tag">&lt;fluent-tablist&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.tabs.desc }}</p>
      </header>

      <section id="tabs-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkTabList
              v-model="active"
              :appearance="appearance"
              :orientation="orientation"
              :size="size"
              :disabled="disabled"
            >
              <VfkTab value="overview" :label="messages.controls.tabs.tabOverview" />
              <VfkTab value="specs" :label="messages.controls.tabs.tabSpecs" />
              <VfkTab value="logs" :label="messages.controls.tabs.tabLogs" />
              <VfkTab value="disabled" :label="messages.controls.tabs.tabDisabled" disabled />
            </VfkTabList>
          </template>

          <template #readout>
            <span>{{ messages.controls.tabs.currentValue }}:</span>
            <code class="demo-inline-code">{{ active }}</code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tabs-appearance">appearance</label>
              <select id="tabs-appearance" v-model="appearance" class="demo-native-select">
                <option value="transparent">transparent</option>
                <option value="subtle">subtle</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tabs-orientation">orientation</label>
              <select id="tabs-orientation" v-model="orientation" class="demo-native-select">
                <option value="horizontal">horizontal</option>
                <option value="vertical">vertical</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tabs-size">size</label>
              <select id="tabs-size" v-model="size" class="demo-native-select">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="disabled" label="disabled" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="tabs-layout" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.tabs.secLayout }}</h2>
        </div>

        <div class="demo-stack">
          <DemoCard
            :title="messages.controls.tabs.cardVerticalTitle"
            :description="messages.controls.tabs.cardVerticalDesc"
            :code="verticalCode"
          >
            <div style="width: 100%; max-width: 240px">
              <VfkTabList v-model="verticalActive" orientation="vertical" appearance="subtle">
                <VfkTab value="overview">
                  <template #start><DemoIcons name="grid" :size="15" /></template>
                  {{ messages.controls.tabs.tabOverview }}
                </VfkTab>
                <VfkTab value="specs">
                  <template #start><DemoIcons name="code" :size="15" /></template>
                  {{ messages.controls.tabs.tabSpecs }}
                </VfkTab>
                <VfkTab value="logs">
                  <template #start><DemoIcons name="layers" :size="15" /></template>
                  {{ messages.controls.tabs.tabLogs }}
                </VfkTab>
              </VfkTabList>
            </div>
          </DemoCard>

          <DemoCard :title="messages.controls.tabs.cardSizesTitle" :code="sizesCode">
            <div class="demo-stack">
              <VfkTabList v-model="smallActive" size="small">
                <VfkTab value="overview" :label="`${messages.controls.tabs.tabOverview} (small)`" />
                <VfkTab value="specs" :label="messages.controls.tabs.tabSpecs" />
              </VfkTabList>
              <VfkTabList v-model="mediumActive" size="medium">
                <VfkTab value="overview" :label="`${messages.controls.tabs.tabOverview} (medium)`" />
                <VfkTab value="specs" :label="messages.controls.tabs.tabSpecs" />
              </VfkTabList>
              <VfkTabList v-model="largeActive" size="large">
                <VfkTab value="overview" :label="`${messages.controls.tabs.tabOverview} (large)`" />
                <VfkTab value="specs" :label="messages.controls.tabs.tabSpecs" />
              </VfkTabList>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="tabs-icons" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.tabs.secIcons }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.tabs.cardIconsTitle"
          :description="messages.controls.tabs.cardIconsDesc"
          :code="iconsCode"
        >
          <div class="demo-stack" style="width: 100%">
            <VfkTabList v-model="panelActive" appearance="subtle">
              <VfkTab value="overview">
                <template #start><DemoIcons name="grid" :size="15" /></template>
                {{ messages.controls.tabs.tabOverview }}
              </VfkTab>
              <VfkTab value="specs">
                <template #start><DemoIcons name="code" :size="15" /></template>
                {{ messages.controls.tabs.tabSpecs }}
                <template #end><span class="demo-tag">8</span></template>
              </VfkTab>
              <VfkTab value="logs">
                <template #start><DemoIcons name="layers" :size="15" /></template>
                {{ messages.controls.tabs.tabLogs }}
                <template #end><span class="demo-tag demo-tag--brand">New</span></template>
              </VfkTab>
            </VfkTabList>

            <div
              role="tabpanel"
              style="
                padding: 12px 14px;
                border: 1px solid var(--colorNeutralStroke2);
                border-radius: var(--borderRadiusMedium);
                background: var(--colorNeutralBackground2);
                color: var(--colorNeutralForeground2);
              "
            >
              <span v-if="panelActive === 'overview'">{{ messages.controls.tabs.panelOverview }}</span>
              <span v-else-if="panelActive === 'specs'">{{ messages.controls.tabs.panelSpecs }}</span>
              <span v-else>{{ messages.controls.tabs.panelLogs }}</span>
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="tabs-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="VfkTabList Props" :rows="propRows" />
          <DemoApiTable :title="messages.controls.eventsSlots" :rows="eventSlotRows" kind="event" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
