<script setup lang="ts">
import { useDemoI18n } from '../i18n'

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
    kindLabel: undefined,
    showDefault: true,
  },
)

const { messages } = useDemoI18n()
</script>

<template>
  <div class="demo-api-wrap">
    <div class="demo-api-scroll">
      <table class="demo-api-table">
        <thead>
          <tr>
            <th>{{ kindLabel ?? messages.common.apiKindProp }}</th>
            <th>{{ messages.common.apiType }}</th>
            <th v-if="showDefault">{{ messages.common.apiDefault }}</th>
            <th>{{ messages.common.apiDescription }}</th>
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
