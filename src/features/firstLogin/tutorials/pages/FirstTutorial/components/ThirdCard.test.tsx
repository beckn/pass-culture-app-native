import { fireEvent, render } from '@testing-library/react-native'
import React, { createRef, RefObject } from 'react'
import Swiper from 'react-native-web-swiper'

import { analytics } from 'libs/analytics'

import { ThirdCard, useRequestGeolocPermissionParameters } from './ThirdCard'

let mockSubmitSpy: () => void
let mockRootSpy: () => void
let mockSpy: () => void
jest.mock('libs/geolocation', () => {
  mockSubmitSpy = jest.fn()
  mockSpy = jest.fn().mockReturnValue({
    onSubmit: mockSubmitSpy,
  })
  mockRootSpy = jest.fn().mockReturnValue({
    requestGeolocPermission: mockSpy,
  })

  return {
    useGeolocation: mockRootSpy,
  }
})

describe('ThirdCard', () => {
  it('should render third card', () => {
    const firstTutorial = render(<ThirdCard />)
    expect(firstTutorial).toMatchSnapshot()
  })
  it('should swipe to next card on button press', async () => {
    const ref = createRef<Swiper>()
    const { getByText } = render(<ThirdCard swiperRef={ref} />)
    const button = await getByText('Activer la géolocalisation')
    fireEvent.press(button)
    expect(mockRootSpy).toHaveBeenCalled()
    expect(mockSpy).toHaveBeenCalled()
  })
  it('should trigger analytics on acceptance', () => {
    const swiperRef = createRef<Swiper>()
    const action = useRequestGeolocPermissionParameters(swiperRef)
    action.onAcceptance()
    expect(analytics.logHasActivateGeolocFromTutorial).toHaveBeenCalledTimes(1)
  })
  it('should trigger slide change on submit', () => {
    const ref = {
      current: {
        goToNext: jest.fn(),
      },
    }
    const action = useRequestGeolocPermissionParameters((ref as unknown) as RefObject<Swiper>)
    action.onSubmit()
    expect(ref.current.goToNext).toHaveBeenCalledTimes(1)
  })
})
