/** 色块尺寸：extra-small 20px、small 24px、medium 28px、large 32px */
export type SwatchPickerSize = 'extra-small' | 'small' | 'medium' | 'large'

/** 色块形状 */
export type SwatchPickerShape = 'square' | 'rounded' | 'circular'

/** 色块排列方式：row 单行自动换行，grid 按 columnCount 固定列数 */
export type SwatchPickerLayout = 'row' | 'grid'

/** 色块间距：small 2px、medium 4px */
export type SwatchPickerSpacing = 'small' | 'medium'

export interface VfkSwatchPickerProps {
  /** 当前选中色块的值，用于 v-model 双向绑定 */
  modelValue?: string
  /** 色块尺寸 */
  size?: SwatchPickerSize
  /** 色块形状 */
  shape?: SwatchPickerShape
  /** 排列方式 */
  layout?: SwatchPickerLayout
  /** grid 布局下每行色块数量 */
  columnCount?: number
  /** 色块间距 */
  spacing?: SwatchPickerSpacing
  /** 是否整体禁用 */
  disabled?: boolean
}

export interface VfkColorSwatchProps {
  /** 色块值，用于与 VfkSwatchPicker 的 modelValue 匹配 */
  value: string
  /** 色块展示颜色，接受任意 CSS 颜色值，不传时使用 value */
  color?: string
  /** 色块 1px 内描边颜色，用于浅色色块在浅色背景上保持可辨识 */
  borderColor?: string
  /** 无障碍名称与悬停提示，不传时使用 value */
  label?: string
  /** 是否禁用该色块 */
  disabled?: boolean
}
