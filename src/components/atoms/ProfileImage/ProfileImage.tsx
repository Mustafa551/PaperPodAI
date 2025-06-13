import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { SVG } from '@/theme/assets/icons';

import { WP } from '@/utils/responsive';

import AssetByVariant from '../AssetByVariant/AssetByVariant';
import { IProfileImageProps } from './ProfileImageTypes';
import { useStyles } from './styles';

const ProfileImage: React.FC<IProfileImageProps> = ({ source }) => {
  const styles = useStyles();

  return (
    <>
      <TouchableOpacity activeOpacity={0.9}>
        <AssetByVariant
          path={'Avatar'}
          extension="jpg"
          resizeMode={'contain'}
          style={styles.imageStyle}
        />
        <View style={styles.iconContainer}>
          <SVG.Fire
            height={WP('10')}
            width={WP('10')}
            style={styles.iconColor}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ProfileImage;
