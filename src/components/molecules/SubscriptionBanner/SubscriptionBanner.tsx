import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme'
import { AppButton, AppText, Space } from '@/components/atoms'
import { pixelSizeY } from '@/utils/sizes'
import { SVG } from '@/theme/assets/icons'
import { ISubscriptionBannerProps } from './SubscriptionBannerTypes'

const SubscriptionBanner: React.FC<ISubscriptionBannerProps> = ({description, btnTitle}) => {
    const {colors} = useTheme()
  return (
   <View
        style={{
          width: '100%',
          backgroundColor: colors.darkShade,
          paddingVertical: pixelSizeY(20),
        }}
      >
        <AppText
          title={description}
          fontSize={16}
          textAlign="center"
          width="60%"
          alignSelf="center"
          fontWeight={500}
          color={colors.white}
          fontFamily="medium"
        />
        <Space mB={20} />

        <AppButton
          onPress={() => {}}
          title={btnTitle}
          variant="gradient"
          shadow={false}
          SVGLeft={<SVG.Crown />}
        />
      </View>
  )
}

export default SubscriptionBanner