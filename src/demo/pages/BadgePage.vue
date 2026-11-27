<script setup lang="ts">
import { computed, ref } from 'vue'
import { VfkBadge, type BadgeAppearance, type BadgeColor, type BadgeShape, type BadgeSize } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'badge-playground', label: messages.value.controls.playground },
  { id: 'badge-appearances', label: messages.value.controls.badge.secAppearances },
  { id: 'badge-colors', label: messages.value.controls.badge.secColors },
  { id: 'badge-sizes', label: messages.value.controls.badge.secSizesShapes },
  { id: 'badge-api', label: 'API' },
])

const appearance = ref<BadgeAppearance>('filled')
const color = ref<BadgeColor>('brand')
const size = ref<BadgeSize>('medium')
const shape = ref<BadgeShape>('circular')

const appearances: BadgeAppearance[] = ['filled', 'tint', 'outline', 'ghost']
const colors: BadgeColor[] = [
  'brand',
  'danger',
  'important',
  'informative',
  'severe',
  'subtle',
  'success',
  'warning',
]
const sizes: BadgeSize[] = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large']
const shapes: BadgeShape[] = ['circular', 'rounded', 'square']

const playgroundCode = computed(
  () =>
    `<VfkBadge appearance="${appearance.value}" color="${color.value}" size="${size.value}" shape="${shape.value}">
  ${messages.value.controls.badge.sampleText}
</VfkBadge>`,
)

const appearancesCode = `<VfkBadge appearance="filled" color="brand">Badge</VfkBadge>
<VfkBadge appearance="tint" color="success">Badge</VfkBadge>
<VfkBadge appearance="outline" color="danger">Badge</VfkBadge>
<VfkBadge appearance="ghost" color="informative">Badge</VfkBadge>`

const sizesCode = `<VfkBadge size="tiny" />
<VfkBadge size="small" shape="rounded" color="success">12</VfkBadge>
<VfkBadge size="large" shape="square">Beta</VfkBadge>
<VfkBadge size="extra-large" shape="rounded" appearance="outline">9+</VfkBadge>`

const slotsCode = `<VfkBadge color="success">
  <template #start><DemoIcons name="check" :size="12" /></template>
  已同步
</VfkBadge>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'appearance',
    type: "'filled' | 'tint' | 'outline' | 'ghost'",
    defaultValue: "'filled'",
    description: messages.value.controls.badge.apiAppearance,
  },
  {
    name: 'color',
    type: "'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning'",
    defaultValue: "'brand'",
    description: messages.value.controls.badge.apiColor,
  },
  {
    name: 'size',
    type: "'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'",
    defaultValue: "'medium'",
    description: messages.value.controls.badge.apiSize,
  },
  {
    name: 'shape',
    type: "'circular' | 'rounded' | 'square'",
    defaultValue: "'circular'",
    description: messages.value.controls.badge.apiShape,
  },
])

const slotRows = computed<ApiRow[]>(() => [
  {
    name: '#default / #start / #end',
    type: 'slot',
    description: messages.value.controls.badge.apiSlots,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Badge</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkBadge</span>
            <span class="demo-tag">&lt;fluent-badge&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.badge.desc }}</p>
      </header>

      <section id="badge-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkBadge
              :appearance="appearance"
              :color="color"
              :size="size"
              :shape="shape"
              :aria-label="messages.controls.badge.sampleText"
            >
              {{ messages.controls.badge.sampleText }}
            </VfkBadge>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="badge-appearance">appearance</label>
              <select id="badge-appearance" v-model="appearance" class="demo-native-select">
                <option v-for="item in appearances" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="badge-color">color</label>
              <select id="badge-color" v-model="color" class="demo-native-select">
                <option v-for="item in colors" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="badge-size">size</label>
              <select id="badge-size" v-model="size" class="demo-native-select">
                <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="badge-shape">shape</label>
              <select id="badge-shape" v-model="shape" class="demo-native-select">
                <option v-for="item in shapes" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="badge-appearances" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.badge.secAppearances }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.badge.secAppearances"
          :code="appearancesCode"
          full
        >
          <div class="demo-stack">
            <div v-for="item in appearances" :key="item" class="demo-row">
              <VfkBadge :appearance="item" color="brand">
                {{ messages.controls.badge.sampleText }}
              </VfkBadge>
              <VfkBadge :appearance="item" color="success">Success</VfkBadge>
              <VfkBadge :appearance="item" color="warning">Warning</VfkBadge>
              <VfkBadge :appearance="item" color="danger">Danger</VfkBadge>
              <VfkBadge :appearance="item" color="severe">Severe</VfkBadge>
              <span class="demo-inline-code">{{ item }}</span>
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="badge-colors" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.badge.secColors }}</h2>
        </div>

        <DemoCard :title="messages.controls.badge.secColors" :code="appearancesCode" full>
          <div class="demo-row">
            <VfkBadge v-for="item in colors" :key="item" :color="item">{{ item }}</VfkBadge>
          </div>
        </DemoCard>
      </section>

      <section id="badge-sizes" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.badge.secSizesShapes }}</h2>
        </div>

        <DemoCard :title="messages.controls.badge.secSizesShapes" :code="sizesCode" full>
          <div class="demo-stack">
            <div class="demo-row">
              <VfkBadge
                v-for="item in sizes"
                :key="item"
                :size="item"
                shape="rounded"
                color="success"
              >
                {{ item === 'tiny' || item === 'extra-small' ? '' : '12' }}
              </VfkBadge>
            </div>
            <div class="demo-row">
              <VfkBadge v-for="item in shapes" :key="item" :shape="item" size="large">
                {{ item }}
              </VfkBadge>
            </div>
            <div class="demo-row">
              <VfkBadge color="success">
                <template #start><DemoIcons name="check" :size="12" /></template>
                已同步
              </VfkBadge>
              <VfkBadge appearance="outline" color="informative">
                <template #end><DemoIcons name="arrow-right" :size="12" /></template>
                v0.2.0
              </VfkBadge>
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="badge-api" class="demo-section">
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
