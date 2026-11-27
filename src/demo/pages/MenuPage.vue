<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VfkButton,
  VfkCheckbox,
  VfkMenu,
  VfkMenuButton,
  VfkMenuDivider,
  VfkMenuItem,
  VfkMenuList,
} from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

const { messages } = useDemoI18n()

const tocItems = computed<TocItem[]>(() => [
  { id: 'menu-playground', label: messages.value.controls.playground },
  { id: 'menu-check-radio', label: messages.value.controls.menu.secCheckRadio },
  { id: 'menu-submenu', label: messages.value.controls.menu.secSubmenuContext },
  { id: 'menu-api', label: 'API' },
])

const openOnHover = ref(false)
const persistOnItemClick = ref(false)
const split = ref(false)
const lastAction = ref('')

const showGrid = ref(true)
const showRuler = ref(false)
const sortAsc = ref(true)
const sortDesc = ref(false)
const contextAction = ref('')

function handleSelect(value?: string) {
  lastAction.value = value ?? ''
}

function handleContextSelect(value?: string) {
  contextAction.value = value ?? ''
}

const playgroundCode = computed(() => {
  const attrs: string[] = []
  if (openOnHover.value) attrs.push('open-on-hover')
  if (persistOnItemClick.value) attrs.push('persist-on-item-click')
  if (split.value) attrs.push('split')
  const openTag = attrs.length ? `<VfkMenu ${attrs.join(' ')}>` : '<VfkMenu>'
  const primarySlot = split.value
    ? `\n  <template #primary-action>\n    <VfkButton appearance="primary">${messages.value.controls.menu.primaryActionLabel}</VfkButton>\n  </template>`
    : ''
  const triggerSlot = split.value
    ? `\n  <template #trigger>\n    <VfkMenuButton appearance="primary" aria-label="${messages.value.controls.menu.triggerLabel}" />\n  </template>`
    : `\n  <template #trigger>\n    <VfkMenuButton>${messages.value.controls.menu.triggerLabel}</VfkMenuButton>\n  </template>`
  return `${openTag}${primarySlot}${triggerSlot}
  <VfkMenuList @select="onSelect">
    <VfkMenuItem value="new" label="${messages.value.controls.menu.itemNew}">
      <template #end>Ctrl+N</template>
    </VfkMenuItem>
    <VfkMenuItem value="copy" label="${messages.value.controls.menu.itemCopy}">
      <template #end>Ctrl+D</template>
    </VfkMenuItem>
    <VfkMenuDivider />
    <VfkMenuItem value="delete" label="${messages.value.controls.menu.itemDelete}" />
  </VfkMenuList>
</VfkMenu>`
})

const checkRadioCode = `<VfkMenu>
  <template #trigger>
    <VfkMenuButton>View options</VfkMenuButton>
  </template>
  <VfkMenuList>
    <VfkMenuItem v-model:checked="showGrid" role="menuitemcheckbox" value="grid" label="Show grid" />
    <VfkMenuItem v-model:checked="showRuler" role="menuitemcheckbox" value="ruler" label="Show ruler" />
    <VfkMenuDivider />
    <VfkMenuItem v-model:checked="sortAsc" role="menuitemradio" value="asc" label="Sort A to Z" />
    <VfkMenuItem v-model:checked="sortDesc" role="menuitemradio" value="desc" label="Sort Z to A" />
  </VfkMenuList>
</VfkMenu>`

const submenuCode = `<VfkMenu>
  <template #trigger>
    <VfkMenuButton>More actions</VfkMenuButton>
  </template>
  <VfkMenuList @select="onSelect">
    <VfkMenuItem value="new" label="New file" />
    <VfkMenuItem label="Share via">
      <VfkMenuList>
        <VfkMenuItem value="copy-link" label="Copy link" />
        <VfkMenuItem value="email" label="Send email" />
      </VfkMenuList>
    </VfkMenuItem>
  </VfkMenuList>
</VfkMenu>`

