# @yysubs/vue-fluent-kit

基于官方 `@fluentui/web-components`（Fluent 2 规范）的 Vue 3 轻量二次封装组件库。采用薄封装策略，保留官方原生交互与无障碍实现，聚焦 Vue `v-model` 双向绑定、TypeScript 类型提示、默认属性统一与独立 Design Tokens 主题层。

## 开发

```bash
pnpm install
pnpm dev        # 启动 src/demo 本地预览
pnpm build      # 类型检查 -> 库构建 -> 生成 .d.ts -> 合并输出 dist/style.css
pnpm build:demo # 构建 demo 静态预览产物到 dist-demo
pnpm test       # 单元测试
```

## 目录结构

- `src/components/`：按需薄封装的 Fluent 2 Vue 组件（每组件独立目录，支持子路径导出）
- `src/theme/`：全局明暗主题切换（`useTheme` / `setVfkTheme`）、动态品牌色覆写（`applyBrandTokens` / `resetBrandTokens`）与局部主题容器（`VfThemeProvider`）
- `src/styles/`：独立 Design Tokens 样式层
  - `tokens.css`：由 `@fluentui/tokens` 生成的 Fluent 2 浅色/深色语义变量
  - `brand.css`：品牌色、圆角与字体覆写入口
  - `surfaces.css`：Acrylic（亚克力）与 Mica（云母）材质变量与工具类
- `src/custom-elements.ts`：导出 `isFluentCustomElement`，用于 Vite `compilerOptions.isCustomElement`
- `src/demo/`：开发与在线预览页面，不进入库构建

## 主题与样式覆盖规范

- 默认浅色，支持在根节点或 `<VfThemeProvider>` 上通过 `data-vfk-theme="light" | "dark"` 切换主题，也支持 `system` 跟随系统。
- Shadow DOM 样式覆盖优先使用官方 Design Tokens（CSS 变量），其次使用官方公开的 `::part()`，避免强行穿透内部私有结构。

## 预览与部署

预览站点由 Cloudflare Workers 构建 `pnpm build:demo` 生成的 `dist-demo/` 产物部署，配置位于 `wrangler.jsonc` 和 `vite.demo.config.ts`。

- 非 `master` 分支使用 `npx wrangler preview` 生成分支预览，`wrangler.jsonc` 保留 `"previews": {}` 配置块。

## 许可

MIT
