/** 标签栏外观变体，对齐官方 fluent-tablist appearance */
export type TabAppearance = 'transparent' | 'subtle'

/** 标签栏排列方向，对齐官方 fluent-tablist orientation */
export type TabOrientation = 'horizontal' | 'vertical'

/** 标签栏尺寸，对齐官方 fluent-tablist size */
export type TabSize = 'small' | 'medium' | 'large'

export interface VfkTabListProps {
  /** 当前选中标签的 value，用于 v-model 双向绑定 */
  modelValue?: string
  /** 标签栏外观 */
  appearance?: TabAppearance
  /** 标签栏排列方向 */
  orientation?: TabOrientation
  /** 标签栏尺寸 */
  size?: TabSize
  /** 是否禁用整个标签栏 */
  disabled?: boolean
}

export interface VfkTabProps {
  /** 标签唯一标识，与 VfkTabList 的 v-model 对应 */
  value: string
  /** 标签文案（未传默认插槽时生效） */
  label?: string
  /** 是否禁用当前标签 */
  disabled?: boolean
  /** 可选自定义 DOM id，未传时由父级 VfkTabList 自动生成无冲突前缀 */
  id?: string
}
