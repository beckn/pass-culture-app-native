import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { IconInterface } from './types'

const InfoSvg: React.FunctionComponent<IconInterface> = ({ size, color, testID }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
    <Path
      fill={color}
      d="M24 43.5909C13.4545 43.5909 4.90909 35.0455 4.90909 24.5C4.90909 21.2523 5.71845 18.1905 7.15309 15.521C7.40265 15.0566 7.22851 14.4778 6.76414 14.2283C6.29977 13.9787 5.72101 14.1529 5.47146 14.6172C3.88973 17.5604 3 20.9322 3 24.5C3 36.0999 12.4001 45.5 24 45.5C35.5999 45.5 45 36.0999 45 24.5C45 12.9001 35.5999 3.5 24 3.5C20.3809 3.5 16.9697 4.42015 13.9891 6.04046C13.5259 6.29225 13.3546 6.87183 13.6064 7.335C13.8582 7.79816 14.4377 7.96952 14.9009 7.71773C17.6094 6.24531 20.7082 5.40909 24 5.40909C34.5455 5.40909 43.0909 13.9545 43.0909 24.5C43.0909 35.0455 34.5455 43.5909 24 43.5909ZM24 17C24.6904 17 25.25 16.4404 25.25 15.75C25.25 15.0596 24.6904 14.5 24 14.5C23.3097 14.5 22.75 15.0596 22.75 15.75C22.75 16.4404 23.3097 17 24 17ZM24 34.5C23.4477 34.5 23 34.0741 23 33.5488L23 22.4977L21.9539 22.4976C21.4286 22.4976 21.0027 22.0499 21.0027 21.4976C21.0027 20.9454 21.4286 20.4977 21.9539 20.4977L24.0526 20.4977C24.3674 20.4977 24.6466 20.6585 24.8197 20.9062C24.9195 21.0418 24.9831 21.2032 24.9971 21.3779C25.0016 21.4172 25.0039 21.4571 25.0039 21.4977C25.0039 21.5281 25.0026 21.5582 25 21.588L25 33.5488C25 34.0741 24.5523 34.5 24 34.5Z"
    />
  </Svg>
)

export const Info = styled(InfoSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
