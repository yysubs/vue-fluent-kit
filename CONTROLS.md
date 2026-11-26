# 控件清单

本库控件规格直接参照 Fluent UI v9 官方组件（`@fluentui/react-components`），样式与 token 取值见 [TOKENS.md](TOKENS.md)。组件类名统一加 `vfk-` 前缀，不用 `<style scoped>`，所有颜色、圆角、间距、字号、描边、阴影和动效均通过官方同名 CSS 变量驱动。

## 通用约定

| 项目 | 约定 |
| --- | --- |
| 主题切换 | 根节点或局部容器设置 `data-vfk-theme="light"`（默认）或 `data-vfk-theme="dark"` |
| 基础排版 | 字体 `var(--fontFamilyBase)`，正文默认对应 `body1`（`14px` / `20px` / `400`），数字等宽场景用 `font-variant-numeric: tabular-nums` |
| 焦点环 | 键盘聚焦（`:focus-visible`）使用 `colorStrokeFocus2`（`2px` 外框）配合 `colorStrokeFocus1`（`1px` 内衬）或组件专属焦点描边；输入框类采用底部 `2px` 品牌色高亮条 |
| 禁用态 | 统一使用 `colorNeutralBackgroundDisabled`、`colorNeutralForegroundDisabled`、`colorNeutralStrokeDisabled`，不依赖浏览器原生默认禁用外观；支持 `disabledFocusable` 的控件用 `aria-disabled="true"` 保持焦点可达 |
| 高对比度 | 适配 `@media (forced-colors: active)`，使用系统高对比度关键字（`Highlight`、`HighlightText`、`GrayText`、`ButtonText`） |
| 减少动效 | `@media (prefers-reduced-motion: reduce)` 下过渡与动画时长降为 `0.01ms` |

---

## 基础控件

### Button（按钮）

参照 `@fluentui/react-button`（含 `Button` 与 `ToggleButton`）。

- **外观（`appearance`）**：
  - `secondary`（默认）：背景 `colorNeutralBackground1`（悬停 `Hover`、按下 `Pressed`），文字 `colorNeutralForeground1`，边框 `1px solid colorNeutralStroke1`。
  - `primary`：背景 `colorBrandBackground`（悬停 `Hover`、按下 `Pressed`），文字 `colorNeutralForegroundOnBrand`，透明边框。
  - `outline`：背景 `colorTransparentBackground`（悬停 `Hover`、按下 `Pressed`），边框 `colorNeutralStroke1`。
  - `subtle`：背景 `colorSubtleBackground`（悬停 `Hover`、按下 `Pressed`），文字 `colorNeutralForeground2`（悬停伴随品牌色图标高亮），透明边框。
  - `transparent`：背景透明，文字 `colorNeutralForeground2`（悬停 `colorNeutralForeground2BrandHover`、按下 `BrandPressed`），透明边框。
- **形状（`shape`）**：`rounded`（默认，`borderRadiusMedium`）、`circular`（`borderRadiusCircular`）、`square`（`borderRadiusNone`）。
- **尺寸（`size`）**：
  - `small`：最小宽 `64px`（仅图标为 `24×24px`），内边距 `3px spacingHorizontalS`（带图标上下 `1px`），字号 `fontSizeBase200` / 行高 `lineHeightBase200`，字重 `fontWeightRegular`，图标 `20px`。
  - `medium`（默认）：最小宽 `96px`（仅图标为 `32×32px`），内边距 `5px spacingHorizontalM`，字号 `fontSizeBase300` / 行高 `lineHeightBase300`，字重 `fontWeightSemibold`，图标 `20px`。
  - `large`：最小宽 `96px`（仅图标为 `40×40px`），内边距 `8px spacingHorizontalL`（带图标上下 `7px`），字号 `fontSizeBase400` / 行高 `lineHeightBase400`，字重 `fontWeightSemibold`，图标 `24px`。
- **切换态（`ToggleButton`）**：通过 `aria-pressed` 表示选中；`secondary` 选中底色 `colorNeutralBackground1Selected`，`primary` 选中底色 `colorBrandBackgroundSelected`。点击切换 `pressed`，支持受控 `modelValue`。
- **Vue 接口**：导出 `VButton` 与 `VToggleButton`。属性为 `appearance`、`shape`、`size`、`disabled`、`disabledFocusable`、`type`；`VToggleButton` 另有 `modelValue`。常规 `disabled` 使用原生禁用属性，`disabledFocusable` 用 `aria-disabled` 并阻止点击触发，保持键盘焦点可达。默认 `type="button"`，避免表单中意外提交。
- **图标与内容**：默认插槽放置按钮内容；`icon` 前置插槽、`icon-only` 类可用于仅图标按钮。仅图标按钮的可访问名称由调用方通过 `aria-label` 提供。
- **过渡**：`background, border, color`，时长 `durationFaster`，曲线 `curveEasyEase`。
- **可访问性**：保留原生 `<button>` 键盘操作；`VToggleButton` 以 `aria-pressed` 暴露状态；聚焦环使用通用约定中的双层颜色，高对比度模式使用系统颜色。
- **手动验证**：预览页覆盖外观、尺寸、形状、禁用、仅图标和切换态，并检查浅色/深色主题及键盘焦点。

