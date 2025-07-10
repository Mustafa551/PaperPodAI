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
import { resetStack } from '@/navigation/navigationRef';




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
    // navigation.navigate(Paths.HomeStack)
    resetStack('HomeStack', 'BottomTabs')
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
backgroundColor={colors.black}
      style={layout.pH(pixelSizeX(10))}
    >
        <Space mT={75} />
  
    
          <View style={layout.alignSelf('center')}>
            <AssetByVariant
              resizeMode="contain"
              path={'loginbg'}
              width={normalizeWidth(267)}
              height={normalizeHeight(247)}
            />
          </View>
          <Space mB={35} />
    
          <AppText
            title={'Welcome Back'}
            fontSize={24}
            fontWeight={500}
            color={"#FFFFFF"}
            // paddingHorizontal={19.5}
          />
          <Space mB={35} />
     
          
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
               onPress={() =>
                
                     navigation.navigate(Paths.ForgotpassScreen)
                   }
                  title={t('common_labels.forgetPassword')}
                  color={colors.white}
                  alignSelf="flex-end"
                  fontSize={15}
                  fontFamily="medium"
                />
          <Space mB={40} />
    
<AppButton
         bgColor={"#8A2BE1"}  
         onPress={handleSubmit(onSignin)}
         title={'Login'}
         variant="gradient"
         shadow={false}
       />

       <View style={styles.continueWithCont}>
        <Divider
          color={colors.neutrals20}
          height={1}
          width="40%"
          alignSelf="center"
        />

        <AppText
          title={'Or'}
          variant="body3-openSans-light"
          alignSelf="center"
          color={colors.neutrals20}
          fontSize={12}
          fontFamily="regular"
          extraStyle={layout.pH(10)}
        />

        <Divider
          color={colors.neutrals20}
          height={1}
          width="40%"
          alignSelf="center"
        />
      </View>


<AppButton
         bgColor={"transparent"}  
         onPress={handleSubmit(onSignin)}
         title={'Continue with Google'}
         variant="gradient"
        
         shadow={false}
       extraStyle={{
        button: {
          borderColor: '#8A2BE1',  
  },
  title: {
          fontWeight: '500',
        }
}}
        SVGLeft={
            <AssetByVariant
              resizeMode="contain"
              path={'google'}
              width={normalizeWidth(18)}
              height={normalizeHeight(18)}
            />
        }
       />
             <Space mB={14} />
 
      <AppText
           title={"Don't have an account?"}
           color={colors.white}
           alignSelf="center"
           fontSize={15}
           fontFamily="medium"
         >
           <AppText
             title={'Sign up'}
             onPress={() => navigation.navigate(Paths.SignUpScreen)}
             color={colors.white}
             extraStyle={layout.textDecorationLine('underline')}
             fontSize={15}
              fontWeight={500}
             marginLeft={5}
           />
         </AppText>
    
    </AppScreen>
  );
};

export default LoginScreen;



