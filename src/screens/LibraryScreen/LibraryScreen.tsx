
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useStyles from './style';
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';
import { AppButton, AppText, AssetByVariant, Space } from '@/components/atoms';

const { width } = Dimensions.get('window');

interface LibraryItem {
  id: string;
  title: string;
  authorImage: string;
}

const LibraryScreen = () => {
  const [sortBy, setSortBy] = useState('Recent');
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styless = useStyles();

  const libraryItems: LibraryItem[] = [
    {
      id: '1',
      title: 'Climate Modeling with Machine Learning',
      authorImage: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2',
      title: 'Ethics of AI: Navigating Bias and Responsibility',
      authorImage: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '3',
      title: 'Climate Modeling with Machine Learning',
      authorImage: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '4',
      title: 'Climate Modeling with Machine Learning',
      authorImage: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '5',
      title: 'Climate Modeling with Machine Learning',
      authorImage: '/placeholder.svg?height=40&width=40',
    },
  ];

  const handleItemPress = (item: LibraryItem) => {
    console.log('Item pressed:', item.title);
  };

  const handleMenuPress = (item: LibraryItem) => {
    console.log('Menu pressed for:', item.title);
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      backgroundColor={colors.black}
      preset="scroll"
      style={layout.pH(pixelSizeX(10))}
    >
      <Space mT={60} />

      <View style={styless.header}>
        <Text style={styless.title}>My Library</Text>
        <AppButton
          bgColor={'transparent'}
          onPress={() => console.log('Sort pressed')}
          title={'Sort By'}
          variant="outlined"
          shadow={false}
          width={140}
          height={35}
          extraStyle={{
            button: {
              borderColor: '#FFFFFF',
              paddingVertical: pixelSizeY(8),
              paddingHorizontal: pixelSizeX(16),
              justifyContent: 'space-between',
            },
            title: {
              fontWeight: '400',
              fontSize: 14,
              color: '#FFFFFF',
            },
          }}
          SVGRight={
            <AssetByVariant
              resizeMode="contain"
              path={'sorticon'}
              width={normalizeWidth(18)}
              height={normalizeHeight(18)}
            />
          }
        />
      </View>

      <Space mB={20} />

      <ScrollView style={styless.scrollView} showsVerticalScrollIndicator={false}>
        <View>
          {libraryItems.map((item) => (
            <View key={item.id}>
              <Space mB={5} />
              <TouchableOpacity style={[styless.libraryItem]} onPress={() => handleItemPress(item)}>
                <View>
                  <AssetByVariant
                    resizeMode="contain"
                    path={'docimg'}
                    width={normalizeWidth(70)}
                    height={normalizeHeight(70)}
                  />
                </View>

                <View style={styless.itemContent}>
                  <AppText
                    title={item.title}
                    fontSize={16}
                    fontWeight={400}
                    color={'#FFFFFF'}
                    extraStyle={{ lineHeight: 22.5 }}
                  />
                </View>

                <View style={styless.itemRight}>
                  <View style={styless.avatarPlaceholder}>
                    <AssetByVariant
                      resizeMode="contain"
                      path={'play'}
                      width={normalizeWidth(15)}
                      height={normalizeHeight(15)}
                    />
                  </View>

                  <TouchableOpacity style={layout.padding(5)} onPress={() => handleMenuPress(item)}>
                    <AssetByVariant
                      resizeMode="contain"
                      path={'threedot'}
                      width={normalizeWidth(5)}
                      height={normalizeHeight(22)}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default LibraryScreen;

