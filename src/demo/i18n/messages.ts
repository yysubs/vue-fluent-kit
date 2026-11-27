import {
  controlsEnUS,
  controlsZhCN,
  controlsZhTW,
  type DemoControlsMessages,
} from './controls-messages'

export type DemoLocale = 'zh-CN' | 'zh-TW' | 'en-US'

export interface DemoLocaleOption {
  /** 语言代码 */
  value: DemoLocale
  /** 顶栏紧凑展示标签 */
  shortLabel: string
  /** 完整语言名称（用于无障碍与提示） */
  label: string
}

export const demoLocaleOptions: DemoLocaleOption[] = [
  { value: 'zh-CN', shortLabel: '简', label: '简体中文' },
  { value: 'zh-TW', shortLabel: '繁', label: '繁體中文' },
  { value: 'en-US', shortLabel: 'EN', label: 'English' },
]

export interface DemoMessages {
  common: {
    onThisPage: string
    copy: string
    copied: string
    copiedVar: string
    copyFontSize: string
    showCode: string
    hideCode: string
    liveCode: string
    liveCanvas: string
    controlsPanel: string
    themeFollow: string
    themeLight: string
    themeDark: string
    themeSystem: string
    apiKindProp: string
    apiType: string
    apiDefault: string
    apiDescription: string
  }
  shell: {
    navAriaLabel: string
    searchPlaceholder: string
    searchAriaLabel: string
    clearSearchAriaLabel: string
    emptySearchPrefix: string
    emptySearchSuffix: string
    kbdPrefix: string
    kbdSuffix: string
    openMenuAriaLabel: string
    docsTab: string
    breadcrumbAriaLabel: string
    themeSwitchAriaLabel: string
    langSwitchAriaLabel: string
    groupOverview: string
    groupComponents: string
    groupDesignSystem: string
    navOverviewTitle: string
    navOverviewSub: string
    navButtonSub: string
    navInputSub: string
    navCheckboxSub: string
    navTokensTitle: string
    navTokensSub: string
  }
  controls: DemoControlsMessages
  brands: {
    default: string
    teal: string
    violet: string
    forest: string
  }
  overview: {
    tocHighlights: string
    tocTheming: string
    tocShadowRules: string
    tocRoadmap: string
    descBeforeCode: string
    descMidCode: string
    descAfterCode: string
    bannerTitle: string
    bannerSub: string
    ctaTokens: string
    ctaGithub: string
    highlightsTitle: string
    highlights: {
      thinTitle: string
      thinDescBefore: string
      thinDescAfter: string
      tokensTitle: string
      tokensDescBefore: string
      tokensDescAfter: string
      reuseTitle: string
      reuseDescBefore: string
      reuseDescAfter: string
    }
    themingTitle: string
    themingSubPrefix: string
    themingSubMid: string
    themingSubSuffix: string
    brandGroupAriaLabel: string
    scopedLightTag: string
    scopedDarkTag: string
    scopedAcrylicTitle: string
    scopedLightSub: string
    scopedDarkSub: string
    shadowTitle: string
    shadowSub: string
    shadowRules: {
      level: string
      title: string
      desc: string
      sample: string
    }[]
    roadmapTitle: string
    roadmapSub: string
    roadmapStatusDone: string
    roadmapStatusPlanned: string
    roadmapItems: {
      name: string
      tag: string
      desc: string
      status: 'done' | 'planned'
      page?: 'button' | 'input' | 'checkbox'
    }[]
  }
  tokens: {
    eyebrow: string
    descBeforeCode: string
    descMidCode: string
    descAfterCode: string
    tabsAriaLabel: string
    tabColors: string
    tabSurfaces: string
    tabTypography: string
    tabElevation: string
    tabSpacing: string
    filterPlaceholder: string
    filterAriaLabel: string
    clearFilterAriaLabel: string
    emptyFilterPrefix: string
    emptyFilterSuffix: string
    colorGroups: {
      background: string
      foregroundStroke: string
      brand: string
      status: string
    }
    colorLabels: Record<string, string>
    surfacesTitle: string
    surfacesSub: string
    acrylicTitle: string
    acrylicDesc: string
    micaTitle: string
    micaDesc: string
    surfaceListTitle: string
    surfaceNotes: Record<string, string>
    typeSamples: Record<string, string>
    shadowsTitle: string
    shadowNotes: Record<string, string>
    radiusTitle: string
  }
}

