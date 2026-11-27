<script setup lang="ts">
import { useId } from 'vue'

withDefaults(
  defineProps<{
    /** 图标尺寸（px） */
    size?: number
  }>(),
  {
    size: 28,
  },
)

const clipId = `vfk-logo-clip-${useId()}`
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <clipPath :id="clipId">
        <path
          d="M15.1 2.72C15.66 2.4 16.34 2.4 16.9 2.72L24.1 6.88C24.9 7.34 24.9 8.5 24.1 8.96L17.6 12.71L24.1 16.46C24.9 16.92 24.9 18.08 24.1 18.54L16.5 22.93V28.72C16.5 29.64 15.5 30.22 14.7 29.76L7.9 25.83C7.34 25.51 7 24.92 7 24.27V8.44C7 7.79 7.34 7.2 7.9 6.88L15.1 2.72Z"
        />
      </clipPath>
    </defs>
    <g :clip-path="`url(#${clipId})`">
      <polygon points="6,17.0 16.5,22.93 16.5,31 6,25.5" fill="#21704C" />
      <polygon points="6,7.4 16.5,13.1 26,17.5 16.5,22.93 6,17.0" fill="#319B6B" />
      <polygon points="16,1.5 26,7.92 16,13.6 6,7.4" fill="#42B883" />
      <polyline
        points="7,7.95 16,13.15 24.5,8.25"
        stroke="#6CE0AA"
        stroke-opacity="0.45"
        stroke-width="0.6"
        fill="none"
      />
    </g>
  </svg>
</template>
