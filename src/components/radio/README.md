# VfkRadioGroup / VfkRadio（单选组）

参照 Fluent 2 单选组规范，薄封装 `@fluentui/web-components` 的 `<fluent-radio-group>` 与 `<fluent-radio>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-radio-group>`、`<fluent-radio>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/radio`

## Vue 接口

### `VfkRadioGroup`

- **Props**：
  - `modelValue?: string`（当前选中项值，用于 `v-model` 双向绑定）
  - `orientation?: 'vertical' | 'horizontal'`（默认 `'vertical'`）
  - `disabled?: boolean`（默认 `false`，禁用整个单选组）
  - `required?: boolean`（默认 `false`）
  - `name?: string`（表单字段名，自动同步给子级 `VfkRadio`）
- **Emits**：
  - `update:modelValue: [value: string]`
  - `change: [value: string, event: Event]`
- **受控同步**：通过 `provide/inject` 将 `modelValue`、`disabled` 与 `name` 同步给子级 `VfkRadio`；禁用态下忽略变更；受控模式下若父级未更新 `modelValue`，会在下一轮微任务恢复选中状态。
- **Slots**：
  - `default`：放置 `VfkRadio` 列表
- **Expose**：`{ el, focus, blur }`

### `VfkRadio`

- **Props**：
  - `value: string`（必填，与 `VfkRadioGroup` 的 `modelValue` 匹配）
  - `label?: string`（选项标签文案，未传默认插槽时生效）
  - `disabled?: boolean`（默认 `false`）
  - `id?: string`（未传时通过 `useId()` 自动生成）
- **Slots**：
  - `default`：选项标签内容（优先于 `label` 属性）
- **Expose**：`{ el, focus, blur }`
- **属性透传**：关闭默认继承（`inheritAttrs: false`），`class` 与 `style` 挂在外层 `.vfk-radio`，其余原生属性与 `aria-*` 透传给 `<fluent-radio>`。

## 可访问性与手动验证

- **可访问性**：保留官方 `role="radiogroup"` / `role="radio"`、方向键切换与 `focusgroup` 焦点管理，标签通过 `for` 与 `id` 绑定。
- **手动验证**：预览页覆盖垂直/水平排列、受控 `v-model` 切换、单选项禁用、整体禁用以及浅色/深色主题、品牌色切换与方向键导航。
