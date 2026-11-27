/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('fluent-'),
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        theme: fileURLToPath(new URL('./src/theme/index.ts', import.meta.url)),
        'custom-elements': fileURLToPath(new URL('./src/custom-elements.ts', import.meta.url)),
        button: fileURLToPath(new URL('./src/components/button/index.ts', import.meta.url)),
        'toggle-button': fileURLToPath(new URL('./src/components/toggle-button/index.ts', import.meta.url)),
        input: fileURLToPath(new URL('./src/components/input/index.ts', import.meta.url)),
        select: fileURLToPath(new URL('./src/components/select/index.ts', import.meta.url)),
        checkbox: fileURLToPath(new URL('./src/components/checkbox/index.ts', import.meta.url)),
        switch: fileURLToPath(new URL('./src/components/switch/index.ts', import.meta.url)),
        radio: fileURLToPath(new URL('./src/components/radio/index.ts', import.meta.url)),
        field: fileURLToPath(new URL('./src/components/field/index.ts', import.meta.url)),
      },
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue', '@fluentui/tokens', /^@fluentui\/web-components(\/.*)?$/],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    passWithNoTests: true,
  },
})
