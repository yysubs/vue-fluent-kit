<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkButton,
  VfkCheckbox,
  VfkTree,
  VfkTreeItem,
  type TreeAppearance,
  type TreeSize,
  type TreeToggleDetail,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'tree-playground', label: messages.value.controls.playground },
  { id: 'tree-slots', label: messages.value.controls.tree.secSlots },
  { id: 'tree-navigation', label: messages.value.controls.tree.secNavigation },
  { id: 'tree-api', label: 'API' },
])

const selected = ref('node-overview')
const size = ref<TreeSize>('medium')
const appearance = ref<TreeAppearance>('subtle')
const selectableGroups = ref(false)
const lastToggleText = ref('—')

const slotSelected = ref('src-tree')
const asideClicks = ref(0)
const navSelected = ref('dashboard')

function handlePlaygroundToggle(detail: TreeToggleDetail) {
  lastToggleText.value = `${detail.value ?? 'item'}: ${detail.expanded ? 'open' : 'closed'}`
}

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="selected"']
  if (appearance.value !== 'subtle') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  const groupAttr = selectableGroups.value ? ' expanded' : ' :selectable="false" expanded'
  return `<VfkTree ${attrs.join(' ')}>
  <VfkTreeItem value="docs" label="${messages.value.controls.tree.groupDocs}"${groupAttr}>
    <VfkTreeItem value="node-overview">${messages.value.controls.tree.nodeOverview}</VfkTreeItem>
    <VfkTreeItem value="node-theming">${messages.value.controls.tree.nodeTheming}</VfkTreeItem>
  </VfkTreeItem>
  <VfkTreeItem value="components" label="${messages.value.controls.tree.groupComponents}"${groupAttr}>
    <VfkTreeItem value="node-button">${messages.value.controls.tree.nodeButton}</VfkTreeItem>
    <VfkTreeItem value="node-tree">${messages.value.controls.tree.nodeTree}</VfkTreeItem>
  </VfkTreeItem>
</VfkTree>`
})

const slotsCode = `<VfkTree v-model="selected">
  <VfkTreeItem value="src" label="src" :selectable="false" expanded>
    <template #start><DemoIcons name="folder" :size="15" /></template>
    <template #aside><span class="demo-tag">3</span></template>
    <VfkTreeItem value="src-tree" label="VfkTree.vue">
      <template #start><DemoIcons name="file" :size="15" /></template>
      <template #end><span class="demo-tag demo-tag--brand">New</span></template>
      <template #aside>
        <VfkButton appearance="subtle" size="small" @click="count++">+</VfkButton>
      </template>
    </VfkTreeItem>
  </VfkTreeItem>
</VfkTree>`

