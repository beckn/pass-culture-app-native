import React from 'react'

import { GeoCoordinates, Position } from 'libs/geolocation'
import { act, render, screen } from 'tests/utils/web'

import { SearchResults } from './SearchResults'

jest.mock('react-query')

const mockData = { pages: [{ nbHits: 0, hits: [], page: 0 }] }
const mockHasNextPage = true
const mockFetchNextPage = jest.fn()
jest.mock('features/search/api/useSearchResults/useSearchResults', () => ({
  useSearchResults: () => ({
    data: mockData,
    hits: [],
    nbHits: 0,
    isFetching: false,
    isLoading: false,
    hasNextPage: mockHasNextPage,
    fetchNextPage: mockFetchNextPage,
    isFetchingNextPage: false,
  }),
}))

const mockSettings = jest.fn().mockReturnValue({ data: {} })
jest.mock('features/auth/context/SettingsContext', () => ({
  useSettingsContext: jest.fn(() => mockSettings()),
}))

const DEFAULT_POSITION = { latitude: 2, longitude: 40 } as GeoCoordinates
const mockPosition: Position = DEFAULT_POSITION
const mockShowGeolocPermissionModal = jest.fn()

jest.mock('libs/geolocation/GeolocationWrapper', () => ({
  useGeolocation: () => ({
    userPosition: mockPosition,
    showGeolocPermissionModal: mockShowGeolocPermissionModal,
  }),
}))

describe('SearchResults component', () => {
  it('should render correctly', async () => {
    const renderAPI = render(<SearchResults />)
    await act(async () => {}) // fix 3 warnings "Warning: An update to %s inside a test was not wrapped in act" for PriceModal, LocationModal and DatesHoursModal
    await screen.findByTestId('searchResultsFlatlist')

    expect(renderAPI).toMatchSnapshot()
  })
})
