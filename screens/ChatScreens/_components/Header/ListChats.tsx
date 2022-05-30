import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import useColorScheme from '../../../../hooks/useColorScheme'
import Colors from '../../../../constants/Colors'

interface ListChatsProps {
  track: any
  artist: string
  index: number
}

const ListChats = (props: ListChatsProps) => {
  const { track, artist, index } = props
  const colorScheme = useColorScheme()

  return (
    <View
      style={[styles.row, { backgroundColor: Colors[colorScheme].background }]}
    >
      <View style={styles.cell}>
        <Text style={{ color: Colors[colorScheme].text }}>{index}</Text>
      </View>
      <View style={[styles.cell, { flex: 1 }]}>
        <Text style={{ color: Colors[colorScheme].text }}>{track.name}</Text>
        <Text style={{ color: Colors[colorScheme].text }}>
          {track.artist || artist}
        </Text>
      </View>
      <View style={styles.cell}>
        <Icon name="more-horizontal" color="#b2b3b4" size={24} />
      </View>
    </View>
  )
}

export default memo(ListChats)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cell: {
    padding: 16,
    justifyContent: 'center'
  }
})
