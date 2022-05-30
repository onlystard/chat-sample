import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { HEADER_DELTA, MAX_HEADER_HEIGHT } from '../../../../constants'
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated'
import useColorScheme from '../../../../hooks/useColorScheme'
import Colors from '../../../../constants/Colors'

interface CoverProps {
  y: Animated.Value<number>
}

const Background = (props: CoverProps) => {
  const { y } = props
  const colorScheme = useColorScheme()

  const scale: any = interpolateNode(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [4, 1],
    extrapolateRight: Extrapolate.CLAMP
  })
  const opacity: any = interpolateNode(y, {
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.2, 1],
    extrapolate: Extrapolate.CLAMP
  })
  const translateY: any = interpolateNode(y, {
    inputRange: [0, MAX_HEADER_HEIGHT],
    outputRange: [0, -100],
    extrapolate: Extrapolate.CLAMP
  })
  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale, translateY }] }]}
    >
      <View
        style={[
          styles.background,
          { backgroundColor: Colors[colorScheme].background }
        ]}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: Colors[colorScheme].background,
          opacity
        }}
      />
    </Animated.View>
  )
}

export default memo(Background)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    backgroundColor: '#fff'
  }
})
