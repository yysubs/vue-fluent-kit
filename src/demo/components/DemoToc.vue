<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

export interface TocItem {
  /** 目标锚点元素 id */
  id: string
  /** 目录展示文本 */
  label: string
}

const props = defineProps<{
  /** 当前页面目录项 */
  items: TocItem[]
}>()

const activeId = ref(props.items[0]?.id ?? '')
let observer: IntersectionObserver | null = null

function setupObserver() {
  observer?.disconnect()
  if (typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]?.target.id) {
        activeId.value = visible[0].target.id
      }
    },
    {
      rootMargin: '-64px 0px -65% 0px',
      threshold: 0,
    },
  )

  for (const item of props.items) {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  }
}

function scrollToSection(id: string) {
  activeId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

watch(
  () => props.items,
  (next) => {
    activeId.value = next[0]?.id ?? ''
    setupObserver()
  },
)

onMounted(setupObserver)
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <aside v-if="items.length" class="demo-toc" aria-label="本页目录">
    <div class="demo-toc__heading">On this page</div>
    <ol class="demo-toc__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="demo-toc__item"
        :class="{ 'demo-toc__item--active': activeId === item.id }"
      >
        <button type="button" class="demo-toc__link" @click="scrollToSection(item.id)">
          {{ item.label }}
        </button>
      </li>
    </ol>
  </aside>
</template>
