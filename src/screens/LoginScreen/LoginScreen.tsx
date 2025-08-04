// import { zodResolver } from '@hookform/resolvers/zod';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { View, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTheme } from '@/theme';
// import { FONTS_FAMILY } from '@/theme/fonts';
// import { Paths } from '@/navigation/paths';
// import { RootScreenProps } from '@/navigation/types';
// import {
//   AppButton,
//   AppInput,
//   AppText,
//   AssetByVariant,
//   Divider,
//   Space,
// } from '@/components/atoms';
// import { AppScreen } from '@/components/templates';
// import { signInSchema } from '@/utils/schemas';
// import { SignInForm } from '@/utils/schemasTypes';
// import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';
// import useStyles from './style';
// import { resetStack } from '@/navigation/navigationRef';

// const BASE_URL = 'https://rude-vickie-3dotmedia-5ccb6d6e.koyeb.app';

// const saveAuthData = async (accessToken: string, refreshToken: string, user: any) => {
//   try {
//     await AsyncStorage.setItem('accessToken', accessToken);
//     await AsyncStorage.setItem('refreshToken', refreshToken);
//     await AsyncStorage.setItem('user', JSON.stringify(user));
//     console.log('Auth data saved successfully');
//   } catch (error) {
//     console.error('Error saving auth data:', error);
//   }
// };

// const LoginScreen: React.FC<RootScreenProps<Paths.LoginScreen>> = ({
//   navigation,
// }) => {
//   const { colors, layout } = useTheme();
//   const { t } = useTranslation();
//   const styles = useStyles();

//   const {
//     control,
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     reset,
//   } = useForm({ resolver: zodResolver(signInSchema(t)) });

//   React.useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       console.log('Form Validation Errors:', errors);
//     }
//   }, [errors]);

//   const onSignin = async (data: SignInForm) => {
//     console.log('Form Submitted with Data:', data);
//     try {
//       // console.log('Making API call to:', `${BASE_URL}/v1/user/login`);
//       const response = await axios.post(
//         `${BASE_URL}/v1/user/login`,
//         {
//           email: data.email,
//           password: data.password,
//         },
//         {
//           headers: {
//             'x-device-id': 'test-device-id',
//             'x-user-agent': 'android',
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const { accessToken, refreshToken, user, success } = response.data;
//       console.log('Login Response:', response.data);
//       if (success) {
//         await saveAuthData(accessToken, refreshToken, user);
//         Alert.alert('Success', 'Logged in successfully!');
//         reset();
//         resetStack('HomeStack', 'BottomTabs'); 
//       } else {
//         throw new Error('Login failed: Success flag is false');
//       }
//     } catch (error: any) {
//       console.error('Login Error:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       }); 
//       const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
//       Alert.alert('Error', errorMessage);
//     }
//   };

//   return (
//     <AppScreen
//       ScrollViewProps={{ showsVerticalScrollIndicator: false }}
//       preset="scroll"
//       backgroundColor={colors.black}
//       style={layout.pH(pixelSizeX(10))}
//     >
//       <Space mT={30} />
//       <View style={layout.alignSelf('center')}>
//         <AssetByVariant
//           resizeMode="contain"
//           path={'loginbg'}
//           width={normalizeWidth(267)}
//           height={normalizeHeight(247)}
//         />
//       </View>
//       <Space mB={30} />

//       <AppText
//         title={'Welcome Back'}
//         fontSize={24}
//         fontWeight={500}
//         color={'#FFFFFF'}
//       />
//       <Space mB={30} />

//       <AppInput
//         control={control}
//         error={errors.email?.message}
//         keyboardType="email-address"
//         name="email"
//         placeholder={'Enter your email'}
//         label="Email"
//       />
//       <Space mB={16} />

//       <AppInput
//         control={control}
//         error={errors.password?.message}
//         keyboardType="default"
//         name="password"
//         placeholder={'Enter your password'}
//         secureTextEntry
//         label="Password"
//       />
//       <Space mB={5} />

//       <AppText
//         onPress={() => navigation.navigate(Paths.ForgotpassScreen)}
//         title={t('common_labels.forgetPassword')}
//         color={colors.white}
//         alignSelf="flex-end"
//         fontSize={15}
//         fontFamily="medium"
//       />
//       <Space mB={35} />

//       <AppButton
//         bgColor={'#8A2BE1'}
//         onPress={() => {
//           console.log('Login Button Pressed')
//           handleSubmit(onSignin)();
//         }}
//         title={'Login'}
//         variant="gradient"
//         shadow={false}
//         loading={isSubmitting}
//         disabled={isSubmitting}
//       />

