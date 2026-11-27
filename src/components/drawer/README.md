# VfkDrawer / VfkDrawerBody（抽屉）

参照 Fluent 2 抽屉规范，薄封装 `@fluentui/web-components` 的 `<fluent-drawer>` 与 `<fluent-drawer-body>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-drawer>`、`<fluent-drawer-body>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/drawer`

## Vue 接口

### `VfkDrawer`

- **Props**：
  - `modelValue?: boolean`（打开状态，用于 `v-model` 双向绑定，默认 `false`）
  - `type?: 'modal' | 'non-modal' | 'inline'`（默认 `'modal'`）
  - `position?: 'start' | 'end'`（默认 `'start'`，即从左侧滑出）
  - `size?: 'small' | 'medium' | 'large' | 'full'`（默认 `'medium'`，对应 `320px` / `592px` / `940px` / `100%`）
  - `width?: string`（自定义宽度，优先于 `size`，映射到官方 `--drawer-width`）
  - `ariaLabelledby?: string`（外部标题元素的 `id`，未传时自动关联 `VfkDrawerBody` 的标题）
  - `ariaDescribedby?: string`（外部描述元素的 `id`）
- **Emits**：
  - `update:modelValue: [open: boolean]`
  - `open-change: [open: boolean, event: Event]`（遮罩点击、`Escape`、关闭按钮等非受控关闭同样会触发）
- **Slots**：
  - `default`：抽屉内容（放置 `VfkDrawerBody`）
- **Expose**：`{ el, show, hide }`
- **类型**：
  - `modal`：带遮罩浮层，开启焦点陷阱，点击遮罩或按 `Escape` 关闭。
  - `non-modal`：固定定位贴边浮层但无遮罩，不锁背景焦点。
  - `inline`：内嵌在文档流中，与内容并排，无遮罩无阴影，`height` 跟随容器。

### `VfkDrawerBody`

- **Props**：
  - `title?: string`（标题文案，未传 `#title` 插槽时生效）
  - `closable?: boolean`（默认 `true`，在标题右侧渲染内置关闭按钮）
  - `closeLabel?: string`（关闭按钮的无障碍名称，默认 `'关闭'`）
- **Slots**：
  - `title`：标题内容（自动生成 `id` 供外层抽屉关联 `aria-labelledby`）
  - `close`：自定义关闭按钮（覆盖内置按钮）
  - `footer`：底部操作区
  - `default`：正文内容（`content` 区可滚动）
- **Expose**：`{ el }`

## 可访问性与手动验证

- **可访问性**：`modal` 类型由原生 `<dialog>` 提供焦点陷阱与 `Escape` 关闭，并自动带 `role="dialog"`；标题通过 `aria-labelledby` 自动关联，避免出现无名称对话框。关闭按钮走官方 `close` 插槽，点击后由 `fluent-drawer-body` 关闭父级抽屉。
- **手动验证**：预览页覆盖三种 `type`、左右两侧 `position`、四档 `size` 与自定义 `width`、`footer` 区按钮、`v-model` 受控开关、遮罩点击与 `Escape` 关闭，以及浅色/深色主题与品牌色切换。
