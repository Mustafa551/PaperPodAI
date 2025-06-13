import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import {
  AdditionalInfoScreen,
  Example,
  ForgotPasswordScreen,
  LoginScreen,
  SignUpScreen,
  Startup,
} from '@/screens';
import ChangePasswordScreen from '@/screens/ChangePasswordScreen/ChangePasswordScreen';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen component={LoginScreen} name={Paths.LoginScreen} />
          <Stack.Screen component={SignUpScreen} name={Paths.SignUpScreen} />
          <Stack.Screen
            component={AdditionalInfoScreen}
            name={Paths.AdditionalInfoScreen}
          />
          <Stack.Screen component={Example} name={Paths.Example} />
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen
            component={ForgotPasswordScreen}
            name={Paths.ForgotPasswordScreen}
          />
          <Stack.Screen
            component={ChangePasswordScreen}
            name={Paths.ChangePasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
