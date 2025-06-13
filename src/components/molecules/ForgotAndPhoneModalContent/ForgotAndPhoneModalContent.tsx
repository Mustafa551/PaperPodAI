import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { FONTS_FAMILY } from '@/theme/fonts';

import {
  AppButton,
  AppInput,
  AppText,
  PhoneNumberInput,
  Space,
} from '@/components/atoms';

import { forgotEmailSchema } from '@/utils/schemas';
import { forgotEmailForm } from '@/utils/schemasTypes';

const ForgotAndPhoneModalContent = ({
  type = 'forgotEmail',
  snapModal = () => null,
}) => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation();
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(forgotEmailSchema(t, type)),
    mode: 'all',
  });

  console.debug('🚀 ~ ForgotAndPhoneModalContent ~ errors:', errors);
  const onBlur = () => {
    shouldHandleKeyboardEvents.value = false;
    snapModal();
  };

  const onFocus = () => {
    shouldHandleKeyboardEvents.value = true;
  };

  const onGetCode = (e: forgotEmailForm) => {
    console.debug('🚀 ~ onGetCode ~ e:', e);
  };
  return (
    <View style={layout.padding(32)}>
      <AppText
        title={
          type === 'forgotEmail'
            ? t('screen_forgot.forgotPassword')
            : t('screen_forgot.enterPhoneNum')
        }
        fontSize={24}
        fontFamily="semibold"
        color={colors.textMain}
      />
      <Space mB={10} />

      <AppText
        title={
          type === 'forgotEmail'
            ? t('screen_forgot.getAVerificationCode')
            : t('screen_forgot.getAPhoneVerificationCode')
        }
        fontSize={14}
        fontFamily="regular"
        color={colors.textSecondary}
      />

      <Space mB={25} />
      {type === 'forgotEmail' ? (
        <AppInput
          control={control}
          error={errors.email?.message}
          keyboardType="email-address"
          name="email"
          placeholder={t('placeholder.email')}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      ) : (
        <PhoneNumberInput
          control={control}
          error={errors.phone?.message}
          name="phone"
          onBlur={onBlur}
          onFocus={onFocus}
        />
      )}
      <Space mB={20} />

      <AppButton
        onPress={handleSubmit(onGetCode)}
        title={t('screen_forgot.getCode')}
        shadow={false}
        width={'100%'}
      />
    </View>
  );
};

export default ForgotAndPhoneModalContent;
