# 控件清单

本库基于官方 `@fluentui/web-components` v3（Fluent 2 规范）提供 Vue 3 薄封装控件，样式与变量契约见 [TOKENS.md](TOKENS.md)。

薄封装保留官方自定义元素（`<fluent-*>`）的原生交互、键盘导航与无障碍实现，聚焦 Vue `v-model` 双向绑定、TypeScript 类型提示、默认属性统一和独立 Design Tokens 主题层。组件命名统一使用 `Vfk*` 前缀，外层 Light DOM 辅助类名统一加 `vfk-` 前缀，不使用 `<style scoped>`。

## 通用约定

| 项目 | 约定 |
| --- | --- |
| 封装策略 | 底层优先采用 `@fluentui/web-components` 对应元素；Shadow DOM 样式覆盖优先用 CSS 变量，其次用官方公开 `::part()`，禁止通过脚本修改 `shadowRoot` 或依赖未公开内部结构 |
| 导出方式 | 每组件独立目录 `src/components/<name>/`，汇总到根入口 `@yysubs/vue-fluent-kit` 并提供子路径导出（如 `@yysubs/vue-fluent-kit/button`） |
| 主题切换 | `useTheme()` 默认为 `system` 跟随系统；根节点或 `<VfkThemeProvider>` 通过 `data-vfk-theme="light"` / `"dark"` 切换明暗 |
| 基础排版 | 字体 `var(--fontFamilyBase)`，正文默认对应 `body1`（`14px` / `20px` / `400`），数字等宽场景用 `font-variant-numeric: tabular-nums` |
| 焦点环 | 保留官方控件键盘焦点样式，使用 `colorStrokeFocus2` 与 `colorStrokeFocus1`；输入框类采用底部品牌色高亮条 |
| 禁用态 | 使用 `colorNeutralBackgroundDisabled`、`colorNeutralForegroundDisabled`、`colorNeutralStrokeDisabled`；支持 `disabledFocusable` 的控件保持键盘焦点可达并阻止触发业务事件 |
| 高对比度与动效 | 适配 `@media (forced-colors: active)`、`@media (prefers-reduced-motion: reduce)` 与 `@media (prefers-reduced-transparency: reduce)` |

## 已实现控件

已实现控件的详细规格与接口说明拆分存放在各自组件目录的 `README.md` 中：

| 控件 | 底层自定义元素 | 子路径导出 | 规格文档 |
| --- | --- | --- | --- |
| `VfkButton` | `<fluent-button>` | `@yysubs/vue-fluent-kit/button` | [src/components/button/README.md](src/components/button/README.md) |
| `VfkCheckbox` | `<fluent-checkbox>` | `@yysubs/vue-fluent-kit/checkbox` | [src/components/checkbox/README.md](src/components/checkbox/README.md) |
| `VfkCombobox` / `VfkOption` | `<fluent-dropdown type="combobox">` / `<fluent-listbox>` / `<fluent-option>` | `@yysubs/vue-fluent-kit/combobox` | [src/components/combobox/README.md](src/components/combobox/README.md) |
| `VfkDialog` / `VfkDialogBody` | `<fluent-dialog>` / `<fluent-dialog-body>` | `@yysubs/vue-fluent-kit/dialog` | [src/components/dialog/README.md](src/components/dialog/README.md) |
| `VfkDrawer` / `VfkDrawerBody` | `<fluent-drawer>` / `<fluent-drawer-body>` | `@yysubs/vue-fluent-kit/drawer` | [src/components/drawer/README.md](src/components/drawer/README.md) |
| `VfkField` | `<fluent-field>` | `@yysubs/vue-fluent-kit/field` | [src/components/field/README.md](src/components/field/README.md) |
| `VfkInput` | `<fluent-text-input>` | `@yysubs/vue-fluent-kit/input` | [src/components/input/README.md](src/components/input/README.md) |
| `VfkMenu` / `VfkMenuList` / `VfkMenuItem` / `VfkMenuButton` / `VfkMenuDivider` | `<fluent-menu>` / `<fluent-menu-list>` / `<fluent-menu-item>` / `<fluent-menu-button>` | `@yysubs/vue-fluent-kit/menu` | [src/components/menu/README.md](src/components/menu/README.md) |
| `VfkRadioGroup` / `VfkRadio` | `<fluent-radio-group>` / `<fluent-radio>` | `@yysubs/vue-fluent-kit/radio` | [src/components/radio/README.md](src/components/radio/README.md) |
| `VfkSearchBox` | `<fluent-text-input>`（基于 `VfkInput`） | `@yysubs/vue-fluent-kit/search-box` | [src/components/search-box/README.md](src/components/search-box/README.md) |
| `VfkSelect` / `VfkOption` | `<fluent-dropdown>` / `<fluent-listbox>` / `<fluent-option>` | `@yysubs/vue-fluent-kit/select` | [src/components/select/README.md](src/components/select/README.md) |
| `VfkSwatchPicker` / `VfkColorSwatch` | Light DOM（`role="radiogroup"` / `role="radio"`） | `@yysubs/vue-fluent-kit/swatch-picker` | [src/components/swatch-picker/README.md](src/components/swatch-picker/README.md) |
| `VfkSwitch` | `<fluent-switch>` | `@yysubs/vue-fluent-kit/switch` | [src/components/switch/README.md](src/components/switch/README.md) |
| `VfkTabList` / `VfkTab` | `<fluent-tablist>` / `<fluent-tab>` | `@yysubs/vue-fluent-kit/tabs` | [src/components/tabs/README.md](src/components/tabs/README.md) |
| `VfkToggleButton` | `<fluent-toggle-button>` | `@yysubs/vue-fluent-kit/toggle-button` | [src/components/toggle-button/README.md](src/components/toggle-button/README.md) |
| `VfkTree` / `VfkTreeItem` | `<fluent-tree>` / `<fluent-tree-item>` | `@yysubs/vue-fluent-kit/tree` | [src/components/tree/README.md](src/components/tree/README.md) |

