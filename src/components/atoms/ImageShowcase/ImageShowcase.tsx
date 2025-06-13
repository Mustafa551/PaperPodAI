import type { IimageShowcaseProps } from './ImageShowcaseTypes';

import React from 'react';
import { Image, Text, View } from 'react-native';

import { useTheme } from '@/theme';

import { normalizeFont, normalizeHeight } from '@/utils/sizes';

import AppText from '../AppText/AppText';
import { useStyles } from './styles';

const ImageShowcase: React.FC<IimageShowcaseProps> = (
  props = {} as IimageShowcaseProps,
) => {
  const { height = 150, images } = props;

  const styles = useStyles();
  const { colors, layout } = useTheme();

  return (
    <View style={[layout.row, layout.wrap, layout.justifyBetween]}>
      {images.slice(0, 4).map((val, index) => (
        <>
          {images.length > 4 && index === 3 && (
            <View
              style={[
                styles.glassImageCover,
                layout.height(normalizeHeight(height)),
              ]}
            >
              <AppText
                alignSelf="center"
                color={colors.white}
                extraStyle={[
                  layout.fontSize(normalizeFont(15)),
                  layout.fontWeight('600'),
                ]}
                title={`+${images.length - 4} More`}
              />
            </View>
          )}
          <Image
            resizeMode="cover"
            source={{ uri: val }}
            style={[styles.imageStyle, layout.height(normalizeHeight(height))]}
          />
        </>
      ))}
    </View>
  );
};

export default ImageShowcase;
