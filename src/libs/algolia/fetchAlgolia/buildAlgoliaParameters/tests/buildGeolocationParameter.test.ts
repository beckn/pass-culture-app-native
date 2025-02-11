import { LocationType } from 'features/search/enums'
import { SearchState } from 'features/search/types'
import { RADIUS_FILTERS } from 'libs/algolia/enums'
import {
  buildGeolocationParameter,
  computeAroundRadiusInMeters,
} from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/buildGeolocationParameter'
import { Position } from 'libs/geolocation'

describe('buildGeolocationParameter', () => {
  const locationFilterVenue: SearchState['locationFilter'] = {
    locationType: LocationType.VENUE,
    venue: {
      label: 'Venue',
      info: 'infoVenue',
      venueId: 123,
    },
  }

  const locationFilterPlace: SearchState['locationFilter'] = {
    locationType: LocationType.PLACE,
    place: {
      label: 'Place',
      info: 'infoPlace',
      geolocation: {
        latitude: 48.8566,
        longitude: 2.3522,
      },
    },
    aroundRadius: 5,
  }

  const locationFilterAroundMe: SearchState['locationFilter'] = {
    locationType: LocationType.AROUND_ME,
    aroundRadius: 5,
  }

  const locationFilterEverywhere: SearchState['locationFilter'] = {
    locationType: LocationType.EVERYWHERE,
  }

  const userLocation: Position = {
    latitude: 48.8566,
    longitude: 2.3522,
  }

  it('should return undefined for venue location type', () => {
    const result = buildGeolocationParameter(locationFilterVenue, userLocation)
    expect(result).toBeUndefined()
  })

  it('should return undefined for place location type with no geolocation', () => {
    const locationFilterPlaceNoGeolocation = {
      ...locationFilterPlace,
      place: {
        ...locationFilterPlace.place,
        geolocation: null,
      },
    }
    const result = buildGeolocationParameter(locationFilterPlaceNoGeolocation, userLocation)
    expect(result).toBeUndefined()
  })

  it('should return undefined when there is no user location', () => {
    const result = buildGeolocationParameter(locationFilterEverywhere, null)
    expect(result).toBeUndefined()
  })

  it('should return geolocation parameter for place location type with geolocation', () => {
    const result = buildGeolocationParameter(locationFilterPlace, userLocation)
    expect(result).toEqual({
      aroundLatLng: `${locationFilterPlace?.place?.geolocation?.latitude}, ${locationFilterPlace?.place?.geolocation?.longitude}`,
      aroundRadius: locationFilterPlace.aroundRadius * 1000,
    })
  })

  it('should return undefined for online location type with around me filter', () => {
    const result = buildGeolocationParameter(locationFilterAroundMe, userLocation, true)
    expect(result).toBeUndefined()
  })

  it('should return geolocation parameter for around me location type', () => {
    const result = buildGeolocationParameter(locationFilterAroundMe, userLocation)
    const expectOutput = {
      aroundLatLng: `${userLocation.latitude}, ${userLocation.longitude}`,
      aroundRadius: (locationFilterAroundMe.aroundRadius ?? 0) * 1000,
    }
    expect(result).toEqual(expectOutput)
  })

  it('should return geolocation parameter for "all" location type', () => {
    const result = buildGeolocationParameter(locationFilterEverywhere, userLocation)
    expect(result).toEqual({
      aroundLatLng: `${userLocation.latitude}, ${userLocation.longitude}`,
      aroundRadius: 'all',
    })
  })
})

describe('computeAroundRadiusInMeters', () => {
  it('should return UNLIMITED_RADIUS when locationType is EVERYWHERE', () => {
    const result = computeAroundRadiusInMeters(10, LocationType.EVERYWHERE)
    expect(result).toEqual(RADIUS_FILTERS.UNLIMITED_RADIUS)
  })

  it('should return UNLIMITED_RADIUS when aroundRadius is null', () => {
    const result = computeAroundRadiusInMeters(null, LocationType.PLACE)
    expect(result).toEqual(RADIUS_FILTERS.UNLIMITED_RADIUS)
  })

  it('should return RADIUS_IN_METERS_FOR_NO_OFFERS when aroundRadius is 0', () => {
    const result = computeAroundRadiusInMeters(0, LocationType.PLACE)
    expect(result).toEqual(RADIUS_FILTERS.RADIUS_IN_METERS_FOR_NO_OFFERS)
  })

  it('should compute radius in meters for non-zero aroundRadius', () => {
    const result = computeAroundRadiusInMeters(5, LocationType.PLACE)
    expect(result).toEqual(5000)
  })
})
