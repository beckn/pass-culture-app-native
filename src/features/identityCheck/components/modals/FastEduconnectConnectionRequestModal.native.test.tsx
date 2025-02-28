import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { IdentityCheckMethod } from 'api/gen'
import { FastEduconnectConnectionRequestModal } from 'features/identityCheck/components/modals/FastEduconnectConnectionRequestModal'
import { initialSubscriptionState as mockState } from 'features/identityCheck/context/reducer'
import { analytics } from 'libs/analytics'
import * as useFeatureFlag from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { fireEvent, render } from 'tests/utils'

const hideModalMock = jest.fn()
const mockDispatch = jest.fn()

jest.mock('features/identityCheck/context/SubscriptionContextProvider', () => ({
  useSubscriptionContext: jest.fn(() => ({
    dispatch: mockDispatch,
    ...mockState,
  })),
}))

jest.mock('libs/firebase/firestore/ubbleETAMessage', () => ({
  useUbbleETAMessage: jest.fn(() => ({ data: 'Environ 3 heures' })),
}))

const useFeatureFlagSpy = jest.spyOn(useFeatureFlag, 'useFeatureFlag')
useFeatureFlagSpy.mockReturnValue(false)

describe('<IdentityCheckEnd/>', () => {
  it('should render correctly if modal visible', () => {
    const renderAPI = render(
      <FastEduconnectConnectionRequestModal visible hideModal={hideModalMock} />
    )
    expect(renderAPI).toMatchSnapshot()
  })

  it('should render correctly if modal not visible', () => {
    const renderAPI = render(
      <FastEduconnectConnectionRequestModal visible={false} hideModal={hideModalMock} />
    )
    expect(renderAPI).toMatchSnapshot()
  })

  it('should call hideModal function when clicking on Close icon', () => {
    const { getByTestId } = render(
      <FastEduconnectConnectionRequestModal visible hideModal={hideModalMock} />
    )
    const rightIcon = getByTestId(
      'Fermer la modale de propositions d’identifications avec ÉduConnect ou Démarches Simplifiées'
    )
    fireEvent.press(rightIcon)
    expect(hideModalMock).toHaveBeenCalledTimes(1)
  })

  it('should redirect to EduConnect when cliking on "Identification avec ÉduConnect" button', async () => {
    const { getByText } = render(
      <FastEduconnectConnectionRequestModal visible hideModal={hideModalMock} />
    )
    await fireEvent.press(getByText('Identification avec ÉduConnect'))
    expect(hideModalMock).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      payload: IdentityCheckMethod.educonnect,
      type: 'SET_METHOD',
    })
    expect(navigate).toHaveBeenNthCalledWith(1, 'IdentityCheckEduConnect', undefined)
  })

  it('should dispatch ubble identification method in context when clicking on "Identification manuelle" button', async () => {
    const { getByText } = render(
      <FastEduconnectConnectionRequestModal visible hideModal={hideModalMock} />
    )
    await fireEvent.press(getByText('Identification manuelle'))
    expect(hideModalMock).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      payload: IdentityCheckMethod.ubble,
      type: 'SET_METHOD',
    })
  })

  it('should redirect to select ID Origin screen on "Identification manuelle" button press', async () => {
    const { getByText } = render(
      <FastEduconnectConnectionRequestModal visible hideModal={hideModalMock} />
    )
    await fireEvent.press(getByText('Identification manuelle'))

    expect(navigate).toHaveBeenNthCalledWith(1, 'SelectIDOrigin', undefined)
  })
  it("should trigger tracker when the 'Identification avec ÉduConnect' button is pressed", async () => {
    const { getByText } = render(
      <FastEduconnectConnectionRequestModal visible hideModal={hideModalMock} />
    )

    const button = getByText('Identification avec ÉduConnect')
    fireEvent.press(button)

    expect(analytics.logChooseEduConnectMethod).toHaveBeenCalledTimes(1)
  })
  it("should trigger tracker when the 'Identification manuelle' button is pressed", async () => {
    const { getByText } = render(
      <FastEduconnectConnectionRequestModal visible hideModal={hideModalMock} />
    )

    const button = getByText('Identification manuelle')
    fireEvent.press(button)

    expect(analytics.logChooseUbbleMethod).toHaveBeenCalledTimes(1)
  })
})
