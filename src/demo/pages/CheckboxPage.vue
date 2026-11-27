<script setup lang="ts">
import { computed, ref } from 'vue'
import { VButton, VCheckbox, VInput, VSelect } from '../../index'
import DemoApiTable, { type ApiRow } from '../components/DemoApiTable.vue'
import DemoCard from '../components/DemoCard.vue'
import DemoPlayground from '../components/DemoPlayground.vue'

type CheckboxSize = 'medium' | 'large'
type CheckboxShape = 'square' | 'circular'
type LabelPosition = 'after' | 'before'

// 交互调试台状态
const checkedVal = ref<boolean | 'mixed'>(true)
const size = ref<CheckboxSize>('medium')
const shape = ref<CheckboxShape>('square')
const labelPosition = ref<LabelPosition>('after')
const labelText = ref('允许发送版本更新通知')
const required = ref(false)
const disabled = ref(false)

const playgroundCode = computed(() => {
  const attrs: string[] = ['v-model="checked"']
  if (labelText.value) attrs.push(`label="${labelText.value}"`)
  if (size.value !== 'medium') attrs.push(`size="${size.value}"`)
  if (shape.value !== 'square') attrs.push(`shape="${shape.value}"`)
  if (labelPosition.value !== 'after') attrs.push(`label-position="${labelPosition.value}"`)
  if (required.value) attrs.push('required')
  if (disabled.value) attrs.push('disabled')
  if (!labelText.value) attrs.push('aria-label="勾选项"')
  return `<VCheckbox ${attrs.join(' ')} />`
})

// 全选联动示例
const optionEmail = ref(true)
const optionPush = ref(false)
const optionSms = ref(false)

const selectAllState = computed<boolean | 'mixed'>(() => {
  const values = [optionEmail.value, optionPush.value, optionSms.value]
  if (values.every(Boolean)) return true
  if (values.some(Boolean)) return 'mixed'
  return false
})

function handleSelectAll(next: boolean) {
  optionEmail.value = next
  optionPush.value = next
  optionSms.value = next
}

// 其它独立示例状态
const sizeMedium = ref(true)
const sizeLarge = ref(true)
const taskDone = ref(true)
const taskMixed = ref<boolean | 'mixed'>('mixed')
const labelAfter = ref(false)
const labelBefore = ref(true)
const agreedRequired = ref(false)
const standaloneChecked = ref(false)

const treeCode = `<VCheckbox
  :model-value="selectAllState"
  label="全选通知渠道"
  @update:model-value="handleSelectAll"
/>
<div style="padding-left: 24px">
  <VCheckbox v-model="optionEmail" label="邮件通知" />
  <VCheckbox v-model="optionPush" label="站内消息" />
  <VCheckbox v-model="optionSms" label="短信提醒" />
</div>`

const sizeShapeCode = `<VCheckbox v-model="sizeMedium" size="medium" label="Medium (16px)" />
<VCheckbox v-model="sizeLarge" size="large" label="Large (20px)" />
<VCheckbox v-model="taskDone" shape="circular" label="圆形已选" />
<VCheckbox v-model="taskMixed" shape="circular" label="圆形半选" />`

const labelCode = `<VCheckbox v-model="labelAfter" label="标签在右" label-position="after" />
<VCheckbox v-model="labelBefore" label="标签在左" label-position="before" />
<VCheckbox v-model="agreedRequired" label="同意服务协议" required />
<VCheckbox v-model="standaloneChecked" aria-label="仅勾选框示例" />`

const disabledCode = `<VCheckbox disabled label="禁用未选" />
<VCheckbox :model-value="true" disabled label="禁用已选" />
<VCheckbox model-value="mixed" disabled label="禁用半选" />`

const checkboxPropsRows: ApiRow[] = [
  {
    name: 'modelValue',
    type: "boolean | 'mixed'",
    defaultValue: 'false',
    description: '当前勾选状态，支持半选态 "mixed" 并自动同步原生 input.indeterminate。',
  },
  {
    name: 'size',
    type: "'medium' | 'large'",
    defaultValue: "'medium'",
    description: '指示器尺寸（16×16px / 20×20px）。',
  },
  {
    name: 'shape',
    type: "'square' | 'circular'",
    defaultValue: "'square'",
    description: '方形圆角或圆形指示器，半选图标随形状自动匹配。',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'undefined',
    description: '标签文字；默认插槽优先级高于 label。两者均未提供时渲染为纯勾选框。',
  },
  {
    name: 'labelPosition',
    type: "'after' | 'before'",
    defaultValue: "'after'",
    description: '标签相对勾选框的位置。',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: 'false',
    description: '开启且存在标签时追加红色必填星号，同时给原生 input 设置 required。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: '禁用交互，覆盖选中与半选底色。',
  },
  {
    name: 'expose',
    type: '{ input, focus, blur }',
    defaultValue: '—',
    description: '暴露内部原生 <input type="checkbox"> 引用及 focus / blur 方法。',
  },
]
</script>

