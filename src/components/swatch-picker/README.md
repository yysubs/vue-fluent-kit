# VfkSwatchPicker / VfkColorSwatch（色板单选）

参照 Fluent 2 SwatchPicker 规范（`@fluentui/react-swatch-picker`）实现的色板单选组件，样式全部基于库内 Fluent 2 Design Tokens。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **实现方式**：`@fluentui/web-components` v3 未提供色板元素，使用 Light DOM 语义结构（`role="radiogroup"` / `button[role="radio"]`）与 roving tabindex 实现
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/swatch-picker`

## 尺寸、形状与布局

- **尺寸（`size`）**：`extra-small`（`20×20px`）、`small`（`24×24px`）、`medium`（默认，`28×28px`）、`large`（`32×32px`）。
- **形状（`shape`）**：`square`（默认，`borderRadiusNone`）、`rounded`（`borderRadiusMedium`）、`circular`（`borderRadiusCircular`）。
- **布局（`layout` / `columnCount` / `spacing`）**：支持 `row`（单行自动换行）与 `grid`（按 `columnCount` 固定列数）；间距支持 `small`（`2px`）与 `medium`（默认，`4px`）。
- **选中与禁用态**：选中色块使用双层内阴影（外层 `colorBrandStroke1`，内层 `colorStrokeFocus1`；小尺寸缩减描边宽度），保证在深浅色块上都清晰可辨；浅色色块可传 `borderColor` 叠加 `1px` 内描边；禁用色块叠加对角斜线且不可选中。

## Vue 接口

### `VfkSwatchPicker`

- **Props**：
  - `modelValue?: string`（受控选中值，用于 `v-model` 双向绑定）
  - `size?: 'extra-small' | 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `shape?: 'square' | 'rounded' | 'circular'`（默认 `'square'`）
  - `layout?: 'row' | 'grid'`（默认 `'row'`）
  - `columnCount?: number`（默认 `3`，仅 `layout="grid"` 时生效）
  - `spacing?: 'small' | 'medium'`（默认 `'medium'`）
  - `disabled?: boolean`（默认 `false`）
- **Emits**：
  - `update:modelValue: [value: string]`
  - `change: [value: string, event: Event]`
- **Slots**：
  - `default`：放置 `VfkColorSwatch` 列表
- **Expose**：`{ el, focus }`

### `VfkColorSwatch`

- **Props**：
  - `value: string`（必填，与 `VfkSwatchPicker` 的 `modelValue` 匹配）
  - `color?: string`（展示颜色，接受任意 CSS 颜色值，不传时使用 `value`）
  - `borderColor?: string`（1px 内描边颜色，用于白色等浅色色块）
  - `label?: string`（无障碍名称与 `title` 提示，不传时使用 `value`）
  - `disabled?: boolean`（默认 `false`）
- **Slots**：
  - `default`：色块内的图标或标记内容（如无颜色斜线）

## 可访问性与手动验证

- **可访问性**：容器使用 `role="radiogroup"`（建议传入 `aria-label`），单个色块使用 `role="radio"` 与 `aria-checked`；通过 roving tabindex 仅将当前选中项或首个可用项暴露给 Tab 键，方向键与 `Home` / `End` 跳过禁用项移动焦点（`grid` 模式下上下方向键按列跳转），`Enter` / 空格选中；适配 `prefers-reduced-motion` 与 `forced-colors`。
- **手动验证**：预览页覆盖四种尺寸、三种形状、行/网格布局、浅色色块内描边、禁用色块、整体禁用与联动品牌色/色块预览，并检查浅色/深色主题与键盘操作。
