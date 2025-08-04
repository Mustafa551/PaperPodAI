import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';

import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type RootStackParamList = {
  [Paths.Example]: undefined;
  [Paths.LoginScreen]: undefined;
  [Paths.Startup]: undefined;
  [Paths.ForgotpassScreen]: undefined;
  [Paths.ChangePasswordScreen]: { email: string; token?: string };
  [Paths.SignUpScreen]: undefined;
  [Paths.AdditionalInfoScreen]: undefined;
  [Paths.Onboarding]: undefined;
  [Paths.Onboarding2]: undefined;
  [Paths.Onboarding3]: undefined;
  [Paths.LibraryScreen]: undefined;
  [Paths.AuthStack]: undefined;
  [Paths.HomeStack]: undefined;
  [Paths.BottomTabs]: undefined;
  [Paths.AccountSetScreen]: undefined;
  [Paths.OtpScreen]: { email: string };
  [Paths.PaywallScreen]: undefined;
  


};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
