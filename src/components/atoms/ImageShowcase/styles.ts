import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import { normalizeHeight, pixelSizeX } from '@/utils/sizes';

export interface IStyle {
  glassImageCover: ViewStyle;
  imageStyle: ImageStyle;
}

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create<IStyle>({
    glassImageCover: {
      alignItems: 'center',
      backgroundColor: colors.glassBlack,
      borderRadius: 10,
      bottom: 0,
      height: normalizeHeight(150),
      justifyContent: 'center',
      marginVertical: 2,
      position: 'absolute',
      right: 0,
      width: '49%',
      zIndex: 1,
    },

    imageStyle: {
      borderRadius: 10,
      height: normalizeHeight(150),
      marginVertical: 2,
      width: '49%',
    },
  });
};
