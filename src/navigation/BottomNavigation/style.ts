import { useTheme } from '@/theme';
import { normalizeHeight, pixelSizeY } from '@/utils/sizes';
import { StyleSheet } from 'react-native';



export const useStyle = () =>{
    const {layout,colors} = useTheme()
 return(   StyleSheet.create({
        tabStyle: {
            backgroundColor: colors.white,
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            height: normalizeHeight(100),
            ...layout.shadow,
            marginTop: pixelSizeY(-20),
            paddingBottom: pixelSizeY(30),
            paddingTop: pixelSizeY(12),
        },
    }))
}