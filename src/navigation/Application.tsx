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
  SignUpScreen
} from '@/screens';
import ChangePasswordScreen from '@/screens/ChangePasswordScreen/ChangePasswordScreen';
import Onboarding3 from '@/screens/Onboarding3/Onboarding3';
import BottomTabs from './BottomNavigation/BottomNavigation';
import { navigationRef } from './navigationRef';
import ForgotpassScreen from '@/screens/ForgotpassScreen/ForgotpassScreen';
import OtpScreen from '@/screens/OtpScreen/OtpScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Onboarding} name={Paths.Onboarding} />
      <Stack.Screen component={Onboarding2} name={Paths.Onboarding2} />
      <Stack.Screen component={Onboarding3} name={Paths.Onboarding3} />
      <Stack.Screen name={Paths.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={Paths.SignUpScreen} component={SignUpScreen} />
  

      <Stack.Screen name={Paths.ForgotpassScreen} component={ForgotpassScreen}
      />
      <Stack.Screen
        name={Paths.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name={Paths.OtpScreen}
        component={OtpScreen}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabs} name={Paths.BottomTabs} />
      <Stack.Screen name={Paths.LibraryScreen} component={LibraryScreen} />
      <Stack.Screen name={Paths.PaywallScreen} component={PaywallScreen} />
      <Stack.Screen name={Paths.AccountSetScreen} component={AccountSetScreen} />


    </Stack.Navigator>
  );
};

function ApplicationNavigator() {
  const { navigationTheme, variant, fonts } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator key={variant} initialRouteName={Paths.AuthStack} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Paths.AuthStack} component={AuthStack} />
          <Stack.Screen name={Paths.HomeStack} component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
