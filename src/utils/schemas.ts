import type { TFunction } from 'i18next';

import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js';
import { z } from 'zod';

import { REGEX } from './regex';

export const signInSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t('errors.emailReq'))
      .email(t('errors.invalidEmail')),
    password: z
      .string()
      .trim()
      .refine((value) => value.trim().length > 0, {
        message: t('errors.passReq'),
      }),
  });

export const signUpSchema = (t: TFunction) =>
  z
    .object({
      firstName: z
        .string()
        .min(1, t('errors.firstNameReq'))
        .max(25, t('errors.nameMax'))
        .refine((val) => val.length >= 2, { message: t('errors.nameMin') })
        .refine((val) => REGEX.firstName.test(val), {
          message: t('errors.firstNameValid'),
        }),
      lastName: z
        .string()
        .min(2, t('errors.lastNameReq'))
        .max(25, t('errors.nameMax'))
        .refine((val) => val.length >= 2, { message: t('errors.nameMin') })
        .refine((val) => REGEX.lastName.test(val), {
          message: t('errors.lastNameValid'),
        }),
      email: z
        .string()
        .min(1, t('errors.emailReq'))
        .email(t('errors.invalidEmail')),
      location: z.string().min(1, t('errors.locationReq')),
      referralCode: z.string().optional(),
      password: z
        .string()
        .trim()
        .refine((value) => value.trim().length > 0, {
          message: t('errors.passReq'),
        }),
      confirmPassword: z
        .string()
        .trim()
        .refine((value) => value.trim().length > 0, {
          message: t('errors.confirmPassReq'),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.confrimPasswordNotMatch'),
      path: ['confirmPassword'],
    });

export const forgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t('errors.emailReq'))
      .email(t('errors.invalidEmail')),
  });

export const changePasswordSchema = (t: TFunction) =>
  z
    .object({
      password: z
        .string()
        .trim()
        .min(1, t('errors.passReq'))
        .max(256, t('errors.passwordLong'))
        .refine((value) => REGEX.password.test(value.trim()), {
          message: t('errors.passwordInc'),
        }),

      confirmPassword: z
        .string()
        .trim()
        .refine((value) => value.trim().length > 0, {
          message: t('errors.confirmPassReq'),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.confrimPasswordNotMatch'),
      path: ['confirmPassword'],
    });

export const otpSchema = (screen: string, t: TFunction) =>
  z
    .object({
      otp: z
        .string()
        .min(1, { message: t('errors.enterOtp') })
        .length(6, { message: t('errors.otp6Digits') }),

      newPassword:
        screen === 'passwordReset'
          ? z
              .string()
              .trim()
              .min(1, t('errors.passReq'))
              .max(256, t('errors.passwordLong'))
              .refine((value) => REGEX.password.test(value.trim()), {
                message: t('errors.passwordInc'),
              })
          : z.string().trim().optional(),

      confirmPassword:
        screen === 'passwordReset'
          ? z
              .string()
              .trim()
              .refine((value) => value.trim().length > 0, {
                message: t('errors.confirmPassReq'),
              })
          : z.string().trim().optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('errors.confrimPasswordNotMatch'),
      path: ['confirmPassword'],
    });

export const forgotEmailSchema = (t: TFunction, type: string) =>
  z.object({
    email:
      type === 'forgotEmail'
        ? z
            .string()
            .min(1, t('errors.emailReq'))
            .email(t('errors.invalidEmail'))
        : z.string().optional(),
    phone:
      type === 'forgotEmail'
        ? z.string().optional()
        : z
            .string()
            .min(1, t('errors.phoneNumReq'))
            .refine(
              (value) => {
                try {
                  const number = value.split('-');
                  const phoneNumber = parsePhoneNumberFromString(
                    number[1],
                    number[0] as CountryCode,
                  );
                  return phoneNumber?.isValid() || false;
                } catch {
                  return false;
                }
              },
              { message: t('errors.invalidPhoneNum') },
            ),
  });

export const AdditionalInfoSchema = (t: TFunction) =>
  z
    .object({
      profileImg: z.string().min(1, t('errors.profilePicReq')),
      idType: z.string().min(1, t('errors.selectIdType')),
      idNumber: z.string().min(1, t('errors.idNumReq')),
      idImages: z.array(z.any()),
      drivingLicenseImages: z.array(z.any()),
    })
    .superRefine((data, ctx) => {
      const hasEmpty = (arr: any[]) => arr.some((item) => !item || item === '');

      if (data.idType === 'idCard') {
        if (data.idImages.length !== 2 || hasEmpty(data.idImages)) {
          ctx.addIssue({
            path: ['idImages'],
            code: z.ZodIssueCode.custom,
            message: t('errors.uploadIdCard'),
          });
        }
      }

      if (data.idType === 'passport') {
        if (data.idImages.length !== 1 || hasEmpty(data.idImages)) {
          ctx.addIssue({
            path: ['idImages'],
            code: z.ZodIssueCode.custom,
            message: t('errors.uploadPassport'),
          });
        }
      }

      if (
        data.drivingLicenseImages.length !== 2 ||
        hasEmpty(data.drivingLicenseImages)
      ) {
        ctx.addIssue({
          path: ['drivingLicenseImages'],
          code: z.ZodIssueCode.custom,
          message: t('errors.uploadLicense'),
        });
      }
    });
