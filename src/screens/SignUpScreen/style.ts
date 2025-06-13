import { StyleSheet } from 'react-native';

import { pixelSizeY } from '@/utils/sizes';

const useStyles = () => {
  return StyleSheet.create({
    continueWithCont: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: pixelSizeY(30),
    },
  });
};

export default useStyles;
