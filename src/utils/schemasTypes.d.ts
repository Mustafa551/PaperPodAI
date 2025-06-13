import { z } from 'zod';

import {
  AdditionalInfoSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  otpSchema,
  signInSchema,
} from './schemas';

export type SignInForm = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpForm = z.infer<ReturnType<typeof signUpSchema>>;
export type ForgotPassForm = z.infer<ReturnType<typeof forgotPasswordSchema>>;
export type ChangePassForm = z.infer<ReturnType<typeof changePasswordSchema>>;
export type otpPasswordForm = z.infer<ReturnType<typeof otpSchema>>;
export type forgotEmailForm = z.infer<ReturnType<typeof forgotEmailSchema>>;
export type AdditionalInfoFormType = z.infer<
  ReturnType<typeof AdditionalInfoSchema>
>;
