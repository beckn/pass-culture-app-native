import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { IconInterface } from '../types'

function ArtisticCourseSvg({ size, color, testID }: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="0 0 96 96" aria-hidden>
      <Path d="M78.4171 10.4615C77.6512 9.80986 75.9786 9.80774 74.8167 11.3255L74.8102 11.334L72.3791 14.4749L72.3758 14.4791L66.9164 21.5716L41.9837 53.9635L41.9811 53.967C40.9237 55.3569 41.1938 56.852 41.871 57.4997L42.193 57.7759C42.9222 58.3709 44.4298 58.4131 45.618 57.0653L68.4771 31.0985C69.2069 30.2696 70.4582 30.2002 71.2721 30.9435C72.0859 31.6869 72.154 32.9616 71.4242 33.7906L48.5641 59.7583C47.773 60.6558 46.783 61.3414 45.7136 61.7571C46.4061 63.6402 46.1039 65.8365 44.7501 67.4872C42.938 69.6966 39.8687 70.1619 37.5269 68.7465C40.0198 72.8662 39.781 78.3103 36.5529 82.2089C32.9011 86.659 27.6231 88.9501 22.8238 89.7066C20.412 90.0868 18.0551 90.0914 15.9958 89.7557C13.9766 89.4266 12.0606 88.7396 10.7039 87.575C10.2522 87.1873 9.99406 86.6143 10.0001 86.0126C10.0062 85.411 10.2757 84.8435 10.7351 84.4652C11.1737 84.1042 11.6104 83.8335 11.9294 83.6357L11.9296 83.6356L12.0228 83.5777C12.3681 83.3626 12.5971 83.2102 12.8183 83.0104C13.2177 82.6494 13.805 81.937 14.5185 79.9865C14.9002 78.9431 16.0399 78.4125 17.0642 78.8013C18.0885 79.1901 18.6094 80.3512 18.2278 81.3945C17.4912 83.4079 16.7268 84.7009 15.8558 85.6247C16.0969 85.6801 16.3521 85.7303 16.6212 85.7741C18.2303 86.0364 20.1695 86.0448 22.2184 85.7218C26.339 85.0723 30.6388 83.1307 33.5183 79.6197L33.5249 79.6117C36.14 76.4563 35.7406 71.7222 32.6162 69.0488L32.6125 69.0456C29.5154 66.3822 24.869 66.7885 22.2443 69.9695C21.3055 71.1139 20.7757 72.0821 20.4872 72.7266C20.3425 73.0498 20.2577 73.2935 20.2123 73.4394C20.1897 73.5123 20.1768 73.5609 20.1714 73.5827L20.1689 73.5925C19.9429 74.6692 18.9085 75.3639 17.8454 75.1474C16.7736 74.929 16.0784 73.8668 16.2928 72.775L18.2336 73.1704C16.2928 72.775 16.293 72.7742 16.2931 72.7734L16.2934 72.7717L16.2941 72.7683L16.2956 72.7608L16.2991 72.7438L16.3083 72.7013C16.3155 72.6693 16.3247 72.6298 16.3364 72.5833C16.3598 72.4904 16.3929 72.3691 16.4385 72.2222C16.5299 71.9283 16.6714 71.5319 16.8855 71.0537C17.3143 70.0957 18.0309 68.8167 19.2089 67.3813L19.2119 67.3776C22.4376 63.466 27.6681 62.2767 32.0785 64.0728C30.3132 61.9674 30.2602 58.8225 32.0536 56.6358C33.4195 54.9704 35.4996 54.2959 37.4441 54.6709C37.6581 53.5328 38.1413 52.4293 38.8575 51.4901L38.8631 51.4828L63.8013 19.0836L69.264 11.9868L69.2673 11.9825L71.6952 8.84587L71.6987 8.84138C73.9018 5.96806 78.0839 4.91922 80.9588 7.37024L80.9615 7.37256L83.9276 9.91057L83.9292 9.91187C86.8102 12.3698 86.5098 16.7673 84.1088 19.4786L84.1065 19.4812L77.1433 27.3803C76.413 28.2088 75.1616 28.2773 74.3483 27.5334C73.535 26.7894 73.4677 25.5147 74.198 24.6862L81.1649 16.783L81.1685 16.7789C82.4464 15.3372 82.1452 13.6491 81.387 13.0027L81.3843 13.0004L78.4171 10.4615ZM39.3859 60.6422C39.3427 60.6053 39.3001 60.5678 39.2583 60.53L37.4867 59.0098C36.7547 58.3891 35.6901 58.4911 35.0915 59.221C34.4799 59.9667 34.5794 61.0529 35.2967 61.6634L37.2472 63.3259L39.319 65.1148C40.0509 65.7336 41.1141 65.6312 41.7123 64.9019C42.3239 64.1562 42.2244 63.07 41.507 62.4595L41.5008 62.4543L39.6696 60.8829L39.6257 60.8458L39.6234 60.8438L39.3911 60.6466L39.3859 60.6422Z" />
    </Svg>
  )
}

export const ArtisticCourseIcon = styled(ArtisticCourseSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
