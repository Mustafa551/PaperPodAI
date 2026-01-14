import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { pixelSizeX } from '@/utils/sizes';

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    carouselItemContainer: {
      flex: 1,
      paddingHorizontal: pixelSizeX(5),
    },
    crouselImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },

    dotContainer: {
      gap: 5,
      marginBottom: 5,
      position: 'absolute',
      bottom:10,
      left: pixelSizeX(20),
    },
    gradientCard: {
      flex: 1,
      borderRadius: 16,
  
    },
    exploreButton: {
      backgroundColor: '#8A2BE1',
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 25,
      alignSelf: 'flex-start',
      alignItems:'center'     ,
      marginTop:12
    },
    gradientContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      paddingTop:20
    },
    gradientTextContainer: {
      flex: 0.95,     
      paddingHorizontal:17,
      justifyContent: 'flex-start',
    },
    megaphoneImage: {
      width: 140,
      height: 140,
      position: 'absolute',
      right: 0,
      bottom :0
    },
  });
};

export default useStyles;