//       <View style={styles.continueWithCont}>
//         <Divider
//           color={colors.neutrals20}
//           height={1}
//           width="40%"
//           alignSelf="center"
//         />
//         <AppText
//           title={'Or'}
//           variant="body3-openSans-light"
//           alignSelf="center"
//           color={colors.neutrals20}
//           fontSize={12}
//           fontFamily="regular"
//           extraStyle={layout.pH(10)}
//         />
//         <Divider
//           color={colors.neutrals20}
//           height={1}
//           width="40%"
//           alignSelf="center"
//         />
//       </View>

//       <AppButton
//         bgColor={'transparent'}
//         onPress={() => {
//           console.log('Google Login Button Pressed'); 
//           Alert.alert('Info', 'Google login not implemented yet.');
//         }}
//         title={'Continue with Google'}
//         variant="gradient"
//         shadow={false}
//         extraStyle={{
//           button: {
//             borderColor: '#8A2BE1',
//           },
//           title: {
//             fontWeight: '500',
//           },
//         }}
//         SVGLeft={
//           <AssetByVariant
//             resizeMode="contain"
//             path={'google'}
//             width={normalizeWidth(18)}
//             height={normalizeHeight(18)}
//           />
//         }
//       />
//       <Space mB={14} />

//       <AppText
//         title={"Don't have an account?"}
//         color={colors.white}
//         alignSelf="center"
//         fontSize={15}
//         fontFamily="medium"
//       >
//         <AppText
//           title={'Sign up'}
//           onPress={() => navigation.navigate(Paths.SignUpScreen)}
//           color={colors.white}
//           extraStyle={layout.textDecorationLine('underline')}
//           fontSize={15}
//           fontWeight={500}
//           marginLeft={5}
//         />
//       </AppText>
//     </AppScreen>
//   );
// };

// export default LoginScreen;


import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Alert } from 'react-native';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Divider,
  Space,
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { signInSchema } from '@/utils/schemas';
import { SignInForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';
import useStyles from './style';
import { resetStack } from '@/navigation/navigationRef';

// Backend URL
const BASE_URL = 'https://rude-vickie-3dotmedia-5ccb6d6e.koyeb.app';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '467094882842-378aiv0kivhit5cbc7or4taeili8ps10.apps.googleusercontent.com', // Replace with Web Client ID from Google Cloud Console
  offlineAccess: false,
});

// Utility function to save tokens and user data
const saveAuthData = async (accessToken: string, refreshToken: string, user: any) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('Auth data saved successfully');
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};

// Define API Response Type
interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    uuid: string;
    createdAt: string;
    isBlocked: boolean;
    subscriptionStatus: string;
  };
  message?: string;
}