---

## 组合与反馈控件（计划中）

以下为待按需薄封装的控件参考规格；每完成一个控件后，将其详细规格迁入对应 `src/components/<name>/README.md` 并更新上方「已实现控件」索引表。

`@fluentui/web-components` v3 已提供官方元素、可直接薄封装的控件：`Tooltip`、`MessageBar`、`ProgressBar`、`Badge`、`Accordion`、`Divider`、`Spinner`、`Avatar`、`Slider`、`RatingDisplay`、`Textarea`、`Link`、`AnchorButton`、`CompoundButton`。`Toast`、`Skeleton`、`Popover`、`Tag`、`Table`、`Card`、`NavDrawer` 在官方 v3 包中只有 React 实现，没有对应的自定义元素，需要按 Fluent 2 视觉自行实现（可参考 `VfkSwatchPicker` 的 Light DOM 写法）。

### Tooltip（文字提示）

参照 `@fluentui/react-tooltip`。用于悬停或聚焦触发元素时的简短说明。

- **外观**：`normal`（默认，底色 `colorNeutralBackground1`，文字 `colorNeutralForeground1`）与 `inverted`（底色 `colorNeutralBackgroundStatic`，文字 `colorNeutralForegroundStaticInverted`）。
- **尺寸与排版**：最大宽 `240px`，圆角 `borderRadiusMedium`，内边距 `4px 11px 6px 11px`，字号 `fontSizeBase200` / 行高 `lineHeightBase200`，阴影 `shadow8`，层级 `zIndexPriority`，`pointer-events: none`。
- **箭头（`withArrow`）**：可选指向目标中心的旋转方块箭头，贴视口边缘时自动翻转与夹紧。

### Popover（气泡卡片）

参照 `@fluentui/react-popover`（`Popover`、`PopoverTrigger`、`PopoverSurface`）。用于带交互内容或富文本的浮层。

- **外观（`appearance`）**：`normal`（默认，`colorNeutralBackground1`）、`inverted`、`brand`（`colorBrandBackground`）。
- **尺寸（`size`）**：`small`（内边距 `12px`）、`medium`（默认，内边距 `16px`）、`large`（内边距 `20px`），圆角 `borderRadiusMedium`，阴影 `shadow16`，层级 `zIndexPopup`，可选 `withArrow`。

### Toast 与 MessageBar（通知与横幅）

参照 `@fluentui/react-toast` 与 `@fluentui/react-message-bar`。

