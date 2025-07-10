import type { ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import { HEIGHT, pixelSizeX, pixelSizeY, WIDTH } from '@/utils/sizes';

interface IStyle {
  container: ViewStyle;
  iconCont: ViewStyle;
  subContainer: ViewStyle;
}

export const useStyle = () => {
  const { colors, layout } = useTheme();

  return StyleSheet.create<IStyle>({
    container: {
      alignItems: 'center',
      backgroundColor: colors.transparent,
      flex: 1,
      justifyContent: 'flex-end',
      width: '100%',
    },

    iconCont: {
      backgroundColor: colors.white,
      borderRadius: 100,
      padding: 5,
      position: 'absolute',
      right: -10,
      top: -10,
      zIndex: 999,
      ...layout.shadow,
    },

    subContainer: {
      // alignItems: 'center',
      // backgroundColor: colors.background,
      borderRadius: 30,
      maxHeight: HEIGHT * 0.9,
      paddingHorizontal: pixelSizeX(30),
      paddingVertical: pixelSizeY(20),
      width: WIDTH * 0.95,
      borderWidth: 1,
      borderColor: colors.primary,
      marginBottom: pixelSizeY(HEIGHT * 0.1)
    },
  });
};
