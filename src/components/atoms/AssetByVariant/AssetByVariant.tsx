import { useEffect, useState } from 'react';
import {
  ImageSize,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import BlastedImage from 'react-native-blasted-image';
import { z } from 'zod';

import { useTheme } from '@/theme';
import getAssetsContext from '@/theme/assets/getAssetsContext';

interface BlastedImageProps {
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  isBackground?: boolean;
  returnSize?: boolean;
  fallbackSource?: ImageSourcePropType;
  source: SourceProp | number;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  onLoad?: (size?: ImageSize | null) => void;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
  retries?: number;
  tintColor?: string;
}

type Props = {
  extension?: string;
  path?: string;
  uri?: string;
} & Omit<BlastedImageProps, 'source'>;

interface SourceProp {
  uri: string;
  hybridAssets?: boolean;
  cloudUrl?: string | null;
}

const images = getAssetsContext('images');

function AssetByVariant({
  extension = 'png',
  path,
  uri: directUri,
  ...props
}: Props) {
  const [image, setImage] = useState<SourceProp>();
  const { variant } = useTheme();

  useEffect(() => {
    if (directUri) {
      setImage({ uri: directUri });
      return;
    }

    try {
      const defaultSource = z
        .custom<SourceProp>()
        .parse(images(`./${path}.${extension}`));

      if (variant === 'default') {
        setImage(defaultSource);
        return;
      }

      try {
        const fetchedModule = z
          .custom<SourceProp>()
          .parse(images(`./${variant}/${path}.${extension}`));
        setImage(fetchedModule);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          `Couldn't load the image: ${path}.${extension} for the variant ${variant}, Fallback to default`,
          error,
        );
        setImage(defaultSource);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Couldn't load the image: ${path}`, error);
    }
  }, [variant, extension, path, directUri]);

  return image && <BlastedImage source={image} {...props} />;
}

export default AssetByVariant;
