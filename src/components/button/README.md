# VfkButton（按钮）

参照 Fluent 2 按钮规范，薄封装 `@fluentui/web-components` 的 `<fluent-button>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-button>`（`@fluentui/web-components/button.js`）
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/button`

## 外观、形状与尺寸

- **外观（`appearance`）**：
  - `secondary`（默认）：对应未传 `appearance` 时的默认次级外观（背景 `colorNeutralBackground1`，边框 `colorNeutralStroke1`）。
  - `primary`：品牌强调按钮（背景 `colorBrandBackground`，文字 `colorNeutralForegroundOnBrand`）。
  - `outline`：透明底描边按钮（边框 `colorNeutralStroke1`）。
  - `subtle`：低强调按钮（背景 `colorSubtleBackground`，文字 `colorNeutralForeground2`）。
  - `transparent`：纯文字/图标透明按钮。
- **形状（`shape`）**：`rounded`（默认，`borderRadiusMedium`）、`circular`（`borderRadiusCircular`）、`square`（`borderRadiusNone`）。
- **尺寸（`size`）**：`small`、`medium`（默认）、`large`。

## Vue 接口

- **Props**：
  - `appearance?: 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'`（默认 `'secondary'`）
  - `shape?: 'rounded' | 'circular' | 'square'`（默认 `'rounded'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `type?: 'button' | 'submit' | 'reset'`（默认 `'button'`）
  - `disabled?: boolean`（默认 `false`）
  - `disabledFocusable?: boolean`（默认 `false`）
  - `iconOnly?: boolean`（未传时当无默认插槽且存在 `start` 或 `end` 插槽自动开启）
- **Emits**：
  - `click: [event: MouseEvent]`（当 `disabled` 或 `disabledFocusable` 为 `true` 时阻止冒泡并拦截触发）
- **Slots**：
  - `default`：按钮正文内容
  - `start`：前置图标或装饰内容（映射到 `slot="start"`）
  - `end`：后置图标或装饰内容（映射到 `slot="end"`）
- **Expose**：`{ el, focus, blur }`

## 可访问性与手动验证

- **可访问性**：保留 `<fluent-button>` 原生键盘操作与焦点环；仅图标按钮的可访问名称由调用方通过 `aria-label` 提供。
- **手动验证**：预览页覆盖外观、尺寸、形状、禁用、`disabledFocusable`、前后置图标与仅图标模式，并检查浅色/深色主题、品牌色切换与键盘焦点。
