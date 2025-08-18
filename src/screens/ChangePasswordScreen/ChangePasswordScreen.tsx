import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  Space,
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';
import useStyles from './style';
import { resetStack } from '@/navigation/navigationRef';
import { changePasswordSchema } from '@/utils/schemas';
import { updatePassword } from '@/store/authSlice/authApiService';

type UpdatePasswordForm = {
  password: string;
  confirmPassword: string;
};

const ChangePasswordScreen: React.FC<RootScreenProps<Paths.ChangePasswordScreen>> = () => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation = useNavigation<RootScreenProps<Paths.ChangePasswordScreen>['navigation']>();
  const route = useRoute<RootScreenProps<Paths.ChangePasswordScreen>['route']>();
  const { email, token: accessToken } = route.params;
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(changePasswordSchema(t)),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form Validation Errors:', errors);
    }
  }, [errors]);

  const onUpdatePassword = async (data: UpdatePasswordForm) => {
    try {
      if (!accessToken) {
        throw new Error('No access token available');
      }
      await updatePassword(data.password, accessToken);
      Alert.alert('Success', 'Password updated successfully! Please log in.');
      reset();
      resetStack('AuthStack', 'LoginScreen');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Session expired or invalid. Please start the password reset process again.');
      resetStack('AuthStack', 'LoginScreen');
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

      <Space mB={80} />

      <AppText
        title={'Create New Password'}
        fontSize={24}
        fontWeight={500}
        color={'#FFFFFF'}
      />
      <Space mB={16} />

      <AppText
        title={'Enter a new password for your account, your new password must be different from previous password.'}
        fontSize={14}
        fontWeight={400}
        color={'#F5F5F5'}
      />
      <Space mB={40} />

      <AppInput
        control={control}
        error={errors.password?.message}
        keyboardType="default"
        name="password"
        placeholder={'Enter your password'}
        secureTextEntry
        label="New Password"
      />
      <Space mB={30} />

      <AppInput
        control={control}
        error={errors.confirmPassword?.message}
        keyboardType="default"
        name="confirmPassword"
        placeholder={'Confirm your password'}
        secureTextEntry
        label="Confirm Password"
      />

      <Space mB={70} />

      <View>
        <AppButton
          bgColor={'#8A2BE1'}
          onPress={handleSubmit(onUpdatePassword)}
          title={'Create New Password'}
          variant="gradient"
          shadow={false}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </View>
    </AppScreen>
  );
};

export default ChangePasswordScreen;
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { View } from 'react-native';import { useTheme } from '@/theme';
// import { SVG } from '@/theme/assets/icons';
// import { FONTS_FAMILY } from '@/theme/fonts';
// import { Paths } from '@/navigation/paths';
// import { RootScreenProps } from '@/navigation/types';import {
//   AppButton,
//   AppInput,
//   AppText,
//   AssetByVariant,
//   Divider,
//   IconByVariant,
//   OtpConfirmModalContent,
//   Space,
// } from '@/components/atoms';
// import { AppModalCentered } from '@/components/molecules';
// import { AppScreen } from '@/components/templates';import { useModal } from '@/context/ModalProvider';
// import { signUpSchema } from '@/utils/schemas';
// import { SignUpForm } from '@/utils/schemasTypes';
// import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';import useStyles from './style';
// import OTPConfirmModalContent from '@/components/atoms/OtpConfirmModalContent/OtpConfirmModalContent';const ChangePasswordScreen: React.FC<RootScreenProps<Paths.SignUpScreen>> = ({
//   navigation,
// }) => {
//   const { colors, layout } = useTheme();
//   const { t } = useTranslation();
//   const styles = useStyles();  const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({ resolver: zodResolver(signUpSchema(t)) });  const onSignup = (value: SignUpForm) => {
//     console.debug(' ~ onSignin ~ value:', value);
//   };  return (
//     <AppScreen
//       ScrollViewProps={{ showsVerticalScrollIndicator: false }}
//       backgroundColor={colors.black}
//       preset="scroll"
//       style={ layout.pH(pixelSizeX(10))}
//     >
//       {/* <Space mB={20} /> */}
//       <Space mT={75} /> <View style={layout.alignSelf('center')}>
//         <AssetByVariant
//           resizeMode="contain"
//           path={'loginbg'}
//           width={normalizeWidth(267)}
//           height={normalizeHeight(247)}
//         />
//       </View>

//   <Space mB={80} />

//   <AppText
//     title={'Create New Password'}
//     fontSize={24}
//     fontWeight={500}
//     color={"#FFFFFF"}
//     // paddingHorizontal={19.5}
//   />
//   <Space mB={16} />

//       <AppText
//           title={"Enter a new password  for your account, your new password must be different form previous password."}
//           fontSize={14}
//           fontWeight={400}
//           color={"#F5F5F5"}
         
//         />
//   <Space mB={40} />   <AppInput
//          control={control}
//          error={errors.password?.message}
//          keyboardType="default"
//          name="password"
//          placeholder={'Enter your password'}
//          secureTextEntry
//          label='New Password'
//        />
//        <Space mB={30} />   <AppInput
//      control={control}
//      error={errors.password?.message}
//      keyboardType="default"
//      name="confirmPassword"
//      placeholder={'Confirm your password'}
//      secureTextEntry
//      label='Confirm Password'
     

//    />
//   <Space mB={70} /> <View >
//        <AppButton
//          bgColor={"#8A2BE1"}
//          // onPress={handleSubmit(onSignin)}
//          onPress={
//            // openModal('forgotPassword', {
//            //   email: 'user@example.com',
//            //   type: 'phoneNum',
//            // })
//            handleSubmit(onSignup)
//          }
//          title={'Create New Password'}
//          variant="gradient"
//          shadow={false}
//        />
//       </View>
//       {/* <Space mB={20} /> */}
//     </AppScreen>
//   );
// };

// export default ChangePasswordScreen

