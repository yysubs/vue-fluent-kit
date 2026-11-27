<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch, type StyleValue } from 'vue'

type InputAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter'
type InputSize = 'small' | 'medium' | 'large'
type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'number'
  | 'time'
  | 'week'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** 当前输入值，用于 v-model 双向绑定 */
    modelValue?: string
    /** 输入框视觉外观 */
    appearance?: InputAppearance
    /** 输入框尺寸 */
    size?: InputSize
    /** 是否禁用 */
    disabled?: boolean
    /** 原生文本输入类型 */
    type?: InputType
  }>(),
  {
    appearance: 'outline',
    size: 'medium',
    disabled: false,
    type: 'text',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

defineSlots<{
  /** 输入框前缀内容 */
  contentBefore?: () => unknown
  /** 输入框后缀内容 */
  contentAfter?: () => unknown
}>()

const attrs = useAttrs()
const inputRef = ref<HTMLInputElement | null>(null)

const isInvalid = computed(() => `${attrs['aria-invalid']}` === 'true')

const rootStyle = computed(() => attrs.style as StyleValue)

const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return props.modelValue !== undefined ? { ...rest, value: props.modelValue } : rest
})

/** 父组件未更新受控值时，将原生输入框的值还原为受控值 */
function syncControlledValue() {
  if (props.modelValue !== undefined && inputRef.value && inputRef.value.value !== props.modelValue) {
    inputRef.value.value = props.modelValue
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && inputRef.value && inputRef.value.value !== val) {
      inputRef.value.value = val
    }
  },
)

function handleInput(event: Event) {
  if (props.disabled) {
    syncControlledValue()
    return
  }
  emit('update:modelValue', (event.target as HTMLInputElement).value)
  void nextTick(syncControlledValue)
}

function handleChange() {
  void nextTick(syncControlledValue)
}

defineExpose({
  input: inputRef,
  focus: () => {
    inputRef.value?.focus()
  },
  blur: () => {
    inputRef.value?.blur()
  },
  select: () => {
    inputRef.value?.select()
  },
})
</script>

<template>
  <span
    class="vfk-input"
    :class="[
      `vfk-input--${appearance}`,
      `vfk-input--${size}`,
      {
        'vfk-input--disabled': disabled,
        'vfk-input--invalid': isInvalid && !disabled,
        'vfk-input--with-before': !!$slots.contentBefore,
        'vfk-input--with-after': !!$slots.contentAfter,
      },
      attrs.class,
    ]"
    :style="rootStyle"
  >
    <span v-if="$slots.contentBefore" class="vfk-input__content-before">
      <slot name="contentBefore" />
    </span>
    <input
      ref="inputRef"
      v-bind="inputAttrs"
      class="vfk-input__input"
      :type="type"
      :disabled="disabled"
      @input="handleInput"
      @change="handleChange"
    />
    <span v-if="$slots.contentAfter" class="vfk-input__content-after">
      <slot name="contentAfter" />
    </span>
  </span>
</template>

<style>
.vfk-input {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  vertical-align: middle;
  border-radius: var(--borderRadiusMedium);
  font-family: var(--fontFamilyBase);
  font-weight: var(--fontWeightRegular);
}

.vfk-input--small {
  min-height: 24px;
  gap: var(--spacingHorizontalXXS);
  font-size: var(--fontSizeBase200);
  line-height: var(--lineHeightBase200);
}

.vfk-input--medium {
  min-height: 32px;
  gap: var(--spacingHorizontalXXS);
  font-size: var(--fontSizeBase300);
  line-height: var(--lineHeightBase300);
}

.vfk-input--large {
  min-height: 40px;
  gap: var(--spacingHorizontalSNudge);
  font-size: var(--fontSizeBase400);
  line-height: var(--lineHeightBase400);
}

.vfk-input__input {
  box-sizing: border-box;
  flex-grow: 1;
  min-width: 0;
  align-self: stretch;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--colorNeutralForeground1);
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.vfk-input__input::placeholder {
  color: var(--colorNeutralForeground4);
  opacity: 1;
}

.vfk-input--small .vfk-input__input {
  padding-right: var(--spacingHorizontalS);
  padding-left: var(--spacingHorizontalS);
}

