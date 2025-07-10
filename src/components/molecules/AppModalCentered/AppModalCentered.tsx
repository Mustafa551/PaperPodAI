/* eslint-disable no-nested-ternary */
import type { IAppModalCenteredProps } from './AppModalCenteredTypes';

import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';

import { AppButton, AppText, Icon, Space } from '@/components/atoms';

import { useStyle } from './styles';

const AppModalCentered: React.FC<IAppModalCenteredProps> = memo(
  ({
    btn1Title = '',
    btn2Title = '',
    cancelIcon = false,
    description = '',
    icon = null,
    onBtn1Press = () => { },
    onBtn2Press = () => { },
    onClose,
    title = '',
    visible,
  }) => {
    const styles = useStyle();
    const { colors, fonts, layout } = useTheme();
    const { t } = useTranslation();

    // const {
    //   control,
    //   handleSubmit,
    //   formState: {errors},
    // } = useForm<modalInputForm>({
    //   resolver: zodResolver(modalSchema(multiline, refundPolicy, t)),
    // });

    return (
      <Modal
        animationType="fade"
        onRequestClose={onClose}
        transparent
        visible={visible}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={layout.flex1}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.subContainer}>
                {/* {cancelIcon && (
                  <Icon
                    extraStyle={{
                      container: styles.iconCont,
                    }}
                    onPress={onClose}
                    SVGIcon={
                      <SVG.CrossPrimary
                        fill={colors.black}
                        height="20"
                        width="20"
                      />
                    }
                  />
                )} */}

                {icon && icon}
                <Space mB={10} />
                <View style={layout.rowCenterBt}>


                  <AppText
                    alignSelf="center"
                    extraStyle={[fonts.size_18, fonts.white, fonts.semibold]}
                    title={title}
                    fontFamily='semibold'
                  />
                  <TouchableWithoutFeedback onPress={onClose}>

                    <AppText
                      // alignSelf="center"
                      onPress={onClose}
                      extraStyle={[fonts.size_18, fonts.white, fonts.semibold]}
                      title='x'
                    fontFamily='semibold'

                    />
                  </TouchableWithoutFeedback>
                </View>
                <Space mB={15} />

                <AppText
                  alignSelf="center"
                  extraStyle={[
                    fonts.size_14,
                    fonts.white,
                    // layout.fontFamily('400'),
                    
                  ]}
                  fontFamily='regular'
                  // textAlign="center"
                  title={description}
                />
                {/* <View style={layout.flex_1}> */}

                {btn2Title && (
                  <>
                    <Space mB={20} />
                    <AppButton
                      // extraStyle={{ title: {} }}
                      contViewStyle={{ width: '100%' }}
                      extraStyle={{
                        button: layout.borderRadius(50),
                        title: [fonts.size_14, fonts.semibold],
                      }}
                      onPress={onBtn2Press}
                      shadow={false}
                      title={btn2Title}
                      variant="gradient"
                      width="100%"
                    />
                  </>
                )}

                {btn1Title && (
                  <>
                    <Space mB={10} />
                    <AppButton
                      // extraStyle={{ title: {} }}
                      contViewStyle={{ width: '100%' }}
                      extraStyle={{
                        button: layout.borderRadius(50),
                        title: [fonts.size_14, fonts.semibold],
                      }}
                      onPress={onBtn1Press}
                      shadow={false}
                      title={btn1Title}
                      variant="outlined"
                      width="100%"
                    />
                  </>
                )}
                {/* </View> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  },
);

export default AppModalCentered;
