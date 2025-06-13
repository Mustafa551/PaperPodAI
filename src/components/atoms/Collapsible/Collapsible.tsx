import type { ICollapsibleProps } from './CollapsibleTypes';

import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';

import { useStyles } from './style';

const Collapsible: React.FC<ICollapsibleProps> = ({
  children = <></>,
  date,
  leftIcon = null,
  title,
}) => {
  const { backgrounds, colors, layout } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const heightValue = useSharedValue(0);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const styles = useStyles();

  const toggleExpand = () => {
    if (contentRef.current) {
      contentRef.current.measure((_x, _y, _width, height) => {
        heightValue.value = withTiming(expanded ? 0 : height, {
          duration: 300,
        });
        setContentHeight(height); // Store content height
        setExpanded(!expanded);
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
    overflow: 'hidden',
  }));

  const arrowStyles = useAnimatedStyle(() => {
    const degree = interpolate(heightValue.value, [0, contentHeight], [0, 180]);

    return {
      transform: [{ rotate: `${degree}deg` }],
    };
  });

  return (
    <View
      style={[
        backgrounds.background,
        layout.borderRadius(10),
        layout.shadow,
        layout.mH(5),
      ]}
    >
      {/* Toggle Button */}
      <TouchableOpacity onPress={toggleExpand} style={styles.headerStyle}>
        <View style={layout.rowCenter}>
          {leftIcon}
          <Text style={layout.mR(5)}>{title}</Text>
        </View>

        <View style={layout.rowCenter}>
          <Text style={[layout.mR(5), layout.fontSize(12)]}>{date}</Text>
          <Animated.View style={arrowStyles}>
            <SVG.Fire height={20} width={20} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Auto-Height Animated View */}
      <Animated.View style={[animatedStyle, {}]}>
        {/* Content inside a View with ref to measure its height */}
        <View
          ref={contentRef}
          style={{
            left: 0,
            paddingHorizontal: 10,
            position: 'absolute',
            right: 0,
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Collapsible;