- **Toast（浮动通知）**：
  - 由 `Toaster` 统一挂载在视口角落（默认右下），单条 `Toast` 内边距 `12px`，圆角 `borderRadiusMedium`，底色 `colorNeutralBackground1`，阴影 `shadow8`，层级 `zIndexMessages`。
  - `intent` 支持 `info`、`success`、`warning`、`error`，匹配对应状态色图标；默认 `3000ms` 自动收起，支持悬停暂停（`pauseOnHover`）。
- **MessageBar（页面内横幅）**：
  - 最小高 `36px`，圆角 `borderRadiusMedium`，左内边距 `spacingHorizontalM`。
  - `intent="info"`（默认）：底色 `colorNeutralBackground3`，边框 `colorNeutralStroke1`，图标 `colorNeutralForeground3`。
  - `intent="success" | "warning" | "error"`：分别采用 `colorStatusSuccess*`、`colorStatusWarning*`、`colorStatusDanger*` 的 `Background1`、`Border1`、`Foreground1/3`。

### ProgressBar（进度条）

参照 `@fluentui/react-progress`。

- **厚度（`thickness`）**：`medium`（默认，高 `2px`）、`large`（高 `4px`）。
- **形状（`shape`）**：`rounded`（默认，`borderRadiusMedium`）、`square`（`borderRadiusNone`）。
- **配色（`color`）**：
  - 轨道底色统一为 `colorNeutralBackground6`。
  - `brand`（默认）：填充 `colorCompoundBrandBackground`。
  - `success`：填充 `colorPaletteGreenBackground3`。
  - `warning`：填充 `colorPaletteDarkOrangeBackground3`。
  - `error`：填充 `colorPaletteRedBackground3`。
- **模式**：传入 `value`（`0` 到 `max`）为确定进度；不传 `value` 为不确定进度（`indeterminate`），条带做循环横向扫光动画。

### Skeleton（骨架屏）

参照 `@fluentui/react-skeleton`（`Skeleton` 与 `SkeletonItem`）。

- **形状（`shape`）**：`rectangle`（默认，宽 `100%`，圆角 `borderRadiusMedium`）、`circle`（宽高相等，圆角 `50%`）、`square`（宽高相等，直角无圆角）。
- **尺寸（`size`）**：`8`、`12`、`14`、`16`、`20`、`22`、`24`、`28`、`32`、`36`、`40`、`48`、`52`、`56`、`64`、`72`、`92`、`96`、`120`、`128`（单位 `px`）。
- **动画（`animation`）**：`wave`（默认，`3s ease-in-out` 扫光，底色 `colorNeutralStencil1` / `colorNeutralStencil2`）或 `pulse`（`1s` 透明度脉冲）；`appearance` 支持 `opaque` 与 `translucent`。

### Badge（徽标）

参照 `@fluentui/react-badge`。

- **外观（`appearance`）**：`filled`（默认，实心）、`tint`（浅底有边）、`outline`（透明底有边）、`ghost`（无底无边）。
- **颜色（`color`）**：`brand`（默认）、`danger`、`important`、`informative`、`severe`、`subtle`、`success`、`warning`。
- **尺寸（`size`）**：`tiny`（`6px`）、`extra-small`（`10px`）、`small`（`16px`）、`medium`（默认，`20px`）、`large`（`24px`）、`extra-large`（`32px`）。
- **形状（`shape`）**：`circular`（默认）、`rounded`（`borderRadiusMedium`，小尺寸为 `borderRadiusSmall`）、`square`。

### Tag 与 InteractionTag（标签与可交互标签）

参照 `@fluentui/react-tags`（`Tag`、`InteractionTag`、`TagGroup`）。

- **区分**：纯展示或带关闭按钮用 `Tag`；可点击筛选、切换选中用 `InteractionTag`。
- **外观（`appearance`）**：`filled`（默认，底色 `colorNeutralBackground3`，文字 `colorNeutralForeground2`）、`outline`（底色 `colorSubtleBackground`，文字 `colorNeutralForeground2`，边框 `1px solid colorNeutralStroke1`）、`brand`（品牌浅底 `colorBrandBackground2`，文字 `colorBrandForeground2`）。
- **尺寸（`size`）**：`extra-small`（高 `20px`）、`small`（高 `24px`）、`medium`（默认，高 `32px`）。
- **形状（`shape`）**：`rounded`（默认，`borderRadiusMedium`）、`circular`（`borderRadiusCircular`）。
- **选中态（`selected`）**：支持选中态，选中时底色 `colorBrandBackground`、文字 `colorNeutralForegroundOnBrand`、边框 `colorBrandStroke1`。

