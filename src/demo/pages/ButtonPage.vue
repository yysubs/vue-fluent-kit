<script setup lang="ts">
import { computed, ref } from 'vue'
import { VButton, VCheckbox, VInput, VSelect, VToggleButton } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'

type ButtonAppearance = 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonShape = 'rounded' | 'circular' | 'square'

// 交互调试台状态
const mode = ref<'button' | 'toggle'>('button')
const appearance = ref<ButtonAppearance>('primary')
const size = ref<ButtonSize>('medium')
const shape = ref<ButtonShape>('rounded')
const label = ref('提交更改')
const withIcon = ref(true)
const iconOnly = ref(false)
const disabled = ref(false)
const disabledFocusable = ref(false)
const togglePressed = ref(false)
const clickCount = ref(0)

const playgroundCode = computed(() => {
  const tag = mode.value === 'toggle' ? 'VToggleButton' : 'VButton'
  const attrs: string[] = []
  if (mode.value === 'toggle') attrs.push('v-model="pressed"')
  if (appearance.value !== 'secondary') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (shape.value !== 'rounded') attrs.push(`shape="${shape.value}"`)
  if (disabled.value) attrs.push('disabled')
  if (disabledFocusable.value) attrs.push('disabled-focusable')
  if (iconOnly.value) attrs.push(`aria-label="${label.value || '操作'}"`)

  const attrStr = attrs.length ? ' ' + attrs.join(' ') : ''
  if (iconOnly.value) {
    return `<${tag}${attrStr}>\n  <template #icon><PlusIcon /></template>\n</${tag}>`
  }
  if (withIcon.value) {
    return `<${tag}${attrStr}>\n  <template #icon><PlusIcon /></template>\n  ${label.value || '按钮'}\n</${tag}>`
  }
  return `<${tag}${attrStr}>${label.value || '按钮'}</${tag}>`
})

// 独立示例状态
const pressedSecondary = ref(false)
const pressedPrimary = ref(true)
const pressedOutline = ref(false)

const appearanceCode = `<VButton appearance="primary">Primary</VButton>
<VButton>Secondary</VButton>
<VButton appearance="outline">Outline</VButton>
<VButton appearance="subtle">Subtle</VButton>
<VButton appearance="transparent">Transparent</VButton>`

const sizeShapeCode = `<VButton size="small">Small</VButton>
<VButton size="medium">Medium</VButton>
<VButton size="large">Large</VButton>
<VButton shape="rounded">Rounded</VButton>
<VButton shape="circular">Circular</VButton>
<VButton shape="square">Square</VButton>`

const iconCode = `<VButton appearance="primary">
  <template #icon><PlusIcon /></template>
  新建项目
</VButton>
<VButton size="small" appearance="outline" aria-label="新建">
  <template #icon><PlusIcon /></template>
</VButton>
<VButton size="medium" appearance="outline" aria-label="新建">
  <template #icon><PlusIcon /></template>
</VButton>
<VButton size="large" appearance="outline" aria-label="新建">
  <template #icon><PlusIcon /></template>
</VButton>`

const disabledCode = `<VButton disabled>Disabled</VButton>
<VButton appearance="primary" disabled>Primary disabled</VButton>
<VButton disabled-focusable>Focusable disabled</VButton>
<VButton appearance="subtle" disabled>Subtle disabled</VButton>`

const toggleCode = `<VToggleButton v-model="pressedSecondary">
  Secondary: {{ pressedSecondary ? '开' : '关' }}
</VToggleButton>
<VToggleButton v-model="pressedPrimary" appearance="primary">
  Primary: {{ pressedPrimary ? '开' : '关' }}
</VToggleButton>`

const buttonPropsRows: ApiRow[] = [
  {
    name: 'appearance',
    type: "'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'",
    defaultValue: "'secondary'",
    description: '按钮视觉外观，primary 用于主操作，subtle 与 transparent 用于工具栏等弱强调场景。',
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: '按钮高度与内边距规格（small 24px / medium 32px / large 40px）。',
  },
  {
    name: 'shape',
    type: "'rounded' | 'circular' | 'square'",
    defaultValue: "'rounded'",
    description: '边角形状。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: '原生禁用，不可点击且不参与 Tab 焦点顺序。',
  },
  {
    name: 'disabledFocusable',
    type: 'boolean',
    defaultValue: 'false',
    description: '使用 aria-disabled="true" 阻止点击，同时保留键盘聚焦能力。',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
    description: '原生 button 类型，默认 button 防止表单内误提交。',
  },
  {
    name: 'modelValue (Toggle)',
    type: 'boolean',
    defaultValue: 'false',
    description: '仅 VToggleButton 支持，控制 aria-pressed 选中状态。',
  },
]
</script>

