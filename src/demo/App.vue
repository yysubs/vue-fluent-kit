<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useTheme, version, VfkSearchBox, VfkTree, VfkTreeItem, type ThemeMode } from '../index'
import '../styles/index.css'
import './styles.css'
import DemoIcons, { type DemoIconName } from './components/DemoIcons.vue'
import DemoLogo from './components/DemoLogo.vue'
import { useDemoI18n } from './i18n'
import ButtonPage from './pages/ButtonPage.vue'
import CheckboxPage from './pages/CheckboxPage.vue'
import FieldPage from './pages/FieldPage.vue'
import InputPage from './pages/InputPage.vue'
import MenuPage from './pages/MenuPage.vue'
import OverviewPage, { type DemoPageId } from './pages/OverviewPage.vue'
import RadioPage from './pages/RadioPage.vue'
import SearchBoxPage from './pages/SearchBoxPage.vue'
import SelectPage from './pages/SelectPage.vue'
import SwitchPage from './pages/SwitchPage.vue'
import TabsPage from './pages/TabsPage.vue'
import ToggleButtonPage from './pages/ToggleButtonPage.vue'
import TokensPage from './pages/TokensPage.vue'
import TreePage from './pages/TreePage.vue'

interface NavItem {
  id: DemoPageId
  title: string
  sub?: string
  folderKey?: string
  folderTitle?: string
  groupKey: 'overview' | 'components' | 'designSystem'
  groupLabel: string
  icon: DemoIconName
  keywords: string
}

interface NavFolderEntry {
  kind: 'folder'
  key: string
  title: string
  children: NavItem[]
}

interface NavLeafEntry {
  kind: 'leaf'
  item: NavItem
}

type NavEntry = NavFolderEntry | NavLeafEntry

const { mode, setTheme } = useTheme()
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
    id: 'button',
    title: 'Button',
    sub: messages.value.shell.navButtonSub,
    folderKey: 'button',
    folderTitle: 'Button',
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'button',
    keywords: 'button vfkbutton fluent-button 按钮 按鈕 图标 圖示 action',
  },
  {
    id: 'toggle-button',
    title: 'ToggleButton',
    sub: messages.value.shell.navToggleButtonSub,
    folderKey: 'button',
    folderTitle: 'Button',
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'toggle',
    keywords: 'toggle button vfktogglebutton fluent-toggle-button pressed mixed 切换按钮 切換按鈕 按压 按壓',
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    sub: messages.value.shell.navCheckboxSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'checkbox',
    keywords: 'checkbox vfkcheckbox fluent-checkbox mixed indeterminate 复选框 核取方塊 勾选 勾選 半选 半選',
  },
  {
    id: 'field',
    title: 'Field',
    sub: messages.value.shell.navFieldSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'field',
    keywords: 'field vfkfield fluent-field form label validation hint 表单字段 表單欄位 校验 校驗 提示',
  },
  {
    id: 'input',
    title: 'Input',
    sub: messages.value.shell.navInputSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'input',
    keywords: 'input vfkinput fluent-text-input text field 输入框 輸入框 文本 文字 v-model',
  },
  {
    id: 'menu',
    title: 'Menu',
    sub: messages.value.shell.navMenuSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'menu',
    keywords: 'menu menulist menuitem menubutton popover submenu context vfkmenu fluent-menu 菜单 選單 浮层 浮層 右键 右鍵',
  },
  {
    id: 'radio',
    title: 'RadioGroup',
    sub: messages.value.shell.navRadioSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'radio',
    keywords: 'radio radiogroup vfkradio vfkradiogroup fluent-radio-group 单选 單選 单选组 單選組',
  },
  {
    id: 'search-box',
    title: 'SearchBox',
    sub: messages.value.shell.navSearchBoxSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'search',
    keywords: 'search searchbox vfksearchbox clear dismiss query 搜索 搜尋 搜索框 搜尋框 清除',
  },
  {
    id: 'select',
    title: 'Select',
    sub: messages.value.shell.navSelectSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'select',
    keywords: 'select option dropdown vfkselect vfkoption fluent-dropdown 下拉 选择器 選擇器 选项 選項',
  },
  {
    id: 'switch',
    title: 'Switch',
    sub: messages.value.shell.navSwitchSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'switch',
    keywords: 'switch vfkswitch fluent-switch toggle 开关 開關 切换 切換',
  },
  {
    id: 'tabs',
    title: 'Tabs',
    sub: messages.value.shell.navTabsSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'tabs',
    keywords: 'tab tabs tablist vfktab vfktablist fluent-tablist 标签页 分頁列 选项卡 選項卡',
  },
  {
    id: 'tree',
    title: 'Tree',
    sub: messages.value.shell.navTreeSub,
    groupKey: 'components',
    groupLabel: messages.value.shell.groupComponents,
    icon: 'tree',
    keywords: 'tree treeitem vfktree vfktreeitem fluent-tree hierarchy 树 樹 树形 樹狀 菜单 選單 目录 目錄',
  },
  {
    id: 'tokens',
    title: 'Design Tokens',
    sub: messages.value.shell.navTokensSub,
    groupKey: 'designSystem',
    groupLabel: messages.value.shell.groupDesignSystem,
    icon: 'palette',
    keywords:
      'token color theme typography spacing shadow surface acrylic mica 变量 變數 颜色 色彩 字体 字體 阴影 陰影 亚克力 亞克力 云母 雲母',
  },
])

