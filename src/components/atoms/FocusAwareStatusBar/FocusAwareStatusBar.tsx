import type { StatusBarStyle } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from '@/theme';

interface FocusAwareStatusBarType {
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
}

export default function FocusAwareStatusBar(
  props: FocusAwareStatusBarType,
): JSX.Element | null {
  const { navigationTheme } = useTheme();
  /*
   ** Props
   */
  const { backgroundColor = '', barStyle = 'default' } = props;
  /*
   ** Hooks
   */
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  return isFocused ? (
    <StatusBar
      backgroundColor={backgroundColor ? backgroundColor : colors.background}
      barStyle={navigationTheme.dark ? 'light-content' : 'dark-content'}
    />
  ) : null;
}
