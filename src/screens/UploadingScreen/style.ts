import { useTheme } from "@/theme"
import { normalizeHeight, pixelSizeX, pixelSizeY } from "@/utils/sizes"
import { StyleSheet } from "react-native"

export const useStyles = () => {
    const { colors } = useTheme()
    return StyleSheet.create({
        uploadCont: { width: '100%', height: normalizeHeight(200), backgroundColor: colors.white, borderRadius: 12, alignItems: 'center', justifyContent: "center" },

        cardCont:{
            width: '100%',
            height: normalizeHeight(90),
            backgroundColor: colors.lightPurple,
            borderRadius: 24,
            padding: pixelSizeX(15),
            marginTop: pixelSizeY(20),
            flexDirection: 'row',
            alignItems:'center'
        },

        iconCont:{width: 50,height:50,backgroundColor:colors.white,alignItems:'center',justifyContent:'center',borderRadius:25}
    })
} 