<script setup lang="ts">
import { ref } from 'vue'
import DemoCode from './DemoCode.vue'
import DemoIcons from './DemoIcons.vue'

withDefaults(
  defineProps<{
    /** 卡片标题 */
    title: string
    /** 卡片说明 */
    description?: string
    /** 示例源码，传入后显示「代码」展开按钮 */
    code?: string
    /** 是否横跨整行 */
    full?: boolean
    /** 是否使用次级底色衬托控件 */
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
      <div v-if="code || $slots.actions" class="demo-card__actions">
        <slot name="actions" />
        <button
          v-if="code"
          type="button"
          class="demo-btn demo-btn--subtle demo-btn--small"
          :aria-expanded="showCode"
          @click="showCode = !showCode"
        >
          <DemoIcons name="code" :size="14" />
          <span>{{ showCode ? '收起' : '代码' }}</span>
        </button>
      </div>
    </header>

    <div class="demo-card__preview" :class="{ 'demo-card__preview--tinted': tinted }">
      <slot />
    </div>

    <div v-if="$slots.footer" class="demo-card__footer">
      <slot name="footer" />
    </div>

    <div v-if="code && showCode" class="demo-card__code">
      <DemoCode :code="code" />
    </div>
  </article>
</template>
