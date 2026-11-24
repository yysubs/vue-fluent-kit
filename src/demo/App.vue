<script setup lang="ts">
import { ref } from 'vue'
import '../styles/index.css'

const theme = ref<'light' | 'dark'>('light')

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
        <p class="vfk-demo__desc">token 默认值预览，组件还没开始。</p>
      </div>
      <button
        type="button"
        class="vfk-demo__toggle"
        @click="theme = theme === 'light' ? 'dark' : 'light'"
      >
        切换为{{ theme === 'light' ? '深色' : '浅色' }}
      </button>
    </header>

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

.vfk-demo__toggle {
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-radius: var(--borderRadiusMedium);
  background: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
  font: inherit;
  cursor: pointer;
  transition: background var(--durationFaster) var(--curveEasyEase);
}

.vfk-demo__toggle:hover {
  background: var(--colorNeutralBackground1Hover);
}

.vfk-demo__toggle:active {
  background: var(--colorNeutralBackground1Pressed);
}

.vfk-demo__toggle:focus-visible {
  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);
  outline-offset: 2px;
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

@media (prefers-reduced-motion: reduce) {
  .vfk-demo__toggle {
    transition-duration: 0.01ms;
  }
}
</style>
