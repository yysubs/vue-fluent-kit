# VfkSwitch（开关）

参照 Fluent 2 开关规范，薄封装 `@fluentui/web-components` 的 `<fluent-switch>`，在外层 `.vfk-switch` 中配对 `<label>` 与必填星号。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-switch>`（`@fluentui/web-components/switch.js`）
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/switch`

## Vue 接口

- **Props**：
  - `modelValue?: boolean`（默认 `false`，用于 `v-model` 双向绑定）
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
- **受控同步**：
  - 将 `modelValue` 同步到底层 `<fluent-switch>` 的 `checked` 属性；若父级受控未更新，下一轮微任务恢复底层状态；禁用态下忽略变更事件。
- **Slots**：
  - `default`：标签内容（优先于 `label` 属性）
- **Expose**：`{ el, focus, blur }`
- **属性透传**：关闭默认继承（`inheritAttrs: false`），`class` 与 `style` 挂在外层 `.vfk-switch`，其余原生属性与 `aria-*` 透传给 `<fluent-switch>`。

## 可访问性与手动验证

- **可访问性**：保留 `<fluent-switch>` 的 `role="switch"`、键盘空格切换与焦点环，标签通过 `for` 与 `id` 绑定；无标签时由调用方传入 `aria-label`。
- **手动验证**：预览页覆盖受控开关切换、标签位于左侧/右侧、必填标识、禁用态（开/关）以及浅色/深色主题、品牌色切换与键盘焦点。
