/** 单选组排列方向 */
export type RadioGroupOrientation = 'vertical' | 'horizontal'

export interface VfkRadioGroupProps {
  /** 当前选中项的值，用于 v-model 双向绑定 */
  modelValue?: string
  /** 排列方向 */
  orientation?: RadioGroupOrientation
  /** 是否禁用整组 */
  disabled?: boolean
  /** 是否必选 */
  required?: boolean
  /** 表单字段名 */
  name?: string
}

export interface VfkRadioProps {
  /** 单选项的值，与 VfkRadioGroup 的 modelValue 匹配 */
  value: string
  /** 选项标签文字，未传默认插槽时生效 */
  label?: string
  /** 是否禁用该单选项 */
  disabled?: boolean
  /** 关联 label 的元素 id，未传时自动生成 */
  id?: string
}