### Input（文本输入）

参照 `@fluentui/react-input`。外层容器包原生 `<input>`，支持前后缀插槽（`contentBefore` / `contentAfter`）。

- **外观（`appearance`）**：
  - `outline`（默认）：底色 `colorNeutralBackground1`，三边 `1px solid colorNeutralStroke1`，底边 `colorNeutralStrokeAccessible`。
  - `underline`：底色透明，无圆角，仅底边 `1px solid colorNeutralStrokeAccessible`。
  - `filled-darker`：底色 `colorNeutralBackground3`，边框透明。
  - `filled-lighter`：底色 `colorNeutralBackground1`，边框透明。
- **尺寸（`size`）**：
  - `small`：最小高 `24px`，排版 `caption1`（`12px` / `16px`），无插槽时左右内边距 `spacingHorizontalS`。
  - `medium`（默认）：最小高 `32px`，排版 `body1`（`14px` / `20px`），无插槽时左右内边距 `spacingHorizontalM`。
  - `large`：最小高 `40px`，排版 `body2`（`16px` / `22px`），无插槽时左右内边距 `calc(spacingHorizontalM + spacingHorizontalSNudge)`。
- **焦点与校验**：
  - `:focus-within` 时底部伪元素绘制 `2px solid colorCompoundBrandStroke` 指示线（按圆角裁切底角），聚焦展开 `transform: scaleX(1)`（时长 `durationNormal`、曲线 `curveDecelerateMid`），失焦收起 `transform: scaleX(0)`（时长 `durationUltraFast`、曲线 `curveAccelerateMid`）。
  - 校验错误（`aria-invalid="true"`）在非聚焦态下边框变为 `colorPaletteRedBorder2`。

### Field（表单字段）

参照 `@fluentui/react-field`。组合标签（`Label`）、表单控件、校验状态图标与消息（`validationMessage`）、提示文字（`hint`）。

- **方向（`orientation`）**：`vertical`（默认，标签在上）或 `horizontal`（标签在左，占固定列宽）。
- **校验状态（`validationState`）**：
  - `error`：消息与图标用 `colorPaletteRedForeground1`，给内部控件透传 `aria-invalid="true"`。
  - `warning`：图标用 `colorPaletteDarkOrangeForeground1`。
  - `success`：图标用 `colorPaletteGreenForeground1`。
  - `none`：仅展示 `hint`（`caption1`，颜色 `colorNeutralForeground3`）。

### SearchBox（搜索框）

参照 `@fluentui/react-search`。基于 `Input` 扩展，前置搜索图标，聚焦或有值时后置清除按钮（点击清空并把焦点还给输入框）。尺寸与外观同 `Input`。

### Select（原生下拉）

参照 `@fluentui/react-select`。外层包裹原生 `<select>` 与右侧展开箭头图标。

- **尺寸（`size`）**：`small`（高 `24px`）、`medium`（默认，高 `32px`）、`large`（高 `40px`），字号与内边距对齐 `Input`。
- **外观（`appearance`）**：`outline`（默认）、`underline`、`filled-darker`、`filled-lighter`，聚焦底部高亮条和禁用态与 `Input` 一致。

### Combobox 与 Dropdown（带选项下拉与自动完成）

参照 `@fluentui/react-combobox`（含 `Combobox`、`Dropdown`、`Listbox`、`Option`、`OptionGroup`）。

- **区分**：`Combobox` 触发器为可自由输入的文本框，支持按输入过滤选项；`Dropdown` 触发器为不可编辑的按钮。两者共用弹出层 `Listbox` 和选项 `Option`。
- **触发器尺寸与外观**：`size` 支持 `small`（`24px`）/ `medium`（`32px`）/ `large`（`40px`）；`appearance` 支持 `outline` / `underline` / `filled-darker` / `filled-lighter`。
- **弹出列表（`Listbox`）**：
  - 底色 `colorNeutralBackground1`，圆角 `borderRadiusMedium`，阴影 `shadow16`，内边距 `spacingHorizontalXS`，项间距 `spacingHorizontalXXS`，最小宽 `160px`，层级 `zIndexFloating`。
- **选项（`Option`）**：
  - 圆角 `borderRadiusMedium`，内边距 `spacingVerticalSNudge spacingHorizontalS`，字号 `fontSizeBase300` / 行高 `lineHeightBase300`，文字 `colorNeutralForeground1`。
  - 悬停底色 `colorNeutralBackground1Hover`，按下底色 `colorNeutralBackground1Pressed`；键盘活动项（`aria-activedescendant`）绘制 `2px solid colorStrokeFocus2` 焦点框。
  - 单选或多选时选中项带勾选图标。
