import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import {
  AppButton,
  AppInput,
  AppText,
  AssetByVariant,
  Divider,
  Space,
} from '@/components/atoms';
import { AppScreen } from '@/components/templates';

import { signInSchema } from '@/utils/schemas';
import { SignInForm } from '@/utils/schemasTypes';
import { normalizeHeight, normalizeWidth } from '@/utils/sizes';


import { useModal } from '@/context/ModalProvider';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import useStyles from '../LoginScreen/style';


const Onboarding2: React.FC<RootScreenProps<Paths.Onboarding2>> = ({
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

      // style={layout.bgColor("black")}
    >
<Image
  source={require('../../theme/assets/images/Ellipse15.png')}
  style={{
    position: 'absolute',
    width: 440.4547,
    height: 440.4547,
    // top: 80.6261,
    // left: 313.8535,
    // transform: [{ rotate: '-150deg' }],
    opacity: 0.5,
    zIndex: -1,
  }}
  blurRadius={50}
/>



      <Space mT={144} />

      <View style={layout.alignSelf('center')}>
        <AssetByVariant
          resizeMode="contain"
          path={'on2'}
          width={normalizeWidth(306)}
          height={normalizeHeight(231)}
        />
      </View>
      <Space mB={50} />

      <AppText
        title={"Learn Anytime, Anywhere."}
        alignSelf="center"
        fontSize={24}
        fontWeight={500}
        color={"#FFFFFF"}
      />
      <Space mB={8} />
    <AppText
        title={"Curated audio from the latest research, right at your fingertips."}
        fontSize={14}
        fontWeight={400}
        color={"#F5F5F5"}
        marginHorizontal={42}
        textAlign='center'
      />
    
  

      <Space mB={5} />

    

<View style={{marginTop: "auto"}}>
      <AppButton
        bgColor={"#8A2BE1"}
        // onPress={handleSubmit(onSignin)}
        onPress={() =>
          // openModal('forgotPassword', {
          //   email: 'user@example.com',
          //   type: 'phoneNum',
          // })
          navigation.navigate(Paths.Onboarding3)
        }
        title={'Next'}
        variant="gradient"
        shadow={false}
      />

     </View>

   
      <Space mB={56} />

    </AppScreen>
  );
};

export default Onboarding2;

