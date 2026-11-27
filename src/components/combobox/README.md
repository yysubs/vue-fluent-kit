# VfkCombobox（可输入下拉框）

参照 Fluent 2 Combobox 规范，薄封装 `@fluentui/web-components` 的 `<fluent-dropdown>`（`type="combobox"`）、`<fluent-listbox>` 与 `<fluent-option>`，复用了 `VfkOption`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-dropdown type="combobox">`、`<fluent-listbox>`、`<fluent-option>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/combobox`（同时再导出 `VfkOption`）

## 外观与尺寸

- **外观（`appearance`）**：
  - `outline`（默认）：对应 `<fluent-dropdown>` 未传 `appearance` 时的默认描边外观。
  - `transparent`：透明背景底边样式。
  - `filled-darker`：较深中性填充背景（`colorNeutralBackground3`）。
  - `filled-lighter`：浅中性填充背景（`colorNeutralBackground1`）。
- **尺寸（`size`）**：`small`、`medium`（默认）、`large`。

## 输入过滤与自定义文本

- **前缀过滤（`filter`）**：默认开启（`true`），输入文本时按选项文本前缀实时过滤可见项（忽略大小写与重音），并保持方向键导航只落在可见选项上；列表收起后自动恢复全部选项。设为 `false` 时保留全部选项，仅由底层高亮匹配项。
- **自由输入（`freeform`）**：默认关闭（`false`），输入不匹配文本时收起或失焦后恢复当前选中项。设为 `true` 时会在列表首位渲染自由输入选项（可通过 `#freeform` 插槽定制前缀文案），允许提交不在预设列表中的文本。

## Vue 接口

### `VfkCombobox`

- **Props**：
  - `modelValue?: string`（受控值，用于 `v-model` 双向绑定；开启 `freeform` 时可以是自定义输入文本）
  - `appearance?: 'outline' | 'transparent' | 'filled-darker' | 'filled-lighter'`（默认 `'outline'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `placeholder?: string`
  - `disabled?: boolean`（默认 `false`）
  - `required?: boolean`（默认 `false`）
  - `name?: string`
  - `filter?: boolean`（默认 `true`，是否按输入前缀过滤选项）
  - `freeform?: boolean`（默认 `false`，是否允许自由输入）
- **Emits**：
  - `update:modelValue: [value: string]`
  - `change: [value: string, event: Event]`
  - `input: [query: string, event: Event]`
- **Slots**：
  - `default`：放置 `VfkOption` 列表（内部自动包裹在 `<fluent-listbox>` 中）
  - `indicator`：自定义右侧展开箭头图标（映射到 `slot="indicator"`）
  - `freeform`：`freeform` 模式下自定义选项中输入文本前的提示文案
- **Expose**：`{ el, focus, blur }`

## 可访问性与手动验证

- **可访问性**：保留官方 ARIA `combobox` / `listbox` / `option` 角色、上下方向键切换活动项、`Enter` 选中、`Escape` 收起与点击外部收起行为。
- **手动验证**：预览页覆盖四种外观、三种尺寸、输入过滤、`freeform` 自定义输入、带描述与图标的选项、禁用项、整体禁用与受控 `v-model`，并检查浅色/深色主题、品牌色切换与键盘操作。
