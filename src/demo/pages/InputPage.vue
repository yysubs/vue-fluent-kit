<script setup lang="ts">
import { computed, ref } from 'vue'
import { VButton, VCheckbox, VInput, VSelect } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoIcons from '../components/DemoIcons.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import DemoToc, { type TocItem } from '../components/DemoToc.vue'

const tocItems: TocItem[] = [
  { id: 'inp-playground', label: '交互调试台' },
  { id: 'inp-examples', label: '全部状态示例' },
  { id: 'inp-api', label: 'Props / API' },
]

type InputAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter'
type InputSize = 'small' | 'medium' | 'large'

// 交互调试台状态
const appearance = ref<InputAppearance>('outline')
const size = ref<InputSize>('medium')
const modelVal = ref('Fluent UI v9')
const placeholder = ref('请输入内容...')
const showBefore = ref(true)
const showAfter = ref(true)
const invalid = ref(false)
const readonly = ref(false)
const disabled = ref(false)

const playgroundInputRef = ref<InstanceType<typeof VInput> | null>(null)

function clearPlaygroundInput() {
  modelVal.value = ''
  playgroundInputRef.value?.focus()
}

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="value"']
  if (appearance.value !== 'outline') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (placeholder.value) attrs.push(`placeholder="${placeholder.value}"`)
  if (invalid.value) attrs.push('aria-invalid="true"')
  if (readonly.value) attrs.push('readonly')
  if (disabled.value) attrs.push('disabled')

  const attrStr = ' ' + attrs.join(' ')
  if (!showBefore.value && !showAfter.value) {
    return `<VInput${attrStr} />`
  }

  const lines = [`<VInput${attrStr}>`]
  if (showBefore.value) lines.push('  <template #contentBefore><SearchIcon /></template>')
  if (showAfter.value) lines.push('  <template #contentAfter><ClearButton /></template>')
  lines.push('</VInput>')
  return lines.join('\n')
})

// 示例状态
const searchValue = ref('vue-fluent-kit')
const searchInputRef = ref<InstanceType<typeof VInput> | null>(null)
const passwordVal = ref('fluent-2026')
const showPassword = ref(false)
const bindingValue = ref('Fluent UI v9')

function clearSearch() {
  searchValue.value = ''
  searchInputRef.value?.focus()
}

const appearanceCode = `<VInput placeholder="Outline（默认）" />
<VInput appearance="underline" placeholder="Underline" />
<VInput appearance="filled-darker" placeholder="Filled darker" />
<VInput appearance="filled-lighter" placeholder="Filled lighter" />`

const sizeCode = `<VInput size="small" placeholder="Small (24px)" />
<VInput size="medium" placeholder="Medium (32px)" />
<VInput size="large" placeholder="Large (40px)" />`

const slotCode = `<VInput ref="searchRef" v-model="query" placeholder="带前置图标与清空按钮">
  <template #contentBefore><SearchIcon /></template>
  <template v-if="query" #contentAfter>
    <VButton appearance="transparent" size="small" aria-label="清空" @click="clear">
      <template #icon><CloseIcon /></template>
    </VButton>
  </template>
</VInput>`

const stateCode = `<VInput aria-invalid="true" model-value="invalid-email@" />
<VInput appearance="underline" aria-invalid="true" model-value="underline invalid" />
<VInput readonly model-value="只读文本" />
<VInput disabled model-value="禁用状态" />`

const inputPropsRows: ApiRow[] = [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: '受控输入值，用于 v-model；未传入时按原生非受控输入框工作。',
  },
  {
    name: 'appearance',
    type: "'outline' | 'underline' | 'filled-darker' | 'filled-lighter'",
    defaultValue: "'outline'",
    description: '四种 Fluent 视觉外观，filled-lighter 适合放置在带底色的面板上。',
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: '输入高度与字号档位（24px / 32px / 40px）。',
  },
  {
    name: 'type',
    type: "'text' | 'email' | 'password' | 'search' | 'number' | ...",
    defaultValue: "'text'",
    description: '原生文本类输入类型。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: '禁用输入并隐藏底部焦点条。',
  },
  {
    name: 'aria-invalid',
    type: "'true' | 'false'",
    defaultValue: '—',
    description: '透传到原生 input，为 "true" 时展示红色校验错误边框（聚焦时让位于品牌焦点线）。',
  },
  {
    name: 'expose',
    type: '{ input, focus, blur, select }',
    defaultValue: '—',
    description: '通过模板 ref 可直接调用 focus()、blur()、select() 或访问原生 input 节点。',
  },
]
</script>

