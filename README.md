# @yysubs/vue-fluent-kit

基于官方 `@fluentui/web-components`（Fluent 2 规范）的 Vue 3 轻量二次封装组件库。采用薄封装策略，保留官方原生交互与无障碍实现，聚焦 Vue `v-model` 双向绑定、TypeScript 类型提示、默认属性统一与独立 Design Tokens 主题层。

- 在线预览：<https://vfk.yysubs.com>
- 控件规格：[CONTROLS.md](CONTROLS.md)
- 变量契约：[TOKENS.md](TOKENS.md)

## 安装与接入

要求 Vue `^3.5.0`。

```bash
pnpm add @yysubs/vue-fluent-kit
```

### 1. 配置 Vite 识别 Fluent 自定义元素

在业务项目的 `vite.config.ts` 中使用 `isFluentCustomElement`，避免 Vue 编译器将 `<fluent-*>` 标签当作未注册组件发出警告：

```ts
import vue from '@vitejs/plugin-vue'
import { isFluentCustomElement } from '@yysubs/vue-fluent-kit/custom-elements'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: isFluentCustomElement,
        },
      },
    }),
  ],
})
```

### 2. 引入全局 Design Tokens 样式

在应用入口（如 `src/main.ts`）引入合并后的主题与材质样式：

```ts
import '@yysubs/vue-fluent-kit/style.css'
```

### 3. 使用组件（支持根入口与子路径按需导入）

```vue
<script setup lang="ts">
import { ref } from 'vue'
// 根入口导入
import { VfkButton, VfkCheckbox, VfkInput } from '@yysubs/vue-fluent-kit'
// 也可按需从子路径导入，仅注册用到的自定义元素：
// import { VfkButton } from '@yysubs/vue-fluent-kit/button'
// import { VfkInput } from '@yysubs/vue-fluent-kit/input'
// import { VfkCheckbox } from '@yysubs/vue-fluent-kit/checkbox'

const keyword = ref('')
const agreed = ref(false)
</script>

<template>
  <VfkInput v-model="keyword" placeholder="输入关键词" />
  <VfkCheckbox v-model="agreed" label="同意条款" />
  <VfkButton appearance="primary" :disabled="!agreed">提交</VfkButton>
</template>
```

### 4. 主题、品牌色与材质表面

```vue
<script setup lang="ts">
import { VfkThemeProvider, useTheme } from '@yysubs/vue-fluent-kit/theme'

const { mode, resolvedTheme, setTheme, applyBrandTokens, resetBrandTokens } = useTheme()

// 切换全局明暗模式：'light' | 'dark' | 'system'
setTheme('system')

// 按需应用自定义 16 级品牌色（BrandVariants），恢复默认可调用 resetBrandTokens()
// applyBrandTokens(myBrandVariants)
</script>

<template>
  <!-- 局部反色与 Mica/Acrylic 材质 -->
  <VfkThemeProvider theme="dark" class="vfk-surface-mica">
    <div class="vfk-surface-acrylic">局部深色亚克力区域</div>
  </VfkThemeProvider>
</template>
```

## 导出入口

| 导出路径 | 说明 |
| --- | --- |
| `@yysubs/vue-fluent-kit` | 根入口，汇总版本、主题控制、`isFluentCustomElement` 与已封装组件 |
| `@yysubs/vue-fluent-kit/style.css` | 合并后的 Design Tokens、品牌入口、Acrylic/Mica 材质与轻量组件样式 |
| `@yysubs/vue-fluent-kit/theme` | `useTheme`、`setVfkTheme`、`applyBrandTokens`、`resetBrandTokens`、`VfkThemeProvider` |
| `@yysubs/vue-fluent-kit/custom-elements` | `isFluentCustomElement`（供 Vite `compilerOptions.isCustomElement` 使用） |
| `@yysubs/vue-fluent-kit/button` | `VfkButton` 及相关类型 |
| `@yysubs/vue-fluent-kit/checkbox` | `VfkCheckbox` 及相关类型 |
| `@yysubs/vue-fluent-kit/field` | `VfkField` 及相关类型 |
| `@yysubs/vue-fluent-kit/input` | `VfkInput` 及相关类型 |
| `@yysubs/vue-fluent-kit/menu` | `VfkMenu`、`VfkMenuList`、`VfkMenuItem`、`VfkMenuButton`、`VfkMenuDivider` 及相关类型 |
| `@yysubs/vue-fluent-kit/radio` | `VfkRadioGroup`、`VfkRadio` 及相关类型 |
| `@yysubs/vue-fluent-kit/select` | `VfkSelect`、`VfkOption` 及相关类型 |
| `@yysubs/vue-fluent-kit/switch` | `VfkSwitch` 及相关类型 |
| `@yysubs/vue-fluent-kit/tabs` | `VfkTabList`、`VfkTab` 及相关类型 |
| `@yysubs/vue-fluent-kit/toggle-button` | `VfkToggleButton` 及相关类型 |
| `@yysubs/vue-fluent-kit/tree` | `VfkTree`、`VfkTreeItem` 及相关类型 |

## 本地开发

```bash
pnpm install
pnpm dev        # 启动 src/demo 本地预览
pnpm build      # 类型检查 -> 库构建 -> 生成 .d.ts -> 合并输出 dist/style.css
pnpm build:demo # 构建 demo 静态预览产物到 dist-demo
pnpm test       # 单元测试
```

## 目录结构

- `src/components/`：按需薄封装的 Fluent 2 Vue 组件（每组件独立目录，支持子路径导出）
- `src/theme/`：全局明暗主题切换（`useTheme` / `setVfkTheme`）、动态品牌色覆写（`applyBrandTokens` / `resetBrandTokens`）与局部主题容器（`VfkThemeProvider`）
- `src/styles/`：独立 Design Tokens 样式层
  - `tokens.css`：由 `@fluentui/tokens` 生成的 Fluent 2 浅色/深色语义变量
  - `brand.css`：品牌色、圆角与字体覆写入口
  - `surfaces.css`：Acrylic（亚克力）与 Mica（云母）材质变量与工具类
  - `components.css`：薄封装组件的外层轻量布局样式
- `src/custom-elements.ts`：导出 `isFluentCustomElement`，用于 Vite `compilerOptions.isCustomElement`
- `src/demo/`：开发与在线预览页面，不进入库构建

## 主题与样式覆盖规范

- `useTheme()` 默认跟随系统（`system`），纯样式引入时 `:root` 为浅色；支持在根节点或 `<VfkThemeProvider>` 上通过 `data-vfk-theme="light" | "dark"` 切换主题。
- Shadow DOM 样式覆盖优先使用官方 Design Tokens（CSS 变量），其次使用官方公开的 `::part()`，避免强行穿透内部私有结构。

## 预览与部署

预览站点由 Cloudflare Workers 构建 `pnpm build:demo` 生成的 `dist-demo/` 产物部署，配置位于 `wrangler.jsonc` 和 `vite.demo.config.ts`。

- 生产预览：`https://vfk.yysubs.com`（对应 `master` 分支）。
- 非 `master` 分支由 Cloudflare Workers 自动构建并生成分支预览，`wrangler.jsonc` 保留 `"previews": {}` 配置块。

## 许可

MIT
