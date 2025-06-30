import { StyleSheet } from 'react-native';

import { pixelSizeX, pixelSizeY } from '@/utils/sizes';

const useStyles = () => {
  return StyleSheet.create({
    continueWithCont: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: pixelSizeY(30),
    },
    libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#201E23',
    borderRadius: 12  ,
    padding: 12,
    marginBottom: pixelSizeY(16),
    borderWidth: 1,
    borderColor: '#461D7A',
  },
    itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    avatarPlaceholder: {
    // width: '100%',
    // height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: pixelSizeX(8),
  },
    itemContent: {
    flex: 1,
    marginHorizontal: pixelSizeX(30),
  },
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  });
};

export default useStyles;
