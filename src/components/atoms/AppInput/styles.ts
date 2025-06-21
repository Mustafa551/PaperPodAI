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
      color:'#F5F5F5',
      flex: 1,
      // paddingHorizontal: 16,
      // paddingVertical: 12,
      width: '100%',
      // ...TYPOGRAPHY['h1-openSans-regular'],
      height: '100%',
      zIndex: 999,
      ...FONTS_FAMILY.medium,
      // backgroundColor: 'red',

    },

    textInputCont: {
      // backgroundColor: colors.inputFields,
            borderColor:'#F5F5F5',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: pixelSizeX(10),
      // paddingVertical: 13,
      // marginHorizontal: pixelSizeX(16),
   
      // width: '95%',
    },
  });
};
