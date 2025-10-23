import { AppButton, AppText, AssetByVariant, Space } from '@/components/atoms';
import { useTheme } from '@/theme';
import { SVG } from '@/theme/assets/icons';
import { normalizeFont, normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { IAppCardProps } from './AppCardTypes';
import { useStyle } from './styles';
import { downloadAudio } from '@/utils/helpers';

const AppCard: React.FC<IAppCardProps> = ({ data }) => {
  console.log("🚀 ~ AppCard ~ data:@@@", data);

  const { colors, layout } = useTheme();
  const styles = useStyle();
  // Format createdAt date to "Month day, year" (e.g., "May 3, 2025")
  const formattedDate = data?.createdAt
    ? new Date(data.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : '';

  return (
    <View style={styles.container}>
      <AssetByVariant
        resizeMode="contain"
        path={'docimg'}
        width={normalizeWidth(90)}
        height={normalizeHeight(110)}
      />
      {/* <Image source={{ uri: "https://img.freepik.com/free-photo/top-view-hand-writing-love-letter_23-2150716552.jpg" }} style={styles.imageStyle} /> */}

      <View style={[layout.flex(0.9), layout.mL(pixelSizeX(10))]}>
        <AppText
          color={colors.white}
          fontSize={16}
          fontFamily="medium"
          title={data?.fileName}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <AppText
            color={colors.white}
            fontSize={8}
            fontFamily="regular"
            title={data.prof}
          /> */}
          {/* <AppText
            color={colors.white}
            fontSize={8}
            fontFamily="regular"
            title={data.institute}
          /> */}
          <AppText
            color={colors.white}
            fontSize={8}
            fontFamily="regular"
            title={formattedDate}
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
          {/* <AppButton
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
          /> */}
          <TouchableOpacity style={{}} onPress={() => {
            console.log("data?.audioFilePath", data?.audioFilePath)
            downloadAudio(data?.audioFilePath);
          }} >
            <SVG.Download />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[layout.height(110), layout.mR(pixelSizeX(5))]}>
        <SVG.ThreeDots />
      </View>
    </View>
  );
};

export default AppCard;
