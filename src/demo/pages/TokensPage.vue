<script setup lang="ts">
import { computed, ref } from 'vue'
import { VfkSearchBox } from '../../index'
import DemoIcons from '../components/DemoIcons.vue'
import DemoLogo from '../components/DemoLogo.vue'
import { useDemoI18n } from '../i18n'

type TokenTab = 'colors' | 'surfaces' | 'typography' | 'elevation' | 'spacing'

const { messages } = useDemoI18n()

const activeTab = ref<TokenTab>('colors')
const keyword = ref('')
const copiedToken = ref('')
let copyTimer: ReturnType<typeof setTimeout> | null = null

const colorGroupDefs: { key: 'background' | 'foregroundStroke' | 'brand' | 'status'; tokens: string[] }[] = [
  {
    key: 'background',
    tokens: [
      '--colorNeutralBackground1',
      '--colorNeutralBackground2',
      '--colorNeutralBackground3',
      '--colorNeutralBackground4',
      '--colorNeutralBackgroundDisabled',
      '--colorNeutralBackgroundInverted',
    ],
  },
  {
    key: 'foregroundStroke',
    tokens: [
      '--colorNeutralForeground1',
      '--colorNeutralForeground2',
      '--colorNeutralForeground3',
      '--colorNeutralForegroundDisabled',
      '--colorNeutralStroke1',
      '--colorNeutralStroke2',
      '--colorNeutralStrokeAccessible',
      '--colorStrokeFocus2',
    ],
  },
  {
    key: 'brand',
    tokens: [
      '--colorBrandBackground',
      '--colorBrandBackgroundHover',
      '--colorBrandBackgroundPressed',
      '--colorBrandBackground2',
      '--colorBrandForeground1',
      '--colorCompoundBrandStroke',
    ],
  },
  {
    key: 'status',
    tokens: [
      '--colorStatusSuccessBackground1',
      '--colorStatusSuccessBackground3',
      '--colorStatusWarningBackground1',
      '--colorStatusWarningBackground3',
      '--colorStatusDangerBackground1',
      '--colorStatusDangerBackground3',
    ],
  },
]

const surfaceTokenKeys = [
  '--vfkSurfaceAcrylicBg',
  '--vfkSurfaceAcrylicBlur',
  '--vfkSurfaceAcrylicBorder',
  '--vfkSurfaceMicaBg',
  '--vfkSurfaceMicaCardBg',
]

const filteredColorGroups = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  const groups = colorGroupDefs.map((def) => ({
    key: def.key,
    name: messages.value.tokens.colorGroups[def.key],
    items: def.tokens.map((token) => ({
      token,
      label: messages.value.tokens.colorLabels[token] ?? token,
    })),
  }))

  if (!q) return groups
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          item.token.toLowerCase().includes(q) ||
          item.label.toLowerCase().includes(q) ||
          g.name.toLowerCase().includes(q),
      ),
    }))
    .filter((g) => g.items.length > 0)
})

const typeScale = [
  { name: 'caption1', size: '--fontSizeBase200', line: '--lineHeightBase200', weight: '--fontWeightRegular', spec: '12px / 16px · 400' },
  { name: 'body1', size: '--fontSizeBase300', line: '--lineHeightBase300', weight: '--fontWeightRegular', spec: '14px / 20px · 400' },
  { name: 'body1Strong', size: '--fontSizeBase300', line: '--lineHeightBase300', weight: '--fontWeightSemibold', spec: '14px / 20px · 600' },
  { name: 'body2', size: '--fontSizeBase400', line: '--lineHeightBase400', weight: '--fontWeightRegular', spec: '16px / 22px · 400' },
  { name: 'subtitle1', size: '--fontSizeBase500', line: '--lineHeightBase500', weight: '--fontWeightSemibold', spec: '20px / 28px · 600' },
  { name: 'title3', size: '--fontSizeBase600', line: '--lineHeightBase600', weight: '--fontWeightSemibold', spec: '24px / 32px · 600' },
  { name: 'title2', size: '--fontSizeHero700', line: '--lineHeightHero700', weight: '--fontWeightSemibold', spec: '28px / 36px · 600' },
]

const shadowTokenKeys = ['--shadow2', '--shadow4', '--shadow8', '--shadow16', '--shadow28', '--shadow64']

const radiusTokens = [
  { token: '--borderRadiusNone', px: '0' },
  { token: '--borderRadiusSmall', px: '2px' },
  { token: '--borderRadiusMedium', px: '4px' },
  { token: '--borderRadiusLarge', px: '6px' },
  { token: '--borderRadiusXLarge', px: '8px' },
  { token: '--borderRadius2XLarge', px: '12px' },
  { token: '--borderRadiusCircular', px: '10000px' },
]

