
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



import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Space,
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import { forgotPassword } from '@/store/authSlice/authApiService';
import { useTheme } from '@/theme';
import { forgotPasswordSchema } from '@/utils/schemas';
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import useStyles from './style';

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
  try {
    await forgotPassword(data.email);
    Alert.alert('Success', 'OTP sent to your email!');
    reset();
    // navigation.navigate(Paths.OtpScreen, { email: data.email });
  } catch (error: any) {
    const errorMessage = error.message || 'Something went wrong. Please try again.';
    Alert.alert('Error', errorMessage);
    navigation.navigate(Paths.OtpScreen, { email: data.email });
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

      <Space mB={50} />

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

      <Space mB={20} />

    
    </AppScreen>
  );
};

export default ForgotpassScreen;
