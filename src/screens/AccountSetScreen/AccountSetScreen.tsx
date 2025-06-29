 
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS_FAMILY } from '@/theme/fonts';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Divider,
  IconByVariant,
  Space,
} from '@/components/atoms';
import { AppModalCentered } from '@/components/molecules';
import { AppScreen } from '@/components/templates';

import { useModal } from '@/context/ModalProvider';
import { signUpSchema } from '@/utils/schemas';
import { SignUpForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';

import useStyles from './style';

const AccountSetScreen: React.FC<RootScreenProps<Paths.SignUpScreen>> = ({
  navigation,
}) => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(signUpSchema(t)) });

  const onSignup = (value: SignUpForm) => {
    console.debug('🚀 ~ onSignin ~ value:', value);
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      backgroundColor={colors.black}
      preset="scroll"
      style={ layout.pH(pixelSizeX(10))}
    >
      {/* <Space mB={20} /> */}
      <Space mT={80} />

      <AppText
        title={'Account Settings'}
        fontSize={24}
        fontWeight={500}
        color={"#FFFFFF"}
        // paddingHorizontal={19.5}
      />
      <Space mB={30} />
 
        <AppInput
        control={control}
        error={errors.password?.message}
        keyboardType="default"
        name="name"
        placeholder={'Your Name'}
        label='Name'
      />
      <Space mB={20} />

      <AppInput
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        name="email"
        placeholder={'user@example.com'}
        label='Email'
      />


    
      <Space mB={20} />

          <AppInput
        control={control}
        error={errors.password?.message}
        keyboardType="default"
        name="name"
        placeholder={'Upgrade to convert your research papers'}
        label='Subscription Status'
        SVGLeft={ <AssetByVariant
                      resizeMode="contain"
                      path={'freestat'}
                      width={normalizeWidth(65)}
                      height={normalizeHeight(24)}
                    />}
      />
      <Space mB={50} />

 <View >
       <AppButton
         bgColor={"#8A2BE1"}
         // onPress={handleSubmit(onSignin)}
         onPress={
           // openModal('forgotPassword', {
           //   email: 'user@example.com',
           //   type: 'phoneNum',
           // })
           handleSubmit(onSignup)
         }
         title={'Logout'}
         variant="gradient"
         shadow={false}
       />
 
      </View>

      <Space mB={14} />
<View style={{ marginHorizontal: -pixelSizeX(10), marginTop: 'auto' }}>
  <View style={[layout.bgColor('#201E23'), layout.height(pixelSizeY(170)), layout.pH(pixelSizeX(20)), 
    layout.pV(pixelSizeY(30))]}>
          <AppText
                        title={'Want to listen to your own research as a podcast?'}
                        fontSize={16}
                        fontWeight={500}
                        color={'#FFFFFF'}
                        marginHorizontal={pixelSizeX(70)}
                        textAlign='center'
                        extraStyle={{ lineHeight: 22.5 }}
                      />
  </View>
</View>

      {/* <Space mB={20} /> */}
    </AppScreen>
  );
};

export default AccountSetScreen;
