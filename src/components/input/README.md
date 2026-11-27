# VfkInput（文本输入）

参照 Fluent 2 输入框规范，薄封装 `@fluentui/web-components` 的 `<fluent-text-input>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-text-input>`（`@fluentui/web-components/text-input.js`）
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/input`

## 外观与尺寸

- **外观（`appearance`）**：
  - `outline`（默认）：描边输入框，底边强调线，聚焦时底部展开品牌色高亮条。
  - `underline`：无圆角，仅保留底边线与聚焦高亮条。
  - `filled-darker`：较深中性填充背景（`colorNeutralBackground3`）。
  - `filled-lighter`：浅中性填充背景（`colorNeutralBackground1`）。
- **尺寸（`size`）**：`small`、`medium`（默认）、`large`，内部映射到官方 `control-size` 属性。

## Vue 接口

- **Props**：
  - `modelValue?: string`（受控输入值，用于 `v-model` 双向绑定）
  - `appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter'`（默认 `'outline'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `type?: 'text' | 'email' | 'password' | 'tel' | 'url'`（默认 `'text'`）
  - `placeholder?: string`
  - `disabled?: boolean`（默认 `false`）
  - `readonly?: boolean`（默认 `false`）
  - `required?: boolean`（默认 `false`）
  - `name?: string`
  - `autocomplete?: string`
  - `maxlength?: number`
  - `minlength?: number`
- **Emits**：
  - `update:modelValue: [value: string]`
  - `input: [value: string, event: Event]`
  - `change: [value: string, event: Event]`
- **受控同步**：受控模式下若父级未更新 `modelValue`，会在下一轮微任务同步恢复底层元素的 `value`；禁用态下忽略输入变更。
- **Slots**：
  - `default`：内置标签内容
  - `start`：输入框前缀内容（映射到 `slot="start"`）
  - `end`：输入框后缀内容（映射到 `slot="end"`）
- **Expose**：`{ el, focus, blur, select }`

## 可访问性与手动验证

- **可访问性**：保留 `<fluent-text-input>` 内部 `<input>` 的原生编辑、`readonly`、`required` 与表单语义；透传 `aria-*` 等附加属性。
- **手动验证**：预览页覆盖四种外观、三种尺寸、前后缀插槽、内置标签、禁用、只读与受控 `v-model` 实时绑定，并检查浅色/深色主题切换与键盘聚焦。
