/** 抽屉呈现类型，对齐官方 fluent-drawer type */
export type DrawerType = 'modal' | 'non-modal' | 'inline'

/** 抽屉滑出位置，对齐官方 fluent-drawer position */
export type DrawerPosition = 'start' | 'end'

/** 抽屉预设宽度，对齐官方 fluent-drawer size */
export type DrawerSize = 'small' | 'medium' | 'large' | 'full'

export interface VfkDrawerProps {
  /** 打开状态，用于 v-model 双向绑定 */
  modelValue?: boolean
  /** 呈现类型：遮罩浮层、无遮罩浮层或内嵌在文档流中 */
  type?: DrawerType
  /** 滑出位置 */
  position?: DrawerPosition
  /** 预设宽度 */
  size?: DrawerSize
  /** 自定义宽度，优先于 size，映射到官方 --drawer-width */
  width?: string
  /** 外部标题元素的 id，未传时自动关联 VfkDrawerBody 的标题 */
  ariaLabelledby?: string
  /** 外部描述元素的 id */
  ariaDescribedby?: string
}

export interface VfkDrawerBodyProps {
  /** 标题文案，未传 #title 插槽时生效 */
  title?: string
  /** 是否在标题右侧渲染内置关闭按钮 */
  closable?: boolean
  /** 关闭按钮的无障碍名称 */
  closeLabel?: string
}
