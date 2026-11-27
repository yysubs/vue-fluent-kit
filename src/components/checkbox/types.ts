/** 勾选状态：true 为选中，false 为未选中，'mixed' 为半选 */
export type CheckboxValue = boolean | 'mixed'

/** 指示器形状 */
export type CheckboxShape = 'square' | 'circular'

/** 指示器尺寸 */
export type CheckboxSize = 'medium' | 'large'

/** 标签相对勾选框的位置 */
export type CheckboxLabelPosition = 'after' | 'before'

export interface VfCheckboxProps {
  /** 当前勾选状态，用于 v-model 双向绑定 */
  modelValue?: CheckboxValue
  /** 指示器形状 */
  shape?: CheckboxShape
  /** 指示器尺寸 */
  size?: CheckboxSize
  /** 是否禁用 */
  disabled?: boolean
  /** 是否必填 */
  required?: boolean
  /** 标签文字，未传默认插槽时生效 */
  label?: string
  /** 标签位置 */
  labelPosition?: CheckboxLabelPosition
  /** 关联 label 的元素 id，未传时自动生成 */
  id?: string
  /** 表单字段名 */
  name?: string
  /** 表单提交值 */
  value?: string
}
