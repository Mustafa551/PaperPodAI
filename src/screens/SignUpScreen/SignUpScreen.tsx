import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS_FAMILY } from '@/theme/fonts';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Divider,
  IconByVariant,
  Space,
} from '@/components/atoms';
import { AppModalCentered } from '@/components/molecules';
import { AppScreen } from '@/components/templates';

import { useModal } from '@/context/ModalProvider';
import { signUpSchema } from '@/utils/schemas';
import { SignUpForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth } from '@/utils/sizes';

import useStyles from './style';

const LoginScreen: React.FC<RootScreenProps<Paths.SignUpScreen>> = ({
  navigation,
}) => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(signUpSchema(t)) });
  const { openModal } = useModal();

  const onSignup = (value: SignUpForm) => {
    console.debug('🚀 ~ onSignin ~ value:', value);
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
      pH
    >
      {/* <Space mB={20} /> */}

      <View style={layout.alignSelf('center')}>
        <AssetByVariant
          resizeMode="contain"
          path={'logo'}
          width={normalizeWidth(150)}
          height={normalizeHeight(150)}
        />
      </View>
      <Space mB={20} />

      <AppText
        title={t('screen_signUp.signup')}
        alignSelf="center"
        fontSize={30}
        fontFamily="bold"
        color={colors.textMain}
      />
      <Space mB={30} />

      <View style={[layout.rowCenter, layout.itemsStart]}>
        <View style={layout.flex1}>
          <AppInput
            control={control}
            error={errors.firstName?.message}
            name="firstName"
            placeholder={t('common_labels.firstName')}
          />
        </View>
        <Space mH={5} />
        <View style={layout.flex1}>
          <AppInput
            control={control}
            error={errors.lastName?.message}
            name="lastName"
            placeholder={t('common_labels.lastName')}
          />
        </View>
      </View>
      <Space mB={10} />

      <AppInput
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        name="email"
        placeholder={t('placeholder.email')}
      />
      <Space mB={10} />

      <AppInput
        control={control}
        error={errors.location?.message}
        name="location"
        placeholder={t('common_labels.location')}
        SVGRight={<SVG.LocationPrimary />}
      />
      <Space mB={10} />

      <AppInput
        control={control}
        error={errors.referralCode?.message}
        name="referralCode"
        placeholder={t('common_labels.referralCode')}
      />
      <Space mB={10} />

      <AppInput
        control={control}
        error={errors.password?.message}
        keyboardType="default"
        name="password"
        placeholder={t('common_labels.createPassword')}
        secureTextEntry
      />
      <Space mB={10} />

      <AppInput
        control={control}
        error={errors.password?.message}
        keyboardType="default"
        name="confirmPassword"
        placeholder={t('common_labels.reTypePassword')}
        secureTextEntry
      />
      <Space mB={30} />

      <AppButton
        bgColor={colors.greenPrimary}
        onPress={handleSubmit(onSignup)}
        // onPress={() =>
        //   openModal('forgotPassword', {
        //     email: 'user@example.com',
        //     type: 'phoneNum',
        //   })
        // }
        title={t('screen_signUp.signup')}
        variant="gradient"
        shadow={false}
      />

      <View style={styles.continueWithCont}>
        <Divider
          color={colors.darkStroke}
          height={1}
          width="10%"
          alignSelf="center"
        />

        <AppText
          title={t('screen_signUp.orSignUpWith')}
          variant="body3-openSans-light"
          alignSelf="center"
          color={colors.textSecondary}
          fontSize={12}
          fontFamily="regular"
          extraStyle={layout.pH(10)}
        />

        <Divider
          color={colors.darkStroke}
          height={1}
          width="10%"
          alignSelf="center"
        />
      </View>

      <View style={[layout.rowCenter, layout.justifyBetween]}>
        <View style={layout.flex(0.35)}>
          <AppButton
            // onPress={openHelpCenter}
            bgColor={colors.white}
            onPress={handleSubmit(onSignup)}
            title={t('common_labels.google')}
            variant="outlined"
            SVGLeft={
              <SVG.Google
                width={normalizeWidth(20)}
                height={normalizeHeight(20)}
              />
            }
            shadow={false}
            width={'90%'}
            outlinedColor={colors.lightStroke}
            extraStyle={{
              title: [layout.color(colors.black), FONTS_FAMILY.regular as any],
            }}
          />
        </View>

        <View style={layout.flex(0.35)}>
          <AppButton
            width={'90%'}
            // onPress={openHelpCenter}
            onPress={handleSubmit(onSignup)}
            bgColor={colors.white}
            SVGLeft={
              <SVG.Apple
                width={normalizeHeight(20)}
                height={normalizeHeight(20)}
              />
            }
            title={t('common_labels.apple')}
            outlinedColor={colors.lightStroke}
            variant="outlined"
            shadow={false}
            extraStyle={{
              title: [layout.color(colors.black), FONTS_FAMILY.regular as any],
            }}
          />
        </View>

        <View style={layout.flex(0.35)}>
          <AppButton
            width={'90%'}
            // onPress={openHelpCenter}
            onPress={handleSubmit(onSignup)}
            bgColor={colors.white}
            SVGLeft={
              <SVG.Facebook
                width={normalizeHeight(20)}
                height={normalizeHeight(20)}
              />
            }
            title={t('common_labels.facebook')}
            outlinedColor={colors.lightStroke}
            variant="outlined"
            shadow={false}
            extraStyle={{
              title: [layout.color(colors.black), FONTS_FAMILY.regular as any],
            }}
          />
        </View>
      </View>
      <Space mB={30} />

      <AppText
        title={t('screen_signUp.alreadyHaveAnAcc')}
        color={colors.textMain}
        alignSelf="center"
        fontSize={15}
        fontFamily="medium"
      >
        <AppText
          title={` ${t('screen_signUp.loginNow')}`}
          onPress={() => navigation.goBack()}
          color={colors.yellowSecondary}
          extraStyle={layout.textDecorationLine('underline')}
          fontSize={15}
          fontFamily="bold"
        />
      </AppText>
      <Space mB={20} />
    </AppScreen>
  );
};

export default LoginScreen;
