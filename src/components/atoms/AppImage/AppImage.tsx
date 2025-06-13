import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { SVG } from '@/theme/assets/icons';

import { normalizeHeight, normalizeWidth } from '@/utils/sizes';

import AssetByVariant from '../AssetByVariant/AssetByVariant';
import { IAppImageProps } from './AppImageTypes';
import { useStyles } from './style';

/**
 * AppImage is a component that displays an image. It can accept a source as a local asset or a uri.
 * If a uri is provided, it will be used as the source of the image. If a source is provided, it will be
 * used as the source of the image.
 * @param {{ source?: string; uri?: string; extension?: string; style?: ViewStyle; resizeMode?: string; imgStyle?: ImageStyle }} props
 * @returns {ReactElement}
 */
const AppImage: React.FC<IAppImageProps> = ({
  source,
  uri,
  extension,
  resizeMode,
  imgStyle,
  children,
  iconStyle,
  ...props
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity {...props} activeOpacity={0.9}>
      {/**
       * If a uri is provided, use it as the source of the image. If a source is provided, use it as the source of the image.
       * If neither a uri nor a source is provided, return null.
       */}
      {uri ? (
        <AssetByVariant
          uri={uri}
          resizeMode={resizeMode}
          style={{ ...styles.imageStyle, ...imgStyle }}
        />
      ) : source ? (
        <AssetByVariant
          path={source}
          extension={extension}
          resizeMode={resizeMode}
          style={{ ...styles.imageStyle, ...imgStyle }}
        />
      ) : null}
      <View style={[styles.iconContainer, iconStyle]}>{children}</View>
    </TouchableOpacity>
  );
};

export default AppImage;
