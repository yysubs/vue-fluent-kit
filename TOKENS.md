# 设计 token 契约

本库的 Design Tokens 采用 Fluent 2 官方规范，来源为 `@fluentui/tokens`（当前运行时依赖 `1.0.0-alpha.25`）。基础语义变量表由 `webLightTheme` / `webDarkTheme` 生成，两套主题各 459 个 token。

所有官方 token 以 CSS 自定义属性输出，变量名就是官方 token 名前面加 `--`，不加库前缀；本库新增的材质与品牌扩展变量使用 `--vfk*` 前缀，外层样式类统一使用 `vfk-` 前缀。CSS 变量天然穿透 `@fluentui/web-components` 的 Shadow DOM，因此修改任意作用域的 CSS 变量都会同步作用于对应的 Fluent 2 控件。

## 样式分层与构建产物

`src/styles/index.css` 按以下四层组织，库构建时由 `scripts/copy-style.mjs` 按顺序合并输出到 `dist/style.css`（对应导出 `@yysubs/vue-fluent-kit/style.css`）：

1. `src/styles/tokens.css`：Fluent 2 浅色/深色 459 项官方变量与层级变量（不手改）。
2. `src/styles/brand.css`：品牌字体与圆角覆写入口（`--vfkBrandFontFamily`、`--vfkBrandRadiusMedium`）。
3. `src/styles/surfaces.css`：Acrylic（亚克力）与 Mica（云母）材质变量及工具类。
4. `src/styles/components.css`：薄封装组件的外层 Light DOM 轻量布局样式（不穿透 Shadow DOM）。

## 命名

token 分四类：

- 全局 token：圆角、间距、字号、行高、字重、字体、描边宽度、时长、曲线、阴影。名字是刻度或用途，例如 `borderRadiusMedium`、`spacingHorizontalM`、`fontSizeBase300`、`durationNormal`。
- 语义颜色 token：`colorNeutral*`、`colorBrand*`、`colorStatus*`、`colorPalette*`。名字由「类别 + 用途 + 层级 + 状态」组成，例如 `colorNeutralBackground2Hover`、`colorBrandBackgroundPressed`、`colorStatusDangerBorder1`。
- 层级 token：`zIndex*`，带默认值，不放进主题。
- 扩展 token：`--vfkBrand*` 与 `--vfkSurface*`，用于品牌入口和 Acrylic / Mica 材质定制。

颜色 token 有固定的层级和状态后缀：

- Foreground 1–5、Background 1–8、Stroke 1–4，数字越大语义越弱或层级越靠后，具体按官方定义。
- 状态后缀：`Hover`、`Pressed`、`Selected`、`Disabled`、`Inverted`、`OnBrand`、`Static`、`Alpha`、`Active`。
- 状态色 success / warning / danger 各有 `Background1–3`、`Foreground1–3`、`ForegroundInverted`、`Border1/2/Active`；danger 的实心背景另有 `Background3Hover` / `Background3Pressed`。
- 调色板 token 是 35 种共享颜色的深浅名，给图表、头像、标签这类需要固定色相的地方用，不表达语义。

## 主题与运行时控制

`tokens.css` 静态输出两套主题变量，通过 `data-vfk-theme` 属性切换：

```css
:root,
[data-vfk-theme='light'] {
  color-scheme: light;
  /* webLightTheme 的 459 个 token */
}

[data-vfk-theme='dark'] {
  color-scheme: dark;
  /* webDarkTheme 的 459 个 token */
}
```

默认是浅色。项目要用深色，在 `html` 或任意容器上设置 `data-vfk-theme="dark"`；属性会往下继承，也能嵌套，深色区域里再放 `data-vfk-theme="light"` 就回到浅色。

运行时主题与品牌色控制由 `src/theme/` 提供（支持根入口或子路径 `@yysubs/vue-fluent-kit/theme` 导入）：

- `useTheme()`：全局响应式主题控制器，支持 `'light' | 'dark' | 'system'` 三种模式，自动监听系统配色变化并同步到 `document.documentElement`。
- `setVfkTheme(mode, target?)`：设置全局或指定 DOM 节点的 `data-vfk-theme`。
- `VfkThemeProvider`：局部主题与品牌色容器组件，支持 `theme`（`'light' | 'dark'`）、`brand`（`BrandVariants`）与 `as`（默认 `'div'`）。
- `applyBrandTokens(brand, resolved?, target?)` / `resetBrandTokens(target?)`：调用 `@fluentui/tokens` 的 `createLightTheme(brand)` / `createDarkTheme(brand)` 生成整套品牌色变量（名称含 `Brand` 的 token）并写入节点行内样式，清除时恢复默认主题色。

覆盖方式：

- 单个 token 可在任意作用域重写，例如只给某个面板换底色。
- 换品牌色时使用 `applyBrandTokens(brand)` 或按 `createLightTheme(brand)` / `createDarkTheme(brand)` 成套替换，避免只改 `colorBrandBackground` 导致 Hover/Pressed、前景与描边不匹配。
- 高对比度依赖系统 `@media (forced-colors: active)`，不单独出高对比度主题。

## 品牌与材质扩展变量

### 品牌覆写入口（`brand.css`）

| CSS 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `--vfkBrandFontFamily` | `var(--fontFamilyBase)` | 品牌默认字体入口 |
| `--vfkBrandRadiusMedium` | `var(--borderRadiusMedium)` | 品牌默认中等圆角入口 |

### Acrylic 与 Mica 材质（`surfaces.css`）

