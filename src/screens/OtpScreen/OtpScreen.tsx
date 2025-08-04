
// import { zodResolver } from '@hookform/resolvers/zod';
// import React, { useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { Text, View } from 'react-native';

// import { Paths } from '@/navigation/paths';
// import { RootScreenProps } from '@/navigation/types';
// import { useTheme } from '@/theme';

// import {
//     AppButton,
//     AppText,
//     AssetByVariant,
//     Space
// } from '@/components/atoms';
// import { AppScreen } from '@/components/templates';

// import { onlyOtpSchema } from '@/utils/schemas';
// import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';

// import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
// import useStyles from './style';

// const OtpScreen: React.FC<RootScreenProps<Paths.OtpScreen>> = ({
//     navigation,
// }) => {
//     const { colors, layout } = useTheme();
//     const { t } = useTranslation();
//     const styles = useStyles();


//     const [value, setValue] = useState('');
//     const ref = useBlurOnFulfill({ value, cellCount: 4 });
//     const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//         value,
//         setValue,
//     });


//     const {
//         control,
//         formState: { errors },
//         handleSubmit,
//     } = useForm({ resolver: zodResolver(onlyOtpSchema(t)) });



//     return (
//         <AppScreen
//             ScrollViewProps={{ showsVerticalScrollIndicator: false }}
//             backgroundColor={colors.black}
//             preset="scroll"
//             style={layout.pH(pixelSizeX(10))}
//         >
//             {/* <Space mB={20} /> */}
//             <Space mT={75} />

//             <View style={layout.alignSelf('center')}>
//                 <AssetByVariant
//                     resizeMode="contain"
//                     path={'loginbg'}
//                     width={normalizeWidth(267)}
//                     height={normalizeHeight(247)}
//                 />
//             </View>

//             <Space mB={155} />

//             <AppText
//                 title={'OTP Verification'}
//                 fontSize={24}
//                 fontWeight={500}
//                 color={"#FFFFFF"}
//             // paddingHorizontal={19.5}
//             />
//             <Space mB={16} />

//             <AppText
//                 title={"Check your email inbox and input the verification code to verify your account"}
//                 fontSize={14}
//                 fontWeight={400}
//                 color={"#F5F5F5"}

//             />
//             <Space mB={40} />


//             {/* OTP Input Placeholder */}
//             <Controller
//                 control={control}
//                 name="otp"
//                 render={({ field }) => (
//                     <CodeField
//                         {...props}
//                         ref={ref}
//                         value={value}
//                         onChangeText={(value) => {
//                             setValue(value);
//                             field.onChange(value);
//                         }}
//                         cellCount={4}
//                         rootStyle={styles.codeFieldRoot}
//                         keyboardType="number-pad"
//                         textContentType="oneTimeCode"
//                         renderCell={({ index, symbol, isFocused }) => (
//                             <Text
//                                 key={index}
//                                 style={[styles.cell, isFocused && styles.focusCell]}
//                                 onLayout={getCellOnLayoutHandler(index)}
//                             >
//                                 {symbol || (isFocused ? <Cursor /> : null)}
//                             </Text>
//                         )}
//                     />
//                 )}
//             />
//             <Space mB={10} />

//             {errors.otp?.message && (
//                 <>
//                     <AppText
//                         title={errors.otp?.message}
//                         color={colors.redError}
//                         fontSize={12}
//                     />
//                 </>
//             )}

//             <Space mB={50} />

//             <View >

//                 <AppButton
//                     bgColor={colors.black}
//                     // onPress={handleSubmit(onSignin)}
//                     onPress={() => {
//                         //    navigation.navigate(Paths.ChangePasswordScreen);
//                     }
//                     }
//                     title={'Resend Code'}
//                     variant="outlined"
//                     shadow={false}
//                 />
//                 <Space mB={15} />


//                 <AppButton
//                     bgColor={colors.primary}
//                     // onPress={handleSubmit(onSignin)}
//                     onPress={handleSubmit(() => {
//                         navigation.navigate(Paths.ChangePasswordScreen);

//                     }
//                 )
//                     }
//                     title={'Continue'}
//                     variant="gradient"
//                     shadow={false}
//                 />

