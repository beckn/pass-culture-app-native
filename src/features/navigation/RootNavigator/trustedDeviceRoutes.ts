import { NavigationTrustedDevice } from 'features/internal/cheatcodes/pages/NavigationTrustedDevice/NavigationTrustedDevice'
import { TrustedDeviceInfos } from 'features/internal/cheatcodes/pages/NavigationTrustedDevice/TrustedDeviceInfos'
import {
  TrustedDeviceRootStackParamList,
  GenericRoute,
} from 'features/navigation/RootNavigator/types'
import { screenParamsParser } from 'features/navigation/screenParamsUtils'
import { AccountSecurity } from 'features/trustedDevice/pages/AccountSecurity'
import { SuspensionChoice } from 'features/trustedDevice/pages/SuspensionChoice'
import { SuspensionConfirmation } from 'features/trustedDevice/pages/SuspensionConfirmation'

// Try to keep those routes in the same order as the user flow
export const trustedDeviceRoutes: GenericRoute<TrustedDeviceRootStackParamList>[] = [
  {
    name: 'AccountSecurity',
    component: AccountSecurity,
    pathConfig: {
      path: 'securisation-compte',
      parse: screenParamsParser['ReinitializePassword'],
    },
  },
  {
    name: 'NavigationTrustedDevice',
    component: NavigationTrustedDevice,
    path: 'appareil-de-confiance-navigation',
  },
  {
    name: 'SuspensionChoice',
    component: SuspensionChoice,
    path: 'securisation-compte/suspension',
  },
  {
    name: 'SuspensionConfirmation',
    component: SuspensionConfirmation,
    path: 'securisation-compte/suspension-confirmee',
  },
  {
    name: 'TrustedDeviceInfos',
    component: TrustedDeviceInfos,
    path: 'appareil-de-confiance-cheatcode-informations',
  },
]
