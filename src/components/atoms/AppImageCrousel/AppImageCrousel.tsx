import type { IAppImageCrouselProps } from './AppImageCrouselTypes';

import React, { useRef } from 'react';
import { Animated, FlatList, Image, Text, View } from 'react-native';

import { useTheme } from '@/theme';

import { WIDTH } from '@/utils/sizes';

import { useStyles } from './styles';

const AppImageCrousel: React.FC<IAppImageCrouselProps> = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatList1 = useRef(null);
  const styles = useStyles();
  const { colors } = useTheme();

  const renderFooter = () => {
    const dotPosition = Animated.divide(scrollX, WIDTH);

    return (
      <View style={styles.footerContainer}>
        <View style={styles.dotContainer}>
          {images.map((item, index) => {
            const dotColor = dotPosition.interpolate({
              extrapolate: 'clamp',
              inputRange: [index - 1, index, index + 1],
              outputRange: [colors.white, colors.primary, colors.white],
            });

            const dotWidth = dotPosition.interpolate({
              extrapolate: 'clamp',
              inputRange: [index - 1, index, index + 1],
              outputRange: [15, 30, 15],
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  ...styles.dotAnimation,
                  backgroundColor: dotColor,
                  width: dotWidth,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={images}
        decelerationRate="fast"
        // scrollEnabled={false}
        horizontal
        keyExtractor={(_, index) => `Slider_${index}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        ref={flatList1}
        renderItem={({ index, item }) => {
          return (
            <Image
              resizeMode="cover"
              source={{ uri: item }}
              style={{ height: 200, width: WIDTH }}
            />
          );
        }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={WIDTH}
      />

      {renderFooter()}
    </View>
  );
};

export default AppImageCrousel;
