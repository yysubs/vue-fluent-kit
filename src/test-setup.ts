/* 为 jsdom 补齐 ElementInternals 缺失的标准方法，仅供 Vitest 测试环境使用 */
if (typeof HTMLElement !== 'undefined' && typeof HTMLElement.prototype.attachInternals === 'function') {
  const originalAttachInternals = HTMLElement.prototype.attachInternals
  HTMLElement.prototype.attachInternals = function attachInternalsPatched() {
    const internals = originalAttachInternals.call(this) as ElementInternals & {
      setFormValue?: (...args: unknown[]) => void
      setValidity?: (...args: unknown[]) => void
      states?: Set<string>
    }
    if (typeof internals.setFormValue !== 'function') {
      internals.setFormValue = () => {}
    }
    if (typeof internals.setValidity !== 'function') {
      internals.setValidity = () => {}
    }
    if (!internals.states) {
      internals.states = new Set<string>()
    }
    return internals
  }
}