| CSS 变量 | Light | Dark | 说明 |
| --- | --- | --- | --- |
| `--vfkSurfaceAcrylicBg` | `rgba(252, 252, 252, 0.78)` | `rgba(36, 36, 36, 0.76)` | 亚克力半透明填充色 |
| `--vfkSurfaceAcrylicBgFallback` | `var(--colorNeutralBackground1)` | `var(--colorNeutralBackground2)` | 不支持模糊或减少透明时的回退底色 |
| `--vfkSurfaceAcrylicBlur` | `24px` | `24px` | 亚克力背景模糊半径 |
| `--vfkSurfaceAcrylicSaturate` | `1.4` | `1.3` | 亚克力背景饱和度增强系数 |
| `--vfkSurfaceAcrylicBorder` | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.08)` | 亚克力高光描边色 |
| `--vfkSurfaceMicaBg` | 品牌微染色渐变 + `colorNeutralBackground2` | 品牌微染色渐变 + `colorNeutralBackground2` | 云母主画布背景 |
| `--vfkSurfaceMicaCardBg` | `rgba(255, 255, 255, 0.76)` | `rgba(41, 41, 41, 0.74)` | 云母表面上的半透明卡片背景 |
| `--vfkSurfaceMicaBorder` | `var(--colorNeutralStroke2)` | `var(--colorNeutralStroke2)` | 云母卡片边框色 |

配套样式类：

- `.vfk-surface-acrylic`：应用亚克力背景、高光边框和 `backdrop-filter`，在不支持 `backdrop-filter` 或开启 `prefers-reduced-transparency: reduce` 时自动回退为 `--vfkSurfaceAcrylicBgFallback`。
- `.vfk-surface-mica`：应用云母低饱和品牌染色画布。
- `.vfk-surface-mica-card`：应用云母卡片背景与边框；在 `prefers-reduced-transparency: reduce` 下回退为 `--colorNeutralBackground1`。

## 颜色

官方颜色 token 分三块：184 个语义色、32 个状态色、150 个调色板色。完整取值在附录 A。

### 中性色

`colorNeutral*` 覆盖页面、面板、卡片、文字、边框、禁用态、反色和遮罩：

- Foreground 1–5：按强度递减的文字和图标颜色，1 最强，5 最弱。
- Background 1–8：页面、卡片、次级面板、浮层。
- Stroke 1–4：按强度递减的边框颜色，1 最强。
- `colorNeutralCardBackground*` 是卡片专用底色，`colorNeutralStencil*` 是占位块。
- `colorBackgroundOverlay`、`colorScrollbarOverlay` 是遮罩和滚动条。
- `colorStrokeFocus1/2` 是焦点环的两层颜色。

### 品牌色

`colorBrand*`、`colorCompoundBrand*` 来自 16 级品牌色阶（`brandWeb`，10–160），覆盖前景、背景、描边和 Hover/Pressed/Selected。默认品牌色是 Fluent 的蓝。

### 状态色

- success 对应 green，warning 对应 orange，danger 对应 cranberry。
- 填充用 `Background3`，浅底用 `Background1/2`，文字用 `Foreground1/2/3`，边框用 `Border1/2`，强调边框用 `BorderActive`。
- `ForegroundInverted` 是状态色上的反白文字。

### 调色板

`colorPalette*` 是 35 种共享颜色的深浅名，例如 `colorPaletteRedBackground1`、`colorPaletteGreenForeground2`。它不表达语义，用在哪由使用方决定。


## 排版

### 字体族

| Token | 值 |
| --- | --- |
| `fontFamilyBase` | `'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif` |
| `fontFamilyMonospace` | `Consolas, 'Courier New', Courier, monospace` |
| `fontFamilyNumeric` | `Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif` |

### 字号与行高

| 字号 token | 字号 | 行高 token | 行高 |
| --- | --- | --- | --- |
| `fontSizeBase100` | `10px` | `lineHeightBase100` | `14px` |
| `fontSizeBase200` | `12px` | `lineHeightBase200` | `16px` |
| `fontSizeBase300` | `14px` | `lineHeightBase300` | `20px` |
| `fontSizeBase400` | `16px` | `lineHeightBase400` | `22px` |
| `fontSizeBase500` | `20px` | `lineHeightBase500` | `28px` |
| `fontSizeBase600` | `24px` | `lineHeightBase600` | `32px` |
| `fontSizeHero700` | `28px` | `lineHeightHero700` | `36px` |
| `fontSizeHero800` | `32px` | `lineHeightHero800` | `40px` |
| `fontSizeHero900` | `40px` | `lineHeightHero900` | `52px` |
| `fontSizeHero1000` | `68px` | `lineHeightHero1000` | `92px` |

### 字重

| Token | 值 |
| --- | --- |
| `fontWeightRegular` | `400` |
| `fontWeightMedium` | `500` |
| `fontWeightSemibold` | `600` |
| `fontWeightBold` | `700` |

### 组合样式

官方 `typographyStyles` 有 17 个组合样式，字体族统一是 `fontFamilyBase`。本库把这些样式做成同名的类，值如下。

| 样式 | 字号 | 行高 | 字重 |
| --- | --- | --- | --- |
| `body1` | `14px` | `20px` | `400` |
| `body1Strong` | `14px` | `20px` | `600` |
| `body1Stronger` | `14px` | `20px` | `700` |
| `body2` | `16px` | `22px` | `400` |
| `caption1` | `12px` | `16px` | `400` |
| `caption1Strong` | `12px` | `16px` | `600` |
| `caption1Stronger` | `12px` | `16px` | `700` |
| `caption2` | `10px` | `14px` | `400` |
| `caption2Strong` | `10px` | `14px` | `600` |
| `subtitle1` | `20px` | `28px` | `600` |
| `subtitle2` | `16px` | `22px` | `600` |
| `subtitle2Stronger` | `16px` | `22px` | `700` |
| `title1` | `32px` | `40px` | `600` |
| `title2` | `28px` | `36px` | `600` |
| `title3` | `24px` | `32px` | `600` |
| `largeTitle` | `40px` | `52px` | `600` |
| `display` | `68px` | `92px` | `600` |

## 圆角

11 档，两套主题相同。按钮和输入框用 `borderRadiusMedium`，勾选框用 `borderRadiusSmall`，卡片按尺寸用 `borderRadiusSmall/Medium/Large`，对话框用 `borderRadiusXLarge`，具体按对应官方组件。

| Token | 值 |
| --- | --- |
| `borderRadiusNone` | `0` |
| `borderRadiusSmall` | `2px` |
| `borderRadiusMedium` | `4px` |
| `borderRadiusLarge` | `6px` |
| `borderRadiusXLarge` | `8px` |
| `borderRadius2XLarge` | `12px` |
| `borderRadius3XLarge` | `16px` |
| `borderRadius4XLarge` | `24px` |
| `borderRadius5XLarge` | `32px` |
| `borderRadius6XLarge` | `40px` |
| `borderRadiusCircular` | `10000px` |

## 描边宽度

| Token | 值 |
| --- | --- |
| `strokeWidthThin` | `1px` |
| `strokeWidthThick` | `2px` |
| `strokeWidthThicker` | `3px` |
| `strokeWidthThickest` | `4px` |

## 间距

水平和垂直各 11 档，两套主题相同。组件内边距和间距用这些 token，不写死像素。

