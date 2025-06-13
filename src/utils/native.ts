/* eslint-disable import/no-extraneous-dependencies */
import NetInfo from '@react-native-community/netinfo';
import { Alert, Dimensions, Linking, Platform } from 'react-native';
import { openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';

import { pixelSizeX } from './sizes';

export const { bottom: BOTTOM, top: TOP } = initialWindowMetrics?.insets ?? {
  bottom: 0,
  top: 0,
};

export const HORIZON_SPACE = pixelSizeX(20);

export const checkConnectivity = () => {
  return new Promise((resolve) => {
    NetInfo.fetch().then((state: any) => {
      resolve(state.isConnected);
    });
  });
};

export const platformiOS = (iOS: unknown, android: unknown) => {
  if (Platform.OS === 'ios') {
    return iOS;
  }
  return android;
};

export const isIphoneX = (): boolean => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926 ||
      dimen.height === 932 ||
      dimen.width === 932 ||
      dimen.height === 852 ||
      dimen.width === 852)
  );
};

export const Toast = (text: string, delay = true, top = false) => {
  if (top) {
    SimpleToast.showWithGravity(text, SimpleToast.SHORT, SimpleToast.TOP);
  } else if (delay) {
    setTimeout(() => {
      SimpleToast.show(text, SimpleToast.SHORT);
    }, 800);
  } else {
    SimpleToast.show(text, SimpleToast.SHORT);
  }
};

export const BOTT_SPACE = platformiOS(isIphoneX() ? 30 : 30, 30);

export const openURL = (url: string) => {
  Linking.openURL(url);
};

export const cameraPermission = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
});
export const location_Permission = Platform.select({
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
});

export const showPermissionAlert = (res: any, type: any) => {
  if (res.status === RESULTS.BLOCKED || res.status === RESULTS.UNAVAILABLE) {
    Alert.alert('Alert', `Please provide permission to use ${type}`, [
      {
        onPress: () => {},
        text: 'Cancel',
      },
      { onPress: () => openSettings(), text: 'Open settings' },
    ]);
    return;
  }
  Alert.alert(`Please provide permission to use ${type}`);
};
