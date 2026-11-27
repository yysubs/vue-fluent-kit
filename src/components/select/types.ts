/** 下拉选择器视觉外观，outline 对应官方默认样式 */
export type SelectAppearance = 'outline' | 'transparent' | 'filled-darker' | 'filled-lighter'

/** 下拉选择器尺寸 */
export type SelectSize = 'small' | 'medium' | 'large'

export interface VfkSelectProps {
  /** 当前选中项的值，用于 v-model 双向绑定 */
  modelValue?: string
  /** 视觉外观 */
  appearance?: SelectAppearance
  /** 控件尺寸 */
  size?: SelectSize
  /** 未选中时的占位提示文字 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否必填 */
  required?: boolean
  /** 表单字段名 */
  name?: string
}

export interface VfkOptionProps {
  /** 选项值，用于与 VfkSelect 的 modelValue 匹配 */
  value: string
  /** 是否禁用该选项 */
  disabled?: boolean
  /** 选中后显示在触发器上的文本，不传时自动读取选项正文 */
  text?: string
}
