import { FlatList, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { AppScreen } from '@/components/templates'
import { SVG } from '@/theme/assets/icons'
import { AppText, AssetByVariant, Space } from '@/components/atoms'
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes'
import { useTheme } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMyArticles } from '@/store/userSlice/userApiServices'
type SortOption = {
    key: 'desc' | 'asc';
    label: string;
};
const extractArticlesFromPages = (pages: any[] | undefined) => {
    if (!Array.isArray(pages)) return [];

    // 1. Try new shape { data: { articles: [...] } }
    const mergedNewShape = pages.flatMap((p: any) => {
        if (Array.isArray(p?.data?.articles)) {
            return p.data.articles;
        }
        return [];
    });

    if (mergedNewShape.length > 0) {
        return mergedNewShape;
    }

    // 2. Fallback old shape { articles: [...] }
    return pages.flatMap((p: any) => Array.isArray(p?.articles) ? p.articles : []);
};
const UploadingProgressScreen = () => {
    // Hooks
    const insets = useSafeAreaInsets();
    const { layout, colors } = useTheme();
    const navigation = useNavigation();
    const PAGE_SIZE = 10;
    const [sortBy, setSortBy] = useState<SortOption['key']>('desc');
    const [isRefreshing, setIsRefreshing] = useState(false);
    // Api call 
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isRefetching,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['myArticles', sortBy],
        queryFn: async ({ pageParam = 0 }) => {
            return getMyArticles({
                sort: sortBy,
                limit: PAGE_SIZE,
                offset: pageParam,
                status: 'pending',
            });
        },
        getNextPageParam: (lastPage, allPages) => {
            // lastPage can be either { data: { articles, total } } OR { articles, total }
            const lastItems: any[] =
                Array.isArray(lastPage?.data?.articles)
                    ? lastPage.data.articles
                    : (Array.isArray(lastPage?.articles) ? lastPage.articles : []);

            if (!lastItems || lastItems.length === 0) {
                return undefined;
            }

            // total fetched so far
            const allArticlesSoFar = extractArticlesFromPages(allPages);
            const totalFetched = allArticlesSoFar.length;

            const totalAvailable =
                typeof lastPage?.data?.total === 'number'
                    ? lastPage.data.total
                    : (typeof lastPage?.total === 'number' ? lastPage.total : undefined);

            if (totalAvailable && totalFetched >= totalAvailable) {
                return undefined;
            }

            // if we got less than PAGE_SIZE, probably no more
            if (lastItems.length < PAGE_SIZE) {
                return undefined;
            }

            // else next offset is how many we've fetched so far
            return totalFetched;
        },
        initialPageParam: 0,
        staleTime: 30_000,
    });
    const articles = useMemo(() => {
        return extractArticlesFromPages(data?.pages);
    }, [data]);
    const handleLoadMore = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    }, [refetch]);
    return (
        <AppScreen
            backgroundColor={colors.black}
            preset="scroll"
            style={{
                paddingTop: insets.top + pixelSizeY(10),
                paddingHorizontal: pixelSizeX(20),
            }}
        >
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: pixelSizeY(10), marginLeft: pixelSizeX(5) }}>
                <SVG.ArrowLeft fill={colors.white} width={24} height={24} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: pixelSizeY(15), }}>
                <AssetByVariant
                    resizeMode="contain"
                    path={'signupbg'}
                    width={normalizeWidth(267)}
                    height={normalizeHeight(247)}
                />
                <Space mB={30} />
                <AppText title="We’re Working On It" color={'white'} fontSize={24} fontFamily='medium' extraStyle={layout.alignSelf('center')} />
                <Space mB={5} />
                <AppText extraStyle={{ textAlign: 'center', lineHeight: normalizeHeight(27) }} title="Your Paper Is Being Converted. This May Take A Few Minutes" color={'white'} fontSize={16} fontFamily="regular" />
            </View>
            <FlatList
                data={articles}
                keyExtractor={(item, index) => `${item?.id || item?._id || item?.articleId || 'art'}-${index}`}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.cardCont}>
                            <View style={styles.iconCont}>
                                <SVG.Upload fill={colors.primary} />
                            </View>
                            <Space mR={10} />
                            <View style={{ width: '80%' }}>
                                <AppText
                                    numberOfLines={2}
                                    title={item?.fileName || item?.title || 'Untitled file'}
                                    color='black'
                                    fontSize={16}
                                    fontFamily="regular"
                                />
                                <Space mB={5} />
                                <AppText
                                    title={"In progress"}
                                    color='#8A2BE1'
                                    fontSize={16}
                                    fontFamily="regular"
                                />
                            </View>
                        </View>
                    )
                }}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <View style={styles.footerLoading}>
                            <ActivityIndicator color={colors.primary} />
                            <Space mB={10} />
                        </View>
                    ) : null
                }
                contentContainerStyle={{ paddingHorizontal: 12, paddingTop: pixelSizeY(20), paddingBottom: pixelSizeY(40) }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.4}
                refreshing={isRefreshing || isRefetching}
                onRefresh={handleRefresh}
            />
        </AppScreen>
    )
}

export default UploadingProgressScreen

const styles = StyleSheet.create({
    cardCont: {
        width: '100%',
        backgroundColor: "#EAD8FF",
        borderRadius: 24,
        padding: pixelSizeX(15),
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconCont: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
    ,
    footerLoading: {
        paddingVertical: pixelSizeY(20),
        alignItems: 'center',
        justifyContent: 'center',
    }
})