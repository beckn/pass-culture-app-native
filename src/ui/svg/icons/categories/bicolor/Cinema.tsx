import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled from 'styled-components/native'

import { IconInterface } from 'ui/svg/icons/types'
import { svgIdentifier } from 'ui/svg/utils'
// eslint-disable-next-line no-restricted-imports
import { ColorsEnum } from 'ui/theme/colors'

const CinemaSvg: React.FunctionComponent<IconInterface> = ({ size, color, color2, testID }) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
      <Defs>
        <LinearGradient id={gradientId} x1="0%" x2="100%" y1="13.494%" y2="86.506%">
          <Stop offset="0%" stopColor={color ?? ColorsEnum.PRIMARY} />
          <Stop offset="100%" stopColor={color2 ?? color ?? ColorsEnum.SECONDARY} />
        </LinearGradient>
      </Defs>
      <Path
        fill={gradientFill}
        clipRule={'evenodd'}
        fillRule={'evenodd'}
        d="M14.5435 19.9963H40.0763C42.2463 19.9963 43.9998 21.7844 43.9998 23.9973V28.9794L44 28.9983L43.9998 29.0172V40.0013C43.9998 42.2141 42.2463 44.0023 40.0763 44.0023H37.1337C36.592 44.0023 36.1528 43.5545 36.1528 43.002C36.1528 42.4496 36.592 42.0018 37.1337 42.0018H40.0763C41.1629 42.0018 42.0381 41.1093 42.0381 40.0013V29.9983H24.3826C23.8408 29.9983 23.4017 29.5506 23.4017 28.9983C23.4017 28.446 23.8408 27.9983 24.3826 27.9983H42.0381V23.9973C42.0381 22.8893 41.1629 21.9968 40.0763 21.9968H8.68846C7.60193 21.9968 6.72671 22.8893 6.72671 23.9973V27.9983H15.5546C16.0963 27.9983 16.5354 28.446 16.5354 28.9983C16.5354 29.5506 16.0963 29.9983 15.5546 29.9983H6.72671V40.0013C6.72671 41.1093 7.60193 42.0018 8.68846 42.0018H29.2867C29.8285 42.0018 30.2676 42.4496 30.2676 43.002C30.2676 43.5545 29.8285 44.0023 29.2867 44.0023H8.68846C6.51849 44.0023 4.76497 42.2141 4.76497 40.0013V28.9983V23.9973C4.76497 22.7592 5.31389 21.6541 6.17755 20.9207C5.56433 20.5067 5.1029 19.8623 4.93216 19.076L4.06899 15.085C3.90224 14.3048 4.03957 13.5046 4.46134 12.8345C4.88311 12.1543 5.55011 11.6742 6.3348 11.5041L27.3353 6.80297C27.8649 6.68294 28.3848 7.02302 28.5025 7.56316C28.6202 8.10329 28.2867 8.63343 27.757 8.75346L25.2162 9.32225L21.3457 16.4269L30.4593 14.3845L34.3315 7.2769L31.3176 7.95326C30.7879 8.07329 30.2681 7.7332 30.1504 7.19307C30.0326 6.65293 30.376 6.1228 30.9056 6.00277L39.5079 4.07229C41.1067 3.7122 42.6957 4.73245 43.0488 6.35286L43.912 10.3439C44.0787 11.1241 43.9414 11.9142 43.5196 12.5944C43.088 13.2846 42.4211 13.7547 41.6364 13.9348L14.5435 19.9963ZM36.8882 6.70312L33.0155 13.8117L41.2146 11.9743C41.4892 11.9142 41.7148 11.7542 41.862 11.5141C41.9993 11.2941 42.0483 11.024 41.9895 10.774L41.1263 6.78296C41.0086 6.24283 40.4691 5.90274 39.9198 6.02277L36.8882 6.70312ZM18.7894 16.9997L22.6603 9.8944L13.5083 11.9432C13.49 11.9966 13.467 12.0491 13.4392 12.1002L9.65171 19.0475L18.7894 16.9997ZM7.28451 19.2725C7.06713 19.1349 6.90355 18.9153 6.84486 18.6459L5.98169 14.6549C5.92284 14.4049 5.97188 14.1348 6.1092 13.9147C6.25633 13.6847 6.48193 13.5146 6.75658 13.4546L10.9705 12.5113L7.28451 19.2725Z"
      />
    </Svg>
  )
}

export const Cinema = styled(CinemaSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.primary,
  size: size ?? theme.icons.sizes.standard,
}))``
