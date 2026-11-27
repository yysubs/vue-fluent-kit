<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkButton,
  VfkDrawer,
  VfkDrawerBody,
  type DrawerSize,
  type DrawerType,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'drawer-playground', label: messages.value.controls.playground },
  { id: 'drawer-types', label: messages.value.controls.drawer.secTypes },
  { id: 'drawer-position', label: messages.value.controls.drawer.secPosition },
  { id: 'drawer-api', label: 'API' },
])

const open = ref(false)
const type = ref<DrawerType>('modal')
const size = ref<DrawerSize>('medium')

const modalOpen = ref(false)
const nonModalOpen = ref(false)
const inlineOpen = ref(true)
const endOpen = ref(false)

const typeLabels = computed<Record<DrawerType, string>>(() => ({
  'modal': messages.value.controls.drawer.btnModal,
  'non-modal': messages.value.controls.drawer.btnNonModal,
  'inline': messages.value.controls.drawer.btnInline,
}))

const playgroundCode = computed(() => `<VfkDrawer v-model="open" type="${type.value}" size="${size.value}">
  <VfkDrawerBody :title="title">
    {{ body }}
    <template #footer>
      <VfkButton appearance="primary">${messages.value.controls.drawer.footerApply}</VfkButton>
    </template>
  </VfkDrawerBody>
</VfkDrawer>`)

const typesCode = `<VfkDrawer v-model="modalOpen" type="modal">...</VfkDrawer>
<VfkDrawer v-model="nonModalOpen" type="non-modal">...</VfkDrawer>
<VfkDrawer v-model="inlineOpen" type="inline" size="small">...</VfkDrawer>`

