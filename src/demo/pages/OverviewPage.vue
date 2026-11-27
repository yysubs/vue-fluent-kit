<script setup lang="ts">
import { computed, ref } from 'vue'
import { VButton, VCheckbox, VInput, VSelect, VToggleButton, version } from '../../index'
import DemoIcons from '../components/DemoIcons.vue'
import DemoLogo from '../components/DemoLogo.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'

export type DemoPageId = 'overview' | 'button' | 'input' | 'select' | 'checkbox' | 'tokens'

const emit = defineEmits<{
  navigate: [page: DemoPageId]
}>()

const tocItems: TocItem[] = [
  { id: 'intro-highlights', label: '核心特性' },
  { id: 'intro-composite', label: '组合场景 · 发布配置' },
  { id: 'intro-catalog', label: '已实现控件' },
  { id: 'intro-nested-theme', label: '局部主题嵌套' },
]

// 组合表单演示状态
const projectName = ref('vue-fluent-kit')
const region = ref('ap-east')
const autoPreview = ref(true)
const strictTypes = ref(true)
const notifyDeploy = ref(false)
const pinProduction = ref(false)
const deployNotice = ref('')

const selectedSummary = computed(() => {
  const flags = [
    autoPreview.value && '分支预览',
    strictTypes.value && '类型检查',
    notifyDeploy.value && '部署通知',
    pinProduction.value && '锁定版本',
  ].filter(Boolean)
  return flags.length ? flags.join(' · ') : '未开启附加项'
})

function handleDeploySubmit() {
  const name = projectName.value.trim() || '未命名项目'
  deployNotice.value = `已保存「${name}」配置（区域：${region.value}，选项：${selectedSummary.value}）`
}

function handleDeployReset() {
  projectName.value = 'vue-fluent-kit'
  region.value = 'ap-east'
  autoPreview.value = true
  strictTypes.value = true
  notifyDeploy.value = false
  pinProduction.value = false
  deployNotice.value = ''
}

// 目录微型演示状态
const miniToggle = ref(true)
const miniInput = ref('')
const miniSelect = ref('medium')
const miniCheck = ref(true)

