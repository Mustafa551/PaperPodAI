import { View, Text } from 'react-native'
import React from 'react'
import { AppScreen } from '@/components/templates'
import { useTheme } from '@/theme'
import { pixelSizeX } from '@/utils/sizes'

const HomeScreen = () => {
  const { layout, colors } = useTheme()
  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      preset="scroll"
      backgroundColor={colors.black}
      style={layout.pH(pixelSizeX(10))}
    >

    </AppScreen>
  )
}

export default HomeScreen