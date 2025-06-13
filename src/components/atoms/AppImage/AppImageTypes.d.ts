import { ImageStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

export interface IAppImageProps extends TouchableOpacityProps {
  source?: string;
  uri?: string;
  extension?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  imgStyle?: ImageStyle;
  iconStyle?: ViewStyle[];
}
