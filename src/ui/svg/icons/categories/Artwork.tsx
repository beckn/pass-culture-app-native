import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export function Artwork({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="20 20 142 142">
      <Path d="M132.724 40c3.835 0 6.979 2.952 7.284 6.709l.024.599v19.308c0 1.657-1.343 3-3 3-1.519 0-2.774-1.129-2.973-2.593l-.027-.407V47.308c0-.633-.448-1.16-1.044-1.281l-.264-.027H59.308c-.63 0-1.16.45-1.281 1.045l-.027.263v97.576c0 .195.043.38.12.547.01-4.641.568-9.859 2.028-14.944 1.515-5.279 3.87-9.742 7.248-13.09l.093-.085c.756-2.404 2.025-4.703 3.879-6.748v-9.907c0-1.657 1.344-3 3-3 1.52 0 2.775 1.129 2.973 2.593l.028.407-.003 5.743.7-.276.553-.337c.745-.475 1.428-.961 2.042-1.46.284-.428.67-.768 1.115-.999 1.486-1.474 2.382-3.074 2.543-4.864-2.199-2.15-3.563-5.147-3.563-8.465V79.363c0-6.536 5.294-11.832 11.828-11.832h1.28c6.537 0 11.832 5.295 11.832 11.832v10.636c0 .144-.003.287-.008.43l-.002 23.019 10.348-5.392.002-25.271c-.172-15.63-10.287-22.684-22.538-21.176l-.838.116c-8.824 1.356-14.89 7.994-15.273 17.92l-.019 1.003v7.664c0 1.656-1.343 3-3 3-1.519 0-2.774-1.129-2.973-2.593l-.027-.407v-7.664c0-13.47 8.362-23.006 20.38-24.854 15.644-2.403 29.534 6.569 30.26 25.835l.028 1.123v27.128c0 .978-.476 1.885-1.26 2.443l-.354.217-.066.034c1.372.911 2.797 2.056 4.214 3.47 2.758 2.751 5.05 6.2 6.724 10.398.882 2.211 1.589 5.354 2.182 9.26.206 1.355.39 2.758.556 4.183V84.128c0-1.657 1.343-3 3-3 1.519 0 2.774 1.129 2.973 2.593l.027.407v60.756c0 3.835-2.952 6.983-6.709 7.288l-.599.024H59.308c-3.832 0-6.979-2.957-7.284-6.713l-.024-.599V47.308c0-3.834 2.955-6.979 6.709-7.284l.599-.024h73.416zm-53.726 72.207l-.834.327c-5.808 4.109-6.62 10.98-4.33 16.366.685 1.602 1.376 2.858 2.611 4.301 1.79 2.092 4.01 3.5 6.792 4.004l.852.124c4.492.503 7.784 2.486 9.883 5.461.824 1.169 1.38 2.333 1.736 3.405h9.691l-.006-1.131.016-2.343.064-2.165c.372-8.671 2.153-13.071 7.718-17.513 1.295-1.034 3.183-.822 4.216.473 1.034 1.294.822 3.182-.473 4.216-3.896 3.11-5.193 6.242-5.477 13.31l-.052 1.937-.012 2.13.005 1.086h17.217l-.025-.345-.154-1.768c-.235-2.555-.532-5.108-.892-7.478-.53-3.487-1.153-6.258-1.823-7.94-1.37-3.432-3.204-6.193-5.389-8.372-1.694-1.691-3.5-2.938-5.292-3.806l-.493-.23-.698-.291-9.775 5.095c-1.168.61-2.471.366-3.351-.393l-.528.508c-4.286 3.934-8.857 5.721-14.347 4.218-4.795-1.308-6.835-5.464-6.916-10.969-.01-.73.013-1.47.066-2.217zm-.817 29.679l-.177.296c-.128.221-.248.45-.36.684-.528 1.107-.857 2.255-1.035 3.33l12.421-.001-.108-.147c-1.008-1.322-2.496-2.249-4.698-2.64l-.8-.116c-1.9-.211-3.646-.692-5.243-1.406zM67.294 128.25l-.176.416c-.451 1.093-.852 2.254-1.203 3.477-1.361 4.742-1.84 9.738-1.79 14.053h6.423c.206-1.864.717-3.895 1.682-5.915.292-.612.62-1.202.986-1.77-.463-.443-.906-.914-1.33-1.409-1.718-2.008-2.665-3.729-3.571-5.85-.413-.97-.755-1.975-1.021-3.002zM99.688 100.3c-1.719.974-3.706 1.53-5.824 1.53h-1.28c-.938 0-1.851-.11-2.726-.316-.699 2.452-2.124 4.529-4.101 6.37l-.15.627c-.04.185-.082.381-.124.587-.366 1.805-.576 3.607-.552 5.236.047 3.142.874 4.828 2.498 5.27 2.922.8 5.41-.034 8.087-2.301l.612-.545 1.022-1.044 1.145-1.108.836-.77c.19-.17.376-.333.558-.487zm-5.824-26.77h-1.28c-3.22 0-5.828 2.61-5.828 5.832v10.636c0 3.223 2.608 5.832 5.828 5.832h1.28c3.13 0 5.68-2.46 5.825-5.552l-.001-7.243c0-.067.002-.134.007-.2l.001-3.473c0-3.223-2.609-5.832-5.832-5.832z" />
    </Svg>
  )
}
