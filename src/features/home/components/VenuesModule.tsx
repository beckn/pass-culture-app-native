import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'

import { ModuleTitle } from 'features/home/atoms'
import { VenueTile } from 'features/home/atoms/VenueTile'
import { DisplayParametersFields } from 'features/home/contentful'
import { GeoCoordinates } from 'libs/geolocation'
import { formatDistance } from 'libs/parsers'
import { VenueHit } from 'libs/search'
import { Spacer } from 'ui/theme'

type VenuesModuleProps = {
  hits: VenueHit[]
  display: DisplayParametersFields
  position: GeoCoordinates | null
}

const keyExtractor = (item: VenueHit) => item.venue.id

export const VenuesModule = (props: VenuesModuleProps) => {
  const { hits, display, position } = props
  const renderItem: ListRenderItem<VenueHit> = useCallback(({ item }) => {
    return (
      <VenueTile
        name={item.venue.name}
        venueType={item.venue.venueType}
        distance={formatDistance(item._geoloc, position)}
      />
    )
  }, [])

  return (
    <React.Fragment>
      <ModuleTitle title={display.title} />
      <Spacer.Column numberOfSpaces={4} />
      <FlatList
        testID="VenuesModuleList"
        data={hits}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        horizontal={true}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={HorizontalMargin}
        ListFooterComponent={HorizontalMargin}
      />
    </React.Fragment>
  )
}

const HorizontalMargin = () => <Spacer.Row numberOfSpaces={6} />
const ItemSeparatorComponent = () => <Spacer.Row numberOfSpaces={4} />
