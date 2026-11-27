# VfkCheckbox（勾选框）

参照 Fluent 2 勾选框规范，薄封装 `@fluentui/web-components` 的 `<fluent-checkbox>`，在外层 `.vfk-checkbox` 中配对 `<label>` 与必填星号。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-checkbox>`（`@fluentui/web-components/checkbox.js`）
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/checkbox`

## 尺寸与形状

- **尺寸（`size`）**：`medium`（默认）、`large`。
- **形状（`shape`）**：`square`（默认）、`circular`。

## Vue 接口

- **Props**：
  - `modelValue?: boolean | 'mixed'`（默认 `false`，用于 `v-model` 双向绑定）
  - `shape?: 'square' | 'circular'`（默认 `'square'`）
  - `size?: 'medium' | 'large'`（默认 `'medium'`）
  - `disabled?: boolean`（默认 `false`）
  - `required?: boolean`（默认 `false`）
  - `label?: string`（未传默认插槽时生效）
  - `labelPosition?: 'after' | 'before'`（默认 `'after'`）
  - `id?: string`（未传时通过 `useId()` 自动生成）
  - `name?: string`
  - `value?: string`
- **Emits**：
  - `update:modelValue: [value: boolean]`
  - `change: [value: boolean, event: Event]`
- **三态与受控同步**：
  - 自动将 `checked` 与 `indeterminate` 属性同步到底层 `<fluent-checkbox>`。
  - 若父组件受控未更新 `modelValue`，会在下一轮微任务恢复底层状态；禁用态下忽略变更事件。
- **Slots**：
  - `default`：标签内容（优先于 `label` 属性）
  - `checkedIndicator`：自定义选中图标（映射到 `slot="checked-indicator"`）
  - `indeterminateIndicator`：自定义半选图标（映射到 `slot="indeterminate-indicator"`）
- **Expose**：`{ el, focus, blur }`
- **属性透传**：关闭默认继承（`inheritAttrs: false`），`class` 与 `style` 挂在外层 `.vfk-checkbox`，其余原生属性与 `aria-*` 透传给 `<fluent-checkbox>`。

## 标签、可访问性与手动验证

- **标签与必填标识**：默认插槽与 `label` 均未提供时不渲染 `<label>`（纯框场景由调用方传入 `aria-label`）；开启 `required` 且存在标签时渲染 `aria-hidden="true"` 的必填星号（颜色 `colorPaletteRedForeground3`，禁用态为 `colorNeutralForegroundDisabled`）。
- **可访问性**：保留 `<fluent-checkbox>` 键盘空格切换、焦点环与三态语义，标签通过 `for` 与 `id` 绑定。
- **手动验证**：预览页覆盖未选中/选中/半选及全选联动、尺寸、形状、标签位置（在左/在右）、必填标识、无标签纯框和禁用态，并检查浅色/深色主题及键盘焦点。
