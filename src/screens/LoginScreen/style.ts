import { StyleSheet } from 'react-native';

import { pixelSizeY } from '@/utils/sizes';

const useStyles = () => {
  return StyleSheet.create({
    continueWithCont: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: pixelSizeY(20),
      marginTop: pixelSizeY(50),
    },
  });
};

export default useStyles;
