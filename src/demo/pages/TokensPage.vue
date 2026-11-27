<script setup lang="ts">
import { computed, ref } from 'vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoLogo from '../components/DemoLogo.vue'

type TokenTab = 'colors' | 'surfaces' | 'typography' | 'elevation' | 'spacing'

interface ColorTokenItem {
  token: string
  label: string
  category: string
}

const activeTab = ref<TokenTab>('colors')
const keyword = ref('')
const copiedToken = ref('')
let copyTimer: ReturnType<typeof setTimeout> | null = null

const colorGroups: { name: string; items: ColorTokenItem[] }[] = [
  {
    name: '中性背景（Background）',
    items: [
      { token: '--colorNeutralBackground1', label: '主面板 / 卡片', category: '背景' },
      { token: '--colorNeutralBackground2', label: '画布 / 次级面板', category: '背景' },
      { token: '--colorNeutralBackground3', label: '填充输入 / 侧栏', category: '背景' },
      { token: '--colorNeutralBackground4', label: '深层背景', category: '背景' },
      { token: '--colorNeutralBackgroundDisabled', label: '禁用背景', category: '背景' },
      { token: '--colorNeutralBackgroundInverted', label: '反色背景', category: '背景' },
    ],
  },
  {
    name: '中性文字与描边（Foreground & Stroke）',
    items: [
      { token: '--colorNeutralForeground1', label: '主正文', category: '前景' },
      { token: '--colorNeutralForeground2', label: '次要文字', category: '前景' },
      { token: '--colorNeutralForeground3', label: '说明文字', category: '前景' },
      { token: '--colorNeutralForegroundDisabled', label: '禁用文字', category: '前景' },
      { token: '--colorNeutralStroke1', label: '默认描边', category: '描边' },
      { token: '--colorNeutralStroke2', label: '分割线描边', category: '描边' },
      { token: '--colorNeutralStrokeAccessible', label: '高对比控件描边', category: '描边' },
      { token: '--colorStrokeFocus2', label: '键盘焦点外框', category: '描边' },
    ],
  },
  {
    name: '品牌色（Brand）',
    items: [
      { token: '--colorBrandBackground', label: '品牌主底色', category: '品牌' },
      { token: '--colorBrandBackgroundHover', label: '品牌悬停底色', category: '品牌' },
      { token: '--colorBrandBackgroundPressed', label: '品牌按下底色', category: '品牌' },
      { token: '--colorBrandBackground2', label: '品牌浅底色', category: '品牌' },
      { token: '--colorBrandForeground1', label: '品牌主前景', category: '品牌' },
      { token: '--colorCompoundBrandStroke', label: '品牌激活指示线', category: '品牌' },
    ],
  },
  {
    name: '语义状态色（Status）',
    items: [
      { token: '--colorStatusSuccessBackground1', label: '成功浅底', category: '状态' },
      { token: '--colorStatusSuccessBackground3', label: '成功实心', category: '状态' },
      { token: '--colorStatusWarningBackground1', label: '警告浅底', category: '状态' },
      { token: '--colorStatusWarningBackground3', label: '警告实心', category: '状态' },
      { token: '--colorStatusDangerBackground1', label: '错误浅底', category: '状态' },
      { token: '--colorStatusDangerBackground3', label: '错误实心', category: '状态' },
    ],
  },
]

const surfaceTokens = [
  { token: '--vfkSurfaceAcrylicBg', note: '亚克力半透明填充色' },
  { token: '--vfkSurfaceAcrylicBlur', note: '亚克力背景模糊半径（24px）' },
  { token: '--vfkSurfaceAcrylicBorder', note: '亚克力细高光描边' },
  { token: '--vfkSurfaceMicaBg', note: '云母画布柔和渐变底色' },
  { token: '--vfkSurfaceMicaCardBg', note: '云母次级卡片表面色' },
]

const filteredColorGroups = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) return colorGroups
  return colorGroups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          item.token.toLowerCase().includes(q) ||
          item.label.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      ),
    }))
    .filter((g) => g.items.length > 0)
})

