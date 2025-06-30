
import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';



export const useStyle = () => {
  const { colors, layout } = useTheme();

  return StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    borderRadius: 16,
    borderWidth:1,
    borderColor: colors.primary,
    padding: pixelSizeX(10),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: colors.darkShade,
    marginBottom: pixelSizeY(20)

  },

  imageStyle:{ width: normalizeWidth(90), height: normalizeHeight(110), borderRadius: 12 }
  });
};
