import React, { memo } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme';

import { IDividerProps } from './DividerTypes';

const Divider: React.FC<IDividerProps> = memo(
  ({
    color = 'grey',
    width = '100%',
    height = 1,
    borderRadius = 0,
    alignSelf = 'flex-start',
  }) => {
    const { layout } = useTheme();

    return (
      <View
        style={[
          layout.width(width),
          layout.height(height),
          layout.bgColor(color),
          layout.borderRadius(borderRadius),
          layout.alignSelf(alignSelf),
        ]}
      />
    );
  },
);

export default Divider;
