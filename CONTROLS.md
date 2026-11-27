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
| `VfkToggleButton` | `<fluent-toggle-button>` | `@yysubs/vue-fluent-kit/toggle-button` | [src/components/toggle-button/README.md](src/components/toggle-button/README.md) |
| `VfkInput` | `<fluent-text-input>` | `@yysubs/vue-fluent-kit/input` | [src/components/input/README.md](src/components/input/README.md) |
| `VfkSelect` / `VfkOption` | `<fluent-dropdown>` / `<fluent-listbox>` / `<fluent-option>` | `@yysubs/vue-fluent-kit/select` | [src/components/select/README.md](src/components/select/README.md) |
| `VfkCheckbox` | `<fluent-checkbox>` | `@yysubs/vue-fluent-kit/checkbox` | [src/components/checkbox/README.md](src/components/checkbox/README.md) |
| `VfkSwitch` | `<fluent-switch>` | `@yysubs/vue-fluent-kit/switch` | [src/components/switch/README.md](src/components/switch/README.md) |
| `VfkRadioGroup` / `VfkRadio` | `<fluent-radio-group>` / `<fluent-radio>` | `@yysubs/vue-fluent-kit/radio` | [src/components/radio/README.md](src/components/radio/README.md) |
| `VfkField` | `<fluent-field>` | `@yysubs/vue-fluent-kit/field` | [src/components/field/README.md](src/components/field/README.md) |

---

## 基础控件（计划中）

以下为待按需薄封装的控件参考规格；每完成一个控件后，将其详细规格迁入对应 `src/components/<name>/README.md` 并更新上方「已实现控件」索引表。

### SearchBox（搜索框）

参照 `@fluentui/react-search`。基于 `VfkInput` 扩展，前置搜索图标，聚焦或有值时后置清除按钮（点击清空并把焦点还给输入框）。尺寸与外观同 `VfkInput`。

### Combobox（可输入自动完成）

参照 `@fluentui/react-combobox` 与 `<fluent-combobox>`（含 `Option`、`OptionGroup`）。

- **触发器**：可自由输入的文本框，支持按输入过滤选项；`size` 支持 `small` / `medium` / `large`，`appearance` 支持 `outline` / `underline` / `filled-darker` / `filled-lighter`。
- **弹出列表（`Listbox`）**：底色 `colorNeutralBackground1`，圆角 `borderRadiusMedium`，阴影 `shadow16`，层级 `zIndexFloating`。
- **选项（`Option`）**：圆角 `borderRadiusMedium`，字号 `fontSizeBase300` / 行高 `lineHeightBase300`，选中项带勾选图标。
- **键盘交互**：上下方向键移动活动项，`Enter` 选中，`Escape` 收起，点击外部收起。

### SwatchPicker（色板单选）

参照 `@fluentui/react-swatch-picker`（`SwatchPicker` 与 `ColorSwatch`）。

- **结构**：容器 `role="radiogroup"`，单个色块 `role="radio"`，以 `aria-checked` 标识选中。
- **尺寸（`size`）**：`extra-small`（`20×20px`）、`small`（`24×24px`）、`medium`（默认，`28×28px`）、`large`（`32×32px`）。
- **形状（`shape`）**：`square`（默认，`borderRadiusNone`）、`rounded`（`borderRadiusMedium`）、`circular`（`borderRadiusCircular`）。
- **选中与悬停**：选中态使用双层内阴影 `inset 0 0 0 strokeWidthThicker colorBrandStroke1, inset 0 0 0 5px colorStrokeFocus1`（小尺寸缩减描边宽度），保证在深浅色块上都清晰可见。

### Tabs（标签页）

参照 `@fluentui/react-tabs`（`TabList` 与 `Tab`）。

- **方向（`vertical`）**：水平（默认）或垂直。
- **外观（`appearance`）**：
  - `transparent`（默认）：透明底，悬停 `colorTransparentBackgroundHover`。
  - `subtle`：悬停 `colorSubtleBackgroundHover`。
  - `subtle-circular` / `filled-circular`：圆角 `borderRadiusCircular` 的胶囊标签页。
- **尺寸（`size`）**：
  - `small`：水平内边距 `spacingVerticalSNudge spacingHorizontalSNudge`（垂直模式为 `spacingVerticalXXS spacingHorizontalSNudge`），排版 `body1`。
  - `medium`（默认）：水平内边距 `spacingVerticalM spacingHorizontalMNudge`（垂直模式为 `spacingVerticalSNudge spacingHorizontalMNudge`），排版 `body1`。
  - `large`：水平内边距 `spacingVerticalL spacingHorizontalMNudge`（垂直模式为 `spacingVerticalS spacingHorizontalMNudge`），排版 `body2`。
