import type {
  FlexAlignType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native/types';

export interface ISVGProps {
  fill?: string;
  height?: number;
  width?: number;
}

interface IExtraStyle {
  container?: StyleProp<ViewStyle>;
  subContainer?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
}

export interface IIconProps {
  activeOpacity?: number;
  alignSelf?: FlexAlignType;
  color?: string;
  disabled?: boolean;
  extraStyle?: IExtraStyle;
  iconLeft?: boolean;
  mB?: number;
  mL?: number;
  mR?: number;
  numberOfLines?: number;
  onPress?: () => void;
  SVGIcon: null | React.ComponentElement;
  title?: number | string;
  variant?: Typography;
  fontSize?: number;
}
