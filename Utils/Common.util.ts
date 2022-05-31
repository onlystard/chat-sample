import { LayoutAnimation } from 'react-native'
import { IS_ANDROID, LAYOUT_ANIMATION_TYPE } from '../constants'

const insertObjectIf = <T1 extends {}>(
  condition: boolean | any,
  elements1: T1
): Partial<T1> => {
  return condition ? elements1 : ({} as T1)
}

const insertIf = (condition: boolean, ...elements: any[]) => {
  return condition ? [...elements] : []
}

const setLayoutAnimation = (
  layoutAnimationType: LAYOUT_ANIMATION_TYPE,
  duration = 300
) => {
  if (IS_ANDROID) {
    LayoutAnimation.configureNext({
      duration,
      create: {
        type: LayoutAnimation.Types[layoutAnimationType],
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types[layoutAnimationType]
      }
    })

    return
  }

  LayoutAnimation.configureNext(LayoutAnimation.Presets[layoutAnimationType])
}

const trimText = ({
  text,
  isTyping = false
}: {
  text?: string
  isTyping?: boolean
}) => {
  const formatText = `${text || ''}`.replace(/\s\s+/g, ' ')

  if (isTyping) return formatText.trimLeft()

  return formatText.trim()
}

const formatLiteral = (text: string) => {
  let result = text
  result = result?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  result = result?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  result = result?.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  result = result?.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  result = result?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  result = result?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  result = result?.replace(/đ/g, 'd')
  result = result?.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  result = result?.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  result = result?.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  result = result?.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  result = result?.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  result = result?.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  result = result?.replace(/Đ/g, 'D')

  return result?.toLowerCase?.() || ''
}

export { insertObjectIf, insertIf, setLayoutAnimation, trimText, formatLiteral }