const validPageIds = new Set<DemoPageId>([
  'overview',
  'button',
  'checkbox',
  'field',
  'input',
  'menu',
  'radio',
  'search-box',
  'select',
  'switch',
  'tabs',
  'toggle-button',
  'tree',
  'tokens',
])

function parseHashPage(): DemoPageId {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase() as DemoPageId
  return validPageIds.has(raw) ? raw : 'overview'
}

const currentPage = ref<DemoPageId>(parseHashPage())
const searchQuery = ref('')
const sidebarOpen = ref(false)
const groupExpanded = reactive<Record<NavItem['groupKey'], boolean>>({
  overview: true,
  components: true,
  designSystem: true,
})
const folderExpanded = reactive<Record<string, boolean>>({
  button: true,
})

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
          (item.folderTitle && item.folderTitle.toLowerCase().includes(q)) ||
          (item.sub && item.sub.toLowerCase().includes(q)) ||
          item.keywords.toLowerCase().includes(q),
      )
    : navItems.value

  const order: NavItem['groupKey'][] = ['overview', 'components', 'designSystem']
  return order
    .map((groupKey) => {
      const items = filtered.filter((item) => item.groupKey === groupKey)
      const entries: NavEntry[] = []
      const folderMap = new Map<string, NavFolderEntry>()

      for (const item of items) {
        if (item.folderKey && item.folderTitle) {
          let folder = folderMap.get(item.folderKey)
          if (!folder) {
            folder = {
              kind: 'folder',
              key: item.folderKey,
              title: item.folderTitle,
              children: [],
            }
            folderMap.set(item.folderKey, folder)
            entries.push(folder)
          }
          folder.children.push(item)
        } else {
          entries.push({ kind: 'leaf', item })
        }
      }

      return {
        key: groupKey,
        name: items[0]?.groupLabel ?? '',
        leafCount: items.length,
        entries,
      }
    })
    .filter((group) => group.leafCount > 0)
})

function ensureParentFolderExpanded(page: DemoPageId) {
  const matched = navItems.value.find((item) => item.id === page)
  if (matched?.folderKey) {
    folderExpanded[matched.folderKey] = true
  }
}

