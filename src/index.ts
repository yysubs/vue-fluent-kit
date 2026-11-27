export const version = '0.0.0'

export { isFluentCustomElement } from './custom-elements'
export {
  applyBrandTokens,
  resetBrandTokens,
  setVfkTheme,
  useTheme,
  VfkThemeProvider,
  type BrandVariants,
  type ResolvedTheme,
  type ThemeMode,
  type VfkThemeProviderProps,
} from './theme'

export {
  VfkButton,
  type ButtonAppearance,
  type ButtonShape,
  type ButtonSize,
  type ButtonType,
  type VfkButtonProps,
} from './components/button'

export {
  VfkToggleButton,
  type ToggleButtonValue,
  type VfkToggleButtonProps,
} from './components/toggle-button'

export {
  VfkInput,
  type InputAppearance,
  type InputSize,
  type InputType,
  type VfkInputProps,
} from './components/input'

export {
  VfkOption,
  VfkSelect,
  type SelectAppearance,
  type SelectSize,
  type VfkOptionProps,
  type VfkSelectProps,
} from './components/select'

export {
  VfkCheckbox,
  type CheckboxLabelPosition,
  type CheckboxShape,
  type CheckboxSize,
  type CheckboxValue,
  type VfkCheckboxProps,
} from './components/checkbox'

export {
  VfkSwitch,
  type SwitchLabelPosition,
  type VfkSwitchProps,
} from './components/switch'

export {
  VfkRadio,
  VfkRadioGroup,
  type RadioGroupOrientation,
  type VfkRadioGroupProps,
  type VfkRadioProps,
} from './components/radio'

export {
  VfkField,
  type FieldOrientation,
  type FieldSize,
  type FieldValidationState,
  type VfkFieldProps,
} from './components/field'