<template>
  <div class="demo-docs-layout">
    <div class="demo-docs-body">
    <header class="demo-page-header">
      <p class="demo-page-header__eyebrow">Components</p>
      <div class="demo-page-header__title-row">
        <h1 class="demo-page-header__title">Input</h1>
        <div class="demo-page-header__tags">
          <span class="demo-tag demo-tag--brand">&lt;VInput&gt;</span>
          <span class="demo-tag">@fluentui/react-input</span>
        </div>
      </div>
      <p class="demo-page-header__desc">
        单行文本输入框，支持四种 Fluent 外观、三档尺寸、前后缀插槽（contentBefore / contentAfter）以及聚焦展开的底部品牌指示线。
      </p>
    </header>

    <!-- 交互调试台 -->
    <section id="inp-playground" class="demo-section demo-section--first">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">交互调试台</h2>
          <p class="demo-section__sub">点击输入框体验底部品牌色焦点条的展开与收起过渡。</p>
        </div>
      </div>

      <DemoPlayground :code="playgroundCode">
        <template #stage>
          <VInput
            ref="playgroundInputRef"
            v-model="modelVal"
            :appearance="appearance"
            :size="size"
            :placeholder="placeholder"
            :aria-invalid="invalid ? 'true' : undefined"
            :readonly="readonly"
            :disabled="disabled"
            aria-label="调试台输入框"
            style="width: 100%; max-width: 340px"
          >
            <template v-if="showBefore" #contentBefore>
              <DemoIcons name="search" :size="size === 'large' ? 20 : size === 'small' ? 14 : 16" />
            </template>
            <template v-if="showAfter && modelVal && !disabled && !readonly" #contentAfter>
              <VButton
                appearance="transparent"
                size="small"
                aria-label="清空输入"
                @click="clearPlaygroundInput"
              >
                <template #icon><DemoIcons name="close" :size="14" /></template>
              </VButton>
            </template>
          </VInput>
        </template>

        <template #readout>
          <span>
            当前值：<code class="demo-inline-code">{{ modelVal || '（空）' }}</code>
          </span>
          <div class="demo-row">
            <VButton appearance="subtle" size="small" @click="playgroundInputRef?.focus()">
              聚焦 (focus)
            </VButton>
            <VButton appearance="subtle" size="small" @click="playgroundInputRef?.select()">
              全选 (select)
            </VButton>
          </div>
        </template>

        <template #controls>
          <div class="demo-control-field">
            <label class="demo-control-field__label" for="inp-pg-appearance">appearance</label>
            <VSelect id="inp-pg-appearance" v-model="appearance" size="small">
              <option value="outline">outline（默认）</option>
              <option value="underline">underline</option>
              <option value="filled-darker">filled-darker</option>
              <option value="filled-lighter">filled-lighter</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="inp-pg-size">size</label>
            <VSelect id="inp-pg-size" v-model="size" size="small">
              <option value="small">small (24px)</option>
              <option value="medium">medium (32px)</option>
              <option value="large">large (40px)</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="inp-pg-placeholder">placeholder</label>
            <VInput id="inp-pg-placeholder" v-model="placeholder" size="small" />
          </div>

          <div class="demo-control-checks">
            <VCheckbox v-model="showBefore" label="contentBefore 前缀" />
            <VCheckbox v-model="showAfter" label="contentAfter 清空按钮" />
            <VCheckbox v-model="invalid" label='aria-invalid="true"' />
            <VCheckbox v-model="readonly" label="readonly" />
            <VCheckbox v-model="disabled" label="disabled" />
          </div>
        </template>
      </DemoPlayground>
    </section>

    <!-- 分类用例 -->
    <section id="inp-examples" class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">全部状态示例</h2>
          <p class="demo-section__sub">覆盖外观对比、尺寸阶梯、前后缀插槽、校验错误、禁用与受控双向绑定。</p>
        </div>
      </div>

      <div class="demo-cards-grid">
        <DemoCard
          title="外观（Appearance）"
          description="放在次级表面底色上，便于区分 outline、filled-darker 与 filled-lighter。"
          :code="appearanceCode"
          tinted
          full
        >
          <div class="demo-field-grid">
            <div class="demo-field">
              <label class="demo-field__label" for="inp-app-outline">Outline（默认）</label>
              <VInput id="inp-app-outline" placeholder="Outline 输入框" />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-app-underline">Underline</label>
              <VInput id="inp-app-underline" appearance="underline" placeholder="Underline 输入框" />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-app-darker">Filled Darker</label>
              <VInput id="inp-app-darker" appearance="filled-darker" placeholder="Filled darker" />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-app-lighter">Filled Lighter</label>
              <VInput id="inp-app-lighter" appearance="filled-lighter" placeholder="Filled lighter" />
            </div>
          </div>
        </DemoCard>

        <DemoCard
          title="尺寸（Size）"
          description="对应 24px、32px、40px 三档高度与字号。"
          :code="sizeCode"
        >
          <div class="demo-stack">
            <div class="demo-field">
              <label class="demo-field__label" for="inp-size-sm">Small (24px)</label>
              <VInput id="inp-size-sm" size="small" placeholder="Small 输入框" />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-size-md">Medium (32px · 默认)</label>
              <VInput id="inp-size-md" size="medium" placeholder="Medium 输入框" />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-size-lg">Large (40px)</label>
              <VInput id="inp-size-lg" size="large" placeholder="Large 输入框" />
            </div>
          </div>
        </DemoCard>

        <DemoCard
          title="前后缀插槽（Slots）"
          description="通过 contentBefore / contentAfter 组合图标、货币单位或可交互按钮。"
          :code="slotCode"
        >
          <div class="demo-stack">
            <VInput
              ref="searchInputRef"
              v-model="searchValue"
              placeholder="带前置搜索图标与清空按钮"
              aria-label="搜索关键字"
              style="width: 100%"
            >
              <template #contentBefore>
                <DemoIcons name="search" :size="16" />
              </template>
              <template v-if="searchValue" #contentAfter>
                <VButton
                  appearance="transparent"
                  size="small"
                  aria-label="清空输入"
                  @click="clearSearch"
                >
                  <template #icon><DemoIcons name="close" :size="14" /></template>
                </VButton>
              </template>
            </VInput>

            <VInput type="number" placeholder="0.00" aria-label="金额" style="width: 100%">
              <template #contentBefore><span>¥</span></template>
              <template #contentAfter><span>CNY</span></template>
            </VInput>

            <VInput
              v-model="passwordVal"
              :type="showPassword ? 'text' : 'password'"
              aria-label="密码输入"
              style="width: 100%"
            >
              <template #contentAfter>
                <VButton
                  appearance="transparent"
                  size="small"
                  :aria-label="showPassword ? '隐藏密码' : '显示密码'"
                  @click="showPassword = !showPassword"
                >
                  <template #icon>
                    <DemoIcons :name="showPassword ? 'eye-off' : 'eye'" :size="16" />
                  </template>
                </VButton>
              </template>
            </VInput>
          </div>
        </DemoCard>

        <DemoCard
          title="校验错误、只读与禁用"
          description="非聚焦时错误边框为红色，聚焦时自动让位于品牌焦点指示线。"
          :code="stateCode"
          full
        >
          <div class="demo-field-grid">
            <div class="demo-field">
              <label class="demo-field__label" for="inp-st-err">校验错误（outline）</label>
              <VInput id="inp-st-err" aria-invalid="true" model-value="invalid-email@" />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-st-err-ul">校验错误（underline）</label>
              <VInput
                id="inp-st-err-ul"
                appearance="underline"
                aria-invalid="true"
                model-value="underline invalid"
              />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-st-ro">只读（readonly）</label>
              <VInput id="inp-st-ro" readonly model-value="只读文本内容" />
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="inp-st-dis">禁用（disabled）</label>
              <VInput id="inp-st-dis" disabled model-value="禁用状态">
                <template #contentBefore><span>#</span></template>
              </VInput>
            </div>
          </div>
        </DemoCard>

        <DemoCard
          title="受控 v-model 实时绑定"
          description="输入文字实时同步外部状态，并支持外部重置。"
          full
        >
          <div class="demo-row">
            <VInput
              v-model="bindingValue"
              placeholder="输入文字查看实时绑定"
              aria-label="受控双向绑定输入"
              style="flex: 1; min-width: 220px; max-width: 340px"
            />
            <VButton size="small" appearance="outline" @click="bindingValue = 'Fluent UI v9'">
              重置为默认值
            </VButton>
            <VButton size="small" appearance="subtle" @click="bindingValue = ''">清空</VButton>
          </div>
          <template #footer>
            当前绑定值：<code class="demo-inline-code">{{ bindingValue || '（空）' }}</code>
          </template>
        </DemoCard>
      </div>
    </section>

    <!-- API 参考 -->
    <section id="inp-api" class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">Props / API</h2>
          <p class="demo-section__sub">
            原生属性（placeholder、readonly、required、aria-* 等）会自动透传至内部 &lt;input&gt;；class 与 style 挂载在外层容器。
          </p>
        </div>
      </div>
      <DemoApiTable :rows="inputPropsRows" />
    </section>
    </div>

    <DemoToc :items="tocItems" />
  </div>
</template>
