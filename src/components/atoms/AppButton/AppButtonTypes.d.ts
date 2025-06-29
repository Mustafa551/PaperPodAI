import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ButtonVariant = 'gradient' | 'outlined';

export interface IAppButtonProps {
  bgColor?: string;
  contViewStyle?: ViewStyle;
  disabled?: boolean;
  extraStyle?: { button?: StyleProp<ViewStyle>; title?: StyleProp<TextStyle> };
  fontVariant?: string;
  height?: number;
  loading?: boolean;
  onPress: () => void;
  outlinedColor?: string;
  shadow?: boolean;
  SVGLeft?: null | React.ComponentElement;
  SVGRight?: null | React.ComponentElement;
  title: string;
  variant?: ButtonVariant;
  width?: number | string;
  googleBtn?: boolean;
 
}
