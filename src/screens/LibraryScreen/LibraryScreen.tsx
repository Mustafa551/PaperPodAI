import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import useStyles from './style';
import { normalizeFont, normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';
import { AppText, AssetByVariant, Space } from '@/components/atoms';
import { Modal, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SVG } from '@/theme/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

interface LibraryItem {
  id: string;
  title: string;
  authorImage: string;
}

const LibraryScreen = () => {
  const [sortBy, setSortBy] = useState('Recent');
  const [showDetail, setShowDetail] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBtnWidth, setSortBtnWidth] = useState(0);
  const navigation = useNavigation();
  const sortOptions = [
    { key: 'latest', label: 'Latest Added' },
    { key: 'oldest', label: 'Oldest First' },
  ];
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  const styless = useStyles();


  const detailData = {
    title: 'AI And Climate Modeling',
    author: 'Dr. Emily Rao',
    university: 'Stanford University',
    date: '05 Jan 2025',
    content: [
      'AI is transforming climate modeling by improving prediction accuracy and processing speed.',
      'It helps analyze vast environmental data and detect complex patterns.',
      'Researchers use AI to simulate climate scenarios more efficiently.',
      "This innovation supports better forecasting and smarter environmental decisions.",
      'This innovation supports better forecasting and smarter environmental decisions.',
    ],
  };
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
    // setShowDetail(true)
    navigation.navigate("AudioPlayerScreen" as never);

    console.log('Item pressed:', item.title);
  };

  const handleMenuPress = (item: LibraryItem) => {
    console.log('Menu pressed for:', item.title);
  };
  const handleSortPress = (opt: any) => {
    setSortBy(opt.key);
    setSortOpen(false);
  };

  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      backgroundColor={colors.black}
      preset="scroll"
      style={{ paddingTop: useSafeAreaInsets().top + pixelSizeY(10) , paddingHorizontal: pixelSizeX(20) }}
    >
      <View style={[styless.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <Text style={styless.title}>My Library</Text>
        <View style={{ position: 'relative', zIndex: 999 }}>
          <TouchableOpacity
            onPress={() => setSortOpen(prev => !prev)}
            style={styles.sortButton}
            onLayout={({ nativeEvent }) => setSortBtnWidth(nativeEvent.layout.width)}
          >
            <AppText
              onPress={() => setSortOpen(prev => !prev)}
              title={sortOptions.find(opt => opt.key === sortBy)?.label || 'Sort By'}
              fontSize={normalizeFont(14)}
              fontWeight={400}
              color={'#FFFFFF'}
            />
            <View style={{ marginLeft: pixelSizeX(20), transform: [{ rotate: sortOpen ? '180deg' : '0deg' }] }}>
              <AssetByVariant
                resizeMode="contain"
                path={'sorticon'}
                width={normalizeWidth(18)}
                height={normalizeHeight(18)}
              />
            </View>
          </TouchableOpacity>
          {sortOpen && (
            <View style={[styles.dropdown, { width: sortBtnWidth }]}>
              {sortOptions?.map(opt => (
                <TouchableOpacity
                  key={opt.key}
                  style={[styles.dropdownItem]}
                  onPress={() => {
                    handleSortPress(opt);

                  }}
                >
                  <AppText onPress={() => {
                    handleSortPress(opt);
                  }} title={opt.label} fontSize={normalizeFont(12)} fontWeight={400} color={opt.key === sortBy ? '#111827' : '#475569'} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      <Space mB={30} />
      <ScrollView style={styless.scrollView} showsVerticalScrollIndicator={false}>
        <View>
          {libraryItems.map((item) => (
            <View key={item.id}>
              <Space mB={5} />
              <View style={[styless.libraryItem]} >
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
                  <TouchableOpacity onPress={() => handleItemPress(item)} style={styless.avatarPlaceholder}>
                    {/* <SVG.DownloadArtical
                      width={normalizeWidth(16)}
                      height={normalizeHeight(16)} /> */}
                    <AssetByVariant
                      resizeMode="contain"
                      path={'play'}
                      width={normalizeWidth(16)}
                      height={normalizeHeight(16)}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={layout.padding(5)} onPress={() => handleMenuPress(item)}>
                    <AssetByVariant
                      resizeMode="contain"
                      path={'threedot'}
                      width={normalizeWidth(5)}
                      height={normalizeHeight(22)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Download Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={showDetail}
        onRequestClose={() => setShowDetail(false)}
      >
        <Pressable onPress={() => setShowDetail(false)} style={styles.modalContainer}>
          <LinearGradient
            colors={['#4C1D95', '#000000']}
            style={styles.modalBox}
          >
            <View style={{ width: '87%', paddingTop: pixelSizeY(22), paddingBottom: pixelSizeY(30) }}>
              <TouchableOpacity onPress={() => setShowDetail(false)} style={styles.backButton}>
                <SVG.ArrowLeft />
              </TouchableOpacity>
              <AppText
                title={detailData.title}
                fontSize={normalizeFont(14)}
                fontWeight={600}
                color="#FFFFFF"
                extraStyle={{ marginTop: 8 }}
              />

              <View style={styles.metaRow}>
                <AppText title={detailData.author} fontSize={12} color="#ffff" />
                <AppText title={detailData.university} fontSize={12} color="#ffff" />
                <AppText title={detailData.date} fontSize={12} color="#ffff" />
              </View>

              <View style={styles.content}>
                {detailData.content.map((para, idx) => (
                  <AppText
                    key={idx}
                    title={para}
                    fontSize={14}
                    fontWeight={400}
                    color="#FFFFFF"
                    extraStyle={{ lineHeight: 22, marginBottom: 12 }}
                  />
                ))}
              </View>

              <TouchableOpacity style={styles.downloadBtn}>
                <SVG.Download2 />
                <AppText
                  title="Download"
                  fontSize={normalizeFont(14)}
                  fontWeight={400}
                  color="#7C3AED"
                  extraStyle={{ marginLeft: pixelSizeX(12), paddingVertical: pixelSizeY(4) }}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Pressable>
      </Modal>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: pixelSizeX(18),
    paddingVertical: pixelSizeY(10),
    borderRadius: 40,
    borderWidth: normalizeWidth(1),
    borderColor: '#FFFFFF',
    minHeight: normalizeHeight(42),
  },
  caret: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 16,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: normalizeHeight(48),
    borderRadius: 18,
    paddingVertical: pixelSizeY(6),
    backgroundColor: 'rgba(226, 232, 240, 1)',
    // shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    // elevation (Android)
    elevation: 6,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: pixelSizeY(12),
    paddingHorizontal: pixelSizeX(16),
  },
  modalContainer: {
    flex: 1,
    bottom: normalizeHeight(120),
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%'
  },
  modalBox: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: '#8A2BE1',

  },
  backButton: {
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    width: '100%',
  },
  content: {
    marginTop: 16,
    marginBottom: 20,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: pixelSizeY(8),
    paddingBottom: pixelSizeY(8),
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },

});

export default LibraryScreen;