//             </View>




//             {/* <Space mB={20} /> */}
//         </AppScreen>
//     );
// };

// export default OtpScreen;


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Alert, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import {
  AppButton,
  AppText,
  AssetByVariant,
  Space,
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { onlyOtpSchema } from '@/utils/schemas';
import { saveAccessToken } from '../../utils/helpers';
import useStyles from './style';

const BASE_URL = 'https://rude-vickie-3dotmedia-5ccb6d6e.koyeb.app';

type OtpForm = {
  otp: string;
};

interface VerifyOtpResponse {
  success: boolean;
  token?: string; 
  message?: string;
}

const OtpScreen: React.FC<RootScreenProps<Paths.OtpScreen>> = () => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation<RootScreenProps<Paths.OtpScreen>['navigation']>();
  const route = useRoute<RootScreenProps<Paths.OtpScreen>['route']>();
  const { email } = route.params; 

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<OtpForm>({
    resolver: zodResolver(onlyOtpSchema(t)),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form Validation Errors:', errors);
    }
  }, [errors]);

  const onVerifyOtp = async (data: OtpForm) => {
    console.log('Form Submitted with Data:', { email, otp: data.otp });
    try {
      console.log('Making API call to:', `${BASE_URL}/v1/user/verify-otp`);
      const response = await axios.post<VerifyOtpResponse>(
        `${BASE_URL}/v1/user/verify-otp`,
        {
          email,
          otp: data.otp,
          intent: 'PASSWORD_UPDATE',
        },
        {
          headers: {
            'x-device-id': 'test-device-id',
            'x-user-agent': 'android',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Verify OTP Response:', response.data);
      if (response.data.success) {
        if (response.data.token) {
          await saveAccessToken(response.data.token);
        } else {
          console.warn('No access token in verify-otp response');
        }
        Alert.alert('Success', 'OTP verified successfully!');
        reset();
        navigation.navigate(Paths.ChangePasswordScreen, {
          email,
          token: response.data.token,
        });
      } else {
        throw new Error(response.data.message || 'Failed to verify OTP');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error('Verify OTP Error:', {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        headers: axiosError.response?.headers,
      });
      const errorMessage = axiosError.response?.data?.message || 'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  const onResendOtp = async () => {
    console.log('Resend OTP Button Pressed');
    try {
      console.log('Making API call to:', `${BASE_URL}/v1/user/send-otp`);
      const response = await axios.post<VerifyOtpResponse>(
        `${BASE_URL}/v1/user/send-otp`,
        {
          email,
        },
        {
          headers: {
            'x-device-id': 'test-device-id',
            'x-user-agent': 'android',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Resend OTP Response:', response.data);
      if (response.data.success) {
        Alert.alert('Success', 'New OTP sent to your email!');
        reset();
      } else {
        throw new Error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error('Resend OTP Error:', {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        headers: axiosError.response?.headers,
      });
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
        title={'OTP Verification'}
        fontSize={24}
        fontWeight={500}
        color={'#FFFFFF'}
      />
      <Space mB={16} />

      <AppText
        title={'Check your email inbox and input the verification code to verify your account'}
        fontSize={14}
        fontWeight={400}
        color={'#F5F5F5'}
      />
      <Space mB={40} />

      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <CodeField
            {...props}
            ref={ref}
            value={value}
            onChangeText={(value) => {
              setValue(value);
              field.onChange(value);
            }}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        )}
      />
      <Space mB={10} />

      {errors.otp?.message && (
        <>
          <AppText
            title={errors.otp?.message}
            color={colors.redError}
            fontSize={12}
          />
        </>
      )}

      <Space mB={50} />

      <View>
        <AppButton
          bgColor={colors.black}
          onPress={onResendOtp}
          title={'Resend Code'}
          variant="outlined"
          shadow={false}
        />
        <Space mB={15} />

        <AppButton
          bgColor={colors.primary}
          onPress={() => {
            console.log('Continue Button Pressed');
            handleSubmit(onVerifyOtp)();
          }}
          title={'Continue'}
          variant="gradient"
          shadow={false}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </View>
    </AppScreen>
  );
};

export default OtpScreen;