# VfkSelect / VfkOption（下拉选择）

参照 Fluent 2 下拉选择规范，薄封装 `@fluentui/web-components` 的 `<fluent-dropdown>`（`type="dropdown"`）、`<fluent-listbox>` 与 `<fluent-option>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-dropdown>`、`<fluent-listbox>`、`<fluent-option>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/select`

## 外观与尺寸

- **外观（`appearance`）**：
  - `outline`（默认）：对应 `<fluent-dropdown>` 未传 `appearance` 时的默认描边外观。
  - `transparent`：透明背景底边样式。
  - `filled-darker`：较深中性填充背景（`colorNeutralBackground3`）。
  - `filled-lighter`：浅中性填充背景（`colorNeutralBackground1`）。
- **尺寸（`size`）**：`small`、`medium`（默认）、`large`。

## Vue 接口

### `VfkSelect`

- **Props**：
  - `modelValue?: string`（受控选中值，用于 `v-model` 双向绑定）
  - `appearance?: 'outline' | 'transparent' | 'filled-darker' | 'filled-lighter'`（默认 `'outline'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `placeholder?: string`
  - `disabled?: boolean`（默认 `false`）
  - `required?: boolean`（默认 `false`）
  - `name?: string`
- **Emits**：
  - `update:modelValue: [value: string]`
  - `change: [value: string, event: Event]`
- **受控同步**：通过 `provide/inject` 与子级 `VfkOption` 联动同步选中态；禁用态下忽略变更；受控模式下若父级未更新 `modelValue`，会在下一轮微任务恢复选中项。
- **Slots**：
  - `default`：放置 `VfkOption` 列表（内部自动包裹在 `<fluent-listbox>` 中）
  - `indicator`：自定义右侧展开箭头图标（映射到 `slot="indicator"`）
- **Expose**：`{ el, focus, blur }`

### `VfkOption`

- **Props**：
  - `value: string`（必填，与 `VfkSelect` 的 `modelValue` 匹配）
  - `disabled?: boolean`（默认 `false`）
  - `text?: string`（含描述或图标时覆盖触发器展示文案）
- **Slots**：
  - `default`：选项主文案
  - `start`：选项前置图标或装饰内容（映射到 `slot="start"`）
  - `description`：选项副标题描述（映射到 `slot="description"`）
  - `checkedIndicator`：自定义选中勾选图标（映射到 `slot="checked-indicator"`）
- **Expose**：`{ el }`

## 可访问性与手动验证

- **可访问性**：保留官方 ARIA `combobox` / `listbox` / `option` 角色、键盘上下键导航、字符快速定位、`Enter` 选中与 `Escape` 收起行为，深浅色主题下展开面板清晰可读。
- **手动验证**：预览页覆盖四种外观、三种尺寸、占位文字、带描述与图标选项、禁用选项、整体禁用、受控 `v-model` 双向绑定，并检查浅色/深色主题、品牌色切换与键盘操作。
