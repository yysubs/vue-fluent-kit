# VfkField（表单字段）

参照 Fluent 2 表单字段规范，薄封装 `@fluentui/web-components` 的 `<fluent-field>`，组合标签、表单控件、校验状态图标与消息、辅助提示文字。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-field>`（`@fluentui/web-components/field.js`）
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/field`

## 布局与校验状态

- **方向（`orientation`）**：
  - `vertical`（默认）：标签位于控件上方（映射到 `label-position="above"`）。
  - `horizontal`：标签位于控件左侧（映射到 `label-position="before"`）。
- **标签尺寸（`size`）**：`small`、`medium`（默认）、`large`。
- **校验状态（`validationState`）**：
  - `none`（默认）：不展示状态图标，仅展示提示文字或普通消息。
  - `error`：状态图标与消息使用 `colorPaletteRedForeground1`，消息容器带 `role="alert"`。
  - `warning`：状态图标使用 `colorPaletteDarkOrangeForeground1`。
  - `success`：状态图标使用 `colorPaletteGreenForeground1`。

## Vue 接口

- **Props**：
  - `label?: string`（字段标签文本）
  - `for?: string`（关联控件的 `id`，透传到内部 `<label>` 的 `for`）
  - `orientation?: 'vertical' | 'horizontal'`（默认 `'vertical'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `required?: boolean`（默认 `false`，开启时在标签后展示必填星号）
  - `disabled?: boolean`（默认 `false`，标签呈现禁用文字色）
  - `validationState?: 'none' | 'error' | 'warning' | 'success'`（默认 `'none'`）
  - `validationMessage?: string`（校验反馈消息）
  - `hint?: string`（辅助提示文字）
- **Slots**：
  - `default`：表单控件内容（内部自动包裹进 `slot="input"`）
  - `label`：自定义标签内容（优先于 `label` 属性）
  - `validationMessage`：自定义校验消息内容（优先于 `validationMessage` 属性）
  - `hint`：自定义提示文字内容（优先于 `hint` 属性）
- **Expose**：`{ el }`

## 可访问性与手动验证

- **可访问性**：通过 `<label :for="for">` 关联表单控件，错误态校验消息标记 `role="alert"` 以便屏幕阅读器及时播报；状态图标与必填星号标记 `aria-hidden="true"`。
- **手动验证**：预览页覆盖垂直/水平方向、三种标签尺寸、`error` / `warning` / `success` / `none` 校验态、提示文字、必填标识、组合 `VfkInput` / `VfkSelect` / `VfkSwitch` / `VfkRadioGroup` 表单示例，以及浅色/深色主题切换。
