import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

import { pixelSizeX } from '@/utils/sizes';

interface IStyle {
  cont: ViewStyle;
}

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create<IStyle>({
    cont: {
      borderRadius: 8,
      padding: pixelSizeX(10),
      backgroundColor: colors.whiteEdgar,
      width: '100%',
    },
  });
};
