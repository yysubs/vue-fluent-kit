<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTheme, version, type ThemeMode } from '../index'
import '../styles/index.css'
import './styles.css'
import DemoIcons, { type DemoIconName } from './components/DemoIcons.vue'
import DemoLogo from './components/DemoLogo.vue'
import { useDemoI18n } from './i18n'
import OverviewPage, { type DemoPageId } from './pages/OverviewPage.vue'
import TokensPage from './pages/TokensPage.vue'

interface NavItem {
  id: DemoPageId
  title: string
  sub?: string
  groupKey: 'overview' | 'designSystem'
  groupLabel: string
  icon: DemoIconName
  keywords: string
}

const { mode, resolvedTheme, setTheme } = useTheme()
const { locale, messages, localeOptions, setLocale } = useDemoI18n()

const navItems = computed<NavItem[]>(() => [
  {
    id: 'overview',
    title: messages.value.shell.navOverviewTitle,
    sub: messages.value.shell.navOverviewSub,
    groupKey: 'overview',
    groupLabel: messages.value.shell.groupOverview,
    icon: 'grid',
    keywords: 'overview introduction home 概览 概覽 首页 首頁 架构 架構 主题 主題 品牌 材质 材質 logo',
  },
  {
    id: 'tokens',
    title: messages.value.shell.navTokensTitle,
    sub: messages.value.shell.navTokensSub,
    groupKey: 'designSystem',
    groupLabel: messages.value.shell.groupDesignSystem,
    icon: 'palette',
    keywords:
      'token color theme typography spacing shadow surface acrylic mica 变量 變數 颜色 色彩 字体 字體 阴影 陰影 亚克力 亞克力 云母 雲母',
  },
])

const validPageIds = new Set<DemoPageId>(['overview', 'tokens'])

function parseHashPage(): DemoPageId {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase() as DemoPageId
  return validPageIds.has(raw) ? raw : 'overview'
}

const currentPage = ref<DemoPageId>(parseHashPage())
const searchQuery = ref('')
const sidebarOpen = ref(false)

const themeOptions = computed<{ value: ThemeMode; label: string; icon: DemoIconName }[]>(() => [
  { value: 'light', label: messages.value.common.themeLight, icon: 'sun' },
  { value: 'dark', label: messages.value.common.themeDark, icon: 'moon' },
  { value: 'system', label: messages.value.common.themeSystem, icon: 'monitor' },
])

const currentNavItem = computed(
  () => navItems.value.find((item) => item.id === currentPage.value) ?? navItems.value[0],
)

const navGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const filtered = q
    ? navItems.value.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.sub && item.sub.toLowerCase().includes(q)) ||
          item.keywords.toLowerCase().includes(q),
      )
    : navItems.value

  const order: NavItem['groupKey'][] = ['overview', 'designSystem']
  return order
    .map((groupKey) => {
      const items = filtered.filter((item) => item.groupKey === groupKey)
      return {
        key: groupKey,
        name: items[0]?.groupLabel ?? '',
        items,
      }
    })
    .filter((group) => group.items.length > 0)
})

