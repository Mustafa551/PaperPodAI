import { DrawerActions, useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View } from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';

import { HORIZON_SPACE } from '@/utils/native';
import { normalizeHeight, normalizeWidth } from '@/utils/sizes';

import AppText from '../AppText/AppText';
import Icon from '../Icon/Icon';
import { IHeaderProps } from './HeaderTypes';
import { useStyles } from './styles';

const Header: React.FC<IHeaderProps> = memo((props) => {
  const { colors, layout } = useTheme();
  const {
    menuBtn = false,
    title,
    onLeftIcon = null,
    onRightIcon = null,
    extraStyle = {},
    empty = false,
    marginH = false,
    rightIcon = null,
    renderLeftFunc = null,
    renderRightFunc = null,
    cross = false,
    bar = colors.white,
    iconColor = colors.black,

    onBackPress = null,
  } = props;

  const styles = useStyles();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onPressLeftIcon = () => {
    if (onLeftIcon) onLeftIcon();
    else if (menuBtn) navigation.dispatch(DrawerActions.openDrawer());
    else if (onBackPress) onBackPress();
    else navigation.goBack();
  };

  const onPressRightIcon = () => {
    if (onRightIcon) onRightIcon();
  };

  const renderLeft = () => {
    let svg = (
      <View>
        <SVG.BackArrow fill={iconColor} />
      </View>
    );

    if (menuBtn)
      svg = (
        <Icon
          alignSelf="center"
          onPress={onPressLeftIcon}
          extraStyle={{
            container: { ...layout.shadow, ...styles.homeIconCont },
          }}
          SVGIcon={
            <SVG.Menu
              fill={colors.secondary}
              width={normalizeWidth(16)}
              height={normalizeHeight(16)}
            />
          }
        />
      );
    else if (cross) svg = <SVG.Cross fill={colors.black} />;

    return (
      <Icon
        // extraStyle={{container: styles.leftIconCont}}
        onPress={onPressLeftIcon}
        alignSelf="center"
        SVGIcon={svg}
      />
    );
  };

  const renderRight = () => (
    <Icon
      extraStyle={{ container: styles.rightIconCont }}
      SVGIcon={rightIcon}
      onPress={onPressRightIcon}
      alignSelf="center"
    />
  );

  return (
    <View style={[marginH && layout.mH(HORIZON_SPACE), extraStyle]}>
      <SafeAreaView style={layout.bgColor(bar)} />

      {!empty && (
        <View style={styles.container}>
          {renderLeftFunc ? renderLeftFunc() : renderLeft()}
          {!!title && (
            <AppText
              title={title}
              alignSelf="center"
              extraStyle={styles.title}
              fontSize={18}
              fontFamily="DMBold"
              color={colors.black}
            />
          )}
          <View style={styles.rightCont}>
            {renderRightFunc ? renderRightFunc() : rightIcon && renderRight()}
          </View>
        </View>
      )}
    </View>
  );
});

export default Header;
