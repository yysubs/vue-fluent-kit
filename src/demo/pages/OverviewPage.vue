<script setup lang="ts">
import { ref } from 'vue'
import { VThemeProvider, useTheme, version } from '../../index'
import { demoBrandPresets, type BrandPreset } from '../brand-presets'
import DemoIcons from '../components/DemoIcons.vue'
import DemoLogo from '../components/DemoLogo.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'

export type DemoPageId = 'overview' | 'tokens'

const emit = defineEmits<{
  navigate: [page: DemoPageId]
}>()

const tocItems: TocItem[] = [
  { id: 'intro-highlights', label: '核心架构' },
  { id: 'intro-theming', label: '主题、品牌色与材质' },
  { id: 'intro-shadow-rules', label: 'Shadow DOM 规范' },
  { id: 'intro-roadmap', label: '按需封装路线' },
]

const { resolvedTheme, applyBrandTokens, resetBrandTokens } = useTheme()
const activePresetId = ref<BrandPreset['id']>('default')

function selectBrand(preset: BrandPreset) {
  activePresetId.value = preset.id
  if (preset.brand) {
    applyBrandTokens(preset.brand)
  } else {
    resetBrandTokens()
  }
}

const stylingRules = [
  {
    level: 'L1 首选',
    title: '覆写 Design Tokens',
    desc: 'CSS 变量天然穿透 Shadow DOM，颜色、圆角、字体与间距统一通过 Token 覆盖。',
    sample: '--colorBrandBackground: #6b4fbb;',
  },
  {
    level: 'L2 推荐',
    title: '官方 ::part() 局部微调',
    desc: '需要调整内部节点样式时，仅使用官方公开暴露的 part 名称，不依赖私有结构。',
    sample: 'fluent-text-input::part(control) { ... }',
  },
  {
    level: 'L3 常规',
    title: '宿主与插槽布局样式',
    desc: '尺寸、外边距以及 Acrylic / Mica 材质表面直接作用于宿主标签与插槽内容。',
    sample: '.vfk-surface-acrylic { backdrop-filter: ... }',
  },
  {
    level: 'L4 禁止',
    title: '禁止强行穿透内部结构',
    desc: '不通过脚本修改 shadowRoot，不依赖未声明的内部类名；Vue 的 :deep() 对 Shadow DOM 无效。',
    sample: '× shadowRoot / :deep()',
  },
]

