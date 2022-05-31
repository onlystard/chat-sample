import { FlatList, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import {
  HEADER_DELTA,
  LAYOUT_ANIMATION_TYPE,
  MAX_HEADER_HEIGHT,
  MIN_HEADER_HEIGHT,
  NOOP
} from '../../../../constants'
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated'
import { onScrollEvent } from 'react-native-redash/lib/module/v1'
import { LinearGradient } from 'expo-linear-gradient'
import ListChats from './ListChats'
import useColorScheme from '../../../../hooks/useColorScheme'
import Colors from '../../../../constants/Colors'
import { Feather as Icon } from '@expo/vector-icons'
import { Ionicons as IconIonic } from '@expo/vector-icons'
import SearchBar from '../../../../components/SearchBar'
import { formatLiteral, setLayoutAnimation, trimText } from '../../../../Utils'
import { useMergingState } from '../../../../hooks'

interface ContentProps {
  listChats: any
  y: Animated.Value<number>
}

const Content = (props: ContentProps) => {
  const { listChats, y } = props
  const colorScheme = useColorScheme()
  const [clicked, setClicked] = useState(false)
  const [state, setState] = useMergingState({
    values: '',
    activeSearch: false
  })

  const trimTimerRef = useRef<any>()

  const onChangeText = useCallback((text: any) => {
    setState({ values: text })

    clearTimeout(trimTimerRef.current)
    trimTimerRef.current = setTimeout(() => {
      const keyword = trimText({ text, isTyping: true })

      setState({ values: keyword })
    }, 500)
  }, [])

  const dataListShow = useMemo(
    () =>
      listChats.filter((item) => {
        return (
          formatLiteral(item?.fullName.trim?.())
            .toLowerCase()
            .indexOf(formatLiteral(state?.values?.trim?.()).toLowerCase()) > -1
        )
      }),

    [listChats, state?.values]
  )

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

  const _renderItem = ({ item }: any) => <ListChats {...{ item }} />

  const onFocus = useCallback(() => {
    setLayoutAnimation(LAYOUT_ANIMATION_TYPE.EASE_IN_EASE_OUT)
    setState({ activeSearch: true })
  }, [])
  const onBlur = useCallback(() => {
    setLayoutAnimation(LAYOUT_ANIMATION_TYPE.EASE_IN_EASE_OUT)
    setState({ activeSearch: false })
  }, [])

  return (
    <Animated.ScrollView
      onScroll={onScrollEvent({ y })}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    >
      <View style={styles.header}>
        <View style={styles.moreIcon}>
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
          <View style={styles.createIcon}>
            <IconIonic
              name="create-outline"
              color={Colors[colorScheme].text}
              size={24}
            />
          </View>
        </View>
        <Animated.View
          style={[state?.activeSearch ? styles.activeSearch : styles.searchBar]}
        >
          <SearchBar
            styleBackground={{
              backgroundColor: Colors[colorScheme].background
            }}
            searchPhrase={state?.values}
            setSearchPhrase={onChangeText}
            clicked={clicked}
            setClicked={setClicked}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </Animated.View>
      </View>
      <View
        style={[
          styles.tracks,
          { backgroundColor: Colors[colorScheme].background }
        ]}
      >
        <FlatList
          data={dataListShow}
          renderItem={_renderItem}
          refreshing={NOOP}
        />
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
  },
  searchBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  createIcon: {
    padding: 35,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  moreIcon: {
    padding: 35,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  activeSearch: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center'
  }
})
