import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled from 'styled-components/native'

import { IconInterface } from 'ui/svg/icons/types'
import { svgIdentifier } from 'ui/svg/utils'
// eslint-disable-next-line no-restricted-imports
import { ColorsEnum } from 'ui/theme/colors'

const AtelierSvg: React.FunctionComponent<IconInterface> = ({ size, color, color2, testID }) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
      <Defs>
        <LinearGradient id={gradientId} x1="39.159%" x2="60.841%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color ?? ColorsEnum.PRIMARY} />
          <Stop offset="100%" stopColor={color2 ?? color ?? ColorsEnum.SECONDARY} />
        </LinearGradient>
      </Defs>
      <Path
        fill={gradientFill}
        clipRule={'evenodd'}
        fillRule={'evenodd'}
        d="M39.2085 5.23074C38.8256 4.90493 37.9893 4.90387 37.4084 5.66274L37.4051 5.66699L36.1895 7.23743L36.1879 7.23957L33.4582 10.7858L20.9919 26.9818L20.9905 26.9835C20.4618 27.6784 20.5969 28.426 20.9355 28.7498L21.0965 28.888C21.4611 29.1854 22.2149 29.2065 22.809 28.5326L34.2386 15.5493C34.6035 15.1348 35.2291 15.1001 35.636 15.4718C36.0429 15.8435 36.077 16.4808 35.7121 16.8953L24.2821 29.8792C23.8865 30.3279 23.3915 30.6707 22.8568 30.8785C23.2031 31.8201 23.052 32.9182 22.375 33.7436C21.469 34.8483 19.9343 35.081 18.7635 34.3733C20.0099 36.4331 19.8905 39.1552 18.2764 41.1045C16.4505 43.3295 13.8116 44.4751 11.4119 44.8533C10.206 45.0434 9.02753 45.0457 7.99788 44.8779C6.98828 44.7133 6.03031 44.3698 5.35193 43.7875C5.12608 43.5937 4.99703 43.3072 5.00005 43.0063C5.00308 42.7055 5.13785 42.4217 5.36756 42.2326C5.58684 42.0521 5.8052 41.9167 5.96472 41.8178L5.96479 41.8178L6.01139 41.7889C6.18407 41.6813 6.29855 41.6051 6.40914 41.5052C6.60887 41.3247 6.90248 40.9685 7.25923 39.9933C7.45008 39.4716 8.01997 39.2063 8.53211 39.4007C9.04426 39.5951 9.30472 40.1756 9.11388 40.6973C8.74562 41.7039 8.36338 42.3504 7.92788 42.8123C8.04845 42.8401 8.17603 42.8651 8.31059 42.8871C9.11513 43.0182 10.0848 43.0224 11.1092 42.8609C13.1695 42.5361 15.3194 41.5653 16.7592 39.8098L16.7624 39.8059C18.07 38.2282 17.8703 35.8611 16.3081 34.5244L16.3063 34.5228C14.7577 33.1911 12.4345 33.3942 11.1222 34.9847C10.6527 35.5569 10.3878 36.0411 10.2436 36.3633C10.1713 36.5249 10.1288 36.6467 10.1062 36.7197C10.0948 36.7562 10.0884 36.7804 10.0857 36.7914L10.0845 36.7962C9.97147 37.3346 9.45426 37.682 8.92271 37.5737C8.38678 37.4645 8.03921 36.9334 8.1464 36.3875L9.11679 36.5852C8.1464 36.3875 8.14648 36.3871 8.14655 36.3867L8.14672 36.3859L8.14706 36.3841L8.14781 36.3804L8.14957 36.3719L8.15417 36.3507C8.15775 36.3346 8.16236 36.3149 8.1682 36.2917C8.17988 36.2452 8.19643 36.1846 8.21926 36.1111C8.26494 35.9642 8.33571 35.766 8.44274 35.5268C8.65716 35.0478 9.01547 34.4084 9.60444 33.6907L9.60595 33.6888C11.2188 31.733 13.8341 31.1383 16.0393 32.0364C15.1566 30.9837 15.1301 29.4113 16.0268 28.3179C16.7098 27.4852 17.7498 27.148 18.7221 27.3354C18.829 26.7664 19.0707 26.2147 19.4287 25.745L19.4315 25.7414L31.9007 9.54181L34.632 5.99341L34.6337 5.99127L35.8476 4.42294L35.8493 4.42069C36.9509 2.98403 39.0419 2.45961 40.4794 3.68512L40.4808 3.68628L41.9638 4.95528L41.9646 4.95594C43.4051 6.18489 43.2549 8.38367 42.0544 9.7393L42.0533 9.74058L38.5716 13.6901C38.2065 14.1044 37.5808 14.1386 37.1741 13.7667C36.7675 13.3947 36.7338 12.7574 37.099 12.3431L40.5824 8.3915L40.5843 8.38945C41.2232 7.66861 41.0726 6.82456 40.6935 6.50136L40.6921 6.5002L39.2085 5.23074ZM19.693 30.3211C19.6713 30.3026 19.6501 30.2839 19.6291 30.265L18.7433 29.5049C18.3773 29.1946 17.8451 29.2455 17.5457 29.6105C17.2399 29.9834 17.2897 30.5265 17.6484 30.8317L18.6236 31.6629L19.6595 32.5574C20.0255 32.8668 20.5571 32.8156 20.8561 32.451C21.1619 32.0781 21.1122 31.535 20.7535 31.2298L20.7504 31.2271L19.8348 30.4415L19.8128 30.4229L19.8117 30.4219L19.6955 30.3233L19.693 30.3211Z"
      />
    </Svg>
  )
}

export const Atelier = styled(AtelierSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.primary,
  size: size ?? theme.icons.sizes.standard,
}))``
