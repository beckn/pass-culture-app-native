import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { IconInterface } from 'ui/svg/icons/types'
import { ILLUSTRATION_ICON_SIZE } from 'ui/theme/constants'

const RequestSentSvg: React.FunctionComponent<IconInterface> = ({ size, color, testID }) => {
  const height = typeof size === 'string' ? size : ((size as number) * 156) / 200
  return (
    <Svg width={size} height={height} viewBox="0 0 200 156" testID={testID} aria-hidden>
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.8094 24.7643C66.2149 22.1666 68.6365 20.4004 71.2371 20.8055L136.974 31.0458C139.575 31.451 141.343 33.8698 140.937 36.4676L134.417 78.2347C134.214 79.5299 135.102 80.7436 136.398 80.9455C137.695 81.1475 138.91 80.2613 139.112 78.9661L145.633 37.199C146.443 32.0109 142.9 27.1646 137.706 26.3555L71.9694 16.1152C66.7755 15.3061 61.9239 18.8448 61.1139 24.0329L60.4202 28.4759L42.9243 31.4264C37.741 32.3005 34.2596 37.1907 35.1347 42.3683L42.6186 86.6482C42.837 87.9408 44.0631 88.8117 45.3571 88.5935C46.6511 88.3753 47.523 87.1505 47.3045 85.858L39.8206 41.5781C39.3824 38.9856 41.1201 36.5448 43.7154 36.1071L59.6483 33.4202L47.9331 108.458C47.1231 113.646 50.6657 118.493 55.8596 119.302L95.3957 125.461C95.7062 125.509 96.012 125.495 96.3004 125.428C101.106 133.871 110.193 139.568 120.608 139.568C136.036 139.568 148.55 127.068 148.55 111.658C148.55 107.775 147.752 104.048 146.314 100.677C145.805 99.4827 144.423 98.9272 143.228 99.4359C142.033 99.9445 141.477 101.325 141.986 102.519C143.18 105.318 143.845 108.419 143.845 111.658C143.845 124.473 133.438 134.869 120.608 134.869C107.779 134.869 97.3716 124.473 97.3716 111.658C97.3716 98.8422 107.779 88.4466 120.608 88.4466C126.536 88.4466 131.926 90.6494 136.046 94.2996C137.018 95.1608 138.504 95.072 139.366 94.1012C140.229 93.1304 140.14 91.6452 139.168 90.784C134.221 86.4009 127.731 83.7471 120.608 83.7471C105.18 83.7471 92.6669 96.2467 92.6669 111.658C92.6669 114.73 93.1642 117.687 94.0829 120.452L56.5918 114.611C53.9912 114.206 52.223 111.787 52.6286 109.19L65.8094 24.7643Z"
      />
      <Path
        fill={color}
        d="M75.3513 40.6639C75.5535 39.3687 76.7686 38.4824 78.0652 38.6844L125.02 45.999C126.317 46.2009 127.204 47.4146 127.002 48.7098C126.8 50.005 125.585 50.8912 124.288 50.6893L77.3329 43.3747C76.0363 43.1727 75.1491 41.959 75.3513 40.6639Z"
      />
      <Path
        fill={color}
        d="M75.1362 57.4456C73.8395 57.2436 72.6245 58.1298 72.4223 59.425C72.2201 60.7202 73.1073 61.9339 74.4039 62.1359L121.359 69.4504C122.656 69.6524 123.871 68.7662 124.073 67.471C124.275 66.1758 123.388 64.9621 122.091 64.7601L75.1362 57.4456Z"
      />
      <Path
        fill={color}
        d="M69.4932 78.1862C69.6954 76.891 70.9105 76.0048 72.2071 76.2068L98.3141 80.2737C99.6107 80.4757 100.498 81.6894 100.296 82.9846C100.093 84.2798 98.8784 85.166 97.5818 84.964L71.4748 80.8971C70.1782 80.6951 69.291 79.4814 69.4932 78.1862Z"
      />
      <Path
        fill={color}
        d="M108.591 100.648C107.469 99.9944 106.029 100.373 105.374 101.494C103.022 105.521 99.5167 115.46 107.735 125.005C108.582 125.989 110.067 126.101 111.052 125.255C112.037 124.408 112.149 122.925 111.302 121.941C104.956 114.57 107.579 107.045 109.438 103.862C110.092 102.741 109.713 101.302 108.591 100.648Z"
      />
      <Path
        fill={color}
        d="M142.706 133.731C143.625 132.813 145.114 132.813 146.033 133.731L164.311 151.989C165.23 152.906 165.23 154.394 164.311 155.312C163.392 156.229 161.903 156.229 160.984 155.312L142.706 137.054C141.788 136.136 141.788 134.649 142.706 133.731Z"
      />
    </Svg>
  )
}

export const RequestSent = styled(RequestSentSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? ILLUSTRATION_ICON_SIZE,
}))``
