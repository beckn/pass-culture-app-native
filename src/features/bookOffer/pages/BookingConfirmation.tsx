import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'

import { navigateToHomeConfig } from 'features/navigation/helpers'
import { UseNavigationType, UseRouteType } from 'features/navigation/RootNavigator/types'
import { useShareOffer } from 'features/share/helpers/useShareOffer'
import { WebShareModal } from 'features/share/pages/WebShareModal'
import { analytics } from 'libs/analytics'
import { useShowReview } from 'libs/hooks/useShowReview'
import { formatToFrenchDecimal } from 'libs/parsers'
import { BatchEvent, BatchUser } from 'libs/react-native-batch'
import { useAvailableCredit } from 'shared/user/useAvailableCredit'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonSecondary } from 'ui/components/buttons/ButtonSecondary'
import { ButtonTertiaryPrimary } from 'ui/components/buttons/ButtonTertiaryPrimary'
import { useModal } from 'ui/components/modals/useModal'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { GenericInfoPageWhite } from 'ui/pages/GenericInfoPageWhite'
import { BicolorTicketBooked } from 'ui/svg/icons/BicolorTicketBooked'
import { PlainArrowPrevious } from 'ui/svg/icons/PlainArrowPrevious'
import { getSpacing, Spacer, Typo } from 'ui/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ColorsEnum } from 'ui/theme/colors'

export function BookingConfirmation() {
  const { params } = useRoute<UseRouteType<'BookingConfirmation'>>()
  const { share: shareOffer, shareContent } = useShareOffer(params.offerId)
  const { reset, navigate } = useNavigation<UseNavigationType>()
  const credit = useAvailableCredit()
  const amountLeft = credit && !credit.isExpired ? credit.amount : 0
  const [disableTravelOption,setDisableTravelOption] = useState(true)
  const trackBooking = useCallback(() => BatchUser.trackEvent(BatchEvent.hasBooked), [])

  const displayBookingDetails = useCallback(() => {
    analytics.logSeeMyBooking(params.offerId)
    trackBooking()
    reset({
      index: 1,
      routes: [
        {
          name: 'TabNavigator',
          state: {
            routes: [{ name: 'Bookings' }],
            index: 0,
          },
        },
        {
          name: 'BookingDetails',
          params: {
            id: params.bookingId,
          },
        },
      ],
    })

   
  }, [params.bookingId, params.offerId, reset, trackBooking])

  useEffect(()=>{
    async function getCurentRide() {
      const currentRideObj = await AsyncStorage.getItem('currentRide')
      setDisableTravelOption(!!currentRideObj?.length)
     }
     getCurentRide()
  },[])

  const {
    visible: shareOfferModalVisible,
    showModal: showShareOfferModal,
    hideModal: hideShareOfferModal,
  } = useModal(false)

  const pressShareOffer = useCallback(() => {
    analytics.logShare({ type: 'Offer', from: 'bookingconfirmation', id: params.offerId })
    shareOffer()
    showShareOfferModal()
  }, [params.offerId, shareOffer, showShareOfferModal])

  useShowReview()

  const amountLeftText = `Il te reste encore ${formatToFrenchDecimal(
    amountLeft
  )} à dépenser sur le pass Culture.`

  const pressTravelOptions = useCallback(() => {
    navigate('SelectTravelOptions', { bookingId: params.bookingId })
  }, [])

  return (
    <React.Fragment>
      <GenericInfoPageWhite
        title="Réservation confirmée&nbsp;!"
        titleComponent={Typo.Title2}
        icon={BicolorTicketBooked}
        separateIconFromTitle={false}
        mobileBottomFlex={0.1}>
        <StyledBody>{amountLeftText}</StyledBody>
        <StyledBody>
          Tu peux retrouver toutes les informations concernant ta réservation sur l’application.
        </StyledBody>
        <Spacer.Flex />
        <ButtonContainer>
          <ButtonPrimary key={1} wording="Voir ma réservation" onPress={displayBookingDetails} />
          <Spacer.Column numberOfSpaces={4} />
          <ButtonSecondary wording="Partager l’offre" onPress={pressShareOffer} />
          <Spacer.Column numberOfSpaces={4} />
          <ButtonSecondary wording="Afficher les options de voyage" disabled={disableTravelOption} onPress={pressTravelOptions} />
          <Spacer.Column numberOfSpaces={4} />
          
          <InternalTouchableLink
            key={2}
            as={ButtonTertiaryPrimary}
            wording="Retourner à l’accueil"
            navigateTo={navigateToHomeConfig}
            onBeforeNavigate={trackBooking}
            icon={PlainArrowPrevious}
          />
        </ButtonContainer>
      </GenericInfoPageWhite>
      {!!shareContent && (
        <WebShareModal
          visible={shareOfferModalVisible}
          headerTitle="Partager l’offre"
          shareContent={shareContent}
          dismissModal={hideShareOfferModal}
        />
      )}
    </React.Fragment>
  )
}

const StyledBody = styled(Typo.Body)({
  textAlign: 'center',
})
const ButtonContainer = styled.View({
  paddingBottom: getSpacing(10),
})
