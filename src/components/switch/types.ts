/** 标签相对开关的位置 */
export type SwitchLabelPosition = 'after' | 'before'

export interface VfkSwitchProps {
  /** 开关状态，用于 v-model 双向绑定 */
  modelValue?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否必填 */
  required?: boolean
  /** 标签文字，未传默认插槽时生效 */
  label?: string
  /** 标签位置 */
  labelPosition?: SwitchLabelPosition
  /** 关联 label 的元素 id，未传时自动生成 */
  id?: string
  /** 表单字段名 */
  name?: string
  /** 表单提交值 */
  value?: string
}
