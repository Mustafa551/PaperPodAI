import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import { normalizeFont, normalizeHeight, normalizeWidth, pixelSizeY } from '@/utils/sizes';

const useStyles = () => {
    const { colors } = useTheme()
    return StyleSheet.create({
        cell: {
            borderColor: colors.inputFields,
            backgroundColor: colors.inputFields,
            borderRadius: pixelSizeY(6),
            borderWidth: 1,
            color: 'black',
            fontSize: normalizeFont(24),
            fontWeight: '500',
            height: normalizeHeight(55),
            paddingTop: pixelSizeY(12),
            textAlign: 'center',
            width: normalizeWidth(50),
        },

        codeFieldRoot: {
            justifyContent: 'space-evenly'

        },

        focusCell: {
            borderColor: colors.primary,
            borderWidth: 2,
            backgroundColor:colors.black,
            color: colors.white
        },
    });
};

export default useStyles;
