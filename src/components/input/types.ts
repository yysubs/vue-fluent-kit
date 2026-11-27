/** 输入框视觉外观 */
export type InputAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter'

/** 输入框尺寸，映射到官方 control-size */
export type InputSize = 'small' | 'medium' | 'large'

/** 支持的输入类型 */
export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url'

export interface VInputProps {
  /** 输入值，用于 v-model 双向绑定 */
  modelValue?: string
  /** 视觉外观 */
  appearance?: InputAppearance
  /** 控件尺寸 */
  size?: InputSize
  /** 输入类型 */
  type?: InputType
  /** 占位提示文字 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否必填 */
  required?: boolean
  /** 表单字段名 */
  name?: string
  /** 浏览器自动填充提示 */
  autocomplete?: string
  /** 最大字符数 */
  maxlength?: number
  /** 最小字符数 */
  minlength?: number
}
