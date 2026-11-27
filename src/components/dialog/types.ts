/** 对话框模态类型，对齐官方 fluent-dialog type */
export type DialogType = 'modal' | 'non-modal' | 'alert'

export interface VfkDialogProps {
  /** 打开状态，用于 v-model 双向绑定 */
  modelValue?: boolean
  /** 模态类型：普通模态、非模态或必须显式确认的警报对话框 */
  type?: DialogType
  /** 对话框的无障碍名称，未传 ariaLabelledby 且内部有标题时自动关联 VfkDialogBody 的标题 */
  ariaLabel?: string
  /** 外部标题元素的 id，优先级高于内部标题自动关联 */
  ariaLabelledby?: string
  /** 外部描述元素的 id */
  ariaDescribedby?: string
  /** 面板最大宽度，默认沿用官方 600px */
  maxWidth?: string
}

export interface VfkDialogBodyProps {
  /** 标题文案，未传 #title 插槽时生效 */
  title?: string
  /** 是否在标题右侧渲染内置关闭按钮 */
  closable?: boolean
  /** 关闭按钮的无障碍名称 */
  closeLabel?: string
}
