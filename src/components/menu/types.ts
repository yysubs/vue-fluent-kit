import type { ButtonAppearance, ButtonShape, ButtonSize } from '../button/types'

/** 菜单项角色，对齐官方 fluent-menu-item role */
export type MenuItemRole = 'menuitem' | 'menuitemcheckbox' | 'menuitemradio'

export interface VfkMenuProps {
  /** 悬停触发器时打开菜单 */
  openOnHover?: boolean
  /** 右键触发器时打开菜单 */
  openOnContext?: boolean
  /** 页面滚动时自动关闭菜单 */
  closeOnScroll?: boolean
  /** 点击普通菜单项后保持菜单打开 */
  persistOnItemClick?: boolean
  /** 拆分按钮模式，配合 #primary-action 与 #trigger 使用 */
  split?: boolean
  /** 菜单浮层最大高度（映射到 --menu-max-height） */
  maxHeight?: string
}

export interface VfkMenuButtonProps {
  /** 按钮视觉外观，对齐 VfkButton */
  appearance?: ButtonAppearance
  /** 按钮圆角形状 */
  shape?: ButtonShape
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 禁用态 */
  disabled?: boolean
  /** 可聚焦禁用态 */
  disabledFocusable?: boolean
  /** 仅图标模式（未传默认插槽时自动为 true） */
  iconOnly?: boolean
}

export interface VfkMenuItemProps {
  /** 菜单项唯一标识，随 select 事件返回 */
  value?: string
  /** 菜单项文案（未传默认插槽时生效） */
  label?: string
  /** 菜单项语义角色：普通项、复选项或单选项 */
  role?: MenuItemRole
  /** 复选/单选菜单项的勾选状态（支持 v-model:checked） */
  checked?: boolean
  /** 是否禁用当前菜单项 */
  disabled?: boolean
}
