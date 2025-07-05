import { AppButton, AppText, Space } from '@/components/atoms'
import { useTheme } from '@/theme'
import { SVG } from '@/theme/assets/icons'
import React from 'react'
import { View } from 'react-native'
import { useStyle } from './style'

const NewUploadBanner = () => {
  const { colors, layout } = useTheme()
  const styles = useStyle()
  return (
    <View style={styles.cont}>


      <View style={layout.flex(0.8)}>
        <AppText title='Upload a New Paper' color={colors.black} fontSize={16} fontFamily='medium' />
        <Space mB={5} />

        <AppText title='Convert your latest research into a podcast with one tap.' color={colors.grey} fontSize={10} fontFamily='regular' />
        <Space mB={10} />

        <AppButton
          width={'60%'}
          height={40}
          bgColor={colors.primary}
          onPress={() => { }}
          title={'Browse File'}
          variant="gradient"
          shadow={false}
          extraStyle={{
            title: {
              fontWeight: '400',
            },
            button: { alignSelf: 'flex-start' }
          }}
          SVGRight={
            <SVG.UploadWhite
            />
          }
        />
      </View>

      <SVG.Banner />
    </View>
  )
}

export default NewUploadBanner