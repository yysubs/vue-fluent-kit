# VfkMenu / VfkMenuList / VfkMenuItem / VfkMenuButton / VfkMenuDivider（浮层菜单）

参照 Fluent 2 浮层菜单规范，薄封装 `@fluentui/web-components` 的 `<fluent-menu>`、`<fluent-menu-button>`、`<fluent-menu-list>` 与 `<fluent-menu-item>`，并提供轻量分隔线 `VfkMenuDivider`。通用约定见 [CONTROLS.md](../../../CONTROLS.md)，变量契约见 [TOKENS.md](../../../TOKENS.md)。

- **底层自定义元素**：`<fluent-menu>`、`<fluent-menu-button>`、`<fluent-menu-list>`、`<fluent-menu-item>`
- **导出入口**：根入口 `@yysubs/vue-fluent-kit` / 子路径 `@yysubs/vue-fluent-kit/menu`

## Vue 接口

### `VfkMenu`

- **Props**：
  - `openOnHover?: boolean`（默认 `false`，悬停触发器时打开菜单）
  - `openOnContext?: boolean`（默认 `false`，右键触发器时打开菜单）
  - `closeOnScroll?: boolean`（默认 `false`，页面滚动时自动关闭菜单）
  - `persistOnItemClick?: boolean`（默认 `false`，点击普通菜单项后保持打开）
  - `split?: boolean`（默认 `false`，拆分按钮模式，配合 `#primary-action` 与 `#trigger` 使用）
  - `maxHeight?: string`（可选，通过 CSS 变量 `--menu-max-height` 限制浮层最大高度）
- **Emits**：
  - `open-change: [open: boolean, event: Event]`（菜单浮层展开或收起时触发）
- **Slots**：
  - `trigger`：触发元素（自动将 `slot="trigger"` 附加到真实触发按钮上，不额外包壳）
  - `primary-action`：拆分模式的主操作按钮（自动附加 `slot="primary-action"`）
  - `default`：菜单列表（放置 `VfkMenuList`）
- **Expose**：`{ el, openMenu, closeMenu, toggleMenu, focusTrigger, focusMenuList }`

### `VfkMenuButton`

- **Props**：`appearance`（默认 `'secondary'`）、`size`（默认 `'medium'`）、`shape`（默认 `'rounded'`）、`disabled`、`disabledFocusable`、`iconOnly`（与 `VfkButton` 对齐；未传默认插槽时自动为仅图标模式，自带下拉箭头）
- **Emits**：`click: [event: MouseEvent]`
- **Slots**：`default`、`start`、`end`（未传 `#end` 时保留官方默认下拉箭头）
- **Expose**：`{ el, focus, blur }`

### `VfkMenuList`

- **Emits**：
  - `select: [value: string | undefined, event: Event]`（任意菜单项被触发时向上汇总）
  - `toggle: [open: boolean, event: Event]`（浮层展开或收起时触发）
- **Slots**：`default`（放置 `VfkMenuItem`、`VfkMenuDivider`；嵌套在 `VfkMenuItem` 内时自动成为子菜单）
- **Expose**：`{ el, focus, blur }`

### `VfkMenuItem`

- **Props**：
  - `value?: string`（菜单项标识，随 `select` 事件透出）
  - `label?: string`（菜单项文案，未传默认插槽时生效）
  - `role?: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio'`（默认 `'menuitem'`）
  - `checked?: boolean`（复选/单选菜单项的勾选态，支持 `v-model:checked`）
  - `disabled?: boolean`（默认 `false`）
- **Emits**：
  - `select: [value: string | undefined, event: Event]`
  - `update:checked: [checked: boolean]`
  - `change: [checked: boolean, event: Event]`
- **Slots**：`default`、`submenu`（显式放置子级 `VfkMenuList`）、`start`、`end`（常放快捷键提示）、`indicator`、`submenu-glyph`
- **Expose**：`{ el, focus, blur }`

### `VfkMenuDivider`

- 渲染带 `role="separator"` 的菜单分隔线（`.vfk-menu-divider`），同时作为 `menuitemradio` 单选组的分组边界。

## 可访问性与手动验证

- **可访问性**：保留官方原生 Popover API、`role="menu"` / `role="menuitem"` / `role="menuitemcheckbox"` / `role="menuitemradio"`、`aria-haspopup`、`aria-expanded`、`focusgroup` 方向键导航（`ArrowUp` / `ArrowDown` 移动焦点，`ArrowRight` 展开子菜单，`ArrowLeft` / `Escape` 收起并回焦）。
- **手动验证**：预览页覆盖基础下拉菜单、拆分按钮菜单、快捷键与图标插槽、多选/单选菜单项、多级子菜单、右键菜单（`openOnContext`）以及浅色/深色主题与品牌色切换。
