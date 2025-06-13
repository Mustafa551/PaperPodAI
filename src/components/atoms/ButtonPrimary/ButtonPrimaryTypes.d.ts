 type Variant = 'filled' | 'outlined';
 type IconPosition = 'left' | 'right';

export interface IButtonPrimaryProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  width?: number;
  height?: number;
  loading?: boolean;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconPosition?: IconPosition;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  disabledColor?: string; // New prop for dynamic disabled color
}
