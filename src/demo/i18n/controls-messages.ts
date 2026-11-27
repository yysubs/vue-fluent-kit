export interface DemoControlsMessages {
  playground: string
  eventsSlots: string
  viewDocs: string
  implementedTitle: string
  implementedSub: string
  button: {
    desc: string
    secAppearances: string
    secSizesShapes: string
    secIconsStates: string
    actionLabel: string
    nextLabel: string
    clickCountLabel: string
    cardAppearancesTitle: string
    cardAppearancesDesc: string
    cardSizesTitle: string
    cardShapesTitle: string
    cardIconsTitle: string
    cardDisabledTitle: string
    catalogDesc: string
    apiAppearance: string
    apiSize: string
    apiShape: string
    apiType: string
    apiDisabled: string
    apiDisabledFocusable: string
    apiIconOnly: string
    apiClick: string
    apiSlotDefault: string
    apiSlotStart: string
    apiSlotEnd: string
  }
  input: {
    desc: string
    secAppearances: string
    secSizesSlots: string
    secStates: string
    placeholder: string
    fieldLabel: string
    searchPlaceholder: string
    passwordPlaceholder: string
    togglePasswordAria: string
    readonlySample: string
    disabledSample: string
    cardAppearancesTitle: string
    cardAppearancesDesc: string
    cardSizesTitle: string
    cardSlotsTitle: string
    cardStatesTitle: string
    catalogDesc: string
    apiModelValue: string
    apiAppearance: string
    apiSize: string
    apiType: string
    apiPlaceholder: string
    apiFlags: string
    apiUpdate: string
    apiChange: string
    apiSlotDefault: string
    apiSlotStartEnd: string
  }
  checkbox: {
    desc: string
    secTristate: string
    secVariants: string
    sampleLabel: string
    setMixed: string
    cardTristateTitle: string
    cardTristateDesc: string
    selectAll: string
    optA: string
    optB: string
    optC: string
    cardSizesShapesTitle: string
    cardDisabledTitle: string
    labelBefore: string
    requiredLabel: string
    catalogDesc: string
    apiModelValue: string
    apiShape: string
    apiSize: string
    apiLabel: string
    apiLabelPosition: string
    apiFlags: string
    apiUpdate: string
    apiChange: string
    apiSlotDefault: string
    apiSlotIndicator: string
  }
}

