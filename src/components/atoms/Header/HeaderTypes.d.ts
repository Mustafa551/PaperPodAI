import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IHeaderProps {
  onLeftIcon?: () => void | null;
  onRightIcon?: () => void | null;
  title?: string;
  menuBtn?: boolean;
  extraStyle?: StyleProp<ViewStyle>;
  empty?: boolean;
  rightIcon?: any;
  marginH?: boolean;
  renderLeftFunc?: () => React.ReactNode | null;
  renderRightFunc?: () => React.ReactNode | null;
  cross?: boolean;
  bar?: string;
  iconColor?: string;
  onBackPress?: () => void;
}