| 档位 | 水平 token | 垂直 token | 值 |
| --- | --- | --- | --- |
| `None` | `spacingHorizontalNone` | `spacingVerticalNone` | `0` |
| `XXS` | `spacingHorizontalXXS` | `spacingVerticalXXS` | `2px` |
| `XS` | `spacingHorizontalXS` | `spacingVerticalXS` | `4px` |
| `SNudge` | `spacingHorizontalSNudge` | `spacingVerticalSNudge` | `6px` |
| `S` | `spacingHorizontalS` | `spacingVerticalS` | `8px` |
| `MNudge` | `spacingHorizontalMNudge` | `spacingVerticalMNudge` | `10px` |
| `M` | `spacingHorizontalM` | `spacingVerticalM` | `12px` |
| `L` | `spacingHorizontalL` | `spacingVerticalL` | `16px` |
| `XL` | `spacingHorizontalXL` | `spacingVerticalXL` | `20px` |
| `XXL` | `spacingHorizontalXXL` | `spacingVerticalXXL` | `24px` |
| `XXXL` | `spacingHorizontalXXXL` | `spacingVerticalXXXL` | `32px` |

## 动效

时长 8 档，曲线 9 条，两套主题相同。

| Token | 值 |
| --- | --- |
| `durationUltraFast` | `50ms` |
| `durationFaster` | `100ms` |
| `durationFast` | `150ms` |
| `durationNormal` | `200ms` |
| `durationGentle` | `250ms` |
| `durationSlow` | `300ms` |
| `durationSlower` | `400ms` |
| `durationUltraSlow` | `500ms` |

| Token | 值 |
| --- | --- |
| `curveAccelerateMax` | `cubic-bezier(0.9,0.1,1,0.2)` |
| `curveAccelerateMid` | `cubic-bezier(1,0,1,1)` |
| `curveAccelerateMin` | `cubic-bezier(0.8,0,0.78,1)` |
| `curveDecelerateMax` | `cubic-bezier(0.1,0.9,0.2,1)` |
| `curveDecelerateMid` | `cubic-bezier(0,0,0,1)` |
| `curveDecelerateMin` | `cubic-bezier(0.33,0,0.1,1)` |
| `curveEasyEaseMax` | `cubic-bezier(0.8,0,0.2,1)` |
| `curveEasyEase` | `cubic-bezier(0.33,0,0.67,1)` |
| `curveLinear` | `cubic-bezier(0,0,1,1)` |

## 阴影

6 档高度加 6 个品牌变体。阴影颜色来自主题，所以深浅两套的值不同。

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `shadow2` | `0 0 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)` | `0 0 2px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.28)` |
| `shadow4` | `0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)` | `0 0 2px rgba(0,0,0,0.24), 0 2px 4px rgba(0,0,0,0.28)` |
| `shadow8` | `0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14)` | `0 0 2px rgba(0,0,0,0.24), 0 4px 8px rgba(0,0,0,0.28)` |
| `shadow16` | `0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)` | `0 0 2px rgba(0,0,0,0.24), 0 8px 16px rgba(0,0,0,0.28)` |
| `shadow28` | `0 0 8px rgba(0,0,0,0.12), 0 14px 28px rgba(0,0,0,0.14)` | `0 0 8px rgba(0,0,0,0.24), 0 14px 28px rgba(0,0,0,0.28)` |
| `shadow64` | `0 0 8px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.14)` | `0 0 8px rgba(0,0,0,0.24), 0 32px 64px rgba(0,0,0,0.28)` |
| `shadow2Brand` | `0 0 2px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.25)` | `0 0 2px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.25)` |
| `shadow4Brand` | `0 0 2px rgba(0,0,0,0.30), 0 2px 4px rgba(0,0,0,0.25)` | `0 0 2px rgba(0,0,0,0.30), 0 2px 4px rgba(0,0,0,0.25)` |
| `shadow8Brand` | `0 0 2px rgba(0,0,0,0.30), 0 4px 8px rgba(0,0,0,0.25)` | `0 0 2px rgba(0,0,0,0.30), 0 4px 8px rgba(0,0,0,0.25)` |
| `shadow16Brand` | `0 0 2px rgba(0,0,0,0.30), 0 8px 16px rgba(0,0,0,0.25)` | `0 0 2px rgba(0,0,0,0.30), 0 8px 16px rgba(0,0,0,0.25)` |
| `shadow28Brand` | `0 0 8px rgba(0,0,0,0.30), 0 14px 28px rgba(0,0,0,0.25)` | `0 0 8px rgba(0,0,0,0.30), 0 14px 28px rgba(0,0,0,0.25)` |
| `shadow64Brand` | `0 0 8px rgba(0,0,0,0.30), 0 32px 64px rgba(0,0,0,0.25)` | `0 0 8px rgba(0,0,0,0.30), 0 32px 64px rgba(0,0,0,0.25)` |

## 层级

官方把层级做成带默认值的 token，不放进主题：组件写 `var(--zIndexPopup, 2000)`，页面可以覆盖，不覆盖就用默认值。

| Token | 默认值 |
| --- | --- |
| `zIndexBackground` | `0` |
| `zIndexContent` | `1` |
| `zIndexOverlay` | `1000` |
| `zIndexPopup` | `2000` |
| `zIndexMessages` | `3000` |
| `zIndexFloating` | `4000` |
| `zIndexPriority` | `5000` |
| `zIndexDebug` | `6000` |

## 尺寸

官方不把控件尺寸做成 token。按钮、输入框、勾选框、对话框的宽高和内边距按官方组件的规格写在 [CONTROLS.md](CONTROLS.md)，用上面这些 token 拼出来。token 契约里不出现 32px 按钮、600px 对话框这类数字。

## 业务色

账号色 `--tone-0` 到 `--tone-7`、印章色 `--stamp` 属于项目自己的颜色，官方没有对应 token，由项目侧定义。库不引用这些名字，也不把它们写进主题。

## 和官方的差异

- 没有 `FluentProvider`，主题用 `data-vfk-theme` 属性切换，CSS 变量是公开接口。
- 只出 web 的浅色和深色两套，不出 Teams 主题和高对比度主题。
- 换品牌色需要项目自己生成整套品牌 token，库不提供运行时主题生成。

## 附录 A：颜色 token 完整取值

共 366 个颜色 token：184 个语义色、32 个状态色、150 个调色板色。两列分别是 `webLightTheme` 和 `webDarkTheme` 的值。

