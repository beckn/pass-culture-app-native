import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Platform, ScrollView, useWindowDimensions, NativeModules, NativeEventEmitter, BackHandler } from 'react-native'
import { useQueryClient } from 'react-query'
import styled from 'styled-components/native'
import { navigateToHome } from 'features/navigation/helpers'
import { GeolocPermissionState, useGeolocation } from 'libs/geolocation'
import { useBookings, useOngoingOrEndedBooking } from 'features/bookings/api'
import { ArchiveBookingModal } from 'features/bookings/components/ArchiveBookingModal'
import { BookingDetailsCancelButton } from 'features/bookings/components/BookingDetailsCancelButton'
import { BookingDetailsHeader } from 'features/bookings/components/BookingDetailsHeader'
import { BookingPropertiesSection } from 'features/bookings/components/BookingPropertiesSection'
import { CancelBookingModal } from 'features/bookings/components/CancelBookingModal'
import { TicketSwiper } from 'features/bookings/components/Ticket/TicketSwiper'
import { getBookingProperties, getOfferRules } from 'features/bookings/helpers'
import { isEligibleBookingsForArchive } from 'features/bookings/helpers/expirationDateUtils'
import { BookingNotFound } from 'features/bookings/pages/BookingNotFound/BookingNotFound'
import { Booking } from 'features/bookings/types'
import { UseNavigationType, UseRouteType } from 'features/navigation/RootNavigator/types'
import { mergeOfferData } from 'features/offer/components/OfferTile/OfferTile'
import { formatFullAddress } from 'libs/address/useFormatFullAddress'
import { analytics, isCloseToBottom } from 'libs/analytics'
import useFunctionOnce from 'libs/hooks/useFunctionOnce'
import { SeeItineraryButton } from 'libs/itinerary/components/SeeItineraryButton'
import { getGoogleMapsItineraryUrl } from 'libs/itinerary/openGoogleMapsItinerary'
import { eventMonitoring, ScreenError } from 'libs/monitoring'
import { useNetInfoContext } from 'libs/network/NetInfoWrapper'
import { QueryKeys } from 'libs/queryKeys'
import { useSubcategoriesMapping } from 'libs/subcategories'
import { useOpacityTransition } from 'ui/animations/helpers/useOpacityTransition'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { HeroHeader } from 'ui/components/hero/HeroHeader'
import { blurImageHeight, heroMarginTop } from 'ui/components/hero/useHeroDimensions'
import { LoadingPage } from 'ui/components/LoadingPage'
import { useModal } from 'ui/components/modals/useModal'
import { Separator } from 'ui/components/Separator'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { getSpacing, Spacer, Typo } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'
import { Helmet } from 'ui/web/global/Helmet'
import HyperSdkReact from 'hyper-sdk-react'
import { api } from 'api/api'
import { env } from 'libs/environment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useBookingDetailsContext } from 'features/bookings/pages/BookingDetails/context/BookingDetailsContextProvider'
import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { useGoBack } from 'features/navigation/useGoBack'
import { RideCanceledModal } from 'features/travelOptions/components/RideCanceledModal/RideCanceledModal'
//sdk specific

const { HyperSDKModule } = NativeModules;
//sdk specific endpoint

const scrollIndicatorInsets = { right: 1 }
const emptyBookings: Booking[] = []

