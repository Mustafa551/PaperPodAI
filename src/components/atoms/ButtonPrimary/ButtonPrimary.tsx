import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';

import { normalizeHeight, normalizeWidth } from '@/utils/sizes';

import AppText from '../AppText/AppText';
import IconByVariant from '../IconByVariant/IconByVariant';
import { IButtonPrimaryProps } from './ButtonPrimaryTypes';

const ButtonPrimary: React.FC<IButtonPrimaryProps> = ({
  title = 'Button',
  onPress,
  variant = 'filled',
  width,
  height = normalizeHeight(44),
  loading = false,
  icon,
  iconWidth = 20,
  iconHeight = 20,
  iconPosition = 'right',
  textColor,
  backgroundColor,
  borderColor,
  style,
  textStyle,
  disabled = false,
  disabledColor, // Destructure the new prop
}) => {
  const { colors, layout, gutters, borders, fonts } = useTheme();

  const isOutlined = variant === 'outlined';
  const bgColor =
    backgroundColor ?? (isOutlined ? colors.white : colors.greenPrimary);
  const brColor =
    borderColor ?? (isOutlined ? colors.greenPrimary : 'transparent');
  const titleColor =
    textColor ?? (isOutlined ? colors.greenPrimary : colors.white);

  // Determine the disabled background color
  const disabledBgColor = disabledColor ?? colors.gray100; // Fallback to default gray100

  const buttonBaseStyle: (
    state: PressableStateCallbackType,
  ) => ViewStyle[] = () => [
    layout.itemsCenter,
    layout.justifyCenter,
    layout.height(height),
    borders.rounded_8,
    width ? layout.width(normalizeWidth(width)) : layout.alignSelf('stretch'),
    layout.bgColor(disabled ? disabledBgColor : bgColor),
    layout.borderColor(brColor),
    borders.w_1,
    style ?? {}, // Fallback to an empty object if style is undefined
  ];

  const content = (
    <View style={[layout.rowCenter, gutters.gap_10]}>
      {icon && !loading && iconPosition === 'left' && (
        <IconByVariant path={icon} width={iconWidth} height={iconHeight} />
      )}

      <AppText
        title={title}
        color={titleColor}
        textAlign="center"
        fontSize={14}
        fontWeight="700"
        fontFamily="bold"
        extraStyle={textStyle}
      />

      {icon && !loading && iconPosition === 'right' && (
        <IconByVariant path={icon} width={iconWidth} height={iconHeight} />
      )}

      {loading && <ActivityIndicator color={titleColor} size="small" />}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={buttonBaseStyle}
    >
      {content}
    </Pressable>
  );
};

export default ButtonPrimary;