const zhCN: DemoMessages = {
  common: {
    onThisPage: '本页目录',
    copy: '复制',
    copied: '已复制',
    copiedVar: '已复制 var(...)',
    copyFontSize: '复制字号',
    showCode: '显示代码',
    hideCode: '收起代码',
    liveCode: '实时代码',
    liveCanvas: '实时画布',
    controlsPanel: '属性面板',
    themeFollow: '跟随',
    themeLight: '浅色',
    themeDark: '深色',
    themeSystem: '系统',
    apiKindProp: '属性',
    apiType: '类型',
    apiDefault: '默认值',
    apiDescription: '说明',
  },
  shell: {
    navAriaLabel: '组件导航',
    searchPlaceholder: '查找组件或变量...',
    searchAriaLabel: '查找组件或变量',
    clearSearchAriaLabel: '清空查找',
    emptySearchPrefix: '未找到与「',
    emptySearchSuffix: '」匹配的条目',
    kbdPrefix: '按',
    kbdSuffix: '逐项检查键盘焦点环',
    openMenuAriaLabel: '打开导航菜单',
    docsTab: '文档',
    breadcrumbAriaLabel: '当前位置',
    themeSwitchAriaLabel: '切换主题',
    langSwitchAriaLabel: '切换语言',
    groupOverview: '概览',
    groupComponents: '基础控件',
    groupDesignSystem: '设计系统',
    navOverviewTitle: 'Introduction',
    navOverviewSub: '概览',
    navButtonSub: '按钮',
    navInputSub: '输入框',
    navCheckboxSub: '复选框',
    navTokensTitle: 'Design Tokens',
    navTokensSub: '变量与材质',
  },
  controls: controlsZhCN,
  brands: {
    default: 'Fluent 蓝',
    teal: '青碧 Teal',
    violet: '堇紫 Violet',
    forest: '森绿 Forest',
  },
  overview: {
    tocHighlights: '核心架构',
    tocTheming: '主题、品牌色与材质',
    tocShadowRules: 'Shadow DOM 规范',
    tocRoadmap: '按需封装路线',
    descBeforeCode: '基于官方 ',
    descMidCode: '（Fluent 2 规范）的 Vue 3 轻量二次封装组件库。保留官方交互与无障碍逻辑，聚焦 ',
    descAfterCode: ' 双向绑定、TypeScript 类型提示与独立 Design Tokens 主题体系。',
    bannerTitle: 'Fluent 2 Web Components for Vue 3',
    bannerSub: '开箱即用依赖 @fluentui/web-components v3 · 459+ 官方变量 · Acrylic / Mica 材质',
    ctaTokens: '查看 Design Tokens',
    ctaGithub: 'GitHub 源码',
    highlightsTitle: '核心架构',
    highlights: {
      thinTitle: '薄封装策略',
      thinDescBefore: '不重写底层交互与无障碍，仅封装 Vue ',
      thinDescAfter: '、Props/Emits/Slots 类型与默认属性。',
      tokensTitle: '独立 Design Tokens',
      tokensDescBefore: '拆分语义变量、品牌色与 Acrylic/Mica 材质层，支持 ',
      tokensDescAfter: ' 全局切换与局部嵌套。',
      reuseTitle: '按需扩充与复用',
      reuseDescBefore: '已配置 Vite ',
      reuseDescAfter: ' 与多入口子路径导出，开箱即用，便于作为私有包或 Monorepo 子包复用。',
    },
    themingTitle: '主题、品牌色与材质',
    themingSubPrefix: '当前解析主题：',
    themingSubMid: '。切换品牌色阶可实时覆盖全站强调色，下方同时演示 ',
    themingSubSuffix: ' 局部反色与 Acrylic 浮层材质。',
    brandGroupAriaLabel: '选择品牌色',
    scopedLightTag: '浅色区域',
    scopedDarkTag: '深色区域',
    scopedAcrylicTitle: 'Acrylic 浮层 + Mica 底板',
    scopedLightSub: '半透明毛玻璃 + 细高光描边',
    scopedDarkSub: '任意层级局部嵌套反色',
    shadowTitle: 'Shadow DOM 样式覆盖规范',
    shadowSub: '统一遵循以下四级优先级，避免强行穿透内部私有结构导致官方升级失效。',
    shadowRules: [
      {
        level: 'L1 首选',
        title: '覆写 Design Tokens',
        desc: 'CSS 变量天然穿透 Shadow DOM，颜色、圆角、字体与间距统一通过 Token 覆盖。',
        sample: '--colorBrandBackground: #6b4fbb;',
      },
      {
        level: 'L2 推荐',
        title: '官方 ::part() 局部微调',
        desc: '需要调整内部节点样式时，仅使用官方公开暴露的 part 名称，不依赖私有结构。',
        sample: 'fluent-text-input::part(control) { ... }',
      },
      {
        level: 'L3 常规',
        title: '宿主与插槽布局样式',
        desc: '尺寸、外边距以及 Acrylic / Mica 材质表面直接作用于宿主标签与插槽内容。',
        sample: '.vfk-surface-acrylic { backdrop-filter: ... }',
      },
      {
        level: 'L4 禁止',
        title: '禁止强行穿透内部结构',
        desc: '不通过脚本修改 shadowRoot，不依赖未声明的内部类名；Vue 的 :deep() 对 Shadow DOM 无效。',
        sample: '× shadowRoot / :deep()',
      },
    ],
    roadmapTitle: '按需封装路线',
    roadmapSub: '首批基础控件（VfkButton、VfkInput、VfkCheckbox）已完成，其余控件按需逐步薄封装接入。',
    roadmapStatusDone: '已实现',
    roadmapStatusPlanned: '计划中',
    roadmapItems: [
      {
        name: 'VfkButton',
        tag: '<fluent-button>',
        desc: '基础操作按钮、外观/形状/尺寸、图标插槽与 disabledFocusable',
        status: 'done',
        page: 'button',
      },
      {
        name: 'VfkInput',
        tag: '<fluent-text-input>',
        desc: '受控文本输入、v-model 双向绑定、前后缀插槽与尺寸映射',
        status: 'done',
        page: 'input',
      },
      {
        name: 'VfkCheckbox',
        tag: '<fluent-checkbox>',
        desc: '支持 boolean / mixed 三态的复选框与标签组合',
        status: 'done',
        page: 'checkbox',
      },
      {
        name: 'VfkToggleButton',
        tag: '<fluent-toggle-button>',
        desc: '支持 v-model 的按压切换按钮，保留官方 ARIA 状态',
        status: 'planned',
      },
      {
        name: 'VfkSelect / VfkOption',
        tag: '<fluent-dropdown>',
        desc: '基于官方下拉选择组件薄封装的受控选择器',
        status: 'planned',
      },
      {
        name: '更多 Fluent 2 控件',
        tag: '<fluent-*>',
        desc: 'Switch、Dialog、Drawer、Tabs、Menu、Tooltip 按需逐步扩充',
        status: 'planned',
      },
    ],
  },
  tokens: {
    eyebrow: '主题与变量',
    descBeforeCode: '所有颜色、字号、间距、圆角、阴影与材质变量统一维护在独立样式层，天然穿透 ',
    descMidCode: ' 的 Shadow DOM。点击任意条目即可复制 ',
    descAfterCode: '。',
    tabsAriaLabel: '变量分类',
    tabColors: '颜色变量',
    tabSurfaces: '材质表面',
    tabTypography: '排版刻度',
    tabElevation: '圆角与阴影',
    tabSpacing: '间距刻度',
    filterPlaceholder: '筛选颜色变量...',
    filterAriaLabel: '筛选颜色变量',
    clearFilterAriaLabel: '清空筛选',
    emptyFilterPrefix: '没有匹配「',
    emptyFilterSuffix: '」的颜色变量。',
    colorGroups: {
      background: '中性背景（Background）',
      foregroundStroke: '中性文字与描边（Foreground & Stroke）',
      brand: '品牌色（Brand）',
      status: '语义状态色（Status）',
    },
    colorLabels: {
      '--colorNeutralBackground1': '主面板 / 卡片',
      '--colorNeutralBackground2': '画布 / 次级面板',
      '--colorNeutralBackground3': '填充输入 / 侧栏',
      '--colorNeutralBackground4': '深层背景',
      '--colorNeutralBackgroundDisabled': '禁用背景',
      '--colorNeutralBackgroundInverted': '反色背景',
      '--colorNeutralForeground1': '主正文',
      '--colorNeutralForeground2': '次要文字',
      '--colorNeutralForeground3': '说明文字',
      '--colorNeutralForegroundDisabled': '禁用文字',
      '--colorNeutralStroke1': '默认描边',
      '--colorNeutralStroke2': '分割线描边',
      '--colorNeutralStrokeAccessible': '高对比控件描边',
      '--colorStrokeFocus2': '键盘焦点外框',
      '--colorBrandBackground': '品牌主底色',
      '--colorBrandBackgroundHover': '品牌悬停底色',
      '--colorBrandBackgroundPressed': '品牌按下底色',
      '--colorBrandBackground2': '品牌浅底色',
      '--colorBrandForeground1': '品牌主前景',
      '--colorCompoundBrandStroke': '品牌激活指示线',
      '--colorStatusSuccessBackground1': '成功浅底',
      '--colorStatusSuccessBackground3': '成功实心',
      '--colorStatusWarningBackground1': '警告浅底',
      '--colorStatusWarningBackground3': '警告实心',
      '--colorStatusDangerBackground1': '错误浅底',
      '--colorStatusDangerBackground3': '错误实心',
    },
    surfacesTitle: 'Acrylic（亚克力）与 Mica（云母）材质',
    surfacesSub: '自动适配浅色/深色主题，在不支持 backdrop-filter 或开启「减少透明效果」时自动回退。',
    acrylicTitle: 'Acrylic 亚克力浮层',
    acrylicDesc: '适合顶栏、浮层菜单、侧边抽屉与上下文卡片',
    micaTitle: 'Mica 云母画布',
    micaDesc: '低饱和品牌色微染色，适合应用主底板与大面积容器',
    surfaceListTitle: '材质变量列表',
    surfaceNotes: {
      '--vfkSurfaceAcrylicBg': '亚克力半透明填充色',
      '--vfkSurfaceAcrylicBlur': '亚克力背景模糊半径（24px）',
      '--vfkSurfaceAcrylicBorder': '亚克力细高光描边',
      '--vfkSurfaceMicaBg': '云母画布柔和渐变底色',
      '--vfkSurfaceMicaCardBg': '云母次级卡片表面色',
    },
    typeSamples: {
      caption1: '辅助说明、表单提示与标注文本',
      body1: '默认正文与表单控件内容排版',
      body1Strong: '按钮文字与强调型列表项',
      body2: '大号控件与引导段落文字',
      subtitle1: '章节标题与对话框标题',
      title3: '模块主标题',
      title2: '页面级大标题',
    },
    shadowsTitle: '阴影层级（Shadows）',
    shadowNotes: {
      '--shadow2': '卡片默认轻阴影',
      '--shadow4': '卡片标准高度',
      '--shadow8': '悬停卡片 / Tooltip / Toast',
      '--shadow16': '菜单 / 下拉浮层 / Popover',
      '--shadow28': '抽屉面板',
      '--shadow64': '模态对话框',
    },
    radiusTitle: '圆角刻度（Border Radius）',
  },
}

