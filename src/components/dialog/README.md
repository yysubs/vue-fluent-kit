# VfkDialog / VfkDialogBody（对话框）

参照 Fluent 2 对话框规范，薄封装 `@fluentui/web-components` 的 `<fluent-dialog>` 与 `<fluent-dialog-body>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-dialog>`、`<fluent-dialog-body>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/dialog`

## Vue 接口

### `VfkDialog`

- **Props**：
  - `modelValue?: boolean`（打开状态，用于 `v-model` 双向绑定，默认 `false`）
  - `type?: 'modal' | 'non-modal' | 'alert'`（默认 `'modal'`）
  - `ariaLabel?: string`（对话框的无障碍名称，未传 `ariaLabelledby` 且内部有标题时自动关联 `VfkDialogBody` 的标题）
  - `ariaLabelledby?: string`（外部标题元素的 `id`，优先级高于自动关联）
  - `ariaDescribedby?: string`（外部描述元素的 `id`）
  - `maxWidth?: string`（面板最大宽度，默认沿用官方 `600px`，映射到 `--vfk-dialog-max-width`）
- **Emits**：
  - `update:modelValue: [open: boolean]`
  - `open-change: [open: boolean, event: Event]`（遮罩点击、`Escape`、关闭按钮等非受控关闭同样会触发）
- **Slots**：
  - `default`：对话框内容（放置 `VfkDialogBody`）
- **Expose**：`{ el, show, hide }`
- **模态类型**：
  - `modal`：带遮罩，焦点陷阱由原生 `<dialog>` 提供，点击遮罩或按 `Escape` 关闭。
  - `non-modal`：无遮罩，不锁背景焦点，面板固定在视口内居中显示（不随页面滚动改变位置），按 `Escape` 关闭。
  - `alert`：带遮罩，`role="alertdialog"`，点击遮罩不关闭，只能通过关闭按钮或显式确认关闭。

### `VfkDialogBody`

- **Props**：
  - `title?: string`（标题文案，未传 `#title` 插槽时生效）
  - `closable?: boolean`（默认 `true`，在标题右侧渲染内置关闭按钮）
  - `closeLabel?: string`（关闭按钮的无障碍名称，默认 `'关闭'`）
- **Slots**：
  - `title`：标题内容（优先于 `title` 属性，自动生成 `id` 供外层对话框关联 `aria-labelledby`）
  - `title-action`：标题右侧的附加操作（位于关闭按钮之前）
  - `close`：自定义关闭按钮（覆盖内置按钮）
  - `action`：底部操作区（放置按钮，窄容器下纵向排列，`480px` 以上右对齐横排）
  - `default`：正文内容
- **Expose**：`{ el }`

## 可访问性与手动验证

- **可访问性**：模态与警报对话框由原生 `<dialog>` 提供焦点陷阱、`Escape` 关闭与遮罩语义；`alert` 类型自动带 `role="alertdialog"`；打开后自动聚焦首个 `autofocus` 元素。关闭按钮走官方 `close` 插槽，点击后由 `fluent-dialog-body` 关闭父级对话框。
- **手动验证**：预览页覆盖三种 `type`、内置与自定义关闭按钮、`action` 区按钮、自定义 `maxWidth`、`v-model` 受控开关、遮罩点击与 `Escape` 关闭，以及浅色/深色主题与品牌色切换。
