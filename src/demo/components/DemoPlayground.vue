<script setup lang="ts">
import { ref } from 'vue'
import DemoCode from './DemoCode.vue'

defineProps<{
  /** 生成的实时模板代码 */
  code: string
  /** 舞台标题 */
  stageTitle?: string
}>()

const surfaceTheme = ref<'inherit' | 'light' | 'dark'>('inherit')
</script>

<template>
  <section class="demo-workbench" aria-label="交互调试台">
    <div class="demo-workbench__body">
      <div class="demo-workbench__stage-wrap">
        <div class="demo-workbench__stage-bar">
          <span class="demo-workbench__stage-label">{{ stageTitle ?? '实时画布' }}</span>
          <div class="demo-surface-pills" role="group" aria-label="画布主题">
            <button
              type="button"
              class="demo-surface-pill"
              :class="{ 'demo-surface-pill--active': surfaceTheme === 'inherit' }"
              :aria-pressed="surfaceTheme === 'inherit'"
              @click="surfaceTheme = 'inherit'"
            >
              跟随
            </button>
            <button
              type="button"
              class="demo-surface-pill"
              :class="{ 'demo-surface-pill--active': surfaceTheme === 'light' }"
              :aria-pressed="surfaceTheme === 'light'"
              @click="surfaceTheme = 'light'"
            >
              浅色
            </button>
            <button
              type="button"
              class="demo-surface-pill"
              :class="{ 'demo-surface-pill--active': surfaceTheme === 'dark' }"
              :aria-pressed="surfaceTheme === 'dark'"
              @click="surfaceTheme = 'dark'"
            >
              深色
            </button>
          </div>
        </div>

        <div
          class="demo-workbench__stage"
          :data-vfk-theme="surfaceTheme === 'inherit' ? undefined : surfaceTheme"
        >
          <slot name="stage" />
        </div>

        <div v-if="$slots.readout" class="demo-workbench__readout">
          <slot name="readout" />
        </div>
      </div>

      <div class="demo-workbench__controls">
        <h3 class="demo-workbench__controls-title">属性面板</h3>
        <slot name="controls" />
      </div>
    </div>

    <div class="demo-workbench__code">
      <DemoCode :code="code" label="实时代码" />
    </div>
  </section>
</template>