const spacingTokens = [
  { token: '--spacingHorizontalXXS', px: '2px' },
  { token: '--spacingHorizontalXS', px: '4px' },
  { token: '--spacingHorizontalSNudge', px: '6px' },
  { token: '--spacingHorizontalS', px: '8px' },
  { token: '--spacingHorizontalMNudge', px: '10px' },
  { token: '--spacingHorizontalM', px: '12px' },
  { token: '--spacingHorizontalL', px: '16px' },
  { token: '--spacingHorizontalXL', px: '20px' },
  { token: '--spacingHorizontalXXL', px: '24px' },
  { token: '--spacingHorizontalXXXL', px: '32px' },
]

async function copyToken(token: string) {
  const value = `var(${token})`
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copiedToken.value = token
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copiedToken.value = ''
  }, 1500)
}
</script>

<template>
  <div>
    <header class="demo-page-header">
      <p class="demo-page-header__eyebrow">{{ messages.tokens.eyebrow }}</p>
      <div class="demo-page-header__title-row">
        <h1 class="demo-page-header__title">Design Tokens</h1>
        <div class="demo-page-header__tags">
          <span class="demo-tag demo-tag--brand">@fluentui/tokens</span>
          <span class="demo-tag">Acrylic &amp; Mica</span>
        </div>
      </div>
      <p class="demo-page-header__desc">
        {{ messages.tokens.descBeforeCode }}
        <code class="demo-inline-code">@fluentui/web-components</code>
        {{ messages.tokens.descMidCode }}
        <code class="demo-inline-code">var(--token)</code>
        {{ messages.tokens.descAfterCode }}
      </p>
    </header>

    <div class="demo-token-toolbar">
      <div class="demo-token-tabs" role="tablist" :aria-label="messages.tokens.tabsAriaLabel">
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'colors' }"
          :aria-selected="activeTab === 'colors'"
          @click="activeTab = 'colors'"
        >
          {{ messages.tokens.tabColors }}
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'surfaces' }"
          :aria-selected="activeTab === 'surfaces'"
          @click="activeTab = 'surfaces'"
        >
          {{ messages.tokens.tabSurfaces }}
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'typography' }"
          :aria-selected="activeTab === 'typography'"
          @click="activeTab = 'typography'"
        >
          {{ messages.tokens.tabTypography }}
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'elevation' }"
          :aria-selected="activeTab === 'elevation'"
          @click="activeTab = 'elevation'"
        >
          {{ messages.tokens.tabElevation }}
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'spacing' }"
          :aria-selected="activeTab === 'spacing'"
          @click="activeTab = 'spacing'"
        >
          {{ messages.tokens.tabSpacing }}
        </button>
      </div>

      <VfkSearchBox
        v-if="activeTab === 'colors'"
        v-model="keyword"
        appearance="filled-darker"
        size="medium"
        :placeholder="messages.tokens.filterPlaceholder"
        :aria-label="messages.tokens.filterAriaLabel"
        :dismiss-label="messages.tokens.clearFilterAriaLabel"
        style="width: 240px"
      />
    </div>

    <!-- 颜色变量 -->
    <template v-if="activeTab === 'colors'">
      <section
        v-for="(group, idx) in filteredColorGroups"
        :key="group.key"
        class="demo-section"
        :class="{ 'demo-section--first': idx === 0 }"
      >
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ group.name }}</h2>
        </div>

        <div class="demo-swatch-grid">
          <button
            v-for="item in group.items"
            :key="item.token"
            type="button"
            class="demo-swatch-card"
            @click="copyToken(item.token)"
          >
            <span class="demo-swatch-card__color" :style="{ background: `var(${item.token})` }" />
            <span class="demo-swatch-card__info">
              <span class="demo-swatch-card__top">
                <span class="demo-swatch-card__label">{{ item.label }}</span>
                <span v-if="copiedToken === item.token" class="demo-swatch-card__copied">
                  {{ messages.common.copied }}
                </span>
              </span>
              <code class="demo-swatch-card__var">{{ item.token }}</code>
            </span>
          </button>
        </div>
      </section>

      <p v-if="filteredColorGroups.length === 0" class="demo-section__sub">
        {{ messages.tokens.emptyFilterPrefix }}{{ keyword }}{{ messages.tokens.emptyFilterSuffix }}
      </p>
    </template>

    <!-- 材质表面（Acrylic / Mica） -->
    <template v-else-if="activeTab === 'surfaces'">
      <section class="demo-section demo-section--first">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">{{ messages.tokens.surfacesTitle }}</h2>
            <p class="demo-section__sub">{{ messages.tokens.surfacesSub }}</p>
          </div>
        </div>

        <div class="demo-cards-grid">
          <div class="demo-surface-stage demo-surface-stage--acrylic">
            <div class="demo-surface-panel vfk-surface-acrylic">
              <div class="demo-row" style="align-items: center">
                <DemoLogo :size="32" />
                <div>
                  <h3 class="demo-card__title">{{ messages.tokens.acrylicTitle }}</h3>
                  <p class="demo-card__desc">{{ messages.tokens.acrylicDesc }}</p>
                </div>
              </div>
              <code class="demo-inline-code">.vfk-surface-acrylic</code>
            </div>
          </div>

          <div class="demo-surface-stage vfk-surface-mica">
            <div class="demo-surface-panel vfk-surface-mica-card">
              <div class="demo-row" style="align-items: center">
                <DemoLogo :size="32" />
                <div>
                  <h3 class="demo-card__title">{{ messages.tokens.micaTitle }}</h3>
                  <p class="demo-card__desc">{{ messages.tokens.micaDesc }}</p>
                </div>
              </div>
              <code class="demo-inline-code">.vfk-surface-mica / .vfk-surface-mica-card</code>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.tokens.surfaceListTitle }}</h2>
        </div>
        <div class="demo-type-list">
          <div v-for="token in surfaceTokenKeys" :key="token" class="demo-type-row">
            <code class="demo-api-name">{{ token }}</code>
            <span class="demo-card__desc" style="margin: 0">
              {{ messages.tokens.surfaceNotes[token] }}
            </span>
            <button
              type="button"
              class="demo-btn demo-btn--subtle demo-btn--small"
              @click="copyToken(token)"
            >
              {{ copiedToken === token ? messages.common.copied : messages.common.copy }}
            </button>
          </div>
        </div>
      </section>
    </template>

    <!-- 排版刻度 -->
    <section v-else-if="activeTab === 'typography'" class="demo-section demo-section--first">
      <div class="demo-type-list">
        <div v-for="item in typeScale" :key="item.name" class="demo-type-row">
          <div>
            <code class="demo-api-name">{{ item.name }}</code>
            <div class="demo-card__desc">{{ item.spec }}</div>
          </div>
          <div
            :style="{
              fontSize: `var(${item.size})`,
              lineHeight: `var(${item.line})`,
              fontWeight: `var(${item.weight})`,
            }"
          >
            {{ messages.tokens.typeSamples[item.name] }}
          </div>
          <button
            type="button"
            class="demo-btn demo-btn--subtle demo-btn--small"
            @click="copyToken(item.size)"
          >
            {{ copiedToken === item.size ? messages.common.copied : messages.common.copyFontSize }}
          </button>
        </div>
      </div>
    </section>

    <!-- 圆角与阴影 -->
    <template v-else-if="activeTab === 'elevation'">
      <section class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.tokens.shadowsTitle }}</h2>
        </div>
        <div class="demo-shadow-grid">
          <button
            v-for="token in shadowTokenKeys"
            :key="token"
            type="button"
            class="demo-shadow-tile"
            :style="{ boxShadow: `var(${token})`, cursor: 'pointer', textAlign: 'left' }"
            @click="copyToken(token)"
          >
            <code class="demo-api-name">{{ token }}</code>
            <span class="demo-card__desc">
              {{ copiedToken === token ? messages.common.copiedVar : messages.tokens.shadowNotes[token] }}
            </span>
          </button>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.tokens.radiusTitle }}</h2>
        </div>
        <div class="demo-radius-grid">
          <button
            v-for="item in radiusTokens"
            :key="item.token"
            type="button"
            class="demo-radius-tile"
            style="cursor: pointer"
            @click="copyToken(item.token)"
          >
            <span class="demo-radius-box" :style="{ borderRadius: `var(${item.token})` }" />
            <code class="demo-swatch-card__var">{{ item.token }}</code>
            <span class="demo-card__desc">
              {{ copiedToken === item.token ? messages.common.copied : item.px }}
            </span>
          </button>
        </div>
      </section>
    </template>

    <!-- 间距刻度 -->
    <section v-else class="demo-section demo-section--first">
      <div class="demo-type-list">
        <div v-for="item in spacingTokens" :key="item.token" class="demo-type-row">
          <code class="demo-api-name">{{ item.token }}</code>
          <div style="display: flex; align-items: center; gap: 12px">
            <span
              :style="{
                display: 'inline-block',
                height: '12px',
                width: `var(${item.token})`,
                borderRadius: 'var(--borderRadiusSmall)',
                background: 'var(--colorBrandBackground)',
              }"
            />
            <span class="demo-card__desc" style="margin: 0">{{ item.px }}</span>
          </div>
          <button
            type="button"
            class="demo-btn demo-btn--subtle demo-btn--small"
            @click="copyToken(item.token)"
          >
            {{ copiedToken === item.token ? messages.common.copied : messages.common.copy }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
