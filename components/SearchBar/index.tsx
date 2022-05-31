import React, { memo, useRef } from 'react'
import {
  Keyboard,
  Platform,
  StyleSheet,
  View,
  TextInput,
  Text
} from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { Ionicons as Icon } from '@expo/vector-icons'
import { EVENT } from '../../constants'
import { Colors, Size } from '../../Themes'
import { insertIf } from '../../Utils'
import Button from '../Button'

interface IProps {
  onFocus?(): void
  onBlur?(): void
  clicked?: boolean
  setClicked(clicked: boolean): void
  searchPhrase: string
  setSearchPhrase(searchPhrase: string): void
  styleBackground: any
}

const SearchBar = (props: IProps) => {
  const inputRef = useRef<any>()

  return (
    <View style={[styles.background, props?.styleBackground]}>
      <View style={styles.containerSearch}>
        <View style={styles.searchBar}>
          <View style={styles.searchIconContainer}>
            <Icon
              name="search"
              size={Size.width22}
              color="#333333"
              onPress={() => inputRef.current.focus()}
            />
          </View>

          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              ...insertIf(!!props.clicked && !!props.searchPhrase, {
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0
              })
            ]}
            placeholder={'Search for chat & messages'}
            value={props.searchPhrase}
            onChangeText={props.setSearchPhrase}
            onFocus={() => {
              props.setClicked(true)
              EventRegister.emit(EVENT.CLOSE)
              props?.onFocus?.()
            }}
            onBlur={props.onBlur}
            returnKeyType={'search'}
          />
          {props.clicked && !!props.searchPhrase && (
            <View style={styles.clearIconContainer}>
              <Icon
                name="close-outline"
                size={Size.width20}
                color="gray"
                style={styles.iconX}
                onPress={() => {
                  props.setSearchPhrase('')
                }}
              />
            </View>
          )}
          {props.clicked && (
            <Button
              style={styles.iconCancel}
              onPress={() => {
                Keyboard.dismiss()
                props.setClicked(false)
                props.setSearchPhrase('')
              }}
            >
              <Text style={styles.text}>Cancel</Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  )
}

export default memo(SearchBar)

const styles = StyleSheet.create({
  containerSearch: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: Size.screenWidth - Size.width40
  },
  searchBar: {
    ...Platform.select({
      android: {
        paddingVertical: Size.width1
      }
    }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  input: {
    borderBottomRightRadius: Size.width10,
    borderTopRightRadius: Size.width10,
    paddingVertical: 0,
    fontSize: Size.font17,
    flex: 1,
    height: Size.width36,
    marginVertical: Size.width2,
    backgroundColor: Colors.athensGrayBold,
    paddingStart: Size.width10
  },
  text: {
    fontSize: Size.font15,
    color: Colors.cerulean,
    textAlign: 'center',
    paddingHorizontal: Size.width5
  },
  iconCancel: {
    alignItems: 'center',
    paddingHorizontal: Size.width5
  },
  iconX: {
    marginRight: Size.width10
  },
  line: {
    height: 1,
    marginTop: Size.width10,
    backgroundColor: Colors.mercury
  },
  background: {
    paddingVertical: Size.width13,
    backgroundColor: 'white',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    elevation: 3
  },
  searchIconContainer: {
    backgroundColor: Colors.athensGrayBold,
    height: Size.width36,
    justifyContent: 'center',
    paddingStart: Size.width10,
    borderBottomStartRadius: Size.width10,
    borderTopStartRadius: Size.width10
  },
  clearIconContainer: {
    backgroundColor: Colors.athensGrayBold,
    height: Size.width36,
    justifyContent: 'center',
    paddingStart: Size.width10,
    borderBottomRightRadius: Size.width10,
    borderTopRightRadius: Size.width10
  }
})