- **键盘交互**：上下方向键移动活动项，`Enter` 选中，`Escape` 收起，点击外部收起。

### Checkbox（勾选框）

参照 `@fluentui/react-checkbox`。内部用隐藏的原生 `<input type="checkbox">` 承接焦点与键盘事件，外显指示器与标签。

- **尺寸（`size`）**：`medium`（默认，指示器 `16×16px`，图标 `12px`，点击热区宽 `32px`）、`large`（指示器 `20×20px`，图标 `16px`，点击热区宽 `36px`）。
- **形状（`shape`）**：`square`（默认，`borderRadiusSmall`，半选图标为圆角方块）、`circular`（`borderRadiusCircular`，半选图标为圆点）。
- **状态配色**：
  - 未选中：指示器透明底，边框 `1px solid colorNeutralStrokeAccessible`（悬停 `Hover`、按下 `Pressed`），标签 `colorNeutralForeground3`（悬停 `Foreground2`、按下 `Foreground1`）。
  - 选中（`checked`）：指示器底色与边框 `colorCompoundBrandBackground`（悬停 `Hover`、按下 `Pressed`），对勾 `colorNeutralForegroundInverted`，标签 `colorNeutralForeground1`。
  - 半选（`mixed` / `indeterminate`）：指示器透明底，边框 `colorCompoundBrandStroke`（悬停 `Hover`、按下 `Pressed`），内部方块或圆点 `colorCompoundBrandForeground1`（悬停 `Hover`、按下 `Pressed`），标签 `colorNeutralForeground1`。
  - 禁用：覆盖选中与半选配色，指示器透明底、边框 `colorNeutralStrokeDisabled`，图标、标签与必填星号均为 `colorNeutralForegroundDisabled`。
- **Vue 接口**：导出 `VCheckbox`。属性为 `modelValue`（`boolean | 'mixed'`，默认 `false`）、`size`、`shape`、`disabled`、`label`、`labelPosition`（`'after'` 默认 | `'before'`）、`required`、`id`（未传时通过 `useId()` 自动生成）；事件为 `update:modelValue`（载荷为 `boolean`）与 `change`；暴露 `{ input, focus, blur }`。关闭默认属性继承，`class` 与 `style` 作用于外层 `.vfk-checkbox`，其余原生属性透传给内部 `<input>`。
- **三态与半选同步**：内部 `<input>` 同步绑定 `:checked="modelValue === true"`、`:aria-checked="modelValue === 'mixed' ? 'mixed' : undefined"` 与 DOM `.indeterminate` 属性。用户点击或按空格切换时，`'mixed'` 与 `false` 均发出 `true`，`true` 发出 `false`；若父组件受控未更新 `modelValue`，原生 `.checked` 与 `.indeterminate` 立即重置回当前受控值。
- **标签与位置**：默认插槽优先于 `label` 属性，两者均未提供时不渲染 `<label>` 元素（纯框场景由调用方在组件上设置 `aria-label`）；`labelPosition` 控制标签位于指示器右侧（`after`）或左侧（`before`），多行标签换行时指示器保持首行顶部对齐；开启 `required` 且存在标签时追加 `aria-hidden="true"` 的必填星号（颜色 `colorPaletteRedForeground3`）；`indicator` 插槽可自定义指示器图标。
- **过渡**：指示器与文字的 `background, border-color, color`，时长 `durationFaster`，曲线 `curveEasyEase`。
- **可访问性**：保留原生 `<input type="checkbox">` 的焦点与空格键切换行为；当内部 `<input>` 处于 `:focus-visible` 时，在外层 `.vfk-checkbox` 绘制双层焦点轮廓（`2px solid colorStrokeFocus2` 外框配合 `1px` `colorStrokeFocus1` 内衬，圆角 `borderRadiusMedium`）；适配高对比度模式（`forced-colors: active`）与减少动效（`prefers-reduced-motion: reduce`）。
- **手动验证**：预览页覆盖未选中/选中/半选及全选联动、尺寸、形状、标签位置（在左/在右）、必填标识、无标签纯框和各状态禁用态，并检查浅色/深色主题及键盘焦点。

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

- **按需补充的官方组件**：`Switch`（开关）、`RadioGroup`（单选组）、`Divider`（分隔线）、`Spinner`（加载圈）、`Accordion`（折叠面板）、`Avatar`（头像）、`Breadcrumb`（面包屑）、`Toolbar`（工具栏）、`Tree`（树）在 `@fluentui/react-components` 中均有标准定义，后续需要时直接按官方规格排入开发。
- **图表**：折线图等数据可视化在官方仓库独立于 `@fluentui/react-components`，位于 `@fluentui/react-charts`，配色取自 `colorPalette*` 与 `colorBrand*`，不混入基础控件包。
- **不进控件库的应用层逻辑**：
  - 业务视图组件、页面级顶栏与固定吸顶计算、浏览器全屏 API 调用、隐藏文件框拖放上传层。
  - 状态管理（`store`）、路由、PWA、本地存储键（如主题持久化键）、音效。
