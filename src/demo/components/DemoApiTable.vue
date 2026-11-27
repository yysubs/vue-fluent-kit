<script setup lang="ts">
export interface ApiRow {
  /** 属性、事件、插槽或方法名称 */
  name: string
  /** 类型签名 */
  type: string
  /** 默认值 */
  defaultValue?: string
  /** 说明 */
  description: string
}

withDefaults(
  defineProps<{
    /** 表格列头第一列标题 */
    kindLabel?: string
    /** API 条目列表 */
    rows: ApiRow[]
    /** 是否显示默认值列 */
    showDefault?: boolean
  }>(),
  {
    kindLabel: '属性',
    showDefault: true,
  },
)
</script>

<template>
  <div class="demo-api-wrap">
    <div class="demo-api-scroll">
      <table class="demo-api-table">
        <thead>
          <tr>
            <th>{{ kindLabel }}</th>
            <th>类型</th>
            <th v-if="showDefault">默认值</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <td><code class="demo-api-name">{{ row.name }}</code></td>
            <td><code class="demo-api-type">{{ row.type }}</code></td>
            <td v-if="showDefault">
              <code class="demo-api-default">{{ row.defaultValue ?? '—' }}</code>
            </td>
            <td>{{ row.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
