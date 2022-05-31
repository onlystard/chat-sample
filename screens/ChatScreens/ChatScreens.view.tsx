import { View } from 'react-native'
import React, { memo } from 'react'
import styles from './ChatScreens.style'
import { Value } from 'react-native-reanimated'
import { ListChatsScreen } from '../ChatScreens/_components'
import { faker } from '@faker-js/faker'

const ChatScreens = () => {
  const y = new Value(0)

  const listChats = Array(10)
    .fill(null)
    .map((_, idx) => ({
      id: idx,
      avatar: faker.image.avatar(),
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`
    }))

  return (
    <View style={styles.container}>
      <ListChatsScreen {...{ y, listChats }} />
    </View>
  )
}

export default memo(ChatScreens)
