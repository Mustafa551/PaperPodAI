import { zodResolver } from '@hookform/resolvers/zod';
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
  Header,
  IconByVariant,
  Note,
  Space,
} from '@/components/atoms';
import { AppModalCentered } from '@/components/molecules';
import { AppScreen } from '@/components/templates';

import { maskEmail } from '@/utils/helpers';
import { changePasswordSchema } from '@/utils/schemas';
import { ChangePassForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth } from '@/utils/sizes';

import useStyles from './style';

const ChangePasswordScreen: React.FC<
  RootScreenProps<Paths.ChangePasswordScreen>
> = ({ navigation }) => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(changePasswordSchema(t)) });

  const onPressResend = () => {};

  const onCreatePress = (value: ChangePassForm) => {
    console.debug('🚀 ~ onContinuePress ~ value:', value);
  };

  return (
    <AppScreen preset="scroll" pH>
      <Header title={t('common_labels.forgetPassword')} />

      <View style={layout.alignSelf('center')}>
        <IconByVariant
          path={'verifyKey'}
          width={normalizeWidth(120)}
          height={normalizeHeight(140)}
        />
      </View>

      <AppText
        title={t('screen_forgot.forgotHeading')}
        alignSelf="center"
        fontSize={24}
        textAlign="center"
        fontFamily="DMBold"
        color={colors.darkCharcoal}
      />
      <Space mB={15} />

      <AppText
        title={t('screen_forgot.sendaCode')}
        alignSelf="center"
        fontSize={16}
        fontFamily="DMRegular"
        color={colors.darkCharcoal}
        textAlign="center"
      />

      <AppText
        title={maskEmail('mustafa@algoace.com')}
        alignSelf="center"
        fontSize={16}
        fontFamily="DMBold"
        color={colors.darkCharcoal}
        textAlign="center"
      />
      <Space mB={20} />

      <AppText
        title={`${t('common_labels.resendCode')} ${t('common_labels.in')} `}
        color={colors.black}
        alignSelf="center"
        fontSize={15}
        fontFamily="DMMedium"
      >
        <AppText
          title={`${56} ${t('common_labels.sec')}`}
          // onPress={onSignUp}
          color={colors.accent}
          fontSize={15}
          fontFamily="DMSemi"
        />
      </AppText>

      <AppButton
        // onPress={openHelpCenter}
        bgColor={colors.white}
        onPress={onPressResend}
        title={t('common_labels.resendCode')}
        variant="outlined"
        shadow={false}
        outlinedColor={colors.primary}
        extraStyle={{
          button: { borderWidth: 0.5 },
          title: [layout.fontFamily(FONTS_FAMILY.DMSemi)],
        }}
        disabled
      />
      <Space mB={20} />

      <AppInput
        control={control}
        error={errors.password?.message}
        name="password"
        SVGLeft={
          <SVG.Lock width={normalizeWidth(19)} height={normalizeHeight(19)} />
        }
        placeholder={t('placeholder.password')}
        label={t('common_labels.password')}
        secureTextEntry
      />
      <Space mB={10} />
      <Note title={t('common_labels.passwordRequirement')} />
      <Space mB={10} />

      <AppInput
        control={control}
        error={errors.confirmPassword?.message}
        name="confirmPassword"
        SVGLeft={
          <SVG.Lock width={normalizeWidth(19)} height={normalizeHeight(19)} />
        }
        placeholder={t('placeholder.confirmPassword')}
        label={t('common_labels.confirmPassword')}
        secureTextEntry
      />
      <Space mB={20} />

      <AppButton
        bgColor={colors.primary}
        onPress={handleSubmit(onCreatePress)}
        title={t('common_labels.createPassword')}
        variant="gradient"
        shadow={false}
      />

      <AppModalCentered
        btn1Title="Got it"
        btn2Title="Submit Request"
        description="Congratulations! You have successfully accepted the job invitation. The client will be notified, and you can now start working on the project."
        icon={
          <SVG.Fire height={normalizeHeight(50)} width={normalizeWidth(50)} />
        }
        onClose={() => {}}
        title="Job Accepted!"
        visible={false}
      />
    </AppScreen>
  );
};

export default ChangePasswordScreen;