function navigate(page: DemoPageId) {
  currentPage.value = page
  ensureParentFolderExpanded(page)
  sidebarOpen.value = false
  if (window.location.hash !== `#${page}`) {
    window.history.replaceState(null, '', `#${page}`)
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function handleNavSelect(value: string) {
  if (validPageIds.has(value as DemoPageId)) {
    navigate(value as DemoPageId)
  }
}

function handleGroupToggle(groupKey: NavItem['groupKey'], expanded: boolean) {
  if (!searchQuery.value.trim()) {
    groupExpanded[groupKey] = expanded
  }
}

function handleFolderToggle(folderKey: string, expanded: boolean) {
  if (!searchQuery.value.trim()) {
    folderExpanded[folderKey] = expanded
  }
}

function handleHashChange() {
  const next = parseHashPage()
  currentPage.value = next
  ensureParentFolderExpanded(next)
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
  <div class="demo-shell">
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
      <a
        class="demo-sidebar__brand"
        href="https://github.com/yysubs/vue-fluent-kit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="demo-sidebar__logo">
          <DemoLogo :size="28" />
        </span>
        <span class="demo-sidebar__brand-name">Vue Fluent Kit</span>
      </a>

      <div class="demo-sidebar__search">
        <VfkSearchBox
          v-model="searchQuery"
          appearance="filled-darker"
          size="medium"
          :placeholder="messages.shell.searchPlaceholder"
          :aria-label="messages.shell.searchAriaLabel"
          :dismiss-label="messages.shell.clearSearchAriaLabel"
        />
      </div>

      <nav class="demo-sidebar__nav">
        <VfkTree
          v-if="navGroups.length > 0"
          class="demo-sidebar-tree"
          :model-value="currentPage"
          size="medium"
          @update:model-value="handleNavSelect"
        >
          <VfkTreeItem
            v-for="group in navGroups"
            :key="group.key"
            class="demo-sidebar-tree__group"
            :value="`group:${group.key}`"
            :selectable="false"
            :expanded="groupExpanded[group.key] || Boolean(searchQuery.trim())"
            @update:expanded="handleGroupToggle(group.key, $event)"
          >
            <span class="demo-sidebar-tree__group-label">{{ group.name }}</span>
            <template #aside>
              <span class="demo-nav-group__count">{{ group.leafCount }}</span>
            </template>

            <template
              v-for="entry in group.entries"
              :key="entry.kind === 'folder' ? `folder:${entry.key}` : entry.item.id"
            >
              <VfkTreeItem
                v-if="entry.kind === 'folder'"
                class="demo-sidebar-tree__folder"
                :value="`folder:${entry.key}`"
                :selectable="false"
                :expanded="folderExpanded[entry.key] || Boolean(searchQuery.trim())"
                @update:expanded="handleFolderToggle(entry.key, $event)"
              >
                <span class="demo-sidebar-tree__title">{{ entry.title }}</span>
                <template #aside>
                  <span class="demo-nav-group__count">{{ entry.children.length }}</span>
                </template>

                <VfkTreeItem
                  v-for="child in entry.children"
                  :key="child.id"
                  class="demo-sidebar-tree__leaf"
                  :value="child.id"
                  :aria-current="currentPage === child.id ? 'page' : undefined"
                  @click="sidebarOpen = false"
                >
                  <template #start>
                    <span class="demo-nav-item__icon">
                      <DemoIcons :name="child.icon" :size="15" />
                    </span>
                  </template>
                  <span class="demo-sidebar-tree__title">{{ child.title }}</span>
                  <template v-if="child.sub" #aside>
                    <span class="demo-nav-item__sub">{{ child.sub }}</span>
                  </template>
                </VfkTreeItem>
              </VfkTreeItem>

              <VfkTreeItem
                v-else
                class="demo-sidebar-tree__leaf"
                :value="entry.item.id"
                :aria-current="currentPage === entry.item.id ? 'page' : undefined"
                @click="sidebarOpen = false"
              >
                <template #start>
                  <span class="demo-nav-item__icon">
                    <DemoIcons :name="entry.item.icon" :size="15" />
                  </span>
                </template>
                <span class="demo-sidebar-tree__title">{{ entry.item.title }}</span>
                <template v-if="entry.item.sub" #aside>
                  <span class="demo-nav-item__sub">{{ entry.item.sub }}</span>
                </template>
              </VfkTreeItem>
            </template>
          </VfkTreeItem>
        </VfkTree>

        <p v-else class="demo-nav-empty">
          {{ messages.shell.emptySearchPrefix }}{{ searchQuery }}{{ messages.shell.emptySearchSuffix }}
        </p>
      </nav>

      <div class="demo-sidebar__footer">
        <span class="demo-sidebar__version">v{{ version }}</span>
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
            <template v-if="currentNavItem.folderTitle">
              <span class="demo-breadcrumb__sep" aria-hidden="true">/</span>
              <span>{{ currentNavItem.folderTitle }}</span>
            </template>
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
        <ButtonPage v-else-if="currentPage === 'button'" />
        <CheckboxPage v-else-if="currentPage === 'checkbox'" />
        <FieldPage v-else-if="currentPage === 'field'" />
        <InputPage v-else-if="currentPage === 'input'" />
        <MenuPage v-else-if="currentPage === 'menu'" />
        <RadioPage v-else-if="currentPage === 'radio'" />
        <SearchBoxPage v-else-if="currentPage === 'search-box'" />
        <SelectPage v-else-if="currentPage === 'select'" />
        <SwitchPage v-else-if="currentPage === 'switch'" />
        <TabsPage v-else-if="currentPage === 'tabs'" />
        <ToggleButtonPage v-else-if="currentPage === 'toggle-button'" />
        <TreePage v-else-if="currentPage === 'tree'" />
        <TokensPage v-else />
      </main>
    </div>
  </div>
</template>