const zhTW: DemoMessages = {
  common: {
    onThisPage: '本頁目錄',
    copy: '複製',
    copied: '已複製',
    copiedVar: '已複製 var(...)',
    copyFontSize: '複製字級',
    showCode: '顯示程式碼',
    hideCode: '收合程式碼',
    liveCode: '即時程式碼',
    liveCanvas: '即時畫布',
    controlsPanel: '屬性面板',
    themeFollow: '跟隨',
    themeLight: '淺色',
    themeDark: '深色',
    themeSystem: '系統',
    apiKindProp: '屬性',
    apiType: '型別',
    apiDefault: '預設值',
    apiDescription: '說明',
  },
  shell: {
    navAriaLabel: '元件導覽',
    searchPlaceholder: '搜尋元件或變數...',
    searchAriaLabel: '搜尋元件或變數',
    clearSearchAriaLabel: '清除搜尋',
    emptySearchPrefix: '找不到與「',
    emptySearchSuffix: '」相符的項目',
    kbdPrefix: '按',
    kbdSuffix: '逐項檢查鍵盤焦點環',
    openMenuAriaLabel: '開啟導覽選單',
    docsTab: '文件',
    breadcrumbAriaLabel: '目前位置',
    themeSwitchAriaLabel: '切換主題',
    langSwitchAriaLabel: '切換語言',
    groupOverview: '概覽',
    groupComponents: '基礎元件',
    groupDesignSystem: '設計系統',
    navOverviewTitle: 'Introduction',
    navOverviewSub: '概覽',
    navButtonSub: '按鈕',
    navInputSub: '輸入框',
    navCheckboxSub: '核取方塊',
    navTokensTitle: 'Design Tokens',
    navTokensSub: '變數與材質',
  },
  controls: controlsZhTW,
  brands: {
    default: 'Fluent 藍',
    teal: '青碧 Teal',
    violet: '堇紫 Violet',
    forest: '森綠 Forest',
  },
  overview: {
    tocHighlights: '核心架構',
    tocTheming: '主題、品牌色與材質',
    tocShadowRules: 'Shadow DOM 規範',
    tocRoadmap: '按需封裝路線',
    descBeforeCode: '基於官方 ',
    descMidCode: '（Fluent 2 規範）的 Vue 3 輕量二次封裝元件庫。保留官方互動與無障礙邏輯，聚焦 ',
    descAfterCode: ' 雙向繫結、TypeScript 型別提示與獨立 Design Tokens 主題體系。',
    bannerTitle: 'Fluent 2 Web Components for Vue 3',
    bannerSub: '開箱即用依賴 @fluentui/web-components v3 · 459+ 官方變數 · Acrylic / Mica 材質',
    ctaTokens: '檢視 Design Tokens',
    ctaGithub: 'GitHub 原始碼',
    highlightsTitle: '核心架構',
    highlights: {
      thinTitle: '薄封裝策略',
      thinDescBefore: '不重寫底層互動與無障礙，僅封裝 Vue ',
      thinDescAfter: '、Props/Emits/Slots 型別與預設屬性。',
      tokensTitle: '獨立 Design Tokens',
      tokensDescBefore: '拆分語意變數、品牌色與 Acrylic/Mica 材質層，支援 ',
      tokensDescAfter: ' 全域切換與局部巢狀。',
      reuseTitle: '按需擴充與複用',
      reuseDescBefore: '已設定 Vite ',
      reuseDescAfter: ' 與多入口子路徑匯出，開箱即用，便於作為私有套件或 Monorepo 子套件複用。',
    },
    themingTitle: '主題、品牌色與材質',
    themingSubPrefix: '目前解析主題：',
    themingSubMid: '。切換品牌色階可即時覆寫全站強調色，下方同時示範 ',
    themingSubSuffix: ' 局部反色與 Acrylic 浮層材質。',
    brandGroupAriaLabel: '選擇品牌色',
    scopedLightTag: '淺色區域',
    scopedDarkTag: '深色區域',
    scopedAcrylicTitle: 'Acrylic 浮層 + Mica 底板',
    scopedLightSub: '半透明毛玻璃 + 細高光描邊',
    scopedDarkSub: '任意層級局部巢狀反色',
    shadowTitle: 'Shadow DOM 樣式覆寫規範',
    shadowSub: '統一遵循以下四級優先順序，避免強行穿透內部私有結構導致官方升級失效。',
    shadowRules: [
      {
        level: 'L1 首選',
        title: '覆寫 Design Tokens',
        desc: 'CSS 變數天然穿透 Shadow DOM，色彩、圓角、字體與間距統一透過 Token 覆寫。',
        sample: '--colorBrandBackground: #6b4fbb;',
      },
      {
        level: 'L2 推薦',
        title: '官方 ::part() 局部微調',
        desc: '需要調整內部節點樣式時，僅使用官方公開暴露的 part 名稱，不依賴私有結構。',
        sample: 'fluent-text-input::part(control) { ... }',
      },
      {
        level: 'L3 常規',
        title: '宿主與插槽版面樣式',
        desc: '尺寸、外距以及 Acrylic / Mica 材質表面直接作用於宿主標籤與插槽內容。',
        sample: '.vfk-surface-acrylic { backdrop-filter: ... }',
      },
      {
        level: 'L4 禁止',
        title: '禁止強行穿透內部結構',
        desc: '不透過腳本修改 shadowRoot，不依賴未宣告的內部類別名稱；Vue 的 :deep() 對 Shadow DOM 無效。',
        sample: '× shadowRoot / :deep()',
      },
    ],
    roadmapTitle: '按需封裝路線',
    roadmapSub: '首批基礎元件（VfkButton、VfkInput、VfkCheckbox）已完成，其餘元件按需逐步薄封裝接入。',
    roadmapStatusDone: '已實作',
    roadmapStatusPlanned: '規劃中',
    roadmapItems: [
      {
        name: 'VfkButton',
        tag: '<fluent-button>',
        desc: '基礎操作按鈕、外觀/形狀/尺寸、圖示插槽與 disabledFocusable',
        status: 'done',
        page: 'button',
      },
      {
        name: 'VfkInput',
        tag: '<fluent-text-input>',
        desc: '受控文字輸入、v-model 雙向繫結、前後綴插槽與尺寸對應',
        status: 'done',
        page: 'input',
      },
      {
        name: 'VfkCheckbox',
        tag: '<fluent-checkbox>',
        desc: '支援 boolean / mixed 三態的核取方塊與標籤組合',
        status: 'done',
        page: 'checkbox',
      },
      {
        name: 'VfkToggleButton',
        tag: '<fluent-toggle-button>',
        desc: '支援 v-model 的按壓切換按鈕，保留官方 ARIA 狀態',
        status: 'planned',
      },
      {
        name: 'VfkSelect / VfkOption',
        tag: '<fluent-dropdown>',
        desc: '基於官方下拉選單元件薄封裝的受控選擇器',
        status: 'planned',
      },
      {
        name: '更多 Fluent 2 元件',
        tag: '<fluent-*>',
        desc: 'Switch、Dialog、Drawer、Tabs、Menu、Tooltip 按需逐步擴充',
        status: 'planned',
      },
    ],
  },
  tokens: {
    eyebrow: '主題與變數',
    descBeforeCode: '所有色彩、字級、間距、圓角、陰影與材質變數統一維護在獨立樣式層，天然穿透 ',
    descMidCode: ' 的 Shadow DOM。點選任意項目即可複製 ',
    descAfterCode: '。',
    tabsAriaLabel: '變數分類',
    tabColors: '色彩變數',
    tabSurfaces: '材質表面',
    tabTypography: '排版刻度',
    tabElevation: '圓角與陰影',
    tabSpacing: '間距刻度',
    filterPlaceholder: '篩選色彩變數...',
    filterAriaLabel: '篩選色彩變數',
    clearFilterAriaLabel: '清除篩選',
    emptyFilterPrefix: '沒有符合「',
    emptyFilterSuffix: '」的色彩變數。',
    colorGroups: {
      background: '中性背景（Background）',
      foregroundStroke: '中性文字與描邊（Foreground & Stroke）',
      brand: '品牌色（Brand）',
      status: '語意狀態色（Status）',
    },
    colorLabels: {
      '--colorNeutralBackground1': '主面板 / 卡片',
      '--colorNeutralBackground2': '畫布 / 次級面板',
      '--colorNeutralBackground3': '填充輸入 / 側欄',
      '--colorNeutralBackground4': '深層背景',
      '--colorNeutralBackgroundDisabled': '停用背景',
      '--colorNeutralBackgroundInverted': '反色背景',
      '--colorNeutralForeground1': '主正文',
      '--colorNeutralForeground2': '次要文字',
      '--colorNeutralForeground3': '說明文字',
      '--colorNeutralForegroundDisabled': '停用文字',
      '--colorNeutralStroke1': '預設描邊',
      '--colorNeutralStroke2': '分隔線描邊',
      '--colorNeutralStrokeAccessible': '高對比元件描邊',
      '--colorStrokeFocus2': '鍵盤焦點外框',
      '--colorBrandBackground': '品牌主底色',
      '--colorBrandBackgroundHover': '品牌懸停底色',
      '--colorBrandBackgroundPressed': '品牌按下底色',
      '--colorBrandBackground2': '品牌淺底色',
      '--colorBrandForeground1': '品牌主前景',
      '--colorCompoundBrandStroke': '品牌啟用指示線',
      '--colorStatusSuccessBackground1': '成功淺底',
      '--colorStatusSuccessBackground3': '成功實心',
      '--colorStatusWarningBackground1': '警告淺底',
      '--colorStatusWarningBackground3': '警告實心',
      '--colorStatusDangerBackground1': '錯誤淺底',
      '--colorStatusDangerBackground3': '錯誤實心',
    },
    surfacesTitle: 'Acrylic（亞克力）與 Mica（雲母）材質',
    surfacesSub: '自動適配淺色/深色主題，在不支援 backdrop-filter 或開啟「減少透明效果」時自動回退。',
    acrylicTitle: 'Acrylic 亞克力浮層',
    acrylicDesc: '適合頂欄、浮層選單、側邊抽屜與內容卡片',
    micaTitle: 'Mica 雲母畫布',
    micaDesc: '低飽和品牌色微染色，適合應用主底板與大面積容器',
    surfaceListTitle: '材質變數清單',
    surfaceNotes: {
      '--vfkSurfaceAcrylicBg': '亞克力半透明填充色',
      '--vfkSurfaceAcrylicBlur': '亞克力背景模糊半徑（24px）',
      '--vfkSurfaceAcrylicBorder': '亞克力細高光描邊',
      '--vfkSurfaceMicaBg': '雲母畫布柔和漸層底色',
      '--vfkSurfaceMicaCardBg': '雲母次級卡片表面色',
    },
    typeSamples: {
      caption1: '輔助說明、表單提示與標註文字',
      body1: '預設正文與表單元件內容排版',
      body1Strong: '按鈕文字與強調型清單項目',
      body2: '大號元件與引導段落文字',
      subtitle1: '章節標題與對話框標題',
      title3: '模組主標題',
      title2: '頁面級大標題',
    },
    shadowsTitle: '陰影層級（Shadows）',
    shadowNotes: {
      '--shadow2': '卡片預設輕陰影',
      '--shadow4': '卡片標準高度',
      '--shadow8': '懸停卡片 / Tooltip / Toast',
      '--shadow16': '選單 / 下拉浮層 / Popover',
      '--shadow28': '抽屜面板',
      '--shadow64': '模態對話框',
    },
    radiusTitle: '圓角刻度（Border Radius）',
  },
}

