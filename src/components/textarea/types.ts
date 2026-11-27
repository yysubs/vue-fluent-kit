/** 多行文本框视觉外观，对齐官方 fluent-textarea appearance */
export type TextareaAppearance = 'outline' | 'filled-lighter' | 'filled-darker'

/** 多行文本框尺寸，对齐官方 fluent-textarea size */
export type TextareaSize = 'small' | 'medium' | 'large'

/** 用户可拖拽的缩放方向，对齐官方 fluent-textarea resize */
export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'

export interface VfkTextareaProps {
  /** 文本值，用于 v-model 双向绑定 */
  modelValue?: string
  /** 视觉外观 */
  appearance?: TextareaAppearance
  /** 控件尺寸 */
  size?: TextareaSize
  /** 用户可拖拽的缩放方向，禁用态自动失效 */
  resize?: TextareaResize
  /** 高度随内容自动变化，开启后不要再设固定高度 */
  autoResize?: boolean
  /** 占满整行宽度，否则使用默认 18rem 宽度 */
  block?: boolean
  /** 最小高度，映射到 --vfk-textarea-min-height，经官方 ::part(root) 生效 */
  minHeight?: string
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
  /** 最大字符数 */
  maxlength?: number
  /** 最小字符数 */
  minlength?: number
}
