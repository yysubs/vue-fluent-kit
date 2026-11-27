/// <reference types="vitest/config" />
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  version: string
}

export default defineConfig({
  define: {
    __VFK_VERSION__: JSON.stringify(pkg.version),
  },
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
        badge: fileURLToPath(new URL('./src/components/badge/index.ts', import.meta.url)),
        button: fileURLToPath(new URL('./src/components/button/index.ts', import.meta.url)),
        checkbox: fileURLToPath(new URL('./src/components/checkbox/index.ts', import.meta.url)),
        combobox: fileURLToPath(new URL('./src/components/combobox/index.ts', import.meta.url)),
        dialog: fileURLToPath(new URL('./src/components/dialog/index.ts', import.meta.url)),
        drawer: fileURLToPath(new URL('./src/components/drawer/index.ts', import.meta.url)),
        field: fileURLToPath(new URL('./src/components/field/index.ts', import.meta.url)),
        input: fileURLToPath(new URL('./src/components/input/index.ts', import.meta.url)),
        menu: fileURLToPath(new URL('./src/components/menu/index.ts', import.meta.url)),
        radio: fileURLToPath(new URL('./src/components/radio/index.ts', import.meta.url)),
        'search-box': fileURLToPath(new URL('./src/components/search-box/index.ts', import.meta.url)),
        select: fileURLToPath(new URL('./src/components/select/index.ts', import.meta.url)),
        'swatch-picker': fileURLToPath(new URL('./src/components/swatch-picker/index.ts', import.meta.url)),
        switch: fileURLToPath(new URL('./src/components/switch/index.ts', import.meta.url)),
        tabs: fileURLToPath(new URL('./src/components/tabs/index.ts', import.meta.url)),
        textarea: fileURLToPath(new URL('./src/components/textarea/index.ts', import.meta.url)),
        'toggle-button': fileURLToPath(new URL('./src/components/toggle-button/index.ts', import.meta.url)),
        tooltip: fileURLToPath(new URL('./src/components/tooltip/index.ts', import.meta.url)),
        tree: fileURLToPath(new URL('./src/components/tree/index.ts', import.meta.url)),
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
