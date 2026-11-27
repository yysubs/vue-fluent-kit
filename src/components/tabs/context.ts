import type { ComputedRef, InjectionKey } from 'vue'

export interface TabsContext {
  /** 当前标签栏的唯一 id 前缀，避免同页多组标签栏 id 冲突 */
  idPrefix: string
  /** 父级标签栏受控值 */
  modelValue: ComputedRef<string | undefined>
  /** 父级标签栏禁用态 */
  disabled: ComputedRef<boolean>
}

/** 用于 VfkTabList 向子级 VfkTab 共享 id 前缀、受控选中值与禁用态的注入键 */
export const TABS_CONTEXT_KEY: InjectionKey<TabsContext> = Symbol('vfk-tabs-context')
