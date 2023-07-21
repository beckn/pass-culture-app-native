import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'

import { useBookings } from 'features/bookings/api'
import { EndedBookingItem } from 'features/bookings/components/EndedBookingItem'
import { Booking, RideResponseType } from 'features/bookings/types'
import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { useGoBack } from 'features/navigation/useGoBack'
import { plural } from 'libs/plural'
import { PageHeaderSecondary } from 'ui/components/headers/PageHeaderSecondary'
import { Separator } from 'ui/components/Separator'
import { getSpacing, Spacer, Typo } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'
import { EndedRideBookingItem } from 'features/bookings/components/EndedRideItem'
import { localRidesService } from 'libs/localRides/localRidesService'

const renderItem: ListRenderItem<Booking | RideResponseType> = ({ item }) =>

  item?.commonKey ? <EndedRideBookingItem ride={item} /> : <EndedBookingItem booking={item} />
 
const keyExtractor: (item: Booking) => string = (item) =>
  item?.id?.toString() || item?.reservationid?.toString()

export const EndedBookings: React.FC = () => {
  const { data: bookings } = useBookings()
  const { goBack } = useGoBack(...getTabNavConfig('Bookings'))
  const [reservedRides, setReserveRides] = useState([])

  const endedBookingsCount = bookings?.ended_bookings?.length ?? 0
  const endedBookingsLabel = plural(endedBookingsCount, {
    one: '# réservation terminée',
    other: '# réservations terminées',
  })

  useEffect(() => {
    async function getridedata() {
      const rideData = await localRidesService.GetMyEndedRides()
      setReserveRides(rideData)
    }
    getridedata()
  }, [])

  const ListHeaderComponent = useCallback(
    () => (
      <React.Fragment>
        <Spacer.Column numberOfSpaces={6} />
        <EndedBookingsCount>{endedBookingsLabel}</EndedBookingsCount>
      </React.Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endedBookingsCount]
  )
  const endedBookings = bookings?.ended_bookings || [];
  const reservedRidesArray = reservedRides || [];
  return (
    <React.Fragment>
      <PageHeaderSecondary onGoBack={goBack} title="Réservations terminées" />
      <FlatList
        listAs="ul"
        itemAs="li"
        contentContainerStyle={contentContainerStyle}
        data={[...endedBookings, ...reservedRidesArray]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={StyledSeparator}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </React.Fragment>
  )
}

const EndedBookingsCount = styled(Typo.Body).attrs(getHeadingAttrs(2))(({ theme }) => ({
  color: theme.colors.greyDark,
  paddingBottom: getSpacing(5.5),
}))

const contentContainerStyle = { paddingHorizontal: getSpacing(5) }
const ListFooterComponent = () => <Spacer.Column numberOfSpaces={12} />
const StyledSeparator = styled(Separator)({ marginVertical: getSpacing(4) })
