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