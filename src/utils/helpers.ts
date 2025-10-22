import RNFS from 'react-native-fs';
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');

  if (!localPart || !domain) return email; // Return original email if invalid format

  const visiblePart = localPart.slice(0, 4); // Show first 4 characters
  const maskedPart = '*'.repeat(localPart.length - 4); // Mask remaining characters

  return `${visiblePart}${maskedPart}@${domain}`;
};



// src/utils/auth.ts
// src/utils/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform, PermissionsAndroid } from 'react-native';

export const saveAuthData = async (accessToken: string, refreshToken: string, user: any) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('Auth data saved successfully');
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Retrieved access token:', token ? 'Present' : 'Null');
    return token;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    console.log('Retrieved refresh token:', token ? 'Present' : 'Null');
    return token;
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

export const getUser = async (): Promise<any | null> => {
  try {
    const user = await AsyncStorage.getItem('user');
    console.log('Retrieved user:', user ? JSON.parse(user) : 'Null');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
    console.log('Auth data cleared successfully');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

export const saveTokensFromHeaders = async (headers: any) => {
  try {
    console.log('Response headers:', headers);
    const accessToken = headers['x-access-token'] || headers['access-token'];
    const refreshToken = headers['x-refresh-token'] || headers['refresh-token'];
    if (accessToken && refreshToken) {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      console.log('New tokens saved from headers:', { accessToken, refreshToken });
      return { accessToken, refreshToken };
    }
    console.log('No new tokens found in headers');
    return null;
  } catch (error) {
    console.error('Error saving tokens from headers:', error);
    return null;
  }
};

export const saveAccessToken = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    console.log('Access token saved:', accessToken);
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

// Ask for the right storage/media permission before downloading audio
export const ensureAudioDownloadPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true; // iOS: saving to DocumentDirectoryPath needs no extra permission

  try {
    const sdkInt = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);

    if (sdkInt >= 33) {
      // Android 13+ (Tiramisu): granular media permissions
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        {
          title: 'Audio Access Permission',
          message: 'We need access to your audio files to save downloads to your device.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    // Android 12 and below: external storage permissions
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    const allGranted = Object.values(result).every(v => v === PermissionsAndroid.RESULTS.GRANTED);
    return allGranted;
  } catch (e) {
    console.warn('Permission check failed:', e);
    return false;
  }
};

export const downloadAudio = async (url: string) => {
  console.log('🚀 ~ downloadAudio ~ url:', url);

  try {
    // Ensure we have the right permission before writing to public storage
    const hasPermission = await ensureAudioDownloadPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please allow access so we can save audio to your device.');
      return;
    }
    const dirPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}`
        : `${RNFS.DocumentDirectoryPath}`;
    // Define the target directory and file path
    const folderPath = `${dirPath}`;
    const fileName = `audio_${Date.now()}.mp3`;
    const filePath = `${folderPath}/${fileName}`;
    // Create the SVD folder if it doesn't exist
    const folderExists = await RNFS.exists(folderPath);
    if (!folderExists) {
      await RNFS.mkdir(folderPath);
    }
    const options = {
      fromUrl: url,
      toFile: filePath,
    };
    console.log('options $$$', options);

    const result = await RNFS.downloadFile(options).promise;
    Alert.alert('Download Complete', `File downloaded to: ${filePath}`);
    console.log('🚀 ~ downloadAudio ~ result:', result);
  } catch (error) {
    console.error('Error downloading audio:', error);
    Alert.alert('Download Failed', 'An error occurred while downloading the file.');
  }
};