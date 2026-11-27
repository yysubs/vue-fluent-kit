# @yysubs/vue-fluent-kit

基于 token 的 Vue 3 组件库，样式用纯 CSS，组件类名统一 `vfk-` 前缀。开发中，还没发布。

## 开发

```bash
pnpm install
pnpm dev        # 本地预览 src/demo（也可用 npm run dev）
pnpm build      # 构建 dist
pnpm build:demo # 构建 demo 静态预览产物到 dist-demo
pnpm test       # 单元测试
```

## 结构

- `src/components/`：组件
- `src/styles/index.css`：token 默认值，变量名与 Fluent UI v9 官方 token 一致（无前缀），由 `@fluentui/tokens` 的 `webLightTheme` / `webDarkTheme` 生成
- `src/demo/`：开发预览，不进构建

## 主题

默认浅色，在根节点或局部容器上设置 `data-vfk-theme="dark"` 切换深色，`data-vfk-theme="light"` 可在深色区域内切回浅色。

## 预览与部署

预览站点由 Cloudflare Workers 构建 `pnpm build:demo` 生成的 `dist-demo/` 产物部署，配置位于 `wrangler.jsonc` 和 `vite.demo.config.ts`。

- 非 `master` 分支使用 `npx wrangler preview` 生成分支预览，要求 `wrangler.jsonc` 必须保留 `"previews": {}` 配置块（可为空对象，但不能省略，否则预览部署会报错失败）；`assets`、`compatibility_date` 等项留在顶层即可。

## 许可

MIT
