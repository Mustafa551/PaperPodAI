import type { FontFamily, Typography } from './StyleTypes';
import type { Theme } from './ThemeTypes';
import type { FlexAlignType, StyleProp, TextStyle } from 'react-native/types';

import { FONTS_FAMILY } from '@/theme/fonts';

export interface IAppTextProps extends TextStyle {
  alignSelf?: FlexAlignType;
  children?: React.ReactNode;
  color?: string;
  ellipsizeMode?: 'clip' | 'head' | 'middle' | 'tail';
  extraStyle?: StyleProp<TextStyle>;
  fontSize?: number;
  gradient?: boolean;
  numberOfLines?: number;
  onPress?: () => void;
  theme?: Theme;
  title: string;
  translation?: boolean;
  variant?: unknown;
  fontFamily?: keyof typeof FONTS_FAMILY;
  // variant: Typography;
}
