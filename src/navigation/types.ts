import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';

import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type RootStackParamList = {
  [Paths.Example]: undefined;
  [Paths.LoginScreen]: undefined;
  [Paths.Startup]: undefined;
  [Paths.ForgotPasswordScreen]: undefined;
  [Paths.ChangePasswordScreen]: undefined;
  [Paths.SignUpScreen]: undefined;
  [Paths.AdditionalInfoScreen]: undefined;
  [Paths.Onboarding]: undefined;
  [Paths.Onboarding2]: undefined;
  [Paths.Onboarding3]: undefined;
  [Paths.AuthStack]: undefined;
  [Paths.HomeStack]: undefined;
  [Paths.BottomTabs]: undefined;


};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
