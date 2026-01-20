import { AppButton, AppInput, AppText, AssetByVariant, Space } from '@/components/atoms';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { homeSearchSchema } from '@/utils/schemas';
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY, WIDTH } from '@/utils/sizes';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import useStyles from './style';
import { AppCard, NewUploadBanner, SubscriptionBanner } from '@/components/molecules';
import { useAppStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { getPublicArticles } from '@/store/userSlice/userApiServices';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '@/theme/assets/images';
import LinearGradient from 'react-native-linear-gradient';


const HomeScreen = () => {
  const { layout, colors } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const scrollOffsetValue = useSharedValue<number>(0);
  const progress = useSharedValue<number>(0);
  const { userData } = useAppStore(state => state)
  const navigation = useNavigation()
  const isSubscribed = userData?.subscriptionStatus === 'active';

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(homeSearchSchema(t)) });

  const { data: publicArticles, error } = useQuery({
    queryKey: ['getPublicArticles'],
    queryFn: () => getPublicArticles(),
  });
  console.log("🚀 ~ HomeScreen ~ error:", error)
  console.log("🚀 ~ HomeScreen ~ publicArticles:new onws!!@@@", publicArticles?.articles)
  const handleItemPress = (item: any) => {
    console.log("item?.audioFilePath", item?.audioFilePath);
    // setShowDetail(true)
    navigation.navigate('AudioPlayerScreen' as never, { item } as never);
    console.log('Item pressed:', item.title);
  };
  const handleMenuPress = (item: any) => {
    console.log('Menu pressed for:', item.title);
  };
  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
      backgroundColor={colors.black}
    >
      <View style={layout.pH(pixelSizeX(10))}>
        <Space mB={60} />

        <AppText
          title={`Welcome Back, ${userData?.name}`}
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
        {
          isSubscribed ? <View style={layout.relative}>
            <Carousel
              testID={'xxx'}
              loop={true}
              width={WIDTH - pixelSizeX(10) * 2}
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

              ]}
              defaultScrollOffsetValue={scrollOffsetValue}
              style={{ width: '100%' }}
              onScrollStart={() => {
                // console.log('Scroll start');
              }}
              onScrollEnd={() => {
                // console.log('Scroll end');
              }}
              onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
                'worklet';
                g.enabled(false);
              }}
              onProgressChange={progress}
              // onSnapToItem={(index: number) => console.log('current index:', index)}
              renderItem={({ item }) => (
                <View style={styles.carouselItemContainer}>
                  <LinearGradient
                    colors={['#090311', '#8A2BE1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientCard}
                  >
                    <View style={styles.gradientContent}>
                      <View style={styles.gradientTextContainer}>
                        <AppText
                          title="Powered by Advanced AI"
                          fontSize={24}
                          lineHeight={22}
                          fontWeight={500}
                          color={colors.white}
                          fontFamily="medium"
                         extraStyle={{ lineHeight:33  }}
                        />
                        <Space mB={8} />
                        <AppText
                          title="Turn papers into podcasts in seconds."
                          fontSize={13}
                          fontWeight={400}
                          color={'rgba(255,255,255,0.9)'}
                          fontFamily="regular"

                        />
                        <TouchableOpacity style={styles.exploreButton}>
                          <AppText
                            title="Explore Features"
                            fontSize={14}
                            fontWeight={400}
                            color={'#ffff'}
                            fontFamily='regular'
                          />
                        </TouchableOpacity>
                        <Pagination.Basic
                          progress={progress}
                          data={[
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',

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
                      <Image
                        source={IMAGES.megaphone}
                        style={styles.megaphoneImage}
                        resizeMode="contain"
                      />
                    </View>


                  </LinearGradient>
                </View>
              )}
            />


          </View> :
            <Image
              source={IMAGES.homeBanner}
              style={{ width: '100%', height: normalizeHeight(112) }}
              resizeMode="cover"
            />

        }


        <Space mB={40} />
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
          <TouchableOpacity onPress={() => {
            navigation.navigate('UploadingScreen')
          }} >
            <SVG.PlusPrimary />
          </TouchableOpacity>

        </View>
        <Space mB={20} />

        {publicArticles?.articles?.map((item) => (
          <View key={item.id}>
            <Space mB={5} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#201E23',
              borderRadius: 12,
              padding: 12,
              marginBottom: pixelSizeY(16),
              borderWidth: 1,
              borderColor: '#461D7A',
            }} >
              <View>
                <AssetByVariant
                  resizeMode="contain"
                  path={'docimg'}
                  width={normalizeWidth(70)}
                  height={normalizeHeight(70)}
                />
              </View>

              <View style={{
                flex: 1,
                marginHorizontal: pixelSizeX(30),
              }}>
                <AppText
                  title={item?.fileName}
                  fontSize={16}
                  fontWeight={400}
                  color={'#FFFFFF'}
                  extraStyle={{ lineHeight: 22.5 }}
                />
              </View>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <TouchableOpacity onPress={() => handleItemPress(item)} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 20,
                  padding: 10,
                  marginHorizontal: pixelSizeX(8),
                }}>
                  {/* <SVG.DownloadArtical
                      width={normalizeWidth(16)}
                      height={normalizeHeight(16)} /> */}
                  <AssetByVariant
                    resizeMode="contain"
                    path={'play'}
                    width={normalizeWidth(16)}
                    height={normalizeHeight(16)}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={layout.padding(5)} onPress={() => handleMenuPress(item)}>
                  <AssetByVariant
                    resizeMode="contain"
                    path={'threedot'}
                    width={normalizeWidth(5)}
                    height={normalizeHeight(22)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}


        {/* {publicArticles?.articles?.map((val) => (
          <AppCard
            data={val}
          />
        ))} */}
        <Space mB={20} />


        <Space mB={40} />
      </View>
      {
        isSubscribed ? <NewUploadBanner /> :
          <SubscriptionBanner
            description="Want to listen to your own research as a podcast?"
            btnTitle="Upgrade to Upload Your Own Papers"
          />
      }



      <Space mB={20} />

      {/* <AppModalCentered visible={true} onClose={() => {}} btn2Title='Upgrade to Pro Plan' title='Upgrade To Pro Plan' description='To upload your own research papers and turn them into personalized better audio, and faster processing, you’ll need a premium plan.' /> */}
      {/* <AppGradientModal data={{...data[0], description: `AI is transforming climate modeling by improving prediction accuracy and processing speed.

It helps analyze vast environmental data and detect complex patterns.

Researchers use AI to simulate climate scenarios more efficiently.

This innovation supports better forecasting and smarter environmental decisions.`}}  visible={true} onClose={() => {}} /> */}
    </AppScreen>
  );
};

export default HomeScreen;
