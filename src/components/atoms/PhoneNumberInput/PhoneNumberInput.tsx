import React, { useEffect, useRef, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';

import { countryCodes } from '@/constant';
import { normalizeHeight, normalizeWidth, pixelSizeX } from '@/utils/sizes';

// You'll need to ensure this import path is correct

// Define the country code interface
interface CountryCodeData {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

// Define props interface
interface PhoneInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  label?: string;
  placeholder?: string;
  defaultCountry?: string;
  required?: boolean;
}

const PhoneNumberInput: React.FC<PhoneInputProps> = ({
  name,
  control,
  error,
  label = '',
  placeholder = '-------------',
  defaultCountry = 'US',
  required = false,
  ...rest
}) => {
  const styles = useStyles();
  const { colors } = useTheme();
  // Find default country in the list
  const defaultCountryData =
    countryCodes.find((country) => country.code === defaultCountry) ||
    countryCodes[0];

  // input ref
  const inputRef = useRef<TextInput>(null);

  //code dial ref
  const codeDialRef = useRef<TextInput>(null);

  const [selectedCountry, setSelectedCountry] =
    useState<CountryCodeData>(defaultCountryData);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [localPhoneNumber, setLocalPhoneNumber] = useState<string>('');
  // Flag to prevent recursive detection
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  //   dial code state
  const [dialCode, setDialCode] = useState<string>('');

  // Use react-hook-form controller
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  // Function to detect country from input and remove country code from input
  const detectCountryFromInput = (input: string) => {
    if (!input || isDetecting) return false;

    setIsDetecting(true);

    // Remove all non-numeric characters
    const numericInput = input.replace(/\D/g, '');
    let countryDetected = false;

    // First, check if the input matches any country code
    for (const country of countryCodes) {
      const dialCode = country.dialCode.replace('+', '');
      if (numericInput.startsWith(dialCode)) {
        // Found matching country code
        countryDetected = true;

        // Change the country
        setSelectedCountry(country);

        // Remove the country code from the phone number
        const numberWithoutCode = numericInput.substring(dialCode.length);
        setLocalPhoneNumber(numberWithoutCode);

        // Update form value with the full formatted number (with country code)
        field.onChange(
          `${country.code}-${country.dialCode}${numberWithoutCode}`,
        );
        break;
      }
    }

    setIsDetecting(false);
    return countryDetected;
  };

  const handleInputChange = (text: string, inputType: 'code' | 'number') => {
    if (inputType === 'code') {
      setDialCode(text);

      const country = countryCodes.find(
        (country) => country.dialCode.replace('+', '') === text,
      );

      if (country) {
        setSelectedCountry(country);
        // Move focus to local number input
        inputRef.current?.focus();
      } else {
        // setDialCode('');
        setSelectedCountry({
          name: '',
          code: '',
          dialCode: '',
          flag: '',
        });
      }
    } else {
      // Handle local number input
      const numericInput = text.replace(/\D/g, '');
      setLocalPhoneNumber(numericInput);
      field.onChange(
        `${selectedCountry.code}-${selectedCountry.dialCode}${numericInput}`,
      );

      // If backspace and input is empty, move focus to code input
      if (text === '' && codeDialRef.current) {
        codeDialRef.current.focus();
      }
    }
  };

  const selectCountry = (country: CountryCodeData) => {
    // console.log('🚀 ~ selectCountry ~ inputRef:', inputRef);
    setSelectedCountry(country);
    setModalVisible(false);
    setDialCode(country.dialCode);
    // Use setTimeout to ensure state updates have completed
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    // // Update the form value with the new country code
    // field.onChange(`+${country.dialCode}${localPhoneNumber}`);
  };

  // Define the renderCountryItem function
  const renderCountryItem = ({ item }: { item: CountryCodeData }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => selectCountry(item)}
    >
      <Text style={styles.flagText}>{item.flag}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.dialCode}>{item.dialCode}</Text>
    </TouchableOpacity>
  );

  // When component mounts or field.value changes
  useEffect(() => {
    if (field.value && !isDetecting) {
      // If the value starts with a +, try to parse it
      if (typeof field.value === 'string' && field.value.startsWith('+')) {
        const valueWithoutPlus = field.value.substring(1);
        detectCountryFromInput(valueWithoutPlus);
      }
    }
  }, [field.value]);

  // Function to check if the phone number is valid
  const isValidPhoneNumber = (number: string): boolean => {
    // Basic validation - you can enhance this
    const phoneNumberWithoutPlus = number.replace(/^\+/, '');
    return phoneNumberWithoutPlus.length > 5;
  };

  const fullNumber = `+${selectedCountry.dialCode}${localPhoneNumber}`;
  const isValid = isValidPhoneNumber(fullNumber);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={[styles.inputContainer]}>
        {/* Country selector button */}
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setModalVisible(true)}
        >
          {/* {selectedCountry.dialCode && ( */}
          <Text style={styles.flagText}>{selectedCountry.flag}</Text>
          <SVG.DropDown />
          {/* )} */}
        </TouchableOpacity>
        {/* country code input */}
        <Text style={styles.dialCodeText}>{'+'}</Text>
        <TextInput
          {...rest}
          ref={codeDialRef}
          style={styles.inputCodeDial}
          value={dialCode}
          onChangeText={(text) => handleInputChange(text, 'code')}
          placeholder="234"
          keyboardType="numeric"
          placeholderTextColor={colors.placeHolderText}
          onBlur={field.onBlur}
        />

        {/* Phone number input */}
        <TextInput
          ref={inputRef}
          {...rest}
          style={styles.input}
          value={localPhoneNumber}
          onChangeText={(text) => handleInputChange(text, 'number')}
          placeholder={placeholder}
          keyboardType="numeric"
          placeholderTextColor={colors.placeHolderText}
          onBlur={field.onBlur}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && localPhoneNumber === '') {
              console.log('Backspace key pressed');
              codeDialRef.current?.focus();
            }
          }}
        />
      </View>

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Display the full formatted phone number */}
      {/* {field.value && (
        <Text
          style={[
            styles.fullNumber,
            isValid ? styles.validNumber : styles.invalidNumber,
          ]}
        >
          Full number: {fullNumber} {isValid ? '✓' : ''}
        </Text>
      )} */}

      {/* Country selection modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={countryCodes}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              style={styles.countryList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      width: '100%',
      maxWidth: 400,
      // padding: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 6,
      color: '#374151',
    },
    required: {
      color: '#ef4444',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 6,
      height: normalizeHeight(56),
      backgroundColor: colors.inputFields,
    },
    inputError: {
      borderColor: '#ef4444',
    },
    countrySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 5,
      borderColor: '#d1d5db',
      // borderRightWidth: 1,
      // borderTopLeftRadius: 6,
      // borderBottomLeftRadius: 6,
    },
    flagText: {
      fontSize: 18,
      marginRight: 4,
    },
    dialCodeText: {
      fontSize: 16,
      fontWeight: '500',
      marginRight: 4,
      color: colors.placeHolderText,
    },
    input: {
      flex: 1,
      // padding: 10,
      borderWidth: 0,
      fontSize: 16,
    },
    inputCodeDial: {
      borderWidth: 0,
      fontSize: 16,
      // borderRightWidth: 1,
      // minWidth: normalizeWidth(40),
      // borderColor: '#d1d5db',
      marginLeft: -4,
      // backgroundColor: 'red',
      paddingRight: pixelSizeX(10),
    },
    errorText: {
      color: colors.redError,
      fontSize: 12,
      marginTop: 4,
    },
    fullNumber: {
      marginTop: 8,
      fontSize: 14,
    },
    validNumber: {
      color: '#10b981',
    },
    invalidNumber: {
      color: '#6b7280',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      paddingBottom: 20,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    closeText: {
      fontSize: 16,
      color: '#3b82f6',
    },
    countryList: {
      maxHeight: 400,
    },
    countryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    name: {
      flex: 1,
      fontSize: 16,
      marginLeft: 8,
    },
    dialCode: {
      fontSize: 14,
      color: '#6b7280',
    },
  });
};

export default PhoneNumberInput;
