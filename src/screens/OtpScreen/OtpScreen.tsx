
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';

import {
    AppButton,
    AppText,
    AssetByVariant,
    Space
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';

import { onlyOtpSchema } from '@/utils/schemas';
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import useStyles from './style';

const OtpScreen: React.FC<RootScreenProps<Paths.OtpScreen>> = ({
    navigation,
}) => {
    const { colors, layout } = useTheme();
    const { t } = useTranslation();
    const styles = useStyles();


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: zodResolver(onlyOtpSchema(t)) });



    return (
        <AppScreen
            ScrollViewProps={{ showsVerticalScrollIndicator: false }}
            backgroundColor={colors.black}
            preset="scroll"
            style={layout.pH(pixelSizeX(10))}
        >
            {/* <Space mB={20} /> */}
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
                title={'OTP Verification'}
                fontSize={24}
                fontWeight={500}
                color={"#FFFFFF"}
            // paddingHorizontal={19.5}
            />
            <Space mB={16} />

            <AppText
                title={"Check your email inbox and input the verification code to verify your account"}
                fontSize={14}
                fontWeight={400}
                color={"#F5F5F5"}

            />
            <Space mB={40} />


            {/* OTP Input Placeholder */}
            <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                    <CodeField
                        {...props}
                        ref={ref}
                        value={value}
                        onChangeText={(value) => {
                            setValue(value);
                            field.onChange(value);
                        }}
                        cellCount={4}
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

            <Space mB={50} />

            <View >

                <AppButton
                    bgColor={colors.black}
                    // onPress={handleSubmit(onSignin)}
                    onPress={() => {
                        //    navigation.navigate(Paths.ChangePasswordScreen);
                    }
                    }
                    title={'Resend Code'}
                    variant="outlined"
                    shadow={false}
                />
                <Space mB={15} />


                <AppButton
                    bgColor={colors.primary}
                    // onPress={handleSubmit(onSignin)}
                    onPress={handleSubmit(() => {
                        navigation.navigate(Paths.ChangePasswordScreen);

                    }
                )
                    }
                    title={'Continue'}
                    variant="gradient"
                    shadow={false}
                />

            </View>




            {/* <Space mB={20} /> */}
        </AppScreen>
    );
};

export default OtpScreen;




