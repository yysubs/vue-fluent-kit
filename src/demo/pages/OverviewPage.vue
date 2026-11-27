<script setup lang="ts">
import { computed, ref } from 'vue'
import { VThemeProvider, useTheme, version } from '../../index'
import { demoBrandPresets, type BrandPreset } from '../brand-presets'
import DemoIcons from '../components/DemoIcons.vue'
import DemoLogo from '../components/DemoLogo.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'
import { useDemoI18n } from '../i18n'

export type DemoPageId = 'overview' | 'tokens'

const emit = defineEmits<{
  navigate: [page: DemoPageId]
}>()

const { resolvedTheme, applyBrandTokens, resetBrandTokens } = useTheme()
const { messages } = useDemoI18n()
const activePresetId = ref<BrandPreset['id']>('default')

const tocItems = computed<TocItem[]>(() => [
  { id: 'intro-highlights', label: messages.value.overview.tocHighlights },
  { id: 'intro-theming', label: messages.value.overview.tocTheming },
  { id: 'intro-shadow-rules', label: messages.value.overview.tocShadowRules },
  { id: 'intro-roadmap', label: messages.value.overview.tocRoadmap },
])

function selectBrand(preset: BrandPreset) {
  activePresetId.value = preset.id
  if (preset.brand) {
    applyBrandTokens(preset.brand)
  } else {
    resetBrandTokens()
  }
}
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
      <header class="demo-page-header">
        <h1 class="demo-page-header__title">
          vue-fluent-kit
          <span class="demo-page-header__version">v{{ version }}</span>
        </h1>
        <p class="demo-page-header__desc">
          {{ messages.overview.descBeforeCode }}
          <code class="demo-inline-code">@fluentui/web-components</code>
          {{ messages.overview.descMidCode }}
          <code class="demo-inline-code">v-model</code>
          {{ messages.overview.descAfterCode }}
        </p>
      </header>

      <!-- Storybook Introduction 顶部横幅 + 新 F Logo -->
      <div class="demo-intro-banner">
        <div class="demo-intro-banner__brand">
          <DemoLogo :size="52" />
          <div>
            <h2 class="demo-intro-banner__title">{{ messages.overview.bannerTitle }}</h2>
            <p class="demo-intro-banner__sub">{{ messages.overview.bannerSub }}</p>
          </div>
        </div>
        <div class="demo-row">
          <button
            type="button"
            class="demo-btn demo-btn--primary"
            @click="emit('navigate', 'tokens')"
          >
            {{ messages.overview.ctaTokens }}
          </button>
          <a
            class="demo-btn demo-btn--outline"
            href="https://github.com/yysubs/vue-fluent-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ messages.overview.ctaGithub }}
          </a>
        </div>
      </div>

      <!-- 核心架构（仿 What's new 三列卡） -->
      <section id="intro-highlights" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">{{ messages.overview.highlightsTitle }}</h2>
        </div>

        <div class="demo-whatsnew-grid">
          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon demo-whatsnew-box__icon--vue">
              <DemoIcons name="sparkle" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">{{ messages.overview.highlights.thinTitle }}</h3>
            <p class="demo-whatsnew-box__desc">
              {{ messages.overview.highlights.thinDescBefore }}
              <code class="demo-inline-code">v-model</code>
              {{ messages.overview.highlights.thinDescAfter }}
            </p>
          </div>

          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon">
              <DemoIcons name="palette" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">{{ messages.overview.highlights.tokensTitle }}</h3>
            <p class="demo-whatsnew-box__desc">
              {{ messages.overview.highlights.tokensDescBefore }}
              <code class="demo-inline-code">Light / Dark / System</code>
              {{ messages.overview.highlights.tokensDescAfter }}
            </p>
          </div>

          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon demo-whatsnew-box__icon--vue">
              <DemoIcons name="layers" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">{{ messages.overview.highlights.reuseTitle }}</h3>
            <p class="demo-whatsnew-box__desc">
              {{ messages.overview.highlights.reuseDescBefore }}
              <code class="demo-inline-code">isCustomElement</code>
              {{ messages.overview.highlights.reuseDescAfter }}
            </p>
          </div>
        </div>
      </section>

      <!-- 主题、品牌色与材质实时预览 -->
      <section id="intro-theming" class="demo-section">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">{{ messages.overview.themingTitle }}</h2>
            <p class="demo-section__sub">
              {{ messages.overview.themingSubPrefix }}
              <code class="demo-inline-code">{{ resolvedTheme }}</code>
              {{ messages.overview.themingSubMid }}
              <code class="demo-inline-code">VThemeProvider</code>
              {{ messages.overview.themingSubSuffix }}
            </p>
          </div>
        </div>

        <div class="demo-composite-card">
          <div class="demo-stack">
            <div
              class="demo-brand-pills"
              role="group"
              :aria-label="messages.overview.brandGroupAriaLabel"
            >
              <button
                v-for="preset in demoBrandPresets"
                :key="preset.id"
                type="button"
                class="demo-brand-pill"
                :class="{ 'demo-brand-pill--active': activePresetId === preset.id }"
                :aria-pressed="activePresetId === preset.id"
                @click="selectBrand(preset)"
              >
                <span class="demo-brand-pill__dot" :style="{ background: preset.swatch }" />
                <span>{{ messages.brands[preset.id] }}</span>
              </button>
            </div>

            <div class="demo-theme-split">
              <VThemeProvider theme="light" class="demo-theme-pane vfk-surface-mica">
                <div class="demo-theme-pane__head">
                  <span class="demo-theme-pane__title">VThemeProvider · Light</span>
                  <span class="demo-tag demo-tag--brand">{{ messages.overview.scopedLightTag }}</span>
                </div>
                <div class="demo-surface-mini vfk-surface-acrylic">
                  <DemoLogo :size="26" />
                  <div>
                    <div class="demo-surface-mini__title">{{ messages.overview.scopedAcrylicTitle }}</div>
                    <div class="demo-surface-mini__sub">{{ messages.overview.scopedLightSub }}</div>
                  </div>
                </div>
              </VThemeProvider>

              <VThemeProvider theme="dark" class="demo-theme-pane vfk-surface-mica">
                <div class="demo-theme-pane__head">
                  <span class="demo-theme-pane__title">VThemeProvider · Dark</span>
                  <span class="demo-tag demo-tag--brand">{{ messages.overview.scopedDarkTag }}</span>
                </div>
                <div class="demo-surface-mini vfk-surface-acrylic">
                  <DemoLogo :size="26" />
                  <div>
                    <div class="demo-surface-mini__title">{{ messages.overview.scopedAcrylicTitle }}</div>
                    <div class="demo-surface-mini__sub">{{ messages.overview.scopedDarkSub }}</div>
                  </div>
                </div>
              </VThemeProvider>
            </div>
          </div>
        </div>
      </section>

      <!-- Shadow DOM 样式覆盖规范 -->
      <section id="intro-shadow-rules" class="demo-section">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">{{ messages.overview.shadowTitle }}</h2>
            <p class="demo-section__sub">{{ messages.overview.shadowSub }}</p>
          </div>
        </div>

        <div class="demo-spec-grid">
          <article
            v-for="rule in messages.overview.shadowRules"
            :key="rule.level"
            class="demo-spec-card"
          >
            <div class="demo-spec-card__head">
              <span class="demo-tag demo-tag--brand">{{ rule.level }}</span>
              <h3 class="demo-catalog-card__title">{{ rule.title }}</h3>
            </div>
            <p class="demo-catalog-card__desc">{{ rule.desc }}</p>
            <code class="demo-inline-code demo-spec-card__code">{{ rule.sample }}</code>
          </article>
        </div>
      </section>

      <!-- 按需封装路线 -->
      <section id="intro-roadmap" class="demo-section">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">{{ messages.overview.roadmapTitle }}</h2>
            <p class="demo-section__sub">{{ messages.overview.roadmapSub }}</p>
          </div>
        </div>

        <div class="demo-roadmap-grid">
          <article
            v-for="item in messages.overview.roadmapItems"
            :key="item.name"
            class="demo-roadmap-card"
          >
            <div class="demo-roadmap-card__top">
              <span class="demo-catalog-card__title">{{ item.name }}</span>
              <code class="demo-inline-code">{{ item.tag }}</code>
            </div>
            <p class="demo-catalog-card__desc">{{ item.desc }}</p>
          </article>
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
