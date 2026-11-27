<script setup lang="ts">
import { ref } from 'vue'
import DemoCode from './DemoCode.vue'

withDefaults(
  defineProps<{
    /** 卡片标题 */
    title: string
    /** 卡片说明 */
    description?: string
    /** 示例源码，传入后在画布底栏显示 Show code 开关 */
    code?: string
    /** 是否横跨整行 */
    full?: boolean
    /** 是否使用次级底色衬托控件（适合展示 filled-lighter / outline 对比） */
    tinted?: boolean
  }>(),
  {
    full: false,
    tinted: false,
  },
)

const showCode = ref(false)
</script>

<template>
  <article class="demo-card" :class="{ 'demo-card--full': full }">
    <header class="demo-card__head">
      <div>
        <h3 class="demo-card__title">{{ title }}</h3>
        <p v-if="description" class="demo-card__desc">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="demo-card__actions">
        <slot name="actions" />
      </div>
    </header>

    <div class="demo-card__canvas">
      <div class="demo-card__preview" :class="{ 'demo-card__preview--tinted': tinted }">
        <slot />
      </div>

      <div v-if="$slots.footer || code" class="demo-card__bar">
        <div class="demo-card__footer-text">
          <slot name="footer" />
        </div>
        <button
          v-if="code"
          type="button"
          class="demo-card__code-toggle"
          :aria-expanded="showCode"
          @click="showCode = !showCode"
        >
          {{ showCode ? 'Hide code' : 'Show code' }}
        </button>
      </div>

      <div v-if="code && showCode" class="demo-card__code">
        <DemoCode :code="code" />
      </div>
    </div>
  </article>
</template>