- **选中指示条**：默认在选中项底部（垂直模式在左侧）绘制圆角 `borderRadiusCircular`、厚度 `strokeWidthThicker`（水平 `small` 为 `strokeWidthThick`）、背景 `colorCompoundBrandStroke` 的指示条；选中文字字重 `fontWeightSemibold`（通过预留宽度避免切换抖动）。

### Menu（浮层菜单）

参照 `@fluentui/react-menu`（`Menu`、`MenuTrigger`、`MenuPopover`、`MenuList`、`MenuItem`、`MenuItemCheckbox`、`MenuItemRadio`、`MenuDivider`、`MenuGroup`）。

- **弹出面板（`MenuPopover`）**：
  - 底色 `colorNeutralBackground1`，圆角 `borderRadiusMedium`，阴影 `shadow16`，内边距 `4px`，1px 透明轮廓用于高对比度，层级 `zIndexPopup`。
- **菜单项（`MenuItem`）**：
  - 最小高 `32px`，圆角 `borderRadiusMedium`，内边距 `spacingVerticalSNudge`（`6px`），字号 `fontSizeBase300` / 行高 `lineHeightBase300`，文字 `colorNeutralForeground2`。
  - 悬停或键盘聚焦时底色 `colorNeutralBackground1Hover`、文字 `colorNeutralForeground2Hover`；按下底色 `colorNeutralBackground1Pressed`。
  - 支持前置图标（`20px`）、快捷键提示（`secondaryContent`）、子菜单箭头以及勾选/单选变体。
- **键盘交互**：上下方向键切换焦点，右方向键展开子菜单，左方向键或 `Escape` 收起。

---

## 组合与反馈控件

### Dialog（对话框）

参照 `@fluentui/react-dialog`（`Dialog`、`DialogTrigger`、`DialogSurface`、`DialogTitle`、`DialogBody`、`DialogContent`、`DialogActions`）。

- **模态类型（`modalType`）**：
  - `modal`（默认）：带遮罩，开启焦点陷阱（Tab 在弹窗内循环），点击遮罩或按 `Escape` 触发 `onOpenChange` 关闭。
  - `non-modal`：无遮罩，不锁背景焦点，右上角默认提供关闭按钮。
  - `alert`：带遮罩，开启焦点陷阱，点击遮罩不关闭，用于必须显式确认的操作。
- **遮罩（`backdrop`）**：固定定位铺满视口，底色 `colorBackgroundOverlay`，不加背景模糊。
- **面板（`DialogSurface`）**：
  - 默认最大宽 `600px`，最大高 `100dvh`，内边距 `24px`，圆角 `borderRadiusXLarge`（`8px`），底色 `colorNeutralBackground1`，文字 `colorNeutralForeground1`，阴影 `shadow64`，边框 `1px solid colorTransparentStroke`，层级 `zIndexPopup`。
- **内部排版**：
  - `DialogTitle`：采用 `subtitle1`（`20px` / `28px` / `600`）。
  - `DialogContent`：采用 `body1`（`14px` / `20px` / `400`）。
  - `DialogActions`：操作按钮区，默认右对齐，按钮间距 `spacingHorizontalS`。

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

### Drawer 与 NavDrawer（抽屉与侧栏导航）

参照 `@fluentui/react-drawer` 与 `@fluentui/react-nav`。

- **类型（`type`）**：`overlay`（模态浮层，带遮罩与 `shadow64`）与 `inline`（内嵌并排，与内容区用边框分隔）。
- **位置与尺寸**：`position` 支持 `start`（默认，左）、`end`（右）、`bottom`；`size` 支持 `small`（`320px`）、`medium`（`592px`）、`large`（`940px`）、`full`（`100vw`）；`NavDrawer` 默认宽 `260px`，底色 `colorNeutralBackground4`。
- **导航项（`NavItem`）**：圆角 `borderRadiusMedium`，内边距 `spacingVerticalMNudge spacingHorizontalS spacingVerticalMNudge spacingHorizontalMNudge`，排版 `body1`，悬停底色 `colorNeutralBackground4Hover`，选中项左侧带 `4×20px` 的品牌色竖条。

---

## 其它官方组件与项目边界

- **按需补充的官方组件**：`Divider`（分隔线）、`Spinner`（加载圈）、`Accordion`（折叠面板）、`Avatar`（头像）、`Breadcrumb`（面包屑）、`Toolbar`（工具栏）、`Tree`（树）在 `@fluentui/react-components` 中均有标准定义，后续需要时直接按官方规格排入开发。
- **图表**：折线图等数据可视化在官方仓库独立于 `@fluentui/react-components`，位于 `@fluentui/react-charts`，配色取自 `colorPalette*` 与 `colorBrand*`，不混入基础控件包。
- **不进控件库的应用层逻辑**：
  - 业务视图组件、页面级顶栏与固定吸顶计算、浏览器全屏 API 调用、隐藏文件框拖放上传层。
  - 状态管理（`store`）、路由、PWA、本地存储键（如主题持久化键）、音效。
