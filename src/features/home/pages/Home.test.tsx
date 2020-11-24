import { NavigationContainer } from '@react-navigation/native'
import { render, act } from '@testing-library/react-native'
import React from 'react'

import { HomeStack } from 'features/home/navigation/HomeNavigator'
import { env } from 'libs/environment'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { flushAllPromises } from 'tests/utils'

import { HomeComponent } from './Home'

jest.mock('@react-navigation/native', () => jest.requireActual('@react-navigation/native'))
jest.mock('libs/environment', () => ({
  env: {
    FEATURE_FLAG_CODE_PUSH: true,
    CHEAT_BUTTONS_ENABLED: false,
  },
}))

jest.mock('features/auth/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isLoggedIn: false })),
}))

describe('Home component', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.clearAllTimers()
  })
  it('should render placehodler loader for 3s', async () => {
    const home = await homeRenderer(false, true)
    expect(home.queryByTestId('HomeBodyPlaceholder-testID')).toBeTruthy()
    jest.advanceTimersByTime(2900)
    expect(home.queryByTestId('HomeBodyPlaceholder-testID')).toBeTruthy()
    act(() => jest.advanceTimersByTime(100))
    expect(home.queryByTestId('HomeBodyPlaceholder-testID')).toBeFalsy()
  })
  it('should render correctly without login modal', async () => {
    const home = await homeRenderer(false, false)

    expect(home).toMatchSnapshot()
    home.unmount()
  })

  it('should render modal correctly', async () => {
    const homeWithLoginModal = await homeRenderer(true, false)
    const homeWithoutLoginModal = await homeRenderer(false, false)

    expect(homeWithoutLoginModal).toMatchDiffSnapshot(homeWithLoginModal)
    homeWithLoginModal.unmount()
    homeWithoutLoginModal.unmount()
  })

  it('should have a welcome message', async () => {
    const { getByText, unmount } = await homeRenderer(false, false)

    const welcomeText = getByText('Bienvenue !')
    expect(welcomeText.props.children).toBe('Bienvenue !')
    unmount()
  })

  it('should not have code push button', async () => {
    env.FEATURE_FLAG_CODE_PUSH_MANUAL = false
    const home = await homeRenderer(false, false)

    expect(() => home.getByText('Check update')).toThrowError()
    home.unmount()
  })

  it('should have components and navigation buttons when CHEAT_BUTTONS_ENABLED', async () => {
    env.CHEAT_BUTTONS_ENABLED = true
    const home = await homeRenderer(false, false)

    expect(() => home.getByText('Composants')).toBeTruthy()
    expect(() => home.getByText('Navigation')).toBeTruthy()
    home.unmount()
  })

  it('should NOT have components or navigation buttons when NOT CHEAT_BUTTONS_ENABLED', async () => {
    env.CHEAT_BUTTONS_ENABLED = false
    const home = await homeRenderer(false, false)

    expect(() => home.getByText('Composants')).toThrowError()
    expect(() => home.getByText('Navigation')).toThrowError()
    home.unmount()
  })
})

async function homeRenderer(withModal: boolean, withLoadingPlaceholder: boolean) {
  const renderAPI = render(
    reactQueryProviderHOC(
      <NavigationContainer>
        <HomeStack.Navigator initialRouteName="Home">
          <HomeStack.Screen
            name="Home"
            component={HomeComponent}
            initialParams={{ shouldDisplayLoginModal: withModal }}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  )
  await act(async () => {
    if (!withLoadingPlaceholder) {
      jest.advanceTimersByTime(3000)
    }
    await flushAllPromises()
  })
  return renderAPI
}
