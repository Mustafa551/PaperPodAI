
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { View } from 'react-native';

// import { useTheme } from '@/theme';
// import { SVG } from '@/theme/assets/icons';
// import { FONTS_FAMILY } from '@/theme/fonts';
// import { Paths } from '@/navigation/paths';
// import { RootScreenProps } from '@/navigation/types';

// import {
//   AppButton,
//   AppInput,
//   AppText,
//   AssetByVariant,
//   Divider,
//   IconByVariant,
//   Space,
// } from '@/components/atoms';
// import { AppModalCentered } from '@/components/molecules';
// import { AppScreen } from '@/components/templates';

// import { useModal } from '@/context/ModalProvider';
// import { signUpSchema } from '@/utils/schemas';
// import { SignUpForm } from '@/utils/schemasTypes';
// import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';

// import useStyles from './style';

// const ForgotpassScreen: React.FC<RootScreenProps<Paths.SignUpScreen>> = ({
//   navigation,
// }) => {
//   const { colors, layout } = useTheme();
//   const { t } = useTranslation();
//   const styles = useStyles();

//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({ resolver: zodResolver(signUpSchema(t)) });

//   const onSignup = (value: SignUpForm) => {
//     console.debug('🚀 ~ onSignin ~ value:', value);
//   };

//   return (
//     <AppScreen
//       ScrollViewProps={{ showsVerticalScrollIndicator: false }}
//       backgroundColor={colors.black}
//       preset="scroll"
//       style={ layout.pH(pixelSizeX(10))}
//     >
//       {/* <Space mB={20} /> */}
//       <Space mT={75} />

//      <View style={layout.alignSelf('center')}>
//             <AssetByVariant
//               resizeMode="contain"
//               path={'loginbg'}
//               width={normalizeWidth(267)}
//               height={normalizeHeight(247)}
//             />
//           </View>

//       <Space mB={155} />

//       <AppText
//         title={'Forget Password'}
//         fontSize={24}
//         fontWeight={500}
//         color={"#FFFFFF"}
//         // paddingHorizontal={19.5}
//       />
//       <Space mB={16} />

//           <AppText
//               title={"Enter your email address and we will send you instructions to reset your password"}
//               fontSize={14}
//               fontWeight={400}
//               color={"#F5F5F5"}
             
//             />
//       <Space mB={40} />
 
      
//       <AppInput
//         control={control}
//         error={errors.email?.message}
//         keyboardType="email-address"
//         name="email"
//         placeholder={'Enter your email'}
//         label='Email'
//       />


//       <Space mB={70} />

//  <View >
//        <AppButton
//          bgColor={"#8A2BE1"}
//          // onPress={handleSubmit(onSignin)}
//          onPress={() => {
//            navigation.navigate(Paths.OtpScreen);
//           //  handleSubmit(onSignup);
//          }
//            // openModal('forgotPassword', {
//            //   email: 'user@example.com',
//            //   type: 'phoneNum',
//            // })  
//          }
//          title={'Continue'}
//          variant="gradient"
//          shadow={false}
//        />
 
//       </View>


   
//       <Space mB={14} />


//       <AppText
//            title={"Don't have an account?"}
//            color={colors.white}
//            alignSelf="center"
//            fontSize={15}
//            fontFamily="medium"
//          >
//            <AppText
//              title={'Sign up'}
//              onPress={() => navigation.goBack()}
//              color={colors.white}
//              extraStyle={layout.textDecorationLine('underline')}
//              fontSize={15}
//               fontWeight={500}
//              marginLeft={5}
//            />
//          </AppText>
//       {/* <Space mB={20} /> */}
//     </AppScreen>
//   );
// };

// export default ForgotpassScreen;



import React, { useEffect } from 'react';
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
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';
import useStyles from './style';
import { saveTokensFromHeaders } from '../../utils/helpers';
import { forgotPasswordSchema } from '@/utils/schemas';

const BASE_URL = 'https://rude-vickie-3dotmedia-5ccb6d6e.koyeb.app';

type ForgotPasswordForm = {
  email: string;
};

interface SendOtpResponse {
  success: boolean;
  message?: string;
}

const ForgotpassScreen: React.FC<RootScreenProps<Paths.ForgotpassScreen>> = () => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation<RootScreenProps<Paths.ForgotpassScreen>['navigation']>();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form Validation Errors:', errors);
    }
  }, [errors]);

  const onSendOtp = async (data: ForgotPasswordForm) => {
    console.log('Form Submitted with Data:', data);
    try {
      console.log('Making API call to:', `${BASE_URL}/v1/user/send-otp`);
      const response = await axios.post<SendOtpResponse>(
        `${BASE_URL}/v1/user/send-otp`,
        {
          email: data.email,
        },
        {
          headers: {
            'x-device-id': 'test-device-id',
            'x-user-agent': 'android',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Send OTP Response:', response.data);
      if (response.data.success) {
        Alert.alert('Success', 'OTP sent to your email!');
        reset();
        // navigation.navigate(Paths.OtpScreen, { email: data.email });
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      navigation.navigate(Paths.OtpScreen, { email: data.email });
      console.error('Send OTP Error:', {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        headers: axiosError.response?.headers,
      });

      if (axiosError.response?.status === 401) {
        console.log('Received 401, extracting new tokens from headers');
        const newTokens = await saveTokensFromHeaders(axiosError.response?.headers);
        if (newTokens) {
          try {
            console.log('Retrying API call with new tokens');
            const retryResponse = await axios.post<SendOtpResponse>(
              `${BASE_URL}/v1/user/send-otp`,
              {
                email: data.email,
              },
              {
                headers: {
                  'x-device-id': 'test-device-id',
                  'x-user-agent': 'android',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${newTokens.accessToken}`,
                },
              }
            );

            console.log('Retry Send OTP Response:', retryResponse.data);
            if (retryResponse.data.success) {
              Alert.alert('Success', 'OTP sent to your email!');
              reset();
              navigation.navigate(Paths.OtpScreen, { email: data.email });
              return;
            } else {
              throw new Error(retryResponse.data.message || 'Retry failed');
            }
          } catch (retryError: unknown) {
            const retryAxiosError = retryError as AxiosError<{ message?: string }>;
            console.error('Retry Send OTP Error:', {
              message: retryAxiosError.message,
              response: retryAxiosError.response?.data,
              status: retryAxiosError.response?.status,
            });
          }
        }
      }

      const errorMessage = axiosError.response?.data?.message || 'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      backgroundColor={colors.black}
      preset="scroll"
      style={layout.pH(pixelSizeX(10))}
    >
      <Space mT={75} />

      <View style={layout.alignSelf('center')}>
        <AssetByVariant
          resizeMode="contain"
          path={'loginbg'}
          width={normalizeWidth(267)}
          height={normalizeHeight(247)}
        />
      </View>

      <Space mB={155} />

      <AppText
        title={'Forget Password'}
        fontSize={24}
        fontWeight={500}
        color={'#FFFFFF'}
      />
      <Space mB={16} />

      <AppText
        title={'Enter your email address and we will send you instructions to reset your password'}
        fontSize={14}
        fontWeight={400}
        color={'#F5F5F5'}
      />
      <Space mB={40} />

      <AppInput
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        name="email"
        placeholder={'Enter your email'}
        label="Email"
      />

      <Space mB={70} />

      <View>
        <AppButton
          bgColor={'#8A2BE1'}
          onPress={() => {
            console.log('Continue Button Pressed');
            handleSubmit(onSendOtp)();
          }}
          title={'Continue'}
          variant="gradient"
          shadow={false}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </View>

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

export default ForgotpassScreen;
