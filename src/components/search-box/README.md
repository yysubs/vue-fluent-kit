# VfkSearchBox（搜索框）

参照 Fluent 2 搜索框规范（`@fluentui/react-search`），基于 [`VfkInput`](../input/README.md) 扩展，内置前置搜索图标、聚焦或有值时的后置清除按钮，以及键盘 `Enter` 搜索与 `Escape` 清空交互。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-text-input>`（经由 `VfkInput` 复用）
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/search-box`

## 外观与尺寸

- **外观（`appearance`）**：同 `VfkInput`，支持 `outline`（默认）、`underline`、`filled-darker`、`filled-lighter`。
- **尺寸（`size`）**：同 `VfkInput`，支持 `small`、`medium`（默认）、`large`，内置搜索图标与清除按钮尺寸随控件尺寸适配。

## Vue 接口

- **Props**：
  - `modelValue?: string`（受控搜索文本，用于 `v-model` 双向绑定）
  - `appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter'`（默认 `'outline'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `placeholder?: string`
  - `disabled?: boolean`（默认 `false`）
  - `readonly?: boolean`（默认 `false`）
  - `required?: boolean`（默认 `false`）
  - `name?: string`
  - `autocomplete?: string`
  - `maxlength?: number`
  - `minlength?: number`
  - `dismissLabel?: string`（清除按钮的 `aria-label`，默认 `'Clear'`）
- **Emits**：
  - `update:modelValue: [value: string]`
  - `input: [value: string, event: Event]`
  - `change: [value: string, event: Event]`
  - `clear: [event: Event]`（点击清除按钮或按 `Escape` 清空时触发）
  - `search: [value: string, event: KeyboardEvent]`（非输入法组合态按 `Enter` 时触发）
- **交互与焦点行为**：
  - 默认在前缀区域展示搜索放大镜图标，可通过 `#start` 插槽覆写。
  - 非禁用且非只读状态下，**聚焦或有值**时在后缀区域显示清除按钮；点击清除按钮清空内容并把焦点还给输入框。
  - 在输入框有值时按 `Escape` 可清空内容并保持焦点；按 `Enter` 触发 `search` 事件。
- **Slots**：
  - `default`：内置标签内容（透传给 `VfkInput` 默认插槽）
  - `start`：自定义前置搜索图标
  - `dismiss`：自定义清除按钮图标
  - `end`：清除按钮之后的附加后缀内容
- **Expose**：`{ el, inputRef, focus, blur, select, clear }`

## 可访问性与手动验证

- **可访问性**：清除按钮采用原生 `<button type="button">` 并提供 `aria-label`（通过 `dismissLabel` 可本地化），具备 `:focus-visible` 焦点环与 `@media (forced-colors: active)` 高对比度支持；外层保留 `VfkInput` 与 `<fluent-text-input>` 的原生表单与键盘语义。
- **手动验证**：预览页覆盖四种外观、三种尺寸、受控 `v-model`、聚焦/有值时的清除按钮与焦点归还、`Enter` / `Escape` 键盘交互、自定义插槽、禁用与只读态，并检查浅色/深色主题与品牌色切换。
