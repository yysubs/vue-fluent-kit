<script setup lang="ts">
import '../styles/index.css'

const groups = [
  {
    name: '基础',
    tokens: [
      ['--vfk-bg', '页面底色'],
      ['--vfk-bg-soft', '次级底色'],
      ['--vfk-surface', '面板'],
      ['--vfk-surface-2', '次级面板'],
    ],
  },
  {
    name: '文字',
    tokens: [
      ['--vfk-text-strong', '强调文字'],
      ['--vfk-text', '正文'],
      ['--vfk-text-muted', '次要文字'],
    ],
  },
  {
    name: '语义',
    tokens: [
      ['--vfk-accent', '强调色'],
      ['--vfk-success', '成功'],
      ['--vfk-danger', '危险'],
      ['--vfk-info', '信息'],
      ['--vfk-special', '特殊'],
    ],
  },
]
</script>

<template>
  <main class="demo">
    <header class="demo__head">
      <h1>vue-fluent-kit</h1>
      <p>token 默认值预览，组件还没开始。</p>
    </header>

    <section v-for="group in groups" :key="group.name" class="demo__group">
      <h2>{{ group.name }}</h2>
      <ul class="demo__list">
        <li v-for="[token, label] in group.tokens" :key="token">
          <span class="demo__swatch" :style="{ background: `var(${token})` }" />
          <span class="demo__label">{{ label }}</span>
          <code>{{ token }}</code>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.demo {
  box-sizing: border-box;
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--vfk-text);
  font-family: var(--vfk-font);
  font-size: var(--vfk-font-size);
  line-height: var(--vfk-line-height);
  background: var(--vfk-bg);
  min-height: 100vh;
}

.demo__head h1 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: var(--vfk-text-strong);
}

.demo__head p {
  margin: 0 0 32px;
  color: var(--vfk-text-muted);
}

.demo__group h2 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vfk-text-strong);
}

.demo__list {
  display: grid;
  gap: 8px;
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
}

.demo__list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--vfk-border);
  border-radius: 8px;
  background: var(--vfk-surface);
}

.demo__swatch {
  width: 20px;
  height: 20px;
  border: 1px solid var(--vfk-border-strong);
  border-radius: 5px;
}

.demo__label {
  flex: 1;
}

.demo__list code {
  font-size: 11px;
  color: var(--vfk-text-muted);
}
</style>