const propRows = computed<ApiRow[]>(() => [
  {
    name: 'openOnHover / openOnContext / closeOnScroll / persistOnItemClick',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.menu.apiFlags,
  },
  {
    name: 'split',
    type: 'boolean',
    defaultValue: 'false',
    description: messages.value.controls.menu.apiSplit,
  },
  {
    name: 'maxHeight',
    type: 'string',
    defaultValue: 'undefined',
    description: messages.value.controls.menu.apiMaxHeight,
  },
])

const eventSlotRows = computed<ApiRow[]>(() => [
  {
    name: 'VfkMenu @open-change',
    type: '(open: boolean, event: Event) => void',
    description: messages.value.controls.menu.apiOpenChange,
  },
  {
    name: 'VfkMenuList @select',
    type: '(value: string | undefined, event: Event) => void',
    description: messages.value.controls.menu.apiListSelect,
  },
  {
    name: 'VfkMenuItem',
    type: 'component',
    description: messages.value.controls.menu.apiItemProps,
  },
  {
    name: 'Slots',
    type: 'slots',
    description: messages.value.controls.menu.apiSlots,
  },
])
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <p class="demo-page-header__eyebrow">{{ messages.shell.groupComponents }}</p>
        <div class="demo-page-header__title-row">
          <h1 class="demo-page-header__title">Menu</h1>
          <div class="demo-page-header__tags">
            <span class="demo-tag demo-tag--brand">VfkMenu / VfkMenuList / VfkMenuItem</span>
            <span class="demo-tag">&lt;fluent-menu&gt;</span>
          </div>
        </div>
        <p class="demo-page-header__desc">{{ messages.controls.menu.desc }}</p>
      </header>

      <section id="menu-playground" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.playground }}</h2>
        </div>

        <DemoPlayground :code="playgroundCode">
          <template #stage>
            <VfkMenu
              :key="split ? 'split' : 'single'"
              :open-on-hover="openOnHover"
              :persist-on-item-click="persistOnItemClick"
              :split="split"
            >
              <template v-if="split" #primary-action>
                <VfkButton appearance="primary" @click="handleSelect('primary-save')">
                  {{ messages.controls.menu.primaryActionLabel }}
                </VfkButton>
              </template>
              <template #trigger>
                <VfkMenuButton
                  v-if="split"
                  appearance="primary"
                  :aria-label="messages.controls.menu.triggerLabel"
                />
                <VfkMenuButton v-else>
                  <template #start><DemoIcons name="menu" :size="14" /></template>
                  {{ messages.controls.menu.triggerLabel }}
                </VfkMenuButton>
              </template>
              <VfkMenuList @select="handleSelect">
                <VfkMenuItem value="new" :label="messages.controls.menu.itemNew">
                  <template #start><DemoIcons name="plus" :size="14" /></template>
                  <template #end>Ctrl+N</template>
                </VfkMenuItem>
                <VfkMenuItem value="copy" :label="messages.controls.menu.itemCopy">
                  <template #start><DemoIcons name="copy" :size="14" /></template>
                  <template #end>Ctrl+D</template>
                </VfkMenuItem>
                <VfkMenuItem value="export" :label="messages.controls.menu.itemExport">
                  <template #start><DemoIcons name="code" :size="14" /></template>
                </VfkMenuItem>
                <VfkMenuDivider />
                <VfkMenuItem value="archive" :label="messages.controls.menu.itemDisabled" disabled />
                <VfkMenuItem value="delete" :label="messages.controls.menu.itemDelete">
                  <template #start><DemoIcons name="close" :size="14" /></template>
                </VfkMenuItem>
              </VfkMenuList>
            </VfkMenu>
          </template>

          <template #readout>
            <span>{{ messages.controls.menu.lastAction }}:</span>
            <code class="demo-inline-code">{{ lastAction || messages.controls.menu.noneAction }}</code>
          </template>

          <template #controls>
            <div class="demo-control-checks">
              <VfkCheckbox v-model="openOnHover" label="openOnHover" />
              <VfkCheckbox v-model="persistOnItemClick" label="persistOnItemClick" />
              <VfkCheckbox v-model="split" label="split" />
            </div>
          </template>
        </DemoPlayground>
      </section>

      <section id="menu-check-radio" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.menu.secCheckRadio }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.menu.cardCheckRadioTitle"
          :description="messages.controls.menu.cardCheckRadioDesc"
          :code="checkRadioCode"
        >
          <div class="demo-row" style="align-items: center; flex-wrap: wrap; gap: 16px">
            <VfkMenu>
              <template #trigger>
                <VfkMenuButton appearance="outline">
                  {{ messages.controls.menu.checkRadioTrigger }}
                </VfkMenuButton>
              </template>
              <VfkMenuList>
                <VfkMenuItem
                  v-model:checked="showGrid"
                  role="menuitemcheckbox"
                  value="grid"
                  :label="messages.controls.menu.checkGrid"
                />
                <VfkMenuItem
                  v-model:checked="showRuler"
                  role="menuitemcheckbox"
                  value="ruler"
                  :label="messages.controls.menu.checkRuler"
                />
                <VfkMenuDivider />
                <VfkMenuItem
                  v-model:checked="sortAsc"
                  role="menuitemradio"
                  value="asc"
                  :label="messages.controls.menu.radioAsc"
                />
                <VfkMenuItem
                  v-model:checked="sortDesc"
                  role="menuitemradio"
                  value="desc"
                  :label="messages.controls.menu.radioDesc"
                />
              </VfkMenuList>
            </VfkMenu>

            <div class="demo-row" style="gap: 8px; font-size: 12px; color: var(--colorNeutralForeground3)">
              <code class="demo-inline-code">grid={{ showGrid }}</code>
              <code class="demo-inline-code">ruler={{ showRuler }}</code>
              <code class="demo-inline-code">sort={{ sortAsc ? 'asc' : 'desc' }}</code>
            </div>
          </div>
        </DemoCard>
      </section>

      <section id="menu-submenu" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.controls.menu.secSubmenuContext }}</h2>
        </div>

        <DemoCard
          :title="messages.controls.menu.cardSubmenuTitle"
          :description="messages.controls.menu.cardSubmenuDesc"
          :code="submenuCode"
        >
          <div class="demo-row" style="align-items: center; flex-wrap: wrap; gap: 16px">
            <VfkMenu>
              <template #trigger>
                <VfkMenuButton>
                  {{ messages.controls.menu.submenuTrigger }}
                </VfkMenuButton>
              </template>
              <VfkMenuList @select="handleContextSelect">
                <VfkMenuItem value="new" :label="messages.controls.menu.itemNew" />
                <VfkMenuItem :label="messages.controls.menu.submenuShare">
                  <VfkMenuList>
                    <VfkMenuItem value="copy-link" :label="messages.controls.menu.submenuCopyLink" />
                    <VfkMenuItem value="email" :label="messages.controls.menu.submenuEmail" />
                  </VfkMenuList>
                </VfkMenuItem>
              </VfkMenuList>
            </VfkMenu>

            <VfkMenu open-on-context>
              <template #trigger>
                <div
                  tabindex="0"
                  style="
                    padding: 10px 16px;
                    border: 1px dashed var(--colorNeutralStroke1);
                    border-radius: var(--borderRadiusMedium);
                    background: var(--colorNeutralBackground2);
                    color: var(--colorNeutralForeground2);
                    font-size: 13px;
                    cursor: context-menu;
                    user-select: none;
                  "
                >
                  {{ messages.controls.menu.contextZoneHint }}
                </div>
              </template>
              <VfkMenuList @select="handleContextSelect">
                <VfkMenuItem value="context-copy" :label="messages.controls.menu.itemCopy" />
                <VfkMenuItem value="context-export" :label="messages.controls.menu.itemExport" />
                <VfkMenuDivider />
                <VfkMenuItem value="context-delete" :label="messages.controls.menu.itemDelete" />
              </VfkMenuList>
            </VfkMenu>

            <code v-if="contextAction" class="demo-inline-code">{{ contextAction }}</code>
          </div>
        </DemoCard>
      </section>

      <section id="menu-api" class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">API</h2>
        </div>

        <div class="demo-stack">
          <DemoApiTable title="VfkMenu Props" :rows="propRows" />
          <DemoApiTable :title="messages.controls.eventsSlots" :rows="eventSlotRows" kind="event" />
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
