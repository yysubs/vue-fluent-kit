<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, ref, useAttrs, watch } from 'vue'
import type { StyleValue } from 'vue'

defineOptions({ inheritAttrs: false })

type SelectAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter'
type SelectSize = 'small' | 'medium' | 'large'

const props = withDefaults(
  defineProps<{
    /** 当前选中值，用于 v-model 双向绑定 */
    modelValue?: string
    /** 下拉框视觉外观 */
    appearance?: SelectAppearance
    /** 下拉框尺寸 */
    size?: SelectSize
    /** 是否禁用 */
    disabled?: boolean
  }>(),
  {
    appearance: 'outline',
    size: 'medium',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()
const selectRef = ref<HTMLSelectElement | null>(null)

const isInvalid = computed(() => `${attrs['aria-invalid']}` === 'true')

const selectAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return props.modelValue !== undefined ? { ...rest, value: props.modelValue } : rest
})

/** 在受控模式下把原生 select 的值同步回 modelValue，防止父组件未更新时界面偏离受控状态 */
function syncSelectValue() {
  if (props.modelValue !== undefined && selectRef.value && selectRef.value.value !== props.modelValue) {
    selectRef.value.value = props.modelValue
  }
}

function handleChange(event: Event) {
  if (props.disabled) {
    syncSelectValue()
    return
  }

  emit('update:modelValue', (event.target as HTMLSelectElement).value)
  void nextTick(syncSelectValue)
}

onMounted(syncSelectValue)
onUpdated(syncSelectValue)
watch(() => props.modelValue, syncSelectValue)

defineExpose({
  select: selectRef,
  focus: () => selectRef.value?.focus(),
  blur: () => selectRef.value?.blur(),
})
</script>

<template>
  <span
    class="vfk-select"
    :class="[
      `vfk-select--${appearance}`,
      `vfk-select--${size}`,
      {
        'vfk-select--disabled': disabled,
        'vfk-select--invalid': isInvalid && !disabled,
      },
      attrs.class,
    ]"
    :style="(attrs.style as StyleValue)"
  >
    <select
      ref="selectRef"
      v-bind="selectAttrs"
      class="vfk-select__select"
      :disabled="disabled"
      @change="handleChange"
    >
      <slot />
    </select>
    <span class="vfk-select__icon">
      <slot name="icon">
        <svg
          aria-hidden="true"
          fill="currentColor"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0"
            fill="currentColor"
          />
        </svg>
      </slot>
    </span>
  </span>
</template>

<style>
.vfk-select {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  vertical-align: middle;
  font-family: var(--fontFamilyBase);
}

.vfk-select::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: max(var(--strokeWidthThick), var(--borderRadiusMedium));
  border-bottom: var(--strokeWidthThick) solid var(--colorCompoundBrandStroke);
  border-bottom-right-radius: var(--borderRadiusMedium);
  border-bottom-left-radius: var(--borderRadiusMedium);
  clip-path: inset(calc(100% - var(--strokeWidthThick)) 0 0 0);
  pointer-events: none;
  transform: scaleX(0);
  transition: transform var(--durationUltraFast) var(--curveAccelerateMid);
}

.vfk-select--underline::after {
  border-bottom-right-radius: var(--borderRadiusNone);
  border-bottom-left-radius: var(--borderRadiusNone);
}

.vfk-select:focus-within::after {
  transform: scaleX(1);
  transition: transform var(--durationNormal) var(--curveDecelerateMid);
}

.vfk-select:focus-within:active::after {
  border-bottom-color: var(--colorCompoundBrandStrokePressed);
}

.vfk-select--disabled::after {
  content: none;
}

.vfk-select__select {
  appearance: none;
  box-sizing: border-box;
  flex-grow: 1;
  min-width: 0;
  max-width: 100%;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-bottom-color: var(--colorNeutralStrokeAccessible);
  border-radius: var(--borderRadiusMedium);
  background-color: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
  font-family: var(--fontFamilyBase);
  font-weight: var(--fontWeightRegular);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.vfk-select__select:focus {
  outline: var(--strokeWidthThick) solid transparent;
}

.vfk-select__select option,
.vfk-select__select optgroup {
  background-color: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
}

.vfk-select--small .vfk-select__select {
  height: 24px;
  padding-right: calc(
    var(--spacingHorizontalSNudge) + 16px + var(--spacingHorizontalXXS) + var(--spacingHorizontalXXS)
  );
  padding-left: calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));
  font-size: var(--fontSizeBase200);
  line-height: var(--lineHeightBase200);
}

.vfk-select--medium .vfk-select__select {
  height: 32px;
  padding-right: calc(
    var(--spacingHorizontalMNudge) + 20px + var(--spacingHorizontalXXS) + var(--spacingHorizontalXXS)
  );
  padding-left: calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS));
  font-size: var(--fontSizeBase300);
  line-height: var(--lineHeightBase300);
}

