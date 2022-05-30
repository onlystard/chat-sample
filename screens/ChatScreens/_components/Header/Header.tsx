import { StyleSheet } from 'react-native'
import React, { memo } from 'react'
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated'
import { HEADER_DELTA, MIN_HEADER_HEIGHT } from '../../../../constants'
import useColorScheme from '../../../../hooks/useColorScheme'
import Colors from '../../../../constants/Colors'

interface HeaderProps {
  y: Animated.Value<number>
}

const Header = (props: HeaderProps) => {
  const { y } = props
  const colorScheme = useColorScheme()

  const opacity = interpolateNode(y, {
    inputRange: [0, HEADER_DELTA - 16],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  })

  const textOpacity = interpolateNode(y, {
    inputRange: [HEADER_DELTA - 20, HEADER_DELTA - 8],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  })
  const textTranslate = interpolateNode(y, {
    inputRange: [HEADER_DELTA - 20, HEADER_DELTA - 4],
    outputRange: [10, 0],
    extrapolate: Extrapolate.CLAMP
  })

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, backgroundColor: Colors[colorScheme].background }
      ]}
    >
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: textOpacity,
            transform: [
              {
                translateY: textTranslate
              }
            ],
            color: Colors[colorScheme].text
          }
        ]}
      >
        Chats
      </Animated.Text>
    </Animated.View>
  )
}

export default memo(Header)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400'
  }
})
