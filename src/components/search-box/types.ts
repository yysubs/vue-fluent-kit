import type { InputAppearance, InputSize } from '../input/types'

/** 搜索框视觉外观（与 VfkInput 一致） */
export type SearchBoxAppearance = InputAppearance

/** 搜索框尺寸（与 VfkInput 一致） */
export type SearchBoxSize = InputSize

export interface VfkSearchBoxProps {
  /** 搜索文本，用于 v-model 双向绑定 */
  modelValue?: string
  /** 视觉外观 */
  appearance?: SearchBoxAppearance
  /** 控件尺寸 */
  size?: SearchBoxSize
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
  /** 清除按钮的无障碍名称（aria-label） */
  dismissLabel?: string
}
