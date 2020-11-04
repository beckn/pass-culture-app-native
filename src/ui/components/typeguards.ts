import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

export const isStyleObject = (
  style: StyleProp<ViewStyle | TextStyle | ImageStyle>
): style is Record<string, string | number> => {
  return typeof style === 'object'
}
