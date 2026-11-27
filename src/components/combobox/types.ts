/** 可输入下拉框视觉外观，outline 对应官方默认样式 */
export type ComboboxAppearance = 'outline' | 'transparent' | 'filled-darker' | 'filled-lighter'

/** 可输入下拉框尺寸 */
export type ComboboxSize = 'small' | 'medium' | 'large'

export interface VfkComboboxProps {
  /** 当前选中项的值，用于 v-model 双向绑定；开启 freeform 时也可以是自定义输入文本 */
  modelValue?: string
  /** 视觉外观 */
  appearance?: ComboboxAppearance
  /** 控件尺寸 */
  size?: ComboboxSize
  /** 输入框为空时的占位提示文字 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否必填 */
  required?: boolean
  /** 表单字段名 */
  name?: string
  /** 是否按输入文本过滤选项（按选项文本前缀匹配，忽略大小写与重音） */
  filter?: boolean
  /** 是否允许提交不在选项列表中的自定义文本 */
  freeform?: boolean
}