### 中性前景（colorNeutralForeground）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorNeutralForeground1` | `#242424` | `#ffffff` |
| `colorNeutralForeground1Hover` | `#242424` | `#ffffff` |
| `colorNeutralForeground1Pressed` | `#242424` | `#ffffff` |
| `colorNeutralForeground1Selected` | `#242424` | `#ffffff` |
| `colorNeutralForeground2` | `#424242` | `#d6d6d6` |
| `colorNeutralForeground2Hover` | `#242424` | `#ffffff` |
| `colorNeutralForeground2Pressed` | `#242424` | `#ffffff` |
| `colorNeutralForeground2Selected` | `#242424` | `#ffffff` |
| `colorNeutralForeground2BrandHover` | `#0f6cbd` | `#479ef5` |
| `colorNeutralForeground2BrandPressed` | `#115ea3` | `#2886de` |
| `colorNeutralForeground2BrandSelected` | `#0f6cbd` | `#479ef5` |
| `colorNeutralForeground3` | `#616161` | `#adadad` |
| `colorNeutralForeground3Hover` | `#424242` | `#d6d6d6` |
| `colorNeutralForeground3Pressed` | `#424242` | `#d6d6d6` |
| `colorNeutralForeground3Selected` | `#424242` | `#d6d6d6` |
| `colorNeutralForeground3BrandHover` | `#0f6cbd` | `#479ef5` |
| `colorNeutralForeground3BrandPressed` | `#115ea3` | `#2886de` |
| `colorNeutralForeground3BrandSelected` | `#0f6cbd` | `#479ef5` |
| `colorNeutralForeground4` | `#707070` | `#999999` |
| `colorNeutralForeground5` | `#616161` | `#adadad` |
| `colorNeutralForeground5Hover` | `#242424` | `#ffffff` |
| `colorNeutralForeground5Pressed` | `#242424` | `#ffffff` |
| `colorNeutralForeground5Selected` | `#242424` | `#ffffff` |
| `colorNeutralForegroundDisabled` | `#bdbdbd` | `#5c5c5c` |
| `colorNeutralForegroundInvertedDisabled` | `rgba(255, 255, 255, 0.4)` | `rgba(255, 255, 255, 0.4)` |
| `colorNeutralForeground2Link` | `#424242` | `#d6d6d6` |
| `colorNeutralForeground2LinkHover` | `#242424` | `#ffffff` |
| `colorNeutralForeground2LinkPressed` | `#242424` | `#ffffff` |
| `colorNeutralForeground2LinkSelected` | `#242424` | `#ffffff` |
| `colorNeutralForeground1Static` | `#242424` | `#242424` |
| `colorNeutralForegroundStaticInverted` | `#ffffff` | `#ffffff` |
| `colorNeutralForegroundInverted` | `#ffffff` | `#242424` |
| `colorNeutralForegroundInvertedHover` | `#ffffff` | `#242424` |
| `colorNeutralForegroundInvertedPressed` | `#ffffff` | `#242424` |
| `colorNeutralForegroundInvertedSelected` | `#ffffff` | `#242424` |
| `colorNeutralForegroundInverted2` | `#ffffff` | `#242424` |
| `colorNeutralForegroundOnBrand` | `#ffffff` | `#ffffff` |
| `colorNeutralForegroundInvertedLink` | `#ffffff` | `#ffffff` |
| `colorNeutralForegroundInvertedLinkHover` | `#ffffff` | `#ffffff` |
| `colorNeutralForegroundInvertedLinkPressed` | `#ffffff` | `#ffffff` |
| `colorNeutralForegroundInvertedLinkSelected` | `#ffffff` | `#ffffff` |

### 品牌前景（colorBrandForeground / colorCompoundBrandForeground）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorBrandForegroundLink` | `#115ea3` | `#479ef5` |
| `colorBrandForegroundLinkHover` | `#0f548c` | `#62abf5` |
| `colorBrandForegroundLinkPressed` | `#0c3b5e` | `#2886de` |
| `colorBrandForegroundLinkSelected` | `#115ea3` | `#479ef5` |
| `colorCompoundBrandForeground1` | `#0f6cbd` | `#479ef5` |
| `colorCompoundBrandForeground1Hover` | `#115ea3` | `#62abf5` |
| `colorCompoundBrandForeground1Pressed` | `#0f548c` | `#2886de` |
| `colorBrandForeground1` | `#0f6cbd` | `#479ef5` |
| `colorBrandForeground2` | `#115ea3` | `#62abf5` |
| `colorBrandForeground2Hover` | `#0f548c` | `#96c6fa` |
| `colorBrandForeground2Pressed` | `#0a2e4a` | `#ebf3fc` |
| `colorBrandForegroundInverted` | `#479ef5` | `#0f6cbd` |
| `colorBrandForegroundInvertedHover` | `#62abf5` | `#115ea3` |
| `colorBrandForegroundInvertedPressed` | `#479ef5` | `#0f548c` |
| `colorBrandForegroundOnLight` | `#0f6cbd` | `#0f6cbd` |
| `colorBrandForegroundOnLightHover` | `#115ea3` | `#115ea3` |
| `colorBrandForegroundOnLightPressed` | `#0e4775` | `#0e4775` |
| `colorBrandForegroundOnLightSelected` | `#0f548c` | `#0f548c` |

