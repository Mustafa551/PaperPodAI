import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { useImagePicker } from '@/hooks';

import {
  AppButton,
  AppImage,
  AppInput,
  AppText,
  Header,
  Space,
} from '@/components/atoms';
import { Dropdown } from '@/components/atoms/DropDown/DropDown';
import { AppScreen } from '@/components/templates';

import {
  DRIVING_LIC,
  ID_DROPDOWN,
  UPLOAD_ID,
  UPLOAD_PASSPORT,
} from '@/constant';
import { useModal } from '@/context/ModalProvider';
import { Toast } from '@/utils/native';
import { AdditionalInfoSchema } from '@/utils/schemas';
import { AdditionalInfoFormType } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth, pixelSizeY } from '@/utils/sizes';

import { useStyles } from './style';

const AdditionalInfoScreen = () => {
  const { colors, layout, } = useTheme();
  const { onPressImageUpload } = useImagePicker();
  const { t } = useTranslation();
  const styles = useStyles();
  const { openModal } = useModal();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<AdditionalInfoFormType>({
    resolver: zodResolver(AdditionalInfoSchema(t)),
    defaultValues: {
      idType: 'idCard',
      idNumber: '',
      idImages: [],
      drivingLicenseImages: [],
    },
  });
  const idType = watch('idType');
  const drivingLicenseImages = watch('drivingLicenseImages');
  const IDimages = watch('idImages');
  const profileImg = watch('profileImg');

  const onPressCamera = async (ind: number, type: string) => {
    // calling hook function
    onPressImageUpload({
      callBck: (imageAssets: ImagePickerResponse) => {
        console.log('result in main file is', imageAssets);

        if (imageAssets.assets && imageAssets.assets.length > 0) {
          if (imageAssets.assets[0].fileSize! > 5 * 1024 * 1024) {
            Toast(t('errors.imageSizeLimit'));
            return;
          }

          if (type === 'profile') {
            setValue('profileImg', imageAssets.assets[0].uri!);
          } else if (type === 'id') {
            const currentImages = getValues('idImages');
            const updatedImages = [...currentImages];
            updatedImages[ind] = imageAssets.assets[0].uri!;
            setValue('idImages', updatedImages);
          } else {
            const currentImages = getValues('drivingLicenseImages');
            const updatedImages = [...currentImages];
            updatedImages[ind] = imageAssets.assets[0].uri!;
            setValue('drivingLicenseImages', updatedImages);
          }
        }
      },
    });
  };

  const onUploadDocument = () => {};
  return (
    <AppScreen
      ScrollViewProps={{
        contentInsetAdjustmentBehavior: 'scrollableAxes',
        scrollEventThrottle: 16,
        showsVerticalScrollIndicator: false,
      }}
      preset="scroll"
      pH
    >
      <Header empty />

      <AppText
        title={t('screen_AdditionalInfo.additionalInfo')}
        alignSelf="center"
        fontSize={30}
        fontFamily="bold"
        color={colors.textMain}
      />

      <View
        style={[
          layout.alignSelf('center'),
          layout.mT(pixelSizeY(30)),
          layout.itemsCenter,
        ]}
      >
        <AppImage
          uri={profileImg}
          style={styles.porfileImg}
          resizeMode="cover"
          imgStyle={{ borderRadius: 100 }}
          onPress={() => onPressCamera(0, 'profile')}
        >
          <SVG.CamerPrimary
            height={normalizeHeight(20)}
            width={normalizeWidth(20)}
            fill={profileImg ? colors.white : colors.darkStroke}
            style={{ color: colors.white }}
          />
        </AppImage>
        {errors.profileImg?.message && (
          <AppText
            color={colors.redError}
            fontFamily="regular"
            alignSelf="center"
            title={errors.profileImg?.message}
            fontSize={11}
            extraStyle={layout.mT(5)}
          />
        )}
        <Space mB={20} />

        <AppText
          title={t('screen_AdditionalInfo.uploadAProfile')}
          alignSelf="center"
          fontSize={17}
          fontFamily="regular"
          color={colors.textSecondary}
        />
      </View>
      <Space mB={30} />

      <Controller
        control={control}
        name="idType"
        render={({ field }) => (
          <Dropdown
            label={t('screen_AdditionalInfo.selectIdType')}
            placeholder={t('placeholder.selectIdType')}
            options={ID_DROPDOWN}
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              const getTempImg = getValues('idImages');
              if (getTempImg.length > 1 && e === 'passport') {
                setValue('idImages', [getTempImg[0]]);
              }
            }}
          />
        )}
      />
      {errors.idType?.message && (
        <AppText
          color={colors.redError}
          fontFamily="regular"
          title={errors.idType?.message}
          variant="body4-openSans"
        />
      )}
      <Space mB={20} />

      <AppInput
        control={control}
        error={errors.idNumber?.message}
        name="idNumber"
        placeholder={t('screen_AdditionalInfo.idNumber')}
        label={t('placeholder.writeHere')}
      />
      <Space mB={20} />

      {(idType === 'idCard' ? UPLOAD_ID : UPLOAD_PASSPORT).map((val, ind) => (
        <View key={ind}>
          {val?.title && (
            <AppText
              title={val.title}
              fontSize={14}
              fontFamily="regular"
              color={colors.textSecondary}
            />
          )}
          <Space mB={10} />
          <AppImage
            uri={IDimages[ind] || ''}
            style={styles.imgCont}
            resizeMode="cover"
            imgStyle={styles.img}
            onPress={() => onPressCamera(ind, 'id')}
            overlayStyle={layout.bgColor(colors.glassBlack)}
            {...(IDimages[ind] && {
              iconStyle: [
                layout.bgColor(colors.glassBlack),
                layout.borderRadius(8),
              ],
            })}
          >
            <SVG.Document
              height={normalizeHeight(30)}
              width={normalizeWidth(30)}
              fill={IDimages[ind] ? colors.white : colors.textSecondary}
            />
            {IDimages[ind] ? (
              <AppText
                title={t('screen_AdditionalInfo.change')}
                color={colors.white}
                fontSize={14}
                alignSelf="center"
                marginVertical={normalizeHeight(5)}
                onPress={() => onPressCamera(ind, 'id')}
              />
            ) : (
              <AppText
                title={val.subTitle}
                color={colors.textSecondary}
                fontSize={14}
                alignSelf="center"
                marginVertical={normalizeHeight(5)}
                onPress={() => onPressCamera(ind, 'id')}
              >
                <AppText
                  title={` ${t('screen_AdditionalInfo.imgRequirement')}`}
                  color={colors.placeHolderText}
                  fontSize={14}
                  alignSelf="center"
                  marginVertical={normalizeHeight(5)}
                  onPress={() => onPressCamera(ind, 'id')}
                ></AppText>
              </AppText>
            )}
          </AppImage>
        </View>
      ))}
      {errors.idImages?.message && (
        <AppText
          color={colors.redError}
          fontFamily="regular"
          title={errors.idImages?.message}
          fontSize={11}
        />
      )}

      <Space mB={20} />

      <AppText
        title={t('screen_AdditionalInfo.uploadDrivingLic')}
        fontSize={14}
        fontFamily="regular"
        color={colors.textSecondary}
      />
      <Space mB={10} />

      {DRIVING_LIC.map((val, ind) => (
        <AppImage
          key={ind}
          uri={drivingLicenseImages[ind]}
          style={styles.imgCont}
          resizeMode="cover"
          imgStyle={styles.img}
          onPress={() => onPressCamera(ind, 'licencse')}
          {...(drivingLicenseImages[ind] && {
            iconStyle: [
              layout.bgColor(colors.glassBlack),
              layout.borderRadius(8),
            ],
          })}
        >
          <SVG.Document
            height={normalizeHeight(30)}
            width={normalizeWidth(30)}
            fill={
              drivingLicenseImages[ind] ? colors.white : colors.textSecondary
            }
          />

          {drivingLicenseImages[ind] ? (
            <AppText
              title={t('screen_AdditionalInfo.change')}
              color={colors.white}
              fontSize={14}
              alignSelf="center"
              marginVertical={normalizeHeight(5)}
              onPress={() => onPressCamera(ind, 'id')}
            />
          ) : (
            <AppText
              title={val.subTitle}
              color={colors.textSecondary}
              fontSize={14}
              alignSelf="center"
              marginVertical={normalizeHeight(5)}
              onPress={() => onPressCamera(ind, 'licencse')}
            >
              <AppText
                title={` ${t('screen_AdditionalInfo.imgRequirement')}`}
                color={colors.placeHolderText}
                fontSize={14}
                alignSelf="center"
                marginVertical={normalizeHeight(5)}
                onPress={() => onPressCamera(ind, 'licencse')}
              ></AppText>
            </AppText>
          )}
        </AppImage>
      ))}
      {errors?.drivingLicenseImages?.message && (
        <AppText
          color={colors.redError}
          fontFamily="regular"
          title={errors.drivingLicenseImages.message}
          fontSize={11}
        />
      )}
      <Space mB={20} />

      <View style={layout.rowCenterBt}>
        <View style={layout.flex1}>
          <AppButton
            shadow={false}
            title={t('screen_AdditionalInfo.skipForNow')}
            width="100%"
            variant="outlined"
            onPress={() => {
              openModal('responseMessage', {
                icon: <SVG.PrimaryVerified />,
                title: t('screen_AdditionalInfo.profileCompleted'),
                description: t('screen_AdditionalInfo.profileCompleteMsg'),
                btn1Title: t('screen_AdditionalInfo.letsStart'),
              });
            }}
          />
        </View>
        <Space mH={5} />

        <View style={layout.flex1}>
          <AppButton
            onPress={handleSubmit(onUploadDocument)}
            shadow={false}
            title={t('screen_AdditionalInfo.uploadDoc')}
            width="100%"
          />
        </View>
      </View>

      <Space mB={20} />
    </AppScreen>
  );
};

export default AdditionalInfoScreen;