<template>
  <div>
    <header class="demo-page-header">
      <p class="demo-page-header__eyebrow">基础控件</p>
      <div class="demo-page-header__title-row">
        <h1 class="demo-page-header__title">Checkbox</h1>
        <div class="demo-page-header__tags">
          <span class="demo-tag demo-tag--brand">&lt;VCheckbox&gt;</span>
          <span class="demo-tag">@fluentui/react-checkbox</span>
        </div>
      </div>
      <p class="demo-page-header__desc">
        支持未选、已选与半选（mixed）三态的勾选框，保留原生空格键切换与双层键盘焦点环，支持方圆形状与标签左右排布。
      </p>
    </header>

    <!-- 交互调试台 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">交互调试台</h2>
          <p class="demo-section__sub">可随时切到半选态（mixed）验证从半选点击切换为已选的交互行为。</p>
        </div>
      </div>

      <DemoPlayground :code="playgroundCode">
        <template #stage>
          <VCheckbox
            v-model="checkedVal"
            :size="size"
            :shape="shape"
            :label="labelText || undefined"
            :label-position="labelPosition"
            :required="required"
            :disabled="disabled"
            :aria-label="labelText ? undefined : '独立勾选框'"
          />
        </template>

        <template #readout>
          <span>
            modelValue：<code class="demo-inline-code">{{ String(checkedVal) }}</code>
          </span>
          <div class="demo-row">
            <VButton size="small" appearance="subtle" @click="checkedVal = false">设为 false</VButton>
            <VButton size="small" appearance="subtle" @click="checkedVal = 'mixed'">设为 mixed</VButton>
            <VButton size="small" appearance="subtle" @click="checkedVal = true">设为 true</VButton>
          </div>
        </template>

        <template #controls>
          <div class="demo-control-field">
            <label class="demo-control-field__label" for="chk-pg-size">size</label>
            <VSelect id="chk-pg-size" v-model="size" size="small">
              <option value="medium">medium (16px · 默认)</option>
              <option value="large">large (20px)</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="chk-pg-shape">shape</label>
            <VSelect id="chk-pg-shape" v-model="shape" size="small">
              <option value="square">square（默认）</option>
              <option value="circular">circular</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="chk-pg-pos">labelPosition</label>
            <VSelect id="chk-pg-pos" v-model="labelPosition" size="small">
              <option value="after">after（标签在右）</option>
              <option value="before">before（标签在左）</option>
            </VSelect>
          </div>

          <div class="demo-control-field">
            <label class="demo-control-field__label" for="chk-pg-label">label（留空为纯框）</label>
            <VInput id="chk-pg-label" v-model="labelText" size="small" placeholder="留空展示纯框" />
          </div>

          <div class="demo-control-checks">
            <VCheckbox v-model="required" label="required 必填星号" />
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
          <p class="demo-section__sub">覆盖全选半选联动、尺寸形状、标签位置、必填、无标签纯框与禁用三态。</p>
        </div>
      </div>

      <div class="demo-cards-grid">
        <DemoCard
          title="全选与半选联动（Tri-state）"
          description="子项部分勾选时父级自动显示 mixed 半选图标。"
          :code="treeCode"
        >
          <div style="display: flex; flex-direction: column">
            <VCheckbox
              :model-value="selectAllState"
              label="全选通知渠道"
              @update:model-value="handleSelectAll"
            />
            <div style="display: flex; flex-wrap: wrap; gap: 4px 12px; padding-left: 24px">
              <VCheckbox v-model="optionEmail" label="邮件通知" />
              <VCheckbox v-model="optionPush" label="站内消息" />
              <VCheckbox v-model="optionSms" label="短信提醒" />
            </div>
          </div>
          <template #footer>
            全选状态：<code class="demo-inline-code">{{ String(selectAllState) }}</code>
          </template>
        </DemoCard>

        <DemoCard
          title="尺寸与形状"
          description="支持 medium / large 尺寸，以及方形与圆形指示器。"
          :code="sizeShapeCode"
        >
          <div class="demo-row">
            <VCheckbox v-model="sizeMedium" size="medium" label="Medium (16px)" />
            <VCheckbox v-model="sizeLarge" size="large" label="Large (20px)" />
          </div>
          <div class="demo-row">
            <VCheckbox v-model="taskDone" shape="circular" label="圆形已选" />
            <VCheckbox v-model="taskMixed" shape="circular" label="圆形半选" />
          </div>
        </DemoCard>

        <DemoCard
          title="标签位置、必填与纯框"
          description="支持标签居左/居右、必填星号，以及仅提供 aria-label 的无标签纯框。"
          :code="labelCode"
        >
          <div class="demo-row">
            <VCheckbox v-model="labelAfter" label="标签在右" label-position="after" />
            <VCheckbox v-model="labelBefore" label="标签在左" label-position="before" />
          </div>
          <div class="demo-row">
            <VCheckbox v-model="agreedRequired" label="同意服务协议" required />
            <VCheckbox v-model="standaloneChecked" aria-label="仅勾选框示例" />
          </div>
        </DemoCard>

        <DemoCard
          title="禁用三态（Disabled）"
          description="禁用态统一采用中性禁用色，区分未选、已选与半选。"
          :code="disabledCode"
        >
          <div class="demo-row">
            <VCheckbox disabled label="禁用未选" />
            <VCheckbox :model-value="true" disabled label="禁用已选" />
            <VCheckbox model-value="mixed" disabled label="禁用半选" />
          </div>
        </DemoCard>
      </div>
    </section>

    <!-- API 参考 -->
    <section class="demo-section">
      <div class="demo-section__head">
        <div>
          <h2 class="demo-section__title">API 说明</h2>
          <p class="demo-section__sub">
            事件包括 update:modelValue（布尔值）与原生 change；支持 #default 标签插槽与 #indicator 图标插槽。
          </p>
        </div>
      </div>
      <DemoApiTable :rows="checkboxPropsRows" />
    </section>
  </div>
</template>
