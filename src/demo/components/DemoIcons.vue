<script setup lang="ts">
export type DemoIconName =
  | 'grid'
  | 'button'
  | 'toggle'
  | 'input'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'field'
  | 'tree'
  | 'tabs'
  | 'folder'
  | 'file'
  | 'palette'
  | 'sun'
  | 'moon'
  | 'search'
  | 'menu'
  | 'close'
  | 'code'
  | 'copy'
  | 'check'
  | 'arrow-right'
  | 'plus'
  | 'sparkle'
  | 'eye'
  | 'eye-off'
  | 'github'
  | 'monitor'
  | 'layers'

withDefaults(
  defineProps<{
    /** 图标名称 */
    name: DemoIconName
    /** 图标尺寸（px） */
    size?: number
  }>(),
  {
    size: 16,
  },
)
</script>

<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <template v-if="name === 'grid'">
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
    </template>
    <template v-else-if="name === 'button'">
      <rect x="2.5" y="5.5" width="15" height="9" rx="2.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M6.5 10h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'toggle'">
      <rect x="2.5" y="5.5" width="15" height="9" rx="4.5" stroke="currentColor" stroke-width="1.5" />
      <circle cx="13" cy="10" r="2.25" fill="currentColor" />
    </template>
    <template v-else-if="name === 'input'">
      <rect x="2.5" y="5" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.5" />
      <path d="M6.5 8v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'select'">
      <rect x="2.5" y="5" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.5" />
      <path d="M12.25 9.25 14 11l1.75-1.75" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5.5 10h4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'checkbox'">
      <rect x="3.5" y="3.5" width="13" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M6.75 10.25 9 12.5l4.25-4.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'switch'">
      <rect x="2.5" y="6" width="15" height="8" rx="4" stroke="currentColor" stroke-width="1.5" />
      <circle cx="13.5" cy="10" r="2.2" fill="currentColor" />
    </template>
    <template v-else-if="name === 'radio'">
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.5" />
      <circle cx="10" cy="10" r="3" fill="currentColor" />
    </template>
    <template v-else-if="name === 'field'">
      <path d="M3.5 4.75h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <rect x="3.5" y="7.5" width="13" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M3.5 16h9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'tree'">
      <path d="M4.5 4.5v11M4.5 7.5h4M4.5 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <rect x="8.5" y="5.5" width="7" height="4" rx="1.2" stroke="currentColor" stroke-width="1.4" />
      <rect x="8.5" y="11" width="7" height="4" rx="1.2" stroke="currentColor" stroke-width="1.4" />
    </template>
    <template v-else-if="name === 'tabs'">
      <rect x="2.75" y="4.5" width="14.5" height="11" rx="2" stroke="currentColor" stroke-width="1.5" />
      <path d="M2.75 9h14.5M8.5 4.5V9" stroke="currentColor" stroke-width="1.5" />
    </template>
    <template v-else-if="name === 'folder'">
      <path
        d="M3 6a1.75 1.75 0 0 1 1.75-1.75h3.1c.46 0 .9.19 1.22.52l.95.98h5.23A1.75 1.75 0 0 1 17 7.5v6.75A1.75 1.75 0 0 1 15.25 16H4.75A1.75 1.75 0 0 1 3 14.25V6Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </template>
    <template v-else-if="name === 'file'">
      <path
        d="M5.25 3.25h6.1l3.4 3.4v10.1a1.25 1.25 0 0 1-1.25 1.25H5.25A1.25 1.25 0 0 1 4 16.75V4.5a1.25 1.25 0 0 1 1.25-1.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path d="M11.25 3.5v3.25h3.25" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'palette'">
      <path
        d="M10 3a7 7 0 1 0 0 14h1.25a1.75 1.75 0 0 0 1.24-2.99 1.75 1.75 0 0 1 1.24-2.99H15a2 2 0 0 0 2-2A6.02 6.02 0 0 0 10 3Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <circle cx="7" cy="8.5" r="1" fill="currentColor" />
      <circle cx="10" cy="6.75" r="1" fill="currentColor" />
      <circle cx="13" cy="8.5" r="1" fill="currentColor" />
    </template>
    <template v-else-if="name === 'sun'">
      <circle cx="10" cy="10" r="3.25" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M10 2.75v1.5M10 15.75v1.5M2.75 10h1.5M15.75 10h1.5M4.87 4.87l1.06 1.06M14.07 14.07l1.06 1.06M15.13 4.87l-1.06 1.06M5.93 14.07l-1.06 1.06"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </template>
    <template v-else-if="name === 'moon'">
      <path
        d="M15.9 12.2a6.25 6.25 0 0 1-8.1-8.1 6.5 6.5 0 1 0 8.1 8.1Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </template>
    <template v-else-if="name === 'search'">
      <circle cx="8.75" cy="8.75" r="5" stroke="currentColor" stroke-width="1.5" />
      <path d="m12.5 12.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'menu'">
      <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'close'">
      <path d="m5.25 5.25 9.5 9.5M14.75 5.25l-9.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'code'">
      <path d="M7.25 6.25 3.5 10l3.75 3.75M12.75 6.25 16.5 10l-3.75 3.75M11 4.5l-2 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'copy'">
      <rect x="7" y="7" width="9" height="10" rx="1.5" stroke="currentColor" stroke-width="1.4" />
      <path d="M5 13H4.5A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h6A1.5 1.5 0 0 1 12 4.5V5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="M4.5 10.5 8.25 14.25 15.75 6.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'arrow-right'">
      <path d="M4.5 10h11M11.25 5.75 15.5 10l-4.25 4.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'plus'">
      <path d="M10 4.25v11.5M4.25 10h11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'sparkle'">
      <path
        d="M10 2.5 11.7 7.3 16.5 9l-4.8 1.7L10 15.5l-1.7-4.8L3.5 9l4.8-1.7L10 2.5Z"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </template>
    <template v-else-if="name === 'eye'">
      <path
        d="M2.5 10s2.75-4.5 7.5-4.5S17.5 10 17.5 10s-2.75 4.5-7.5 4.5S2.5 10 2.5 10Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <circle cx="10" cy="10" r="2.25" stroke="currentColor" stroke-width="1.5" />
    </template>
    <template v-else-if="name === 'eye-off'">
      <path d="m3.5 3.5 13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path
        d="M8.3 5.7A8.1 8.1 0 0 1 10 5.5c4.75 0 7.5 4.5 7.5 4.5a13.4 13.4 0 0 1-2.55 2.95M12.35 14.1A7.4 7.4 0 0 1 10 14.5C5.25 14.5 2.5 10 2.5 10a13.7 13.7 0 0 1 3.1-3.4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>
    <template v-else-if="name === 'github'">
      <path
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 2.25a7.75 7.75 0 0 0-2.45 15.1c.39.07.53-.17.53-.37v-1.32c-2.15.47-2.6-1.03-2.6-1.03-.35-.9-.86-1.14-.86-1.14-.7-.48.05-.47.05-.47.78.06 1.19.8 1.19.8.69 1.18 1.81.84 2.25.64.07-.5.27-.84.49-1.03-1.72-.2-3.52-.86-3.52-3.82 0-.84.3-1.53.8-2.07-.08-.2-.35-.98.08-2.04 0 0 .65-.21 2.13.79a7.4 7.4 0 0 1 3.88 0c1.48-1 2.13-.79 2.13-.79.43 1.06.16 1.84.08 2.04.5.54.8 1.23.8 2.07 0 2.97-1.81 3.62-3.53 3.81.28.24.53.71.53 1.44v2.13c0 .21.14.45.54.37A7.75 7.75 0 0 0 10 2.25Z"
      />
    </template>
    <template v-else-if="name === 'monitor'">
      <rect x="2.75" y="3.75" width="14.5" height="9.75" rx="1.75" stroke="currentColor" stroke-width="1.5" />
      <path d="M7.25 16.5h5.5M10 13.5v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'layers'">
      <path
        d="M10 3.25 2.75 7 10 10.75 17.25 7 10 3.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M2.75 10.25 10 14l7.25-3.75M2.75 13.5 10 17.25l7.25-3.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>
  </svg>
</template>
