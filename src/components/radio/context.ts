import type { ComputedRef, InjectionKey } from 'vue'

export interface RadioGroupContext {
  /** 父级单选组受控值 */
  modelValue: ComputedRef<string | undefined>
  /** 父级单选组禁用状态 */
  disabled: ComputedRef<boolean>
  /** 父级单选组表单字段名 */
  name: ComputedRef<string | undefined>
}

/** 用于 VfkRadioGroup 向子级 VfkRadio 同步选中态与禁用态的注入键 */
export const RADIO_GROUP_CONTEXT_KEY: InjectionKey<RadioGroupContext> = Symbol(
  'vfk-radio-group-context',
)
