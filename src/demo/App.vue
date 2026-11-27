<script setup lang="ts">
import { ref } from 'vue'
import { VButton, VInput, VToggleButton } from '../index'
import '../styles/index.css'

const theme = ref<'light' | 'dark'>('light')
const pressed = ref(false)
const inputValue = ref('Fluent UI v9')
const searchValue = ref('vue-fluent-kit')
const searchInputRef = ref<InstanceType<typeof VInput> | null>(null)

function clearSearch() {
  searchValue.value = ''
  searchInputRef.value?.focus()
}

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
        <p class="vfk-demo__desc">Button、Input 与主题 token 预览。</p>
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
      <h2 class="vfk-demo__group-title">Input 文本输入</h2>

      <div class="vfk-demo__surface">
        <div class="vfk-demo__inputs">
          <VInput placeholder="Outline（默认）" aria-label="Outline 外观" />
          <VInput appearance="underline" placeholder="Underline" aria-label="Underline 外观" />
          <VInput
            appearance="filled-darker"
            placeholder="Filled darker"
            aria-label="Filled darker 外观"
          />
          <VInput
            appearance="filled-lighter"
            placeholder="Filled lighter"
            aria-label="Filled lighter 外观"
          />
        </div>
      </div>

      <div class="vfk-demo__inputs">
        <VInput size="small" placeholder="Small (24px)" aria-label="Small 尺寸" />
        <VInput size="medium" placeholder="Medium (32px)" aria-label="Medium 尺寸" />
        <VInput size="large" placeholder="Large (40px)" aria-label="Large 尺寸" />
      </div>

      <div class="vfk-demo__inputs">
        <VInput
          ref="searchInputRef"
          v-model="searchValue"
          placeholder="带前置图标与清空按钮"
          aria-label="搜索关键字"
        >
          <template #contentBefore>
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                d="M8.5 3a5.5 5.5 0 0 1 4.23 9.02l4.12 4.13a.5.5 0 0 1-.63.76l-.07-.06-4.13-4.12A5.5 5.5 0 1 1 8.5 3Zm0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
              />
            </svg>
          </template>
          <template v-if="searchValue" #contentAfter>
            <VButton
              appearance="transparent"
              size="small"
              aria-label="清空输入"
              @click="clearSearch"
            >
              <template #icon><span aria-hidden="true">✕</span></template>
            </VButton>
          </template>
        </VInput>

        <VInput type="number" placeholder="0.00" aria-label="金额">
          <template #contentBefore><span>¥</span></template>
          <template #contentAfter><span>CNY</span></template>
        </VInput>
      </div>

      <div class="vfk-demo__inputs">
        <VInput aria-invalid="true" model-value="invalid-email@" aria-label="校验错误" />
        <VInput
          appearance="underline"
          aria-invalid="true"
          model-value="underline invalid"
          aria-label="下划线校验错误"
        />
        <VInput readonly model-value="只读文本" aria-label="只读输入" />
        <VInput disabled model-value="禁用状态" aria-label="禁用输入">
          <template #contentBefore><span>#</span></template>
        </VInput>
      </div>

      <div class="vfk-demo__binding">
        <VInput
          v-model="inputValue"
          placeholder="输入文字查看实时绑定"
          aria-label="受控双向绑定输入"
        />
        <VButton size="small" appearance="subtle" @click="inputValue = 'Fluent UI v9'">
          重置
        </VButton>
        <span class="vfk-demo__binding-output">
          当前值：<code class="vfk-demo__token">{{ inputValue || '（空）' }}</code>
        </span>
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

.vfk-demo__buttons + .vfk-demo__buttons {
  margin-top: var(--spacingVerticalM);
}

.vfk-demo__surface {
  padding: var(--spacingVerticalM);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke2);
  border-radius: var(--borderRadiusMedium);
  background: var(--colorNeutralBackground2);
}

.vfk-demo__inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: center;
  gap: var(--spacingVerticalS) var(--spacingHorizontalM);
}

.vfk-demo__surface + .vfk-demo__inputs,
.vfk-demo__inputs + .vfk-demo__inputs,
.vfk-demo__inputs + .vfk-demo__binding {
  margin-top: var(--spacingVerticalM);
}

.vfk-demo__binding {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacingHorizontalS);
}

.vfk-demo__binding-output {
  color: var(--colorNeutralForeground2);
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
