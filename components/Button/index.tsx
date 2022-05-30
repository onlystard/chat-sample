import React, { memo } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'

const DEFAULT_HIS_LOP = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
}

const UtoButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      hitSlop={DEFAULT_HIS_LOP}
      activeOpacity={0.8}
      {...props}
      style={[styles.defaultBtn, props.style]}
    >
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  defaultBtn: {}
})

export default memo(UtoButton)
