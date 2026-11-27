<script setup lang="ts">
import { ref } from 'vue'
import { VThemeProvider, useTheme } from '../../index'
import { demoBrandPresets, type BrandPreset } from '../brand-presets'
import DemoIcons from '../components/DemoIcons.vue'
import DemoLogo from '../components/DemoLogo.vue'

export type DemoPageId = 'overview' | 'tokens'

const emit = defineEmits<{
  navigate: [page: DemoPageId]
}>()

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
    desc: 'CSS 变量天然穿透 Shadow DOM，颜色、圆角、字体、间距统一通过 Token 调整。',
    sample: '--colorBrandBackground: #6b4fbb;',
  },
  {
    level: 'L2 推荐',
    title: '官方 ::part() 局部微调',
    desc: '需要修改内部结构样式时，仅使用官方公开暴露的 part 名称，不依赖私有节点。',
    sample: 'fluent-text-input::part(control) { ... }',
  },
  {
    level: 'L3 常规',
    title: '宿主与插槽布局样式',
    desc: '宽高、外边距以及 Acrylic / Mica 材质容器直接作用于宿主标签和 Light DOM 插槽。',
    sample: '.vfk-surface-acrylic { backdrop-filter: ... }',
  },
  {
    level: 'L4 禁止',
    title: '禁止强行穿透内部结构',
    desc: '不通过脚本篡改 shadowRoot，不依赖未声明的内部类名；Vue 的 :deep() 对 Shadow DOM 无效。',
    sample: '× shadowRoot / :deep()',
  },
]

const roadmapItems = [
  { name: 'VButton', tag: '<fluent-button>', desc: '基础操作按钮、外观/形状/尺寸、图标插槽与 disabledFocusable' },
  { name: 'VToggleButton', tag: '<fluent-toggle-button>', desc: '可切换按压状态的双态/三态按钮，支持 v-model' },
  { name: 'VInput', tag: '<fluent-text-input>', desc: '受控文本输入、v-model 双向绑定、前后缀插槽与尺寸映射' },
  { name: 'VCheckbox', tag: '<fluent-checkbox>', desc: '支持 boolean / mixed 三态的复选框与标签组合' },
  { name: 'VSelect / VOption', tag: '<fluent-dropdown>', desc: '基于官方下拉选择组件封装的受控选择器' },
  { name: '更多 Fluent 2 控件', tag: '<fluent-*>', desc: 'Switch、Dialog、Drawer、Tabs、Menu、Tooltip 按需逐步扩充' },
]
</script>

<template>
  <div>
    <!-- Hero 与主题/材质实时预览 -->
    <section class="demo-hero">
      <div>
        <div class="demo-hero__brand-row">
          <DemoLogo :size="40" />
          <p class="demo-page-header__eyebrow" style="margin: 0">
            Fluent 2 · @fluentui/web-components v3 · Vue 3
          </p>
        </div>

        <h1 class="demo-hero__title">vue-fluent-kit</h1>
        <p class="demo-hero__desc">
          基于微软官方 <code class="demo-inline-code">@fluentui/web-components</code> 的 Vue 3 轻量封装组件库。
          采用薄封装策略，保留官方原生交互与无障碍实现，聚焦
          <code class="demo-inline-code">v-model</code> 双向绑定、TypeScript 类型提示与 Fluent 2 Design Tokens 主题体系。
        </p>

        <div class="demo-row">
          <button
            type="button"
            class="demo-btn demo-btn--primary"
            @click="emit('navigate', 'tokens')"
          >
            <span>查看 Design Tokens 与材质</span>
            <DemoIcons name="arrow-right" :size="15" />
          </button>
          <a
            class="demo-btn demo-btn--outline"
            href="https://github.com/yysubs/vue-fluent-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DemoIcons name="github" :size="15" />
            <span>仓库源码</span>
          </a>
        </div>

        <div class="demo-hero__stats">
          <div>
            <div class="demo-stat__value">WC v3</div>
            <div class="demo-stat__label">开箱即用依赖 Fluent 2 官方组件</div>
          </div>
          <div>
            <div class="demo-stat__value">459+</div>
            <div class="demo-stat__label">语义 Token + Acrylic / Mica 材质</div>
          </div>
          <div>
            <div class="demo-stat__value">Light / Dark</div>
            <div class="demo-stat__label">全局切换、跟随系统与局部嵌套</div>
          </div>
        </div>
      </div>

      <!-- 右侧实时主题与材质工作台 -->
      <div class="demo-hero__showcase vfk-surface-mica-card">
        <div class="demo-stack">
          <div>
            <h2 class="demo-card__title">主题与品牌色实时切换</h2>
            <p class="demo-card__desc">
              当前解析主题：<code class="demo-inline-code">{{ resolvedTheme }}</code>。切换下方品牌色阶可实时驱动全局 Logo、强调色与云母底色。
            </p>
          </div>

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
            <VThemeProvider theme="light" class="demo-theme-pane">
              <div class="demo-theme-pane__head">
                <span class="demo-theme-pane__title">VThemeProvider · Light</span>
                <span class="demo-tag demo-tag--brand">浅色区域</span>
              </div>
              <div class="demo-surface-mini vfk-surface-acrylic">
                <DemoLogo :size="24" />
                <div>
                  <div class="demo-surface-mini__title">Acrylic 浮层卡片</div>
                  <div class="demo-surface-mini__sub">半透明毛玻璃 + 细描边</div>
                </div>
              </div>
            </VThemeProvider>

            <VThemeProvider theme="dark" class="demo-theme-pane">
              <div class="demo-theme-pane__head">
                <span class="demo-theme-pane__title">VThemeProvider · Dark</span>
                <span class="demo-tag demo-tag--brand">深色区域</span>
              </div>
              <div class="demo-surface-mini vfk-surface-acrylic">
                <DemoLogo :size="24" />
                <div>
                  <div class="demo-surface-mini__title">Acrylic 浮层卡片</div>
                  <div class="demo-surface-mini__sub">深色局部嵌套反色</div>
                </div>
              </div>
            </VThemeProvider>
          </div>
        </div>
      </div>
    </section>

    <!-- Shadow DOM 样式覆盖规范 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">Shadow DOM 样式覆盖规范</h2>
          <p class="demo-section__sub">
            封装层与业务方统一遵循四级优先级，确保官方底层升级平滑无破坏。
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

    <!-- 薄封装控件规划 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">按需封装路线（Skeleton Ready）</h2>
          <p class="demo-section__sub">
            基础骨架、Vite 自定义元素编译规则与 Design Tokens 主题层已就绪，后续按需逐个接入薄封装控件。
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
</template>
