/* eslint-disable no-nested-ternary */

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

import { pixelSizeY } from '@/utils/sizes';
import LinearGradient from 'react-native-linear-gradient';
import { IAppGradientModalProps } from './AppGradientModalTypes';
import { useStyle } from './styles';

const AppGradientModal: React.FC<IAppGradientModalProps> = memo(
    ({
        btnTitle = '',

        cancelIcon = false,
        description = '',
        icon = null,
        onBtnPress = () => { },
        data = {},
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
                animationType="slide"
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
                            <LinearGradient
                                colors={['#8A2BE1', '#1A052D', '#240F37', '#000000']}
                                locations={[0, 0.4127, 0.6868, 0.9609]}
                                start={{ x: 0.95, y: 0 }}
                                end={{ x: 0.05, y: 1 }} style={styles.subContainer}>
                                <Icon
                                    extraStyle={{
                                    }}
                                    onPress={onClose}
                                    SVGIcon={
                                        <SVG.BackArrow
                                            fill={colors.white}
                                            height="20"
                                            width="20"
                                        />
                                    }
                                />

                                {icon && icon}
                                <Space mB={20} />

                                <AppText
                                    extraStyle={[fonts.size_14, fonts.white]}
                                    title={data?.title}
                                    fontFamily='medium'
                                />
                                <Space mB={5} />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '85%',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <AppText
                                        color={colors.white}
                                        fontSize={10}
                                        fontFamily="regular"
                                        title={data.prof}
                                    />
                                    <AppText
                                        color={colors.white}
                                        fontSize={10}
                                        fontFamily="regular"
                                        title={data.institute}
                                    />
                                    <AppText
                                        color={colors.white}
                                        fontSize={10}
                                        fontFamily="regular"
                                        title={data.date}
                                    />
                                </View>
                                <Space mB={20} />

                                <AppText
                                    extraStyle={[
                                        fonts.size_14,
                                        fonts.white,
                                    ]}
                                    fontFamily='light'
                                    title={data.description}
                                />


                                <Space mB={20} />
                                <AppButton
                                    contViewStyle={{ width: '100%' }}
                                    extraStyle={{
                                        button: [layout.borderRadius(50), layout.borderWidth(0)],
                                        title: [fonts.size_14, fonts.semibold],
                                    }}
                                    SVGLeft={<SVG.Download2 style={[layout.top(pixelSizeY(-2)), layout.mR(5)]} />}
                                    onPress={onBtnPress}
                                    shadow={false}
                                    title={'Download'}
                                    variant="outlined"
                                    width="100%"
                                />


                            </LinearGradient>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        );
    },
);

export default AppGradientModal;
