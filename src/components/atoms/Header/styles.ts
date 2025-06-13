import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

import { platformiOS } from '@/utils/native';
import { HEIGHT, normalizeHeight } from '@/utils/sizes';

interface IStyle {
  leftIconCont: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  rightIconCont: ImageStyle;
  rightCont: ViewStyle;
}

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create<IStyle>({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
    },

    leftIconCont: {
      alignItems: 'center',
      borderRadius: 100,
      height: 50,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      top: 0,
      width: 50,
    },

    rightCont: {
      alignItems: 'center',
      height: 50,
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
    },

    rightIconCont: {
      backgroundColor: colors.grayGreenLight,
      borderRadius: 25,
      height: 50,
      width: 50,
    },

    title: {
      left: 50,
      position: 'absolute',
      right: 50,
      textAlign: 'center',
    },
  });
};
