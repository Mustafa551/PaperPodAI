import type { TextStyle } from 'react-native';
import type { UnionConfiguration } from '@/theme/types/config';
import type { FontColors, FontSizes } from '@/theme/types/fonts';

import { config } from '@/theme/_config';

import { normalizeFont } from '@/utils/sizes';

export const generateFontColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          color: value,
        },
      });
    },
    {} as FontColors,
  );
};

export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`size_${size}`]: {
        // fontSize: size,
        fontSize: normalizeFont(size),
      },
    });
  }, {} as FontSizes);
};

export const staticFontStyles = {
  alignCenter: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  medium: {
    fontWeight: 'medium',
  },
  semibold: {
    fontWeight: '600',
  },
  regular: {
    fontWeight: 'regular',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export const FONTS_FAMILY = {
  regular: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  semibold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  light: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
  }
} as const satisfies Record<string, TextStyle>;

export const FONTS = {
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
  light: 'Poppins-Light'
}
