import type {
  ImageSourcePropType,
  KeyboardAvoidingViewProps as keyboardProps,
  ScrollViewProps as scrollProps,
  StatusBarStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
// import FocusAwareStatusBar from './FocusAwareStatusBar';
import type { Colors } from '@/theme/types/colors';

import { useScrollToTop } from '@react-navigation/native';
import React, { useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { useTheme } from '@/theme';

import { FocusAwareStatusBar } from '@/components/atoms';

import { pixelSizeX } from '@/utils/sizes';

interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: StatusBarStyle;
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  keyboardOffsetIOS?: number;
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  backgroundImage?: ImageSourcePropType;

  KeyboardAvoidingViewProps?: keyboardProps;
}

interface FixedScreenProps extends BaseScreenProps {
  overideStatusBar?: boolean;
  pH?: boolean;
  preset?: 'fixed';
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
  /**
   * Pass any additional props directly to the ScrollView component.
   */

  overideStatusBar?: boolean;
  pH?: boolean;
  ScrollViewProps?: scrollProps;
}

export type ScreenProps = FixedScreenProps | ScrollScreenProps;

/**
 * Screen with out scrolling
 */
function ScreenWithoutScrolling(props: ScreenProps) {
  const { children, contentContainerStyle, style } = props;
  return (
    <View style={[styles.outerStyle, style]}>
      <View style={[styles.innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  );
}

/**
 * Screen with scrolling
 *
 */
function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    contentContainerStyle,
    keyboardShouldPersistTaps = 'handled',
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <ScrollView
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      ref={ref}
      {...ScrollViewProps}
      contentContainerStyle={[
        styles.innerStyle,
        contentContainerStyle,
        { flexGrow: 1 },
      ]}
      onContentSizeChange={(w: number, h: number) => {
        ScrollViewProps?.onContentSizeChange?.(w, h);
      }}
      onLayout={(e) => {
        ScrollViewProps?.onLayout?.(e);
      }}
      style={[styles.outerStyle, ScrollViewProps?.style, style]}
    >
      {children}
    </ScrollView>
  );
}

/**
 * Represents a screen component that provides a consistent layout and behavior for different screen presets.
 * The `Screen` component can be used with different presets such as "fixed", "scroll".
 * It handles safe area insets, status bar settings, keyboard avoiding behavior, and scrollability based on the preset.
 */
export default function Screen(props: ScreenProps) {
  const { colors, layout, navigationTheme } = useTheme();

  /*
   ** Destructing props
   */
  const {
    backgroundColor = colors.background1,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    keyboardOffsetIOS,
    overideStatusBar = false,
    pH = false,
    preset = 'fixed',
    statusBarStyle = 'default',
  } = props;
  /*
   ** Hooks
   */

  return (
    <View
      style={[
        $containerStyle(colors),
        { backgroundColor },
        pH && layout.pH(pixelSizeX(20)),
      ]}
    >
      <SafeAreaView />
      {!overideStatusBar && (
        <FocusAwareStatusBar
          barStyle={navigationTheme.dark ? 'light-content' : 'dark-content'}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? keyboardOffsetIOS : keyboardOffset
        }
        {...KeyboardAvoidingViewProps}
        style={[styles.keyboardStyle, KeyboardAvoidingViewProps?.style]}
      >
        {preset === 'fixed' ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
/*
 ** This style approach is used for synamic styles
 */
const $containerStyle = (colors: Colors): ViewStyle => {
  return {
    backgroundColor: colors.background1,
    flex: 1,
    height: '100%',
    width: '100%',
  };
};

const styles = StyleSheet.create({
  innerStyle: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  keyboardStyle: {
    flex: 1,
  },

  outerStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