.vfk-input--medium .vfk-input__input {
  padding-right: var(--spacingHorizontalM);
  padding-left: var(--spacingHorizontalM);
}

.vfk-input--large .vfk-input__input {
  padding-right: calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));
  padding-left: calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));
}

.vfk-input--small.vfk-input--with-before {
  padding-left: var(--spacingHorizontalSNudge);
}

.vfk-input--small.vfk-input--with-before .vfk-input__input {
  padding-left: var(--spacingHorizontalXXS);
}

.vfk-input--medium.vfk-input--with-before {
  padding-left: var(--spacingHorizontalMNudge);
}

.vfk-input--medium.vfk-input--with-before .vfk-input__input {
  padding-left: var(--spacingHorizontalXXS);
}

.vfk-input--large.vfk-input--with-before {
  padding-left: var(--spacingHorizontalM);
}

.vfk-input--large.vfk-input--with-before .vfk-input__input {
  padding-left: var(--spacingHorizontalSNudge);
}

.vfk-input--small.vfk-input--with-after {
  padding-right: var(--spacingHorizontalSNudge);
}

.vfk-input--small.vfk-input--with-after .vfk-input__input {
  padding-right: var(--spacingHorizontalXXS);
}

.vfk-input--medium.vfk-input--with-after {
  padding-right: var(--spacingHorizontalMNudge);
}

.vfk-input--medium.vfk-input--with-after .vfk-input__input {
  padding-right: var(--spacingHorizontalXXS);
}

.vfk-input--large.vfk-input--with-after {
  padding-right: var(--spacingHorizontalM);
}

.vfk-input--large.vfk-input--with-after .vfk-input__input {
  padding-right: var(--spacingHorizontalSNudge);
}

.vfk-input__content-before,
.vfk-input__content-after {
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: var(--colorNeutralForeground3);
}

.vfk-input--small .vfk-input__content-before > svg,
.vfk-input--small .vfk-input__content-after > svg {
  width: 16px;
  height: 16px;
  font-size: 16px;
}

.vfk-input--medium .vfk-input__content-before > svg,
.vfk-input--medium .vfk-input__content-after > svg {
  width: 20px;
  height: 20px;
  font-size: 20px;
}

.vfk-input--large .vfk-input__content-before > svg,
.vfk-input--large .vfk-input__content-after > svg {
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.vfk-input--outline {
  background-color: var(--colorNeutralBackground1);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-bottom-color: var(--colorNeutralStrokeAccessible);
}

.vfk-input--outline:not(.vfk-input--disabled):hover {
  border-color: var(--colorNeutralStroke1Hover);
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);
}

.vfk-input--outline:not(.vfk-input--disabled):active,
.vfk-input--outline:not(.vfk-input--disabled):focus-within {
  border-color: var(--colorNeutralStroke1Pressed);
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);
}

.vfk-input--underline {
  background-color: var(--colorTransparentBackground);
  border-radius: var(--borderRadiusNone);
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);
}

.vfk-input--underline:not(.vfk-input--disabled):hover {
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);
}

.vfk-input--underline:not(.vfk-input--disabled):active,
.vfk-input--underline:not(.vfk-input--disabled):focus-within {
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);
}

.vfk-input--filled-darker {
  background-color: var(--colorNeutralBackground3);
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);
}

.vfk-input--filled-darker:not(.vfk-input--disabled):hover,
.vfk-input--filled-darker:not(.vfk-input--disabled):focus-within {
  border-color: var(--colorTransparentStrokeInteractive);
}

.vfk-input--filled-lighter {
  background-color: var(--colorNeutralBackground1);
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);
}

.vfk-input--filled-lighter:not(.vfk-input--disabled):hover,
.vfk-input--filled-lighter:not(.vfk-input--disabled):focus-within {
  border-color: var(--colorTransparentStrokeInteractive);
}

.vfk-input--invalid:not(.vfk-input--disabled):not(:focus-within),
.vfk-input--invalid:not(.vfk-input--disabled):hover:not(:focus-within) {
  border-color: var(--colorPaletteRedBorder2);
}

.vfk-input--underline.vfk-input--invalid:not(.vfk-input--disabled):not(:focus-within),
.vfk-input--underline.vfk-input--invalid:not(.vfk-input--disabled):hover:not(:focus-within) {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-color: var(--colorPaletteRedBorder2);
}

