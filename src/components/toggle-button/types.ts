import type { ButtonAppearance, ButtonShape, ButtonSize, ButtonType } from '../button/types'

/** 切换按钮按压状态：true 为按下，false 为未按下，'mixed' 为半按压态 */
export type ToggleButtonValue = boolean | 'mixed'

export interface VfkToggleButtonProps {
  /** 按压状态，用于 v-model 双向绑定 */
  modelValue?: ToggleButtonValue
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
