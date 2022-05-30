import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { MAX_HEADER_HEIGHT } from '../../../../constants'
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated'
import { onScrollEvent } from 'react-native-redash/lib/module/v1'
import { LinearGradient } from 'expo-linear-gradient'
import ListChats from './ListChats'
import useColorScheme from '../../../../hooks/useColorScheme'
import Colors from '../../../../constants/Colors'
import { Feather as Icon } from '@expo/vector-icons'
import { Ionicons as IconIonic } from '@expo/vector-icons'

interface ContentProps {
  listChats: any
  y: Animated.Value<number>
}

const Content = (props: ContentProps) => {
  const { listChats, y } = props
  const colorScheme = useColorScheme()

  const shadowAnimatedHeight = interpolateNode(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [0, MAX_HEADER_HEIGHT],
    extrapolate: Extrapolate.CLAMP
  })
  const opacity = interpolateNode(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP
  })
  return (
    <Animated.ScrollView
      onScroll={onScrollEvent({ y })}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    >
      <View style={styles.header}>
        <View
          style={{
            padding: 35,
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <Icon
            name="more-vertical"
            color={Colors[colorScheme].text}
            size={24}
          />
        </View>
        <Animated.View
          style={[styles.gradient, { height: shadowAnimatedHeight }]}
        >
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.3]}
            end={[0, 1]}
            colors={[
              'transparent',
              Colors[colorScheme].rgba,
              Colors[colorScheme].background
            ]}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text
            style={[
              styles.artist,
              { opacity, color: Colors[colorScheme].text }
            ]}
          >
            Chats
          </Animated.Text>
          <View
            style={{
              padding: 35,
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            <IconIonic
              name="create-outline"
              color={Colors[colorScheme].text}
              size={24}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.tracks,
          { backgroundColor: Colors[colorScheme].background }
        ]}
      >
        {listChats?.tracks?.map((track, key) => (
          <ListChats
            index={key + 1}
            {...{ track, key, artist: listChats?.artist }}
          />
        ))}
      </View>
    </Animated.ScrollView>
  )
}

export default memo(Content)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: MAX_HEADER_HEIGHT
  },
  gradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center'
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  artist: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    marginLeft: 20
  },
  tracks: {
    paddingTop: 32
  }
})
