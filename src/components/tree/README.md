# VfkTree / VfkTreeItem（树形控件）

参照 Fluent 2 树形控件规范，薄封装 `@fluentui/web-components` 的 `<fluent-tree>` 与 `<fluent-tree-item>`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-tree>`、`<fluent-tree-item>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/tree`

## Vue 接口

### `VfkTree`

- **Props**：
  - `modelValue?: string`（当前选中节点的 `value`，用于 `v-model` 双向绑定）
  - `appearance?: 'subtle' | 'subtle-alpha' | 'transparent'`（默认 `'subtle'`，统一下发给所有子节点）
  - `size?: 'small' | 'medium'`（默认 `'medium'`，统一下发给所有子节点）
- **Emits**：
  - `update:modelValue: [value: string]`
  - `change: [value: string, event: Event]`
  - `toggle: [detail: TreeToggleDetail, event: Event]`（任意子节点展开或收起时触发）
- **受控同步**：通过 `provide/inject` 将 `modelValue`、`appearance` 与 `size` 同步给所有层级的 `VfkTreeItem`。当 `modelValue` 指向折叠分支内的子节点时自动展开其祖先节点；收起并再次展开分支后自动恢复受控选中高亮。
- **Slots**：
  - `default`：顶层 `VfkTreeItem` 节点列表
- **Expose**：`{ el, focus, blur }`

### `VfkTreeItem`

- **Props**：
  - `value?: string`（节点唯一标识，与 `VfkTree` 的 `v-model` 对应）
  - `label?: string`（节点文案，可单独使用或与嵌套 `VfkTreeItem` 搭配）
  - `expanded?: boolean`（是否展开子节点，支持 `v-model:expanded`，也支持仅传入初始 `expanded` 由用户自由切换）
  - `selected?: boolean`（是否选中；当父级 `VfkTree` 传入 `modelValue` 时由父级统一托管）
  - `selectable?: boolean`（默认 `true`；设为 `false` 时点击或按回车/空格仅切换展开收起，不改变当前选中节点，适合侧栏导航分组）
  - `appearance?: 'subtle' | 'subtle-alpha' | 'transparent'`（可选局部覆盖）
  - `size?: 'small' | 'medium'`（可选局部覆盖）
- **Emits**：
  - `update:expanded: [expanded: boolean]`
  - `update:selected: [selected: boolean]`
  - `toggle: [expanded: boolean, event: Event]`
  - `select: [selected: boolean, event: Event]`
- **Slots**：
  - `default`：节点内容，也可直接嵌套子级 `VfkTreeItem`
  - `items`：显式放置子级 `VfkTreeItem`（与默认插槽嵌套等效）
  - `start`：标签前置内容（如图标）
  - `end`：紧贴标签后的内容（如徽标）
  - `aside`：行尾右对齐区域（如计数、副标题或操作按钮；点击其中的交互按钮不会误触节点展开/选中）
  - `chevron`：自定义展开/收起箭头图标
- **Expose**：`{ el, focus, blur, toggleExpansion }`

## 可访问性与手动验证

- **可访问性**：保留官方 `role="tree"` / `role="treeitem"`、`aria-expanded`、`aria-selected` 以及 `focusgroup` 方向键导航（`ArrowUp` / `ArrowDown` 移动焦点，`ArrowRight` 展开，`ArrowLeft` 收起或跳回父节点，`Enter` / `Space` 选中或切换分组展开）。
- **手动验证**：预览页覆盖多级嵌套、受控 `v-model` 选中、`size`（`small` / `medium`）、`appearance`（`subtle` / `subtle-alpha` / `transparent`）、`start`/`end`/`aside` 插槽、仅展开分组节点（`:selectable="false"`）以及浅色/深色主题、品牌色切换与键盘方向键导航。
