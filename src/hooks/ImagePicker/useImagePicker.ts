// import type {
//   CameraOptions,
//   ImageLibraryOptions,
// } from 'react-native-image-picker';

// import { Platform } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { PERMISSIONS, RESULTS } from 'react-native-permissions';

// import { cameraPermission, showPermissionAlert } from '@/utils/native';

// import { usePermission } from '../permission/usePermission';

// export const useImagePicker = () => {
//   const { getPermissionStatus } = usePermission(cameraPermission);
//   const { getPermissionStatus: checkIosLibraryPermission } = usePermission(
//     PERMISSIONS.IOS.PHOTO_LIBRARY,
//   );

//   const getCompImageArr = async (assets: any[]) => {
//     return await Promise.all(
//       assets.map(async (item) => {
//         const result = item.uri;
//         return {
//           name: result.split('/').pop(),
//           type: item.type,
//           uri: result,
//         };
//       }),
//     );
//   };

//   const onCamera = async (): Promise<any> => {
//     const options = {
//       cameraType: 'back',
//       includeExtra: true,
//       maxHeight: 1040,
//       maxWidth: 1040,
//       mediaType: 'photo',
//     };

//     let result = '';

//     try {
//       const permRes = await getPermissionStatus();
//       if (permRes.status !== RESULTS.GRANTED) {
//         showPermissionAlert(permRes, 'Camera');
//         return result;
//       }

//       const res = await launchCamera(options as CameraOptions);

//       if (res.assets) {
//         result = res.assets[0].uri || '';
//         return {
//           name: result.split('/').pop(),
//           type: 'image/jpeg',
//           uri: result,
//         };
//       }
//       return result;
//     } catch (error) {
//       console.debug('error =====> ', error);
//       return null;
//     }
//   };

//   const onGallery = async (
//     setImageLoading: React.Dispatch<React.SetStateAction<boolean>>,
//     multiSelection = false,
//   ): Promise<unknown> => {
//     const options = {
//       maxHeight: 1040,
//       maxWidth: 1040,
//       mediaType: 'photo',
//       selectionLimit: multiSelection ? 0 : 1,
//     };

//     const result = null;

//     try {
//       if (Platform.OS === 'ios') {
//         const res = await checkIosLibraryPermission();
//         if (res.status !== RESULTS.GRANTED && res.status !== RESULTS.LIMITED) {
//           showPermissionAlert(res, 'Library');
//           return result;
//         }
//       }
//       setImageLoading(true);
//       const res = await launchImageLibrary(options as ImageLibraryOptions);
//       setImageLoading(false);
//       if (res.assets) {
//         return await getCompImageArr(res.assets);
//       }
//       return result;
//     } catch (error) {
//       console.debug('error =====> ', error);
//       return null;
//     }
//   };

//   return {
//     onCamera,
//     onGallery,
//   };
// };