function navigate(page: DemoPageId) {
  currentPage.value = page
  sidebarOpen.value = false
  if (window.location.hash !== `#${page}`) {
    window.history.replaceState(null, '', `#${page}`)
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function handleHashChange() {
  currentPage.value = parseHashPage()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="demo-shell" :data-vfk-theme="resolvedTheme">
    <!-- 移动端抽屉遮罩 -->
    <div
      v-if="sidebarOpen"
      class="demo-backdrop"
      aria-hidden="true"
      @click="sidebarOpen = false"
    />

    <!-- 左侧 Storybook 风格导航栏 -->
    <aside
      class="demo-sidebar"
      :class="{ 'demo-sidebar--open': sidebarOpen }"
      :aria-label="messages.shell.navAriaLabel"
    >
      <div class="demo-sidebar__brand">
        <span class="demo-sidebar__logo">
          <DemoLogo :size="28" />
        </span>
        <div class="demo-sidebar__brand-text">
          <span class="demo-sidebar__brand-name">vue-fluent-kit</span>
          <span class="demo-sidebar__brand-meta">v{{ version }} · Fluent 2 WC</span>
        </div>
      </div>

      <div class="demo-sidebar__search">
        <div class="demo-search-box">
          <span class="demo-search-box__icon" aria-hidden="true">
            <DemoIcons name="search" :size="14" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="demo-search-box__input"
            :placeholder="messages.shell.searchPlaceholder"
            :aria-label="messages.shell.searchAriaLabel"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="demo-search-box__clear"
            :aria-label="messages.shell.clearSearchAriaLabel"
            @click="searchQuery = ''"
          >
            <DemoIcons name="close" :size="12" />
          </button>
        </div>
      </div>

      <nav class="demo-sidebar__nav">
        <div v-for="group in navGroups" :key="group.key" class="demo-nav-group">
          <div class="demo-nav-group__label">
            <span>{{ group.name }}</span>
            <span class="demo-nav-group__count">{{ group.items.length }}</span>
          </div>
          <ul class="demo-nav-list">
            <li v-for="item in group.items" :key="item.id">
              <button
                type="button"
                class="demo-nav-item"
                :class="{ 'demo-nav-item--active': currentPage === item.id }"
                :aria-current="currentPage === item.id ? 'page' : undefined"
                @click="navigate(item.id)"
              >
                <span class="demo-nav-item__main">
                  <span class="demo-nav-item__icon">
                    <DemoIcons :name="item.icon" :size="15" />
                  </span>
                  <span>{{ item.title }}</span>
                </span>
                <span v-if="item.sub" class="demo-nav-item__sub">{{ item.sub }}</span>
              </button>
            </li>
          </ul>
        </div>

        <p v-if="navGroups.length === 0" class="demo-nav-empty">
          {{ messages.shell.emptySearchPrefix }}{{ searchQuery }}{{ messages.shell.emptySearchSuffix }}
        </p>
      </nav>

      <div class="demo-sidebar__footer">
        <div class="demo-sidebar__kbd-row">
          <span>{{ messages.shell.kbdPrefix }}</span>
          <kbd class="demo-kbd">Tab</kbd>
          <span>{{ messages.shell.kbdSuffix }}</span>
        </div>
      </div>
    </aside>

    <!-- 右侧主工作区 -->
    <div class="demo-main">
      <header class="demo-topbar">
        <div class="demo-topbar__left">
          <button
            type="button"
            class="demo-btn demo-btn--subtle demo-btn--icon demo-topbar__menu-btn"
            :aria-label="messages.shell.openMenuAriaLabel"
            @click="sidebarOpen = !sidebarOpen"
          >
            <DemoIcons :name="sidebarOpen ? 'close' : 'menu'" :size="18" />
          </button>

          <span class="demo-topbar__tab" aria-hidden="true">{{ messages.shell.docsTab }}</span>

          <div class="demo-breadcrumb" :aria-label="messages.shell.breadcrumbAriaLabel">
            <span>{{ currentNavItem.groupLabel }}</span>
            <span class="demo-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="demo-breadcrumb__current">{{ currentNavItem.title }}</span>
          </div>
        </div>

        <div class="demo-topbar__right">
          <div class="demo-theme-switch" role="group" :aria-label="messages.shell.langSwitchAriaLabel">
            <button
              v-for="opt in localeOptions"
              :key="opt.value"
              type="button"
              class="demo-theme-switch__btn"
              :class="{ 'demo-theme-switch__btn--active': locale === opt.value }"
              :aria-pressed="locale === opt.value"
              :aria-label="opt.label"
              :title="opt.label"
              @click="setLocale(opt.value)"
            >
              <span>{{ opt.shortLabel }}</span>
            </button>
          </div>

          <div class="demo-theme-switch" role="group" :aria-label="messages.shell.themeSwitchAriaLabel">
            <button
              v-for="opt in themeOptions"
              :key="opt.value"
              type="button"
              class="demo-theme-switch__btn"
              :class="{ 'demo-theme-switch__btn--active': mode === opt.value }"
              :aria-pressed="mode === opt.value"
              @click="setTheme(opt.value)"
            >
              <DemoIcons :name="opt.icon" :size="13" />
              <span class="demo-theme-switch__label">{{ opt.label }}</span>
            </button>
          </div>

          <a
            class="demo-link-btn"
            href="https://github.com/yysubs/vue-fluent-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DemoIcons name="github" :size="14" />
            <span class="demo-link-btn__label">GitHub</span>
          </a>
        </div>
      </header>

      <main class="demo-content">
        <OverviewPage v-if="currentPage === 'overview'" @navigate="navigate" />
        <TokensPage v-else />
      </main>
    </div>
  </div>
</template>