export const controlsZhCN: DemoControlsMessages = {
  playground: '交互调试台',
  eventsSlots: '事件 / 插槽',
  viewDocs: '查看文档',
  implementedTitle: '已封装控件',
  implementedSub: '以下组件均基于官方 @fluentui/web-components v3 薄封装，内置 v-model、TS 类型与多语言文档页。',
  button: {
    desc: '基于官方 <fluent-button> 的薄封装按钮，支持 5 种视觉外观、3 种尺寸、3 种形状、前后置插槽以及 disabledFocusable 无障碍聚焦禁用。',
    secAppearances: '视觉外观',
    secSizesShapes: '尺寸与形状',
    secIconsStates: '图标插槽与禁用态',
    actionLabel: '新建项目',
    nextLabel: '下一步',
    clickCountLabel: '点击次数',
    cardAppearancesTitle: '五种 Fluent 2 按钮外观',
    cardAppearancesDesc: 'secondary 对应官方默认样式（不传 appearance 属性）。',
    cardSizesTitle: '尺寸（small / medium / large）',
    cardShapesTitle: '形状（rounded / circular / square）',
    cardIconsTitle: 'start / end 图标插槽与仅图标模式',
    cardDisabledTitle: '禁用与可聚焦禁用',
    catalogDesc: '5 种外观、3 档尺寸、3 种形状、图标插槽与 disabledFocusable',
    apiAppearance: '按钮视觉外观，secondary 映射为官方默认样式',
    apiSize: '按钮尺寸',
    apiShape: '圆角形状',
    apiType: '原生按钮类型',
    apiDisabled: '是否禁用',
    apiDisabledFocusable: '禁用但保留键盘聚焦，便于无障碍工具读取',
    apiIconOnly: '是否仅显示图标，未传时根据插槽自动判断',
    apiClick: '点击触发（disabled / disabledFocusable 时不触发）',
    apiSlotDefault: '按钮正文内容',
    apiSlotStart: '前置图标或装饰内容（映射 slot="start"）',
    apiSlotEnd: '后置图标或装饰内容（映射 slot="end"）',
  },
  input: {
    desc: '基于官方 <fluent-text-input> 的薄封装单行文本输入框，支持 Vue v-model 受控同步、control-size 统一尺寸映射以及内置标签和前后缀插槽。',
    secAppearances: '外观样式',
    secSizesSlots: '尺寸与插槽',
    secStates: '只读与禁用',
    placeholder: '请输入项目名称...',
    fieldLabel: '项目名称',
    searchPlaceholder: '输入关键词筛选...',
    passwordPlaceholder: '输入密码',
    togglePasswordAria: '切换密码可见性',
    readonlySample: '只读内容（可复制）',
    disabledSample: '禁用内容',
    cardAppearancesTitle: '四种 Fluent 2 输入框外观',
    cardAppearancesDesc: '支持 outline、underline、filled-darker 与 filled-lighter。',
    cardSizesTitle: '尺寸映射（size → control-size）',
    cardSlotsTitle: 'start / end 前后缀插槽交互',
    cardStatesTitle: '只读（readonly）与禁用（disabled）',
    catalogDesc: '受控 v-model、4 种外观、3 档尺寸与内置标签/前后缀插槽',
    apiModelValue: '双向绑定输入值',
    apiAppearance: '输入框视觉外观',
    apiSize: '控件尺寸，内部映射为官方 control-size 属性',
    apiType: '原生输入类型',
    apiPlaceholder: '占位提示文本',
    apiFlags: '禁用、只读、必填状态',
    apiUpdate: '输入时同步更新 v-model',
    apiChange: '提交修改时触发',
    apiSlotDefault: '内置标签文本（有内容时自动展示）',
    apiSlotStartEnd: '输入框前缀与后缀插槽（映射 slot="start" / "end"）',
  },
  checkbox: {
    desc: '基于官方 <fluent-checkbox> 的薄封装复选框，支持 true / false / "mixed" 三态 v-model、自动 label 关联以及形状/尺寸/标签位置配置。',
    secTristate: '三态联动（mixed）',
    secVariants: '尺寸、形状与禁用态',
    sampleLabel: '启用自动预览部署',
    setMixed: '设为半选 (mixed)',
    cardTristateTitle: '全选 / 半选（indeterminate）联动示例',
    cardTristateDesc: '部分子项选中时自动呈现 mixed 半选态，点击后统一全选或取消。',
    selectAll: '全选部署选项',
    optA: '分支预览',
    optB: '类型检查',
    optC: '构建缓存',
    cardSizesShapesTitle: '尺寸、形状与标签位置',
    cardDisabledTitle: '禁用与必填状态',
    labelBefore: '标签位于左侧',
    requiredLabel: '必填同意项',
    catalogDesc: '支持 boolean / mixed 三态、自动 label 关联与圆角形状',
    apiModelValue: '当前勾选状态，支持 true / false / "mixed"',
    apiShape: '指示器形状',
    apiSize: '指示器尺寸',
    apiLabel: '标签文本（未传默认插槽时生效）',
    apiLabelPosition: '标签相对勾选框的位置',
    apiFlags: '禁用与必填状态（开启 required 时显示星号）',
    apiUpdate: '勾选变化时同步更新 v-model',
    apiChange: '勾选状态变更事件',
    apiSlotDefault: '自定义标签内容',
    apiSlotIndicator: '自定义选中 / 半选指示图标',
  },
}

