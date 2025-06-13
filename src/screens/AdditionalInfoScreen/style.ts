import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import { normalizeHeight, normalizeWidth, pixelSizeY } from '@/utils/sizes';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    porfileImg: {
      width: normalizeWidth(120),
      height: normalizeWidth(120),
      borderRadius: 60,
      backgroundColor: colors.inputFields,
    },

    imgCont: {
      borderStyle: 'dashed',
      borderCurve: 'circular',
      borderWidth: 1,
      height: normalizeHeight(140),
      width: '100%',
      borderRadius: 10,
      borderColor: colors.darkStroke,
      backgroundColor: colors.inputFields,
      marginBottom: pixelSizeY(10),
    },

    img: {
      height: normalizeHeight(140),
      width: 'auto',
      borderRadius: 10,
    },
  });
};
