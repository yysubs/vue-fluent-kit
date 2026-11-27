# VfkTabList / VfkTab（标签页）

参照 Fluent 2 标签页规范，薄封装 `@fluentui/web-components` 的 `<fluent-tablist>` 与 `<fluent-tab>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-tablist>`、`<fluent-tab>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/tabs`

## Vue 接口

### `VfkTabList`

- **Props**：
  - `modelValue?: string`（当前选中标签的 `value`，用于 `v-model` 双向绑定）
  - `appearance?: 'transparent' | 'subtle'`（默认 `'transparent'`）
  - `orientation?: 'horizontal' | 'vertical'`（默认 `'horizontal'`）
  - `size?: 'small' | 'medium' | 'large'`（默认 `'medium'`）
  - `disabled?: boolean`（默认 `false`，禁用整个标签栏）
- **Emits**：
  - `update:modelValue: [value: string]`
  - `change: [value: string, event: Event]`
- **受控同步**：内部通过 `useId()` 为每个 `VfkTabList` 生成独立前缀，自动将业务侧 `value` 映射为无冲突的 DOM `id` 与底层 `activeid`，同一页面渲染多个标签栏也不会产生 `id` 或 CSS Anchor 冲突。
- **Slots**：
  - `default`：放置 `VfkTab` 列表
- **Expose**：`{ el, focus, blur }`

### `VfkTab`

- **Props**：
  - `value: string`（必填，与 `VfkTabList` 的 `v-model` 匹配）
  - `label?: string`（标签文案，未传默认插槽时生效）
  - `disabled?: boolean`（默认 `false`）
  - `id?: string`（可选自定义 DOM `id`，用于与外部 `tabpanel` 的 `aria-labelledby` 关联）
- **Slots**：
  - `default`：标签文案内容（优先于 `label`）
  - `start`：前置图标区域
  - `end`：后置内容区域（如计数或徽标）
- **Expose**：`{ el, focus, blur }`

## 可访问性与手动验证

- **可访问性**：保留官方 `role="tablist"` / `role="tab"`、`aria-selected`、`aria-orientation` 与 `focusgroup` 方向键导航（水平模式左右键、垂直模式上下键循环切换）。
- **手动验证**：预览页覆盖水平/垂直排列、`transparent` / `subtle` 外观、`small` / `medium` / `large` 尺寸、`start`/`end` 插槽、单项禁用与整体禁用、同页多组标签栏互不干扰，以及浅色/深色主题与品牌色切换。
