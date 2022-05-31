import { StyleSheet, Text, View, Image } from 'react-native'
import React, { memo } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import useColorScheme from '../../../../hooks/useColorScheme'
import Colors from '../../../../constants/Colors'

interface ListChatsProps {
  item: any
}

const ListChats = (props: ListChatsProps) => {
  const { item } = props
  const colorScheme = useColorScheme()

  return (
    <View
      style={[styles.row, { backgroundColor: Colors[colorScheme].background }]}
    >
      <Image style={styles.avatar} source={{ uri: item?.avatar }} />
      <View style={[styles.cell, { flex: 1 }]}>
        <Text style={{ color: Colors[colorScheme].text }}>
          {item?.fullName}
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
    flexDirection: 'row',
    padding: 10
  },
  cell: {
    padding: 16,
    justifyContent: 'center'
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2
  }
})
