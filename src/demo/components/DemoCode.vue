<script setup lang="ts">
import { ref } from 'vue'
import { useDemoI18n } from '../i18n'
import DemoIcons from './DemoIcons.vue'

const props = withDefaults(
  defineProps<{
    /** 代码内容 */
    code: string
    /** 代码栏标题或语言标识 */
    label?: string
  }>(),
  {
    label: 'Vue Template',
  },
)

const { messages } = useDemoI18n()
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = props.code
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copied.value = true
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <div class="demo-code">
    <div class="demo-code__bar">
      <span>{{ label }}</span>
      <button type="button" class="demo-code__copy" @click="copyCode">
        <DemoIcons :name="copied ? 'check' : 'copy'" :size="13" />
        <span>{{ copied ? messages.common.copied : messages.common.copy }}</span>
      </button>
    </div>
    <pre class="demo-code__pre"><code>{{ code }}</code></pre>
  </div>
</template>