const positionCode = `<VfkDrawer v-model="endOpen" position="end" width="420px">
  <VfkDrawerBody title="Filters">
    <p>...</p>
    <template #footer>
      <VfkButton appearance="primary">Apply filters</VfkButton>
    </template>
  </VfkDrawerBody>
</VfkDrawer>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.drawer.apiModelValue,
  },
  {
    name: 'type',
    type: "'modal' | 'non-modal' | 'inline'",
    defaultValue: "'modal'",
    description: messages.value.controls.drawer.apiType,
  },
  {
    name: 'position / size',
    type: "'start' | 'end' / 'small' | 'medium' | 'large' | 'full'",
    defaultValue: "'start' / 'medium'",
    description: messages.value.controls.drawer.apiPositionSize,
  },
  {
    name: 'width',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.drawer.apiWidth,
  },
  {
    name: 'ariaLabelledby / ariaDescribedby',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.drawer.apiAria,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(open: boolean) => void',
    description: messages.value.controls.drawer.apiUpdate,
  },
  {
    name: '@open-change',
    type: '(open: boolean, event: Event) => void',
    description: messages.value.controls.drawer.apiOpenChange,
  },
  {
    name: '#default',
    type: 'slot',
    description: messages.value.controls.drawer.apiSlots,
  },
  {
    name: 'VfkDrawerBody',
    type: 'props + slots',
    description: messages.value.controls.drawer.apiBody,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Drawer</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkDrawer</span>
            <span class="demo-tag">&lt;fluent-drawer&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.drawer.desc }}</p>
      </header>

      <section id="drawer-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkButton appearance="primary" @click="open = true">
              {{ typeLabels[type] }}
            </VfkButton>

            <VfkDrawer v-model="open" :type="type" :size="size">
              <VfkDrawerBody
                :title="messages.controls.drawer.sampleTitle"
                :close-label="messages.controls.drawer.footerApply"
              >
                <p>{{ messages.controls.drawer.sampleBody }}</p>
                <template #footer>
                  <VfkButton appearance="primary" @click="open = false">
                    {{ messages.controls.drawer.footerApply }}
                  </VfkButton>
                </template>
              </VfkDrawerBody>
            </VfkDrawer>
          </template>

          <template #readout>
            <span>{{ messages.controls.drawer.stateLabel }}:</span>
            <code class="demo-inline-code">
              {{
                open ? messages.controls.drawer.stateOpen : messages.controls.drawer.stateClosed
              }}
            </code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="drw-type">type</label>
              <select id="drw-type" v-model="type" class="demo-native-select">
                <option value="modal">modal</option>
                <option value="non-modal">non-modal</option>
                <option value="inline">inline</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="drw-size">size</label>
              <select id="drw-size" v-model="size" class="demo-native-select">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
                <option value="full">full</option>
              </select>
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="drawer-types" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.drawer.secTypes }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.drawer.cardTypesTitle"
          :description="messages.controls.drawer.cardTypesDesc"
          :code="typesCode"
          full
        >
          <div class="demo-row">
            <VfkButton appearance="primary" @click="modalOpen = true">
              {{ messages.controls.drawer.btnModal }}
            </VfkButton>
            <VfkButton appearance="secondary" @click="nonModalOpen = true">
              {{ messages.controls.drawer.btnNonModal }}
            </VfkButton>
            <VfkButton appearance="outline" @click="inlineOpen = !inlineOpen">
              {{ messages.controls.drawer.btnInline }}
            </VfkButton>
          </div>

          <div class="demo-drawer-inline-stage">
            <VfkDrawer v-model="inlineOpen" type="inline" size="small">
              <VfkDrawerBody
                :title="messages.controls.drawer.sampleTitle"
                :close-label="messages.controls.drawer.footerApply"
              >
                <p>{{ messages.controls.drawer.sampleBody }}</p>
                <template #footer>
                  <VfkButton appearance="primary" @click="inlineOpen = false">
                    {{ messages.controls.drawer.footerApply }}
                  </VfkButton>
                </template>
              </VfkDrawerBody>
            </VfkDrawer>
            <div class="demo-drawer-inline-stage__content">
              <VfkButton appearance="subtle" @click="inlineOpen = !inlineOpen">
                {{ messages.controls.drawer.btnInline }}
              </VfkButton>
            </div>
          </div>

          <VfkDrawer v-model="modalOpen">
            <VfkDrawerBody
              :title="messages.controls.drawer.cardTypesTitle"
              :close-label="messages.controls.drawer.footerApply"
            >
              <p>{{ messages.controls.drawer.cardTypesDesc }}</p>
              <template #footer>
                <VfkButton appearance="primary" @click="modalOpen = false">
                  {{ messages.controls.drawer.footerApply }}
                </VfkButton>
              </template>
            </VfkDrawerBody>
          </VfkDrawer>

          <VfkDrawer v-model="nonModalOpen" type="non-modal">
            <VfkDrawerBody
              :title="messages.controls.drawer.cardPositionTitle"
              :close-label="messages.controls.drawer.footerApply"
            >
              <p>{{ messages.controls.drawer.cardPositionDesc }}</p>
            </VfkDrawerBody>
          </VfkDrawer>
        </DemoCard>
      </section>

      <section id="drawer-position" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.drawer.secPosition }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.drawer.cardPositionTitle"
          :description="messages.controls.drawer.cardPositionDesc"
          :code="positionCode"
        >
          <div class="demo-row">
            <VfkButton appearance="primary" @click="endOpen = true">
              {{ messages.controls.drawer.btnEnd }}
            </VfkButton>
          </div>

          <VfkDrawer v-model="endOpen" position="end" width="420px">
            <VfkDrawerBody
              :title="messages.controls.drawer.sampleTitle"
              :close-label="messages.controls.drawer.footerApply"
            >
              <p>{{ messages.controls.drawer.sampleBody }}</p>
              <template #footer>
                <VfkButton appearance="secondary" @click="endOpen = false">
                  {{ messages.controls.drawer.btnModal }}
                </VfkButton>
                <VfkButton appearance="primary" @click="endOpen = false">
                  {{ messages.controls.drawer.footerApply }}
                </VfkButton>
              </template>
            </VfkDrawerBody>
          </VfkDrawer>
        </DemoCard>
      </section>

      <section id="drawer-api" class="demo-section">
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
