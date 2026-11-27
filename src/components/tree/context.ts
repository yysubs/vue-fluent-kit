import type { ComputedRef, InjectionKey } from 'vue'
import type { TreeAppearance, TreeSize } from './types'

export interface TreeContext {
  /** 父级树受控选中值 */
  modelValue: ComputedRef<string | undefined>
  /** 父级树外观 */
  appearance: ComputedRef<TreeAppearance>
  /** 父级树尺寸 */
  size: ComputedRef<TreeSize>
  /** 子节点被选中时通知父级树 */
  selectValue: (value: string, event: Event) => void
  /** 子节点展开态变化时通知父级树 */
  notifyToggle: (value: string | undefined, expanded: boolean, event: Event) => void
}

/** 用于 VfkTree 向各级 VfkTreeItem 同步受控选中态、外观与尺寸的注入键 */
export const TREE_CONTEXT_KEY: InjectionKey<TreeContext> = Symbol('vfk-tree-context')
