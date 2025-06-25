import {
  AppButton,
  AppInput,
  AppText,
  Space
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { IMAGES } from '@/theme/assets/images';
import { onlyOtpSchema } from '@/utils/schemas';
import { otpPasswordForm } from '@/utils/schemasTypes';
import { pixelSizeX, pixelSizeY } from '@/utils/sizes';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import useStyles from './style';


const HomeScreen = () => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles()

// for otp, start
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
      resolver: zodResolver(onlyOtpSchema(t)),
    });

    // for otp, end

  // const {
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm({ resolver: zodResolver(homeSearchSchema(t)) });

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
      backgroundColor={colors.black}
      style={layout.pH(pixelSizeX(10))}
    >
      <Space mB={60} />

      <AppText
        title={'Welcome Back, User Name'}
        fontSize={24}
        fontWeight={500}
        color={colors.white}
        fontFamily="medium"
      />
      <Space mB={10} />

      <AppText
        title={'Your Research, Now In Audio.'}
        fontSize={16}
        fontWeight={400}
        color={colors.white}
        fontFamily="regular"
      />
      <Space mB={20} />

      <Image
        source={IMAGES.homeBanner}
        style={{ width: '100%' }}
        resizeMode="cover"
      />
      <Space mB={20} />

      <AppInput
        control={control}
        extraStyle={{
          container: [
            layout.borderColor(colors.primary),
            layout.borderRadius(40),
            layout.minHeight(45),
            layout.bgColor(colors.darkShade),
          ] as any,
        }}
        error={errors.search?.message}
        keyboardType="email-address"
        name="search"
        placeholder={'Search'}
        SVGRight={<SVG.Search width={20} height={20} />}
      />
      <Space mB={20} />

      <View style={layout.rowCenterBt}>
        <AppText
          title={'New This Week'}
          fontSize={24}
          fontWeight={500}
          color={colors.white}
          fontFamily="medium"
        />

        <SVG.PlusPrimary />
      </View>

       {/* <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      autoplayLoopKeepAnimation
      index={2}
      showPagination
      paginationStyle={{backgroundColor:'red',height: 50,width: 50}}
      paginationStyleItem={{width: 20, height:20,backgroundColor:'white'}}
      paginationDefaultColor='white'
      pagingEnabled
      paginationActiveColor='blue'
      data={[ IMAGES.homeBanner, IMAGES.homeBanner, IMAGES.homeBanner]}
      renderItem={({ item }) => {
        console.log('first',item)
        
        return(
          <View style={{width: WIDTH * 0.9,height: 200, marginHorizontal: 10}}>

        <Image
        source={{uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'}}
        style={{ width: '100%',height: '100%',borderRadius:10 }}
        resizeMode="cover"
        />
        </View>

      )}}
    /> */}
 

      <View style={{width: '100%', backgroundColor: colors.darkShade, paddingVertical: pixelSizeY(20)}}>
        <AppText
          title={'Want to listen to your own research as a podcast?'}
          fontSize={16}
          textAlign="center"
          width="60%"
          alignSelf="center"
          fontWeight={500}
          color={colors.white}
          fontFamily="medium"
        />
      <Space mB={20} />

        <AppButton
          onPress={() => {}}
          title={'Upgrade to Upload Your Own Papers'}
          variant="gradient"
          shadow={false}
        />
      </View>


      {/* OTP Input Placeholder, start */}
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
      {/* OTP Input Placeholder, end */}

    </AppScreen>
  );
};

export default HomeScreen;
