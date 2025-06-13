import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import { WP } from '@/utils/responsive';

export interface IStyle {
  imageStyle: ImageStyle;
  iconContainer: ViewStyle;
  iconColor: TextStyle;
}

/**
 * Generates the styles for the AppImage component.
 * Utilizes theme colors and responsive width/height.
 */
export const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create<IStyle>({
    /**
     * Style for the image component, setting its dimensions.
     */
    imageStyle: {
      height: WP('30'), // Sets height based on a percentage of the window width
      width: WP('30'), // Sets width based on a percentage of the window width
    },

    /**
     * Style for the icon container, ensuring it's centered over the image
     * with a semi-transparent background.
     */
    iconContainer: {
      // backgroundColor: colors.black, // Black background color
      position: 'absolute', // Positioned absolutely to overlay the image
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center', // Center the icon vertically
      alignItems: 'center', // Center the icon horizontally
      borderRadius: 100, // Fully rounded corners
      // opacity: 0.5, // Semi-transparent
    },

    /**
     * Color style for the icon, ensuring it stands out against the background.
     */
    iconColor: {
      color: colors.white, // White color for contrast
    },
  });
};
