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
}
