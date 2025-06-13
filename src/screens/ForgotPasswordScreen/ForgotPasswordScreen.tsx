import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import {
  AppButton,
  AppInput,
  AppText,
  Header,
  IconByVariant,
  Space,
} from '@/components/atoms';
import { AppModalCentered } from '@/components/molecules';
import { AppScreen } from '@/components/templates';

import { forgotPasswordSchema } from '@/utils/schemas';
import { ForgotPassForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth } from '@/utils/sizes';

import useStyles from './style';

const ForgotPasswordScreen: React.FC<
  RootScreenProps<Paths.ForgotPasswordScreen>
> = ({ navigation }) => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(forgotPasswordSchema(t)) });

  const onContinuePress = (value: ForgotPassForm) => {
    console.debug('🚀 ~ onContinuePress ~ value:', value);
    navigation.navigate(Paths.ChangePasswordScreen);
  };

  return (
    <AppScreen pH>
      <Header title={t('common_labels.forgetPassword')} />
      <Space mB={30} />

      <View style={layout.alignSelf('center')}>
        <IconByVariant
          path={'forgotPass'}
          width={normalizeWidth(120)}
          height={normalizeHeight(140)}
        />
      </View>
      <Space mB={50} />

      <AppText
        title={t('common_labels.forgetPassword')}
        alignSelf="center"
        fontSize={24}
        fontFamily="DMBold"
        color={colors.darkCharcoal}
      />
      <Space mB={20} />

      <AppText
        title={t('screen_forgot.forgotDes')}
        alignSelf="center"
        fontSize={15}
        fontFamily="DMRegular"
        color={colors.darkCharcoal}
        textAlign="center"
      />
      <Space mB={20} />

      <AppInput
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        name="email"
        SVGLeft={
          <SVG.Email width={normalizeWidth(19)} height={normalizeHeight(19)} />
        }
        placeholder={t('placeholder.email')}
        label={t('common_labels.email')}
      />
      <Space mB={20} />

      <AppButton
        bgColor={colors.primary}
        onPress={handleSubmit(onContinuePress)}
        title={t('common_labels.continue')}
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

export default ForgotPasswordScreen;