export function BookingDetails() {

  const [showRideCanceledModal, setShowRideCanceledModal] = useState<boolean>(false)
  const closeRidecancelModal = () => {
    setShowRideCanceledModal(false)
  }

  async function removeCurrentRide() {
    await AsyncStorage.removeItem('currentRide');
  }

  const windowHeight = useWindowDimensions().height - blurImageHeight
  const netInfo = useNetInfoContext()
  const { params } = useRoute<UseRouteType<'BookingDetails'>>()
  const {
    status,
    data: booking,
    isLoading,
    isError,
    error,
    dataUpdatedAt,
  } = useOngoingOrEndedBooking(params.id)

  const queryClient = useQueryClient()
  const { visible: cancelModalVisible, showModal: showCancelModal, hideModal } = useModal(false)
  const {
    visible: archiveModalVisible,
    showModal: showArchiveModal,
    hideModal: hideArchiveModal,
  } = useModal(false)

  const mapping = useSubcategoriesMapping()
  const { dispatch: bookingDispatch } = useBookingDetailsContext()

  const { venue, id: offerId } = booking?.stock.offer ?? {}
  const { address, postalCode, city } = venue ?? {}
  const venueFullAddress = address ? formatFullAddress(address, postalCode, city) : undefined

  const { data: bookings } = useBookings()
  const { ended_bookings: endedBookings = emptyBookings } = bookings ?? {}
  const { showInfoSnackBar, showErrorSnackBar } = useSnackBarContext()
  // console.log('venue-details', venue)
  // console.log('offerId', offerId)
  const { navigate } = useNavigation<UseNavigationType>()

  // Allows to display a message in case of refresh specifying the cancellation
  // of the reservation being consulted if it is made via Flask Admin
  // and booking is not archived
  const cancellationConsultedBooking = endedBookings.filter(
    (item) => item.id === params.id && !isEligibleBookingsForArchive(item)
  )

  if (cancellationConsultedBooking.length > 0) {
    const nameCanceledBooking = cancellationConsultedBooking[0].stock.offer.name
    showInfoSnackBar({
      message: `Ta réservation "${nameCanceledBooking}" a été annulée`,
      timeout: SNACK_BAR_TIME_OUT,
    })
    navigate('EndedBookings')
  }

  const logConsultWholeBooking = useFunctionOnce(
    () => offerId && analytics.logBookingDetailsScrolledToBottom(offerId)
  )

  const { headerTransition, onScroll } = useOpacityTransition({

    listener: ({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent)) logConsultWholeBooking()
    },
  })

  if ((isLoading || !dataUpdatedAt) && !booking) {
    return <LoadingPage />
  } else if (!isLoading && !booking) {
    if (Platform.OS !== 'web') {
      const bookingNotFoundError = new Error('BookingNotFound')
      bookingNotFoundError.name = 'BookingNotFound'
      eventMonitoring.captureException(bookingNotFoundError, {
        extra: {
          status,
          isLoading,
          booking,
          dataUpdatedAt,
        },
      })
    }
    throw new ScreenError(`Booking #${params.id} not found`, BookingNotFound)
  } else if (isError) {
    throw error
  } else if (!booking) {
    // dead code to satisfy typescript Web compilation
    return null
  }

  const { offer } = booking.stock
  const properties = getBookingProperties(booking, mapping[offer.subcategoryId].isEvent)
  const shouldDisplayItineraryButton =
    !!venueFullAddress && (properties.isEvent || (properties.isPhysical && !properties.isDigital))

  const offerRules = getOfferRules(properties, booking)

  const cancelBooking = () => {
    showCancelModal()
    analytics.logCancelBooking(offer.id)
  }

  const onNavigateToOfferPress = () => {
    if (netInfo.isConnected) {
      queryClient.setQueryData(
        [QueryKeys.OFFER, offer.id],
        mergeOfferData({
          ...offer,
          categoryId: mapping[offer.subcategoryId].categoryId,
          thumbUrl: offer.image?.url,
          name: offer.name,
          offerId: offer.id,
        })
      )
      analytics.logConsultOffer({ offerId: offer.id, from: 'bookings' })
    } else {
      showErrorSnackBar({
        message:
          'Impossible d’afficher le détail de l’offre. Connecte-toi à internet avant de réessayer.',
        timeout: SNACK_BAR_TIME_OUT,
      })
    }
  }

  const [currentLocation, setCurrentLocation] = useState<Location | null>({
    latitude: 48.8566,
    longitude: 2.3522,
  })
  const { userPosition: position, showGeolocPermissionModal, permissionState } = useGeolocation()
  const { goBack } = useNavigation<UseNavigationType>()
  const [modalVisible, setModalVisible] = useState(true)
  const [mapUrl, setMapUrl] = useState('')
  const [currentAddress, setCurrentAddress] = useState();
  const [destAddress, setdestAddress] = useState();

  useEffect(() => {
    const fetchCurrentLocation = async () => {

      try {
        if (permissionState === GeolocPermissionState.GRANTED) {
          setCurrentLocation(position)
          console.error('current location:', position)
          if (position) {
            const { latitude, longitude } = position
            getAddressFromCoordinates(latitude, longitude);
            let lat = 48.896599;
            let lon = 2.401700;
            getDestAddressFromCoordinates(lat, lon);
            console.error('current location:', position)
            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude || 48.8566
              },${longitude || 2.3522}&format=png&zoom=12&size=640x640&key=${env.GOOGLE_MAP_API_KEY}`
            setMapUrl(mapUrl)
          }
        } else {
          showGeolocPermissionModal()
        }
      } catch (error) {
        console.error('Error getting current location:', error)
      }
    }
    fetchCurrentLocation()
  }, [permissionState, showGeolocPermissionModal])

  function getAddressFromCoordinates(latitude, longitude) {
    const apiKey = 'AIzaSyCFIR5ETG_Zfnx5dBpLke4ZD6WLvrZvEmk';
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(geocodeApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setCurrentAddress(address);
          console.log('Current Address:', address);
        } else {
          console.log('No address found for the given coordinates.');
        }
      })
      .catch(error => {
        console.log('Error getting address:', error);
      });
  }


  function getDestAddressFromCoordinates(latitude, longitude) {
    const apiKey = 'AIzaSyCFIR5ETG_Zfnx5dBpLke4ZD6WLvrZvEmk';
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(geocodeApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setdestAddress(address);
          console.log('Current Address:', address);
        } else {
          console.log('No address found for the given coordinates.');
        }
      })
      .catch(error => {
        console.log('Error getting address:', error);
      });
  }
  const storeReservation = async (currentRideObj) => {
    console.log("store-resevationcalled", currentRideObj)
    try {
      const getRide = await AsyncStorage.getItem('currentRide');

      let currentRide = currentRideObj;

      await AsyncStorage.setItem("currentRide", JSON.stringify(currentRide));
    } catch (error) {
      console.log('Error storing reservation:', error);
    }
  };

  const updateReservation = async (tripId, tripAmount) => {
    try {
      let currentRideObj = await AsyncStorage.getItem('currentRide');
      let reservationsJSON = await AsyncStorage.getItem('reservations');
      let reservations = (reservationsJSON && JSON.parse(reservationsJSON)?.length) ? JSON.parse(reservationsJSON) : [];
      let currentRide = JSON.parse(currentRideObj);
      currentRide['tripid'] = tripId
      currentRide['tripamount'] = tripAmount
      reservations.push(currentRide);
      await AsyncStorage.setItem('reservations', JSON.stringify(reservations));
      await removeCurrentRide();
      console.log('No reservations found.');
    } catch (error) {
      console.log('Error updating reservation:', error);
    }
  };


  const initiatePayload = JSON.stringify({
    // Replace with your initiate payload
    requestId: '6bdee986-f106-4884-ba9a-99c478d78c22',
    service: 'in.yatri.consumer',
    payload: {
      clientId: 'passcultureconsumer',
      merchantId: 'passcultureconsumer',
      action: 'initiate',
      environment: 'master',
      service: 'in.yatri.consumer',
    },
  })
  const processPayload2 = {
    requestId: '6bdee986-f106-4884-ba9a-99c478d78c22',
    service: 'in.yatri.consumer',
    payload: {
      clientId: 'passcultureconsumer',
      merchantId: 'passcultureconsumer',
      action: 'process',
      service: 'in.yatri.consumer',
      environment: 'master',
      signatureAuthData: {
        signature: '',
        authData: '',
      },
      search_type: 'direct_search',
      source: {
        lat: currentLocation?.latitude,
        lon: currentLocation?.longitude,
        name: currentAddress || '1er, Tour Eiffel, Av. Gustave Eiffel, 75007 Paris, France',
      },
      destination: {
        lat: venue?.coordinates?.latitude || 48.212,
        lon: venue?.coordinates?.longitude || 2.212,
        name: venue?.address || ' ',
      },
    }
  }

  const rideUpdates = async (trip_id, trip_amount) => {
    const cr = await AsyncStorage.getItem('currentRide')
    if (cr) {
      updateReservation(trip_id, trip_amount);
    }
  }

  const [mobileNumber, setMobileNumber] = useState();
  const mobileCountryCode = "+91";

  const { bookingId } = booking.id || '1234567'
  console.log('bookingId', bookingId);
  const [signatureResponse, setSignatureResponse] = useState(null); // State to store the signature response

  const [disabled, setDisabled] = useState(false);

  const viewTripDetails = async () => {
    console.log('handleClickfromBookingDetails-----------------------//////////////////////////////////----------------------------------------------------------------')
    // setDisabled(true);
    let result;
    const { firstName } = (await api.getnativev1me()) || 'user'
    const { phoneNumber } = (await api.getnativev1me()) || '+918297921333'
    let mobile = phoneNumber?.slice(3, phoneNumber.length)
    setMobileNumber(mobile)
    try {
      result = await HyperSDKModule.dynamicSign(firstName, mobile, mobileCountryCode)
      // setSignatureResponse(result)
      console.log('signauth_check_from_handle', result)
    } catch (error) {
      console.error(error)
    }


    console.log('isHyperSdkReactInitialised:', HyperSdkReact.isNull());
    if (HyperSdkReact.isNull()) {
      HyperSdkReact.createHyperServices();
    }
    //   console.log('isHyperSdkReactin iF:', HyperSdkReact.isNull());
    //   HyperSdkReact.isInitialised().then((init) => {
    //     console.log('isInitialised:', init);
    //     if (init) {
    //       HyperSdkReact.initiate(initiatePayload);
    //       console.log('isInitialised:if', init);
    //     } else {
    //       // HyperSdkReact.terminate();
    //       // setActiveScreen('BookingDetails');
    //       HyperSdkReact.initiate(initiatePayload);
    //       console.log('isInitialised:else block', init);
    //     }
    //   });
    // } else {
    //   HyperSdkReact.isInitialised().then((init) => {
    //     console.log('isInitialised:', init);
    //     if (init) {

    //       HyperSdkReact.terminate();
    //       HyperSdkReact.createHyperServices();
    //       HyperSdkReact.initiate(initiatePayload);
    //     } else {
    //       HyperSdkReact.terminate();
    //       HyperSdkReact.createHyperServices();
    //       HyperSdkReact.initiate(initiatePayload);
    //       console.log('initiate: called');
    //     }

    //   });
    // }


    HyperSdkReact.initiate(initiatePayload);

    const process2 = { ...processPayload2 }; // Create a copy of the processPayload2 object


    process2.payload.signatureAuthData.signature = result.signature
    process2.payload.signatureAuthData.authData = result.signatureAuthData

    if (currentAddress) {
      process2.payload.source.name = currentAddress;

    }
    console.log('Updated processPayload2:', process2);


    const eventEmitter2 = new NativeEventEmitter(NativeModules.HyperSdkReact);
    let eventListener2;

    eventListener2 = eventEmitter2.addListener('HyperEvent', (resp) => {
      const data = JSON.parse(resp);
      const event = data.event || '';
      console.log('event_call_BookingDetails: is called ', event);
      switch (event) {
        case 'show_loader':
          // show some loader here  
          break;

        case 'hide_loader':
          // hide the loader
          break;

        case 'initiate_result':
          const payload = data.payload || {};
          const res = payload ? payload.status : payload;
          console.log('initiate_result: ', processPayload2);
          if (res === 'SUCCESS') {
            const reservation1 = {
              reservationid: bookingId,
              tripid: '',
              tripamount: '',
              source: process2.payload.source,
              destination: process2.payload.destination,
              tripdate: new Date(),
              commonKey: mobileNumber,
            }
            storeReservation(reservation1)


            if (process2.payload.signatureAuthData != undefined) {
              HyperSdkReact.process(JSON.stringify(process2));
            } else {
              alert('Invalid signature');
            }
            // HyperSdkReact.process(JSON.stringify(processPayload2));
            console.log('process_call: is called ', payload);
          } else {
            // Handle initiation failure
            // setModalVisible(true)
            console.log('Initiation failed.');
          }
          break;

        case 'process_result':
          const process_result = data.payload || {}
          console.log('process_result: ', process_result);
          switch (process_result) {
            case 'home_screen':
              HyperSdkReact.terminate()
              navigateToHome()
              eventListener2.remove()
              console.log('sdkbackpressswitch');

          }

          // case 'trip_status':
          const processPayload = data.payload || {};
          console.log('process_result: ', processPayload);
          if (processPayload?.status === 'TRIP_FINISHED') {
            //function call for wallet transaction
            updateReservation(processPayload?.trip_id, processPayload?.trip_amount);
            console.log('process_call: wallet transaction ', processPayload);
            // HyperSdkReact.terminate();
          } else if (processPayload?.ride_status === 'CANCELLED_PRODUCT') {
            console.log('process_call: Ride canceled By the driver ', processPayload)
            HyperSdkReact.terminate()

            setShowRideCanceledModal(true)
            removeCurrentRide()
            eventListener2.remove()

          } else if (processPayload?.action === 'feedback_submitted' || processPayload?.action === 'home_screen') {
            rideUpdates(processPayload?.trip_id, processPayload?.trip_amount)
            console.log('process_call: wallet transaction ', processPayload);
            HyperSdkReact.terminate();
            eventListener2.remove()
            navigateToHome()
            console.log('sdkbackpresfeedback');
            // setModalVisible(true)
          }


          if (processPayload?.screen === 'home_screen') {
            HyperSdkReact.terminate();
            eventListener2.remove()
            navigateToHome()


            // setModalVisible(true)
          } else if (processPayload?.screen === 'trip_started_screen') {

          }
          console.log('process_call: process ', processPayload);


          break;

        default:
          console.log('Unknown Event', data);
      }
    });


    BackHandler.addEventListener('hardwareBackPress', () => {
      return !HyperSdkReact.isNull() && HyperSdkReact.onBackPressed();
    });

    // return () => {
    //   setActiveScreen(null);
    //   if (eventListener2) {
    //     eventListener2.remove();
    //   }
    //   BackHandler.removeEventListener('hardwareBackPress', () => null);
    // };

  }



  useEffect(() => {
    const fetchSignatureResponse = async () => {
      const { firstName } = await api.getnativev1me() || 'user'
      const { phoneNumber } = (await api.getnativev1me()) || '+918297921333'
      let mobile = phoneNumber?.slice(3, phoneNumber.length)
      console.log("test username1", mobile, firstName)
      setMobileNumber(mobile);
      bookingDispatch(({ type: 'SET_ADDRESS', payload: venueFullAddress }))
      try {
        const result = await HyperSDKModule.dynamicSign(firstName, mobile, mobileCountryCode);
        setSignatureResponse(result);
        console.log("signauth check", result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSignatureResponse();
  }, []);



  const helmetTitle = `Ma réservation pour ${booking.stock.offer.name} | pass Culture`
  return (
    <Container>
      <Helmet title={helmetTitle} />
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={20}
        scrollIndicatorInsets={scrollIndicatorInsets}
        onContentSizeChange={(_w: number, h: number) => {
          if (h <= windowHeight) {
            logConsultWholeBooking()
          }
        }}
        testID="BookingDetailsScrollView"
        bounces={false}>
        <HeroHeader type="offer" imageHeight={blurImageHeight} imageUrl={offer.image?.url} />
        <Spacer.Column numberOfSpaces={heroMarginTop} />
        <TicketSwiper booking={booking} />
        <ViewWithPadding>
          <Spacer.Column numberOfSpaces={4} />
          <OfferRules>{offerRules}</OfferRules>
          <Spacer.Column numberOfSpaces={offerRules !== '' ? 8 : 2} />
          <BookingPropertiesSection booking={booking} />
          {!!shouldDisplayItineraryButton && (
            <React.Fragment>
              <Spacer.Column numberOfSpaces={4} />
              <Separator />
              <Spacer.Column numberOfSpaces={4} />
              <SeeItineraryButton
                externalNav={{
                  url: getGoogleMapsItineraryUrl(venueFullAddress),
                  address: venueFullAddress,
                }}
                onPress={() =>
                  offerId && analytics.logConsultItinerary({ offerId, from: 'bookingdetails' })
                }
              />
            </React.Fragment>
          )}
          {!!offer.withdrawalDetails && (
            <React.Fragment>
              <Spacer.Column numberOfSpaces={8} />
              <Typo.Title4 {...getHeadingAttrs(2)}>Modalités de retrait</Typo.Title4>
              <Spacer.Column numberOfSpaces={4} />
              <Typo.Body testID="withdrawalDetails">{offer.withdrawalDetails}</Typo.Body>
            </React.Fragment>
          )}
          <Spacer.Column numberOfSpaces={8} />
          <InternalTouchableLink
            enableNavigate={!!netInfo.isConnected}
            as={ButtonPrimary}
            wording="Voir le détail de l’offre"
            navigateTo={{ screen: 'Offer', params: { id: offer.id, from: 'bookingdetails' } }}
            onBeforeNavigate={onNavigateToOfferPress}
            fullWidth
          />
          <Spacer.Column numberOfSpaces={4} />
          <BookingDetailsCancelButton
            booking={booking}
            onCancel={cancelBooking}
            onTerminate={showArchiveModal}
            onViewTripDetails={viewTripDetails}
            fullWidth
            disabled={disabled}
          />
        </ViewWithPadding>
        <Spacer.Column numberOfSpaces={5} />
      </ScrollView>
      {/* BookingDetailsHeader is called after Body to implement the BlurView for iOS */}
      <BookingDetailsHeader headerTransition={headerTransition} title={offer.name} />

      <CancelBookingModal visible={cancelModalVisible} dismissModal={hideModal} booking={booking} />

      <ArchiveBookingModal
        visible={archiveModalVisible}
        bookingId={booking.id}
        bookingTitle={offer.name}
        onDismiss={hideArchiveModal}
      />
      <RideCanceledModal isModalVisible={showRideCanceledModal} onPressModalButton={closeRidecancelModal} hideModal={closeRidecancelModal} />
    </Container>
  )
}

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}))

const OfferRules = styled(Typo.CaptionNeutralInfo)({
  textAlign: 'center',
})

const ViewWithPadding = styled.View({
  paddingHorizontal: getSpacing(5),
})