const enUS: DemoMessages = {
  common: {
    onThisPage: 'On this page',
    copy: 'Copy',
    copied: 'Copied',
    copiedVar: 'Copied var(...)',
    copyFontSize: 'Copy size',
    showCode: 'Show code',
    hideCode: 'Hide code',
    liveCode: 'Live code',
    liveCanvas: 'Live canvas',
    controlsPanel: 'Controls',
    themeFollow: 'Inherit',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    apiKindProp: 'Prop',
    apiType: 'Type',
    apiDefault: 'Default',
    apiDescription: 'Description',
  },
  shell: {
    navAriaLabel: 'Component navigation',
    searchPlaceholder: 'Search components or tokens...',
    searchAriaLabel: 'Search components or tokens',
    clearSearchAriaLabel: 'Clear search',
    emptySearchPrefix: 'No results matching "',
    emptySearchSuffix: '"',
    kbdPrefix: 'Press',
    kbdSuffix: 'to inspect focus rings',
    openMenuAriaLabel: 'Toggle navigation menu',
    docsTab: 'Docs',
    breadcrumbAriaLabel: 'Breadcrumb',
    themeSwitchAriaLabel: 'Switch theme',
    langSwitchAriaLabel: 'Switch language',
    groupOverview: 'Overview',
    groupComponents: 'Components',
    groupDesignSystem: 'Design System',
    navOverviewTitle: 'Introduction',
    navOverviewSub: 'Start',
    navButtonSub: 'Action',
    navInputSub: 'Text Field',
    navCheckboxSub: 'Tri-state',
    navTokensTitle: 'Design Tokens',
    navTokensSub: 'Tokens & Surfaces',
  },
  controls: controlsEnUS,
  brands: {
    default: 'Fluent Blue',
    teal: 'Teal',
    violet: 'Violet',
    forest: 'Forest',
  },
  overview: {
    tocHighlights: 'Architecture',
    tocTheming: 'Theming, Brand & Surfaces',
    tocShadowRules: 'Shadow DOM Rules',
    tocRoadmap: 'Component Roadmap',
    descBeforeCode: 'A lightweight Vue 3 thin-wrapper component library built on official ',
    descMidCode: ' (Fluent 2). Keeps native interaction and accessibility intact while adding ',
    descAfterCode: ', TypeScript types, and an independent Design Tokens theme layer.',
    bannerTitle: 'Fluent 2 Web Components for Vue 3',
    bannerSub: 'Ready-to-use @fluentui/web-components v3 · 459+ Tokens · Acrylic & Mica Surfaces',
    ctaTokens: 'Explore Design Tokens',
    ctaGithub: 'GitHub',
    highlightsTitle: 'Core Architecture',
    highlights: {
      thinTitle: 'Thin Wrapper Strategy',
      thinDescBefore: 'Delegates interaction and ARIA to official elements, focusing on Vue ',
      thinDescAfter: ', typed Props/Emits/Slots, and consistent defaults.',
      tokensTitle: 'Independent Design Tokens',
      tokensDescBefore: 'Separates semantic tokens, brand ramps, and Acrylic/Mica surfaces with ',
      tokensDescAfter: ' switching and scoped nesting.',
      reuseTitle: 'Incremental & Reusable',
      reuseDescBefore: 'Preconfigured with Vite ',
      reuseDescAfter: ' and subpath exports for private packages or Monorepo workspaces.',
    },
    themingTitle: 'Theming, Brand & Surfaces',
    themingSubPrefix: 'Resolved theme: ',
    themingSubMid: '. Pick a brand ramp to tint the entire UI, and preview ',
    themingSubSuffix: ' scoped nesting with Acrylic & Mica surfaces below.',
    brandGroupAriaLabel: 'Select brand color',
    scopedLightTag: 'Light Scope',
    scopedDarkTag: 'Dark Scope',
    scopedAcrylicTitle: 'Acrylic Panel + Mica Canvas',
    scopedLightSub: 'Translucent blur with subtle highlight stroke',
    scopedDarkSub: 'Nested dark scope at any container level',
    shadowTitle: 'Shadow DOM Styling Rules',
    shadowSub: 'Follow these four priority levels to customize safely without breaking on upstream updates.',
    shadowRules: [
      {
        level: 'L1 Preferred',
        title: 'Override Design Tokens',
        desc: 'CSS variables pierce Shadow DOM naturally. Customize colors, radii, fonts, and spacing via tokens first.',
        sample: '--colorBrandBackground: #6b4fbb;',
      },
      {
        level: 'L2 Recommended',
        title: 'Official ::part() Selectors',
        desc: 'Use only officially exposed part names when adjusting internal layout or styling.',
        sample: 'fluent-text-input::part(control) { ... }',
      },
      {
        level: 'L3 Standard',
        title: 'Host & Slotted Styling',
        desc: 'Apply dimensions, spacing, and Acrylic/Mica surface classes directly to host elements and Light DOM slots.',
        sample: '.vfk-surface-acrylic { backdrop-filter: ... }',
      },
      {
        level: 'L4 Avoid',
        title: 'No Private DOM Piercing',
        desc: 'Never mutate shadowRoot internals or target undocumented classes; Vue :deep() does not cross Shadow DOM.',
        sample: '× shadowRoot / :deep()',
      },
    ],
    roadmapTitle: 'Incremental Wrapper Roadmap',
    roadmapSub: 'Core controls (VfkButton, VfkInput, VfkCheckbox) are implemented; remaining components will be wrapped on demand.',
    roadmapStatusDone: 'Done',
    roadmapStatusPlanned: 'Planned',
    roadmapItems: [
      {
        name: 'VfkButton',
        tag: '<fluent-button>',
        desc: 'Appearances, shapes, sizes, start/end icon slots, and disabledFocusable',
        status: 'done',
        page: 'button',
      },
      {
        name: 'VfkInput',
        tag: '<fluent-text-input>',
        desc: 'Controlled text input with v-model, slots, and unified size mapping',
        status: 'done',
        page: 'input',
      },
      {
        name: 'VfkCheckbox',
        tag: '<fluent-checkbox>',
        desc: 'Tri-state boolean / mixed checkbox paired with accessible label',
        status: 'done',
        page: 'checkbox',
      },
      {
        name: 'VfkToggleButton',
        tag: '<fluent-toggle-button>',
        desc: 'Toggle button with v-model binding and native ARIA pressed state',
        status: 'planned',
      },
      {
        name: 'VfkSelect / VfkOption',
        tag: '<fluent-dropdown>',
        desc: 'Controlled select wrapper powered by official Fluent dropdown',
        status: 'planned',
      },
      {
        name: 'More Fluent 2 Controls',
        tag: '<fluent-*>',
        desc: 'Switch, Dialog, Drawer, Tabs, Menu, Tooltip added incrementally',
        status: 'planned',
      },
    ],
  },
  tokens: {
    eyebrow: 'Theme',
    descBeforeCode: 'Colors, typography, spacing, radii, shadows, and surfaces live in an independent CSS layer that flows into ',
    descMidCode: ' Shadow DOM. Click any item to copy ',
    descAfterCode: '.',
    tabsAriaLabel: 'Token categories',
    tabColors: 'Colors',
    tabSurfaces: 'Surfaces',
    tabTypography: 'Typography',
    tabElevation: 'Radius & Shadows',
    tabSpacing: 'Spacing',
    filterPlaceholder: 'Filter color tokens...',
    filterAriaLabel: 'Filter color tokens',
    clearFilterAriaLabel: 'Clear filter',
    emptyFilterPrefix: 'No color tokens matching "',
    emptyFilterSuffix: '".',
    colorGroups: {
      background: 'Neutral Background',
      foregroundStroke: 'Neutral Foreground & Stroke',
      brand: 'Brand',
      status: 'Status',
    },
    colorLabels: {
      '--colorNeutralBackground1': 'Primary Surface / Card',
      '--colorNeutralBackground2': 'Canvas / Secondary Surface',
      '--colorNeutralBackground3': 'Filled Input / Sidebar',
      '--colorNeutralBackground4': 'Deep Surface',
      '--colorNeutralBackgroundDisabled': 'Disabled Surface',
      '--colorNeutralBackgroundInverted': 'Inverted Surface',
      '--colorNeutralForeground1': 'Primary Text',
      '--colorNeutralForeground2': 'Secondary Text',
      '--colorNeutralForeground3': 'Caption / Helper Text',
      '--colorNeutralForegroundDisabled': 'Disabled Text',
      '--colorNeutralStroke1': 'Default Stroke',
      '--colorNeutralStroke2': 'Divider Stroke',
      '--colorNeutralStrokeAccessible': 'Accessible Control Stroke',
      '--colorStrokeFocus2': 'Focus Ring Stroke',
      '--colorBrandBackground': 'Brand Primary Fill',
      '--colorBrandBackgroundHover': 'Brand Hover Fill',
      '--colorBrandBackgroundPressed': 'Brand Pressed Fill',
      '--colorBrandBackground2': 'Brand Subtle Fill',
      '--colorBrandForeground1': 'Brand Foreground',
      '--colorCompoundBrandStroke': 'Active Brand Indicator',
      '--colorStatusSuccessBackground1': 'Success Subtle',
      '--colorStatusSuccessBackground3': 'Success Solid',
      '--colorStatusWarningBackground1': 'Warning Subtle',
      '--colorStatusWarningBackground3': 'Warning Solid',
      '--colorStatusDangerBackground1': 'Danger Subtle',
      '--colorStatusDangerBackground3': 'Danger Solid',
    },
    surfacesTitle: 'Acrylic & Mica Surfaces',
    surfacesSub: 'Adapts automatically to Light/Dark themes and falls back cleanly when backdrop-filter is unsupported or prefers-reduced-transparency is enabled.',
    acrylicTitle: 'Acrylic Surface',
    acrylicDesc: 'Ideal for toolbars, popovers, drawers, and floating context cards',
    micaTitle: 'Mica Canvas',
    micaDesc: 'Subtle brand-tinted backdrop tailored for application shells and containers',
    surfaceListTitle: 'Surface Tokens',
    surfaceNotes: {
      '--vfkSurfaceAcrylicBg': 'Translucent acrylic fill color',
      '--vfkSurfaceAcrylicBlur': 'Acrylic backdrop blur radius (24px)',
      '--vfkSurfaceAcrylicBorder': 'Subtle acrylic highlight stroke',
      '--vfkSurfaceMicaBg': 'Soft gradient mica canvas background',
      '--vfkSurfaceMicaCardBg': 'Translucent card fill over mica canvas',
    },
    typeSamples: {
      caption1: 'Helper copy, form hints, and subtle annotations',
      body1: 'Default body text and form control content',
      body1Strong: 'Button labels and emphasized list items',
      body2: 'Large controls and introductory paragraphs',
      subtitle1: 'Section headings and dialog titles',
      title3: 'Module primary heading',
      title2: 'Page-level display heading',
    },
    shadowsTitle: 'Shadows',
    shadowNotes: {
      '--shadow2': 'Subtle resting card shadow',
      '--shadow4': 'Standard card elevation',
      '--shadow8': 'Hovered card / Tooltip / Toast',
      '--shadow16': 'Menu / Dropdown / Popover',
      '--shadow28': 'Drawer surface',
      '--shadow64': 'Modal dialog',
    },
    radiusTitle: 'Border Radius',
  },
}

export const demoMessages: Record<DemoLocale, DemoMessages> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS,
}
