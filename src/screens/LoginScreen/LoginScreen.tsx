import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS_FAMILY } from '@/theme/fonts';

import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Divider,
  Space,
} from '@/components/atoms';
import { AppModalCentered } from '@/components/molecules';
import { AppScreen } from '@/components/templates';

import { signInSchema } from '@/utils/schemas';
import { SignInForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth } from '@/utils/sizes';

import useStyles from './style';
import { useModal } from '@/context/ModalProvider';
import { useTranslation } from 'react-i18next';

const LoginScreen: React.FC<RootScreenProps<Paths.LoginScreen>> = ({
  navigation,
}) => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(signInSchema(t)) });
  const { openModal } = useModal();

  const onSignin = (value: SignInForm) => {
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
      <Space mB={40} />

      <AppText
        title={t('screen_login.welcomeBack')}
        // alignSelf="center"
        fontSize={30}
        fontFamily="bold"
        color={colors.textMain}
      />
      <Space mB={30} />

      <AppInput
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        name="email"
        // SVGLeft={
        //   <SVG.Email width={normalizeWidth(19)} height={normalizeHeight(19)} />
        // }
        placeholder={t('placeholder.email')}
        // label={t('common_labels.email')}
      />
      <Space mB={20} />

      <AppInput
        control={control}
        error={errors.password?.message}
        keyboardType="default"
        name="password"
        placeholder={t('placeholder.password')}
        secureTextEntry
        // SVGLeft={
        //   <SVG.Lock width={normalizeWidth(19)} height={normalizeHeight(19)} />
        // }
        // label={t('common_labels.password')}
      />
      <Space mB={5} />

      <AppText
        onPress={() =>
          openModal('otpConfirm', {
            email: 'user@example.com',
            type: 'passwordReset',
          })
        }
        title={t('common_labels.forgetPassword')}
        alignSelf="flex-end"
        fontSize={15}
        fontFamily="semibold"
        color={colors.textSecondary}
      />
      <Space mB={30} />

      <AppButton
        bgColor={colors.greenPrimary}
        // onPress={handleSubmit(onSignin)}
        onPress={() =>
          // openModal('forgotPassword', {
          //   email: 'user@example.com',
          //   type: 'phoneNum',
          // })
          navigation.navigate(Paths.AdditionalInfoScreen)
        }
        title={t('common_labels.login')}
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
          title={t('screen_login.orContWith')}
          variant="body3-openSans-light"
          alignSelf="center"
          color={colors.textSecondary}
          fontSize={12}
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
            onPress={handleSubmit(onSignin)}
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
            onPress={handleSubmit(onSignin)}
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
            onPress={handleSubmit(onSignin)}
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
      <Space mB={60} />

      <AppText
        title={t('screen_login.dontHaveAcc')}
        color={colors.textMain}
        alignSelf="center"
        fontSize={15}
        fontFamily="medium"
      >
        <AppText
          title={t('common_labels.registerNow')}
          onPress={() => navigation.navigate(Paths.SignUpScreen)}
          color={colors.yellowSecondary}
          extraStyle={layout.textDecorationLine('underline')}
          fontSize={15}
          fontFamily="bold"
        />
      </AppText>
      <Space mB={20} />

      <AppModalCentered
        btn1Title="Got it"
        btn2Title="Submit Request"
        description="Congratulations! You have successfully accepted the job invitation. The client will be notified, and you can now start working on the project."
        // icon={
        // <SVG.Fire height={normalizeHeight(50)} width={normalizeWidth(50)} />
        // }
        onClose={() => {}}
        title="Job Accepted!"
        visible={false}
      />

      {/* openModal('responseMessage', {
            // btn1Title: 'Got it',
            // btn2Title: 'Submit Request',
            description: 'Now you can access your account.',
            icon: (
              <SVG.TickPrimary
                height={normalizeHeight(50)}
                width={normalizeWidth(50)}
              />
            ),

            title: 'Email Verified!',
          }) */}

      {/* <View style={layout.alignSelf('center')}>
        <ProfileImage />
      </View> */}
      {/* <ImageShowcase
        images={[
          'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
          'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvS8XRlRIzQ_lvu0EZy88MrE-UkMYfDTPjYQ&s',
          'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        ]}
      /> */}
      {/* <Collapsible
        title="Job started"
        date="05th March 2025"
        leftIcon={<SVG.Fire height={20} width={20} />}
      >
        <View>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
        </View>
      </Collapsible> */}
      {/* <AppImageCrousel
        images={[
          'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
          'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvS8XRlRIzQ_lvu0EZy88MrE-UkMYfDTPjYQ&s',
          'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        ]}
      /> */}
    </AppScreen>
  );
};

export default LoginScreen;
