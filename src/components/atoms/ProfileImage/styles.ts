import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import { WP } from '@/utils/responsive';

export interface IStyle {
  imageStyle: ImageStyle;
  iconContainer: ViewStyle;
  iconColor: TextStyle;
}

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create<IStyle>({
    imageStyle: {
      height: WP('30'),
      width: WP('30'),
      borderRadius: 100,
    },
    iconContainer: {
      backgroundColor: colors.black,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      opacity: 0.5,
    },
    iconColor: {
      color: colors.white,
    },
  });
};
