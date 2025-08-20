/* eslint-disable no-nested-ternary */
import type { IAppInputProps } from './AppInputTypes';

import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS_FAMILY } from '@/theme/fonts';

import { normalizeHeight, pixelSizeY } from '@/utils/sizes';

import AppText from '../AppText/AppText';
import Icon from '../Icon/Icon';
import { useStyles } from './styles';
import Space from '../Space/Space';

const AppInput: React.FC<IAppInputProps> = memo((props) => {
  const { colors, layout } = useTheme();

  const {
    animated = false,
    autoFocus = false,
    control,
    editable = true,
    error = '',
    extraStyle = {
      container: {},
      error: {},
      iconCont: {},
      textInput: {},
      label: {},
    },
    iconOpacity = 1,
    isName = false,
    isOpacity = false,
    keyboardType = 'default',
    letter = 0,
    maxLetter = 0,
    multiline = false,
    name,
    numberOfLines = 1,
    onChangeText = () => {},
    onPressCont = () => {},
    onPressIcon = () => {},
    placeholder = '',
    placeholderColor = colors.white,
    rightIconActive = false,
    secureTextEntry = false,
    SVGLeft = null,
    SVGRight = null,
    value = '',
    label = '',
  } = props;

  const styles = useStyles();
  const { field } = useController({ control, defaultValue: '', name });
  // const {language} = useAuthStore(state => state);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const onPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <Icon
          alignSelf="center"
          extraStyle={{
            container: { ...styles.iconCont, ...extraStyle.iconCont },
          }}
          iconLeft={false}
          onPress={onPasswordToggle}
          SVGIcon={
            showPassword ? (
              <SVG.EyeOpen fill={colors.gray800} height={20} width={20} />
            ) : (
              <SVG.EyeClose height={20} width={20} />
            )
          }
        />
      );
    }
    if (SVGRight) {
      return (
        <Icon
          alignSelf="center"
          extraStyle={{
            container: { ...styles.iconCont, ...extraStyle.iconCont },
          }}
          mR={0}
          onPress={onPressIcon}
          SVGIcon={SVGRight}
        />
      );
    }
    return <View style={layout.mR(15)} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressCont}
      style={layout.fullWidth}
    >
      {label && (
        <AppText
          title={label}
        fontSize={16}
        fontWeight={500}
        color={colors.white}
        // paddingHorizontal={19.5}
         
        />
      )}
      <Space mT={7} />
      <View
        // animate={!isOpacity ? {opacity: isFocused ? 1 : 0.5} : undefined}
        // from={{opacity: isOpacity ? 1 : 0.5}}
        style={[
          styles.textInputCont,
          layout.maxHeight(
            multiline ? normalizeHeight(150) : normalizeHeight(55),
          ),
          layout.minHeight(
            multiline ? normalizeHeight(150) : normalizeHeight(55),
          ),
          !multiline && layout.rowCenterBt,
          extraStyle.container,
          error && layout.mB(pixelSizeY(8)),
        ]}
        // transition={{duration: 250, type: 'timing'}}
      >
        {SVGLeft && (
          <Icon
            activeOpacity={iconOpacity}
            SVGIcon={SVGLeft}
            {...(!animated && { onPress: onPressIcon })}
            alignSelf="center"
            extraStyle={{
              container: {
                ...styles.iconCont,
                ...styles.iconContLeft,
                ...extraStyle.iconCont,
              },
            }}
          />
        )}

        <TextInput
          onPressIn={onPressCont}
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          // textAlign={language === 'ar' ? 'right' : 'left'}
          editable={editable}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          // onBlur={() => setIsFocused(false)}
          onChangeText={field.onChange}
          // onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          selectionColor={colors.black}
          style={[styles.textInput, extraStyle.textInput]}
          cursorColor={colors.white}
          value={value || field.value}
          {...(secureTextEntry && { secureTextEntry: !showPassword })}
        />
        {renderRightIcon()}
      </View>
      {(!!error || !!maxLetter) && (
        <View style={[layout.rowCenterBt, layout.mT(5)]}>
          <AppText
            color={colors.redError}
            extraStyle={[extraStyle.error, { fontSize: 11 }]}
            fontFamily="regular"
            title={error}
            variant="body4-openSans"
          />
          {maxLetter !== 0 && (
            <AppText
              alignSelf="flex-end"
              color={colors.textSecondary}
              title={`${letter}/${maxLetter}`}
              variant="body4-openSans"
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
});

export default AppInput;