const LoginScreen: React.FC<RootScreenProps<Paths.LoginScreen>> = () => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation<RootScreenProps<Paths.LoginScreen>['navigation']>();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Log form errors to debug validation issues
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form Validation Errors:', errors);
    }
  }, [errors]);

  // Email/Password Login API call
  const onSignin = async (data: SignInForm) => {
    console.log('Form Submitted with Data:', data);
    try {
      console.log('Making API call to:', `${BASE_URL}/v1/user/login`);
      const response = await axios.post<AuthResponse>(
        `${BASE_URL}/v1/user/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'x-device-id': 'test-device-id',
            'x-user-agent': 'android',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login Response:', response.data);
      const { accessToken, refreshToken, user, success } = response.data;

      if (success) {
        await saveAuthData(accessToken, refreshToken, user);
        Alert.alert('Success', 'Logged in successfully!');
        reset();
        resetStack('HomeStack', 'BottomTabs');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error('Login Error:', {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
      });
      const errorMessage = axiosError.response?.data?.message || 'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  // Google Sign-In API call
  const onGoogleSignIn = async () => {
    console.log('Google Sign-In Button Pressed');
    try {
      // Sign out to clear previous session (optional, for testing)
      await GoogleSignin.signOut();
      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices();
      // Initiate Google Sign-In
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In User Info:', userInfo);

      const { id, email } = userInfo.user;
      if (!email) {
        throw new Error('Google Sign-In failed: No email provided');
      }

      // Call backend Google auth endpoint
      console.log('Making API call to:', `${BASE_URL}/v1/user/auth/google`);
      const response = await axios.post<AuthResponse>(
        `${BASE_URL}/v1/user/auth/google`,
        {
          email,
          googleId: id,
        },
        {
          headers: {
            'x-device-id': 'test-device-id',
            'x-user-agent': 'android',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Google Auth Response:', response.data);
      const { accessToken, refreshToken, user, success } = response.data;

      if (success) {
        await saveAuthData(accessToken, refreshToken, user);
        Alert.alert('Success', 'Logged in with Google successfully!');
        reset();
        resetStack('HomeStack', 'BottomTabs');
      } else {
        throw new Error(response.data.message || 'Google login failed');
      }
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong with Google Sign-In. Please try again.';
      if (error instanceof Error && 'code' in error) {
        const googleError = error as { code: string };
        if (googleError.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('Google Sign-In cancelled');
          return; // No alert for user cancellation
        } else if (googleError.code === statusCodes.IN_PROGRESS) {
          errorMessage = 'Sign-In is already in progress';
        } else if (googleError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          errorMessage = 'Google Play Services are not available';
        } else if (googleError.code === statusCodes.DEVELOPER_ERROR) {
          errorMessage = 'Google Sign-In configuration error. Please contact support.';
          console.error('DEVELOPER_ERROR: Check webClientId, SHA-1, and package name in Google Cloud Console');
        }
      } else {
        const axiosError = error as AxiosError<{ message?: string }>;
        console.error('Google Auth API Error:', {
          message: axiosError.message,
          response: axiosError.response?.data,
          status: axiosError.response?.status,
        });
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false, contentInsetAdjustmentBehavior: 'automatic' }}
      preset="scroll"
      backgroundColor={colors.black}
      style={layout.pH(pixelSizeX(10))}
    >
      <Space mT={30} />
      <View style={layout.alignSelf('center')}>
        <AssetByVariant
          resizeMode="contain"
          path={'loginbg'}
          width={normalizeWidth(267)}
          height={normalizeHeight(247)}
        />
      </View>
      <Space mB={30} />

      <AppText
        title={'Welcome Back'}
        fontSize={24}
        fontWeight={500}
        color={'#FFFFFF'}
      />
      <Space mB={30} />

      <AppInput
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        name="email"
        placeholder={'Enter your email'}
        label="Email"
      />
      <Space mB={16} />

      <AppInput
        control={control}
        error={errors.password?.message}
        keyboardType="default"
        name="password"
        placeholder={'Enter your password'}
        secureTextEntry
        label="Password"
      />
      <Space mB={5} />

      <AppText
        onPress={() => navigation.navigate(Paths.ForgotpassScreen)}
        title={t('common_labels.forgetPassword')}
        color={colors.white}
        alignSelf="flex-end"
        fontSize={15}
        fontFamily="medium"
      />
      <Space mB={35} />

      <AppButton
        bgColor={'#8A2BE1'}
        onPress={() => {
          console.log('Login Button Pressed');
          handleSubmit(onSignin)();
        }}
        title={'Login'}
        variant="gradient"
        shadow={false}
        loading={isSubmitting}
        disabled={isSubmitting}
      />

      <View style={styles.continueWithCont}>
        <Divider
          color={colors.neutrals20}
          height={1}
          width="40%"
          alignSelf="center"
        />
        <AppText
          title={'Or'}
          variant="body3-openSans-light"
          alignSelf="center"
          color={colors.neutrals20}
          fontSize={12}
          fontFamily="regular"
          extraStyle={layout.pH(10)}
        />
        <Divider
          color={colors.neutrals20}
          height={1}
          width="40%"
          alignSelf="center"
        />
      </View>

      <AppButton
        bgColor={'transparent'}
        onPress={onGoogleSignIn}
        title={'Continue with Google'}
        variant="gradient"
        shadow={false}
        extraStyle={{
          button: {
            borderColor: '#8A2BE1',
          },
          title: {
            fontWeight: '500',
          },
        }}
        SVGLeft={
          <AssetByVariant
            resizeMode="contain"
            path={'google'}
            width={normalizeWidth(18)}
            height={normalizeHeight(18)}
          />
        }
      />
      <Space mB={14} />

      <AppText
        title={"Don't have an account?"}
        color={colors.white}
        alignSelf="center"
        fontSize={15}
        fontFamily="medium"
      >
        <AppText
          title={'Sign up'}
          onPress={() => navigation.navigate(Paths.SignUpScreen)}
          color={colors.white}
          extraStyle={layout.textDecorationLine('underline')}
          fontSize={15}
          fontWeight={500}
          marginLeft={5}
        />
      </AppText>
    </AppScreen>
  );
};

export default LoginScreen;