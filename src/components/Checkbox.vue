<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs, useId, watch } from 'vue'
import type { StyleValue } from 'vue'

defineOptions({ inheritAttrs: false })

type CheckboxValue = boolean | 'mixed'
type CheckboxSize = 'medium' | 'large'
type CheckboxShape = 'square' | 'circular'
type CheckboxLabelPosition = 'after' | 'before'

const props = withDefaults(
  defineProps<{
    /** 当前勾选状态，`true` 为选中，`false` 为未选中，`'mixed'` 为半选 */
    modelValue?: CheckboxValue
    /** 指示器尺寸 */
    size?: CheckboxSize
    /** 指示器形状 */
    shape?: CheckboxShape
    /** 是否禁用 */
    disabled?: boolean
    /** 标签文本，未传默认插槽时生效 */
    label?: string
    /** 标签相对指示器的位置 */
    labelPosition?: CheckboxLabelPosition
    /** 是否必填，开启且存在标签时展示必填星号 */
    required?: boolean
    /** 原生 input 的 id，未传时自动生成以关联 label */
    id?: string
  }>(),
  {
    modelValue: false,
    size: 'medium',
    shape: 'square',
    disabled: false,
    labelPosition: 'after',
    required: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
}>()

const attrs = useAttrs()
const generatedId = useId()
const input = ref<HTMLInputElement | null>(null)

const inputId = computed(() => props.id || generatedId)
const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style as StyleValue)
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const stateClass = computed(() => {
  if (props.disabled) return 'vfk-checkbox--disabled'
  if (props.modelValue === 'mixed') return 'vfk-checkbox--mixed'
  if (props.modelValue) return 'vfk-checkbox--checked'
  return 'vfk-checkbox--unchecked'
})

/** 将原生 input 的 checked 与 indeterminate 属性同步为当前 modelValue */
function syncInputState() {
  if (!input.value) return
  input.value.checked = props.modelValue === true
  input.value.indeterminate = props.modelValue === 'mixed'
}

onMounted(syncInputState)
watch(() => props.modelValue, syncInputState, { flush: 'post' })

/** 在未挂载到文档树的测试节点上点击时补发 change 事件 */
function handleInputClick(event: MouseEvent) {
  if (props.disabled || event.defaultPrevented) return
  if (input.value && !input.value.isConnected) {
    input.value.dispatchEvent(new Event('change', { bubbles: true }))
  }
}

function handleChange(event: Event) {
  if (props.disabled) {
    syncInputState()
    return
  }

  const nextValue = props.modelValue === 'mixed' ? true : !props.modelValue
  emit('update:modelValue', nextValue)
  emit('change', event)
  syncInputState()
  nextTick(syncInputState)
}

function focus() {
  input.value?.focus()
}

function blur() {
  input.value?.blur()
}

defineExpose({
  input,
  focus,
  blur,
})
</script>

