import mockdate from 'mockdate'
import React from 'react'

import { api } from 'api/api'
import { COOKIES_BY_CATEGORY } from 'features/cookies/CookiesPolicy'
import { NewConsentSettings } from 'features/profile/pages/ConsentSettings/NewConsentSettings'
import { storage } from 'libs/storage'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { fireEvent, render, waitFor } from 'tests/utils'
import { SNACK_BAR_TIME_OUT } from 'ui/components/snackBar/SnackBarContext'
import { SnackBarHelperSettings } from 'ui/components/snackBar/types'

const COOKIES_CONSENT_KEY = 'cookies_consent'
const Today = new Date(2022, 9, 29)
mockdate.set(Today)
const deviceId = 'testUuidV4'

jest.mock('api/api')
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockNavigate, push: jest.fn() }),
  useFocusEffect: jest.fn(),
}))

const mockShowSuccessSnackBar = jest.fn()
jest.mock('ui/components/snackBar/SnackBarContext', () => ({
  useSnackBarContext: () => ({
    showSuccessSnackBar: jest.fn((props: SnackBarHelperSettings) => mockShowSuccessSnackBar(props)),
  }),
}))

describe('<NewConsentSettings/>', () => {
  it('should render correctly', () => {
    const renderAPI = renderConsentSettings()
    expect(renderAPI).toMatchSnapshot()
  })

  it('should save cookies consent information in storage and log choice when user partially accepts cookies', async () => {
    const { getByText, getByTestId } = renderConsentSettings()

    const performanceSwitch = getByTestId('Interrupteur-performance')
    fireEvent.press(performanceSwitch)

    const saveChoice = getByText('Enregistrer mes choix')
    fireEvent.press(saveChoice)

    const storageContent = {
      deviceId,
      choiceDatetime: Today.toISOString(),
      consent: {
        mandatory: COOKIES_BY_CATEGORY.essential,
        accepted: COOKIES_BY_CATEGORY.performance,
        refused: [...COOKIES_BY_CATEGORY.customization, ...COOKIES_BY_CATEGORY.marketing],
      },
    }
    await waitFor(async () => {
      expect(await storage.readObject(COOKIES_CONSENT_KEY)).toEqual(storageContent)
      expect(api.postnativev1cookiesConsent).toBeCalledWith(storageContent)
    })
  })

  it('should show snackbar and navigate to home on save', async () => {
    const { getByText } = renderConsentSettings()

    const saveChoice = getByText('Enregistrer mes choix')
    fireEvent.press(saveChoice)

    await waitFor(() => {
      expect(mockShowSuccessSnackBar).toBeCalledWith({
        message: 'Ton choix a bien été enregistré.',
        timeout: SNACK_BAR_TIME_OUT,
      })
      expect(mockNavigate).toBeCalledWith('TabNavigator', { screen: 'Profile' })
    })
  })
})

const renderConsentSettings = () =>
  render(<NewConsentSettings />, {
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    wrapper: ({ children }) => reactQueryProviderHOC(children),
  })
