# VfkTooltip（文字提示）

参照 Fluent 2 文字提示规范，薄封装 `@fluentui/web-components` 的 `<fluent-tooltip>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-tooltip>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/tooltip`

## Vue 接口

### `VfkTooltip`

- **Props**：
  - `text?: string`（提示文字，未传 `#content` 插槽时生效）
  - `anchor?: string`（触发元素的 `id`；不传时组件会自动为默认插槽里的第一个元素生成并注入 `id`）
  - `positioning?: 'above' | 'above-start' | 'above-end' | 'below' | 'below-start' | 'below-end' | 'before' | 'before-top' | 'before-bottom' | 'after' | 'after-top' | 'after-bottom'`（默认 `'above'`）
  - `delay?: number`（悬停显示延迟，单位毫秒；聚焦时立即显示。默认 `250`）
- **Slots**：
  - `default`：触发元素（按钮、图标等），会被自动注入 `id` 作为锚点
  - `content`：富文本提示内容（优先于 `text`）
- **Expose**：`{ el, anchorId }`
- **说明**：提示通过原生 Popover 与 CSS Anchor Positioning 定位，同一页面可放多个；组件卸载时会自动移除锚点上的 `aria-describedby` 与事件监听。

## 可访问性与手动验证

- **可访问性**：保留官方 ARIA Tooltip 模式——锚点自动获得 `aria-describedby`，提示元素带 `role="tooltip"` 与 `aria-hidden` 切换；悬停与键盘聚焦均会触发，`Escape` 不拦截焦点。
- **手动验证**：预览页覆盖四个方向（`above` / `below` / `before` / `after`）与对齐变体、纯文字与富文本内容、自定义 `anchor` 与自动注入、`delay` 差异，以及浅色/深色主题与品牌色切换。
