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
  toggleButton: {
    desc: string
    secAppearances: string
    secControlled: string
    secVariants: string
    sampleLabel: string
    pressedLabel: string
    unpressedLabel: string
    mixedLabel: string
    setMixed: string
    stateLabel: string
    cardAppearancesTitle: string
    cardAppearancesDesc: string
    cardControlledTitle: string
    cardControlledDesc: string
    cardVariantsTitle: string
    cardDisabledTitle: string
    toolbarPin: string
    toolbarFilter: string
    toolbarNotify: string
    catalogDesc: string
    apiModelValue: string
    apiAppearance: string
    apiSize: string
    apiShape: string
    apiDisabled: string
    apiDisabledFocusable: string
    apiIconOnly: string
    apiUpdate: string
    apiChange: string
    apiClick: string
    apiSlots: string
  }
  searchBox: {
    desc: string
    secAppearances: string
    secSizes: string
    secStates: string
    placeholder: string
    fieldLabel: string
    dismissLabel: string
    lastSearchLabel: string
    clearCountLabel: string
    noneYet: string
    cardAppearancesTitle: string
    cardAppearancesDesc: string
    cardSizesTitle: string
    cardSlotsTitle: string
    cardStatesTitle: string
    readonlySample: string
    disabledSample: string
    catalogDesc: string
    apiModelValue: string
    apiAppearance: string
    apiSize: string
    apiPlaceholder: string
    apiDismissLabel: string
    apiFlags: string
    apiUpdate: string
    apiSearch: string
    apiClear: string
    apiSlots: string
  }
  select: {
    desc: string
    secAppearances: string
    secSizes: string
    secRichDisabled: string
    placeholder: string
    clearSelection: string
    currentValue: string
    emptyValue: string
    cardAppearancesTitle: string
    cardAppearancesDesc: string
    cardSizesTitle: string
    cardRichTitle: string
    cardRichDesc: string
    cardDisabledTitle: string
    optProd: string
    optProdDesc: string
    optStaging: string
    optStagingDesc: string
    optDev: string
    optDevDesc: string
    optLegacy: string
    optLegacyDesc: string
    catalogDesc: string
    apiModelValue: string
    apiAppearance: string
    apiSize: string
    apiPlaceholder: string
    apiFlags: string
    apiName: string
    apiUpdate: string
    apiChange: string
    apiSlotDefault: string
    apiSlotIndicator: string
    apiOptionValue: string
    apiOptionText: string
    apiOptionDisabled: string
    apiOptionSlots: string
  }
  swatchPicker: {
    desc: string
    secSizesShapes: string
    secLayoutSpacing: string
    secStates: string
    ariaLabel: string
    currentColor: string
    emptyValue: string
    cardSizesTitle: string
    cardShapesTitle: string
    cardGridTitle: string
    cardGridDesc: string
    cardSpacingTitle: string
    cardBorderDisabledTitle: string
    cardBorderDisabledDesc: string
    cardGroupDisabledTitle: string
    colorRed: string
    colorOrange: string
    colorYellow: string
    colorGreen: string
    colorTeal: string
    colorBlue: string
    colorViolet: string
    colorWhite: string
    colorGray: string
    catalogDesc: string
    apiModelValue: string
    apiSize: string
    apiShape: string
    apiLayout: string
    apiColumnCount: string
    apiSpacing: string
    apiDisabled: string
    apiUpdate: string
    apiChange: string
    apiSlotDefault: string
    apiSwatchValue: string
    apiSwatchColor: string
    apiSwatchBorderColor: string
    apiSwatchLabel: string
    apiSwatchDisabled: string
    apiSwatchSlotDefault: string
  }
  switch: {
    desc: string
    secBasic: string
    secStates: string
    sampleLabel: string
    stateOn: string
    stateOff: string
    stateLabel: string
    cardBasicTitle: string
    cardBasicDesc: string
    cardStatesTitle: string
    labelBefore: string
    requiredLabel: string
    disabledOn: string
    disabledOff: string
    catalogDesc: string
    apiModelValue: string
    apiLabel: string
    apiLabelPosition: string
    apiFlags: string
    apiUpdate: string
    apiChange: string
    apiSlotDefault: string
  }
  radio: {
    desc: string
    secOrientation: string
    secStates: string
    currentValue: string
    cardOrientationTitle: string
    cardOrientationDesc: string
    cardStatesTitle: string
    optStandard: string
    optFast: string
    optCustom: string
    optDisabled: string
    catalogDesc: string
    apiModelValue: string
    apiOrientation: string
    apiFlags: string
    apiName: string
    apiUpdate: string
    apiChange: string
    apiRadioProps: string
  }
  combobox: {
    desc: string
    secAppearances: string
    secSizes: string
    secFilterFreeform: string
    secRichDisabled: string
    placeholder: string
    freeformPlaceholder: string
    freeformPrefix: string
    currentValue: string
    lastInput: string
    emptyValue: string
    clearSelection: string
    optVue: string
    optVite: string
    optReact: string
    optSvelte: string
    optAngular: string
    optLegacy: string
    optVueDesc: string
    optViteDesc: string
    optReactDesc: string
    optLegacyDesc: string
    cardAppearancesTitle: string
    cardAppearancesDesc: string
    cardSizesTitle: string
    cardFilterTitle: string
    cardFilterDesc: string
    cardFreeformTitle: string
    cardFreeformDesc: string
    cardRichTitle: string
    cardRichDesc: string
    cardDisabledTitle: string
    catalogDesc: string
    apiModelValue: string
    apiAppearance: string
    apiSize: string
    apiPlaceholder: string
    apiFilter: string
    apiFreeform: string
    apiFlags: string
    apiName: string
    apiUpdate: string
    apiChange: string
    apiInput: string
    apiSlotDefault: string
    apiSlotIndicator: string
    apiSlotFreeform: string
  }
  field: {
    desc: string
    secValidation: string
    secForm: string
    sampleLabel: string
    sampleHint: string
    sampleError: string
    sampleWarning: string
    sampleSuccess: string
    cardValidationTitle: string
    cardValidationDesc: string
    cardFormTitle: string
    cardFormDesc: string
    formNameLabel: string
    formNamePlaceholder: string
    formNameHint: string
    formEnvLabel: string
    formStrategyLabel: string
    formAutoDeployLabel: string
    catalogDesc: string
    apiLabel: string
    apiFor: string
    apiOrientation: string
    apiSize: string
    apiFlags: string
    apiValidationState: string
    apiValidationMessage: string
    apiHint: string
    apiSlots: string
  }
  tree: {
    desc: string
    secSlots: string
    secNavigation: string
    currentValue: string
    lastToggle: string
    noneSelected: string
    groupDocs: string
    groupGuides: string
    groupComponents: string
    nodeOverview: string
    nodeTheming: string
    nodeTokens: string
    nodeButton: string
    nodeInput: string
    nodeTree: string
    cardSlotsTitle: string
    cardSlotsDesc: string
    cardNavTitle: string
    cardNavDesc: string
    navGroupMain: string
    navGroupSettings: string
    navItemDashboard: string
    navItemAnalytics: string
    navItemProfile: string
    navItemSecurity: string
    navActionHint: string
    catalogDesc: string
    apiModelValue: string
    apiAppearance: string
    apiSize: string
    apiUpdate: string
    apiChange: string
    apiToggle: string
    apiItemProps: string
    apiSlots: string
  }
  tabs: {
    desc: string
    secLayout: string
    secIcons: string
    currentValue: string
    tabOverview: string
    tabSpecs: string
    tabLogs: string
    tabDisabled: string
    panelOverview: string
    panelSpecs: string
    panelLogs: string
    cardVerticalTitle: string
    cardVerticalDesc: string
    cardSizesTitle: string
    cardIconsTitle: string
    cardIconsDesc: string
    catalogDesc: string
    apiModelValue: string
    apiAppearance: string
    apiOrientation: string
    apiSize: string
    apiDisabled: string
    apiUpdate: string
    apiChange: string
    apiTabProps: string
  }
  dialog: {
    desc: string
    catalogDesc: string
    secTypes: string
    secBody: string
    sampleTitle: string
    sampleBody: string
    confirm: string
    cancel: string
    btnModal: string
    btnAlert: string
    btnNonModal: string
    bodyTitle: string
    bodyDesc: string
    stateLabel: string
    stateOpen: string
    stateClosed: string
    cardTypesTitle: string
    cardTypesDesc: string
    cardBodyTitle: string
    cardBodyDesc: string
    apiModelValue: string
    apiType: string
    apiAria: string
    apiMaxWidth: string
    apiUpdate: string
    apiOpenChange: string
    apiSlots: string
    apiBody: string
  }
  drawer: {
    desc: string
    catalogDesc: string
    secTypes: string
    secPosition: string
    sampleTitle: string
    sampleBody: string
    footerApply: string
    btnModal: string
    btnNonModal: string
    btnInline: string
    btnEnd: string
    stateLabel: string
    stateOpen: string
    stateClosed: string
    cardTypesTitle: string
    cardTypesDesc: string
    cardPositionTitle: string
    cardPositionDesc: string
    apiModelValue: string
    apiType: string
    apiPositionSize: string
    apiWidth: string
    apiAria: string
    apiUpdate: string
    apiOpenChange: string
    apiSlots: string
    apiBody: string
  }
  badge: {
    desc: string
    catalogDesc: string
    secAppearances: string
    secColors: string
    secSizesShapes: string
    sampleText: string
    apiAppearance: string
    apiColor: string
    apiSize: string
    apiShape: string
    apiSlots: string
  }
  textarea: {
    desc: string
    catalogDesc: string
    secAppearances: string
    secResize: string
    secStates: string
    placeholder: string
    sampleLabel: string
    cardAppearancesTitle: string
    cardAppearancesDesc: string
    cardResizeTitle: string
    cardResizeDesc: string
    cardStatesTitle: string
    apiModelValue: string
    apiAppearance: string
    apiSize: string
    apiResize: string
    apiAutoResize: string
    apiBlock: string
    apiMinHeight: string
    apiFlags: string
    apiUpdate: string
    apiChange: string
    apiSlotLabel: string
  }
  tooltip: {
    desc: string
    catalogDesc: string
    secDirections: string
    secContent: string
    triggerLabel: string
    richTextTitle: string
    richTextBody: string
    cardDirectionsTitle: string
    cardDirectionsDesc: string
    cardContentTitle: string
    cardContentDesc: string
    apiText: string
    apiAnchor: string
    apiPositioning: string
    apiDelay: string
    apiSlots: string
  }
  menu: {
    desc: string
    secCheckRadio: string
    secSubmenuContext: string
    triggerLabel: string
    primaryActionLabel: string
    lastAction: string
    noneAction: string
    itemNew: string
    itemCopy: string
    itemExport: string
    itemDelete: string
    itemDisabled: string
    cardCheckRadioTitle: string
    cardCheckRadioDesc: string
    checkGrid: string
    checkRuler: string
    radioAsc: string
    radioDesc: string
    checkRadioTrigger: string
    cardSubmenuTitle: string
    cardSubmenuDesc: string
    submenuTrigger: string
    submenuShare: string
    submenuCopyLink: string
    submenuEmail: string
    contextZoneHint: string
    catalogDesc: string
    apiFlags: string
    apiSplit: string
    apiMaxHeight: string
    apiOpenChange: string
    apiListSelect: string
    apiItemProps: string
    apiSlots: string
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
  toggleButton: {
    desc: '基于官方 <fluent-toggle-button> 的薄封装切换按钮，支持 true / false / "mixed" 受控 v-model 绑定、5 种视觉外观以及原生 aria-pressed 无障碍状态。',
    secAppearances: '视觉外观',
    secControlled: '受控切换与半按压态',
    secVariants: '尺寸、形状与禁用态',
    sampleLabel: '自动保存',
    pressedLabel: '已按下',
    unpressedLabel: '未按下',
    mixedLabel: '半按压（mixed）',
    setMixed: '设为 mixed',
    stateLabel: '当前状态',
    cardAppearancesTitle: '五种 Fluent 2 切换按钮外观',
    cardAppearancesDesc: '点击各按钮可对比按下与弹起状态的视觉差异。',
    cardControlledTitle: '工具栏受控 v-model 与 mixed 状态',
    cardControlledDesc: '点击切换布尔值；处于 mixed 半按压态时点击会统一切换为 true。',
    cardVariantsTitle: '尺寸、形状与仅图标模式',
    cardDisabledTitle: '禁用与可聚焦禁用',
    toolbarPin: '置顶预览',
    toolbarFilter: '仅看错误',
    toolbarNotify: '部署通知',
    catalogDesc: '受控 v-model、boolean / mixed 按压态、5 种外观与图标插槽',
    apiModelValue: '当前按压状态，支持 true / false / "mixed"',
    apiAppearance: '按钮视觉外观，secondary 映射为官方默认样式',
    apiSize: '按钮尺寸',
    apiShape: '圆角形状',
    apiDisabled: '是否禁用',
    apiDisabledFocusable: '禁用但保留键盘聚焦，便于无障碍工具读取',
    apiIconOnly: '是否仅显示图标，未传时根据插槽自动判断',
    apiUpdate: '切换按压态时同步更新 v-model',
    apiChange: '按压态变更事件，附带最新布尔值与事件对象',
    apiClick: '点击触发（disabled / disabledFocusable 时不触发）',
    apiSlots: '按钮正文及前后置图标插槽（映射 slot="start" / "end"）',
  },
  searchBox: {
    desc: '参照 Fluent 2 SearchBox 规范并基于 VfkInput 扩展的搜索框，内置前置搜索图标、聚焦或有值时自动显示的清除按钮（点击清空并归还焦点），以及 Enter 搜索与 Escape 清空快捷键。',
    secAppearances: '外观样式',
    secSizes: '尺寸与自定义插槽',
    secStates: '状态与事件',
    placeholder: '搜索组件或变量...',
    fieldLabel: '快速检索',
    dismissLabel: '清除搜索',
    lastSearchLabel: '最近搜索',
    clearCountLabel: '清除次数',
    noneYet: '暂无',
    cardAppearancesTitle: '四种 Fluent 2 外观',
    cardAppearancesDesc: '外观与 VfkInput 保持一致，支持 outline、underline、filled-darker 与 filled-lighter。',
    cardSizesTitle: '三档尺寸规格',
    cardSlotsTitle: '自定义前置图标与后置快捷键',
    cardStatesTitle: '只读与禁用态',
    readonlySample: '只读搜索内容',
    disabledSample: '已禁用搜索框',
    catalogDesc: '基于 VfkInput 扩展，前置搜索图标、清除按钮还原焦点与 Enter/Escape 快捷键',
    apiModelValue: '受控搜索文本，用于 v-model 双向绑定',
    apiAppearance: '视觉外观，与 VfkInput 一致',
    apiSize: '控件尺寸（small / medium / large）',
    apiPlaceholder: '空值时的占位提示文字',
    apiDismissLabel: '内置清除按钮的无障碍名称（aria-label）',
    apiFlags: '禁用、只读与必填表单状态',
    apiUpdate: '输入或清空时触发，同步更新 v-model',
    apiSearch: '按下 Enter 键（非输入法组合态）时触发并附带当前关键词',
    apiClear: '点击清除按钮或按 Escape 清空时触发',
    apiSlots: '内置标签（#default）、前置图标（#start）、清除图标（#dismiss）与附加后缀（#end）',
  },
  select: {
    desc: '基于官方 <fluent-dropdown>、<fluent-listbox> 与 <fluent-option> 的薄封装下拉选择器，支持单选 v-model、4 种外观、3 档尺寸及带描述/图标的选项。',
    secAppearances: '外观样式',
    secSizes: '尺寸规格',
    secRichDisabled: '图标描述与禁用态',
    placeholder: '请选择部署环境...',
    clearSelection: '清空选择',
    currentValue: '当前选中值',
    emptyValue: '（未选择）',
    cardAppearancesTitle: '四种 Fluent 2 下拉外观',
    cardAppearancesDesc: '支持 outline（默认）、transparent、filled-darker 与 filled-lighter。',
    cardSizesTitle: '尺寸（small / medium / large）',
    cardRichTitle: '带图标、副标题描述与禁用选项',
    cardRichDesc: '选项包含描述时可通过 text 属性指定触发器展示的简短文案。',
    cardDisabledTitle: '整体禁用态',
    optProd: '生产环境',
    optProdDesc: '面向正式流量，自动启用高可用副本',
    optStaging: '预发布环境',
    optStagingDesc: '与生产配置一致，供上线前验收',
    optDev: '开发环境',
    optDevDesc: '跟随分支自动构建预览',
    optLegacy: '旧版集群（已停用）',
    optLegacyDesc: '仅保留历史归档，不可选择',
    catalogDesc: '基于 fluent-dropdown 的受控 v-model 选择器与选项插槽',
    apiModelValue: '受控选中项的值，用于 v-model 双向绑定',
    apiAppearance: '下拉触发器视觉外观，outline 为默认样式',
    apiSize: '下拉触发器尺寸',
    apiPlaceholder: '未选中项时显示的占位文案',
    apiFlags: '禁用与必填状态',
    apiName: '表单字段名',
    apiUpdate: '选中项变更时同步更新 v-model',
    apiChange: '选中项变更事件，附带最新值与事件对象',
    apiSlotDefault: '放置 VfkOption 列表（内部自动包裹 fluent-listbox）',
    apiSlotIndicator: '自定义右侧展开箭头图标（映射 slot="indicator"）',
    apiOptionValue: '选项唯一值，与 VfkSelect 的 modelValue 匹配',
    apiOptionText: '选项包含描述等内容时，覆盖显示在触发器上的文案',
    apiOptionDisabled: '禁用单个选项，跳过键盘导航与点击',
    apiOptionSlots: '选项主文案、前置图标、副标题描述与自定义勾选图标',
  },
  swatchPicker: {
    desc: '参照 Fluent 2 SwatchPicker 规范实现的色板单选组件，提供 radiogroup / radio 语义、roving tabindex 键盘导航、双层选中内阴影以及 4 档尺寸与 3 种形状。',
    secSizesShapes: '尺寸与形状',
    secLayoutSpacing: '布局与间距',
    secStates: '描边与禁用态',
    ariaLabel: '选择颜色',
    currentColor: '当前颜色',
    emptyValue: '（未选择）',
    cardSizesTitle: '四档色块尺寸',
    cardShapesTitle: '三种色块形状',
    cardGridTitle: '网格布局（layout="grid"）',
    cardGridDesc: '配合 columnCount 固定每行列数，上下方向键按列在色块间跳转。',
    cardSpacingTitle: '色块间距（small / medium）',
    cardBorderDisabledTitle: '浅色内描边与单个禁用色块',
    cardBorderDisabledDesc: '白色等浅色色块可传 borderColor 保持轮廓可辨识；禁用色块叠加斜线且方向键自动跳过。',
    cardGroupDisabledTitle: '整体禁用',
    colorRed: '猩红',
    colorOrange: '亮橙',
    colorYellow: '暖黄',
    colorGreen: '翠绿',
    colorTeal: '青碧',
    colorBlue: '官方蓝',
    colorViolet: '紫罗兰',
    colorWhite: '纯白',
    colorGray: '中性灰',
    catalogDesc: '色板单选组件，支持 4 档尺寸、3 种形状、网格布局与方向键导航',
    apiModelValue: '受控选中色块值，用于 v-model 双向绑定',
    apiSize: '色块尺寸（extra-small 20px / small 24px / medium 28px / large 32px）',
    apiShape: '色块形状（square / rounded / circular）',
    apiLayout: '排列方式（row 单行换行 / grid 固定列数网格）',
    apiColumnCount: 'grid 布局下每行色块数量',
    apiSpacing: '色块间距（small 2px / medium 4px）',
    apiDisabled: '整体禁用色板',
    apiUpdate: '选中色块变化时触发，同步更新 v-model',
    apiChange: '选中色块变化时触发，附带原始事件',
    apiSlotDefault: '放置 VfkColorSwatch 色块列表',
    apiSwatchValue: '色块唯一值，与 VfkSwatchPicker 的 modelValue 匹配',
    apiSwatchColor: '色块展示颜色（任意 CSS 颜色值，不传时使用 value）',
    apiSwatchBorderColor: '1px 内描边颜色，用于浅色色块在浅色表面保持可见',
    apiSwatchLabel: '无障碍名称与悬停提示（不传时使用 value）',
    apiSwatchDisabled: '禁用单个色块',
    apiSwatchSlotDefault: '色块内的图标或标记内容',
  },
  switch: {
    desc: '基于官方 <fluent-switch> 的薄封装开关控件，支持受控 v-model 布尔切换、自动 label 关联、标签位置配置及无障碍 switch 语义。',
    secBasic: '基础用法与标签位置',
    secStates: '禁用与必填状态',
    sampleLabel: '启用自动同步',
    stateOn: '已开启',
    stateOff: '已关闭',
    stateLabel: '当前状态',
    cardBasicTitle: '开关与标签位置（after / before）',
    cardBasicDesc: '点击开关或关联标签均可切换状态，键盘支持 Space 切换。',
    cardStatesTitle: '禁用态与必填标识',
    labelBefore: '标签位于左侧',
    requiredLabel: '必填开关项',
    disabledOn: '禁用（已开启）',
    disabledOff: '禁用（已关闭）',
    catalogDesc: '受控布尔 v-model 开关、labelPosition 配置与自动标签关联',
    apiModelValue: '开关布尔值，用于 v-model 双向绑定',
    apiLabel: '标签文本（未传默认插槽时生效）',
    apiLabelPosition: '标签相对开关的位置',
    apiFlags: '禁用与必填状态（开启 required 时显示星号）',
    apiUpdate: '开关切换时同步更新 v-model',
    apiChange: '开关状态变更事件',
    apiSlotDefault: '自定义标签内容',
  },
  radio: {
    desc: '基于官方 <fluent-radio-group> 与 <fluent-radio> 的薄封装单选组，支持受控 v-model、垂直/水平排列、方向键切换与单项或整组禁用。',
    secOrientation: '排列方向',
    secStates: '整组禁用',
    currentValue: '当前选中值',
    cardOrientationTitle: '水平排列（orientation="horizontal"）',
    cardOrientationDesc: '支持通过上下/左右方向键在可用单选项间循环切换焦点。',
    cardStatesTitle: '整组禁用态',
    optStandard: '标准构建',
    optFast: '极速缓存',
    optCustom: '自定义脚本',
    optDisabled: '旧版镜像（不可选）',
    catalogDesc: '受控单选组、垂直/水平排列、方向键导航与标签配对',
    apiModelValue: '当前选中项的值，用于 v-model 双向绑定',
    apiOrientation: '单选项排列方向',
    apiFlags: '整组禁用与必选状态',
    apiName: '表单字段名，自动同步到所有子级 VfkRadio',
    apiUpdate: '选中项变更时同步更新 v-model',
    apiChange: '选中项变更事件',
    apiRadioProps: '子级单选项的值、标签文案与单项禁用配置',
  },
  combobox: {
    desc: '基于官方 <fluent-dropdown type="combobox">、<fluent-listbox> 与 <fluent-option> 的薄封装可输入下拉框，支持实时前缀过滤、freeform 自定义输入、4 种外观与 3 档尺寸。',
    secAppearances: '外观样式',
    secSizes: '尺寸规格',
    secFilterFreeform: '输入过滤与自由输入',
    secRichDisabled: '富内容选项与禁用态',
    placeholder: '输入或选择框架...',
    freeformPlaceholder: '输入任意标签或选择建议...',
    freeformPrefix: '使用：',
    currentValue: '当前值',
    lastInput: '最近输入',
    emptyValue: '（未选择）',
    clearSelection: '清空选择',
    optVue: 'Vue',
    optVite: 'Vite',
    optReact: 'React',
    optSvelte: 'Svelte',
    optAngular: 'Angular',
    optLegacy: 'Legacy（已废弃）',
    optVueDesc: '渐进式前端框架',
    optViteDesc: '下一代前端构建工具',
    optReactDesc: '组件化用户界面库',
    optLegacyDesc: '仅用于演示禁用选项',
    cardAppearancesTitle: '四种 Fluent 2 外观',
    cardAppearancesDesc: '与 VfkSelect 保持一致，支持 outline、transparent、filled-darker 与 filled-lighter。',
    cardSizesTitle: '三档尺寸规格',
    cardFilterTitle: '按前缀实时过滤（filter）',
    cardFilterDesc: '默认开启 filter，输入前缀如 "v" 仅保留匹配项（Vue / Vite），方向键只在可见项间移动；收起后恢复全部选项。',
    cardFreeformTitle: '允许自由输入（freeform）',
    cardFreeformDesc: '开启 freeform 后，输入不在选项列表中的文本也可直接回车提交，并通过 #freeform 插槽自定义提示前缀。',
    cardRichTitle: '复用 VfkOption 图标、描述与禁用项',
    cardRichDesc: '与 VfkSelect 共享 VfkOption，传入 text 属性可在含描述时控制输入框回填文案。',
    cardDisabledTitle: '禁用状态',
    catalogDesc: '可输入下拉框，支持前缀过滤、freeform 自定义文本与键盘导航',
    apiModelValue: '受控选中值（freeform 模式下也可以是自定义输入文本）',
    apiAppearance: '视觉外观（outline 对应官方默认样式）',
    apiSize: '组件尺寸（small / medium / large）',
    apiPlaceholder: '输入框为空时的占位提示文字',
    apiFilter: '是否按输入文本前缀实时过滤可见选项',
    apiFreeform: '是否允许提交不在选项列表中的自定义文本',
    apiFlags: '禁用与必填表单状态',
    apiName: '原生表单字段名',
    apiUpdate: '选中项或自由输入提交变化时触发，同步更新 v-model',
    apiChange: '值变化时触发，附带原生 Event',
    apiInput: '文本框内容变化时触发，附带当前输入字符串',
    apiSlotDefault: '放置 VfkOption 列表（内部自动包裹在 fluent-listbox 中）',
    apiSlotIndicator: '自定义右侧展开箭头图标（slot="indicator"）',
    apiSlotFreeform: 'freeform 模式下自定义选项中输入文本前的提示文案',
  },
  field: {
    desc: '基于官方 <fluent-field> 的薄封装表单字段容器，统一组合标签、表单控件、校验状态图标/消息与辅助提示文字。',
    secValidation: '校验状态',
    secForm: '组合表单示例',
    sampleLabel: '项目标识',
    sampleHint: '仅支持小写字母、数字与连字符',
    sampleError: '格式无效，不能包含特殊字符',
    sampleWarning: '建议长度不少于 6 个字符',
    sampleSuccess: '该标识可用',
    cardValidationTitle: '四种校验状态（error / warning / success / none）',
    cardValidationDesc: 'error 状态自动为消息添加 role="alert" 并呈现错误语义色。',
    cardFormTitle: '水平表单组合（Input / Select / RadioGroup / Switch）',
    cardFormDesc: '展示 VfkField 配合全部表单控件使用时的对齐与排版效果。',
    formNameLabel: '项目名称',
    formNamePlaceholder: '输入项目名称',
    formNameHint: '将作为分支预览域名的前缀',
    formEnvLabel: '部署环境',
    formStrategyLabel: '构建策略',
    formAutoDeployLabel: '自动部署',
    catalogDesc: '组合标签、校验状态图标/消息、提示文案与水平/垂直布局',
    apiLabel: '字段标签文本（未传 label 插槽时生效）',
    apiFor: '关联目标控件的 id',
    apiOrientation: '标签与控件的排列方向（vertical / horizontal）',
    apiSize: '标签文字尺寸',
    apiFlags: '必填星号与禁用标签状态',
    apiValidationState: '校验反馈状态，控制状态图标与消息配色',
    apiValidationMessage: '校验反馈文案',
    apiHint: '辅助提示文案',
    apiSlots: '控件区、自定义标签、校验消息与辅助提示插槽',
  },
  tree: {
    desc: '薄封装官方 <fluent-tree> 与 <fluent-tree-item>，支持多级嵌套、v-model 选中同步、分组仅展开收起、前后缀与右侧插槽，以及方向键焦点管理。',
    secSlots: '图标、徽标与右侧插槽',
    secNavigation: '侧栏分组导航模式',
    currentValue: '当前选中',
    lastToggle: '最近展开切换',
    noneSelected: '（未选中）',
    groupDocs: '项目文档',
    groupGuides: '使用指南',
    groupComponents: '常用组件',
    nodeOverview: '快速开始',
    nodeTheming: '主题与品牌色',
    nodeTokens: 'Design Tokens',
    nodeButton: 'Button 按钮',
    nodeInput: 'Input 输入框',
    nodeTree: 'Tree 树形控件',
    cardSlotsTitle: 'start / end / aside 插槽组合',
    cardSlotsDesc: '通过 start 放图标、end 放标签、aside 放右侧计数或操作按钮；点击 aside 内按钮不会误触折叠或选中。',
    cardNavTitle: '非可选分组节点（:selectable="false"）',
    cardNavDesc: '点击分组行仅展开或收起子项，不抢占当前选中的页面节点，适合侧边导航菜单。',
    navGroupMain: '工作台',
    navGroupSettings: '系统设置',
    navItemDashboard: '总览面板',
    navItemAnalytics: '数据统计',
    navItemProfile: '个人资料',
    navItemSecurity: '安全与权限',
    navActionHint: '点击分组仅折叠，点击子项更新选中',
    catalogDesc: '多级树形视图，支持 v-model 选中、分组展开与图标/右侧插槽',
    apiModelValue: '当前选中节点的 value，与 VfkTreeItem 的 value 对应',
    apiAppearance: '树节点外观变体，统一下发给所有子节点',
    apiSize: '树节点尺寸（small / medium），统一下发给所有子节点',
    apiUpdate: '选中节点切换时触发，用于 v-model',
    apiChange: '选中节点切换时触发，附带原生事件对象',
    apiToggle: '任意子节点展开或收起时触发，返回 { value, expanded }',
    apiItemProps: '子节点支持 value、label、expanded、selected、selectable、appearance、size',
    apiSlots: '默认插槽（文案或嵌套子节点）、items、start、end、aside、chevron',
  },
  tabs: {
    desc: '薄封装官方 <fluent-tablist> 与 <fluent-tab>，支持 v-model 选中同步、水平/垂直方向、transparent / subtle 外观、三种尺寸、图标插槽以及方向键循环导航。',
    secLayout: '垂直方向与尺寸刻度',
    secIcons: '前置图标、计数徽标与内容面板',
    currentValue: '当前标签',
    tabOverview: '概览',
    tabSpecs: '接口规格',
    tabLogs: '更新记录',
    tabDisabled: '禁用标签',
    panelOverview: '概览面板：展示当前标签页关联的核心摘要信息。',
    panelSpecs: '接口规格面板：展示 Props、Emits 与插槽约定。',
    panelLogs: '更新记录面板：按版本记录改动与兼容说明。',
    cardVerticalTitle: '垂直标签栏（orientation="vertical"）',
    cardVerticalDesc: '适合侧边分组切换，选中指示条自动移到左侧。',
    cardSizesTitle: '三种尺寸（small / medium / large）',
    cardIconsTitle: 'start / end 插槽与联动面板',
    cardIconsDesc: '搭配 #start 放图标、#end 放计数徽标，配合 v-model 切换下方内容区。',
    catalogDesc: '水平/垂直标签页，支持 v-model、滑动指示条与前后置插槽',
    apiModelValue: '当前选中标签的 value，与 VfkTab 的 value 对应',
    apiAppearance: '标签栏外观变体（transparent / subtle）',
    apiOrientation: '排列方向（horizontal / vertical）',
    apiSize: '尺寸（small / medium / large）',
    apiDisabled: '是否禁用整个标签栏',
    apiUpdate: '选中标签变化时触发，用于 v-model',
    apiChange: '选中标签变化时触发，附带原生事件对象',
    apiTabProps: 'VfkTab 支持 value、label、disabled、id 以及 default / start / end 插槽',
  },
  dialog: {
    catalogDesc: '原生 <dialog> 模态、非模态与警报三种模式，标题自动关联',
    desc: '薄封装官方 <fluent-dialog> 与 <fluent-dialog-body>，基于原生 <dialog> 提供模态、非模态与警报三种模式，内置焦点陷阱、Escape 关闭、标题自动关联与底部操作区。',
    secTypes: '三种模态类型',
    secBody: '标题区、操作区与面板宽度',
    sampleTitle: '发布新版本',
    sampleBody: '确认后将同步更新文档站点与 npm 包。',
    confirm: '确认发布',
    cancel: '取消',
    btnModal: '打开模态对话框',
    btnAlert: '打开警报对话框',
    btnNonModal: '打开非模态对话框',
    bodyTitle: '自定义面板宽度与标题操作',
    bodyDesc: '通过 maxWidth 覆盖官方默认的 600px，标题右侧可放附加操作。',
    stateLabel: '当前状态',
    stateOpen: '已打开',
    stateClosed: '已关闭',
    cardTypesTitle: 'modal / alert / non-modal',
    cardTypesDesc: 'modal 点击遮罩即可关闭，alert 必须显式确认，non-modal 不带遮罩也不锁背景焦点。',
    cardBodyTitle: '标题操作区与自定义宽度',
    cardBodyDesc: '底部 #action 区在窄容器下自动纵向排列，宽容器下右对齐横排。',
    apiModelValue: '打开状态，用于 v-model 双向绑定',
    apiType: '模态类型（modal / non-modal / alert）',
    apiAria: 'ariaLabel、ariaLabelledby 与 ariaDescribedby，未传时自动关联内部标题',
    apiMaxWidth: '面板最大宽度，默认沿用官方 600px',
    apiUpdate: '打开状态变化时同步更新 v-model',
    apiOpenChange: '打开状态变化时触发，附带原生事件对象',
    apiSlots: '默认插槽：对话框内容（放置 VfkDialogBody）',
    apiBody: 'VfkDialogBody 支持 title、closable、closeLabel 以及 title / title-action / close / action / default 插槽',
  },
  drawer: {
    catalogDesc: '模态、非模态与内嵌三种抽屉，左右滑出与四档预设宽度',
    desc: '薄封装官方 <fluent-drawer> 与 <fluent-drawer-body>，支持 modal / non-modal / inline 三种类型、左右两侧滑出、四档预设宽度与自定义宽度。',
    secTypes: '三种呈现类型',
    secPosition: '位置、尺寸与底部操作区',
    sampleTitle: '筛选条件',
    sampleBody: '按年份、画质与字幕语言组合筛选剧集。',
    footerApply: '应用筛选',
    btnModal: '从左侧滑出',
    btnNonModal: '无遮罩浮层',
    btnInline: '内嵌抽屉',
    btnEnd: '从右侧滑出',
    stateLabel: '当前状态',
    stateOpen: '已打开',
    stateClosed: '已关闭',
    cardTypesTitle: 'modal / non-modal / inline',
    cardTypesDesc: 'modal 带遮罩与焦点陷阱，non-modal 不锁背景焦点，inline 直接排入文档流。',
    cardPositionTitle: 'position="end" 与自定义宽度',
    cardPositionDesc: '右侧滑出时可配合 width 覆盖预设宽度，底部 #footer 固定操作按钮。',
    apiModelValue: '打开状态，用于 v-model 双向绑定',
    apiType: '呈现类型（modal / non-modal / inline）',
    apiPositionSize: '滑出位置（start / end）与预设宽度（small / medium / large / full）',
    apiWidth: '自定义宽度，优先于 size',
    apiAria: 'ariaLabelledby 与 ariaDescribedby，未传时自动关联内部标题',
    apiUpdate: '打开状态变化时同步更新 v-model',
    apiOpenChange: '打开状态变化时触发，附带原生事件对象',
    apiSlots: '默认插槽：抽屉内容（放置 VfkDrawerBody）',
    apiBody: 'VfkDrawerBody 支持 title、closable、closeLabel 以及 title / close / footer / default 插槽',
  },
  badge: {
    desc: '薄封装官方 <fluent-badge>，支持 filled / tint / outline / ghost 四种外观、八种语义颜色、六档尺寸（tiny 与 extra-small 为纯圆点）与三种形状。',
    catalogDesc: '四种外观 × 八种颜色，六档尺寸与三种形状',
    secAppearances: '四种外观',
    secColors: '八种语义颜色',
    secSizesShapes: '尺寸与形状',
    sampleText: '徽标',
    apiAppearance: '外观（filled / tint / outline / ghost）',
    apiColor: '语义颜色（brand / danger / success / warning 等八种）',
    apiSize: '尺寸（tiny / extra-small / small / medium / large / extra-large）',
    apiShape: '形状（circular / rounded / square）',
    apiSlots: '默认插槽放文字，start / end 放前置图标与后置内容',
  },
  textarea: {
    desc: '薄封装官方 <fluent-textarea>，支持受控 v-model、三种外观、三档尺寸、拖拽缩放与随内容自动增高，并保留原生表单关联与校验接口。',
    catalogDesc: '受控 v-model、三种外观、三档尺寸与拖拽缩放',
    secAppearances: '外观与尺寸',
    secResize: '缩放与自动增高',
    secStates: '禁用、只读与最小高度',
    placeholder: '写下你想说的...',
    sampleLabel: '备注',
    cardAppearancesTitle: '三种外观（outline / filled-lighter / filled-darker）',
    cardAppearancesDesc: '与 VfkInput 保持一致的外观命名，聚焦时底部品牌色高亮条同步变化。',
    cardResizeTitle: 'resize 与 autoResize',
    cardResizeDesc: 'resize 提供拖拽把手，autoResize 让高度跟随内容，两者不要同时开启。',
    cardStatesTitle: '禁用、只读与自定义最小高度',
    apiModelValue: '文本值，用于 v-model 双向绑定',
    apiAppearance: '视觉外观（outline / filled-lighter / filled-darker）',
    apiSize: '尺寸（small / medium / large）',
    apiResize: '用户可拖拽的缩放方向，禁用态自动失效',
    apiAutoResize: '高度随内容自动变化，开启后不要再设固定高度',
    apiBlock: '占满整行宽度，否则使用默认 18rem 宽度',
    apiMinHeight: '最小高度，经公开 ::part(control) 生效',
    apiFlags: 'placeholder、disabled、readonly、required、maxlength 等原生属性',
    apiUpdate: '输入时同步更新 v-model',
    apiChange: '失焦且内容变化时触发',
    apiSlotLabel: '标签插槽，用于放置 <fluent-label>',
  },
  tooltip: {
    desc: '薄封装官方 <fluent-tooltip>，通过原生 Popover 与 CSS Anchor Positioning 定位，悬停或键盘聚焦触发，自动为触发元素注入 id 与 aria-describedby。',
    catalogDesc: '原生 Popover 定位，悬停与聚焦触发',
    secDirections: '方位与对齐',
    secContent: '富文本内容与自定义锚点',
    triggerLabel: '悬停查看提示',
    richTextTitle: '发布说明',
    richTextBody: '包含破坏性变更，升级前请阅读迁移指引。',
    cardDirectionsTitle: '四个方向与对齐变体',
    cardDirectionsDesc: 'positioning 支持 above / below / before / after 三个对齐变体，靠近视口边缘会自动翻转。',
    cardContentTitle: '富文本与自定义锚点',
    cardContentDesc: '用 #content 插槽放富内容；已有 id 的元素可用 anchor 直接指定。',
    apiText: '提示文字，未传 #content 插槽时生效',
    apiAnchor: '触发元素的 id，不传时自动为默认插槽第一个元素生成',
    apiPositioning: '方位（above / below / before / after 及 start / end / top / bottom 变体）',
    apiDelay: '悬停显示延迟（毫秒），聚焦时立即显示',
    apiSlots: '默认插槽为触发元素，#content 放富文本提示',
  },
  menu: {
    desc: '薄封装官方 <fluent-menu>、<fluent-menu-button>、<fluent-menu-list> 与 <fluent-menu-item>，支持原生 Popover 浮层、拆分按钮、多选/单选菜单项、多级子菜单与右键菜单。',
    secCheckRadio: '复选与单选菜单项',
    secSubmenuContext: '多级子菜单与右键菜单',
    triggerLabel: '操作菜单',
    primaryActionLabel: '保存更改',
    lastAction: '最近触发',
    noneAction: '（暂无）',
    itemNew: '新建文件',
    itemCopy: '复制副本',
    itemExport: '导出配置',
    itemDelete: '删除项目',
    itemDisabled: '归档（禁用）',
    cardCheckRadioTitle: 'menuitemcheckbox 与 menuitemradio（含分隔线）',
    cardCheckRadioDesc: '点击勾选/单选项时菜单保持打开，VfkMenuDivider 自动分隔单选组边界。',
    checkGrid: '显示参考网格',
    checkRuler: '显示标尺',
    radioAsc: '按名称升序',
    radioDesc: '按名称降序',
    checkRadioTrigger: '视图选项',
    cardSubmenuTitle: '子菜单与右键上下文菜单（openOnContext）',
    cardSubmenuDesc: '在 VfkMenuItem 内嵌套 VfkMenuList 即可生成多级子菜单；开启 openOnContext 后右键触发。',
    submenuTrigger: '更多操作',
    submenuShare: '分享到',
    submenuCopyLink: '复制链接',
    submenuEmail: '发送邮件',
    contextZoneHint: '在此区域点击鼠标右键打开上下文菜单',
    catalogDesc: '原生 Popover 浮层菜单，支持拆分按钮、勾选/单选项、子菜单与右键触发',
    apiFlags: '悬停打开、右键打开、滚动关闭、点击菜单项保持打开',
    apiSplit: '拆分按钮模式，搭配 #primary-action 与 #trigger 使用',
    apiMaxHeight: '限制菜单浮层最大高度（映射为 --menu-max-height）',
    apiOpenChange: '菜单浮层展开或收起时触发',
    apiListSelect: '任意子级 VfkMenuItem 触发时在 VfkMenuList 上统一回调',
    apiItemProps: 'VfkMenuItem 支持 value、label、role、checked（v-model:checked）、disabled',
    apiSlots: 'VfkMenu 提供 trigger / primary-action / default；VfkMenuItem 提供 start / end / submenu',
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
  toggleButton: {
    desc: '基於官方 <fluent-toggle-button> 的薄封裝切換按鈕，支援 true / false / "mixed" 受控 v-model 繫結、5 種視覺外觀以及原生 aria-pressed 無障礙狀態。',
    secAppearances: '視覺外觀',
    secControlled: '受控切換與半按壓態',
    secVariants: '尺寸、形狀與停用態',
    sampleLabel: '自動儲存',
    pressedLabel: '已按下',
    unpressedLabel: '未按下',
    mixedLabel: '半按壓（mixed）',
    setMixed: '設為 mixed',
    stateLabel: '目前狀態',
    cardAppearancesTitle: '五種 Fluent 2 切換按鈕外觀',
    cardAppearancesDesc: '點選各按鈕可對比按下與彈起狀態的視覺差異。',
    cardControlledTitle: '工具列受控 v-model 與 mixed 狀態',
    cardControlledDesc: '點擊切換布林值；處於 mixed 半按壓態時點擊會統一切換為 true。',
    cardVariantsTitle: '尺寸、形狀與僅圖示模式',
    cardDisabledTitle: '停用與可聚焦停用',
    toolbarPin: '置頂預覽',
    toolbarFilter: '僅看錯誤',
    toolbarNotify: '部署通知',
    catalogDesc: '受控 v-model、boolean / mixed 按壓態、5 種外觀與圖示插槽',
    apiModelValue: '目前按壓狀態，支援 true / false / "mixed"',
    apiAppearance: '按鈕視覺外觀，secondary 對應官方預設樣式',
    apiSize: '按鈕尺寸',
    apiShape: '圓角形狀',
    apiDisabled: '是否停用',
    apiDisabledFocusable: '停用但保留鍵盤聚焦，便於無障礙工具讀取',
    apiIconOnly: '是否僅顯示圖示，未傳時依插槽自動判斷',
    apiUpdate: '切換按壓態時同步更新 v-model',
    apiChange: '按壓態變更事件，附帶最新布林值與事件物件',
    apiClick: '點擊觸發（disabled / disabledFocusable 時不觸發）',
    apiSlots: '按鈕正文及前後置圖示插槽（對應 slot="start" / "end"）',
  },
  searchBox: {
    desc: '參照 Fluent 2 SearchBox 規範並基於 VfkInput 擴充的搜尋框，內建前置搜尋圖示、聚焦或有值時自動顯示的清除按鈕（點擊清空並歸還焦點），以及 Enter 搜尋與 Escape 清空快捷鍵。',
    secAppearances: '外觀樣式',
    secSizes: '尺寸與自訂插槽',
    secStates: '狀態與事件',
    placeholder: '搜尋元件或變數...',
    fieldLabel: '快速檢索',
    dismissLabel: '清除搜尋',
    lastSearchLabel: '最近搜尋',
    clearCountLabel: '清除次數',
    noneYet: '尚無',
    cardAppearancesTitle: '四種 Fluent 2 外觀',
    cardAppearancesDesc: '外觀與 VfkInput 保持一致，支援 outline、underline、filled-darker 與 filled-lighter。',
    cardSizesTitle: '三檔尺寸規格',
    cardSlotsTitle: '自訂前置圖示與後置快捷鍵',
    cardStatesTitle: '唯讀與停用態',
    readonlySample: '唯讀搜尋內容',
    disabledSample: '已停用搜尋框',
    catalogDesc: '基於 VfkInput 擴充，前置搜尋圖示、清除按鈕還原焦點與 Enter/Escape 快捷鍵',
    apiModelValue: '受控搜尋文字，用於 v-model 雙向繫結',
    apiAppearance: '視覺外觀，與 VfkInput 一致',
    apiSize: '元件尺寸（small / medium / large）',
    apiPlaceholder: '空值時的佔位提示文字',
    apiDismissLabel: '內建清除按鈕的無障礙名稱（aria-label）',
    apiFlags: '停用、唯讀與必填表單狀態',
    apiUpdate: '輸入或清空時觸發，同步更新 v-model',
    apiSearch: '按下 Enter 鍵（非輸入法組字態）時觸發並附帶目前關鍵字',
    apiClear: '點擊清除按鈕或按 Escape 清空時觸發',
    apiSlots: '內建標籤（#default）、前置圖示（#start）、清除圖示（#dismiss）與附加後綴（#end）',
  },
  select: {
    desc: '基於官方 <fluent-dropdown>、<fluent-listbox> 與 <fluent-option> 的薄封裝下拉選擇器，支援單選 v-model、4 種外觀、3 檔尺寸及帶描述/圖示的選項。',
    secAppearances: '外觀樣式',
    secSizes: '尺寸規格',
    secRichDisabled: '圖示描述與停用態',
    placeholder: '請選擇部署環境...',
    clearSelection: '清空選擇',
    currentValue: '目前選取值',
    emptyValue: '（未選擇）',
    cardAppearancesTitle: '四種 Fluent 2 下拉外觀',
    cardAppearancesDesc: '支援 outline（預設）、transparent、filled-darker 與 filled-lighter。',
    cardSizesTitle: '尺寸（small / medium / large）',
    cardRichTitle: '帶圖示、副標題描述與停用選項',
    cardRichDesc: '選項包含描述時可透過 text 屬性指定觸發器顯示的簡短文案。',
    cardDisabledTitle: '整體停用態',
    optProd: '正式環境',
    optProdDesc: '面向正式流量，自動啟用高可用副本',
    optStaging: '預發佈環境',
    optStagingDesc: '與正式設定一致，供上線前驗收',
    optDev: '開發環境',
    optDevDesc: '跟隨分支自動建置預覽',
    optLegacy: '舊版叢集（已停用）',
    optLegacyDesc: '僅保留歷史封存，不可選擇',
    catalogDesc: '基於 fluent-dropdown 的受控 v-model 選擇器與選項插槽',
    apiModelValue: '受控選取項的值，用於 v-model 雙向繫結',
    apiAppearance: '下拉觸發器視覺外觀，outline 為預設樣式',
    apiSize: '下拉觸發器尺寸',
    apiPlaceholder: '未選取項目時顯示的佔位文案',
    apiFlags: '停用與必填狀態',
    apiName: '表單欄位名稱',
    apiUpdate: '選取項變更時同步更新 v-model',
    apiChange: '選取項變更事件，附帶最新值與事件物件',
    apiSlotDefault: '放置 VfkOption 列表（內部自動包裹 fluent-listbox）',
    apiSlotIndicator: '自訂右側展開箭頭圖示（對應 slot="indicator"）',
    apiOptionValue: '選項唯一值，與 VfkSelect 的 modelValue 對應',
    apiOptionText: '選項包含描述等內容時，覆寫顯示於觸發器上的文案',
    apiOptionDisabled: '停用單一選項，略過鍵盤導覽與點擊',
    apiOptionSlots: '選項主文案、前置圖示、副標題描述與自訂勾選圖示',
  },
  swatchPicker: {
    desc: '參照 Fluent 2 SwatchPicker 規範實作的色板單選元件，提供 radiogroup / radio 語意、roving tabindex 鍵盤導覽、雙層選中內陰影以及 4 檔尺寸與 3 種形狀。',
    secSizesShapes: '尺寸與形狀',
    secLayoutSpacing: '版面與間距',
    secStates: '描邊與停用態',
    ariaLabel: '選擇顏色',
    currentColor: '目前顏色',
    emptyValue: '（未選擇）',
    cardSizesTitle: '四檔色塊尺寸',
    cardShapesTitle: '三種色塊形狀',
    cardGridTitle: '格狀版面（layout="grid"）',
    cardGridDesc: '搭配 columnCount 固定每列欄數，上下方向鍵依欄在色塊間跳轉。',
    cardSpacingTitle: '色塊間距（small / medium）',
    cardBorderDisabledTitle: '淺色內描邊與單一停用色塊',
    cardBorderDisabledDesc: '白色等淺色色塊可傳入 borderColor 保持輪廓可辨識；停用色塊疊加斜線且方向鍵自動跳過。',
    cardGroupDisabledTitle: '整體停用',
    colorRed: '猩紅',
    colorOrange: '亮橙',
    colorYellow: '暖黃',
    colorGreen: '翠綠',
    colorTeal: '青碧',
    colorBlue: '官方藍',
    colorViolet: '紫羅蘭',
    colorWhite: '純白',
    colorGray: '中性灰',
    catalogDesc: '色板單選元件，支援 4 檔尺寸、3 種形狀、格狀版面與方向鍵導覽',
    apiModelValue: '受控選中色塊值，用於 v-model 雙向繫結',
    apiSize: '色塊尺寸（extra-small 20px / small 24px / medium 28px / large 32px）',
    apiShape: '色塊形狀（square / rounded / circular）',
    apiLayout: '排列方式（row 單列換行 / grid 固定欄數格狀）',
    apiColumnCount: 'grid 版面下每列色塊數量',
    apiSpacing: '色塊間距（small 2px / medium 4px）',
    apiDisabled: '整體停用色板',
    apiUpdate: '選中色塊變化時觸發，同步更新 v-model',
    apiChange: '選中色塊變化時觸發，附帶原始事件',
    apiSlotDefault: '放置 VfkColorSwatch 色塊清單',
    apiSwatchValue: '色塊唯一值，與 VfkSwatchPicker 的 modelValue 對應',
    apiSwatchColor: '色塊顯示顏色（任意 CSS 顏色值，未傳時使用 value）',
    apiSwatchBorderColor: '1px 內描邊顏色，用於淺色色塊在淺色表面保持可見',
    apiSwatchLabel: '無障礙名稱與懸停提示（未傳時使用 value）',
    apiSwatchDisabled: '停用單一色塊',
    apiSwatchSlotDefault: '色塊內的圖示或標記內容',
  },
  switch: {
    desc: '基於官方 <fluent-switch> 的薄封裝開關元件，支援受控 v-model 布林切換、自動 label 關聯、標籤位置設定及無障礙 switch 語意。',
    secBasic: '基礎用法與標籤位置',
    secStates: '停用與必填狀態',
    sampleLabel: '啟用自動同步',
    stateOn: '已開啟',
    stateOff: '已關閉',
    stateLabel: '目前狀態',
    cardBasicTitle: '開關與標籤位置（after / before）',
    cardBasicDesc: '點擊開關或關聯標籤皆可切換狀態，鍵盤支援 Space 切換。',
    cardStatesTitle: '停用態與必填標記',
    labelBefore: '標籤位於左側',
    requiredLabel: '必填開關項',
    disabledOn: '停用（已開啟）',
    disabledOff: '停用（已關閉）',
    catalogDesc: '受控布林 v-model 開關、labelPosition 設定與自動標籤關聯',
    apiModelValue: '開關布林值，用於 v-model 雙向繫結',
    apiLabel: '標籤文字（未傳預設插槽時生效）',
    apiLabelPosition: '標籤相對開關的位置',
    apiFlags: '停用與必填狀態（開啟 required 時顯示星號）',
    apiUpdate: '開關切換時同步更新 v-model',
    apiChange: '開關狀態變更事件',
    apiSlotDefault: '自訂標籤內容',
  },
  radio: {
    desc: '基於官方 <fluent-radio-group> 與 <fluent-radio> 的薄封裝單選組，支援受控 v-model、垂直/水平排列、方向鍵切換與單項或整組停用。',
    secOrientation: '排列方向',
    secStates: '整組停用',
    currentValue: '目前選取值',
    cardOrientationTitle: '水平排列（orientation="horizontal"）',
    cardOrientationDesc: '支援透過上下/左右方向鍵在可用單選項間循環切換焦點。',
    cardStatesTitle: '整組停用態',
    optStandard: '標準建置',
    optFast: '極速快取',
    optCustom: '自訂腳本',
    optDisabled: '舊版映像（不可選）',
    catalogDesc: '受控單選組、垂直/水平排列、方向鍵導覽與標籤配對',
    apiModelValue: '目前選取項的值，用於 v-model 雙向繫結',
    apiOrientation: '單選項排列方向',
    apiFlags: '整組停用與必選狀態',
    apiName: '表單欄位名稱，自動同步到所有子級 VfkRadio',
    apiUpdate: '選取項變更時同步更新 v-model',
    apiChange: '選取項變更事件',
    apiRadioProps: '子級單選項的值、標籤文案與單項停用設定',
  },
  combobox: {
    desc: '基於官方 <fluent-dropdown type="combobox">、<fluent-listbox> 與 <fluent-option> 的薄封裝可輸入下拉框，支援即時前綴篩選、freeform 自訂輸入、4 種外觀與 3 檔尺寸。',
    secAppearances: '外觀樣式',
    secSizes: '尺寸規格',
    secFilterFreeform: '輸入篩選與自由輸入',
    secRichDisabled: '富內容選項與停用態',
    placeholder: '輸入或選擇框架...',
    freeformPlaceholder: '輸入任意標籤或選擇建議...',
    freeformPrefix: '使用：',
    currentValue: '目前值',
    lastInput: '最近輸入',
    emptyValue: '（未選擇）',
    clearSelection: '清空選擇',
    optVue: 'Vue',
    optVite: 'Vite',
    optReact: 'React',
    optSvelte: 'Svelte',
    optAngular: 'Angular',
    optLegacy: 'Legacy（已棄用）',
    optVueDesc: '漸進式前端框架',
    optViteDesc: '下一代前端建置工具',
    optReactDesc: '元件化使用者介面函式庫',
    optLegacyDesc: '僅用於示範停用選項',
    cardAppearancesTitle: '四種 Fluent 2 外觀',
    cardAppearancesDesc: '與 VfkSelect 保持一致，支援 outline、transparent、filled-darker 與 filled-lighter。',
    cardSizesTitle: '三檔尺寸規格',
    cardFilterTitle: '依前綴即時篩選（filter）',
    cardFilterDesc: '預設開啟 filter，輸入前綴如 "v" 僅保留符合項目（Vue / Vite），方向鍵只在可見項目間移動；收合後恢復全部選項。',
    cardFreeformTitle: '允許自由輸入（freeform）',
    cardFreeformDesc: '開啟 freeform 後，輸入不在選項清單中的文字也可直接按 Enter 提交，並透過 #freeform 插槽自訂提示前綴。',
    cardRichTitle: '共用 VfkOption 圖示、描述與停用項',
    cardRichDesc: '與 VfkSelect 共用 VfkOption，傳入 text 屬性可在含描述時控制輸入框回填文案。',
    cardDisabledTitle: '停用狀態',
    catalogDesc: '可輸入下拉框，支援前綴篩選、freeform 自訂文字與鍵盤導覽',
    apiModelValue: '受控選中值（freeform 模式下也可以是自訂輸入文字）',
    apiAppearance: '視覺外觀（outline 對應官方預設樣式）',
    apiSize: '元件尺寸（small / medium / large）',
    apiPlaceholder: '輸入框為空時的佔位提示文字',
    apiFilter: '是否依輸入文字前綴即時篩選可見選項',
    apiFreeform: '是否允許提交不在選項清單中的自訂文字',
    apiFlags: '停用與必填表單狀態',
    apiName: '原生表單欄位名稱',
    apiUpdate: '選中項或自由輸入提交變化時觸發，同步更新 v-model',
    apiChange: '值變化時觸發，附帶原生 Event',
    apiInput: '文字框內容變化時觸發，附帶目前輸入字串',
    apiSlotDefault: '放置 VfkOption 清單（內部自動包裹在 fluent-listbox 中）',
    apiSlotIndicator: '自訂右側展開箭頭圖示（slot="indicator"）',
    apiSlotFreeform: 'freeform 模式下自訂選項中輸入文字前的提示文案',
  },
  field: {
    desc: '基於官方 <fluent-field> 的薄封裝表單欄位容器，統一組合標籤、表單元件、校驗狀態圖示/訊息與輔助提示文字。',
    secValidation: '校驗狀態',
    secForm: '組合表單範例',
    sampleLabel: '專案識別碼',
    sampleHint: '僅支援小寫字母、數字與連字號',
    sampleError: '格式無效，不可包含特殊字元',
    sampleWarning: '建議長度不少於 6 個字元',
    sampleSuccess: '此識別碼可用',
    cardValidationTitle: '四種校驗狀態（error / warning / success / none）',
    cardValidationDesc: 'error 狀態自動為訊息加上 role="alert" 並呈現錯誤語意色。',
    cardFormTitle: '水平表單組合（Input / Select / RadioGroup / Switch）',
    cardFormDesc: '展示 VfkField 搭配全部表單元件使用時的對齊與排版效果。',
    formNameLabel: '專案名稱',
    formNamePlaceholder: '輸入專案名稱',
    formNameHint: '將作為分支預覽網域的前綴',
    formEnvLabel: '部署環境',
    formStrategyLabel: '建置策略',
    formAutoDeployLabel: '自動部署',
    catalogDesc: '組合標籤、校驗狀態圖示/訊息、提示文案與水平/垂直版面',
    apiLabel: '欄位標籤文字（未傳 label 插槽時生效）',
    apiFor: '關聯目標元件的 id',
    apiOrientation: '標籤與元件的排列方向（vertical / horizontal）',
    apiSize: '標籤文字尺寸',
    apiFlags: '必填星號與停用標籤狀態',
    apiValidationState: '校驗回饋狀態，控制狀態圖示與訊息配色',
    apiValidationMessage: '校驗回饋文案',
    apiHint: '輔助提示文案',
    apiSlots: '元件區、自訂標籤、校驗訊息與輔助提示插槽',
  },
  tree: {
    desc: '薄封裝官方 <fluent-tree> 與 <fluent-tree-item>，支援多層巢狀、v-model 選取同步、分組僅展開收合、前後綴與右側插槽，以及方向鍵焦點管理。',
    secSlots: '圖示、徽標與右側插槽',
    secNavigation: '側欄分組導覽模式',
    currentValue: '目前選取',
    lastToggle: '最近展開切換',
    noneSelected: '（未選取）',
    groupDocs: '專案文件',
    groupGuides: '使用指南',
    groupComponents: '常用元件',
    nodeOverview: '快速開始',
    nodeTheming: '主題與品牌色',
    nodeTokens: 'Design Tokens',
    nodeButton: 'Button 按鈕',
    nodeInput: 'Input 輸入框',
    nodeTree: 'Tree 樹狀元件',
    cardSlotsTitle: 'start / end / aside 插槽組合',
    cardSlotsDesc: '透過 start 放圖示、end 放標籤、aside 放右側計數或操作按鈕；點擊 aside 內按鈕不會誤觸收合或選取。',
    cardNavTitle: '非可選分組節點（:selectable="false"）',
    cardNavDesc: '點擊分組列僅展開或收合子項，不搶佔目前選取的頁面節點，適合側邊導覽選單。',
    navGroupMain: '工作台',
    navGroupSettings: '系統設定',
    navItemDashboard: '總覽面板',
    navItemAnalytics: '資料統計',
    navItemProfile: '個人資料',
    navItemSecurity: '安全與權限',
    navActionHint: '點擊分組僅收合，點擊子項更新選取',
    catalogDesc: '多層樹狀檢視，支援 v-model 選取、分組展開與圖示/右側插槽',
    apiModelValue: '目前選取節點的 value，與 VfkTreeItem 的 value 對應',
    apiAppearance: '樹節點外觀變體，統一下發給所有子節點',
    apiSize: '樹節點尺寸（small / medium），統一下發給所有子節點',
    apiUpdate: '選取節點切換時觸發，用於 v-model',
    apiChange: '選取節點切換時觸發，附帶原生事件物件',
    apiToggle: '任意子節點展開或收合時觸發，回傳 { value, expanded }',
    apiItemProps: '子節點支援 value、label、expanded、selected、selectable、appearance、size',
    apiSlots: '預設插槽（文案或巢狀子節點）、items、start、end、aside、chevron',
  },
  tabs: {
    desc: '薄封裝官方 <fluent-tablist> 與 <fluent-tab>，支援 v-model 選取同步、水平/垂直方向、transparent / subtle 外觀、三種尺寸、圖示插槽以及方向鍵循環導覽。',
    secLayout: '垂直方向與尺寸刻度',
    secIcons: '前置圖示、計數徽標與內容面板',
    currentValue: '目前分頁',
    tabOverview: '概覽',
    tabSpecs: '介面規格',
    tabLogs: '更新紀錄',
    tabDisabled: '停用分頁',
    panelOverview: '概覽面板：展示目前分頁關聯的核心摘要資訊。',
    panelSpecs: '介面規格面板：展示 Props、Emits 與插槽約定。',
    panelLogs: '更新紀錄面板：依版本紀錄變更與相容說明。',
    cardVerticalTitle: '垂直分頁列（orientation="vertical"）',
    cardVerticalDesc: '適合側邊分組切換，選取指示條自動移到左側。',
    cardSizesTitle: '三種尺寸（small / medium / large）',
    cardIconsTitle: 'start / end 插槽與聯動面板',
    cardIconsDesc: '搭配 #start 放圖示、#end 放計數徽標，配合 v-model 切換下方內容區。',
    catalogDesc: '水平/垂直分頁，支援 v-model、滑動指示條與前後置插槽',
    apiModelValue: '目前選取分頁的 value，與 VfkTab 的 value 對應',
    apiAppearance: '分頁列外觀變體（transparent / subtle）',
    apiOrientation: '排列方向（horizontal / vertical）',
    apiSize: '尺寸（small / medium / large）',
    apiDisabled: '是否停用整個分頁列',
    apiUpdate: '選取分頁變化時觸發，用於 v-model',
    apiChange: '選取分頁變化時觸發，附帶原生事件物件',
    apiTabProps: 'VfkTab 支援 value、label、disabled、id 以及 default / start / end 插槽',
  },
  dialog: {
    catalogDesc: '原生 <dialog> 模態、非模態與警報三種模式，標題自動關聯',
    desc: '薄封裝官方 <fluent-dialog> 與 <fluent-dialog-body>，基於原生 <dialog> 提供模態、非模態與警報三種模式，內建焦點陷阱、Escape 關閉、標題自動關聯與底部操作區。',
    secTypes: '三種模態類型',
    secBody: '標題區、操作區與面板寬度',
    sampleTitle: '發佈新版本',
    sampleBody: '確認後將同步更新文件網站與 npm 套件。',
    confirm: '確認發佈',
    cancel: '取消',
    btnModal: '開啟模態對話方塊',
    btnAlert: '開啟警報對話方塊',
    btnNonModal: '開啟非模態對話方塊',
    bodyTitle: '自訂面板寬度與標題操作',
    bodyDesc: '透過 maxWidth 覆寫官方預設的 600px，標題右側可放置附加操作。',
    stateLabel: '目前狀態',
    stateOpen: '已開啟',
    stateClosed: '已關閉',
    cardTypesTitle: 'modal / alert / non-modal',
    cardTypesDesc: 'modal 點擊遮罩即可關閉，alert 必須明確確認，non-modal 不帶遮罩也不鎖背景焦點。',
    cardBodyTitle: '標題操作區與自訂寬度',
    cardBodyDesc: '底部 #action 區在窄容器下自動縱向排列，寬容器下靠右橫排。',
    apiModelValue: '開啟狀態，用於 v-model 雙向綁定',
    apiType: '模態類型（modal / non-modal / alert）',
    apiAria: 'ariaLabel、ariaLabelledby 與 ariaDescribedby，未傳時自動關聯內部標題',
    apiMaxWidth: '面板最大寬度，預設沿用官方 600px',
    apiUpdate: '開啟狀態變化時同步更新 v-model',
    apiOpenChange: '開啟狀態變化時觸發，附帶原生事件物件',
    apiSlots: '預設插槽：對話方塊內容（放置 VfkDialogBody）',
    apiBody: 'VfkDialogBody 支援 title、closable、closeLabel 以及 title / title-action / close / action / default 插槽',
  },
  drawer: {
    catalogDesc: '模態、非模態與內嵌三種抽屜，左右滑出與四段預設寬度',
    desc: '薄封裝官方 <fluent-drawer> 與 <fluent-drawer-body>，支援 modal / non-modal / inline 三種類型、左右兩側滑出、四段預設寬度與自訂寬度。',
    secTypes: '三種呈現類型',
    secPosition: '位置、尺寸與底部操作區',
    sampleTitle: '篩選條件',
    sampleBody: '依年份、畫質與字幕語言組合篩選劇集。',
    footerApply: '套用篩選',
    btnModal: '從左側滑出',
    btnNonModal: '無遮罩浮層',
    btnInline: '內嵌抽屜',
    btnEnd: '從右側滑出',
    stateLabel: '目前狀態',
    stateOpen: '已開啟',
    stateClosed: '已關閉',
    cardTypesTitle: 'modal / non-modal / inline',
    cardTypesDesc: 'modal 帶遮罩與焦點陷阱，non-modal 不鎖背景焦點，inline 直接排入文件流。',
    cardPositionTitle: 'position="end" 與自訂寬度',
    cardPositionDesc: '右側滑出時可搭配 width 覆寫預設寬度，底部 #footer 固定操作按鈕。',
    apiModelValue: '開啟狀態，用於 v-model 雙向綁定',
    apiType: '呈現類型（modal / non-modal / inline）',
    apiPositionSize: '滑出位置（start / end）與預設寬度（small / medium / large / full）',
    apiWidth: '自訂寬度，優先於 size',
    apiAria: 'ariaLabelledby 與 ariaDescribedby，未傳時自動關聯內部標題',
    apiUpdate: '開啟狀態變化時同步更新 v-model',
    apiOpenChange: '開啟狀態變化時觸發，附帶原生事件物件',
    apiSlots: '預設插槽：抽屜內容（放置 VfkDrawerBody）',
    apiBody: 'VfkDrawerBody 支援 title、closable、closeLabel 以及 title / close / footer / default 插槽',
  },
  badge: {
    desc: '薄封裝官方 <fluent-badge>，支援 filled / tint / outline / ghost 四種外觀、八種語意顏色、六段尺寸（tiny 與 extra-small 為純圓點）與三種形狀。',
    catalogDesc: '四種外觀 × 八種顏色，六段尺寸與三種形狀',
    secAppearances: '四種外觀',
    secColors: '八種語意顏色',
    secSizesShapes: '尺寸與形狀',
    sampleText: '徽章',
    apiAppearance: '外觀（filled / tint / outline / ghost）',
    apiColor: '語意顏色（brand / danger / success / warning 等八種）',
    apiSize: '尺寸（tiny / extra-small / small / medium / large / extra-large）',
    apiShape: '形狀（circular / rounded / square）',
    apiSlots: '預設插槽放文字，start / end 放前置圖示與後置內容',
  },
  textarea: {
    desc: '薄封裝官方 <fluent-textarea>，支援受控 v-model、三種外觀、三段尺寸、拖曳縮放與隨內容自動增高，並保留原生表單關聯與驗證介面。',
    catalogDesc: '受控 v-model、三種外觀、三段尺寸與拖曳縮放',
    secAppearances: '外觀與尺寸',
    secResize: '縮放與自動增高',
    secStates: '停用、唯讀與最小高度',
    placeholder: '寫下你想說的...',
    sampleLabel: '備註',
    cardAppearancesTitle: '三種外觀（outline / filled-lighter / filled-darker）',
    cardAppearancesDesc: '與 VfkInput 保持一致的外觀命名，聚焦時底部品牌色高亮條同步變化。',
    cardResizeTitle: 'resize 與 autoResize',
    cardResizeDesc: 'resize 提供拖曳把手，autoResize 讓高度跟隨內容，兩者不要同時開啟。',
    cardStatesTitle: '停用、唯讀與自訂最小高度',
    apiModelValue: '文字值，用於 v-model 雙向綁定',
    apiAppearance: '視覺外觀（outline / filled-lighter / filled-darker）',
    apiSize: '尺寸（small / medium / large）',
    apiResize: '使用者可拖曳的縮放方向，停用時自動失效',
    apiAutoResize: '高度隨內容自動變化，開啟後不要再設固定高度',
    apiBlock: '佔滿整列寬度，否則使用預設 18rem 寬度',
    apiMinHeight: '最小高度，經公開 ::part(control) 生效',
    apiFlags: 'placeholder、disabled、readonly、required、maxlength 等原生屬性',
    apiUpdate: '輸入時同步更新 v-model',
    apiChange: '失焦且內容變化時觸發',
    apiSlotLabel: '標籤插槽，用於放置 <fluent-label>',
  },
  tooltip: {
    desc: '薄封裝官方 <fluent-tooltip>，透過原生 Popover 與 CSS Anchor Positioning 定位，懸停或鍵盤聚焦觸發，自動為觸發元素注入 id 與 aria-describedby。',
    catalogDesc: '原生 Popover 定位，懸停與聚焦觸發',
    secDirections: '方位與對齊',
    secContent: '富文字內容與自訂錨點',
    triggerLabel: '懸停查看提示',
    richTextTitle: '發佈說明',
    richTextBody: '包含破壞性變更，升級前請閱讀遷移指引。',
    cardDirectionsTitle: '四個方向與對齊變體',
    cardDirectionsDesc: 'positioning 支援 above / below / before / after 三個對齊變體，靠近視窗邊緣會自動翻轉。',
    cardContentTitle: '富文字與自訂錨點',
    cardContentDesc: '用 #content 插槽放富內容；已有 id 的元素可用 anchor 直接指定。',
    apiText: '提示文字，未傳 #content 插槽時生效',
    apiAnchor: '觸發元素的 id，未傳時自動為預設插槽第一個元素產生',
    apiPositioning: '方位（above / below / before / after 及 start / end / top / bottom 變體）',
    apiDelay: '懸停顯示延遲（毫秒），聚焦時立即顯示',
    apiSlots: '預設插槽為觸發元素，#content 放富文字提示',
  },
  menu: {
    desc: '薄封裝官方 <fluent-menu>、<fluent-menu-button>、<fluent-menu-list> 與 <fluent-menu-item>，支援原生 Popover 浮層、拆分按鈕、多選/單選選單項、多層子選單與右鍵選單。',
    secCheckRadio: '核取與單選選單項',
    secSubmenuContext: '多層子選單與右鍵選單',
    triggerLabel: '操作選單',
    primaryActionLabel: '儲存變更',
    lastAction: '最近觸發',
    noneAction: '（暫無）',
    itemNew: '新增檔案',
    itemCopy: '複製副本',
    itemExport: '匯出設定',
    itemDelete: '刪除項目',
    itemDisabled: '封存（停用）',
    cardCheckRadioTitle: 'menuitemcheckbox 與 menuitemradio（含分隔線）',
    cardCheckRadioDesc: '點擊核取/單選項時選單保持開啟，VfkMenuDivider 自動分隔單選組邊界。',
    checkGrid: '顯示參考格線',
    checkRuler: '顯示尺規',
    radioAsc: '依名稱升冪',
    radioDesc: '依名稱降冪',
    checkRadioTrigger: '檢視選項',
    cardSubmenuTitle: '子選單與右鍵快顯選單（openOnContext）',
    cardSubmenuDesc: '在 VfkMenuItem 內巢狀放入 VfkMenuList 即可生成多層子選單；開啟 openOnContext 後右鍵觸發。',
    submenuTrigger: '更多操作',
    submenuShare: '分享至',
    submenuCopyLink: '複製連結',
    submenuEmail: '傳送電子郵件',
    contextZoneHint: '在此區域點擊滑鼠右鍵開啟快顯選單',
    catalogDesc: '原生 Popover 浮層選單，支援拆分按鈕、核取/單選項、子選單與右鍵觸發',
    apiFlags: '懸停開啟、右鍵開啟、捲動關閉、點擊選單項保持開啟',
    apiSplit: '拆分按鈕模式，搭配 #primary-action 與 #trigger 使用',
    apiMaxHeight: '限制選單浮層最大高度（對應 --menu-max-height）',
    apiOpenChange: '選單浮層展開或收合時觸發',
    apiListSelect: '任意子級 VfkMenuItem 觸發時於 VfkMenuList 統一回呼',
    apiItemProps: 'VfkMenuItem 支援 value、label、role、checked（v-model:checked）、disabled',
    apiSlots: 'VfkMenu 提供 trigger / primary-action / default；VfkMenuItem 提供 start / end / submenu',
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
  toggleButton: {
    desc: 'Thin Vue wrapper over official <fluent-toggle-button> supporting true / false / "mixed" v-model, 5 appearances, and native aria-pressed accessibility state.',
    secAppearances: 'Appearances',
    secControlled: 'Controlled Toggle & Mixed State',
    secVariants: 'Sizes, Shapes & Disabled',
    sampleLabel: 'Auto save',
    pressedLabel: 'Pressed',
    unpressedLabel: 'Unpressed',
    mixedLabel: 'Mixed',
    setMixed: 'Set mixed',
    stateLabel: 'Current state',
    cardAppearancesTitle: 'Five Fluent 2 ToggleButton Appearances',
    cardAppearancesDesc: 'Click each button to compare pressed and unpressed states.',
    cardControlledTitle: 'Controlled Toolbar v-model & Mixed State',
    cardControlledDesc: 'Clicking toggles boolean state; clicking a mixed button transitions it to true.',
    cardVariantsTitle: 'Sizes, Shapes & Icon-Only Mode',
    cardDisabledTitle: 'Disabled & Disabled Focusable',
    toolbarPin: 'Pin preview',
    toolbarFilter: 'Errors only',
    toolbarNotify: 'Deploy alerts',
    catalogDesc: 'Controlled v-model, boolean / mixed pressed states & icon slots',
    apiModelValue: 'Pressed state: true, false, or "mixed"',
    apiAppearance: 'Visual appearance; secondary uses default official styling',
    apiSize: 'Button size',
    apiShape: 'Corner radius shape',
    apiDisabled: 'Disables interaction and focus',
    apiDisabledFocusable: 'Disables action while remaining keyboard focusable for screen readers',
    apiIconOnly: 'Icon-only square sizing; auto-detected when only icon slots are provided',
    apiUpdate: 'Emitted when pressed state toggles',
    apiChange: 'Fired on toggle with next boolean value and click event',
    apiClick: 'Fired on click (suppressed when disabled or disabledFocusable)',
    apiSlots: 'Primary label and leading/trailing icon slots (slot="start" / "end")',
  },
  searchBox: {
    desc: 'Extended from VfkInput following Fluent 2 SearchBox conventions, with a leading search icon, a focus/value-driven dismiss button that returns focus to the input, and Enter / Escape keyboard shortcuts.',
    secAppearances: 'Appearances',
    secSizes: 'Sizes & Custom Slots',
    secStates: 'States & Events',
    placeholder: 'Search components or tokens...',
    fieldLabel: 'Quick search',
    dismissLabel: 'Clear search',
    lastSearchLabel: 'Last search',
    clearCountLabel: 'Clear count',
    noneYet: 'none',
    cardAppearancesTitle: 'Four Fluent 2 Appearances',
    cardAppearancesDesc: 'Inherits the same outline, underline, filled-darker, and filled-lighter variants as VfkInput.',
    cardSizesTitle: 'Small / Medium / Large Sizes',
    cardSlotsTitle: 'Custom Leading Icon & Trailing Shortcut',
    cardStatesTitle: 'Read-only & Disabled',
    readonlySample: 'Read-only search text',
    disabledSample: 'Disabled search box',
    catalogDesc: 'VfkInput extension with leading search icon, clear button & Enter/Escape shortcuts',
    apiModelValue: 'Controlled search text for v-model',
    apiAppearance: 'Visual style matching VfkInput',
    apiSize: 'Control size (small / medium / large)',
    apiPlaceholder: 'Placeholder text when empty',
    apiDismissLabel: 'Accessible aria-label for the built-in clear button',
    apiFlags: 'Disabled, read-only, and required form states',
    apiUpdate: 'Emitted on typing or clearing to keep v-model in sync',
    apiSearch: 'Emitted when pressing Enter (non-IME composing) with the current query',
    apiClear: 'Emitted when cleared via the dismiss button or Escape key',
    apiSlots: 'Built-in label (#default), leading icon (#start), clear icon (#dismiss), and trailing content (#end)',
  },
  select: {
    desc: 'Thin Vue wrapper over official <fluent-dropdown>, <fluent-listbox>, and <fluent-option> with single-select v-model, 4 appearances, 3 sizes, and rich option slots.',
    secAppearances: 'Appearances',
    secSizes: 'Sizes',
    secRichDisabled: 'Icons, Descriptions & Disabled',
    placeholder: 'Select environment...',
    clearSelection: 'Clear selection',
    currentValue: 'Selected value',
    emptyValue: '(none)',
    cardAppearancesTitle: 'Four Fluent 2 Select Appearances',
    cardAppearancesDesc: 'Supports outline (default), transparent, filled-darker, and filled-lighter.',
    cardSizesTitle: 'Sizes (small / medium / large)',
    cardRichTitle: 'Options with Icons, Descriptions & Disabled Item',
    cardRichDesc: 'Use the text prop on VfkOption to show a concise label in the trigger when descriptions are present.',
    cardDisabledTitle: 'Disabled Select',
    optProd: 'Production',
    optProdDesc: 'Live traffic with automated failover replicas',
    optStaging: 'Staging',
    optStagingDesc: 'Mirrors production for pre-release verification',
    optDev: 'Development',
    optDevDesc: 'Automatic branch preview deployments',
    optLegacy: 'Legacy cluster (deprecated)',
    optLegacyDesc: 'Read-only archive, unavailable for selection',
    catalogDesc: 'Controlled v-model dropdown built on fluent-dropdown & fluent-option',
    apiModelValue: 'Controlled selected value for v-model',
    apiAppearance: 'Trigger visual appearance; outline is the default',
    apiSize: 'Trigger size',
    apiPlaceholder: 'Placeholder shown when nothing is selected',
    apiFlags: 'Disabled and required states',
    apiName: 'Form field name',
    apiUpdate: 'Emitted when selection changes to update v-model',
    apiChange: 'Fired when selection changes with value and event',
    apiSlotDefault: 'VfkOption items (automatically wrapped in fluent-listbox)',
    apiSlotIndicator: 'Custom trailing chevron indicator (maps to slot="indicator")',
    apiOptionValue: 'Unique value matched against VfkSelect modelValue',
    apiOptionText: 'Display label override for trigger when option includes description content',
    apiOptionDisabled: 'Disables this individual option',
    apiOptionSlots: 'Option label, leading icon, secondary description, and checked indicator slots',
  },
  swatchPicker: {
    desc: 'Single-select color swatch picker following Fluent 2 SwatchPicker conventions with radiogroup / radio semantics, roving tabindex navigation, dual-ring selection, 4 sizes, and 3 shapes.',
    secSizesShapes: 'Sizes & Shapes',
    secLayoutSpacing: 'Layout & Spacing',
    secStates: 'Borders & Disabled States',
    ariaLabel: 'Choose a color',
    currentColor: 'Selected color',
    emptyValue: '(none)',
    cardSizesTitle: 'Four Swatch Sizes',
    cardShapesTitle: 'Three Swatch Shapes',
    cardGridTitle: 'Grid Layout (layout="grid")',
    cardGridDesc: 'Fix columns per row with columnCount; Up/Down arrow keys step by column.',
    cardSpacingTitle: 'Swatch Spacing (small / medium)',
    cardBorderDisabledTitle: 'Light Swatch Border & Disabled Swatch',
    cardBorderDisabledDesc: 'Pass borderColor on light swatches like white to keep edges clear; disabled swatches show a diagonal strike and are skipped by arrow keys.',
    cardGroupDisabledTitle: 'Disabled Group',
    colorRed: 'Crimson',
    colorOrange: 'Orange',
    colorYellow: 'Gold',
    colorGreen: 'Green',
    colorTeal: 'Teal',
    colorBlue: 'Fluent Blue',
    colorViolet: 'Violet',
    colorWhite: 'White',
    colorGray: 'Neutral Gray',
    catalogDesc: 'Color swatch radio group with 4 sizes, 3 shapes, grid layout & arrow navigation',
    apiModelValue: 'Controlled selected swatch value for v-model',
    apiSize: 'Swatch size (extra-small 20px / small 24px / medium 28px / large 32px)',
    apiShape: 'Swatch shape (square / rounded / circular)',
    apiLayout: 'Layout mode (row wrapping / fixed-column grid)',
    apiColumnCount: 'Number of columns per row when layout="grid"',
    apiSpacing: 'Gap between swatches (small 2px / medium 4px)',
    apiDisabled: 'Disable the entire swatch picker',
    apiUpdate: 'Emitted when the selected swatch changes to sync v-model',
    apiChange: 'Emitted on selection change with the triggering event',
    apiSlotDefault: 'VfkColorSwatch items',
    apiSwatchValue: 'Unique value matched against VfkSwatchPicker modelValue',
    apiSwatchColor: 'CSS color displayed by the swatch (defaults to value)',
    apiSwatchBorderColor: '1px inset border color for light swatches on light surfaces',
    apiSwatchLabel: 'Accessible label and tooltip title (defaults to value)',
    apiSwatchDisabled: 'Disable this individual swatch',
    apiSwatchSlotDefault: 'Optional icon or marker rendered inside the swatch',
  },
  switch: {
    desc: 'Thin Vue wrapper over official <fluent-switch> with controlled boolean v-model, automatic label association, labelPosition, and native ARIA switch semantics.',
    secBasic: 'Basic Usage & Label Position',
    secStates: 'Disabled & Required',
    sampleLabel: 'Enable auto sync',
    stateOn: 'On',
    stateOff: 'Off',
    stateLabel: 'Current state',
    cardBasicTitle: 'Switch & Label Position (after / before)',
    cardBasicDesc: 'Click the switch or its linked label to toggle, or press Space when focused.',
    cardStatesTitle: 'Disabled & Required States',
    labelBefore: 'Label before switch',
    requiredLabel: 'Required toggle',
    disabledOn: 'Disabled (On)',
    disabledOff: 'Disabled (Off)',
    catalogDesc: 'Controlled boolean v-model switch, labelPosition & accessible label',
    apiModelValue: 'Boolean checked state for v-model',
    apiLabel: 'Label text (used when default slot is omitted)',
    apiLabelPosition: 'Label position relative to the switch',
    apiFlags: 'Disabled and required states (shows asterisk when required)',
    apiUpdate: 'Emitted when switch toggles to update v-model',
    apiChange: 'Fired on toggle with next boolean value',
    apiSlotDefault: 'Custom label content',
  },
  radio: {
    desc: 'Thin Vue wrapper over official <fluent-radio-group> and <fluent-radio> with controlled v-model, vertical/horizontal layout, arrow-key navigation, and disabled states.',
    secOrientation: 'Orientation',
    secStates: 'Disabled Group',
    currentValue: 'Selected value',
    cardOrientationTitle: 'Horizontal Layout (orientation="horizontal")',
    cardOrientationDesc: 'Supports arrow-key roving focus across enabled radio options.',
    cardStatesTitle: 'Disabled Group',
    optStandard: 'Standard build',
    optFast: 'Fast cache',
    optCustom: 'Custom script',
    optDisabled: 'Legacy image (disabled)',
    catalogDesc: 'Controlled radio group, vertical/horizontal layout & arrow-key navigation',
    apiModelValue: 'Controlled selected value for v-model',
    apiOrientation: 'Layout direction of radio items',
    apiFlags: 'Group disabled and required states',
    apiName: 'Form field name synced to child VfkRadio items',
    apiUpdate: 'Emitted when selected radio changes',
    apiChange: 'Fired on selection change with value and event',
    apiRadioProps: 'Child VfkRadio value, label, and individual disabled flag',
  },
  combobox: {
    desc: 'Thin Vue wrapper over <fluent-dropdown type="combobox">, <fluent-listbox>, and <fluent-option> with prefix filtering, freeform input, 4 appearances, and 3 sizes.',
    secAppearances: 'Appearances',
    secSizes: 'Sizes',
    secFilterFreeform: 'Filtering & Freeform',
    secRichDisabled: 'Rich Options & Disabled',
    placeholder: 'Type or choose a framework...',
    freeformPlaceholder: 'Type any tag or pick a suggestion...',
    freeformPrefix: 'Use: ',
    currentValue: 'Selected value',
    lastInput: 'Last query',
    emptyValue: '(none)',
    clearSelection: 'Clear selection',
    optVue: 'Vue',
    optVite: 'Vite',
    optReact: 'React',
    optSvelte: 'Svelte',
    optAngular: 'Angular',
    optLegacy: 'Legacy (deprecated)',
    optVueDesc: 'Progressive frontend framework',
    optViteDesc: 'Next-generation frontend build tool',
    optReactDesc: 'Component UI library',
    optLegacyDesc: 'Shown disabled for demo purposes',
    cardAppearancesTitle: 'Four Fluent 2 Appearances',
    cardAppearancesDesc: 'Matches VfkSelect with outline, transparent, filled-darker, and filled-lighter variants.',
    cardSizesTitle: 'Small / Medium / Large Sizes',
    cardFilterTitle: 'Live Prefix Filtering (filter)',
    cardFilterDesc: 'Enabled by default: typing a prefix like "v" keeps matching options (Vue / Vite) and restricts keyboard navigation to visible items; closing restores all options.',
    cardFreeformTitle: 'Freeform Custom Input (freeform)',
    cardFreeformDesc: 'Allows committing text not listed in the options via Enter, with a customizable #freeform prefix slot.',
    cardRichTitle: 'Shared VfkOption Icons, Descriptions & Disabled Items',
    cardRichDesc: 'Reuses VfkOption from Select; set the text prop to control the input display text when descriptions are present.',
    cardDisabledTitle: 'Disabled State',
    catalogDesc: 'Editable combobox with prefix filtering, freeform input & keyboard navigation',
    apiModelValue: 'Controlled value (can also be custom text when freeform is enabled)',
    apiAppearance: 'Visual style (outline maps to the default native style)',
    apiSize: 'Control size (small / medium / large)',
    apiPlaceholder: 'Placeholder text when the input is empty',
    apiFilter: 'Filter visible options by input prefix in real time',
    apiFreeform: 'Allow committing custom text not present in the option list',
    apiFlags: 'Disabled and required form states',
    apiName: 'Native form field name',
    apiUpdate: 'Emitted when selection or freeform commit changes to sync v-model',
    apiChange: 'Emitted on value change with the native Event',
    apiInput: 'Emitted as the user types with the current query string',
    apiSlotDefault: 'Option list (VfkOption elements wrapped in fluent-listbox)',
    apiSlotIndicator: 'Custom trailing chevron indicator (slot="indicator")',
    apiSlotFreeform: 'Prefix text rendered before the typed value in the freeform option',
  },
  field: {
    desc: 'Thin Vue wrapper over official <fluent-field> combining label, form control, validation status icon/message, and helper hint.',
    secValidation: 'Validation States',
    secForm: 'Composite Form Example',
    sampleLabel: 'Project slug',
    sampleHint: 'Lowercase letters, numbers, and hyphens only',
    sampleError: 'Invalid format; special characters are not allowed',
    sampleWarning: 'Recommended length is at least 6 characters',
    sampleSuccess: 'Slug is available',
    cardValidationTitle: 'Four Validation States (error / warning / success / none)',
    cardValidationDesc: 'Error state applies danger semantics and role="alert" automatically.',
    cardFormTitle: 'Horizontal Form Composition (Input / Select / RadioGroup / Switch)',
    cardFormDesc: 'Demonstrates VfkField aligning the full set of form controls together.',
    formNameLabel: 'Project name',
    formNamePlaceholder: 'Enter project name',
    formNameHint: 'Used as the branch preview subdomain prefix',
    formEnvLabel: 'Environment',
    formStrategyLabel: 'Build strategy',
    formAutoDeployLabel: 'Auto deploy',
    catalogDesc: 'Combines label, validation icons/messages, hint & vertical/horizontal layout',
    apiLabel: 'Field label text (used when #label slot is omitted)',
    apiFor: 'Target form control id passed to internal label',
    apiOrientation: 'Label placement direction (vertical / horizontal)',
    apiSize: 'Label typography size',
    apiFlags: 'Required asterisk and disabled label appearance',
    apiValidationState: 'Validation state controlling icon and semantic color',
    apiValidationMessage: 'Validation feedback text',
    apiHint: 'Helper hint text',
    apiSlots: 'Default control, custom label, validation message, and hint slots',
  },
  tree: {
    desc: 'Thin Vue wrapper over official <fluent-tree> and <fluent-tree-item> supporting multi-level nesting, v-model selection, expand-only groups, start/end/aside slots, and keyboard navigation.',
    secSlots: 'Icons, Badges & Aside Slots',
    secNavigation: 'Sidebar Navigation Mode',
    currentValue: 'Selected value',
    lastToggle: 'Last toggle',
    noneSelected: '(none)',
    groupDocs: 'Documentation',
    groupGuides: 'Guides',
    groupComponents: 'Components',
    nodeOverview: 'Quick Start',
    nodeTheming: 'Theming & Brand',
    nodeTokens: 'Design Tokens',
    nodeButton: 'Button',
    nodeInput: 'Input',
    nodeTree: 'Tree',
    cardSlotsTitle: 'start / end / aside Slots',
    cardSlotsDesc: 'Place icons in #start, tags in #end, and counts or action buttons in #aside; interactive buttons inside #aside do not toggle or select the row.',
    cardNavTitle: 'Non-selectable Group Nodes (:selectable="false")',
    cardNavDesc: 'Clicking a group row only expands or collapses its children without stealing selection from the active page item.',
    navGroupMain: 'Workspace',
    navGroupSettings: 'Settings',
    navItemDashboard: 'Dashboard',
    navItemAnalytics: 'Analytics',
    navItemProfile: 'Profile',
    navItemSecurity: 'Security',
    navActionHint: 'Groups toggle only; leaf items update selection',
    catalogDesc: 'Hierarchical tree view with v-model selection, expand-only groups & slots',
    apiModelValue: 'Selected tree item value bound via v-model',
    apiAppearance: 'Visual variant propagated to all child tree items',
    apiSize: 'Row density (small / medium) propagated to all child tree items',
    apiUpdate: 'Emitted when the selected item changes for v-model',
    apiChange: 'Emitted on selection change with native event',
    apiToggle: 'Emitted when any item expands or collapses with { value, expanded }',
    apiItemProps: 'Item props: value, label, expanded, selected, selectable, appearance, size',
    apiSlots: 'Default (label or nested items), items, start, end, aside, and chevron slots',
  },
  tabs: {
    desc: 'Thin Vue wrapper over official <fluent-tablist> and <fluent-tab> supporting v-model sync, horizontal/vertical orientation, transparent/subtle appearances, 3 sizes, icon slots, and arrow-key navigation.',
    secLayout: 'Vertical Orientation & Sizes',
    secIcons: 'Icons, Badges & Tab Panels',
    currentValue: 'Active tab',
    tabOverview: 'Overview',
    tabSpecs: 'Specifications',
    tabLogs: 'Changelog',
    tabDisabled: 'Disabled',
    panelOverview: 'Overview panel: displays summary information for the active tab.',
    panelSpecs: 'Specifications panel: covers props, emits, and slot contracts.',
    panelLogs: 'Changelog panel: tracks releases and compatibility notes.',
    cardVerticalTitle: 'Vertical TabList (orientation="vertical")',
    cardVerticalDesc: 'Ideal for side section switching; the indicator bar moves to the start edge.',
    cardSizesTitle: 'Three Sizes (small / medium / large)',
    cardIconsTitle: 'start / end Slots & Linked Panel',
    cardIconsDesc: 'Combine #start icons and #end badges with v-model to switch panel content.',
    catalogDesc: 'Horizontal/vertical tabs with v-model, sliding indicator & icon slots',
    apiModelValue: 'Selected tab value bound via v-model',
    apiAppearance: 'Tablist appearance variant (transparent / subtle)',
    apiOrientation: 'Layout orientation (horizontal / vertical)',
    apiSize: 'Tab size (small / medium / large)',
    apiDisabled: 'Disables the entire tablist',
    apiUpdate: 'Emitted when the active tab changes for v-model',
    apiChange: 'Emitted on tab change with native event',
    apiTabProps: 'VfkTab supports value, label, disabled, id and default / start / end slots',
  },
  dialog: {
    catalogDesc: 'Native <dialog> with modal, non-modal, and alert modes plus automatic title association',
    desc: 'Thin Vue wrapper over official <fluent-dialog> and <fluent-dialog-body>, built on the native <dialog> element with modal, non-modal, and alert modes, focus trapping, Escape dismissal, automatic title association, and a footer action area.',
    secTypes: 'Three Modal Types',
    secBody: 'Title, Actions & Panel Width',
    sampleTitle: 'Publish a new release',
    sampleBody: 'Confirming will update the docs site and the npm package.',
    confirm: 'Publish',
    cancel: 'Cancel',
    btnModal: 'Open modal dialog',
    btnAlert: 'Open alert dialog',
    btnNonModal: 'Open non-modal dialog',
    bodyTitle: 'Custom panel width & title action',
    bodyDesc: 'Use maxWidth to override the official 600px panel width; extra actions can sit next to the title.',
    stateLabel: 'State',
    stateOpen: 'Open',
    stateClosed: 'Closed',
    cardTypesTitle: 'modal / alert / non-modal',
    cardTypesDesc: 'modal closes on backdrop click, alert requires explicit confirmation, and non-modal has no backdrop and keeps background focus free.',
    cardBodyTitle: 'Title actions & custom width',
    cardBodyDesc: 'The #action footer stacks vertically in narrow containers and right-aligns in wide ones.',
    apiModelValue: 'Open state for v-model two-way binding',
    apiType: 'Modal type (modal / non-modal / alert)',
    apiAria: 'ariaLabel, ariaLabelledby and ariaDescribedby; falls back to the inner title automatically',
    apiMaxWidth: 'Panel max width, defaults to the official 600px',
    apiUpdate: 'Emitted when the open state changes for v-model',
    apiOpenChange: 'Emitted on open-state change with the native event',
    apiSlots: 'Default slot: dialog content (place VfkDialogBody)',
    apiBody: 'VfkDialogBody supports title, closable, closeLabel and title / title-action / close / action / default slots',
  },
  drawer: {
    catalogDesc: 'Modal, non-modal, and inline panels with start/end placement and four preset widths',
    desc: 'Thin Vue wrapper over official <fluent-drawer> and <fluent-drawer-body> supporting modal / non-modal / inline types, start or end placement, four preset widths, and custom widths.',
    secTypes: 'Three Drawer Types',
    secPosition: 'Placement, Size & Footer Actions',
    sampleTitle: 'Filters',
    sampleBody: 'Filter episodes by year, resolution, and subtitle language.',
    footerApply: 'Apply filters',
    btnModal: 'Slide in from start',
    btnNonModal: 'Floating without backdrop',
    btnInline: 'Inline drawer',
    btnEnd: 'Slide in from end',
    stateLabel: 'State',
    stateOpen: 'Open',
    stateClosed: 'Closed',
    cardTypesTitle: 'modal / non-modal / inline',
    cardTypesDesc: 'modal has a backdrop and focus trap, non-modal keeps background focus free, and inline flows with the document.',
    cardPositionTitle: 'position="end" with a custom width',
    cardPositionDesc: 'Combine end placement with width to override the preset, with fixed actions in the #footer slot.',
    apiModelValue: 'Open state for v-model two-way binding',
    apiType: 'Presentation type (modal / non-modal / inline)',
    apiPositionSize: 'Placement (start / end) and preset width (small / medium / large / full)',
    apiWidth: 'Custom width, takes precedence over size',
    apiAria: 'ariaLabelledby and ariaDescribedby; falls back to the inner title automatically',
    apiUpdate: 'Emitted when the open state changes for v-model',
    apiOpenChange: 'Emitted on open-state change with the native event',
    apiSlots: 'Default slot: drawer content (place VfkDrawerBody)',
    apiBody: 'VfkDrawerBody supports title, closable, closeLabel and title / close / footer / default slots',
  },
  badge: {
    desc: 'Thin Vue wrapper over official <fluent-badge> supporting filled / tint / outline / ghost appearances, eight semantic colors, six sizes (tiny and extra-small render as dots), and three shapes.',
    catalogDesc: 'Four appearances, eight colors, six sizes, and three shapes',
    secAppearances: 'Four Appearances',
    secColors: 'Eight Semantic Colors',
    secSizesShapes: 'Sizes & Shapes',
    sampleText: 'Badge',
    apiAppearance: 'Appearance (filled / tint / outline / ghost)',
    apiColor: 'Semantic color (brand / danger / success / warning and four more)',
    apiSize: 'Size (tiny / extra-small / small / medium / large / extra-large)',
    apiShape: 'Shape (circular / rounded / square)',
    apiSlots: 'Default slot holds text; start / end hold leading icons and trailing content',
  },
  textarea: {
    desc: 'Thin Vue wrapper over official <fluent-textarea> with controlled v-model, three appearances, three sizes, user resizing, and auto-resize, keeping native form association and validity APIs.',
    catalogDesc: 'Controlled v-model, three appearances, three sizes, and resize handles',
    secAppearances: 'Appearance & Size',
    secResize: 'Resize & Auto-resize',
    secStates: 'Disabled, Read-only & Min Height',
    placeholder: 'Write something...',
    sampleLabel: 'Notes',
    cardAppearancesTitle: 'Three appearances (outline / filled-lighter / filled-darker)',
    cardAppearancesDesc: 'Appearance names match VfkInput, and the brand underline updates on focus.',
    cardResizeTitle: 'resize and autoResize',
    cardResizeDesc: 'resize adds a drag handle while autoResize grows with content — avoid combining both.',
    cardStatesTitle: 'Disabled, read-only, and custom min height',
    apiModelValue: 'Text value for v-model two-way binding',
    apiAppearance: 'Visual appearance (outline / filled-lighter / filled-darker)',
    apiSize: 'Size (small / medium / large)',
    apiResize: 'Resize direction available to users; ignored when disabled',
    apiAutoResize: 'Height follows content; do not combine with a fixed height',
    apiBlock: 'Fills the row width instead of the default 18rem',
    apiMinHeight: 'Minimum height applied through the public ::part(control)',
    apiFlags: 'Native attributes such as placeholder, disabled, readonly, required, maxlength',
    apiUpdate: 'Emitted on input for v-model',
    apiChange: 'Emitted on blur when the content changed',
    apiSlotLabel: 'Label slot for a <fluent-label> element',
  },
  tooltip: {
    desc: 'Thin Vue wrapper over official <fluent-tooltip> positioned with native Popover and CSS Anchor Positioning, triggered by hover or keyboard focus, with automatic id and aria-describedby wiring.',
    catalogDesc: 'Native Popover positioning, hover and focus triggered',
    secDirections: 'Directions & Alignment',
    secContent: 'Rich Content & Custom Anchor',
    triggerLabel: 'Hover for a hint',
    richTextTitle: 'Release notes',
    richTextBody: 'Contains breaking changes — read the migration guide before upgrading.',
    cardDirectionsTitle: 'Four directions with alignment variants',
    cardDirectionsDesc: 'positioning accepts above / below / before / after with alignment variants and flips near viewport edges.',
    cardContentTitle: 'Rich content and custom anchors',
    cardContentDesc: 'Use the #content slot for rich markup, or point anchor at an element that already has an id.',
    apiText: 'Tooltip text used when no #content slot is provided',
    apiAnchor: 'id of the trigger element; generated automatically for the first slotted element',
    apiPositioning: 'Direction (above / below / before / after plus start / end / top / bottom variants)',
    apiDelay: 'Hover delay in milliseconds; focus shows the tooltip immediately',
    apiSlots: 'Default slot is the trigger; #content holds rich tooltip markup',
  },
  menu: {
    desc: 'Thin Vue wrapper over official <fluent-menu>, <fluent-menu-button>, <fluent-menu-list>, and <fluent-menu-item> supporting native Popover menus, split buttons, checkbox/radio items, submenus, and context menus.',
    secCheckRadio: 'Checkbox & Radio Menu Items',
    secSubmenuContext: 'Nested Submenu & Context Menu',
    triggerLabel: 'Actions',
    primaryActionLabel: 'Save changes',
    lastAction: 'Last action',
    noneAction: '(none)',
    itemNew: 'New file',
    itemCopy: 'Duplicate',
    itemExport: 'Export config',
    itemDelete: 'Delete item',
    itemDisabled: 'Archive (disabled)',
    cardCheckRadioTitle: 'menuitemcheckbox & menuitemradio (with Divider)',
    cardCheckRadioDesc: 'Menu stays open when toggling checkable items; VfkMenuDivider separates radio groups.',
    checkGrid: 'Show grid',
    checkRuler: 'Show ruler',
    radioAsc: 'Sort A to Z',
    radioDesc: 'Sort Z to A',
    checkRadioTrigger: 'View options',
    cardSubmenuTitle: 'Submenu & Right-Click Context Menu (openOnContext)',
    cardSubmenuDesc: 'Nest a VfkMenuList inside VfkMenuItem for submenus; enable openOnContext for right-click menus.',
    submenuTrigger: 'More actions',
    submenuShare: 'Share via',
    submenuCopyLink: 'Copy link',
    submenuEmail: 'Send email',
    contextZoneHint: 'Right-click anywhere in this box to open the context menu',
    catalogDesc: 'Native Popover menu with split button, checkable items, submenus & context trigger',
    apiFlags: 'Hover open, right-click context open, close on scroll, persist on item click',
    apiSplit: 'Split button mode pairing #primary-action and #trigger',
    apiMaxHeight: 'Sets maximum menu popover height (--menu-max-height)',
    apiOpenChange: 'Emitted when the menu popover opens or closes',
    apiListSelect: 'Emitted on VfkMenuList whenever any descendant VfkMenuItem is invoked',
    apiItemProps: 'VfkMenuItem supports value, label, role, checked (v-model:checked), disabled',
    apiSlots: 'VfkMenu offers trigger / primary-action / default; VfkMenuItem offers start / end / submenu',
  },
}
