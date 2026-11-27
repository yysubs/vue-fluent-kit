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
  VfkBadge,
  type BadgeAppearance,
  type BadgeColor,
  type BadgeShape,
  type BadgeSize,
  type VfkBadgeProps,
} from './components/badge'

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
  VfkCombobox,
  type ComboboxAppearance,
  type ComboboxSize,
  type VfkComboboxProps,
} from './components/combobox'

export {
  VfkDialog,
  VfkDialogBody,
  type DialogType,
  type VfkDialogBodyProps,
  type VfkDialogProps,
} from './components/dialog'

export {
  VfkDrawer,
  VfkDrawerBody,
  type DrawerPosition,
  type DrawerSize,
  type DrawerType,
  type VfkDrawerBodyProps,
  type VfkDrawerProps,
} from './components/drawer'

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
  VfkColorSwatch,
  VfkSwatchPicker,
  type SwatchPickerLayout,
  type SwatchPickerShape,
  type SwatchPickerSize,
  type SwatchPickerSpacing,
  type VfkColorSwatchProps,
  type VfkSwatchPickerProps,
} from './components/swatch-picker'

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
  VfkTextarea,
  type TextareaAppearance,
  type TextareaResize,
  type TextareaSize,
  type VfkTextareaProps,
} from './components/textarea'

export {
  VfkToggleButton,
  type ToggleButtonValue,
  type VfkToggleButtonProps,
} from './components/toggle-button'

export {
  VfkTooltip,
  type TooltipPositioning,
  type VfkTooltipProps,
} from './components/tooltip'

export {
  VfkTree,
  VfkTreeItem,
  type TreeAppearance,
  type TreeSize,
  type TreeToggleDetail,
  type VfkTreeItemProps,
  type VfkTreeProps,
} from './components/tree'
