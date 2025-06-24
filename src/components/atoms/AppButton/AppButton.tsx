/* eslint-disable react/react-in-jsx-scope */

import type { IAppButtonProps } from './AppButtonTypes';

import React, { memo, useMemo } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '@/theme';
import { FONTS_FAMILY } from '@/theme/fonts';

import { isIphoneX, platformiOS } from '@/utils/native';
import { normalizeHeight, WIDTH } from '@/utils/sizes';

import AppText from '../AppText/AppText';
import { useStyles } from './styles';

const AppButton: React.FC<IAppButtonProps> = memo((props) => {
  const { colors, layout } = useTheme();

  const {
    bgColor = '',
    contViewStyle = {},
    disabled = false,
    extraStyle,
    fontVariant = 'h4-quicksand-semi',
    height = platformiOS(isIphoneX() ? 50 : 55, 47),
    loading = false,
    onPress,
    outlinedColor = colors.primary,
    shadow = true,
    SVGLeft = null,
    SVGRight = null,
    title,
    variant = 'gradient',
    width = WIDTH * 0.9,
  } = props;

  const styles = useStyles();

  const color = useMemo(() => {
    let colorArr = [colors.primary2, colors.primary];
    if (variant === 'outlined') {
      colorArr = [colors.background1, colors.background1] as any;
    }
    return colorArr;
  }, [variant]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        shadow && layout.shadow,
        contViewStyle,
        layout.opacity(disabled ? 0.5 : 1),
      ]}
    >
      <LinearGradient
        {...props}
        colors={bgColor ? [bgColor, bgColor] : color}
          start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      locations={[0.0001, 1]}
        style={[
          styles.button,
          layout.height(normalizeHeight(height as number)),
          layout.width(width),
          variant === 'outlined' && layout.borderColor(outlinedColor),
          extraStyle?.button,
        ]}
      >
        {SVGLeft}
        {loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <AppText
            alignSelf="center"
            color={variant === 'outlined' ? outlinedColor : colors.white}
            extraStyle={[layout.mH(5), extraStyle?.title]}
            onPress={!disabled ? onPress : () => {}}
            fontSize={14}
            // fontFamily="bold"
            title={title}
            variant={fontVariant}
            fontWeight={800}
          />
        )}
        <View
          style={
            {
              // transform: [{ rotate: language === 'ar' ? '180deg' : '0deg' }],
            }
          }
        >
          {SVGRight}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default AppButton;
