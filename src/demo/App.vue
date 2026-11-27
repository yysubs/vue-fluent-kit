<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { VButton, VInput, version } from '../index'
import '../styles/index.css'
import './styles.css'
import DemoIcons, { type DemoIconName } from './components/DemoIcons.vue'
import DemoLogo from './components/DemoLogo.vue'
import ButtonPage from './pages/ButtonPage.vue'
import CheckboxPage from './pages/CheckboxPage.vue'
import InputPage from './pages/InputPage.vue'
import OverviewPage, { type DemoPageId } from './pages/OverviewPage.vue'
import SelectPage from './pages/SelectPage.vue'
import TokensPage from './pages/TokensPage.vue'

interface NavItem {
  id: DemoPageId
  title: string
  sub?: string
  group: 'Concepts' | 'Components' | 'Theme'
  icon: DemoIconName
  keywords: string
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    title: 'Introduction',
    sub: '概览',
    group: 'Concepts',
    icon: 'grid',
    keywords: 'overview introduction home 概览 首页 组合 主题',
  },
  {
    id: 'button',
    title: 'Button',
    sub: '按钮',
    group: 'Components',
    icon: 'button',
    keywords: 'button togglebutton 按钮 切换 图标',
  },
  {
    id: 'input',
    title: 'Input',
    sub: '文本输入',
    group: 'Components',
    icon: 'input',
    keywords: 'input text field 输入框 文本 前后缀',
  },
  {
    id: 'select',
    title: 'Select',
    sub: '原生下拉',
    group: 'Components',
    icon: 'select',
    keywords: 'select dropdown option 下拉 选择',
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    sub: '勾选框',
    group: 'Components',
    icon: 'checkbox',
    keywords: 'checkbox mixed indeterminate 勾选 多选 半选',
  },
  {
    id: 'tokens',
    title: 'Design Tokens',
    sub: '变量',
    group: 'Theme',
    icon: 'palette',
    keywords: 'token color theme typography spacing shadow 变量 颜色 字体 阴影',
  },
]

const validPageIds = new Set<DemoPageId>(navItems.map((item) => item.id))

function parseHashPage(): DemoPageId {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase() as DemoPageId
  return validPageIds.has(raw) ? raw : 'overview'
}

const theme = ref<'light' | 'dark'>('light')
const currentPage = ref<DemoPageId>(parseHashPage())
const searchQuery = ref('')
const sidebarOpen = ref(false)

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

  const order: NavItem['group'][] = ['Concepts', 'Components', 'Theme']
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

function syncThemeToDocument(next: 'light' | 'dark') {
  document.documentElement.setAttribute('data-vfk-theme', next)
}

function handleHashChange() {
  currentPage.value = parseHashPage()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

watch(theme, syncThemeToDocument, { immediate: true })

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
  <div class="demo-shell" :data-vfk-theme="theme">
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
          <span class="demo-sidebar__brand-meta">v{{ version }} · Fluent v9</span>
        </div>
      </div>

      <div class="demo-sidebar__search">
        <VInput
          v-model="searchQuery"
          size="small"
          appearance="filled-darker"
          placeholder="查找组件或变量..."
          aria-label="查找组件或变量"
        >
          <template #contentBefore><DemoIcons name="search" :size="14" /></template>
          <template v-if="searchQuery" #contentAfter>
            <VButton
              appearance="transparent"
              size="small"
              aria-label="清空查找"
              @click="searchQuery = ''"
            >
              <template #icon><DemoIcons name="close" :size="12" /></template>
            </VButton>
          </template>
        </VInput>
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
          <VButton
            class="demo-topbar__menu-btn"
            appearance="subtle"
            size="small"
            aria-label="打开导航菜单"
            @click="sidebarOpen = !sidebarOpen"
          >
            <template #icon>
              <DemoIcons :name="sidebarOpen ? 'close' : 'menu'" :size="18" />
            </template>
          </VButton>

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
              type="button"
              class="demo-theme-switch__btn"
              :class="{ 'demo-theme-switch__btn--active': theme === 'light' }"
              :aria-pressed="theme === 'light'"
              @click="theme = 'light'"
            >
              <DemoIcons name="sun" :size="13" />
              <span>Web Light</span>
            </button>
            <button
              type="button"
              class="demo-theme-switch__btn"
              :class="{ 'demo-theme-switch__btn--active': theme === 'dark' }"
              :aria-pressed="theme === 'dark'"
              @click="theme = 'dark'"
            >
              <DemoIcons name="moon" :size="13" />
              <span>Web Dark</span>
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
        <ButtonPage v-else-if="currentPage === 'button'" />
        <InputPage v-else-if="currentPage === 'input'" />
        <SelectPage v-else-if="currentPage === 'select'" />
        <CheckboxPage v-else-if="currentPage === 'checkbox'" />
        <TokensPage v-else-if="currentPage === 'tokens'" />
      </main>
    </div>
  </div>
</template>