<template>
  <span
    class="vfk-checkbox"
    :class="[
      `vfk-checkbox--${size}`,
      `vfk-checkbox--${shape}`,
      `vfk-checkbox--label-${labelPosition}`,
      stateClass,
      rootClass,
    ]"
    :style="rootStyle"
  >
    <input
      ref="input"
      v-bind="inputAttrs"
      :id="inputId"
      class="vfk-checkbox__input"
      type="checkbox"
      :checked="modelValue === true"
      :disabled="disabled"
      :required="required"
      :aria-checked="modelValue === 'mixed' ? 'mixed' : undefined"
      @click="handleInputClick"
      @change="handleChange"
    />
    <label
      v-if="($slots.default || label) && labelPosition === 'before'"
      :for="inputId"
      class="vfk-checkbox__label"
    >
      <slot>{{ label }}</slot>
      <span v-if="required" aria-hidden="true" class="vfk-checkbox__required">*</span>
    </label>
    <span aria-hidden="true" class="vfk-checkbox__indicator">
      <slot name="indicator">
        <svg
          v-if="modelValue === true && size === 'medium'"
          aria-hidden="true"
          fill="currentColor"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path
            d="M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04"
          />
        </svg>
        <svg
          v-else-if="modelValue === true && size === 'large'"
          aria-hidden="true"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M14.0458 3.4856C14.3299 3.78703 14.3158 4.26169 14.0144 4.54579L6.08456 12.0197C5.74829 12.3366 5.22042 12.3269 4.89609 11.9977L2.21576 9.27737C1.92504 8.98231 1.92856 8.50745 2.22361 8.21674C2.51867 7.92602 2.99353 7.92954 3.28424 8.22459L5.51839 10.4921L12.9856 3.45421C13.287 3.17011 13.7617 3.18416 14.0458 3.4856Z"
          />
        </svg>
        <svg
          v-else-if="modelValue === 'mixed' && shape === 'circular'"
          aria-hidden="true"
          fill="currentColor"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
          />
        </svg>
        <svg
          v-else-if="modelValue === 'mixed' && size === 'medium'"
          aria-hidden="true"
          fill="currentColor"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path d="M2 4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
        </svg>
        <svg
          v-else-if="modelValue === 'mixed' && size === 'large'"
          aria-hidden="true"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 4.5C2 3.11929 3.11929 2 4.5 2H11.5C12.8807 2 14 3.11929 14 4.5V11.5C14 12.8807 12.8807 14 11.5 14H4.5C3.11929 14 2 12.8807 2 11.5V4.5Z"
          />
        </svg>
      </slot>
    </span>
    <label
      v-if="($slots.default || label) && labelPosition === 'after'"
      :for="inputId"
      class="vfk-checkbox__label"
    >
      <slot>{{ label }}</slot>
      <span v-if="required" aria-hidden="true" class="vfk-checkbox__required">*</span>
    </label>
  </span>
</template>

<style>
.vfk-checkbox {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  max-width: fit-content;
  vertical-align: middle;
  color: var(--colorNeutralForeground3);
  font-family: var(--fontFamilyBase);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color var(--durationFaster) var(--curveEasyEase);
}

.vfk-checkbox__input {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.vfk-checkbox--medium .vfk-checkbox__input {
  width: calc(16px + 2 * var(--spacingHorizontalS));
}

.vfk-checkbox--large .vfk-checkbox__input {
  width: calc(20px + 2 * var(--spacingHorizontalS));
}

.vfk-checkbox--label-before .vfk-checkbox__input {
  right: 0;
  left: auto;
}

.vfk-checkbox__input:focus,
.vfk-checkbox__input:focus-visible {
  outline: none;
}

.vfk-checkbox__indicator {
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin: var(--spacingVerticalS) var(--spacingHorizontalS);
  overflow: hidden;
  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);
  background: transparent;
  fill: currentColor;
  pointer-events: none;
  transition:
    background var(--durationFaster) var(--curveEasyEase),
    border-color var(--durationFaster) var(--curveEasyEase),
    color var(--durationFaster) var(--curveEasyEase);
}

.vfk-checkbox--medium .vfk-checkbox__indicator {
  width: 16px;
  height: 16px;
  font-size: 12px;
}

.vfk-checkbox--large .vfk-checkbox__indicator {
  width: 20px;
  height: 20px;
  font-size: 16px;
}

.vfk-checkbox--square .vfk-checkbox__indicator {
  border-radius: var(--borderRadiusSmall);
}

.vfk-checkbox--circular .vfk-checkbox__indicator {
  border-radius: var(--borderRadiusCircular);
}

.vfk-checkbox__label {
  align-self: center;
  padding: var(--spacingVerticalS) var(--spacingHorizontalS);
  color: inherit;
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  font-weight: var(--fontWeightRegular);
  line-height: var(--lineHeightBase300);
  cursor: inherit;
}

.vfk-checkbox--label-after .vfk-checkbox__label {
  padding-left: var(--spacingHorizontalXS);
}

.vfk-checkbox--label-before .vfk-checkbox__label {
  padding-right: var(--spacingHorizontalXS);
}

.vfk-checkbox--medium .vfk-checkbox__label {
  margin-top: calc((16px - var(--lineHeightBase300)) / 2);
  margin-bottom: calc((16px - var(--lineHeightBase300)) / 2);
}