const typeScale = [
  { name: 'caption1', size: '--fontSizeBase200', line: '--lineHeightBase200', weight: '--fontWeightRegular', spec: '12px / 16px · 400', sample: '辅助说明、表单提示与标注文本' },
  { name: 'body1', size: '--fontSizeBase300', line: '--lineHeightBase300', weight: '--fontWeightRegular', spec: '14px / 20px · 400', sample: '默认正文与表单控件内容排版' },
  { name: 'body1Strong', size: '--fontSizeBase300', line: '--lineHeightBase300', weight: '--fontWeightSemibold', spec: '14px / 20px · 600', sample: '按钮文字与强调型列表项' },
  { name: 'body2', size: '--fontSizeBase400', line: '--lineHeightBase400', weight: '--fontWeightRegular', spec: '16px / 22px · 400', sample: '大号控件与引导段落文字' },
  { name: 'subtitle1', size: '--fontSizeBase500', line: '--lineHeightBase500', weight: '--fontWeightSemibold', spec: '20px / 28px · 600', sample: '章节标题与对话框标题' },
  { name: 'title3', size: '--fontSizeBase600', line: '--lineHeightBase600', weight: '--fontWeightSemibold', spec: '24px / 32px · 600', sample: '模块主标题' },
  { name: 'title2', size: '--fontSizeHero700', line: '--lineHeightHero700', weight: '--fontWeightSemibold', spec: '28px / 36px · 600', sample: '页面级大标题' },
]

