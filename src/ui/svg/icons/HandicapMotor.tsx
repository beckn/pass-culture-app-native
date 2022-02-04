import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { IconInterface } from './types'

const HandicapMotorSvg = ({ color, size, testID }: IconInterface) => {
  return (
    <Svg width={size} height={size} testID={testID} viewBox="0 0 48 48" fill={color} aria-hidden>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6881 7.46088C14.6881 6.31252 15.6238 5.38159 16.7781 5.38159C17.9324 5.38159 18.8681 6.31252 18.8681 7.46088C18.8681 8.60924 17.9324 9.54016 16.7781 9.54016C15.6238 9.54016 14.6881 8.60924 14.6881 7.46088ZM16.7781 3.39185C14.5193 3.39185 12.6881 5.21361 12.6881 7.46088C12.6881 9.70814 14.5193 11.5299 16.7781 11.5299C19.037 11.5299 20.8681 9.70814 20.8681 7.46088C20.8681 5.21361 19.037 3.39185 16.7781 3.39185ZM13.0858 17.2041C12.7817 14.7709 14.686 12.6243 17.1482 12.6243C19.2079 12.6243 20.9552 14.1468 21.2099 16.1879L22.8124 28.015H29.3382C30.147 28.015 30.9233 28.3243 31.5053 28.9033L37.4082 34.7759L39.791 32.4053C40.1816 32.0167 40.8147 32.0167 41.2053 32.4053C41.5958 32.7938 41.5958 33.4237 41.2053 33.8122L38.1153 36.8864C37.7247 37.2749 37.0916 37.2749 36.701 36.8864L30.091 30.3103C29.893 30.1133 29.6293 30.0047 29.3382 30.0047H17.5282C15.9841 30.0047 14.6823 28.8566 14.4868 27.3397L13.0858 17.2041ZM20.7943 28.015H17.5282C16.9943 28.015 16.5375 27.6142 16.4703 27.0846L15.0698 16.9528C14.9176 15.7074 15.8922 14.614 17.1482 14.614C18.2063 14.614 19.0975 15.3965 19.2256 16.4363L20.7943 28.015ZM9.79814 23.532C10.2765 23.8067 10.4404 24.4151 10.1643 24.891C6.74053 30.7921 8.77623 38.3417 14.7081 41.7482C20.6396 45.1544 28.2281 43.1291 31.6522 37.2276C31.9282 36.7517 32.5398 36.5886 33.0181 36.8633C33.4965 37.138 33.6604 37.7464 33.3843 38.2223C29.4083 45.0751 20.5969 47.4273 13.7083 43.4714C6.82022 39.5158 4.45592 30.7495 8.43215 23.8963C8.70825 23.4204 9.31982 23.2573 9.79814 23.532Z"
      />
    </Svg>
  )
}

export const HandicapMotor = styled(HandicapMotorSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
