import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { useTheme } from '@/theme';

import { otpSchema } from '@/utils/schemas';
import { otpPasswordForm } from '@/utils/schemasTypes';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  pixelSizeY,
} from '@/utils/sizes';

import AppButton from '../AppButton/AppButton';
import AppInput from '../AppInput/AppInput';
import AppText from '../AppText/AppText';
import Divider from '../Divider/Divider';
import Space from '../Space/Space';

interface OTPConfirmModalProps {
  type?: 'emailVerification' | 'passwordReset'; // Define use cases
  email?: string;
  title?: string;
  subtitle?: string;
  onVerify?: () => void;
  onResend?: () => void;
  snapModal?: () => void;
}

const OTPConfirmModalContent: React.FC<OTPConfirmModalProps> = ({
  type = 'emailVerification',
  email = 'your email',
  onVerify,
  onResend,
  snapModal,
}) => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<otpPasswordForm>({
    resolver: zodResolver(otpSchema(type, t)),
  });
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  console.debug('🚀 ~ errors:', errors);

  const onPressVerify = (e: otpPasswordForm) => {
    console.debug('🚀 ~ onPressVerify ~ e:', e);
  };

  const onBlur = () => {
    shouldHandleKeyboardEvents.value = false;
    snapModal!();
  };

  const onFocus = () => {
    shouldHandleKeyboardEvents.value = true;
  };

  return (
    <View style={layout.padding(32)}>
      <AppText
        title={
          type === 'emailVerification'
            ? t('screen_forgot.checkEmail')
            : t('screen_forgot.verify&resetPass')
        }
        fontSize={24}
        fontFamily="semibold"
        color={colors.textMain}
      />
      <Space mB={10} />

      <AppText
        title={t('screen_forgot.sendaCode')}
        fontSize={14}
        fontFamily="regular"
        color={colors.textSecondary}
      />
      <AppText
        title={email}
        fontSize={14}
        fontFamily="bold"
        color={colors.textSecondary}
      />
      <Space mB={20} />

      {/* OTP Input Placeholder */}
      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <CodeField
            onFocus={() => {
              onFocus();
            }}
            onBlur={() => {
              onBlur();
            }}
            {...props}
            ref={ref}
            value={value}
            onChangeText={(value) => {
              setValue(value);
              field.onChange(value);
            }}
            cellCount={6}
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
      <Space mB={20} />
      {type === 'passwordReset' && (
        <>
          <Divider color={colors.lightStroke} />
          <Space mB={20} />

          <AppInput
            control={control}
            error={errors.newPassword?.message}
            keyboardType="default"
            name="newPassword"
            placeholder={t('placeholder.newPass')}
            secureTextEntry
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <Space mB={10} />

          <AppText
            title={t('common_labels.passwordRequirement')}
            alignSelf="center"
            fontSize={14}
            fontFamily="regular"
            color={colors.textSecondary}
          />
          <Space mB={10} />

          <AppInput
            control={control}
            error={errors.confirmPassword?.message}
            keyboardType="default"
            name="confirmPassword"
            placeholder={t('placeholder.confirmPass')}
            secureTextEntry
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <Space mB={20} />
        </>
      )}

      {/* Verify Button */}
      <AppButton
        onPress={handleSubmit(onPressVerify)}
        bgColor={colors.greenPrimary}
        title={
          type === 'passwordReset'
            ? t('screen_forgot.verify&resetPass')
            : t('screen_forgot.verifyCode')
        }
        variant="gradient"
        shadow={false}
        width="100%"
        // loading
      />
      <Space mB={10} />
      <AppText
        title={t('screen_forgot.didNotGetCode')}
        alignSelf="center"
        fontSize={12}
        fontFamily="regular"
        color={colors.textMain}
      >
        <AppText
          title={' 00:30'}
          alignSelf="center"
          fontSize={12}
          fontFamily="regular"
          color={colors.textMain}
        />
      </AppText>
      <Space mB={10} />

      <AppText
        title={t('common_labels.resend')}
        alignSelf="center"
        fontSize={16}
        fontFamily="bold"
        color={colors.yellowSecondary}
      />
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    title: { fontSize: 18, fontWeight: 'bold' },

    subtitle: { textAlign: 'center', marginBottom: 10 },

    email: { fontWeight: '600' },

    otpInput: { fontSize: 20, marginVertical: 10 },

    timer: { marginTop: 10 },

    resend: { color: 'blue', marginTop: 5 },

    cell: {
      borderColor: colors.inputFields,
      backgroundColor: colors.inputFields,
      borderRadius: pixelSizeY(6),
      borderWidth: 1,
      color: 'black',
      fontSize: normalizeFont(24),
      fontWeight: '500',
      height: normalizeHeight(55),
      paddingTop: pixelSizeY(12),
      textAlign: 'center',
      width: normalizeWidth(50),
    },

    codeFieldRoot: {},

    focusCell: {
      borderColor: colors.lightStroke,
      borderWidth: 2,
    },
  });
};

export default OTPConfirmModalContent;
