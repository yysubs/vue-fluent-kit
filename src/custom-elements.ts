/** 判断标签名是否为 @fluentui/web-components 的自定义元素，用于 Vite compilerOptions.isCustomElement */
export function isFluentCustomElement(tag: string): boolean {
  return tag.startsWith('fluent-')
}