export const controlsZhTW: DemoControlsMessages = {
  playground: '互動除錯台',
  eventsSlots: '事件 / 插槽',
  viewDocs: '檢視文件',
  implementedTitle: '已封裝元件',
  implementedSub: '以下元件皆基於官方 @fluentui/web-components v3 薄封裝，內建 v-model、TS 型別與多語言文件頁。',
  button: {
    desc: '基於官方 <fluent-button> 的薄封裝按鈕，支援 5 種視覺外觀、3 種尺寸、3 種形狀、前後置插槽以及 disabledFocusable 無障礙聚焦停用。',
    secAppearances: '視覺外觀',
    secSizesShapes: '尺寸與形狀',
    secIconsStates: '圖示插槽與停用態',
    actionLabel: '建立專案',
    nextLabel: '下一步',
    clickCountLabel: '點擊次數',
    cardAppearancesTitle: '五種 Fluent 2 按鈕外觀',
    cardAppearancesDesc: 'secondary 對應官方預設樣式（不傳 appearance 屬性）。',
    cardSizesTitle: '尺寸（small / medium / large）',
    cardShapesTitle: '形狀（rounded / circular / square）',
    cardIconsTitle: 'start / end 圖示插槽與僅圖示模式',
    cardDisabledTitle: '停用與可聚焦停用',
    catalogDesc: '5 種外觀、3 檔尺寸、3 種形狀、圖示插槽與 disabledFocusable',
    apiAppearance: '按鈕視覺外觀，secondary 對應官方預設樣式',
    apiSize: '按鈕尺寸',
    apiShape: '圓角形狀',
    apiType: '原生按鈕型別',
    apiDisabled: '是否停用',
    apiDisabledFocusable: '停用但保留鍵盤聚焦，便於無障礙工具讀取',
    apiIconOnly: '是否僅顯示圖示，未傳時依插槽自動判斷',
    apiClick: '點擊觸發（disabled / disabledFocusable 時不觸發）',
    apiSlotDefault: '按鈕正文內容',
    apiSlotStart: '前置圖示或裝飾內容（對應 slot="start"）',
    apiSlotEnd: '後置圖示或裝飾內容（對應 slot="end"）',
  },
  input: {
    desc: '基於官方 <fluent-text-input> 的薄封裝單行文字輸入框，支援 Vue v-model 受控同步、control-size 統一尺寸對應以及內建標籤與前後綴插槽。',
    secAppearances: '外觀樣式',
    secSizesSlots: '尺寸與插槽',
    secStates: '唯讀與停用',
    placeholder: '請輸入專案名稱...',
    fieldLabel: '專案名稱',
    searchPlaceholder: '輸入關鍵字篩選...',
    passwordPlaceholder: '輸入密碼',
    togglePasswordAria: '切換密碼顯示',
    readonlySample: '唯讀內容（可複製）',
    disabledSample: '停用內容',
    cardAppearancesTitle: '四種 Fluent 2 輸入框外觀',
    cardAppearancesDesc: '支援 outline、underline、filled-darker 與 filled-lighter。',
    cardSizesTitle: '尺寸對應（size → control-size）',
    cardSlotsTitle: 'start / end 前後綴插槽互動',
    cardStatesTitle: '唯讀（readonly）與停用（disabled）',
    catalogDesc: '受控 v-model、4 種外觀、3 檔尺寸與內建標籤/前後綴插槽',
    apiModelValue: '雙向繫結輸入值',
    apiAppearance: '輸入框視覺外觀',
    apiSize: '元件尺寸，內部對應為官方 control-size 屬性',
    apiType: '原生輸入型別',
    apiPlaceholder: '佔位提示文字',
    apiFlags: '停用、唯讀、必填狀態',
    apiUpdate: '輸入時同步更新 v-model',
    apiChange: '提交變更時觸發',
    apiSlotDefault: '內建標籤文字（有內容時自動顯示）',
    apiSlotStartEnd: '輸入框前綴與後綴插槽（對應 slot="start" / "end"）',
  },
  checkbox: {
    desc: '基於官方 <fluent-checkbox> 的薄封裝核取方塊，支援 true / false / "mixed" 三態 v-model、自動 label 關聯以及形狀/尺寸/標籤位置設定。',
    secTristate: '三態連動（mixed）',
    secVariants: '尺寸、形狀與停用態',
    sampleLabel: '啟用自動預覽部署',
    setMixed: '設為半選 (mixed)',
    cardTristateTitle: '全選 / 半選（indeterminate）連動範例',
    cardTristateDesc: '部分子項選取時自動呈現 mixed 半選態，點擊後統一全選或取消。',
    selectAll: '全選部署選項',
    optA: '分支預覽',
    optB: '型別檢查',
    optC: '建置快取',
    cardSizesShapesTitle: '尺寸、形狀與標籤位置',
    cardDisabledTitle: '停用與必填狀態',
    labelBefore: '標籤位於左側',
    requiredLabel: '必填同意項',
    catalogDesc: '支援 boolean / mixed 三態、自動 label 關聯與圓角形狀',
    apiModelValue: '目前勾選狀態，支援 true / false / "mixed"',
    apiShape: '指示器形狀',
    apiSize: '指示器尺寸',
    apiLabel: '標籤文字（未傳預設插槽時生效）',
    apiLabelPosition: '標籤相對核取方塊的位置',
    apiFlags: '停用與必填狀態（開啟 required 時顯示星號）',
    apiUpdate: '勾選變更時同步更新 v-model',
    apiChange: '勾選狀態變更事件',
    apiSlotDefault: '自訂標籤內容',
    apiSlotIndicator: '自訂選取 / 半選指示圖示',
  },
}

