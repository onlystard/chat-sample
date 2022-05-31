import { Platform } from 'react-native'

enum LAYOUT_ANIMATION_TYPE {
  EASE_IN_EASE_OUT = 'easeInEaseOut',
  LINEAR = 'linear',
  SPRING = 'spring'
}

const NOOP: any = () => {
  // TODO: something
}

const IS_IOS = Platform.OS === 'ios'
const IS_ANDROID = Platform.OS === 'android'

export { LAYOUT_ANIMATION_TYPE, NOOP, IS_IOS, IS_ANDROID }
