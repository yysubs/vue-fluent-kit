import type { InjectionKey } from 'vue'

export interface DialogContext {
  /** 由 VfkDialogBody 注册标题 DOM id，供外层对话框生成 aria-labelledby */
  setTitleId: (id: string | undefined) => void
}

/** 用于 VfkDialog 向子级 VfkDialogBody 共享标题关联的注入键 */
export const DIALOG_CONTEXT_KEY: InjectionKey<DialogContext> = Symbol('vfk-dialog-context')
