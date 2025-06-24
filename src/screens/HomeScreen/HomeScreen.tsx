import { View, Text, Image } from 'react-native';
import React from 'react';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { pixelSizeX, pixelSizeY, WIDTH } from '@/utils/sizes';
import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Space,
} from '@/components/atoms';
import { IMAGES } from '@/theme/assets/images';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { homeSearchSchema } from '@/utils/schemas';
import { useTranslation } from 'react-i18next';
import { SVG } from '@/theme/assets/icons';
// import { SwiperFlatList } from 'react-native-swiper-flatlist';

const HomeScreen = () => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(homeSearchSchema(t)) });

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
      index={2}
      showPagination
      data={[{image: IMAGES.homeBanner,},{image: IMAGES.homeBanner,},{image: IMAGES.homeBanner,}]}
      renderItem={({ item }) => (
        <Image
        source={item.image}
        style={{ width: '100%' }}
        resizeMode="cover"
      />
      )}
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
    </AppScreen>
  );
};

export default HomeScreen;
