import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Alert } from 'react-native';
import axios, { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/theme';
import { FONTS_FAMILY } from '@/theme/fonts';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Space,
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';
import useStyles from './style';
import { clearAuthData, getAccessToken, getRefreshToken, getUser, saveTokensFromHeaders } from '../../utils/helpers';
import { resetStack } from '@/navigation/navigationRef';
import { useAppStore } from '@/store';
import { signOut } from '@/store/authSlice/authApiService';

const BASE_URL = 'https://rude-vickie-3dotmedia-5ccb6d6e.koyeb.app';

const accountSettingsSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().optional(),
    email: z.string().email(t('invalid_email')).optional(),
    subscriptionStatus: z.string().optional(),
  });

type AccountSettingsForm = {
  name?: string;
  email?: string;
  subscriptionStatus?: string;
};

interface LogoutResponse {
  success: boolean;
  message?: string;
}

const AccountSetScreen: React.FC<RootScreenProps<Paths.AccountSetScreen>> = () => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation<RootScreenProps<Paths.AccountSetScreen>['navigation']>();
  const {userData} = useAppStore(state => state)
  console.log("🚀 ~ AccountSetScreen ~ userData:", userData)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<AccountSettingsForm>({
    resolver: zodResolver(accountSettingsSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      subscriptionStatus: '',
    },
  });


  useEffect(() => {

      if (userData) {
        reset({
          name: userData?.name || '',
          email: userData?.email || '',
          subscriptionStatus: userData?.subscriptionStatus || '',
        });
      }


  }, [userData]);

  
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form Validation Errors:', errors);
    }
  }, [errors]);

  // Logout API call
  const onLogout = async () => {
    console.log('Logout Button Pressed');
    // try {
    //   const accessToken = await getAccessToken();
    //   const refreshToken = await getRefreshToken();
    //   const user = await getUser();
  
    //   if (!accessToken || !refreshToken || !user?.email) {
    //     console.log('Missing auth data, clearing and redirecting');
    //     await clearAuthData();
    //     Alert.alert('Error', 'Session invalid. Please log in again.');
    //     resetStack('AuthStack', 'LoginScreen');
    //     return;
    //   }
  
    //   const response = await attemptLogout(accessToken, refreshToken, user.email, user.googleId || 'none');
  
    //   if (response?.data.success) {
    //     await clearAuthData();
    //     Alert.alert('Success', 'Logged out successfully!');
    //     resetStack('AuthStack', 'LoginScreen');
    //   } else {
    //     throw new Error(response?.data.message || 'Logout failed');
    //   }
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosError<{ message?: string }>;
    //   console.error('Logout Error:', {
    //     message: axiosError.message,
    //     response: axiosError.response?.data,
    //     status: axiosError.response?.status,
    //     headers: axiosError.response?.headers,
    //   });
  
    //   await clearAuthData();
    //   Alert.alert('Error', 'Session expired or invalid. Please log in again.');
    //   resetStack('AuthStack', 'LoginScreen');
    // }

    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false)
      resetStack('AuthStack', 'loginScreen')
    }
  };
  
  const attemptLogout = async (
    accessToken: string | null,
    refreshToken: string,
    email: string,
    googleId: string
  ) => {
    if (!accessToken) {
      console.log('No access token available for logout');
      return null;
    }
  
    try {
      console.log('Making API call to:', `${BASE_URL}/v1/user/logout`);
      return await axios.post<LogoutResponse>(
        `${BASE_URL}/v1/user/logout`,
        {
          email,
          googleId,
        },
        {
          headers: {
            'x-device-id': 'test-device-id',
            'x-user-agent': 'android',
            'x-refresh-token': refreshToken,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response?.status === 401) {
        console.log('Access token expired, logging user out');
        return null; 
      }
      throw error;
    }
  };
  

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      backgroundColor={colors.black}
      preset="scroll"
      style={layout.pH(pixelSizeX(10))}
    >
      <Space mT={80} />

      <AppText
        title={'Account Settings'}
        fontSize={24}
        fontWeight={500}
        color={'#FFFFFF'}
      />
      <Space mB={30} />

      <AppInput
        control={control}
        error={errors.name?.message}
        keyboardType="default"
        name="name"
        placeholder={'Your Name'}
        label="Name"
        editable={false}
      />
      <Space mB={20} />

      <AppInput
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        name="email"
        placeholder={'user@example.com'}
        label="Email"
        editable={false}
      />
      <Space mB={20} />

      <AppInput
        control={control}
        error={errors.subscriptionStatus?.message}
        keyboardType="default"
        name="subscriptionStatus"
        placeholder={'Upgrade to convert your research papers'}
        label="Subscription Status"
        editable={false}
        SVGLeft={
          <AssetByVariant
            resizeMode="contain"
            path={'freestat'}
            width={normalizeWidth(65)}
            height={normalizeHeight(24)}
          />
        }
      />
      <Space mB={50} />

      <View>
        <AppButton
          bgColor={'#8A2BE1'}
          onPress={onLogout}
          title={'Logout'}
          variant="gradient"
          shadow={false}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>

      <Space mB={14} />

      <View style={{ marginHorizontal: -pixelSizeX(10), marginTop: 'auto' }}>
        <View
          style={[
            layout.bgColor('#201E23'),
            layout.height(pixelSizeY(170)),
            layout.pH(pixelSizeX(20)),
            layout.pV(pixelSizeY(30)),
          ]}
        >
          <AppText
            title={'Want to listen to your own research as a podcast?'}
            fontSize={16}
            fontWeight={500}
            color={'#FFFFFF'}
            marginHorizontal={pixelSizeX(70)}
            textAlign="center"
            extraStyle={{ lineHeight: 22.5 }}
          />
        </View>
      </View>
    </AppScreen>
  );
};

export default AccountSetScreen;