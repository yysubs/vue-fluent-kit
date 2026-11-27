<script setup lang="ts">
import { ref } from 'vue'
import { VfkThemeProvider } from '../../index'
import { useDemoI18n } from '../i18n'
import DemoCode from './DemoCode.vue'

defineProps<{
  /** 生成的实时模板代码 */
  code: string
  /** 舞台标题 */
  stageTitle?: string
}>()

const { messages } = useDemoI18n()
const surfaceTheme = ref<'inherit' | 'light' | 'dark'>('inherit')
</script>

<template>
  <section class="demo-workbench" :aria-label="messages.common.liveCanvas">
    <div class="demo-workbench__body">
      <div class="demo-workbench__stage-wrap">
        <div class="demo-workbench__stage-bar">
          <span class="demo-workbench__stage-label">{{ stageTitle ?? messages.common.liveCanvas }}</span>
          <div class="demo-surface-pills" role="group" :aria-label="messages.shell.themeSwitchAriaLabel">
            <button
              type="button"
              class="demo-surface-pill"
              :class="{ 'demo-surface-pill--active': surfaceTheme === 'inherit' }"
              :aria-pressed="surfaceTheme === 'inherit'"
              @click="surfaceTheme = 'inherit'"
            >
              {{ messages.common.themeFollow }}
            </button>
            <button
              type="button"
              class="demo-surface-pill"
              :class="{ 'demo-surface-pill--active': surfaceTheme === 'light' }"
              :aria-pressed="surfaceTheme === 'light'"
              @click="surfaceTheme = 'light'"
            >
              {{ messages.common.themeLight }}
            </button>
            <button
              type="button"
              class="demo-surface-pill"
              :class="{ 'demo-surface-pill--active': surfaceTheme === 'dark' }"
              :aria-pressed="surfaceTheme === 'dark'"
              @click="surfaceTheme = 'dark'"
            >
              {{ messages.common.themeDark }}
            </button>
          </div>
        </div>

        <VfkThemeProvider
          :theme="surfaceTheme === 'inherit' ? undefined : surfaceTheme"
          class="demo-workbench__stage"
        >
          <slot name="stage" />
        </VfkThemeProvider>

        <div v-if="$slots.readout" class="demo-workbench__readout">
          <slot name="readout" />
        </div>
      </div>

      <div class="demo-workbench__controls">
        <h3 class="demo-workbench__controls-title">{{ messages.common.controlsPanel }}</h3>
        <slot name="controls" />
      </div>
    </div>

    <div class="demo-workbench__code">
      <DemoCode :code="code" :label="messages.common.liveCode" />
    </div>
  </section>
</template>
