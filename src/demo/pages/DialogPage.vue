<script setup lang="ts">
import { computed, ref } from 'vue'
import { VfkButton, VfkDialog, VfkDialogBody, type DialogType } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'dialog-playground', label: messages.value.controls.playground },
  { id: 'dialog-types', label: messages.value.controls.dialog.secTypes },
  { id: 'dialog-body', label: messages.value.controls.dialog.secBody },
  { id: 'dialog-api', label: 'API' },
])

const open = ref(false)
const type = ref<DialogType>('modal')

const modalOpen = ref(false)
const alertOpen = ref(false)
const nonModalOpen = ref(false)

const bodyOpen = ref(false)

const typeLabels = computed<Record<DialogType, string>>(() => ({
  modal: messages.value.controls.dialog.btnModal,
  'non-modal': messages.value.controls.dialog.btnNonModal,
  alert: messages.value.controls.dialog.btnAlert,
}))

const playgroundCode = computed(() => `<VfkDialog v-model="open" type="${type.value}">
  <VfkDialogBody :title="title">
    {{ body }}
    <template #action>
      <VfkButton appearance="secondary">${messages.value.controls.dialog.cancel}</VfkButton>
      <VfkButton appearance="primary">${messages.value.controls.dialog.confirm}</VfkButton>
    </template>
  </VfkDialogBody>
</VfkDialog>`)

const typesCode = `<VfkDialog v-model="modalOpen" type="modal">...</VfkDialog>
<VfkDialog v-model="alertOpen" type="alert">...</VfkDialog>
<VfkDialog v-model="nonModalOpen" type="non-modal">...</VfkDialog>`

