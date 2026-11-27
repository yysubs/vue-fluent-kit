<script setup lang="ts">
import { computed, ref } from 'vue'
import { VButton, VCheckbox, VInput, VSelect, VToggleButton } from '../../index'
import DemoIcons from '../components/DemoIcons.vue'

export type DemoPageId = 'overview' | 'button' | 'input' | 'select' | 'checkbox' | 'tokens'

const emit = defineEmits<{
  navigate: [page: DemoPageId]
}>()

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

// 卡片微型演示状态
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
  <div>
    <!-- Hero 与真实组合表单 -->
    <section class="demo-hero">
      <div>
        <p class="demo-page-header__eyebrow">Fluent UI v9 · Pure CSS · Vue 3</p>
        <h1 class="demo-hero__title">vue-fluent-kit</h1>
        <p class="demo-hero__desc">
          遵循 Fluent UI v9 设计变量与组件规格的 Vue 3 控件库。无运行时样式依赖，通过
          <code class="demo-inline-code">data-vfk-theme</code> 切换浅色与深色主题，并支持局部嵌套反色。
        </p>

        <div class="demo-row">
          <VButton appearance="primary" @click="emit('navigate', 'button')">
            浏览控件
          </VButton>
          <VButton appearance="outline" @click="emit('navigate', 'tokens')">
            查看设计变量
          </VButton>
        </div>

        <div class="demo-hero__stats">
          <div>
            <div class="demo-stat__value">5 控件</div>
            <div class="demo-stat__label">Button · Toggle · Input · Select · Checkbox</div>
          </div>
          <div>
            <div class="demo-stat__value">459</div>
            <div class="demo-stat__label">Fluent v9 官方主题变量</div>
          </div>
          <div>
            <div class="demo-stat__value">0 依赖</div>
            <div class="demo-stat__label">运行时仅 peer 依赖 Vue 3</div>
          </div>
        </div>
      </div>

      <!-- 组合场景示例：真实表单 -->
      <div class="demo-hero__showcase">
        <div class="demo-stack">
          <div>
            <h2 class="demo-card__title">组合场景 · 发布配置</h2>
            <p class="demo-card__desc">把当前已实现的 5 个控件放到同一个表单中验证视觉一致性。</p>
          </div>

          <div class="demo-field">
            <label class="demo-field__label" for="overview-project-name">项目名称</label>
            <VInput
              id="overview-project-name"
              v-model="projectName"
              placeholder="输入项目名"
            >
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
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">已实现控件</h2>
          <p class="demo-section__sub">每个页面均提供属性调试台、实时模板代码、全部状态用例与 API 说明。</p>
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
              style="width: 100%; max-width: 280px"
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
              style="width: 100%; max-width: 240px"
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
    <section class="demo-section">
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
</template>
