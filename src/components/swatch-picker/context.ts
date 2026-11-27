import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { SwatchPickerShape, SwatchPickerSize } from './types'

export interface SwatchPickerContext {
  /** 当前选中值 */
  modelValue: ComputedRef<string | undefined>
  /** 当前可通过 Tab 键聚焦的色块值 */
  tabStopValue: Ref<string | undefined>
  size: ComputedRef<SwatchPickerSize>
  shape: ComputedRef<SwatchPickerShape>
  disabled: ComputedRef<boolean>
  /**
   * 由子级色块调用以选中自身
   * @param value 色块值
   * @param event 触发选择的点击或键盘事件
   */
  select: (value: string, event: Event) => void
}

/** 用于 VfkSwatchPicker 向子级 VfkColorSwatch 同步状态的注入键 */
export const SWATCH_PICKER_CONTEXT_KEY: InjectionKey<SwatchPickerContext> =
  Symbol('vfk-swatch-picker-context')
