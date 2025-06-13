import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { FONTS_FAMILY } from '@/theme/fonts';

import Icon from '../Icon/Icon';
import { INoteProps } from './NoteTypes';
import { useStyles } from './styles';

const Note: React.FC<INoteProps> = ({ title }) => {
  const { colors, layout } = useTheme();
  const styles = useStyles();
  return (
    <Icon
      SVGIcon={<SVG.Info />}
      title={title}
      color={colors.subHeading}
      numberOfLines={0}
      mR={10}
      extraStyle={{
        title: [layout.fontFamily(FONTS_FAMILY.DMRegular)],
        container: styles.cont,
      }}
    />
  );
};

export default Note;
