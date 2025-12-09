import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import {
  AccountSetScreen,
  LibraryScreen,
  LoginScreen,
  Onboarding,
  Onboarding2,
  PaywallScreen,
  SignUpScreen,
  UploadingProgressScreen,
} from '@/screens';
import ChangePasswordScreen from '@/screens/ChangePasswordScreen/ChangePasswordScreen';
import Onboarding3 from '@/screens/Onboarding3/Onboarding3';
import BottomTabs from './BottomNavigation/BottomNavigation';
import { navigationRef } from './navigationRef';
import ForgotpassScreen from '@/screens/ForgotpassScreen/ForgotpassScreen';
import OtpScreen from '@/screens/OtpScreen/OtpScreen';
import AudioPlayerScreen from '@/screens/TrackPlayerScreen/TrackPlayerScreen';
import { useAppStore } from '@/store';
import { useEffect, useState } from 'react';
import { fetchUserDataLocal } from '@/store/authSlice/authApiService';
import { ActivityIndicator, Platform, View } from 'react-native';
import { PUBLIC_RC_ANDROID, PUBLIC_RC_IOS } from '@env';

type PurchasesModule = typeof import('react-native-purchases').default;

const purchasesModule: PurchasesModule | null = (() => {
  try {
    return require('react-native-purchases').default;
  } catch (error) {
    if (__DEV__) {
      console.warn(
        'RevenueCat SDK is not available. Skipping in-app purchase setup.',
        error,
      );
    }
    return null;
  }
})();
const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Onboarding} name={Paths.Onboarding} />
      <Stack.Screen component={Onboarding2} name={Paths.Onboarding2} />
      <Stack.Screen component={Onboarding3} name={Paths.Onboarding3} />
      <Stack.Screen name={Paths.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={Paths.SignUpScreen} component={SignUpScreen} />

      <Stack.Screen
        name={Paths.ForgotpassScreen}
        component={ForgotpassScreen}
      />
      <Stack.Screen
        name={Paths.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />

      <Stack.Screen name={Paths.OtpScreen} component={OtpScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabs} name={Paths.BottomTabs} />
      <Stack.Screen name={Paths.LibraryScreen} component={LibraryScreen} />
      <Stack.Screen name={Paths.PaywallScreen} component={PaywallScreen} />
      <Stack.Screen
        name={Paths.AccountSetScreen}
        component={AccountSetScreen}
      />
      <Stack.Screen name={'AudioPlayerScreen'} component={AudioPlayerScreen} />
      <Stack.Screen name={'UploadingProgressScreen'} component={UploadingProgressScreen} />
    </Stack.Navigator>
  );
};

function ApplicationNavigator() {
  const { navigationTheme, variant, fonts, colors } = useTheme();
  const { userData } = useAppStore(state => state)
  console.log("🚀 ~ ApplicationNavigator ~ userData:", userData)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchUserDataLocal();
      setLoading(false);
    };
    init();
  }, []);
  useEffect(() => {
    const configureRevenueCat = async () => {
      if (!userData?.email || !purchasesModule) {
        return;
      }

      const userEmail = String(userData.email);

      try {
        if (Platform.OS === 'ios') {
          
          await purchasesModule.configure({
            apiKey: "appl_KeFoybfiJCgdBQzsrgAHEzFCVMU",
            appUserID: userEmail,
          });
        } else if (Platform.OS === 'android') {
          
          await purchasesModule.configure({
            apiKey: "goog_oLcWeyQfooPSFBTWsgtsOtzGxuD",
            appUserID: userEmail,
          });
        }

        const customerInfo = await purchasesModule.getCustomerInfo();
        console.log(
          '🚀 ~ RootNavigator ~ customerInfo activeSubscriptions:',
          customerInfo?.activeSubscriptions?.[0],
        );

        purchasesModule.setLogHandler((logLevel, message) => {
          console.log(`[RevenueCat] ${message}`);
        });
      } catch (error) {
        console.log('🚀 ~ configureRevenueCat error:', error);
      }
    };

    configureRevenueCat();
  }, [userData?.email]);
  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={colors.white} size="large" />
        </View>
      </SafeAreaProvider>
    );
  }


  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>

        <Stack.Navigator key={variant} initialRouteName={userData ? Paths.HomeStack : Paths.AuthStack} screenOptions={{ headerShown: false }}>

          <Stack.Screen name={Paths.AuthStack} component={AuthStack} />
          <Stack.Screen name={Paths.HomeStack} component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
