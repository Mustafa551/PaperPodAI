import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS_FAMILY } from '@/theme/fonts';

import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Divider,
  Space,
} from '@/components/atoms';
import { AppModalCentered } from '@/components/molecules';
import { AppScreen } from '@/components/templates';

import { signInSchema } from '@/utils/schemas';
import { SignInForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';

import useStyles from './style';
import { useModal } from '@/context/ModalProvider';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';




const LoginScreen: React.FC<RootScreenProps<Paths.LoginScreen>> = ({
  navigation,
}) => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(signInSchema(t)) });
  const { openModal } = useModal();

  const onSignin = (value: SignInForm) => {
    console.debug('🚀 ~ onSignin ~ value:', value);
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
backgroundColor={colors.black}
      style={layout.pH(pixelSizeX(10))}
    >
  
    
          <View style={layout.alignSelf('center')}>
            <AssetByVariant
              resizeMode="contain"
              path={'signupbg'}
              width={normalizeWidth(267)}
              height={normalizeHeight(247)}
            />
          </View>
          <Space mB={50} />
    
          <AppText
            title={'Welcome Back'}
            fontSize={24}
            fontWeight={500}
            color={"#FFFFFF"}
            // paddingHorizontal={19.5}
          />
          <Space mB={40} />
     
          
          <AppInput
            control={control}
            error={errors.email?.message}
            keyboardType="email-address"
            name="email"
            placeholder={'Enter your email'}
            label='Email'
          />
    
          <Space mB={16} />
    
          <AppInput
            control={control}
            error={errors.password?.message}
            keyboardType="default"
            name="password"
            placeholder={'Enter your password'}
            secureTextEntry
            label='Password'
          />
          <Space mB={5} />

           <AppText
                  title={t('common_labels.forgetPassword')}
                  color={colors.white}
                  alignSelf="flex-end"
                  fontSize={15}
                  fontFamily="medium"
                />
          <Space mB={16} />
    
<AppButton
         bgColor={"#8A2BE1"}  
         onPress={handleSubmit(onSignin)}
         title={'Login'}
         variant="gradient"
         shadow={false}
       />

    

      {/* openModal('responseMessage', {
            // btn1Title: 'Got it',
            // btn2Title: 'Submit Request',
            description: 'Now you can access your account.',
            icon: (
              <SVG.TickPrimary
                height={normalizeHeight(50)}
                width={normalizeWidth(50)}
              />
            ),

            title: 'Email Verified!',
          }) */}

      {/* <View style={layout.alignSelf('center')}>
        <ProfileImage />
      </View> */}
      {/* <ImageShowcase
        images={[
          'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
          'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvS8XRlRIzQ_lvu0EZy88MrE-UkMYfDTPjYQ&s',
          'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        ]}
      /> */}
      {/* <Collapsible
        title="Job started"
        date="05th March 2025"
        leftIcon={<SVG.Fire height={20} width={20} />}
      >
        <View>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
          <Text>heie</Text>
        </View>
      </Collapsible> */}
      {/* <AppImageCrousel
        images={[
          'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
          'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvS8XRlRIzQ_lvu0EZy88MrE-UkMYfDTPjYQ&s',
          'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        ]}
      /> */}
    </AppScreen>
  );
};

export default LoginScreen;