### 中性背景（colorNeutralBackground / CardBackground / Stencil）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorNeutralBackground1` | `#ffffff` | `#292929` |
| `colorNeutralBackground1Hover` | `#f5f5f5` | `#3d3d3d` |
| `colorNeutralBackground1Pressed` | `#e0e0e0` | `#1f1f1f` |
| `colorNeutralBackground1Selected` | `#ebebeb` | `#383838` |
| `colorNeutralBackground2` | `#fafafa` | `#1f1f1f` |
| `colorNeutralBackground2Hover` | `#f0f0f0` | `#333333` |
| `colorNeutralBackground2Pressed` | `#dbdbdb` | `#141414` |
| `colorNeutralBackground2Selected` | `#e6e6e6` | `#2e2e2e` |
| `colorNeutralBackground3` | `#f5f5f5` | `#141414` |
| `colorNeutralBackground3Hover` | `#ebebeb` | `#292929` |
| `colorNeutralBackground3Pressed` | `#d6d6d6` | `#0a0a0a` |
| `colorNeutralBackground3Selected` | `#e0e0e0` | `#242424` |
| `colorNeutralBackground4` | `#f0f0f0` | `#0a0a0a` |
| `colorNeutralBackground4Hover` | `#fafafa` | `#1f1f1f` |
| `colorNeutralBackground4Pressed` | `#f5f5f5` | `#000000` |
| `colorNeutralBackground4Selected` | `#ffffff` | `#1a1a1a` |
| `colorNeutralBackground5` | `#ebebeb` | `#000000` |
| `colorNeutralBackground5Hover` | `#f5f5f5` | `#141414` |
| `colorNeutralBackground5Pressed` | `#f0f0f0` | `#050505` |
| `colorNeutralBackground5Selected` | `#fafafa` | `#0f0f0f` |
| `colorNeutralBackground6` | `#e6e6e6` | `#333333` |
| `colorNeutralBackground7` | `#00000000` | `#00000000` |
| `colorNeutralBackground7Hover` | `#ebebeb` | `#1a1a1a` |
| `colorNeutralBackground7Pressed` | `#d6d6d6` | `#0a0a0a` |
| `colorNeutralBackground7Selected` | `#00000000` | `#00000000` |
| `colorNeutralBackground8` | `#fcfcfc` | `#292929` |
| `colorNeutralBackgroundInverted` | `#292929` | `#ffffff` |
| `colorNeutralBackgroundInvertedHover` | `#3d3d3d` | `#f5f5f5` |
| `colorNeutralBackgroundInvertedPressed` | `#1f1f1f` | `#e0e0e0` |
| `colorNeutralBackgroundInvertedSelected` | `#383838` | `#ebebeb` |
| `colorNeutralBackgroundStatic` | `#333333` | `#3d3d3d` |
| `colorNeutralBackgroundAlpha` | `rgba(255, 255, 255, 0.5)` | `rgba(26, 26, 26, 0.5)` |
| `colorNeutralBackgroundAlpha2` | `rgba(255, 255, 255, 0.8)` | `rgba(31, 31, 31, 0.7)` |
| `colorNeutralBackgroundDisabled` | `#f0f0f0` | `#141414` |
| `colorNeutralBackgroundDisabled2` | `#ffffff` | `#292929` |
| `colorNeutralBackgroundInvertedDisabled` | `rgba(255, 255, 255, 0.1)` | `rgba(255, 255, 255, 0.1)` |
| `colorNeutralStencil1` | `#e6e6e6` | `#575757` |
| `colorNeutralStencil2` | `#fafafa` | `#333333` |
| `colorNeutralStencil1Alpha` | `rgba(0, 0, 0, 0.1)` | `rgba(255, 255, 255, 0.1)` |
| `colorNeutralStencil2Alpha` | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.05)` |
| `colorNeutralCardBackground` | `#fafafa` | `#333333` |
| `colorNeutralCardBackgroundHover` | `#ffffff` | `#3d3d3d` |
| `colorNeutralCardBackgroundPressed` | `#f5f5f5` | `#2e2e2e` |
| `colorNeutralCardBackgroundSelected` | `#ebebeb` | `#383838` |
| `colorNeutralCardBackgroundDisabled` | `#f0f0f0` | `#141414` |

### 品牌背景（colorBrandBackground / colorCompoundBrandBackground）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorBrandBackground` | `#0f6cbd` | `#115ea3` |
| `colorBrandBackgroundHover` | `#115ea3` | `#0f6cbd` |
| `colorBrandBackgroundPressed` | `#0c3b5e` | `#0c3b5e` |
| `colorBrandBackgroundSelected` | `#0f548c` | `#0f548c` |
| `colorCompoundBrandBackground` | `#0f6cbd` | `#479ef5` |
| `colorCompoundBrandBackgroundHover` | `#115ea3` | `#62abf5` |
| `colorCompoundBrandBackgroundPressed` | `#0f548c` | `#2886de` |
| `colorBrandBackgroundStatic` | `#0f6cbd` | `#0f6cbd` |
| `colorBrandBackground2` | `#ebf3fc` | `#082338` |
| `colorBrandBackground2Hover` | `#cfe4fa` | `#0c3b5e` |
| `colorBrandBackground2Pressed` | `#96c6fa` | `#061724` |
| `colorBrandBackground3Static` | `#0f548c` | `#0f548c` |
| `colorBrandBackground4Static` | `#0c3b5e` | `#0c3b5e` |
| `colorBrandBackgroundInverted` | `#ffffff` | `#ffffff` |
| `colorBrandBackgroundInvertedHover` | `#ebf3fc` | `#ebf3fc` |
| `colorBrandBackgroundInvertedPressed` | `#b4d6fa` | `#b4d6fa` |
| `colorBrandBackgroundInvertedSelected` | `#cfe4fa` | `#cfe4fa` |

### 透明与弱背景（colorSubtle / colorTransparent）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorSubtleBackground` | `transparent` | `transparent` |
| `colorSubtleBackgroundHover` | `#f5f5f5` | `#383838` |
| `colorSubtleBackgroundPressed` | `#e0e0e0` | `#2e2e2e` |
| `colorSubtleBackgroundSelected` | `#ebebeb` | `#333333` |
| `colorSubtleBackgroundLightAlphaHover` | `rgba(255, 255, 255, 0.7)` | `rgba(36, 36, 36, 0.8)` |
| `colorSubtleBackgroundLightAlphaPressed` | `rgba(255, 255, 255, 0.5)` | `rgba(36, 36, 36, 0.5)` |
| `colorSubtleBackgroundLightAlphaSelected` | `transparent` | `transparent` |
| `colorSubtleBackgroundInverted` | `transparent` | `transparent` |
| `colorSubtleBackgroundInvertedHover` | `rgba(0, 0, 0, 0.1)` | `rgba(0, 0, 0, 0.1)` |
| `colorSubtleBackgroundInvertedPressed` | `rgba(0, 0, 0, 0.3)` | `rgba(0, 0, 0, 0.3)` |
| `colorSubtleBackgroundInvertedSelected` | `rgba(0, 0, 0, 0.2)` | `rgba(0, 0, 0, 0.2)` |
| `colorTransparentBackground` | `transparent` | `transparent` |
| `colorTransparentBackgroundHover` | `transparent` | `transparent` |
| `colorTransparentBackgroundPressed` | `transparent` | `transparent` |
| `colorTransparentBackgroundSelected` | `transparent` | `transparent` |
| `colorTransparentStroke` | `transparent` | `transparent` |
| `colorTransparentStrokeInteractive` | `transparent` | `transparent` |
| `colorTransparentStrokeDisabled` | `transparent` | `transparent` |

