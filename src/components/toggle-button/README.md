# VfkToggleButton（切换按钮）

参照 Fluent 2 切换按钮规范，薄封装 `@fluentui/web-components` 的 `<fluent-toggle-button>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-toggle-button>`（`@fluentui/web-components/toggle-button.js`）
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/toggle-button`

## 外观、形状与尺寸

- **外观（`appearance`）**：`secondary`（默认）、`primary`、`outline`、`subtle`、`transparent`。
- **形状（`shape`）**：`rounded`（默认）、`circular`、`square`。
- **尺寸（`size`）**：`small`、`medium`（默认）、`large`。

## Vue 接口

- **Props**：
  - `modelValue?: boolean | 'mixed'`（默认 `false`，支持 `v-model` 双向绑定）
  - `appearance?: 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'`（默认 `'secondary'`）
  - `shape?: 'rounded' | 'circular' | 'square'`（默认 `'rounded'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `type?: 'button' | 'submit' | 'reset'`（默认 `'button'`）
  - `disabled?: boolean`（默认 `false`）
  - `disabledFocusable?: boolean`（默认 `false`）
  - `iconOnly?: boolean`（未传时当无默认插槽且存在 `start` 或 `end` 插槽自动开启）
- **Emits**：
  - `update:modelValue: [value: boolean]`
  - `change: [value: boolean, event: MouseEvent]`
  - `click: [event: MouseEvent]`
- **受控与三态同步**：
  - 点击或按键切换时，`'mixed'` 与 `false` 均发出 `true`，`true` 发出 `false`。
  - 受控模式下若父级未更新 `modelValue`，会在下一轮微任务恢复底层 `pressed` 与 `mixed` 状态。
  - `disabled` 或 `disabledFocusable` 为 `true` 时阻止事件触发并保持原状态。
- **Slots**：
  - `default`：按钮正文内容
  - `start`：前置图标或装饰内容（映射到 `slot="start"`）
  - `end`：后置图标或装饰内容（映射到 `slot="end"`）
- **Expose**：`{ el, focus, blur }`

## 可访问性与手动验证

- **可访问性**：保留 `<fluent-toggle-button>` 原生键盘操作（`Enter` / `Space`）、焦点环与 `aria-pressed`（`true` / `false` / `mixed`）语义；仅图标按钮的可访问名称由调用方通过 `aria-label` 提供。
- **手动验证**：预览页覆盖五种外观、尺寸、形状、禁用、`disabledFocusable`、仅图标模式、受控 `v-model` 与 `mixed` 半按压态，并检查浅色/深色主题、品牌色切换与键盘焦点。
