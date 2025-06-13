import type { IIconProps } from './IconTypes';

import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';

import AppText from '../AppText/AppText';
import Space from '../Space/Space';

const Icon: React.FC<IIconProps> = memo(
  ({
    activeOpacity = 0.8,
    alignSelf = 'flex-start',
    color = '',
    disabled = false,
    title = '',
    extraStyle = { container: {}, subContainer: {}, title: {} },
    iconLeft = true,
    mB = 0,
    mL = 0,
    mR = 0,
    numberOfLines = 1,
    onPress = () => {},
    SVGIcon = null,
    variant = 'h6',
    fontSize = 12,
  }) => {
    const { layout } = useTheme();

    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        disabled={disabled}
        onPress={onPress}
        style={[layout.alignSelf(alignSelf), extraStyle.container]}
      >
        <View style={[layout.rowCenter, extraStyle.subContainer]}>
          {iconLeft && (
            <>
              {SVGIcon && SVGIcon}
              <Space mR={mR} />
            </>
          )}
          {title && (
            <AppText
              alignSelf={alignSelf}
              color={color}
              extraStyle={extraStyle.title}
              numberOfLines={numberOfLines}
              fontSize={fontSize}
              onPress={onPress}
              title={title}
              variant={variant}
            />
          )}
          {!iconLeft && (
            <>
              <Space mL={mL} />
              {SVGIcon && SVGIcon}
            </>
          )}
        </View>
        {!!mB && <Space mB={mB} />}
      </TouchableOpacity>
    );
  },
);

export default Icon;