// 嵌套主题预览状态
const lightChecked = ref(true)
const darkChecked = ref(true)
const lightName = ref('浅色容器输入')
const darkName = ref('深色容器输入')
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
          参照 Fluent UI v9 官方规格构建的 Vue 3 纯 CSS 组件库。通过
          <code class="demo-inline-code">data-vfk-theme</code> 切换浅色与深色主题，并支持任意层级局部反色嵌套。
        </p>
      </header>

      <!-- 官方 Introduction 风格顶部横幅 -->
      <div class="demo-intro-banner">
        <div class="demo-intro-banner__brand">
          <DemoLogo :size="52" />
          <div>
            <h2 class="demo-intro-banner__title">Fluent UI v9 Design System for Vue 3</h2>
            <p class="demo-intro-banner__sub">5 个已实现控件 · 459 个官方主题变量 · 运行时零额外依赖</p>
          </div>
        </div>
        <div class="demo-row">
          <VButton appearance="primary" @click="emit('navigate', 'button')">浏览控件</VButton>
          <VButton appearance="outline" @click="emit('navigate', 'tokens')">查看 Tokens</VButton>
        </div>
      </div>

      <!-- 核心特性（仿 What's new 三列卡） -->
      <section id="intro-highlights" class="demo-section demo-section--first">
        <div class="demo-section__head">
          <h2 class="demo-section__title">核心特性</h2>
        </div>

        <div class="demo-whatsnew-grid">
          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon demo-whatsnew-box__icon--vue">
              <DemoIcons name="sparkle" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">轻量纯 CSS</h3>
            <p class="demo-whatsnew-box__desc">
              运行时仅 peer 依赖 Vue 3，样式以纯 CSS 输出，类名统一 <code class="demo-inline-code">vfk-</code> 前缀。
            </p>
          </div>

          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon">
              <DemoIcons name="palette" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">官方同名变量</h3>
            <p class="demo-whatsnew-box__desc">
              完整内置 <code class="demo-inline-code">webLightTheme</code> 与
              <code class="demo-inline-code">webDarkTheme</code> 共 459 个 CSS 变量。
            </p>
          </div>

          <div class="demo-whatsnew-box">
            <span class="demo-whatsnew-box__icon demo-whatsnew-box__icon--vue">
              <DemoIcons name="checkbox" :size="18" />
            </span>
            <h3 class="demo-whatsnew-box__title">完整可访问性</h3>
            <p class="demo-whatsnew-box__desc">
              保留原生表单语义与键盘焦点环，内置高对比度（forced-colors）与减少动效适配。
            </p>
          </div>
        </div>
      </section>

      <!-- 组合场景示例：真实表单 -->
      <section id="intro-composite" class="demo-section">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">组合场景 · 发布配置</h2>
            <p class="demo-section__sub">把当前已实现的 5 个控件放在同一表单中检验尺寸对齐与交互一致性。</p>
          </div>
        </div>

        <div class="demo-composite-card">
          <div class="demo-stack">
            <div class="demo-field-grid">
              <div class="demo-field">
                <label class="demo-field__label" for="overview-project-name">项目名称</label>
                <VInput id="overview-project-name" v-model="projectName" placeholder="输入项目名">
                  <template #contentBefore>
                    <DemoIcons name="sparkle" :size="16" />
                  </template>
                </VInput>
              </div>

              <div class="demo-field">
                <label class="demo-field__label" for="overview-region">部署区域</label>
                <VSelect id="overview-region" v-model="region">
                  <option value="ap-east">亚太东部 (ap-east)</option>
                  <option value="us-west">美国西部 (us-west)</option>
                  <option value="eu-central">欧洲中部 (eu-central)</option>
                </VSelect>
              </div>
            </div>

            <div class="demo-row">
              <VCheckbox v-model="autoPreview" label="分支预览" />
              <VCheckbox v-model="strictTypes" label="类型检查" />
              <VCheckbox v-model="notifyDeploy" label="部署通知" />
            </div>

            <div class="demo-row">
              <VButton appearance="primary" @click="handleDeploySubmit">保存配置</VButton>
              <VToggleButton v-model="pinProduction" appearance="secondary">
                {{ pinProduction ? '已锁定版本' : '锁定版本' }}
              </VToggleButton>
              <VButton appearance="subtle" @click="handleDeployReset">重置</VButton>
            </div>

            <p v-if="deployNotice" class="demo-card__desc" style="margin-top: 0">
              {{ deployNotice }}
            </p>
          </div>
        </div>
      </section>

      <!-- 已实现控件目录 -->
      <section id="intro-catalog" class="demo-section">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">已实现控件</h2>
            <p class="demo-section__sub">每个文档页均配备属性调试台、Show code 代码抽屉、全部状态用例与 Props 表。</p>
          </div>
        </div>

        <div class="demo-catalog-grid">
          <article class="demo-catalog-card">
            <div class="demo-catalog-card__preview">
              <div class="demo-row">
                <VButton appearance="primary" size="medium">Primary</VButton>
                <VButton appearance="outline" size="medium">Outline</VButton>
                <VToggleButton v-model="miniToggle" size="medium">
                  {{ miniToggle ? '已按下' : '切换' }}
                </VToggleButton>
              </div>
            </div>
            <div class="demo-catalog-card__body">
              <div>
                <h3 class="demo-catalog-card__title">Button &amp; ToggleButton</h3>
                <p class="demo-catalog-card__desc">5 种外观、3 档尺寸、3 种形状、图标与切换态</p>
              </div>
              <VButton appearance="subtle" size="small" @click="emit('navigate', 'button')">
                查看
                <DemoIcons name="arrow-right" :size="14" />
              </VButton>
            </div>
          </article>

          <article class="demo-catalog-card">
            <div class="demo-catalog-card__preview">
              <VInput
                v-model="miniInput"
                placeholder="输入关键字搜索..."
                aria-label="输入框目录预览"
                style="width: 100%; max-width: 260px"
              >
                <template #contentBefore>
                  <DemoIcons name="search" :size="16" />
                </template>
              </VInput>
            </div>
            <div class="demo-catalog-card__body">
              <div>
                <h3 class="demo-catalog-card__title">Input</h3>
                <p class="demo-catalog-card__desc">4 种外观、前后缀插槽、底部焦点条与校验态</p>
              </div>
              <VButton appearance="subtle" size="small" @click="emit('navigate', 'input')">
                查看
                <DemoIcons name="arrow-right" :size="14" />
              </VButton>
            </div>
          </article>

          <article class="demo-catalog-card">
            <div class="demo-catalog-card__preview">
              <VSelect
                v-model="miniSelect"
                aria-label="下拉框目录预览"
                style="width: 100%; max-width: 220px"
              >
                <option value="small">Small · 24px</option>
                <option value="medium">Medium · 32px</option>
                <option value="large">Large · 40px</option>
              </VSelect>
            </div>
            <div class="demo-catalog-card__body">
              <div>
                <h3 class="demo-catalog-card__title">Select</h3>
                <p class="demo-catalog-card__desc">原生语义下拉、4 种外观、分组选项与自定义图标</p>
              </div>
              <VButton appearance="subtle" size="small" @click="emit('navigate', 'select')">
                查看
                <DemoIcons name="arrow-right" :size="14" />
              </VButton>
            </div>
          </article>

          <article class="demo-catalog-card">
            <div class="demo-catalog-card__preview">
              <div class="demo-row">
                <VCheckbox v-model="miniCheck" label="已选状态" />
                <VCheckbox model-value="mixed" label="半选状态" />
                <VCheckbox :model-value="true" shape="circular" label="圆形" />
              </div>
            </div>
            <div class="demo-catalog-card__body">
              <div>
                <h3 class="demo-catalog-card__title">Checkbox</h3>
                <p class="demo-catalog-card__desc">三态联动、方圆形状、标签左右位与必填标识</p>
              </div>
              <VButton appearance="subtle" size="small" @click="emit('navigate', 'checkbox')">
                查看
                <DemoIcons name="arrow-right" :size="14" />
              </VButton>
            </div>
          </article>
        </div>
      </section>

      <!-- 局部嵌套主题对照 -->
      <section id="intro-nested-theme" class="demo-section">
        <div class="demo-section__head">
          <div>
            <h2 class="demo-section__title">局部主题嵌套</h2>
            <p class="demo-section__sub">
              无需 Provider，在任意容器添加 <code class="demo-inline-code">data-vfk-theme="light"</code> 或
              <code class="demo-inline-code">data-vfk-theme="dark"</code> 即可独立切换该区域主题。
            </p>
          </div>
        </div>

        <div class="demo-theme-split">
          <div class="demo-theme-pane" data-vfk-theme="light">
            <div class="demo-theme-pane__head">
              <h3 class="demo-theme-pane__title">浅色表面</h3>
              <span class="demo-tag">data-vfk-theme="light"</span>
            </div>
            <div class="demo-stack">
              <VInput v-model="lightName" aria-label="浅色容器输入框" />
              <div class="demo-row">
                <VSelect aria-label="浅色容器下拉">
                  <option value="a">webLightTheme</option>
                  <option value="b">高对比度自动适配</option>
                </VSelect>
                <VCheckbox v-model="lightChecked" label="启用浅色校验" />
              </div>
              <div class="demo-row">
                <VButton appearance="primary" size="small">确定</VButton>
                <VButton appearance="secondary" size="small">次要</VButton>
                <VButton appearance="outline" size="small">描边</VButton>
              </div>
            </div>
          </div>

          <div class="demo-theme-pane" data-vfk-theme="dark">
            <div class="demo-theme-pane__head">
              <h3 class="demo-theme-pane__title">深色表面</h3>
              <span class="demo-tag">data-vfk-theme="dark"</span>
            </div>
            <div class="demo-stack">
              <VInput v-model="darkName" aria-label="深色容器输入框" />
              <div class="demo-row">
                <VSelect aria-label="深色容器下拉">
                  <option value="a">webDarkTheme</option>
                  <option value="b">展开菜单清晰可读</option>
                </VSelect>
                <VCheckbox v-model="darkChecked" label="启用深色校验" />
              </div>
              <div class="demo-row">
                <VButton appearance="primary" size="small">确定</VButton>
                <VButton appearance="secondary" size="small">次要</VButton>
                <VButton appearance="outline" size="small">描边</VButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
