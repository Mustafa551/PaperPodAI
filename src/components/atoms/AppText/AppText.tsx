import type { IAppTextProps } from './AppTextTypes';

import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme';
import { FONTS_FAMILY } from '@/theme/fonts';

import { normalizeFont } from '@/utils/sizes';

const AppText: React.FC<IAppTextProps> = memo((props) => {
  const {
    alignSelf = 'flex-start',
    children = <View />,
    color = '',
    extraStyle = {},
    fontFamily = 'regular',
    fontSize = 0,
    gradient = false,
    onPress = () => {},
    textAlign = 'left',
    theme,
    title,
    variant = '',
    fontWeight = '400',
  } = props;
  const { colors, layout } = useTheme();

  return (
    <Text
      {...props}
      onPress={onPress}
      style={[
        // TYPOGRAPHY[variant],
        // layout.fontSize(
        //   fontSize ? normalizeFont(fontSize) : TYPOGRAPHY[variant]?.fontSize,
        // ),
        // layout.fontFamily(
        //   fontFamily ? FONTS[fontFamily] : TYPOGRAPHY[variant]?.fontFamily,
        // ),
        layout.fontSize(fontSize && normalizeFont(fontSize)),
        // layout.fontFamily(FONTS_FAMILY[fontFamily]),
        layout.alignSelf(alignSelf),
        layout.color(color || colors.greenPrimary),
        layout.textAlign(textAlign),
        layout.fontWeight(fontWeight),
        FONTS_FAMILY[fontFamily],
        extraStyle,
      ]}
      suppressHighlighting
    >
      {title}
      {children}
    </Text>
  );
});

export default AppText;
