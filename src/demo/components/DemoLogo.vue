<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Logo 外框尺寸（px） */
    size?: number
  }>(),
  {
    size: 28,
  },
)
</script>

<template>
  <span
    class="demo-logo"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-hidden="true"
  >
    <svg
      :width="Math.round(size * 0.58)"
      :height="Math.round(size * 0.58)"
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect x="2" y="2" width="5.5" height="5.5" rx="1.2" fill="currentColor" />
      <rect x="8.5" y="2" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.65" />
      <rect x="2" y="8.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.65" />
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.35" />
    </svg>
  </span>
</template>
