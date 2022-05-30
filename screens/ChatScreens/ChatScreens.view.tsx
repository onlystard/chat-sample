import { View } from 'react-native'
import React, { memo } from 'react'
import styles from './ChatScreens.style'
import Animated from 'react-native-reanimated'
import { ListChatsScreen } from '../ChatScreens/_components'

const ChatScreens = () => {
  const { Value } = Animated
  const y = new Value(0)

  const listChats: any = {
    name: 'Remote Control',
    artist: 'Jan Blomqvist',
    release: 2016,
    tracks: [
      { name: 'Stories Over' },
      { name: 'More', artist: 'Jan Blomqvist, Elena Pitoulis' },
      { name: 'Empty Floor' },
      { name: 'Her Great Escape' },
      { name: 'Dark Noise' },
      { name: 'Drift', artist: 'Jan Blomqvist, Aparde' },
      { name: 'Same Mistake' },
      {
        name: 'Dancing People Are Never Wrong',
        artist: 'Jan Blomqvist, The Bianca Story'
      },
      { name: 'Back in the Taxi' },
      { name: 'Ghosttrack' },
      { name: 'Just OK' },
      { name: 'The End' }
    ]
  }

  return (
    <View style={styles.container}>
      <ListChatsScreen {...{ y, listChats }} />
    </View>
  )
}

export default memo(ChatScreens)
