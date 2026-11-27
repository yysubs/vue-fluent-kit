import type { ComputedRef, InjectionKey } from 'vue'

export interface SelectContext {
  /** 父级 VfkSelect 的受控选中值 */
  modelValue: ComputedRef<string | undefined>
}

/** 用于 VfkSelect 向子级 VfkOption 同步选中状态的注入键 */
export const SELECT_CONTEXT_KEY: InjectionKey<SelectContext> = Symbol('vfk-select-context')