### 中性描边（colorNeutralStroke）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorNeutralStrokeAccessible` | `#616161` | `#adadad` |
| `colorNeutralStrokeAccessibleHover` | `#575757` | `#bdbdbd` |
| `colorNeutralStrokeAccessiblePressed` | `#4d4d4d` | `#b3b3b3` |
| `colorNeutralStrokeAccessibleSelected` | `#0f6cbd` | `#479ef5` |
| `colorNeutralStroke1` | `#d1d1d1` | `#666666` |
| `colorNeutralStroke1Hover` | `#c7c7c7` | `#757575` |
| `colorNeutralStroke1Pressed` | `#b3b3b3` | `#6b6b6b` |
| `colorNeutralStroke1Selected` | `#bdbdbd` | `#707070` |
| `colorNeutralStroke2` | `#e0e0e0` | `#525252` |
| `colorNeutralStroke3` | `#f0f0f0` | `#3d3d3d` |
| `colorNeutralStroke4` | `#ebebeb` | `#3d3d3d` |
| `colorNeutralStroke4Hover` | `#e0e0e0` | `#2e2e2e` |
| `colorNeutralStroke4Pressed` | `#d6d6d6` | `#242424` |
| `colorNeutralStroke4Selected` | `#ebebeb` | `#3d3d3d` |
| `colorNeutralStrokeSubtle` | `#e0e0e0` | `#0a0a0a` |
| `colorNeutralStrokeOnBrand` | `#ffffff` | `#292929` |
| `colorNeutralStrokeOnBrand2` | `#ffffff` | `#ffffff` |
| `colorNeutralStrokeOnBrand2Hover` | `#ffffff` | `#ffffff` |
| `colorNeutralStrokeOnBrand2Pressed` | `#ffffff` | `#ffffff` |
| `colorNeutralStrokeOnBrand2Selected` | `#ffffff` | `#ffffff` |
| `colorNeutralStrokeDisabled` | `#e0e0e0` | `#424242` |
| `colorNeutralStrokeDisabled2` | `#ebebeb` | `#3d3d3d` |
| `colorNeutralStrokeInvertedDisabled` | `rgba(255, 255, 255, 0.4)` | `rgba(255, 255, 255, 0.4)` |
| `colorNeutralStrokeAlpha` | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.1)` |
| `colorNeutralStrokeAlpha2` | `rgba(255, 255, 255, 0.2)` | `rgba(255, 255, 255, 0.2)` |

### 品牌描边（colorBrandStroke / colorCompoundBrandStroke）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorBrandStroke1` | `#0f6cbd` | `#479ef5` |
| `colorBrandStroke2` | `#b4d6fa` | `#0e4775` |
| `colorBrandStroke2Hover` | `#77b7f7` | `#0e4775` |
| `colorBrandStroke2Pressed` | `#0f6cbd` | `#0a2e4a` |
| `colorBrandStroke2Contrast` | `#b4d6fa` | `#0e4775` |
| `colorCompoundBrandStroke` | `#0f6cbd` | `#479ef5` |
| `colorCompoundBrandStrokeHover` | `#115ea3` | `#62abf5` |
| `colorCompoundBrandStrokePressed` | `#0f548c` | `#2886de` |

### 焦点、遮罩与阴影（colorStrokeFocus / color*Shadow / *Overlay）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorBackgroundOverlay` | `rgba(0, 0, 0, 0.4)` | `rgba(0, 0, 0, 0.5)` |
| `colorScrollbarOverlay` | `rgba(0, 0, 0, 0.5)` | `rgba(255, 255, 255, 0.6)` |
| `colorStrokeFocus1` | `#ffffff` | `#000000` |
| `colorStrokeFocus2` | `#000000` | `#ffffff` |
| `colorNeutralShadowAmbient` | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.24)` |
| `colorNeutralShadowKey` | `rgba(0,0,0,0.14)` | `rgba(0,0,0,0.28)` |
| `colorNeutralShadowAmbientLighter` | `rgba(0,0,0,0.06)` | `rgba(0,0,0,0.12)` |
| `colorNeutralShadowKeyLighter` | `rgba(0,0,0,0.07)` | `rgba(0,0,0,0.14)` |
| `colorNeutralShadowAmbientDarker` | `rgba(0,0,0,0.20)` | `rgba(0,0,0,0.40)` |
| `colorNeutralShadowKeyDarker` | `rgba(0,0,0,0.24)` | `rgba(0,0,0,0.48)` |
| `colorBrandShadowAmbient` | `rgba(0,0,0,0.30)` | `rgba(0,0,0,0.30)` |
| `colorBrandShadowKey` | `rgba(0,0,0,0.25)` | `rgba(0,0,0,0.25)` |

### 状态色（colorStatus）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorStatusSuccessBackground1` | `#f1faf1` | `#052505` |
| `colorStatusSuccessBackground2` | `#9fd89f` | `#094509` |
| `colorStatusSuccessBackground3` | `#107c10` | `#107c10` |
| `colorStatusSuccessForeground1` | `#0e700e` | `#54b054` |
| `colorStatusSuccessForeground2` | `#094509` | `#9fd89f` |
| `colorStatusSuccessForeground3` | `#107c10` | `#9fd89f` |
| `colorStatusSuccessForegroundInverted` | `#54b054` | `#0e700e` |
| `colorStatusSuccessBorderActive` | `#107c10` | `#54b054` |
| `colorStatusSuccessBorder1` | `#9fd89f` | `#107c10` |
| `colorStatusSuccessBorder2` | `#107c10` | `#9fd89f` |
| `colorStatusWarningBackground1` | `#fff9f5` | `#4a1e04` |
| `colorStatusWarningBackground2` | `#fdcfb4` | `#8a3707` |
| `colorStatusWarningBackground3` | `#f7630c` | `#f7630c` |
| `colorStatusWarningForeground1` | `#bc4b09` | `#faa06b` |
| `colorStatusWarningForeground2` | `#8a3707` | `#fdcfb4` |
| `colorStatusWarningForeground3` | `#bc4b09` | `#f98845` |
| `colorStatusWarningForegroundInverted` | `#faa06b` | `#bc4b09` |
| `colorStatusWarningBorderActive` | `#f7630c` | `#faa06b` |
| `colorStatusWarningBorder1` | `#fdcfb4` | `#f7630c` |
| `colorStatusWarningBorder2` | `#bc4b09` | `#f98845` |
| `colorStatusDangerBackground1` | `#fdf3f4` | `#3b0509` |
| `colorStatusDangerBackground2` | `#eeacb2` | `#6e0811` |
| `colorStatusDangerBackground3` | `#c50f1f` | `#c50f1f` |
| `colorStatusDangerForeground1` | `#b10e1c` | `#dc626d` |
| `colorStatusDangerForeground2` | `#6e0811` | `#eeacb2` |
| `colorStatusDangerForeground3` | `#c50f1f` | `#eeacb2` |
| `colorStatusDangerForegroundInverted` | `#dc626d` | `#b10e1c` |
| `colorStatusDangerBorderActive` | `#c50f1f` | `#dc626d` |
| `colorStatusDangerBorder1` | `#eeacb2` | `#c50f1f` |
| `colorStatusDangerBorder2` | `#c50f1f` | `#dc626d` |
| `colorStatusDangerBackground3Hover` | `#b10e1c` | `#b10e1c` |
| `colorStatusDangerBackground3Pressed` | `#960b18` | `#960b18` |

### 调色板（colorPalette）

