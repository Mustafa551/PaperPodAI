import type { Control } from 'react-hook-form';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface ISVGProps {
  fill?: string;
  height?: number;
  width?: number;
}

export interface IExtraStyle {
  container?: ViewStyle;
  error?: TextStyle;
  iconCont?: ViewStyle;
  textInput?: TextStyle;
  label?: TextStyle;
}

export interface IAppInputProps extends TextInputProps {
  animated?: boolean;
  autoFocus?: boolean;
  control: Control<T>;
  editable?: boolean;
  error?: string;
  extraStyle?: IExtraStyle;
  iconOpacity?: number;
  isName?: boolean;
  isOpacity?: boolean;
  keyboardType?:
    | 'decimal-pad'
    | 'default'
    | 'email-address'
    | 'number-pad'
    | 'numeric'
    | 'phone-pad'
    | 'url';
  letter?: number;
  maxLetter?: number;
  mH?: boolean;
  multiline?: boolean;
  name: string;
  numberOfLines?: number;
  onChangeText?: (text: string) => void;
  onPressCont?: () => void;
  onPressIcon?: () => void;
  placeholder: string;
  placeholder?: string;
  placeholderColor?: string;
  rightIconActive?: boolean;
  secureTextEntry?: boolean;
  SVGLeft?: React.ReactElement;
  SVGRight?: React.ReactElement;
  value?: string;
  label?: string;
}
