<script setup lang="ts">
import { computed, ref } from 'vue'
import { VButton, VCheckbox, VToggleButton } from '../index'
import '../styles/index.css'

const theme = ref<'light' | 'dark'>('light')
const pressed = ref(false)

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

const sizeMedium = ref(true)
const sizeLarge = ref(true)
const taskDone = ref(true)
const taskMixed = ref<boolean | 'mixed'>('mixed')
const labelAfter = ref(false)
const labelBefore = ref(true)
const agreedRequired = ref(false)
const standaloneChecked = ref(false)

const groups = [
  {
    name: '背景',
    tokens: [
      ['--colorNeutralBackground1', '面板 / 卡片'],
      ['--colorNeutralBackground2', '次级面板'],
      ['--colorNeutralBackground3', '填充输入框'],
      ['--colorNeutralBackground4', '侧栏'],
    ],
  },
  {
    name: '文字',
    tokens: [
      ['--colorNeutralForeground1', '正文'],
      ['--colorNeutralForeground2', '次要文字'],
      ['--colorNeutralForeground3', '说明文字'],
    ],
  },
  {
    name: '品牌',
    tokens: [
      ['--colorBrandBackground', '品牌底色'],
      ['--colorBrandBackgroundHover', '品牌悬停'],
      ['--colorBrandForeground1', '品牌前景'],
    ],
  },
  {
    name: '状态',
    tokens: [
      ['--colorPaletteGreenBackground3', '成功'],
      ['--colorPaletteDarkOrangeBackground3', '警告'],
      ['--colorPaletteRedBackground3', '错误'],
    ],
  },
]
</script>

<template>
  <main class="vfk-demo" :data-vfk-theme="theme">
    <header class="vfk-demo__head">
      <div>
        <h1 class="vfk-demo__title">vue-fluent-kit</h1>
        <p class="vfk-demo__desc">Button、Checkbox 与主题 token 预览。</p>
      </div>
      <div class="vfk-demo__head-actions">
        <VButton
          appearance="outline"
          size="small"
          @click="theme = theme === 'light' ? 'dark' : 'light'"
        >
          切换为{{ theme === 'light' ? '深色' : '浅色' }}
        </VButton>
      </div>
    </header>

    <section class="vfk-demo__group">
      <h2 class="vfk-demo__group-title">Button 外观</h2>
      <div class="vfk-demo__buttons">
        <VButton appearance="primary">Primary</VButton>
        <VButton>Secondary</VButton>
        <VButton appearance="outline">Outline</VButton>
        <VButton appearance="subtle">Subtle</VButton>
        <VButton appearance="transparent">Transparent</VButton>
      </div>
      <div class="vfk-demo__buttons">
        <VButton size="small">Small</VButton>
        <VButton size="medium">Medium</VButton>
        <VButton size="large">Large</VButton>
        <VButton shape="circular">Circular</VButton>
        <VButton shape="square">Square</VButton>
      </div>
      <div class="vfk-demo__buttons">
        <VButton disabled>Disabled</VButton>
        <VButton disabled-focusable>Focusable disabled</VButton>
        <VButton icon-only aria-label="Add" appearance="outline">
          <template #icon><span aria-hidden="true">＋</span></template>
        </VButton>
        <VToggleButton v-model="pressed">Toggle: {{ pressed ? 'on' : 'off' }}</VToggleButton>
      </div>
    </section>

    <section class="vfk-demo__group">
      <h2 class="vfk-demo__group-title">Checkbox 勾选框</h2>
      <div class="vfk-demo__checkbox-tree">
        <VCheckbox
          :model-value="selectAllState"
          label="全选通知渠道"
          @update:model-value="handleSelectAll"
        />
        <div class="vfk-demo__checkbox-children">
          <VCheckbox v-model="optionEmail" label="邮件通知" />
          <VCheckbox v-model="optionPush" label="站内消息" />
          <VCheckbox v-model="optionSms" label="短信提醒" />
        </div>
      </div>
      <div class="vfk-demo__buttons">
        <VCheckbox v-model="sizeMedium" size="medium" label="Medium (16px)" />
        <VCheckbox v-model="sizeLarge" size="large" label="Large (20px)" />
        <VCheckbox v-model="taskDone" shape="circular" label="圆形已选" />
        <VCheckbox v-model="taskMixed" shape="circular" label="圆形半选" />
      </div>
      <div class="vfk-demo__buttons">
        <VCheckbox v-model="labelAfter" label="标签在右" label-position="after" />
        <VCheckbox v-model="labelBefore" label="标签在左" label-position="before" />
        <VCheckbox v-model="agreedRequired" label="同意服务协议" required />
        <VCheckbox v-model="standaloneChecked" aria-label="仅勾选框示例" />
      </div>
      <div class="vfk-demo__buttons">
        <VCheckbox disabled label="禁用未选" />
        <VCheckbox :model-value="true" disabled label="禁用已选" />
        <VCheckbox model-value="mixed" disabled label="禁用半选" />
      </div>
    </section>

    <section v-for="group in groups" :key="group.name" class="vfk-demo__group">
      <h2 class="vfk-demo__group-title">{{ group.name }}</h2>
      <ul class="vfk-demo__list">
        <li v-for="[token, label] in group.tokens" :key="token" class="vfk-demo__item">
          <span class="vfk-demo__swatch" :style="{ background: `var(${token})` }" />
          <span class="vfk-demo__label">{{ label }}</span>
          <code class="vfk-demo__token">{{ token }}</code>
        </li>
      </ul>
    </section>
  </main>
