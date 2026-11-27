<script lang="ts">
import '@fluentui/web-components/tooltip.js'
import {
  cloneVNode,
  defineComponent,
  Fragment,
  h,
  ref,
  useId,
  type PropType,
  type VNode,
} from 'vue'
import type { TooltipPositioning, VfkTooltipProps } from './types'

/** 给触发元素注入锚点 id，返回处理后的节点与被工具提示引用的 id */
function injectAnchorId(
  vnodes: VNode[],
  generatedId: string,
): { nodes: VNode[]; anchorId: string } {
  let anchorId = generatedId
  let assigned = false

  const walk = (nodes: VNode[]): VNode[] =>
    nodes.map((vnode) => {
      if (vnode.type === Fragment && Array.isArray(vnode.children)) {
        return h(Fragment, null, walk(vnode.children as VNode[]))
      }
      if (assigned || typeof vnode.type === 'symbol') {
        return vnode
      }
      assigned = true
      const existing = vnode.props?.id
      if (typeof existing === 'string' && existing.length > 0) {
        anchorId = existing
        return vnode
      }
      return cloneVNode(vnode, { id: generatedId })
    })

  return { nodes: walk(vnodes), anchorId }
}

/**
 * 需要同时渲染触发元素与提示元素并共享锚点 id，因此在渲染函数里组织输出，不使用 SFC 模板。
 */
export default defineComponent({
  name: 'VfkTooltip',
  inheritAttrs: false,
  props: {
    /** 提示文字，未传 #content 插槽时生效 */
    text: { type: String, default: undefined },
    /** 触发元素的 id，不传时自动为默认插槽的第一个元素生成并注入 id */
    anchor: { type: String, default: undefined },
    /** 提示相对锚点的方位 */
    positioning: {
      type: String as PropType<TooltipPositioning>,
      default: 'above' as TooltipPositioning,
    },
    /** 悬停显示延迟，单位毫秒，聚焦时立即显示 */
    delay: { type: Number, default: undefined },
  },
  setup(props: VfkTooltipProps, { slots, attrs, expose }) {
    const generatedId = useId()
    const el = ref<HTMLElement | null>(null)

    expose({ el })

    return () => {
      const triggerNodes = slots.default?.() ?? []
      let nodes = triggerNodes
      let anchorId = props.anchor

      if (!anchorId) {
        const result = injectAnchorId(triggerNodes, generatedId)
        nodes = result.nodes
        anchorId = result.anchorId
      }

      return [
        ...nodes,
        h(
          'fluent-tooltip',
          {
            ...attrs,
            ref: el,
            // 官方元素的 anchor / positioning / delay 只从属性读取，不反射，渲染函数里用 ^ 前缀强制写属性
            '^anchor': anchorId,
            '^positioning': props.positioning,
            '^delay': props.delay,
          },
          slots.content ? slots.content() : props.text,
        ),
      ]
    }
  },
})
</script>
