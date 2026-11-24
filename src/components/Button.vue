<script setup lang="ts">
import { computed } from 'vue'

type Appearance = 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent'
type Shape = 'rounded' | 'circular' | 'square'
type Size = 'small' | 'medium' | 'large'
type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    appearance?: Appearance
    shape?: Shape
    size?: Size
    disabled?: boolean
    disabledFocusable?: boolean
    type?: ButtonType
  }>(),
  {
    appearance: 'secondary',
    shape: 'rounded',
    size: 'medium',
    disabled: false,
    disabledFocusable: false,
    type: 'button',
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isDisabled = computed(() => props.disabled || props.disabledFocusable)

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    class="vfk-button"
    :class="[
      `vfk-button--${appearance}`,
      `vfk-button--${shape}`,
      `vfk-button--${size}`,
      { 'vfk-button--icon-only': !$slots.default && !!$slots.icon },
    ]"
    :type="type"
    :disabled="disabled && !disabledFocusable"
    :aria-disabled="disabledFocusable ? 'true' : undefined"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="vfk-button__icon"><slot name="icon" /></span>
    <slot />
  </button>
</template>

<style>
.vfk-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacingHorizontalS);
  min-width: 96px;
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  background: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
  font-family: var(--fontFamilyBase);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background var(--durationFaster) var(--curveEasyEase),
    border-color var(--durationFaster) var(--curveEasyEase),
    color var(--durationFaster) var(--curveEasyEase);
}

.vfk-button--small {
  min-height: 24px;
  padding: 3px var(--spacingHorizontalS);
  font-size: var(--fontSizeBase200);
  font-weight: var(--fontWeightRegular);
  line-height: var(--lineHeightBase200);
}

.vfk-button--medium {
  min-height: 32px;
  padding: 5px var(--spacingHorizontalM);
  font-size: var(--fontSizeBase300);
  font-weight: var(--fontWeightSemibold);
  line-height: var(--lineHeightBase300);
}

.vfk-button--large {
  min-height: 40px;
  padding: 8px var(--spacingHorizontalL);
  font-size: var(--fontSizeBase400);
  font-weight: var(--fontWeightSemibold);
  line-height: var(--lineHeightBase400);
}

.vfk-button--rounded { border-radius: var(--borderRadiusMedium); }
.vfk-button--circular { border-radius: var(--borderRadiusCircular); }
.vfk-button--square { border-radius: var(--borderRadiusNone); }

.vfk-button--primary {
  border-color: transparent;
  background: var(--colorBrandBackground);
  color: var(--colorNeutralForegroundOnBrand);
}

.vfk-button--outline { background: var(--colorTransparentBackground); }

.vfk-button--subtle {
  border-color: transparent;
  background: var(--colorSubtleBackground);
  color: var(--colorNeutralForeground2);
}

.vfk-button--transparent {
  border-color: transparent;
  background: transparent;
  color: var(--colorNeutralForeground2);
}

.vfk-button:not(:disabled):not([aria-disabled='true']):hover { background: var(--colorNeutralBackground1Hover); }
.vfk-button--primary:not(:disabled):not([aria-disabled='true']):hover { background: var(--colorBrandBackgroundHover); }
.vfk-button--outline:not(:disabled):not([aria-disabled='true']):hover { background: var(--colorTransparentBackgroundHover); }
.vfk-button--subtle:not(:disabled):not([aria-disabled='true']):hover { background: var(--colorSubtleBackgroundHover); }
.vfk-button--transparent:not(:disabled):not([aria-disabled='true']):hover {
  background: transparent;
  color: var(--colorNeutralForeground2BrandHover);
}

.vfk-button:not(:disabled):not([aria-disabled='true']):active { background: var(--colorNeutralBackground1Pressed); }
.vfk-button--primary:not(:disabled):not([aria-disabled='true']):active { background: var(--colorBrandBackgroundPressed); }
.vfk-button--outline:not(:disabled):not([aria-disabled='true']):active { background: var(--colorTransparentBackgroundPressed); }
.vfk-button--subtle:not(:disabled):not([aria-disabled='true']):active { background: var(--colorSubtleBackgroundPressed); }
.vfk-button--transparent:not(:disabled):not([aria-disabled='true']):active {
  background: transparent;
  color: var(--colorNeutralForeground2BrandPressed);
}

.vfk-button:focus-visible {
  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);
  outline-offset: 1px;
}

.vfk-button--icon-only { min-width: 0; padding-right: var(--spacingHorizontalS); padding-left: var(--spacingHorizontalS); }
.vfk-button--icon-only.vfk-button--small { width: 24px; padding-right: 0; padding-left: 0; }
.vfk-button--icon-only.vfk-button--medium { width: 32px; padding-right: 0; padding-left: 0; }
.vfk-button--icon-only.vfk-button--large { width: 40px; padding-right: 0; padding-left: 0; }

.vfk-button__icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.vfk-button--large .vfk-button__icon { width: 24px; height: 24px; }

.vfk-button:disabled,
.vfk-button[aria-disabled='true'] {
  border-color: var(--colorNeutralStrokeDisabled);
  background: var(--colorNeutralBackgroundDisabled);
  color: var(--colorNeutralForegroundDisabled);
  cursor: not-allowed;
}

.vfk-button--primary:disabled,
.vfk-button--primary[aria-disabled='true'] {
  border-color: transparent;
  background: var(--colorNeutralBackgroundDisabled);
  color: var(--colorNeutralForegroundDisabled);
}

.vfk-button--subtle:disabled,
.vfk-button--subtle[aria-disabled='true'],
.vfk-button--transparent:disabled,
.vfk-button--transparent[aria-disabled='true'] {
  border-color: transparent;
  background: transparent;
}

@media (forced-colors: active) {
  .vfk-button { border-color: ButtonText; }
  .vfk-button:focus-visible { outline-color: Highlight; }
  .vfk-button:disabled,
  .vfk-button[aria-disabled='true'] { border-color: GrayText; color: GrayText; }
  .vfk-button--primary:not(:disabled):not([aria-disabled='true']) {
    background: Highlight;
    color: HighlightText;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vfk-button { transition-duration: 0.01ms; }
}
</style>
