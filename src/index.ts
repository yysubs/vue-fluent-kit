declare const __VFK_VERSION__: string

export const version: string = __VFK_VERSION__

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
  VfkCheckbox,
  type CheckboxLabelPosition,
  type CheckboxShape,
  type CheckboxSize,
  type CheckboxValue,
  type VfkCheckboxProps,
} from './components/checkbox'

export {
  VfkField,
  type FieldOrientation,
  type FieldSize,
  type FieldValidationState,
  type VfkFieldProps,
} from './components/field'

export {
  VfkInput,
  type InputAppearance,
  type InputSize,
  type InputType,
  type VfkInputProps,
} from './components/input'

export {
  VfkMenu,
  VfkMenuButton,
  VfkMenuDivider,
  VfkMenuItem,
  VfkMenuList,
  type MenuItemRole,
  type VfkMenuButtonProps,
  type VfkMenuItemProps,
  type VfkMenuProps,
} from './components/menu'

export {
  VfkRadio,
  VfkRadioGroup,
  type RadioGroupOrientation,
  type VfkRadioGroupProps,
  type VfkRadioProps,
} from './components/radio'

export {
  VfkSearchBox,
  type SearchBoxAppearance,
  type SearchBoxSize,
  type VfkSearchBoxProps,
} from './components/search-box'

export {
  VfkOption,
  VfkSelect,
  type SelectAppearance,
  type SelectSize,
  type VfkOptionProps,
  type VfkSelectProps,
} from './components/select'

export {
  VfkSwitch,
  type SwitchLabelPosition,
  type VfkSwitchProps,
} from './components/switch'

export {
  VfkTab,
  VfkTabList,
  type TabAppearance,
  type TabOrientation,
  type TabSize,
  type VfkTabListProps,
  type VfkTabProps,
} from './components/tabs'

export {
  VfkToggleButton,
  type ToggleButtonValue,
  type VfkToggleButtonProps,
} from './components/toggle-button'

export {
  VfkTree,
  VfkTreeItem,
  type TreeAppearance,
  type TreeSize,
  type TreeToggleDetail,
  type VfkTreeItemProps,
  type VfkTreeProps,
} from './components/tree'