export const controlsEnUS: DemoControlsMessages = {
  playground: 'Playground',
  eventsSlots: 'Events / Slots',
  viewDocs: 'View docs',
  implementedTitle: 'Implemented Components',
  implementedSub: 'Thin Vue 3 wrappers over official @fluentui/web-components v3 with v-model, TypeScript types, and interactive docs.',
  button: {
    desc: 'Thin Vue wrapper over official <fluent-button> supporting 5 appearances, 3 sizes, 3 shapes, start/end icon slots, and accessible disabledFocusable.',
    secAppearances: 'Appearances',
    secSizesShapes: 'Sizes & Shapes',
    secIconsStates: 'Icons & Disabled States',
    actionLabel: 'New Project',
    nextLabel: 'Next',
    clickCountLabel: 'Click count',
    cardAppearancesTitle: 'Five Fluent 2 Appearances',
    cardAppearancesDesc: 'secondary maps to the default official style (omits appearance attribute).',
    cardSizesTitle: 'Sizes (small / medium / large)',
    cardShapesTitle: 'Shapes (rounded / circular / square)',
    cardIconsTitle: 'start / end Slots & Icon-Only Mode',
    cardDisabledTitle: 'Disabled & Disabled Focusable',
    catalogDesc: '5 appearances, 3 sizes, 3 shapes, icon slots & disabledFocusable',
    apiAppearance: 'Visual appearance; secondary uses default official styling',
    apiSize: 'Button size',
    apiShape: 'Corner radius shape',
    apiType: 'Native button type',
    apiDisabled: 'Disables interaction and focus',
    apiDisabledFocusable: 'Disables action while remaining keyboard focusable for screen readers',
    apiIconOnly: 'Icon-only square sizing; auto-detected when only icon slots are provided',
    apiClick: 'Fired on click (suppressed when disabled or disabledFocusable)',
    apiSlotDefault: 'Primary button label content',
    apiSlotStart: 'Leading icon or content (maps to slot="start")',
    apiSlotEnd: 'Trailing icon or content (maps to slot="end")',
  },
  input: {
    desc: 'Thin Vue wrapper over official <fluent-text-input> with controlled v-model sync, unified size -> control-size mapping, built-in label, and start/end slots.',
    secAppearances: 'Appearances',
    secSizesSlots: 'Sizes & Slots',
    secStates: 'Readonly & Disabled',
    placeholder: 'Enter project name...',
    fieldLabel: 'Project name',
    searchPlaceholder: 'Filter by keyword...',
    passwordPlaceholder: 'Enter password',
    togglePasswordAria: 'Toggle password visibility',
    readonlySample: 'Read-only value (copyable)',
    disabledSample: 'Disabled value',
    cardAppearancesTitle: 'Four Fluent 2 Input Appearances',
    cardAppearancesDesc: 'Supports outline, underline, filled-darker, and filled-lighter.',
    cardSizesTitle: 'Size Mapping (size → control-size)',
    cardSlotsTitle: 'start / end Prefix & Suffix Slots',
    cardStatesTitle: 'Readonly & Disabled States',
    catalogDesc: 'Controlled v-model, 4 appearances, 3 sizes & start/end slots',
    apiModelValue: 'Controlled text value for v-model',
    apiAppearance: 'Input visual appearance',
    apiSize: 'Control size mapped to official control-size attribute',
    apiType: 'Native input type',
    apiPlaceholder: 'Placeholder hint text',
    apiFlags: 'Disabled, readonly, and required flags',
    apiUpdate: 'Emitted on input to update v-model',
    apiChange: 'Emitted when value is committed',
    apiSlotDefault: 'Built-in label text (shown automatically when non-empty)',
    apiSlotStartEnd: 'Leading and trailing slots (maps to slot="start" / "end")',
  },
  checkbox: {
    desc: 'Thin Vue wrapper over official <fluent-checkbox> supporting true / false / "mixed" tri-state v-model, automatic label association, and shape/size/labelPosition options.',
    secTristate: 'Tri-state (mixed)',
    secVariants: 'Sizes, Shapes & States',
    sampleLabel: 'Enable preview deployments',
    setMixed: 'Set mixed state',
    cardTristateTitle: 'Select-All / Indeterminate Group',
    cardTristateDesc: 'Automatically reflects mixed state when a subset of items is checked.',
    selectAll: 'Select all deployment options',
    optA: 'Branch previews',
    optB: 'Type checking',
    optC: 'Build cache',
    cardSizesShapesTitle: 'Sizes, Shapes & Label Position',
    cardDisabledTitle: 'Disabled & Required States',
    labelBefore: 'Label before box',
    requiredLabel: 'Required agreement',
    catalogDesc: 'Boolean & mixed tri-state v-model, accessible label & shapes',
    apiModelValue: 'Checked state: true, false, or "mixed"',
    apiShape: 'Indicator shape',
    apiSize: 'Indicator size',
    apiLabel: 'Label text (used when default slot is omitted)',
    apiLabelPosition: 'Label position relative to checkbox',
    apiFlags: 'Disabled and required states (shows asterisk when required)',
    apiUpdate: 'Emitted when checked state toggles',
    apiChange: 'Fired on user toggle with next boolean value',
    apiSlotDefault: 'Custom label content',
    apiSlotIndicator: 'Custom checked / indeterminate indicator icons',
  },
}
