import React from 'react'
import { View } from 'react-native'
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars'
import styled from 'styled-components/native'

import { OfferStockResponse } from 'api/gen'
import { ArrowNext } from 'ui/svg/icons/ArrowNext'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

import { getStocksByDate, OfferStatus, getDateStatusAndPrice } from '../BookDateChoice'

import { monthNames, monthNamesShort, dayNames, dayNamesShort } from './Calendar.utils'
import { DiagonalStripe } from './DiagonalStripe'
import { MonthHeader } from './MonthHeader'

LocaleConfig.locales['fr'] = {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
}
LocaleConfig.defaultLocale = 'fr'

const renderDay = (status: OfferStatus, selected: boolean, day: number) => {
  if (status === OfferStatus.BOOKABLE) return <Day color={ColorsEnum.PRIMARY}>{day}</Day>
  if (selected)
    return (
      <SelectedDay>
        <SelectedDayNumber color={ColorsEnum.WHITE}>{day}</SelectedDayNumber>
      </SelectedDay>
    )
  if (status === OfferStatus.NOTBOOKABLE)
    return (
      <DiagonalStripe>
        <Day color={ColorsEnum.GREY_DARK}>{day}</Day>
      </DiagonalStripe>
    )
  return <Typo.Body color={ColorsEnum.GREY_DARK}>{day}</Typo.Body>
}

const renderArrow = (direction: string) => {
  if (direction === 'left') return <ArrowPrevious />
  if (direction === 'right') return <ArrowNext />
  return <React.Fragment />
}

interface Props {
  stocks: OfferStockResponse[]
}

export const Calendar: React.FC<Props> = ({ stocks }) => {
  const stocksDate = getStocksByDate(stocks)
  return (
    <RNCalendar
      firstDay={1}
      enableSwipeMonths={true}
      renderHeader={(date) => <MonthHeader date={date} />}
      hideExtraDays={true}
      renderArrow={renderArrow}
      dayComponent={({ date }) => {
        const dateStatusAndPrice = getDateStatusAndPrice(new Date(date.timestamp), stocksDate)
        // TODO: PC-6695 change hard coded for real data
        const displayPrice =
          date.day === 20 ||
          date.day === 21 ||
          date.day === 2 ||
          date.day === 3 ||
          (date.day === 11 && date.month === 2)
        // TODO: PC-6698 change hard coded for real data
        const selected = date.day === 11 && date.month === 2
        return (
          <View>
            {renderDay(dateStatusAndPrice.status, selected, date.day)}
            {displayPrice ? (
              <Typo.Caption
                color={
                  dateStatusAndPrice.status === OfferStatus.NOTBOOKABLE
                    ? ColorsEnum.GREY_DARK
                    : ColorsEnum.PRIMARY
                  // eslint-disable-next-line react-native/no-raw-text
                }>
                19,90€
              </Typo.Caption>
            ) : (
              <Spacer.Column numberOfSpaces={getSpacing(1)} />
            )}
          </View>
        )
      }}
    />
  )
}

const Day = styled(Typo.ButtonText)({
  textAlign: 'center',
})

const SelectedDay = styled(View)({
  backgroundColor: ColorsEnum.PRIMARY,
  borderRadius: getSpacing(3),
  width: getSpacing(6),
  height: getSpacing(6),
  alignSelf: 'center',
  justifyContent: 'center',
})

const SelectedDayNumber = styled(Typo.ButtonText)({
  alignSelf: 'center',
})
