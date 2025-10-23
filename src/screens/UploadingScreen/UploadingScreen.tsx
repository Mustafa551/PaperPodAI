import { AppButton, AppInput, AppText, Space } from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS } from '@/theme/fonts';
import { uploadArticle, type UploadArticleFile, type UploadArticlePayload } from '@/store/userSlice/userApiServices';
import { uploadSchema } from '@/utils/schemas';
import { pixelSizeX } from '@/utils/sizes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import DocumentPicker, { isCancel, types as DocumentPickerTypes } from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './style';
import { useNavigation } from '@react-navigation/native';

type UploadFormValues = {
  link?: string;
};

const UploadingScreen: React.FC = () => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const queryClient = useQueryClient();
  const navigation = useNavigation()
  const [selectedFile, setSelectedFile] = useState<UploadArticleFile | null>(null);

  const uploadPayloadRef = useRef<UploadArticlePayload | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<UploadFormValues>({
    defaultValues: { link: '' },
    resolver: zodResolver(uploadSchema(t)),
  });
  const watchedLink = watch('link');
  const hasLinkSelection = Boolean(watchedLink?.trim().length);

  const {
    error: uploadError,
    isError: isUploadError,
    isFetching: isUploading,
    isSuccess: isUploadSuccess,
    refetch: triggerUpload,
  } = useQuery({
    enabled: false,
    queryFn: async () => {
      if (!uploadPayloadRef.current) {
        throw new Error('Missing upload payload');
      }
      return uploadArticle(uploadPayloadRef.current);
    },
    queryKey: ['uploadArticle'],
    retry: 0,
  });

  const handlePickFile = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPickerTypes.pdf],
      });

      const file: UploadArticleFile = {
        name: response.name ?? 'document.pdf',
        type: response.type,
        uri: response.uri,
        size: response.size,
      };

      setSelectedFile(file);
      setValue('link', '');
    } catch (err) {
      if (isCancel(err)) {
        return;
      }

      console.log('🚀 ~ handlePickFile ~ err:', err);
      Toast.show('Unable to select file. Please try again.', Toast.SHORT);
    }
  }, []);

  const onSubmit = useCallback(
    async ({ link }: UploadFormValues) => {
      const trimmedLink = link?.trim();

      if (selectedFile && trimmedLink) {
        Toast.show('Choose either a PDF file or paste a PDF link, not both.', Toast.SHORT);
        return;
      }

      if (!selectedFile && !trimmedLink) {
        Toast.show('Select a PDF or paste a link to continue.', Toast.SHORT);
        return;
      }

      uploadPayloadRef.current = selectedFile
        ? { file: selectedFile }
        : { link: trimmedLink };

      await triggerUpload({ throwOnError: false });
    },
    [selectedFile, triggerUpload],
  );

  const selectedFileName = useMemo(() => {
    if (!selectedFile) {
      return undefined;
    }

    if (selectedFile.name) {
      return selectedFile.name;
    }

    const parts = selectedFile.uri.split('/');
    return parts[parts.length - 1];
  }, [selectedFile]);

  const selectedFileSizeLabel = useMemo(() => {
    if (!selectedFile?.size) {
      return undefined;
    }

    if (selectedFile.size >= 1024 * 1024) {
      return `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`;
    }

    return `${(selectedFile.size / 1024).toFixed(1)} KB`;
  }, [selectedFile]);

  const uploadStatusMeta = useMemo(() => {
    if (isUploading) {
      return { color: colors.primary, label: 'Uploading...' };
    }

    if (isUploadSuccess) {
      return { color: colors.greenSuccess ?? colors.primary, label: 'Uploaded' };
    }

    if (isUploadError) {
      return { color: colors.redError ?? colors.red500 ?? colors.primary, label: 'Failed' };
    }

    if (selectedFile) {
      return { color: colors.grey, label: 'Ready to upload' };
    }

    if (hasLinkSelection) {
      return { color: colors.grey, label: 'Link ready to upload' };
    }

    return null;
  }, [colors, hasLinkSelection, isUploadError, isUploadSuccess, isUploading, selectedFile]);

  const uploadErrorMessage = useMemo(() => {
    if (!isUploadError) {
      return undefined;
    }

    const apiMessage =
      (uploadError as { response?: { data?: { message?: string } } } | undefined)?.response?.data
        ?.message;

    return apiMessage ?? 'Failed to upload. Please try again.';
  }, [isUploadError, uploadError]);

  React.useEffect(() => {
    if (isUploadSuccess) {
      navigation.navigate('UploadingProgressScreen' as never)
      uploadPayloadRef.current = null;
      setSelectedFile(null);
      queryClient.invalidateQueries({ queryKey: ['getPublicArticles'] });
      reset({ link: '' });
    }
  }, [isUploadSuccess, queryClient, reset]);

  React.useEffect(() => {
    if (hasLinkSelection && selectedFile) {
      setSelectedFile(null);
    }
  }, [hasLinkSelection, selectedFile]);

  const renderCard = (title: string, statusLabel: string, statusColor: string) => {
    return (
      <View style={styles.cardCont}>
        <View style={styles.iconCont}>
          <SVG.Upload fill={colors.primary} />
        </View>
        <Space mR={10} />
        <View>
          <AppText title={title} color={colors.black} fontSize={16} fontFamily="regular" />
          <Space mB={5} />
          <AppText title={statusLabel} color={statusColor} fontSize={16} fontFamily="regular" />
        </View>
      </View>
    )
  }

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
      backgroundColor={colors.black}
      style={[layout.pH(pixelSizeX(10))]}
    >
      <View style={[layout.flex1, layout.itemsCenter, layout.justifyCenter]}>
         {/* <Text onPress={()=>{
          navigation.navigate('UploadingProgressScreen')
         }} >
          go to UploadingProgressScreen
         </Text> */}
        <AppText
          title="Upload Any Research PDF, Or Paste A Link Of A Pdf"
          alignSelf="center"
          textAlign="center"
          color={colors.white}
          fontSize={24}
          fontFamily="medium"
        />
        <Space mB={40} />

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isUploading}
          onPress={handlePickFile}
          style={styles.uploadCont}
        >
          <SVG.UploadPrimary />
          <Space mB={5} />

          <AppText
            title={selectedFile ? 'Tap to change file' : 'Click to upload'}
            color={colors.primary}
            fontSize={13}
            fontFamily="regular"
            alignSelf="center"
          />
          <Space mB={10} />

          {selectedFileName ? (
            <>
              <AppText
                title={selectedFileName}
                textAlign="center"
                color={colors.black}
                fontSize={12}
                fontFamily="regular"
                alignSelf="center"
              />
              {selectedFileSizeLabel ? (
                <>
                  <Space mB={4} />
                  <AppText
                    title={selectedFileSizeLabel}
                    textAlign="center"
                    color={colors.grey}
                    fontSize={10}
                    fontFamily="regular"
                    alignSelf="center"
                  />
                </>
              ) : (
                <Space mB={4} />
              )}
            </>
          ) : null}

          <AppText
            textAlign="center"
            title={'Supported format: PDF, Docx \n (max. 800x400px)'}
            color={colors.grey}
            fontSize={10}
            fontFamily="regular"
            alignSelf="center"
          />
        </TouchableOpacity>
        <Space mB={30} />

        <AppInput
          control={control}
          extraStyle={{
            container: [layout.borderRadius(40), layout.minHeight(47)] as any,
            textInput: { fontFamily: FONTS.light },
          }}
          error={errors.link?.message}
          keyboardType="url"
          name="link"
          placeholder={'Paste a link of a pdf'}
        />
        <Space mB={20} />

        <View style={layout.width('100%')}>
          <AppButton
            width={'100%'}
            bgColor={colors.primary}
            onPress={handleSubmit(onSubmit)}
            title={'Upload Papers'}
            variant="gradient"
            shadow={false}
            loading={isUploading}
            disabled={isUploading}
          />
        </View>
        {isUploadError && uploadErrorMessage ? (
          <>
            <Space mB={10} />
            <AppText
              title={uploadErrorMessage}
              color={colors.redError ?? colors.red500}
              fontSize={12}
              fontFamily="regular"
              textAlign="center"
            />
          </>
        ) : null}
      </View>
    </AppScreen>
  );
};

export default UploadingScreen;