</template>

<style>
.vfk-demo {
  box-sizing: border-box;
  max-width: 720px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--colorNeutralForeground1);
  background: var(--colorNeutralBackground1);
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  line-height: var(--lineHeightBase300);
}

.vfk-demo__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacingHorizontalM);
  margin-bottom: var(--spacingVerticalXXXL);
}

.vfk-demo__head-actions,
.vfk-demo__buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacingHorizontalS);
}

.vfk-demo__buttons + .vfk-demo__buttons,
.vfk-demo__checkbox-tree + .vfk-demo__buttons {
  margin-top: var(--spacingVerticalM);
}

.vfk-demo__checkbox-tree {
  display: flex;
  flex-direction: column;
}

.vfk-demo__checkbox-children {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacingHorizontalS);
  padding-left: var(--spacingHorizontalXXL);
}

.vfk-demo__title {
  margin: 0 0 var(--spacingVerticalS);
  font-size: var(--fontSizeBase500);
  font-weight: var(--fontWeightSemibold);
  line-height: var(--lineHeightBase500);
  color: var(--colorNeutralForeground1);
}

.vfk-demo__desc {
  margin: 0;
  color: var(--colorNeutralForeground3);
}

.vfk-demo__group {
  margin-bottom: var(--spacingVerticalXXL);
}

.vfk-demo__group-title {
  margin: 0 0 var(--spacingVerticalS);
  font-size: var(--fontSizeBase400);
  font-weight: var(--fontWeightSemibold);
  line-height: var(--lineHeightBase400);
  color: var(--colorNeutralForeground1);
}

.vfk-demo__list {
  display: grid;
  gap: var(--spacingVerticalS);
  margin: 0;
  padding: 0;
  list-style: none;
}

.vfk-demo__item {
  display: flex;
  align-items: center;
  gap: var(--spacingHorizontalS);
  padding: var(--spacingVerticalS) var(--spacingHorizontalS);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke2);
  border-radius: var(--borderRadiusMedium);
  background: var(--colorNeutralBackground2);
}

.vfk-demo__swatch {
  width: 20px;
  height: 20px;
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-radius: var(--borderRadiusSmall);
}

.vfk-demo__label {
  flex: 1;
}

.vfk-demo__token {
  font-family: var(--fontFamilyMonospace);
  font-size: var(--fontSizeBase200);
  color: var(--colorNeutralForeground3);
}
</style>
