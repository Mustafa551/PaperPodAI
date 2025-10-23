import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppScreen } from '@/components/templates'
import { SVG } from '@/theme/assets/icons'
import { AppText, AssetByVariant, Space } from '@/components/atoms'
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes'
import { useTheme } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const UploadingProgressScreen = () => {
    // Hooks
    const insets = useSafeAreaInsets();
    const { layout, colors } = useTheme();
    const navigation = useNavigation();
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
            <View style={{ alignItems: 'center', marginTop: pixelSizeY (15) , }}>
                <AssetByVariant
                    resizeMode="contain"
                    path={'signupbg'}
                    width={normalizeWidth(267)}
                    height={normalizeHeight(247)}
                />
                <Space mB={30} />
                <AppText title="We’re Working On It" color={'white'} fontSize={24} fontFamily='medium'  extraStyle={layout.alignSelf('center')} />
                <Space mB={5} />
                <AppText extraStyle={{textAlign:'center' , lineHeight:normalizeHeight(27)}} title="Your Paper Is Being Converted. This May Take A Few Minutes" color={'white'} fontSize={16} fontFamily="regular" />
            </View>
            <FlatList
                data={[0]}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.cardCont}>
                            <View style={styles.iconCont}>
                                <SVG.Upload fill={colors.primary} />
                            </View>
                            <Space mR={10} />
                            <View>
                                <AppText title={item?.fileName} color='black' fontSize={16} fontFamily="regular" />
                                <Space mB={5} />
                                <AppText title={"In progress"} color='#8A2BE1' fontSize={16} fontFamily="regular" />
                            </View>
                        </View>
                    )
                }}
                contentContainerStyle={{ paddingHorizontal:  12, paddingTop: pixelSizeY(20) }}
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