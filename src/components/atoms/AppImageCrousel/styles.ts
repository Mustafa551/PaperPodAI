import type { ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import { normalizeHeight, pixelSizeX, pixelSizeY, WIDTH } from '@/utils/sizes';

export interface IStyle {
  dotAnimation: ViewStyle;
  dotContainer: ViewStyle;
  footerContainer: ViewStyle;
  mainContainer: ViewStyle;
}

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create<IStyle>({
    dotAnimation: {
      borderRadius: 50,
      height: normalizeHeight(4),
      marginHorizontal: 2,
    },

    dotContainer: {
      flexDirection: 'row',
      width: '100%',
    },
    footerContainer: {
      alignSelf: 'center',
      bottom: pixelSizeY(10),
      position: 'absolute',
    },

    mainContainer: {},
  });
};
