import { useTheme } from "@/theme"
import { normalizeHeight, pixelSizeX } from "@/utils/sizes"
import { StyleSheet } from "react-native"

export const useStyle = () => {
    const {colors} = useTheme()
    return StyleSheet.create({
        cont:{
            width: '100%',
            backgroundColor: colors.lightPurple,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingLeft: pixelSizeX(20),
            height: normalizeHeight(175),
            // flex:1
        }
    })
}