const bodyCode = `<VfkDialog v-model="bodyOpen" type="alert" max-width="720px">
  <VfkDialogBody title="Release notes" close-label="Close">
    <template #title-action><span class="demo-tag">beta</span></template>
    <p>...</p>
    <template #action>
      <VfkButton appearance="secondary">Cancel</VfkButton>
      <VfkButton appearance="primary">Publish</VfkButton>
    </template>
  </VfkDialogBody>
</VfkDialog>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.dialog.apiModelValue,
  },
  {
    name: 'type',
    type: "'modal' | 'non-modal' | 'alert'",
    defaultValue: "'modal'",
    description: messages.value.controls.dialog.apiType,
  },
  {
    name: 'ariaLabel / ariaLabelledby / ariaDescribedby',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.dialog.apiAria,
  },
  {
    name: 'maxWidth',
    type: 'string',
    defaultValue: "'600px'",
    description: messages.value.controls.dialog.apiMaxWidth,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(open: boolean) => void',
    description: messages.value.controls.dialog.apiUpdate,
  },
  {
    name: '@open-change',
    type: '(open: boolean, event: Event) => void',
    description: messages.value.controls.dialog.apiOpenChange,
  },
  {
    name: '#default',
    type: 'slot',
    description: messages.value.controls.dialog.apiSlots,
  },
  {
    name: 'VfkDialogBody',
    type: 'props + slots',
    description: messages.value.controls.dialog.apiBody,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Dialog</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkDialog</span>
            <span class="demo-tag">&lt;fluent-dialog&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.dialog.desc }}</p>
      </header>

      <section id="dialog-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkButton appearance="primary" @click="open = true">
              {{ typeLabels[type] }}
            </VfkButton>

            <VfkDialog v-model="open" :type="type">
              <VfkDialogBody
                :title="messages.controls.dialog.sampleTitle"
                :close-label="messages.controls.dialog.cancel"
              >
                <p>{{ messages.controls.dialog.sampleBody }}</p>
                <template #action>
                  <VfkButton appearance="secondary" @click="open = false">
                    {{ messages.controls.dialog.cancel }}
                  </VfkButton>
                  <VfkButton appearance="primary" @click="open = false">
                    {{ messages.controls.dialog.confirm }}
                  </VfkButton>
                </template>
              </VfkDialogBody>
            </VfkDialog>
          </template>

          <template #readout>
            <span>{{ messages.controls.dialog.stateLabel }}:</span>
            <code class="demo-inline-code">
              {{ open ? messages.controls.dialog.stateOpen : messages.controls.dialog.stateClosed }}
            </code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="dlg-type">type</label>
              <select id="dlg-type" v-model="type" class="demo-native-select">
                <option value="modal">modal</option>
                <option value="non-modal">non-modal</option>
                <option value="alert">alert</option>
              </select>
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="dialog-types" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.dialog.secTypes }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.dialog.cardTypesTitle"
          :description="messages.controls.dialog.cardTypesDesc"
          :code="typesCode"
        >
          <div class="demo-row">
            <VfkButton appearance="primary" @click="modalOpen = true">
              {{ messages.controls.dialog.btnModal }}
            </VfkButton>
            <VfkButton appearance="secondary" @click="alertOpen = true">
              {{ messages.controls.dialog.btnAlert }}
            </VfkButton>
            <VfkButton appearance="outline" @click="nonModalOpen = true">
              {{ messages.controls.dialog.btnNonModal }}
            </VfkButton>
          </div>

          <VfkDialog v-model="modalOpen">
            <VfkDialogBody
              :title="messages.controls.dialog.cardTypesTitle"
              :close-label="messages.controls.dialog.cancel"
            >
              <p>{{ messages.controls.dialog.cardTypesDesc }}</p>
              <template #action>
                <VfkButton appearance="primary" @click="modalOpen = false">
                  {{ messages.controls.dialog.confirm }}
                </VfkButton>
              </template>
            </VfkDialogBody>
          </VfkDialog>

          <VfkDialog v-model="alertOpen" type="alert">
            <VfkDialogBody
              :title="messages.controls.dialog.sampleTitle"
              :close-label="messages.controls.dialog.cancel"
            >
              <p>{{ messages.controls.dialog.sampleBody }}</p>
              <template #action>
                <VfkButton appearance="secondary" @click="alertOpen = false">
                  {{ messages.controls.dialog.cancel }}
                </VfkButton>
                <VfkButton appearance="primary" @click="alertOpen = false">
                  {{ messages.controls.dialog.confirm }}
                </VfkButton>
              </template>
            </VfkDialogBody>
          </VfkDialog>

          <VfkDialog v-model="nonModalOpen" type="non-modal">
            <VfkDialogBody
              :title="messages.controls.dialog.cardBodyTitle"
              :close-label="messages.controls.dialog.cancel"
            >
              <p>{{ messages.controls.dialog.cardBodyDesc }}</p>
            </VfkDialogBody>
          </VfkDialog>
        </DemoCard>
      </section>

      <section id="dialog-body" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.dialog.secBody }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.dialog.bodyTitle"
          :description="messages.controls.dialog.bodyDesc"
          :code="bodyCode"
        >
          <div class="demo-row">
            <VfkButton appearance="primary" @click="bodyOpen = true">
              {{ messages.controls.dialog.btnAlert }}
            </VfkButton>
          </div>

          <VfkDialog v-model="bodyOpen" type="alert" max-width="720px">
            <VfkDialogBody
              :title="messages.controls.dialog.sampleTitle"
              :close-label="messages.controls.dialog.cancel"
            >
              <template #title-action>
                <span class="demo-tag demo-tag--brand">beta</span>
              </template>
              <p>{{ messages.controls.dialog.sampleBody }}</p>
              <template #action>
                <VfkButton appearance="secondary" @click="bodyOpen = false">
                  {{ messages.controls.dialog.cancel }}
                </VfkButton>
                <VfkButton appearance="primary" @click="bodyOpen = false">
                  {{ messages.controls.dialog.confirm }}
                </VfkButton>
              </template>
            </VfkDialogBody>
          </VfkDialog>
        </DemoCard>
      </section>

      <section id="dialog-api" class="demo-section">
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
