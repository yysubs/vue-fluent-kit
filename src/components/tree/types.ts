/** 树节点视觉外观，对齐官方 fluent-tree / fluent-tree-item appearance */
export type TreeAppearance = 'subtle' | 'subtle-alpha' | 'transparent'

/** 树节点尺寸，对齐官方 fluent-tree / fluent-tree-item size */
export type TreeSize = 'small' | 'medium'

/** 树节点展开或收起事件负载 */
export interface TreeToggleDetail {
  /** 节点 value（未传时为 undefined） */
  value?: string
  /** 切换后的展开状态 */
  expanded: boolean
}

export interface VfkTreeProps {
  /** 当前选中节点的 value，用于 v-model 双向绑定 */
  modelValue?: string
  /** 节点外观变体，会统一下发到所有子节点 */
  appearance?: TreeAppearance
  /** 节点尺寸，会统一下发到所有子节点 */
  size?: TreeSize
}

export interface VfkTreeItemProps {
  /** 节点唯一标识，与 VfkTree 的 v-model 对应 */
  value?: string
  /** 节点文案，可单独使用或与嵌套 VfkTreeItem 搭配 */
  label?: string
  /** 是否展开子节点（支持 v-model:expanded，也可仅传初始 expanded 由用户切换） */
  expanded?: boolean
  /** 单独控制选中态（未受父级 VfkTree v-model 托管时生效） */
  selected?: boolean
  /** 是否允许点击后选中该节点；设为 false 时仅展开/收起，适合分组节点 */
  selectable?: boolean
  /** 局部覆盖外观变体 */
  appearance?: TreeAppearance
  /** 局部覆盖尺寸 */
  size?: TreeSize
}