const roadmapItems = [
  { name: 'VButton', tag: '<fluent-button>', desc: '基础操作按钮、外观/形状/尺寸、图标插槽与 disabledFocusable' },
  { name: 'VToggleButton', tag: '<fluent-toggle-button>', desc: '支持 v-model 的按压切换按钮，保留官方 ARIA 状态' },
  { name: 'VInput', tag: '<fluent-text-input>', desc: '受控文本输入、v-model 双向绑定、前后缀插槽与尺寸映射' },
  { name: 'VCheckbox', tag: '<fluent-checkbox>', desc: '支持 boolean / mixed 三态的复选框与标签组合' },
  { name: 'VSelect / VOption', tag: '<fluent-dropdown>', desc: '基于官方下拉选择组件薄封装的受控选择器' },
  { name: '更多 Fluent 2 控件', tag: '<fluent-*>', desc: 'Switch、Dialog、Drawer、Tabs、Menu、Tooltip 按需逐步扩充' },
]
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
          基于官方 <code class="demo-inline-code">@fluentui/web-components</code>（Fluent 2 规范）的 Vue 3 轻量二次封装组件库。
          保留官方交互与无障碍逻辑，聚焦 <code class="demo-inline-code">v-model</code> 双向绑定、TypeScript 类型提示与独立 Design Tokens 主题体系。
        </p>
      </header>

      <!-- Storybook Introduction 顶部横幅 + 新 F Logo -->
      <div class="demo-intro-banner">
        <div class="demo-intro-banner__brand">
          <DemoLogo :size="52" />
          <div>
            <h2 class="demo-intro-banner__title">Fluent 2 Web Components for Vue 3</h2>
            <p class="demo-intro-banner__sub">
              开箱即用依赖 @fluentui/web-components v3 · 459+ 官方变量 · Acrylic / Mica 材质
            </p>
          </div>
        </div>
        <div class="demo-row">
          <button
            type="button"
            class="demo-btn demo-btn--primary"
            @click="emit('navigate', 'tokens')"
          >
            查看 Design Tokens
          </button>
          <a
            class="demo-btn demo-btn--outline"
            href="https://github.com/yysubs/vue-fluent-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 源码
          </a>
        </div>
      </div>

      <!-- 核心架构（仿 What's new 三列卡） -->
      <section id="intro-highlights" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">核心架构</h2>
        </div>

        <div class="demo-whatsnew-grid">
          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon demo-whatsnew-box__icon--vue">
              <DemoIcons name="sparkle" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">薄封装策略</h3>
            <p class="demo-whatsnew-box__desc">
              不重写底层交互与无障碍，仅封装 Vue <code class="demo-inline-code">v-model</code>、Props/Emits/Slots 类型与默认属性。
            </p>
          </div>

          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon">
              <DemoIcons name="palette" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">独立 Design Tokens</h3>
            <p class="demo-whatsnew-box__desc">
              拆分语义变量、品牌色与 Acrylic/Mica 材质层，支持 <code class="demo-inline-code">Web Light</code> / <code class="demo-inline-code">Web Dark</code> / <code class="demo-inline-code">System</code> 全局切换。
            </p>
          </div>

          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon demo-whatsnew-box__icon--vue">
              <DemoIcons name="layers" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">按需扩充与复用</h3>
            <p class="demo-whatsnew-box__desc">
              已配置 Vite <code class="demo-inline-code">isCustomElement</code> 与多入口子路径导出，开箱即用，便于作为私有包或 Monorepo 子包复用。
            </p>
          </div>
        </div>
      </section>

      <!-- 主题、品牌色与材质实时预览 -->
      <section id="intro-theming" class="demo-section">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">主题、品牌色与材质</h2>
            <p class="demo-section__sub">
              当前解析主题：<code class="demo-inline-code">{{ resolvedTheme }}</code>。切换品牌色阶可实时覆盖全站强调色，下方同时演示 <code class="demo-inline-code">VThemeProvider</code> 局部反色与 Acrylic 浮层材质。
            </p>
          </div>
        </div>

        <div class="demo-composite-card">
          <div class="demo-stack">
            <div class="demo-brand-pills" role="group" aria-label="选择品牌色">
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
                <span>{{ preset.label }}</span>
              </button>
            </div>

            <div class="demo-theme-split">
              <VThemeProvider theme="light" class="demo-theme-pane vfk-surface-mica">
                <div class="demo-theme-pane__head">
                  <span class="demo-theme-pane__title">VThemeProvider · Light</span>
                  <span class="demo-tag demo-tag--brand">浅色区域</span>
                </div>
                <div class="demo-surface-mini vfk-surface-acrylic">
                  <DemoLogo :size="26" />
                  <div>
                    <div class="demo-surface-mini__title">Acrylic 浮层 + Mica 底板</div>
                    <div class="demo-surface-mini__sub">半透明毛玻璃 + 细高光描边</div>
                  </div>
                </div>
              </VThemeProvider>

              <VThemeProvider theme="dark" class="demo-theme-pane vfk-surface-mica">
                <div class="demo-theme-pane__head">
                  <span class="demo-theme-pane__title">VThemeProvider · Dark</span>
                  <span class="demo-tag demo-tag--brand">深色区域</span>
                </div>
                <div class="demo-surface-mini vfk-surface-acrylic">
                  <DemoLogo :size="26" />
                  <div>
                    <div class="demo-surface-mini__title">Acrylic 浮层 + Mica 底板</div>
                    <div class="demo-surface-mini__sub">任意层级局部嵌套反色</div>
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
            <h2 class="demo-section__title">Shadow DOM 样式覆盖规范</h2>
            <p class="demo-section__sub">
              统一遵循以下四级优先级，避免强行穿透内部私有结构导致官方升级失效。
            </p>
          </div>
        </div>

        <div class="demo-spec-grid">
          <article v-for="rule in stylingRules" :key="rule.level" class="demo-spec-card">
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
            <h2 class="demo-section__title">按需封装路线</h2>
            <p class="demo-section__sub">
              Demo 骨架、Logo、主题/材质层与 Vite 自定义元素编译规则已就绪，后续按需逐个薄封装接入。
            </p>
          </div>
        </div>

        <div class="demo-roadmap-grid">
          <article v-for="item in roadmapItems" :key="item.name" class="demo-roadmap-card">
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
