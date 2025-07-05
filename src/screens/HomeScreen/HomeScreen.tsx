import { AppButton, AppInput, AppText, Space } from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { IMAGES } from '@/theme/assets/images';
import { homeSearchSchema } from '@/utils/schemas';
import { pixelSizeX, pixelSizeY, WIDTH } from '@/utils/sizes';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import useStyles from './style';
import { AppCard, AppGradientModal, AppModalCentered, NewUploadBanner, SubscriptionBanner } from '@/components/molecules';

const data = [
{
          title: 'AI in Healthcare: Breakthroughs in 2025',
          institute: 'Stanford University',
          date: 'May 3, 2025',
          description:
            'This paper explores cutting-edge applications of artificial intelligence in diagnostics, predictive care...',
          prof: 'Dr. Emily Rao',
          image:
            'https://img.freepik.com/free-photo/top-view-hand-writing-love-letter_23-2150716552.jpg',
        },
        {
          title: 'AI in Healthcare: Breakthroughs in 2025',
          institute: 'Stanford University',
          date: 'May 3, 2025',
          description:
            'This paper explores cutting-edge applications of artificial intelligence in diagnostics, predictive care...',
          prof: 'Dr. Emily Rao',
          image:
            'https://img.freepik.com/free-photo/top-view-hand-writing-love-letter_23-2150716552.jpg',
        },
        {
          title: 'AI in Healthcare: Breakthroughs in 2025',
          institute: 'Stanford University',
          date: 'May 3, 2025',
          description:
            'This paper explores cutting-edge applications of artificial intelligence in diagnostics, predictive care...',
          prof: 'Dr. Emily Rao',
          image:
            'https://img.freepik.com/free-photo/top-view-hand-writing-love-letter_23-2150716552.jpg',
        }
]

const HomeScreen = () => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const scrollOffsetValue = useSharedValue<number>(0);
  const progress = useSharedValue<number>(0);

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
      // style={layout.pH(pixelSizeX(10))}
    >
      <View style={layout.pH(pixelSizeX(10))}>
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
      <Space mB={20} />

      {data.map((val) => (

        
        <AppCard
        data={val}
        />
      ))}
      <Space mB={20} />

      <View style={layout.relative}>
        <Carousel
          testID={'xxx'}
          loop={true}
          width={WIDTH * 0.95}
          autoPlay
          height={200}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlayInterval={2000}
          data={[
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
            'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
            'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
            'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          ]}
          defaultScrollOffsetValue={scrollOffsetValue}
          style={{ width: '100%' }}
          onScrollStart={() => {
            console.log('Scroll start');
          }}
          onScrollEnd={() => {
            console.log('Scroll end');
          }}
          onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
            'worklet';
            g.enabled(false);
          }}
          onProgressChange={progress}
          onSnapToItem={(index: number) => console.log('current index:', index)}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.crouselImage}
              resizeMode="cover"
            />
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={[
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
          ]}
          dotStyle={{
            backgroundColor: colors.grey,
            height: 10,
            width: 10,
            borderRadius: 5,
          }}
          activeDotStyle={{ backgroundColor: colors.white }}
          containerStyle={styles.dotContainer}
        />
      </View>
      <Space mB={40} />
</View>
      <SubscriptionBanner
        description="Want to listen to your own research as a podcast?"
        btnTitle="Upgrade to Upload Your Own Papers"
      />

      <NewUploadBanner />

      <Space mB={20}/>

      {/* <AppModalCentered visible={true} onClose={() => {}} btn2Title='Upgrade to Pro Plan' title='Upgrade To Pro Plan' description='To upload your own research papers and turn them into personalized better audio, and faster processing, you’ll need a premium plan.' /> */}
      {/* <AppGradientModal data={{...data[0], description: `AI is transforming climate modeling by improving prediction accuracy and processing speed.

It helps analyze vast environmental data and detect complex patterns.

Researchers use AI to simulate climate scenarios more efficiently.

This innovation supports better forecasting and smarter environmental decisions.`}}  visible={true} onClose={() => {}} /> */}
    </AppScreen>
  );
};

export default HomeScreen;
