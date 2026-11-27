/** 徽标外观，对齐官方 fluent-badge appearance */
export type BadgeAppearance = 'filled' | 'tint' | 'outline' | 'ghost'

/** 徽标语义颜色，对齐官方 fluent-badge color */
export type BadgeColor =
  | 'brand'
  | 'danger'
  | 'important'
  | 'informative'
  | 'severe'
  | 'subtle'
  | 'success'
  | 'warning'

/** 徽标尺寸，tiny 与 extra-small 为纯圆点 */
export type BadgeSize = 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'

/** 徽标形状，对齐官方 fluent-badge shape */
export type BadgeShape = 'circular' | 'rounded' | 'square'

export interface VfkBadgeProps {
  /** 徽标外观 */
  appearance?: BadgeAppearance
  /** 徽标语义颜色 */
  color?: BadgeColor
  /** 徽标尺寸 */
  size?: BadgeSize
  /** 徽标形状 */
  shape?: BadgeShape
}