.vfk-checkbox--large .vfk-checkbox__label {
  margin-top: calc((20px - var(--lineHeightBase300)) / 2);
  margin-bottom: calc((20px - var(--lineHeightBase300)) / 2);
}

.vfk-checkbox__required {
  padding-left: var(--spacingHorizontalXS);
  color: var(--colorPaletteRedForeground3);
}

.vfk-checkbox--unchecked:hover {
  color: var(--colorNeutralForeground2);
}

.vfk-checkbox--unchecked:hover .vfk-checkbox__indicator {
  border-color: var(--colorNeutralStrokeAccessibleHover);
}

.vfk-checkbox--unchecked:active {
  color: var(--colorNeutralForeground1);
}

.vfk-checkbox--unchecked:active .vfk-checkbox__indicator {
  border-color: var(--colorNeutralStrokeAccessiblePressed);
}

.vfk-checkbox--checked {
  color: var(--colorNeutralForeground1);
}

.vfk-checkbox--checked .vfk-checkbox__indicator {
  border-color: var(--colorCompoundBrandBackground);
  background: var(--colorCompoundBrandBackground);
  color: var(--colorNeutralForegroundInverted);
}

.vfk-checkbox--checked:hover .vfk-checkbox__indicator {
  border-color: var(--colorCompoundBrandBackgroundHover);
  background: var(--colorCompoundBrandBackgroundHover);
}

.vfk-checkbox--checked:active .vfk-checkbox__indicator {
  border-color: var(--colorCompoundBrandBackgroundPressed);
  background: var(--colorCompoundBrandBackgroundPressed);
}

.vfk-checkbox--mixed {
  color: var(--colorNeutralForeground1);
}

.vfk-checkbox--mixed .vfk-checkbox__indicator {
  border-color: var(--colorCompoundBrandStroke);
  background: transparent;
  color: var(--colorCompoundBrandForeground1);
}

.vfk-checkbox--mixed:hover .vfk-checkbox__indicator {
  border-color: var(--colorCompoundBrandStrokeHover);
  color: var(--colorCompoundBrandForeground1Hover);
}

.vfk-checkbox--mixed:active .vfk-checkbox__indicator {
  border-color: var(--colorCompoundBrandStrokePressed);
  color: var(--colorCompoundBrandForeground1Pressed);
}

.vfk-checkbox--disabled {
  color: var(--colorNeutralForegroundDisabled);
  cursor: not-allowed;
}

.vfk-checkbox--disabled .vfk-checkbox__indicator {
  border-color: var(--colorNeutralStrokeDisabled);
  background: transparent;
  color: var(--colorNeutralForegroundDisabled);
}

.vfk-checkbox--disabled .vfk-checkbox__required {
  color: var(--colorNeutralForegroundDisabled);
}

.vfk-checkbox:has(.vfk-checkbox__input:focus-visible) {
  border-radius: var(--borderRadiusMedium);
  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);
  outline-offset: 1px;
  box-shadow: 0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus1);
}

@media (forced-colors: active) {
  .vfk-checkbox__indicator {
    forced-color-adjust: none;
    border-color: ButtonText;
  }

  .vfk-checkbox--checked .vfk-checkbox__indicator {
    border-color: Highlight;
    background: Highlight;
    color: HighlightText;
  }

  .vfk-checkbox--mixed .vfk-checkbox__indicator {
    border-color: Highlight;
    color: Highlight;
  }

  .vfk-checkbox--disabled,
  .vfk-checkbox--disabled .vfk-checkbox__required {
    color: GrayText;
  }

  .vfk-checkbox--disabled .vfk-checkbox__indicator {
    border-color: GrayText;
    background: transparent;
    color: GrayText;
  }

  .vfk-checkbox:has(.vfk-checkbox__input:focus-visible) {
    outline-color: Highlight;
    box-shadow: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vfk-checkbox,
  .vfk-checkbox__indicator {
    transition-duration: 0.01ms;
  }
}
</style>
