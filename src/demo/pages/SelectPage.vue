<script setup lang="ts">
import { computed, ref } from 'vue'
import { VButton, VCheckbox, VSelect } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'

type SelectAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter'
type SelectSize = 'small' | 'medium' | 'large'

// 交互调试台状态
const appearance = ref<SelectAppearance>('outline')
const size = ref<SelectSize>('medium')
const selectedVal = ref('east-asia')
const invalid = ref(false)
const disabled = ref(false)
const customIcon = ref(false)
const playgroundSelectRef = ref<InstanceType<typeof VSelect> | null>(null)

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="region"']
  if (appearance.value !== 'outline') attrs.push(`appearance="${appearance.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (invalid.value) attrs.push('aria-invalid="true"')
  if (disabled.value) attrs.push('disabled')

  const attrStr = ' ' + attrs.join(' ')
  const iconLine = customIcon.value
    ? '\n  <template #icon><span aria-hidden="true">▾</span></template>'
    : ''
  return `<VSelect${attrStr}>
  <option value="east-asia">East Asia</option>
  <option value="southeast-asia">Southeast Asia</option>
  <option value="west-europe">West Europe</option>
  <option value="north-america">North America</option>${iconLine}
</VSelect>`
})

// 分组受控示例状态
const selectedRegion = ref('east-asia')

const appearanceCode = `<VSelect appearance="outline">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</VSelect>
<VSelect appearance="underline">...</VSelect>
<VSelect appearance="filled-darker">...</VSelect>
<VSelect appearance="filled-lighter">...</VSelect>`

const sizeCode = `<VSelect size="small"><option>Small (24px)</option></VSelect>
<VSelect size="medium"><option>Medium (32px)</option></VSelect>
<VSelect size="large"><option>Large (40px)</option></VSelect>`

const optgroupCode = `<VSelect v-model="selectedRegion" aria-label="选择区域">
  <optgroup label="Asia Pacific">
    <option value="east-asia">East Asia</option>
    <option value="southeast-asia">Southeast Asia</option>
  </optgroup>
  <optgroup label="Europe & Americas">
    <option value="west-europe">West Europe</option>
    <option value="north-america">North America</option>
  </optgroup>
</VSelect>`

const stateCode = `<VSelect aria-invalid="true">
  <option value="invalid">校验错误（outline）</option>
</VSelect>
<VSelect appearance="underline" aria-invalid="true">
  <option value="invalid-underline">校验错误（underline）</option>
</VSelect>
<VSelect disabled>
  <option value="disabled">已禁用</option>
</VSelect>
<VSelect>
  <option value="custom">自定义图标</option>
  <template #icon><span aria-hidden="true">▾</span></template>
</VSelect>`

const selectPropsRows: ApiRow[] = [
  {
    name: 'modelValue',
    type: 'string',
    defaultValue: 'undefined',
    description: '当前选中项的 value；未传入时保留浏览器原生初始选中行为。',
  },
  {
    name: 'appearance',
    type: "'outline' | 'underline' | 'filled-darker' | 'filled-lighter'",
    defaultValue: "'outline'",
    description: '与 Input 对齐的四种 Fluent 视觉外观。',
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: '控件高度与箭头尺寸档位（24px / 32px / 40px）。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: '禁用下拉选择并隐藏底部焦点线。',
  },
  {
    name: '#default / #icon',
    type: 'slots',
    defaultValue: '—',
    description: '默认插槽放置原生 <option> 与 <optgroup>；#icon 插槽可替换右侧展开箭头。',
  },
  {
    name: 'expose',
    type: '{ select, focus, blur }',
    defaultValue: '—',
    description: '暴露内部原生 <select> 元素引用与 focus / blur 方法。',
  },
]
</script>

<template>
  <div>
    <header class="demo-page-header">
      <p class="demo-page-header__eyebrow">基础控件</p>
      <div class="demo-page-header__title-row">
        <h1 class="demo-page-header__title">Select</h1>
        <div class="demo-page-header__tags">
          <span class="demo-tag demo-tag--brand">&lt;VSelect&gt;</span>
          <span class="demo-tag">@fluentui/react-select</span>
        </div>
      </div>
      <p class="demo-page-header__desc">
        封装原生 &lt;select&gt; 的单选下拉控件，保留跨平台键盘操作与无障碍语义，并针对深色主题的展开面板做了底色与前景色适配。
      </p>
    </header>

    <!-- 交互调试台 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">交互调试台</h2>
          <p class="demo-section__sub">切换外观、尺寸与画布深浅主题，检查展开列表与底部焦点指示线。</p>
        </div>
      </div>

      <DemoPlayground :code="playgroundCode">
        <template #stage>
          <VSelect
            ref="playgroundSelectRef"
            v-model="selectedVal"
            :appearance="appearance"
            :size="size"
            :aria-invalid="invalid ? 'true' : undefined"
            :disabled="disabled"
            aria-label="调试台下拉框"
            style="width: 100%; max-width: 300px"
          >
            <option value="east-asia">East Asia</option>
            <option value="southeast-asia">Southeast Asia</option>
            <option value="west-europe">West Europe</option>
            <option value="north-america">North America</option>
            <template v-if="customIcon" #icon><span aria-hidden="true">▾</span></template>
          </VSelect>
        </template>

        <template #readout>
          <span>
            当前选中值：<code class="demo-inline-code">{{ selectedVal }}</code>
          </span>
          <VButton appearance="subtle" size="small" @click="playgroundSelectRef?.focus()">
            聚焦 (focus)
          </VButton>
        </template>

        <template #controls>
          <div class="demo-control-field">
            <label class="demo-control-field__label" for="sel-pg-appearance">appearance</label>
            <VSelect id="sel-pg-appearance" v-model="appearance" size="small">
              <option value="outline">outline（默认）</option>
              <option value="underline">underline</option>
              <option value="filled-darker">filled-darker</option>
              <option value="filled-lighter">filled-lighter</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="sel-pg-size">size</label>
            <VSelect id="sel-pg-size" v-model="size" size="small">
              <option value="small">small (24px)</option>
              <option value="medium">medium (32px)</option>
              <option value="large">large (40px)</option>
            </VSelect>
          </div>

          <div class="demo-control-checks">
            <VCheckbox v-model="customIcon" label="自定义 #icon 图标" />
            <VCheckbox v-model="invalid" label='aria-invalid="true"' />
            <VCheckbox v-model="disabled" label="disabled" />
          </div>
        </template>
      </DemoPlayground>
    </section>

    <!-- 分类用例 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">全部状态示例</h2>
          <p class="demo-section__sub">覆盖四种外观、三种尺寸、分组选项、校验错误、禁用与自定义图标。</p>
        </div>
      </div>

      <div class="demo-cards-grid">
        <DemoCard
          title="外观（Appearance）"
          description="次级底色容器下完整对比四种外观风格。"
          :code="appearanceCode"
          tinted
          full
        >
          <div class="demo-field-grid">
            <div class="demo-field">
              <label class="demo-field__label" for="demo-select-outline">Outline（默认）</label>
              <VSelect id="demo-select-outline" appearance="outline">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="demo-select-underline">Underline</label>
              <VSelect id="demo-select-underline" appearance="underline">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="demo-select-darker">Filled Darker</label>
              <VSelect id="demo-select-darker" appearance="filled-darker">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="demo-select-lighter">Filled Lighter</label>
              <VSelect id="demo-select-lighter" appearance="filled-lighter">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </VSelect>
            </div>
          </div>
        </DemoCard>

        <DemoCard
          title="尺寸（Size）"
          description="与同尺寸 Input 与 Button 保持精确的高度对齐。"
          :code="sizeCode"
        >
          <div class="demo-stack">
            <div class="demo-field">
              <label class="demo-field__label" for="sel-size-sm">Small (24px)</label>
              <VSelect id="sel-size-sm" size="small">
                <option value="small">Small (24px)</option>
                <option value="compact">Compact</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="sel-size-md">Medium (32px · 默认)</label>
              <VSelect id="sel-size-md" size="medium">
                <option value="medium">Medium (32px)</option>
                <option value="standard">Standard</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="sel-size-lg">Large (40px)</label>
              <VSelect id="sel-size-lg" size="large">
                <option value="large">Large (40px)</option>
                <option value="spacious">Spacious</option>
              </VSelect>
            </div>
          </div>
        </DemoCard>

        <DemoCard
          title="分组选项与受控绑定"
          description="支持原生 <optgroup> 分组与 v-model 同步。"
          :code="optgroupCode"
        >
          <div class="demo-field">
            <label class="demo-field__label" for="sel-optgroup">服务区域</label>
            <VSelect id="sel-optgroup" v-model="selectedRegion">
              <optgroup label="Asia Pacific">
                <option value="east-asia">East Asia</option>
                <option value="southeast-asia">Southeast Asia</option>
              </optgroup>
              <optgroup label="Europe & Americas">
                <option value="west-europe">West Europe</option>
                <option value="north-america">North America</option>
              </optgroup>
            </VSelect>
          </div>
          <template #footer>
            当前受控选中值：<code class="demo-inline-code">{{ selectedRegion }}</code>
          </template>
        </DemoCard>

        <DemoCard
          title="校验错误、禁用与自定义图标"
          description="支持 aria-invalid 错误边框、原生 disabled 与 #icon 插槽替换。"
          :code="stateCode"
          full
        >
          <div class="demo-field-grid">
            <div class="demo-field">
              <label class="demo-field__label" for="sel-err-out">校验错误（outline）</label>
              <VSelect id="sel-err-out" aria-invalid="true">
                <option value="invalid">校验错误（outline）</option>
                <option value="retry">重试</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="sel-err-ul">校验错误（underline）</label>
              <VSelect id="sel-err-ul" appearance="underline" aria-invalid="true">
                <option value="invalid-underline">校验错误（underline）</option>
                <option value="retry">重试</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="sel-dis">禁用状态</label>
              <VSelect id="sel-dis" disabled>
                <option value="disabled">已禁用</option>
              </VSelect>
            </div>
            <div class="demo-field">
              <label class="demo-field__label" for="sel-icon">自定义图标</label>
              <VSelect id="sel-icon">
                <option value="custom">自定义图标</option>
                <option value="fluent">默认列表</option>
                <template #icon><span aria-hidden="true">▾</span></template>
              </VSelect>
            </div>
          </div>
        </DemoCard>
      </div>
    </section>

    <!-- API 参考 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">API 说明</h2>
          <p class="demo-section__sub">原生属性（name、id、required、aria-* 等）自动透传给内部 &lt;select&gt;。</p>
        </div>
      </div>
      <DemoApiTable :rows="selectPropsRows" />
    </section>
  </div>
</template>