import { useTranslation } from 'react-i18next';
import {
  ActionSheetIOS,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

interface onPressUploadType {
  callBck: (data: ImagePickerResponse) => void;
}

export const useImagePicker = () => {
  // hooks

  const { t } = useTranslation();
  /*
   ** for uploading video
   */

  /**
   * Handles video upload process by launching camera or image library.
   * @param {object} param - The parameters.
   * @param {function} param.callBck - Callback function to handle the response.
   */
  const onPressVideoUpload = ({ callBck }: onPressUploadType): void => {
    // Define camera options for video
    const options: CameraOptions = {
      mediaType: 'video',
      includeExtra: true,
      durationLimit: 5,
      videoQuality: 'medium',
      formatAsMp4: true,
    };

    if (Platform.OS === 'ios') {
      // Show action sheet for iOS
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t('common_labels.cancel'),
            t('common_labels.uploadVideo'),
            t('common_labels.chooseFromLibrary'),
          ],
          cancelButtonIndex: 0,
          userInterfaceStyle: 'light',
        },
        async (btnInd) => {
          if (btnInd === 0) {
            // Cancel action
            return;
          } else if (btnInd === 1) {
            // Launch camera and handle response
            let camResponse = await launchCamera(options);
            console.debug('camResponse is:', camResponse);
            if (camResponse.assets && camResponse.assets[0].fileSize) {
              // Check video size
              if (camResponse.assets[0].fileSize > 50000000) {
                Toast.show(t('common_labels.videoLength'), Toast.LONG);
              } else {
                callBck(camResponse);
              }
            }
          } else if (btnInd === 2) {
            // Launch image library and handle response
            let ImageLibResponse = await launchImageLibrary(options);
            if (
              ImageLibResponse.assets &&
              ImageLibResponse.assets[0].fileSize
            ) {
              // Check video size
              if (ImageLibResponse.assets[0].fileSize > 50000000) {
                Toast.show(t('common_labels.videoLength'), Toast.LONG);
              } else {
                callBck(ImageLibResponse);
              }
            } else if (ImageLibResponse.errorCode) {
              Toast.show(t('common_labels.unableToUpload'), Toast.LONG);
            }
          }
        },
      );
    }

    if (Platform.OS === 'android') {
      // Show alert dialog for Android
      Alert.alert(
        t('common_labels.uploadVideo'),
        t('common_labels.chooseFromLibrary'),
        [
          {
            text: t('common_labels.videoCamera'),
            onPress: async () => {
              // Check and request camera permission for Android
              let androidPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
              );
              console.debug('android permission', androidPermission);
              if (androidPermission === 'granted') {
                // Launch camera and handle response
                let camResponse = await launchCamera(options);
                console.debug('camResponse is:', camResponse);
                if (camResponse.assets && camResponse.assets[0].fileSize) {
                  if (camResponse.assets[0].fileSize > 50000000) {
                    Toast.show(t('common_labels.videoLength'), Toast.LONG);
                  } else {
                    callBck(camResponse);
                  }
                } else if (camResponse.errorCode) {
                  Toast.show(t('common_labels.unableToUpload'), Toast.LONG);
                }
              } else if (androidPermission === 'never_ask_again') {
                Toast.show('Permission required', Toast.LONG);
              }
            },
            style: 'cancel',
          },
          {
            text: t('common_labels.chooseFromLibrary'),
            onPress: async () => {
              // Launch image library and handle response
              let ImageLibResponse = await launchImageLibrary(options);
              console.log('ImageLibResponse is:', ImageLibResponse);
              if (
                ImageLibResponse.assets &&
                ImageLibResponse.assets[0].fileSize
              ) {
                if (ImageLibResponse.assets[0].fileSize > 50000000) {
                  Toast.show(t('common_labels.videoLength'), Toast.LONG);
                } else {
                  callBck(ImageLibResponse);
                }
              } else if (ImageLibResponse.errorCode) {
                Toast.show(t('common_labels.unableToUpload'), Toast.LONG);
              }
            },
            style: 'cancel',
          },
          {
            text: t('common_labels.cancel'),
            onPress: () => console.log('onPress cancel'),
            style: 'cancel',
          },
        ],
      );
    }
  };

  /**
   * for uploading image
   * @param {object} param - The parameters.
   * @param {function} param.callBck - Callback function to handle the response.
   */
  const onPressImageUpload = ({ callBck }: onPressUploadType): void => {
    let options: ImageLibraryOptions = {
      // specify the type of media to be selected
      mediaType: 'photo',
      // include extra data in the response
      includeExtra: true,
      // set the maximum height and width of the image
      maxHeight: 1024,
      maxWidth: 1024,
      // set the selection limit to 1
      selectionLimit: 1,
    };

    if (Platform.OS === 'ios') {
      // show action sheet for iOS
      ActionSheetIOS.showActionSheetWithOptions(
        {
          // define the options for the action sheet
          options: [
            t('common_labels.cancel'), // cancel button
            t('common_labels.takePhoto'), // take photo button
            t('common_labels.chooseFromLibrary'), // choose from library button
          ],
          // define the cancel button index
          cancelButtonIndex: 0,
          // define the user interface style
          userInterfaceStyle: 'light',
        },
        // handle the button index
        async (btnInd) => {
          // handle the cancel button
          if (btnInd === 0) {
            // cancel
            return;
          }
          // handle the take photo button
          else if (btnInd === 1) {
            try {
              // launch the camera
              let camResponse = await launchCamera(options);
              console.debug('camResponse is:', camResponse);
              // handle the response
              if (camResponse.assets) {
                // call the callback function
                callBck(camResponse);
                return;
              } else if (camResponse.errorCode) {
                // show a toast message
                Toast.show('Unable to upload try again later', Toast.LONG);
                return;
              }
            } catch (error) {
              console.debug('🚀 ~ error:', error);
            }
          }
          // handle the choose from library button
          else if (btnInd === 2) {
            // launch the image library
            let ImageLibResponse = await launchImageLibrary(options);
            console.log('ImageLibResponse is:', ImageLibResponse);
            // handle the response
            if (ImageLibResponse.assets) {
              // call the callback function
              callBck(ImageLibResponse);
              return;
            } else if (ImageLibResponse.errorCode) {
              // show a toast message
              Toast.show(t('common_labels.unableToUpload'), Toast.LONG);
              return;
            }
          }
        },
      );
    }

    if (Platform.OS === 'android') {
      // show an alert dialog for Android
      Alert.alert(
        // define the title of the alert dialog
        t('common_labels.uploadProfile'),
        // define the message of the alert dialog
        t('common_labels.chooseFromLibrary'),
        [
          // define the camera button
          {
            // define the text of the button
            text: t('common_labels.camera'),
            // handle the button press
            onPress: async () => {
              // checking for platform
              // requesting permission
              let androidPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
              );
              console.debug('android permission', androidPermission);

              // permission is granted
              if (androidPermission === 'granted') {
                // launch the camera
                let camResponse = await launchCamera(options);
                console.debug('camResponse is:', camResponse);
                // handle the response
                if (camResponse.assets) {
                  // call the callback function
                  callBck(camResponse);
                  return;
                } else if (camResponse.errorCode) {
                  // show a toast message
                  Toast.show(t('common_labels.unableToUpload'), Toast.LONG);
                  return;
                }
              } else if (androidPermission === 'never_ask_again') {
                // show a toast message
                Toast.show('Permission required', Toast.LONG);
              }
            },
            // define the style of the button
            style: 'cancel',
          },
          // define the gallery button
          {
            // define the text of the button
            text: t('common_labels.gallery'),
            // handle the button press
            onPress: async () => {
              // launch the image library
              let ImageLibResponse = await launchImageLibrary(options);
              console.log('ImageLibResponse is:', ImageLibResponse);
              // handle the response
              if (ImageLibResponse.assets) {
                // call the callback function
                callBck(ImageLibResponse);
              } else if (ImageLibResponse.errorCode) {
                // show a toast message
                Toast.show(t('common_labels.unableToUpload'), Toast.LONG);
                return;
              }
            },
            // define the style of the button
            style: 'cancel',
          },
          // define the cancel button
          {
            // define the text of the button
            text: t('common_labels.cancel'),
            // handle the button press
            onPress: () => console.log('onPress cancel'),
            // define the style of the button
            style: 'cancel',
          },
        ],
      );
    }
  };

  return { onPressVideoUpload, onPressImageUpload };
};