const shadowTokens = [
  { token: '--shadow2', note: '卡片默认轻阴影' },
  { token: '--shadow4', note: '卡片标准高度' },
  { token: '--shadow8', note: '悬停卡片 / Tooltip / Toast' },
  { token: '--shadow16', note: '菜单 / 下拉浮层 / Popover' },
  { token: '--shadow28', note: '抽屉面板' },
  { token: '--shadow64', note: '模态对话框' },
]

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
      <p class="demo-page-header__eyebrow">Theme</p>
      <div class="demo-page-header__title-row">
        <h1 class="demo-page-header__title">Design Tokens</h1>
        <div class="demo-page-header__tags">
          <span class="demo-tag demo-tag--brand">@fluentui/tokens</span>
          <span class="demo-tag">Acrylic &amp; Mica</span>
        </div>
      </div>
      <p class="demo-page-header__desc">
        所有颜色、字号、间距、圆角、阴影与材质变量统一维护在独立样式层，天然穿透
        <code class="demo-inline-code">@fluentui/web-components</code> 的 Shadow DOM。点击任意条目即可复制
        <code class="demo-inline-code">var(--token)</code>。
      </p>
    </header>

    <div class="demo-token-toolbar">
      <div class="demo-token-tabs" role="tablist" aria-label="变量分类">
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'colors' }"
          :aria-selected="activeTab === 'colors'"
          @click="activeTab = 'colors'"
        >
          颜色变量
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'surfaces' }"
          :aria-selected="activeTab === 'surfaces'"
          @click="activeTab = 'surfaces'"
        >
          材质表面
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'typography' }"
          :aria-selected="activeTab === 'typography'"
          @click="activeTab = 'typography'"
        >
          排版刻度
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'elevation' }"
          :aria-selected="activeTab === 'elevation'"
          @click="activeTab = 'elevation'"
        >
          圆角与阴影
        </button>
        <button
          type="button"
          role="tab"
          class="demo-token-tab"
          :class="{ 'demo-token-tab--active': activeTab === 'spacing' }"
          :aria-selected="activeTab === 'spacing'"
          @click="activeTab = 'spacing'"
        >
          间距刻度
        </button>
      </div>

      <div v-if="activeTab === 'colors'" class="demo-search-box" style="width: 240px">
        <span class="demo-search-box__icon" aria-hidden="true">
          <DemoIcons name="search" :size="14" />
        </span>
        <input
          v-model="keyword"
          type="text"
          class="demo-search-box__input"
          placeholder="筛选颜色变量..."
          aria-label="筛选颜色变量"
        />
        <button
          v-if="keyword"
          type="button"
          class="demo-search-box__clear"
          aria-label="清空筛选"
          @click="keyword = ''"
        >
          <DemoIcons name="close" :size="12" />
        </button>
      </div>
    </div>

    <!-- 颜色变量 -->
    <template v-if="activeTab === 'colors'">
      <section
        v-for="(group, idx) in filteredColorGroups"
        :key="group.name"
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
                <span v-if="copiedToken === item.token" class="demo-swatch-card__copied">已复制</span>
              </span>
              <code class="demo-swatch-card__var">{{ item.token }}</code>
            </span>
          </button>
        </div>
      </section>

      <p v-if="filteredColorGroups.length === 0" class="demo-section__sub">
        没有匹配「{{ keyword }}」的颜色变量。
      </p>
    </template>

    <!-- 材质表面（Acrylic / Mica） -->
    <template v-else-if="activeTab === 'surfaces'">
      <section class="demo-section demo-section--first">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">Acrylic（亚克力）与 Mica（云母）材质</h2>
            <p class="demo-section__sub">
              自动适配浅色/深色主题，在不支持 backdrop-filter 或开启「减少透明效果」时自动回退。
            </p>
          </div>
        </div>

        <div class="demo-cards-grid">
          <div class="demo-surface-stage demo-surface-stage--acrylic">
            <div class="demo-surface-panel vfk-surface-acrylic">
              <div class="demo-row" style="align-items: center">
                <DemoLogo :size="32" />
                <div>
                  <h3 class="demo-card__title">Acrylic 亚克力浮层</h3>
                  <p class="demo-card__desc">适合顶栏、浮层菜单、侧边抽屉与上下文卡片</p>
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
                  <h3 class="demo-card__title">Mica 云母画布</h3>
                  <p class="demo-card__desc">低饱和品牌色微染色，适合应用主底板与大面积容器</p>
                </div>
              </div>
              <code class="demo-inline-code">.vfk-surface-mica / .vfk-surface-mica-card</code>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">材质变量列表</h2>
        </div>
        <div class="demo-type-list">
          <div v-for="item in surfaceTokens" :key="item.token" class="demo-type-row">
            <code class="demo-api-name">{{ item.token }}</code>
            <span class="demo-card__desc" style="margin: 0">{{ item.note }}</span>
            <button
              type="button"
              class="demo-btn demo-btn--subtle demo-btn--small"
              @click="copyToken(item.token)"
            >
              {{ copiedToken === item.token ? '已复制' : '复制' }}
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
            {{ item.sample }}
          </div>
          <button
            type="button"
            class="demo-btn demo-btn--subtle demo-btn--small"
            @click="copyToken(item.size)"
          >
            {{ copiedToken === item.size ? '已复制' : '复制字号' }}
          </button>
        </div>
      </div>
    </section>

    <!-- 圆角与阴影 -->
    <template v-else-if="activeTab === 'elevation'">
      <section class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">阴影层级（Shadows）</h2>
        </div>
        <div class="demo-shadow-grid">
          <button
            v-for="item in shadowTokens"
            :key="item.token"
            type="button"
            class="demo-shadow-tile"
            :style="{ boxShadow: `var(${item.token})`, cursor: 'pointer', textAlign: 'left' }"
            @click="copyToken(item.token)"
          >
            <code class="demo-api-name">{{ item.token }}</code>
            <span class="demo-card__desc">
              {{ copiedToken === item.token ? '已复制 var(...)' : item.note }}
            </span>
          </button>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__head">
          <h2 class="demo-section__title">圆角刻度（Border Radius）</h2>
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
              {{ copiedToken === item.token ? '已复制' : item.px }}
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
            {{ copiedToken === item.token ? '已复制' : '复制' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
