import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { pixelSizeX } from '@/utils/sizes';

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    crouselImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      paddingHorizontal: pixelSizeX(5),
    },

    dotContainer: {
      gap: 5,
      marginBottom: 5,
      position: 'absolute',
      bottom: 0,
      left: pixelSizeX(20),
    },
  });
};

export default useStyles;