.vfk-input:not(.vfk-input--disabled):focus-within {
  outline: var(--strokeWidthThick) solid transparent;
}

.vfk-input::after {
  box-sizing: border-box;
  content: '';
  position: absolute;
  right: -1px;
  bottom: -1px;
  left: -1px;
  height: max(var(--strokeWidthThick), var(--borderRadiusMedium));
  border-bottom: var(--strokeWidthThick) solid var(--colorCompoundBrandStroke);
  border-bottom-right-radius: var(--borderRadiusMedium);
  border-bottom-left-radius: var(--borderRadiusMedium);
  clip-path: inset(calc(100% - var(--strokeWidthThick)) 0 0 0);
  transform: scaleX(0);
  transition: transform var(--durationUltraFast) var(--curveAccelerateMid);
  pointer-events: none;
}

.vfk-input--underline::after {
  right: 0;
  left: 0;
  border-bottom-right-radius: var(--borderRadiusNone);
  border-bottom-left-radius: var(--borderRadiusNone);
}

.vfk-input:not(.vfk-input--disabled):focus-within::after {
  transform: scaleX(1);
  transition: transform var(--durationNormal) var(--curveDecelerateMid);
}

.vfk-input:not(.vfk-input--disabled):focus-within:active::after {
  border-bottom-color: var(--colorCompoundBrandStrokePressed);
}

.vfk-input--disabled {
  background-color: var(--colorTransparentBackground);
  border-color: var(--colorNeutralStrokeDisabled);
  cursor: not-allowed;
}

.vfk-input--underline.vfk-input--disabled {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-color: var(--colorNeutralStrokeDisabled);
}

.vfk-input--disabled::after {
  content: none;
}

.vfk-input--disabled .vfk-input__input,
.vfk-input__input:disabled {
  color: var(--colorNeutralForegroundDisabled);
  cursor: not-allowed;
}

.vfk-input--disabled .vfk-input__input::placeholder,
.vfk-input__input:disabled::placeholder {
  color: var(--colorNeutralForegroundDisabled);
}

.vfk-input--disabled .vfk-input__content-before,
.vfk-input--disabled .vfk-input__content-after {
  color: var(--colorNeutralForegroundDisabled);
}

@media (forced-colors: active) {
  .vfk-input:not(.vfk-input--disabled),
  .vfk-input:not(.vfk-input--disabled):hover,
  .vfk-input:not(.vfk-input--disabled):active,
  .vfk-input:not(.vfk-input--disabled):focus-within {
    border-color: ButtonText;
  }

  .vfk-input--underline:not(.vfk-input--disabled),
  .vfk-input--underline:not(.vfk-input--disabled):hover,
  .vfk-input--underline:not(.vfk-input--disabled):active,
  .vfk-input--underline:not(.vfk-input--disabled):focus-within {
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom-color: ButtonText;
  }

  .vfk-input:not(.vfk-input--disabled):focus-within::after {
    border-bottom-color: Highlight;
  }

  .vfk-input--invalid:not(.vfk-input--disabled):not(:focus-within),
  .vfk-input--invalid:not(.vfk-input--disabled):hover:not(:focus-within) {
    border-color: Highlight;
  }

  .vfk-input--underline.vfk-input--invalid:not(.vfk-input--disabled):not(:focus-within),
  .vfk-input--underline.vfk-input--invalid:not(.vfk-input--disabled):hover:not(:focus-within) {
    border-bottom-color: Highlight;
  }

  .vfk-input--disabled {
    border-color: GrayText;
  }

  .vfk-input--underline.vfk-input--disabled {
    border-bottom-color: GrayText;
  }

  .vfk-input--disabled .vfk-input__input,
  .vfk-input__input:disabled,
  .vfk-input--disabled .vfk-input__input::placeholder,
  .vfk-input__input:disabled::placeholder,
  .vfk-input--disabled .vfk-input__content-before,
  .vfk-input--disabled .vfk-input__content-after {
    color: GrayText;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vfk-input::after,
  .vfk-input:not(.vfk-input--disabled):focus-within::after {
    transition-duration: 0.01ms;
  }
}
</style>
