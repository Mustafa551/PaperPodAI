import { AppButton, AppInput, AppText, Space } from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS } from '@/theme/fonts';
import { uploadSchema } from '@/utils/schemas';
import { normalizeHeight, pixelSizeX } from '@/utils/sizes';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStyles } from './style';

const UploadingScreen: React.FC = () => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation()
  const styles = useStyles()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(uploadSchema(t)) });


  const renderCard = (title: string) => {
    return (
      <View style={styles.cardCont}>
        <View style={styles.iconCont}>
          <SVG.Upload fill={colors.primary} />
          {/* <SVG.TickPrimary fill={colors.primary} /> */}

        </View>
        <Space mR={10} />
        <View>
          <AppText title={title} color={colors.black} fontSize={16} fontFamily='regular' />
          <Space mB={5} />

          <AppText title={'In progress'} color={colors.primary} fontSize={16} fontFamily='regular' />

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

        <AppText title='Upload Any Research PDF, Or Paste A Link Of A Pdf' alignSelf='center' textAlign='center' color={colors.white} fontSize={24} fontFamily='medium' />
        <Space mB={40} />

        <View style={styles.uploadCont}>
          <SVG.UploadPrimary />
          <Space mB={5} />

          <AppText title='Click to upload' color={colors.primary} fontSize={13} fontFamily='regular' alignSelf='center' />
          <Space mB={10} />

          <AppText textAlign='center' title={'Supported format: PDF, Docx \n (max. 800x400px)'} color={colors.grey} fontSize={10} fontFamily='regular' alignSelf='center' />

        </View>
        <Space mB={40} />


        <AppInput
          control={control}
          extraStyle={{
            container: [
              layout.borderRadius(40),
              layout.minHeight(47),
            ] as any,
            textInput: { fontFamily: FONTS.light }
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
            onPress={handleSubmit(() => {})}
            title={'Upload Papers'}
            variant="gradient"
            shadow={false}
          />
        </View>
      </View>

{/* 
      <View style={[layout.flex1, layout.itemsCenter]}>
        <Space mB={80} />

        <SVG.UploadingFrame1 />


        <Space mB={40} />
        <AppText title='We’re Working On It' alignSelf='center' textAlign='center' color={colors.white} fontSize={24} fontFamily='medium' />
        <Space mB={5} />

        <AppText title={'Your paper is being converted. This \n may take a few minutes'} alignSelf='center' textAlign='center' color={colors.white} fontSize={16} fontFamily='regular' />

        {renderCard('AI in Healthcare.pdf')}
      </View> */}

    </AppScreen>
  )
}

export default UploadingScreen  