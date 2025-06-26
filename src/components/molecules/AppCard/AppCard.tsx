import { AppButton, AppText, Space } from '@/components/atoms';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { normalizeFont, pixelSizeX, pixelSizeY } from '@/utils/sizes';
import React from 'react';
import { Image, View } from 'react-native';
import { IAppCardProps } from './AppCardTypes';
import { useStyle } from './styles';

const AppCard: React.FC<IAppCardProps> = ({ data }) => {
  const { colors, layout } = useTheme();
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.imageStyle} />

      <View style={[layout.flex(0.9), layout.mL(pixelSizeX(10))]}>
        <AppText
          color={colors.white}
          fontSize={16}
          fontFamily="medium"
          title={data.title}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            color={colors.white}
            fontSize={8}
            fontFamily="regular"
            title={data.prof}
          />
          <AppText
            color={colors.white}
            fontSize={8}
            fontFamily="regular"
            title={data.institute}
          />
          <AppText
            color={colors.white}
            fontSize={8}
            fontFamily="regular"
            title={data.date}
          />
        </View>
        <Space mB={10} />

        <AppText
          color={colors.white}
          fontSize={9}
          fontFamily="light"
          title={data.description}
          numberOfLines={2}
        />
        <Space mB={10} />

        <View style={[layout.rowCenter]}>
          <AppButton
            width="90%"
            height={pixelSizeY(30)}
            shadow={false}
            title="Play Episode"
            onPress={() => {}}
            SVGLeft={<SVG.Play />}
            variant="gradient"
            bgColor={colors.white}
            extraStyle={{
              title: [
                layout.color(colors.primary),
                layout.fontSize(normalizeFont(9)),
              ],
              button: layout.alignSelf('flex-start'),
            }}
          />

          <SVG.Download />
        </View>
      </View>
      <View style={[layout.height(110), layout.mR(pixelSizeX(5))]}>
        <SVG.ThreeDots />
      </View>
    </View>
  );
};

export default AppCard;
