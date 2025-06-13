import type { TextStyle, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { FONTS_FAMILY } from '@/theme/fonts';

import { pixelSizeX } from '@/utils/sizes';

export interface IStyle {
  iconCont: ViewStyle;
  iconContLeft: ViewStyle;
  textInput: TextStyle;
  textInputCont: ViewStyle;
}

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create<IStyle>({
    iconCont: {
      alignItems: 'center',
      // height: '100%',
      justifyContent: 'center',
      // width: 40,
    },

    iconContLeft: {
      // borderRightColor: colors.purple500,
      // borderRightWidth: 1,
      // borderStyle: 'solid',
      // marginRight: pixelSizeX(18),
      // overflow: 'hidden',
      paddingRight: pixelSizeX(10),
    },

    textInput: {
      color: colors.black,
      flex: 1,
      padding: 0,
      width: '100%',
      // ...TYPOGRAPHY['h1-openSans-regular'],
      height: '100%',
      zIndex: 999,
      ...FONTS_FAMILY.medium,
      // backgroundColor: 'red',
    },

    textInputCont: {
      backgroundColor: colors.inputFields,
      // borderColor: colors.lightStroke,
      borderRadius: 8,
      // borderWidth: 1,
      paddingHorizontal: pixelSizeX(20),
      // paddingVertical: 13,
      width: '100%',
    },
  });
};
