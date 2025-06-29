import type { ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

export interface IStyle {
  button: ViewStyle;
}

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create<IStyle>({
    button: {
      alignItems: 'center',
      alignSelf: 'center',
      borderColor: colors.greenPrimary,
      borderRadius: 100,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      // paddingVertical: 10,
    },
    
  });
};
