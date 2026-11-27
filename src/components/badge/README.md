# VfkBadge（徽标）

参照 Fluent 2 徽标规范，薄封装 `@fluentui/web-components` 的 `<fluent-badge>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-badge>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/badge`

## Vue 接口

### `VfkBadge`

- **Props**：
  - `appearance?: 'filled' | 'tint' | 'outline' | 'ghost'`（默认 `'filled'`）
  - `color?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning'`（默认 `'brand'`）
  - `size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'`（默认 `'medium'`，`tiny` / `extra-small` 为纯圆点）
  - `shape?: 'circular' | 'rounded' | 'square'`（默认 `'circular'`）
- **Slots**：
  - `default`：徽标文字
  - `start`：前置图标
  - `end`：后置内容
- **Expose**：`{ el }`

## 可访问性与手动验证

- **可访问性**：徽标自身不带 `role`，是纯展示元素；当徽标承载"未读数量"等需要播报的信息时，应配合外层文案（如 `aria-label="3 条未读"`）或使用 `visually-hidden` 说明，不要只依赖颜色区分状态。
- **手动验证**：预览页覆盖四种 `appearance` × 八种 `color`、六档 `size`、三种 `shape`、`start`/`end` 图标插槽，以及浅色/深色主题与品牌色切换。