const navCode = `<VfkTree v-model="activePage" appearance="subtle">
  <VfkTreeItem value="group-main" label="Workspace" :selectable="false" expanded>
    <VfkTreeItem value="dashboard">Dashboard</VfkTreeItem>
    <VfkTreeItem value="analytics">Analytics</VfkTreeItem>
  </VfkTreeItem>
  <VfkTreeItem value="group-settings" label="Settings" :selectable="false" expanded>
    <VfkTreeItem value="profile">Profile</VfkTreeItem>
    <VfkTreeItem value="security">Security</VfkTreeItem>
  </VfkTreeItem>
</VfkTree>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.tree.apiModelValue,
  },
  {
    name: 'appearance',
    type: "'subtle' | 'subtle-alpha' | 'transparent'",
    defaultValue: "'subtle'",
    description: messages.value.controls.tree.apiAppearance,
  },
  {
    name: 'size',
    type: "'small' | 'medium'",
    defaultValue: "'medium'",
    description: messages.value.controls.tree.apiSize,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: messages.value.controls.tree.apiUpdate,
  },
  {
    name: '@change',
    type: '(value: string, event: Event) => void',
    description: messages.value.controls.tree.apiChange,
  },
  {
    name: '@toggle',
    type: '(detail: TreeToggleDetail, event: Event) => void',
    description: messages.value.controls.tree.apiToggle,
  },
  {
    name: 'VfkTreeItem',
    type: 'component',
    description: messages.value.controls.tree.apiItemProps,
  },
  {
    name: '#default / #items / #start / #end / #aside / #chevron',
    type: 'slots',
    description: messages.value.controls.tree.apiSlots,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Tree</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkTree / VfkTreeItem</span>
            <span class="demo-tag">&lt;fluent-tree&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.tree.desc }}</p>
      </header>

      <section id="tree-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <div style="width: 100%; max-width: 340px">
              <VfkTree
                v-model="selected"
                :appearance="appearance"
                :size="size"
                @toggle="handlePlaygroundToggle"
              >
                <VfkTreeItem
                  value="group-docs"
                  :label="messages.controls.tree.groupDocs"
                  :selectable="selectableGroups"
                  expanded
                >
                  <template #start><DemoIcons name="folder" :size="15" /></template>
                  <VfkTreeItem value="node-overview">
                    <template #start><DemoIcons name="file" :size="15" /></template>
                    {{ messages.controls.tree.nodeOverview }}
                  </VfkTreeItem>
                  <VfkTreeItem
                    value="group-guides"
                    :label="messages.controls.tree.groupGuides"
                    :selectable="selectableGroups"
                    expanded
                  >
                    <template #start><DemoIcons name="folder" :size="15" /></template>
                    <VfkTreeItem value="node-theming">
                      <template #start><DemoIcons name="palette" :size="15" /></template>
                      {{ messages.controls.tree.nodeTheming }}
                    </VfkTreeItem>
                    <VfkTreeItem value="node-tokens">
                      <template #start><DemoIcons name="layers" :size="15" /></template>
                      {{ messages.controls.tree.nodeTokens }}
                    </VfkTreeItem>
                  </VfkTreeItem>
                </VfkTreeItem>

                <VfkTreeItem
                  value="group-components"
                  :label="messages.controls.tree.groupComponents"
                  :selectable="selectableGroups"
                  expanded
                >
                  <template #start><DemoIcons name="folder" :size="15" /></template>
                  <VfkTreeItem value="node-button">
                    <template #start><DemoIcons name="button" :size="15" /></template>
                    {{ messages.controls.tree.nodeButton }}
                  </VfkTreeItem>
                  <VfkTreeItem value="node-input">
                    <template #start><DemoIcons name="input" :size="15" /></template>
                    {{ messages.controls.tree.nodeInput }}
                  </VfkTreeItem>
                  <VfkTreeItem value="node-tree">
                    <template #start><DemoIcons name="tree" :size="15" /></template>
                    {{ messages.controls.tree.nodeTree }}
                  </VfkTreeItem>
                </VfkTreeItem>
              </VfkTree>
            </div>
          </template>

          <template #readout>
            <span>{{ messages.controls.tree.currentValue }}:</span>
            <code class="demo-inline-code">{{ selected || messages.controls.tree.noneSelected }}</code>
            <span style="margin-inline-start: 12px">{{ messages.controls.tree.lastToggle }}:</span>
            <code class="demo-inline-code">{{ lastToggleText }}</code>
          </template>

          <template #controls>
            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tree-appearance">appearance</label>
              <select id="tree-appearance" v-model="appearance" class="demo-native-select">
                <option value="subtle">subtle</option>
                <option value="subtle-alpha">subtle-alpha</option>
                <option value="transparent">transparent</option>
              </select>
            </div>

            <div class="demo-control-field">
              <label class="demo-control-field__label" for="tree-size">size</label>
              <select id="tree-size" v-model="size" class="demo-native-select">
                <option value="medium">medium</option>
                <option value="small">small</option>
              </select>
            </div>

            <div class="demo-control-checks">
              <VfkCheckbox v-model="selectableGroups" label="group selectable" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="tree-slots" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.tree.secSlots }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.tree.cardSlotsTitle"
          :description="messages.controls.tree.cardSlotsDesc"
          :code="slotsCode"
        >
          <div style="width: 100%; max-width: 380px">
            <VfkTree v-model="slotSelected">
              <VfkTreeItem value="src" label="src/components/tree" :selectable="false" expanded>
                <template #start><DemoIcons name="folder" :size="15" /></template>
                <template #aside><span class="demo-tag">3</span></template>
                <VfkTreeItem value="src-tree" label="VfkTree.vue">
                  <template #start><DemoIcons name="file" :size="15" /></template>
                  <template #end><span class="demo-tag demo-tag--brand">New</span></template>
                  <template #aside>
                    <VfkButton appearance="subtle" size="small" @click="asideClicks += 1">
                      <template #start><DemoIcons name="plus" :size="12" /></template>
                      {{ asideClicks }}
                    </VfkButton>
                  </template>
                </VfkTreeItem>
                <VfkTreeItem value="src-item" label="VfkTreeItem.vue">
                  <template #start><DemoIcons name="file" :size="15" /></template>
                </VfkTreeItem>
                <VfkTreeItem value="src-readme" label="README.md">
                  <template #start><DemoIcons name="file" :size="15" /></template>
                </VfkTreeItem>
              </VfkTreeItem>
            </VfkTree>
          </div>
        </DemoCard>
      </section>

      <section id="tree-navigation" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.tree.secNavigation }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.tree.cardNavTitle"
          :description="messages.controls.tree.cardNavDesc"
          :code="navCode"
        >
          <div class="demo-stack" style="width: 100%; max-width: 340px">
            <VfkTree v-model="navSelected">
              <VfkTreeItem
                value="nav-main"
                :label="messages.controls.tree.navGroupMain"
                :selectable="false"
                expanded
              >
                <template #aside><span class="demo-tag">2</span></template>
                <VfkTreeItem value="dashboard">
                  <template #start><DemoIcons name="grid" :size="15" /></template>
                  {{ messages.controls.tree.navItemDashboard }}
                </VfkTreeItem>
                <VfkTreeItem value="analytics">
                  <template #start><DemoIcons name="sparkle" :size="15" /></template>
                  {{ messages.controls.tree.navItemAnalytics }}
                </VfkTreeItem>
              </VfkTreeItem>

              <VfkTreeItem
                value="nav-settings"
                :label="messages.controls.tree.navGroupSettings"
                :selectable="false"
                expanded
              >
                <template #aside><span class="demo-tag">2</span></template>
                <VfkTreeItem value="profile">
                  <template #start><DemoIcons name="field" :size="15" /></template>
                  {{ messages.controls.tree.navItemProfile }}
                </VfkTreeItem>
                <VfkTreeItem value="security">
                  <template #start><DemoIcons name="switch" :size="15" /></template>
                  {{ messages.controls.tree.navItemSecurity }}
                </VfkTreeItem>
              </VfkTreeItem>
            </VfkTree>

            <div class="demo-row" style="font-size: 12px; color: var(--colorNeutralForeground3)">
              <span>{{ messages.controls.tree.navActionHint }}:</span>
              <code class="demo-inline-code">{{ navSelected }}</code>
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="tree-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="VfkTree Props" :rows="propRows" />
          <DemoApiTable :title="messages.controls.eventsSlots" :rows="eventSlotRows" kind="event" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
