import { View } from 'react-native'
import React, { memo } from 'react'
import Cover from './Cover'
import Content from './Content'
import Header from './Header'
import Animated from 'react-native-reanimated'

interface ContentProps {
  listChats: any
  y: Animated.Value<number>
}

const HeaderView = (props: ContentProps) => {
  const { y, listChats } = props
  return (
    <>
      <Cover {...{ y }} />
      <Content {...{ y, listChats }} />
      <Header {...{ y }} />
    </>
  )
}

export default memo(HeaderView)
