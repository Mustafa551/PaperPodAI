import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';

import { ID_DROPDOWN } from '@/constant';
import { normalizeHeight, pixelSizeY } from '@/utils/sizes';

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

interface Option {
  key: string;
  value: string;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const rotation = useSharedValue(0);
  const listHeight = useSharedValue(0);
  const scale = useSharedValue(1);
  const styles = useStyles();

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 1;
    rotation.value = withSpring(toValue, { damping: 12 });
    listHeight.value = withTiming(toValue, { duration: 300 });
    scale.value = withSequence(
      withTiming(0.95, { duration: 50 }),
      withTiming(1, { duration: 100 }),
    );
    setIsOpen(!isOpen);
  };

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` },
      ],
    };
  });

  const listStyle = useAnimatedStyle(() => {
    return {
      maxHeight: interpolate(listHeight.value, [0, 1], [0, 200]),
      opacity: listHeight.value,
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const selectedOption = options.find((item) => item.key === value);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <AnimatedTouchableOpacity
        style={[
          styles.dropdownButton,
          isOpen && styles.dropdownButtonOpen,
          buttonStyle,
        ]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectedText, !value && styles.placeholder]}>
          {selectedOption?.value || placeholder}
        </Text>
        <Animated.View style={rotationStyle}>
          <SVG.DownArrow />
        </Animated.View>
      </AnimatedTouchableOpacity>

      <Animated.View style={[styles.dropdownList, listStyle]}>
        <FlatList
          data={options}
          keyExtractor={(item) => item?.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onChange(item.key);
                toggleDropdown();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  item.key === value && styles.selectedOption,
                ]}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          )}
          scrollEnabled={options.length > 4}
          nestedScrollEnabled
        />
      </Animated.View>
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      width: '100%',
      zIndex: 1000,
    },
    label: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
      fontFamily: 'System',
    },
    dropdownButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      // paddingVertical: pixelSizeY(14),
      height: normalizeHeight(55),
      backgroundColor: colors.inputFields,
      borderRadius: 8,
    },
    dropdownButtonOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 0,
    },
    selectedText: {
      fontSize: 15,
      color: colors.textSecondary,
      fontFamily: 'System',
    },
    placeholder: {
      color: '#858B93',
    },
    dropdownList: {
      backgroundColor: colors.background1,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderWidth: 1,
      borderColor: colors.lightStroke,
      borderTopWidth: 0,
      overflow: 'hidden',
    },
    option: {
      padding: 15,
      borderTopWidth: 1,
      borderTopColor: '#E8E8F4',
    },
    optionText: {
      fontSize: 15,
      color: colors.textSecondary,
      fontFamily: 'System',
    },
    selectedOption: {
      color: colors.textSecondary,
      fontWeight: '600',
    },
  });
};
