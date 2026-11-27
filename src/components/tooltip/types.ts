/** 提示相对锚点的方位，对齐官方 fluent-tooltip positioning */
export type TooltipPositioning =
  | 'above'
  | 'above-start'
  | 'above-end'
  | 'below'
  | 'below-start'
  | 'below-end'
  | 'before'
  | 'before-top'
  | 'before-bottom'
  | 'after'
  | 'after-top'
  | 'after-bottom'

export interface VfkTooltipProps {
  /** 提示文字，未传 #content 插槽时生效 */
  text?: string
  /** 触发元素的 id，不传时自动为默认插槽的第一个元素生成并注入 id */
  anchor?: string
  /** 提示相对锚点的方位 */
  positioning?: TooltipPositioning
  /** 悬停显示延迟，单位毫秒，聚焦时立即显示 */
  delay?: number
}