<template>
  <div>
    <header class="demo-page-header">
      <p class="demo-page-header__eyebrow">基础控件</p>
      <div class="demo-page-header__title-row">
        <h1 class="demo-page-header__title">Button &amp; ToggleButton</h1>
        <div class="demo-page-header__tags">
          <span class="demo-tag demo-tag--brand">&lt;VButton&gt;</span>
          <span class="demo-tag demo-tag--brand">&lt;VToggleButton&gt;</span>
          <span class="demo-tag">@fluentui/react-button</span>
        </div>
      </div>
      <p class="demo-page-header__desc">
        触发即时操作或切换开关状态。保留原生按钮键盘交互与焦点环，支持 5 种外观、3 档尺寸、图标插槽以及可聚焦禁用态。
      </p>
    </header>

    <!-- 交互调试台 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">交互调试台</h2>
          <p class="demo-section__sub">实时组合属性并在不同表面主题下检查对比度与交互反馈。</p>
        </div>
      </div>

      <DemoPlayground :code="playgroundCode">
        <template #stage>
          <VToggleButton
            v-if="mode === 'toggle'"
            v-model="togglePressed"
            :appearance="appearance"
            :size="size"
            :shape="shape"
            :disabled="disabled"
            :disabled-focusable="disabledFocusable"
            :aria-label="iconOnly ? label || '切换操作' : undefined"
            @click="clickCount++"
          >
            <template v-if="withIcon || iconOnly" #icon>
              <DemoIcons name="plus" :size="size === 'large' ? 20 : 16" />
            </template>
            <template v-if="!iconOnly">{{ label || '切换按钮' }}</template>
          </VToggleButton>

          <VButton
            v-else
            :appearance="appearance"
            :size="size"
            :shape="shape"
            :disabled="disabled"
            :disabled-focusable="disabledFocusable"
            :aria-label="iconOnly ? label || '操作按钮' : undefined"
            @click="clickCount++"
          >
            <template v-if="withIcon || iconOnly" #icon>
              <DemoIcons name="plus" :size="size === 'large' ? 20 : 16" />
            </template>
            <template v-if="!iconOnly">{{ label || '按钮' }}</template>
          </VButton>
        </template>

        <template #readout>
          <span>
            触发次数：<code class="demo-inline-code">{{ clickCount }}</code>
            <template v-if="mode === 'toggle'">
              · aria-pressed：<code class="demo-inline-code">{{ togglePressed }}</code>
            </template>
          </span>
          <VButton appearance="subtle" size="small" @click="clickCount = 0">清零计数</VButton>
        </template>

        <template #controls>
          <div class="demo-control-field">
            <label class="demo-control-field__label" for="btn-pg-mode">组件类型</label>
            <VSelect id="btn-pg-mode" v-model="mode" size="small">
              <option value="button">VButton（标准按钮）</option>
              <option value="toggle">VToggleButton（切换按钮）</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="btn-pg-appearance">appearance</label>
            <VSelect id="btn-pg-appearance" v-model="appearance" size="small">
              <option value="primary">primary</option>
              <option value="secondary">secondary（默认）</option>
              <option value="outline">outline</option>
              <option value="subtle">subtle</option>
              <option value="transparent">transparent</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="btn-pg-size">size</label>
            <VSelect id="btn-pg-size" v-model="size" size="small">
              <option value="small">small (24px)</option>
              <option value="medium">medium (32px)</option>
              <option value="large">large (40px)</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="btn-pg-shape">shape</label>
            <VSelect id="btn-pg-shape" v-model="shape" size="small">
              <option value="rounded">rounded（默认）</option>
              <option value="circular">circular</option>
              <option value="square">square</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="btn-pg-label">按钮文本</label>
            <VInput id="btn-pg-label" v-model="label" size="small" :disabled="iconOnly" />
          </div>

          <div class="demo-control-checks">
            <VCheckbox v-model="withIcon" label="显示前置图标" />
            <VCheckbox v-model="iconOnly" label="仅图标模式" />
            <VCheckbox v-model="disabled" label="disabled" />
            <VCheckbox v-model="disabledFocusable" label="disabledFocusable" />
          </div>
        </template>
      </DemoPlayground>
    </section>

    <!-- 分类用例 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">全部状态示例</h2>
          <p class="demo-section__sub">覆盖 CONTROLS.md 要求的全部外观、尺寸、形状、图标、禁用与切换态。</p>
        </div>
      </div>

      <div class="demo-cards-grid">
        <DemoCard
          title="外观（Appearance）"
          description="从高强调主按钮到无边框透明按钮的五个层级。"
          :code="appearanceCode"
          full
        >
          <div class="demo-row">
            <VButton appearance="primary">Primary</VButton>
            <VButton>Secondary</VButton>
            <VButton appearance="outline">Outline</VButton>
            <VButton appearance="subtle">Subtle</VButton>
            <VButton appearance="transparent">Transparent</VButton>
          </div>
        </DemoCard>

        <DemoCard
          title="尺寸与形状"
          description="small / medium / large 三档高度与三种圆角形状。"
          :code="sizeShapeCode"
        >
          <div class="demo-row">
            <VButton size="small">Small</VButton>
            <VButton size="medium">Medium</VButton>
            <VButton size="large">Large</VButton>
          </div>
          <div class="demo-row">
            <VButton shape="rounded">Rounded</VButton>
            <VButton shape="circular">Circular</VButton>
            <VButton shape="square">Square</VButton>
          </div>
        </DemoCard>

        <DemoCard
          title="图标与仅图标按钮"
          description="支持 #icon 前置插槽；仅传入图标时自动切换为等宽方形按钮。"
          :code="iconCode"
        >
          <div class="demo-row">
            <VButton appearance="primary">
              <template #icon><DemoIcons name="plus" :size="16" /></template>
              新建项目
            </VButton>
            <VButton appearance="outline">
              <template #icon><DemoIcons name="search" :size="16" /></template>
              快速查找
            </VButton>
          </div>
          <div class="demo-row">
            <VButton size="small" appearance="outline" aria-label="小号新建">
              <template #icon><DemoIcons name="plus" :size="14" /></template>
            </VButton>
            <VButton size="medium" appearance="outline" aria-label="中号新建">
              <template #icon><DemoIcons name="plus" :size="16" /></template>
            </VButton>
            <VButton size="large" appearance="outline" aria-label="大号新建">
              <template #icon><DemoIcons name="plus" :size="20" /></template>
            </VButton>
            <VButton size="medium" shape="circular" appearance="primary" aria-label="圆形主按钮">
              <template #icon><DemoIcons name="plus" :size="16" /></template>
            </VButton>
          </div>
        </DemoCard>

        <DemoCard
          title="禁用与可聚焦禁用"
          description="可按 Tab 键验证 Focusable disabled 依然能获得键盘焦点。"
          :code="disabledCode"
        >
          <div class="demo-row">
            <VButton disabled>Disabled</VButton>
            <VButton appearance="primary" disabled>Primary</VButton>
            <VButton disabled-focusable>Focusable disabled</VButton>
            <VButton appearance="subtle" disabled>Subtle</VButton>
          </div>
        </DemoCard>

        <DemoCard
          title="切换按钮（VToggleButton）"
          description="通过 v-model 同步 aria-pressed 选中状态。"
          :code="toggleCode"
        >
          <div class="demo-row">
            <VToggleButton v-model="pressedSecondary">
              Secondary: {{ pressedSecondary ? '开' : '关' }}
            </VToggleButton>
            <VToggleButton v-model="pressedPrimary" appearance="primary">
              Primary: {{ pressedPrimary ? '开' : '关' }}
            </VToggleButton>
            <VToggleButton v-model="pressedOutline" appearance="outline">
              Outline: {{ pressedOutline ? '开' : '关' }}
            </VToggleButton>
          </div>
        </DemoCard>
      </div>
    </section>

    <!-- API 参考 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">API 说明</h2>
          <p class="demo-section__sub">默认插槽用于按钮正文，#icon 插槽用于前置图标；点击触发 click 事件。</p>
        </div>
      </div>
      <DemoApiTable :rows="buttonPropsRows" />
    </section>
  </div>
</template>