| Token | 浅色 | 深色 |
| --- | --- | --- |
| `colorPaletteRedBackground1` | `#fdf6f6` | `#3f1011` |
| `colorPaletteRedBackground2` | `#f1bbbc` | `#751d1f` |
| `colorPaletteRedBackground3` | `#d13438` | `#d13438` |
| `colorPaletteRedForeground1` | `#bc2f32` | `#e37d80` |
| `colorPaletteRedForeground2` | `#751d1f` | `#f1bbbc` |
| `colorPaletteRedForeground3` | `#d13438` | `#e37d80` |
| `colorPaletteRedBorderActive` | `#d13438` | `#e37d80` |
| `colorPaletteRedBorder1` | `#f1bbbc` | `#d13438` |
| `colorPaletteRedBorder2` | `#d13438` | `#e37d80` |
| `colorPaletteGreenBackground1` | `#f1faf1` | `#052505` |
| `colorPaletteGreenBackground2` | `#9fd89f` | `#094509` |
| `colorPaletteGreenBackground3` | `#107c10` | `#107c10` |
| `colorPaletteGreenForeground1` | `#0e700e` | `#54b054` |
| `colorPaletteGreenForeground2` | `#094509` | `#9fd89f` |
| `colorPaletteGreenForeground3` | `#107c10` | `#9fd89f` |
| `colorPaletteGreenBorderActive` | `#107c10` | `#54b054` |
| `colorPaletteGreenBorder1` | `#9fd89f` | `#107c10` |
| `colorPaletteGreenBorder2` | `#107c10` | `#9fd89f` |
| `colorPaletteDarkOrangeBackground1` | `#fdf6f3` | `#411200` |
| `colorPaletteDarkOrangeBackground2` | `#f4bfab` | `#7a2101` |
| `colorPaletteDarkOrangeBackground3` | `#da3b01` | `#da3b01` |
| `colorPaletteDarkOrangeForeground1` | `#c43501` | `#e9835e` |
| `colorPaletteDarkOrangeForeground2` | `#7a2101` | `#f4bfab` |
| `colorPaletteDarkOrangeForeground3` | `#da3b01` | `#e9835e` |
| `colorPaletteDarkOrangeBorderActive` | `#da3b01` | `#e9835e` |
| `colorPaletteDarkOrangeBorder1` | `#f4bfab` | `#da3b01` |
| `colorPaletteDarkOrangeBorder2` | `#da3b01` | `#e9835e` |
| `colorPaletteYellowBackground1` | `#fffef5` | `#4c4400` |
| `colorPaletteYellowBackground2` | `#fef7b2` | `#817400` |
| `colorPaletteYellowBackground3` | `#fde300` | `#fde300` |
| `colorPaletteYellowForeground1` | `#817400` | `#feee66` |
| `colorPaletteYellowForeground2` | `#817400` | `#fef7b2` |
| `colorPaletteYellowForeground3` | `#fde300` | `#fdea3d` |
| `colorPaletteYellowBorderActive` | `#fde300` | `#feee66` |
| `colorPaletteYellowBorder1` | `#fef7b2` | `#fde300` |
| `colorPaletteYellowBorder2` | `#fde300` | `#fdea3d` |
| `colorPaletteBerryBackground1` | `#fdf5fc` | `#3a1136` |
| `colorPaletteBerryBackground2` | `#edbbe7` | `#6d2064` |
| `colorPaletteBerryBackground3` | `#c239b3` | `#c239b3` |
| `colorPaletteBerryForeground1` | `#af33a1` | `#da7ed0` |
| `colorPaletteBerryForeground2` | `#6d2064` | `#edbbe7` |
| `colorPaletteBerryForeground3` | `#c239b3` | `#d161c4` |
| `colorPaletteBerryBorderActive` | `#c239b3` | `#da7ed0` |
| `colorPaletteBerryBorder1` | `#edbbe7` | `#c239b3` |
| `colorPaletteBerryBorder2` | `#c239b3` | `#d161c4` |
| `colorPaletteLightGreenBackground1` | `#f2fbf2` | `#063004` |
| `colorPaletteLightGreenBackground2` | `#a7e3a5` | `#0b5a08` |
| `colorPaletteLightGreenBackground3` | `#13a10e` | `#13a10e` |
| `colorPaletteLightGreenForeground1` | `#11910d` | `#5ec75a` |
| `colorPaletteLightGreenForeground2` | `#0b5a08` | `#a7e3a5` |
| `colorPaletteLightGreenForeground3` | `#13a10e` | `#3db838` |
| `colorPaletteLightGreenBorderActive` | `#13a10e` | `#5ec75a` |
| `colorPaletteLightGreenBorder1` | `#a7e3a5` | `#13a10e` |
| `colorPaletteLightGreenBorder2` | `#13a10e` | `#3db838` |
| `colorPaletteMarigoldBackground1` | `#fefbf4` | `#463100` |
| `colorPaletteMarigoldBackground2` | `#f9e2ae` | `#835b00` |
| `colorPaletteMarigoldBackground3` | `#eaa300` | `#eaa300` |
| `colorPaletteMarigoldForeground1` | `#d39300` | `#f2c661` |
| `colorPaletteMarigoldForeground2` | `#835b00` | `#f9e2ae` |
| `colorPaletteMarigoldForeground3` | `#eaa300` | `#efb839` |
| `colorPaletteMarigoldBorderActive` | `#eaa300` | `#f2c661` |
| `colorPaletteMarigoldBorder1` | `#f9e2ae` | `#eaa300` |
| `colorPaletteMarigoldBorder2` | `#eaa300` | `#efb839` |
| `colorPaletteRedForegroundInverted` | `#dc5e62` | `#d13438` |
| `colorPaletteGreenForegroundInverted` | `#359b35` | `#107c10` |
| `colorPaletteYellowForegroundInverted` | `#fef7b2` | `#817400` |
| `colorPaletteDarkRedBackground2` | `#d69ca5` | `#590815` |
| `colorPaletteDarkRedForeground2` | `#420610` | `#d69ca5` |
| `colorPaletteDarkRedBorderActive` | `#750b1c` | `#ac4f5e` |
| `colorPaletteCranberryBackground2` | `#eeacb2` | `#6e0811` |
| `colorPaletteCranberryForeground2` | `#6e0811` | `#eeacb2` |
| `colorPaletteCranberryBorderActive` | `#c50f1f` | `#dc626d` |
| `colorPalettePumpkinBackground2` | `#efc4ad` | `#712d09` |
| `colorPalettePumpkinForeground2` | `#712d09` | `#efc4ad` |
| `colorPalettePumpkinBorderActive` | `#ca5010` | `#df8e64` |
| `colorPalettePeachBackground2` | `#ffddb3` | `#8f4e00` |
| `colorPalettePeachForeground2` | `#8f4e00` | `#ffddb3` |
| `colorPalettePeachBorderActive` | `#ff8c00` | `#ffba66` |
| `colorPaletteGoldBackground2` | `#ecdfa5` | `#6c5700` |
| `colorPaletteGoldForeground2` | `#6c5700` | `#ecdfa5` |
| `colorPaletteGoldBorderActive` | `#c19c00` | `#dac157` |
| `colorPaletteBrassBackground2` | `#e0cea2` | `#553e06` |
| `colorPaletteBrassForeground2` | `#553e06` | `#e0cea2` |
| `colorPaletteBrassBorderActive` | `#986f0b` | `#c1a256` |
| `colorPaletteBrownBackground2` | `#ddc3b0` | `#50301a` |
| `colorPaletteBrownForeground2` | `#50301a` | `#ddc3b0` |
| `colorPaletteBrownBorderActive` | `#8e562e` | `#bb8f6f` |
| `colorPaletteForestBackground2` | `#bdd99b` | `#294903` |
| `colorPaletteForestForeground2` | `#294903` | `#bdd99b` |
| `colorPaletteForestBorderActive` | `#498205` | `#85b44c` |
| `colorPaletteSeafoamBackground2` | `#a8f0cd` | `#00723b` |
| `colorPaletteSeafoamForeground2` | `#00723b` | `#a8f0cd` |
| `colorPaletteSeafoamBorderActive` | `#00cc6a` | `#5ae0a0` |
| `colorPaletteDarkGreenBackground2` | `#9ad29a` | `#063b06` |
| `colorPaletteDarkGreenForeground2` | `#063b06` | `#9ad29a` |
| `colorPaletteDarkGreenBorderActive` | `#0b6a0b` | `#4da64d` |
| `colorPaletteLightTealBackground2` | `#a6e9ed` | `#00666d` |
| `colorPaletteLightTealForeground2` | `#00666d` | `#a6e9ed` |
| `colorPaletteLightTealBorderActive` | `#00b7c3` | `#58d3db` |
| `colorPaletteTealBackground2` | `#9bd9db` | `#02494c` |
| `colorPaletteTealForeground2` | `#02494c` | `#9bd9db` |
| `colorPaletteTealBorderActive` | `#038387` | `#4cb4b7` |
| `colorPaletteSteelBackground2` | `#94c8d4` | `#00333f` |
| `colorPaletteSteelForeground2` | `#00333f` | `#94c8d4` |
| `colorPaletteSteelBorderActive` | `#005b70` | `#4496a9` |
| `colorPaletteBlueBackground2` | `#a9d3f2` | `#004377` |
| `colorPaletteBlueForeground2` | `#004377` | `#a9d3f2` |
| `colorPaletteBlueBorderActive` | `#0078d4` | `#5caae5` |
| `colorPaletteRoyalBlueBackground2` | `#9abfdc` | `#002c4e` |
| `colorPaletteRoyalBlueForeground2` | `#002c4e` | `#9abfdc` |
| `colorPaletteRoyalBlueBorderActive` | `#004e8c` | `#4a89ba` |
| `colorPaletteCornflowerBackground2` | `#c8d1fa` | `#2c3c85` |
| `colorPaletteCornflowerForeground2` | `#2c3c85` | `#c8d1fa` |
| `colorPaletteCornflowerBorderActive` | `#4f6bed` | `#93a4f4` |
| `colorPaletteNavyBackground2` | `#a3b2e8` | `#001665` |
| `colorPaletteNavyForeground2` | `#001665` | `#a3b2e8` |
| `colorPaletteNavyBorderActive` | `#0027b4` | `#546fd2` |
| `colorPaletteLavenderBackground2` | `#d2ccf8` | `#3f3682` |
| `colorPaletteLavenderForeground2` | `#3f3682` | `#d2ccf8` |
| `colorPaletteLavenderBorderActive` | `#7160e8` | `#a79cf1` |
| `colorPalettePurpleBackground2` | `#c6b1de` | `#341a51` |
| `colorPalettePurpleForeground2` | `#341a51` | `#c6b1de` |
| `colorPalettePurpleBorderActive` | `#5c2e91` | `#9470bd` |
| `colorPaletteGrapeBackground2` | `#d9a7e0` | `#4c0d55` |
| `colorPaletteGrapeForeground2` | `#4c0d55` | `#d9a7e0` |
| `colorPaletteGrapeBorderActive` | `#881798` | `#b55fc1` |
| `colorPaletteLilacBackground2` | `#e6bfed` | `#63276d` |
| `colorPaletteLilacForeground2` | `#63276d` | `#e6bfed` |
| `colorPaletteLilacBorderActive` | `#b146c2` | `#cf87da` |
| `colorPalettePinkBackground2` | `#f7c0e3` | `#80215d` |
| `colorPalettePinkForeground2` | `#80215d` | `#f7c0e3` |
| `colorPalettePinkBorderActive` | `#e43ba6` | `#ef85c8` |
| `colorPaletteMagentaBackground2` | `#eca5d1` | `#6b0043` |
| `colorPaletteMagentaForeground2` | `#6b0043` | `#eca5d1` |
| `colorPaletteMagentaBorderActive` | `#bf0077` | `#d957a8` |
| `colorPalettePlumBackground2` | `#d696c0` | `#5a003b` |
| `colorPalettePlumForeground2` | `#43002b` | `#d696c0` |
| `colorPalettePlumBorderActive` | `#77004d` | `#ad4589` |
| `colorPaletteBeigeBackground2` | `#d7d4d4` | `#444241` |
| `colorPaletteBeigeForeground2` | `#444241` | `#d7d4d4` |
| `colorPaletteBeigeBorderActive` | `#7a7574` | `#afabaa` |
| `colorPaletteMinkBackground2` | `#cecccb` | `#343231` |
| `colorPaletteMinkForeground2` | `#343231` | `#cecccb` |
| `colorPaletteMinkBorderActive` | `#5d5a58` | `#9e9b99` |
| `colorPalettePlatinumBackground2` | `#cdd6d8` | `#3b4447` |
| `colorPalettePlatinumForeground2` | `#3b4447` | `#cdd6d8` |
| `colorPalettePlatinumBorderActive` | `#69797e` | `#a0adb2` |
| `colorPaletteAnchorBackground2` | `#bcc3c7` | `#202427` |
| `colorPaletteAnchorForeground2` | `#202427` | `#bcc3c7` |
| `colorPaletteAnchorBorderActive` | `#394146` | `#808a90` |
