import type { InjectionKey } from 'vue'

export interface MenuContext {
  /** 菜单列表浮层展开或收起时通知父级 VfkMenu */
  notifyOpenChange: (open: boolean, event: Event) => void
}

export interface MenuListContext {
  /** 菜单项被选中或触发时通知父级 VfkMenuList */
  notifySelect: (value: string | undefined, event: Event) => void
}

/** VfkMenu 向 VfkMenuList 同步浮层开关事件的注入键 */
export const MENU_CONTEXT_KEY: InjectionKey<MenuContext> = Symbol('vfk-menu-context')

/** VfkMenuList 收集子级 VfkMenuItem 触发事件的注入键 */
export const MENU_LIST_CONTEXT_KEY: InjectionKey<MenuListContext> = Symbol('vfk-menu-list-context')
