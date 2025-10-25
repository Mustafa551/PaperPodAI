import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
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
const UploadingProgressScreen = () => {
    // Hooks
    const insets = useSafeAreaInsets();
    const { layout, colors } = useTheme();
    const navigation = useNavigation();
    const PAGE_SIZE = 10;
    const [sortBy, setSortBy] = useState<SortOption['key']>('desc');
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
        queryFn: ({ pageParam = 0 }) =>
            getMyArticles({ sort: sortBy, limit: PAGE_SIZE, offset: pageParam, status: 'pending' }),
        getNextPageParam: (lastPage, allPages) => {
            const lastItems = lastPage?.articles ?? [];

            if (!lastItems || lastItems.length === 0) {
                return undefined;
            }

            const totalFetched = allPages.reduce(
                (total, page) => total + (page?.articles?.length ?? 0),
                0,
            );

            if (lastPage?.total && totalFetched >= lastPage.total) {
                return undefined;
            }

            if (lastItems.length < PAGE_SIZE) {
                return undefined;
            }

            return totalFetched;
        },
        initialPageParam: 0,
        staleTime: 30_000,
    });
    console.log(
        'data data @#@#@',
        data?.pages?.[0]?.data?.articles,
    );
    console.log(
        'FINAL articles passed to FlatList >>>',
        Array.isArray(data?.pages?.[0]?.data?.articles)
            ? data?.pages?.[0]?.data?.articles?.length
            : 0,
        data?.pages?.[0]?.data?.articles,
    );
    const articles = useMemo(() => {
        // Primary (new response shape)
        const primary =
            Array.isArray(data?.pages?.[0]?.data?.articles)
                ? data?.pages?.[0]?.data?.articles
                : [];
        console.log("primary data for testing", primary);
        if (primary.length > 0) {
            return primary;
        }

        // Fallback (older response shape)
        return (
            data?.pages?.flatMap((page: any) => page?.articles ?? []) ?? []
        );
    }, [data]);
    console.log("articles newonesaarticles@@@@@ pending", articles);   
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
                renderItem={({ item }) => {
                    return (
                        <View style={styles.cardCont}>
                            <View style={styles.iconCont}>
                                <SVG.Upload fill={colors.primary} />
                            </View>
                            <Space mR={10} />
                            <View style={{ width:'80%' }} >
                                <AppText numberOfLines={2} title={item?.fileName} color='black' fontSize={16} fontFamily="regular" />
                                <Space mB={5} />
                                <AppText title={"In progress"} color='#8A2BE1' fontSize={16} fontFamily="regular" />
                            </View>
                        </View>
                    )
                }}
                contentContainerStyle={{ paddingHorizontal: 12, paddingTop: pixelSizeY(20) }}
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
})