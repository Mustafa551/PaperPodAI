import type { ISpaceProps } from './SpaceTypes';

import React, { memo } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme';

import { pixelSizeX, pixelSizeY } from '@/utils/sizes';

const Space: React.FC<ISpaceProps> = memo(
  ({ children = null, mB = 0, mH = 0, mL = 0, mR = 0, mT = 0, mV = 0 }) => {
    const { layout } = useTheme();
    return (
      <View
        style={[
          mB > 0 ? layout.mB(pixelSizeY(mB)) : null,
          mT > 0 ? layout.mT(pixelSizeY(mT)) : null,
          mR > 0 ? layout.mR(pixelSizeX(mR)) : null,
          mL > 0 ? layout.mL(pixelSizeX(mL)) : null,
          mH > 0 ? layout.mH(pixelSizeX(mH)) : null,
          mV > 0 ? layout.mV(pixelSizeY(mV)) : null,
        ]}
      >
        {children && children}
      </View>
    );
  },
);

export default Space;
