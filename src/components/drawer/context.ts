import type { InjectionKey } from 'vue'

export interface DrawerContext {
  /** 由 VfkDrawerBody 注册标题 DOM id，供外层抽屉生成 aria-labelledby */
  setTitleId: (id: string | undefined) => void
}

/** 用于 VfkDrawer 向子级 VfkDrawerBody 共享标题关联的注入键 */
export const DRAWER_CONTEXT_KEY: InjectionKey<DrawerContext> = Symbol('vfk-drawer-context')
