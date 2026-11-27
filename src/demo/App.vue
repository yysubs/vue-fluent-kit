<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTheme, version, type ThemeMode } from '../index'
import '../styles/index.css'
import './styles.css'
import DemoIcons, { type DemoIconName } from './components/DemoIcons.vue'
import DemoLogo from './components/DemoLogo.vue'
import OverviewPage, { type DemoPageId } from './pages/OverviewPage.vue'
import TokensPage from './pages/TokensPage.vue'

interface NavItem {
  id: DemoPageId
  title: string
  sub?: string
  group: '概览' | '设计系统'
  icon: DemoIconName
  keywords: string
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    title: 'Introduction',
    sub: '概览',
    group: '概览',
    icon: 'grid',
    keywords: 'overview introduction home 概览 首页 架构 主题 品牌 材质 logo',
  },
  {
    id: 'tokens',
    title: 'Design Tokens',
    sub: '变量与材质',
    group: '设计系统',
    icon: 'palette',
    keywords: 'token color theme typography spacing shadow surface acrylic mica 变量 颜色 字体 阴影 亚克力 云母',
  },
]

const validPageIds = new Set<DemoPageId>(navItems.map((item) => item.id))

function parseHashPage(): DemoPageId {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase() as DemoPageId
  return validPageIds.has(raw) ? raw : 'overview'
}

const { mode, resolvedTheme, setTheme } = useTheme()
const currentPage = ref<DemoPageId>(parseHashPage())
const searchQuery = ref('')
const sidebarOpen = ref(false)

const themeOptions: { value: ThemeMode; label: string; icon: DemoIconName }[] = [
  { value: 'light', label: 'Web Light', icon: 'sun' },
  { value: 'dark', label: 'Web Dark', icon: 'moon' },
  { value: 'system', label: 'System', icon: 'monitor' },
]

const currentNavItem = computed(
  () => navItems.find((item) => item.id === currentPage.value) ?? navItems[0],
)

const navGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const filtered = q
    ? navItems.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.sub && item.sub.toLowerCase().includes(q)) ||
          item.keywords.toLowerCase().includes(q),
      )
    : navItems

  const order: NavItem['group'][] = ['概览', '设计系统']
  return order
    .map((group) => ({
      name: group,
      items: filtered.filter((item) => item.group === group),
    }))
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
      aria-label="组件导航"
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
            placeholder="查找组件或变量..."
            aria-label="查找组件或变量"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="demo-search-box__clear"
            aria-label="清空查找"
            @click="searchQuery = ''"
          >
            <DemoIcons name="close" :size="12" />
          </button>
        </div>
      </div>

      <nav class="demo-sidebar__nav">
        <div v-for="group in navGroups" :key="group.name" class="demo-nav-group">
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
          未找到与「{{ searchQuery }}」匹配的条目
        </p>
      </nav>

      <div class="demo-sidebar__footer">
        <div class="demo-sidebar__kbd-row">
          <span>按</span>
          <kbd class="demo-kbd">Tab</kbd>
          <span>逐项检查键盘焦点环</span>
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
            aria-label="打开导航菜单"
            @click="sidebarOpen = !sidebarOpen"
          >
            <DemoIcons :name="sidebarOpen ? 'close' : 'menu'" :size="18" />
          </button>

          <span class="demo-topbar__tab" aria-hidden="true">Docs</span>

          <div class="demo-breadcrumb" aria-label="当前位置">
            <span>{{ currentNavItem.group }}</span>
            <span class="demo-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="demo-breadcrumb__current">{{ currentNavItem.title }}</span>
          </div>
        </div>

        <div class="demo-topbar__right">
          <div class="demo-theme-switch" role="group" aria-label="切换主题">
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
              <span>{{ opt.label }}</span>
            </button>
          </div>

          <a
            class="demo-link-btn"
            href="https://github.com/yysubs/vue-fluent-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DemoIcons name="github" :size="14" />
            <span>GitHub</span>
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
