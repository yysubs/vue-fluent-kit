/** 按钮视觉外观，secondary 对应官方默认样式 */
export type ButtonAppearance = 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'

/** 按钮圆角形状 */
export type ButtonShape = 'rounded' | 'circular' | 'square'

/** 按钮尺寸 */
export type ButtonSize = 'small' | 'medium' | 'large'

/** 原生按钮类型 */
export type ButtonType = 'button' | 'submit' | 'reset'

export interface VfButtonProps {
  /** 按钮外观 */
  appearance?: ButtonAppearance
  /** 按钮形状 */
  shape?: ButtonShape
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 原生按钮类型 */
  type?: ButtonType
  /** 是否禁用 */
  disabled?: boolean
  /** 禁用但保留键盘聚焦，便于屏幕阅读器读取 */
  disabledFocusable?: boolean
  /** 仅图标模式，不传时根据插槽自动判断 */
  iconOnly?: boolean
}
