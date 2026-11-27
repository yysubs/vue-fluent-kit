/** 表单字段标签与控件排列方向 */
export type FieldOrientation = 'vertical' | 'horizontal'

/** 表单字段标签尺寸 */
export type FieldSize = 'small' | 'medium' | 'large'

/** 表单字段校验状态 */
export type FieldValidationState = 'none' | 'error' | 'warning' | 'success'

export interface VfkFieldProps {
  /** 字段标签文本，未传 label 插槽时生效 */
  label?: string
  /** 关联表单控件的元素 id，透传给内部 label 的 for 属性 */
  for?: string
  /** 标签与控件的排列方向 */
  orientation?: FieldOrientation
  /** 标签文字尺寸 */
  size?: FieldSize
  /** 是否必填，开启时在标签后展示必填星号 */
  required?: boolean
  /** 是否禁用标签展示 */
  disabled?: boolean
  /** 校验状态 */
  validationState?: FieldValidationState
  /** 校验反馈消息，未传 validationMessage 插槽时生效 */
  validationMessage?: string
  /** 辅助提示文字，未传 hint 插槽时生效 */
  hint?: string
}