.vfk-select--large .vfk-select__select {
  height: 40px;
  padding-right: calc(
    var(--spacingHorizontalM) + 24px + var(--spacingHorizontalSNudge) + var(--spacingHorizontalSNudge)
  );
  padding-left: calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));
  font-size: var(--fontSizeBase400);
  line-height: var(--lineHeightBase400);
}

.vfk-select--outline .vfk-select__select {
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-bottom-color: var(--colorNeutralStrokeAccessible);
  background-color: var(--colorNeutralBackground1);
}

.vfk-select--outline:not(.vfk-select--disabled) .vfk-select__select:hover {
  border-color: var(--colorNeutralStroke1Hover);
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);
}

.vfk-select--outline:not(.vfk-select--disabled) .vfk-select__select:active,
.vfk-select--outline:not(.vfk-select--disabled):focus-within .vfk-select__select {
  border-color: var(--colorNeutralStroke1Pressed);
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);
}

.vfk-select--underline .vfk-select__select {
  border-top: none;
  border-right: none;
  border-bottom: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);
  border-left: none;
  border-radius: var(--borderRadiusNone);
  background-color: var(--colorTransparentBackground);
}

.vfk-select--underline:not(.vfk-select--disabled) .vfk-select__select:hover {
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);
}

.vfk-select--underline:not(.vfk-select--disabled) .vfk-select__select:active,
.vfk-select--underline:not(.vfk-select--disabled):focus-within .vfk-select__select {
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);
}

.vfk-select--filled-darker .vfk-select__select {
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);
  background-color: var(--colorNeutralBackground3);
}

.vfk-select--filled-darker:not(.vfk-select--disabled) .vfk-select__select:hover,
.vfk-select--filled-darker:not(.vfk-select--disabled):focus-within .vfk-select__select {
  border-color: var(--colorTransparentStrokeInteractive);
}

.vfk-select--filled-lighter .vfk-select__select {
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);
  background-color: var(--colorNeutralBackground1);
}

.vfk-select--filled-lighter:not(.vfk-select--disabled) .vfk-select__select:hover,
.vfk-select--filled-lighter:not(.vfk-select--disabled):focus-within .vfk-select__select {
  border-color: var(--colorTransparentStrokeInteractive);
}

.vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select,
.vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select:hover {
  border-color: var(--colorPaletteRedBorder2);
}

.vfk-select--underline.vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select,
.vfk-select--underline.vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select:hover {
  border-top: none;
  border-right: none;
  border-bottom-color: var(--colorPaletteRedBorder2);
  border-left: none;
}

.vfk-select--disabled .vfk-select__select,
.vfk-select__select:disabled {
  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);
  background-color: var(--colorTransparentBackground);
  color: var(--colorNeutralForegroundDisabled);
  cursor: not-allowed;
}

.vfk-select--underline.vfk-select--disabled .vfk-select__select,
.vfk-select--underline .vfk-select__select:disabled {
  border-top: none;
  border-right: none;
  border-bottom: var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);
  border-left: none;
}

.vfk-select__icon {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  color: var(--colorNeutralStrokeAccessible);
  pointer-events: none;
}

.vfk-select__icon > svg {
  display: block;
  width: 1em;
  height: 1em;
}

.vfk-select--small .vfk-select__icon {
  right: var(--spacingHorizontalSNudge);
  width: 16px;
  height: 16px;
  font-size: 16px;
}

.vfk-select--medium .vfk-select__icon {
  right: var(--spacingHorizontalMNudge);
  width: 20px;
  height: 20px;
  font-size: 20px;
}

.vfk-select--large .vfk-select__icon {
  right: var(--spacingHorizontalM);
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.vfk-select--disabled .vfk-select__icon {
  color: var(--colorNeutralForegroundDisabled);
}

@media (forced-colors: active) {
  .vfk-select:not(.vfk-select--disabled) .vfk-select__select {
    border-color: ButtonText;
  }

  .vfk-select--underline:not(.vfk-select--disabled) .vfk-select__select {
    border-top: none;
    border-right: none;
    border-bottom-color: ButtonText;
    border-left: none;
  }

  .vfk-select:focus-within::after,
  .vfk-select:focus-within:active::after {
    border-bottom-color: Highlight;
  }

  .vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select,
  .vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select:hover {
    border-color: Highlight;
  }

  .vfk-select--underline.vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select,
  .vfk-select--underline.vfk-select--invalid:not(.vfk-select--disabled):not(:focus-within) .vfk-select__select:hover {
    border-top: none;
    border-right: none;
    border-bottom-color: Highlight;
    border-left: none;
  }

  .vfk-select--disabled .vfk-select__select,
  .vfk-select__select:disabled {
    border-color: GrayText;
    color: GrayText;
  }

  .vfk-select--underline.vfk-select--disabled .vfk-select__select,
  .vfk-select--underline .vfk-select__select:disabled {
    border-top: none;
    border-right: none;
    border-bottom-color: GrayText;
    border-left: none;
  }

  .vfk-select--disabled .vfk-select__icon {
    color: GrayText;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vfk-select::after,
  .vfk-select:focus-within::after {
    transition-duration: 0.01ms;
  }
}
</style>
