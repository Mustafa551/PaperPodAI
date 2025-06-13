import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    headerStyle: {
      alignItems: 'center',

      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      width: '100%',
    },
  });
};
