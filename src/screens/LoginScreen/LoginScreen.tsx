import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Alert } from 'react-native';
import { googleSignInGetIdToken } from '../../config/googleAuth';
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
import { signIn, googleSignIn } from '@/store/authSlice/authApiService';

// Backend URL


// Google Sign-In configuration is handled in App.tsx via googleAuth.ts

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
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      Alert.alert('Success', 'Logged in successfully!');
      reset();
      resetStack('HomeStack', 'BottomTabs');
    } catch (error: any) {
      const errorMessage = error.message || 'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  // Google Sign-In API call
  const onGoogleSignIn = async () => {
    console.log('Google Sign-In Button Pressed');
    try {
      const result = await googleSignInGetIdToken();

      if (!result.ok) {
        if (result.code !== 'CANCELLED') {
          Alert.alert('Google Sign-In', result.message);
        }
        return;
      }

      await googleSignIn(result.idToken);

      Alert.alert('Success', 'Logged in with Google successfully!');
      reset();
      resetStack('HomeStack', 'BottomTabs');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Google login failed');
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
      <Space mB={30} />
    </AppScreen>
  );
};

export default LoginScreen;