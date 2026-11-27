# VfkTextarea（多行文本框）

参照 Fluent 2 文本框规范，薄封装 `@fluentui/web-components` 的 `<fluent-textarea>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-textarea>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/textarea`

## Vue 接口

### `VfkTextarea`

- **Props**：
  - `modelValue?: string`（文本值，用于 `v-model` 双向绑定）
  - `appearance?: 'outline' | 'filled-lighter' | 'filled-darker'`（默认 `'outline'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `resize?: 'none' | 'both' | 'horizontal' | 'vertical'`（默认 `'none'`，用户可拖拽改变尺寸；禁用态自动失效）
  - `autoResize?: boolean`（默认 `false`，高度随内容变化，此时不要再给固定高度）
  - `block?: boolean`（默认 `false`，占满整行宽度，否则为 `18rem` 的默认宽度）
  - `minHeight?: string`（最小高度，映射到 `--vfk-textarea-min-height`，经官方 `::part(control)` 生效）
  - `placeholder?: string`、`disabled?: boolean`、`readonly?: boolean`、`required?: boolean`、`name?: string`、`maxlength?: number`、`minlength?: number`
- **Emits**：
  - `update:modelValue: [value: string]`
  - `input: [value: string, event: Event]`
  - `change: [value: string, event: Event]`
- **Slots**：
  - `label`：控件标签内容（放置 `<fluent-label>`）
- **Expose**：`{ el, focus, blur, select }`
- **说明**：官方元素的默认插槽是「初始文本值」而非标签，为避免和 `v-model` 冲突，本组件不转发默认插槽；标签请用 `label` 插槽或 `VfkField`。

## 可访问性与手动验证

- **可访问性**：保留官方表单关联元素（`formAssociated`）、原生 `<textarea>` 语义、`required` / `readonly` / `disabled` 状态与校验接口；标签通过 `label` 插槽与 `VfkField` 关联。
- **手动验证**：预览页覆盖三种 `appearance`、三档 `size`、四种 `resize`、`autoResize`、`block` 与 `minHeight`、禁用/只读/必填状态、`v-model` 双向绑定，以及浅色/深色主题与品牌色切换。
