import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';

import { useTheme } from '@/theme';

const FloatingLabelInput = ({ label, onChangeText, value }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    Animated.timing(animatedLabel, {
      duration: 200,
      toValue: isFocused || value ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    backgroundColor: colors.background,
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 16], // ✅ Numeric values only
    }),
    left: 15,
    paddingHorizontal: 5,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -10], // ✅ Both values are numbers (no % or px)
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <TextInput
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#555',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 20,
    // paddingTop: 10,
    height: 55,
    position: 'relative',
    width: '100%',
  },
  input: {
    fontSize: 16,
    height: '100%',
    // paddingHorizontal: 4,
    // zIndex: 1,
    // backgroundColor: 'red',
  },
  label: {
    backgroundColor: '#ffff',
    color: '#555',
    fontSize: 16,
    left: 15,
    paddingHorizontal: 5,
    position: 'absolute',
    top: -10,
    // zIndex: -2,
  },
});

export default FloatingLabelInput;
