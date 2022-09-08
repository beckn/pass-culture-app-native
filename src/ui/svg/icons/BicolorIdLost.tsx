import React from 'react'
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleBicolorIconInterface } from 'ui/svg/icons/types'
import { svgIdentifier } from 'ui/svg/utils'

const BicolorIdLostSvg: React.FunctionComponent<AccessibleBicolorIconInterface> = ({
  size,
  color,
  color2,
  accessibilityLabel,
  testID,
}) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()
  const height = typeof size === 'string' ? size : ((size as number) * 156) / 200

  return (
    <AccessibleSvg
      width={size}
      height={height}
      viewBox="0 0 200 156"
      fill="none"
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M117.561 117.717L39.1248 114.122L39.1224 114.122C35.7465 113.953 33.157 111.14 33.3311 107.808L37.2937 31.954C37.4678 28.6221 40.337 26.081 43.7129 26.2495L142.878 31.1995C146.254 31.368 148.843 34.1816 148.669 37.5135L147.183 70.2845C147.121 71.4666 148.038 72.4731 149.23 72.5326C150.422 72.5922 151.438 71.6821 151.5 70.5L152.986 37.729C153.282 32.0668 148.868 27.2515 143.099 26.9635L43.9342 22.0135C38.1648 21.7255 33.2725 26.0763 32.9767 31.7385L29.0141 107.592C28.7183 113.254 33.1305 118.069 38.8987 118.358L38.9011 118.358L118.309 121.997C118.839 122.024 119.333 121.861 119.724 121.57C124.747 129.066 133.296 134 143 134C158.466 134 171 121.466 171 106C171 101.175 169.773 96.6259 167.612 92.6512C167.026 91.5726 165.676 91.1735 164.597 91.7599C163.519 92.3463 163.12 93.6961 163.706 94.7747C165.522 98.1158 166.554 101.938 166.554 106C166.554 119.011 156.011 129.554 143 129.554C129.989 129.554 119.446 119.011 119.446 106C119.446 92.989 129.989 82.4461 143 82.4461C147.009 82.4461 150.785 83.4449 154.075 85.2131C155.157 85.7943 156.504 85.3887 157.086 84.3072C157.667 83.2258 157.261 81.8779 156.18 81.2967C152.252 79.186 147.755 78 143 78C127.534 78 115 90.5335 115 106C115 110.184 115.917 114.152 117.561 117.717ZM59.8506 43.5944L59.8538 43.5903C62.227 40.488 66.0785 38.5735 70.3164 38.7851C77.0974 39.1236 82.3302 44.7872 81.9817 51.4591L81.6109 58.5569C81.2624 65.2288 75.4665 70.3419 68.6855 70.0034C61.9045 69.6649 56.6717 64.0013 57.0202 57.3294L57.391 50.2316C57.5207 47.7489 58.406 45.4494 59.8506 43.5944ZM63.3049 46.1431L63.2952 46.1559L63.2905 46.1618C62.3726 47.3373 61.7932 48.8172 61.708 50.4471L61.3372 57.5449C61.1112 61.8714 64.5039 65.5476 68.9068 65.7674C73.3097 65.9872 77.0679 62.6679 77.2939 58.3414L77.6647 51.2436C77.8907 46.9171 74.498 43.2409 70.0951 43.0211C67.3419 42.8837 64.8461 44.1235 63.3049 46.1431ZM87.3212 94.244C87.3865 94.4657 87.3156 94.7049 87.1397 94.8567C85.8791 95.9447 84.5162 96.9292 83.0884 97.7778C82.0672 98.3847 81.7421 99.6866 82.3562 100.687C82.9722 101.69 84.3026 102.014 85.3268 101.405C87.496 100.116 89.5271 98.561 91.3316 96.8206C91.8573 96.3136 92.0829 95.5796 91.9323 94.8734C89.6302 84.0766 80.1996 75.7019 68.4186 75.1138C56.6377 74.5257 46.3834 81.9179 42.9681 92.4293C42.7445 93.1175 42.893 93.8708 43.3641 94.4277C48.9819 101.068 57.2971 105.533 66.8048 106.007C69.3921 106.136 71.9488 105.974 74.4147 105.511C75.5904 105.291 76.3546 104.178 76.133 103.032C75.9112 101.885 74.7819 101.124 73.6045 101.345C71.4963 101.741 69.2867 101.884 67.026 101.771C59.3638 101.389 52.5838 98.0165 47.7381 92.889C47.5788 92.7205 47.5332 92.4754 47.6212 92.2613C50.8902 84.3128 58.9892 78.8902 68.1973 79.3498C77.4059 79.8095 84.8979 86.0108 87.3212 94.244ZM101.275 46.0123C101.336 44.8471 102.348 43.9423 103.544 44.002L133.845 45.5145C135.041 45.5743 135.953 46.5751 135.893 47.7403C135.832 48.9055 134.82 49.8103 133.623 49.7505L103.323 48.238C102.126 48.1783 101.214 47.1775 101.275 46.0123ZM102.695 60.2565C101.498 60.1967 100.487 61.1016 100.426 62.2667C100.365 63.4319 101.277 64.4327 102.474 64.4925L124.51 65.5925C125.707 65.6522 126.719 64.7474 126.78 63.5822C126.84 62.417 125.928 61.4162 124.732 61.3565L102.695 60.2565ZM140.397 117.252C140.397 115.814 141.562 114.649 143 114.649C144.438 114.649 145.603 115.814 145.603 117.252C145.603 118.689 144.438 119.855 143 119.855C141.562 119.855 140.397 118.689 140.397 117.252ZM143 92.1452C144.213 92.1452 145.281 93.0923 145.281 94.364V109.92C145.281 111.192 144.213 112.139 143 112.139C141.787 112.139 140.719 111.192 140.719 109.92V94.364C140.719 93.0923 141.787 92.1452 143 92.1452Z"
        fill={gradientFill}
      />
      <Defs>
        <LinearGradient id={gradientId} x1="28.841%" x2="71.159%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color2} />
          <Stop offset="100%" stopColor={color} />
        </LinearGradient>
      </Defs>
    </AccessibleSvg>
  )
}

export const BicolorIdLost = styled(BicolorIdLostSvg).attrs(({ color, color2, size, theme }) => ({
  color: color ?? theme.colors.primary,
  color2: color2 ?? theme.colors.secondary,
  size: size ?? theme.illustrations.sizes.medium,
}))``
