import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';

import {
  AppButton,
  AppText,
  ButtonPrimary,
  Icon,
  Space,
} from '@/components/atoms';

import { normalizeHeight } from '@/utils/sizes';

import { useStyle } from './styles';

const MessageModalContent = ({
  btn1Title = '',
  btn2Title = '',
  cancelIcon = false,
  description = '',
  icon = null,
  onBtn1Press = () => {},
  onBtn2Press = () => {},
  title = '',
}) => {
  const styles = useStyle();
  const { colors, fonts, layout } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={[layout.padding(32), layout.itemsCenter]}>
      {/* {cancelIcon && (
        <Icon
          extraStyle={{
            container: styles.iconCont,
          }}
          onPress={onClose}
          SVGIcon={
            <SVG.CrossPrimary fill={colors.black} height="20" width="20" />
          }
        />
      )} */}

      {icon && icon}
      <Space mB={10} />

      <AppText
        alignSelf="center"
        extraStyle={[fonts.size_30, fonts.textMain]}
        title={title}
        fontFamily="bold"
      />
      <Space mB={10} />

      <AppText
        alignSelf="center"
        extraStyle={[fonts.size_14, fonts.textSecondary]}
        fontFamily="regular"
        textAlign="center"
        title={description}
      />
      <Space mB={20} />
      <View style={[layout.rowCenter]}>
        {btn2Title && (
          <>
            <View style={layout.flex1}>
              <ButtonPrimary
                title={btn2Title}
                variant={'outlined'}
                onPress={onBtn2Press}
                height={normalizeHeight(55)}
              />
            </View>
            <Space mH={5} />
          </>
        )}

        {btn1Title && (
          <View style={layout.flex1}>
            <ButtonPrimary
              title={btn1Title}
              // variant={'outlined'}
              onPress={onBtn1Press}
              height={normalizeHeight(55)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default MessageModalContent;