---

## 数据展示与布局控件

### Table 与 DataGrid（表格）

参照 `@fluentui/react-table`。

- **尺寸（`size`）**：`medium`（默认，行最小高 `44px`，字号 `fontSizeBase300`）、`small`（行最小高 `34px`）、`extra-small`（行最小高 `24px`，字号 `fontSizeBase200`）。
- **单元格与行**：
  - 单元格左右内边距 `spacingHorizontalS`（`8px`），行底边 `1px solid colorNeutralStroke2`。
  - 交互行悬停底色 `colorSubtleBackgroundHover`，按下 `colorSubtleBackgroundPressed`；选中行支持 `brand`（`colorBrandBackground2`）或 `neutral`（`colorSubtleBackgroundSelected`）。
- **排序表头（`TableHeaderCell`）**：
  - 可排序列内嵌占满表头的按钮（最小高 `32px`），悬停底色 `colorSubtleBackgroundHover`。
  - 点击切换 `ascending` / `descending`，在表头设置 `aria-sort` 并展示方向箭头图标。

### Card（卡片）

参照 `@fluentui/react-card`（`Card`、`CardHeader`、`CardPreview`、`CardFooter`）。

- **外观（`appearance`）**：
  - `filled`（默认）：底色 `colorNeutralBackground1`，阴影 `shadow4`（可交互卡片悬停升为 `shadow8`）。
  - `filled-alternative`：底色 `colorNeutralBackground2`，阴影 `shadow4`。
  - `outline`：底色透明，边框 `1px solid colorNeutralStroke1`，无阴影。
  - `subtle`：底色 `colorSubtleBackground`，无边框无阴影。
- **尺寸（`size`）**：
  - `small`：内边距 `8px`，圆角 `borderRadiusSmall`（`2px`）。
  - `medium`（默认）：内边距 `12px`，圆角 `borderRadiusMedium`（`4px`）。
  - `large`：内边距 `16px`，圆角 `borderRadiusLarge`（`6px`）。
- **选中态（`selected`）**：背景切为 `colorNeutralBackground1Selected`，边框 `colorNeutralStroke1Selected`。

### NavDrawer（侧栏导航）

参照 `@fluentui/react-nav`，官方 v3 未提供 `<fluent-nav>` 自定义元素，需基于 `VfkDrawer`（`inline` 类型）与 `VfkTree` 组合自研。

- **尺寸**：默认宽 `260px`，底色 `colorNeutralBackground4`。
- **导航项（`NavItem`）**：圆角 `borderRadiusMedium`，内边距 `spacingVerticalMNudge spacingHorizontalS spacingVerticalMNudge spacingHorizontalMNudge`，排版 `body1`，悬停底色 `colorNeutralBackground4Hover`，选中项左侧带 `4×20px` 的品牌色竖条。

---

## 其它官方组件与项目边界

- **按需补充的官方组件**：`Divider`（`<fluent-divider>`）、`Spinner`（`<fluent-spinner>`）、`Accordion`（`<fluent-accordion>` / `<fluent-accordion-item>`）、`Avatar`（`<fluent-avatar>`）、`Slider`（`<fluent-slider>`）、`RatingDisplay`（`<fluent-rating-display>`）、`Textarea`（`<fluent-textarea>`）、`Link`（`<fluent-link>`）、`AnchorButton`（`<fluent-anchor-button>`）、`CompoundButton`（`<fluent-compound-button>`）在 `@fluentui/web-components` v3 中均有自定义元素，后续需要时直接按官方规格排入开发。
- **官方 v3 未提供的组件**：`Breadcrumb`（面包屑）、`Toolbar`（工具栏）、`Table` / `DataGrid`（表格）在 web-components 包中没有对应元素，只有 React 实现，需要时按 Fluent 2 视觉自行实现。
- **图表**：折线图等数据可视化在官方仓库独立于 `@fluentui/react-components`，位于 `@fluentui/react-charts`，配色取自 `colorPalette*` 与 `colorBrand*`，不混入基础控件包。
- **不进控件库的应用层逻辑**：
  - 业务视图组件、页面级顶栏与固定吸顶计算、浏览器全屏 API 调用、隐藏文件框拖放上传层。
  - 状态管理（`store`）、路由、PWA、本地存储键（如主题持久化键）、音效。
