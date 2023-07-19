
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeModules,
  NativeEventEmitter,
  BackHandler,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { GeolocPermissionState, useGeolocation } from 'libs/geolocation'
import { useBookings } from 'features/bookings/api'
import { EndedBookingsSection } from 'features/bookings/components/EndedBookingsSection'
import { getEligibleBookingsForArchive } from 'features/bookings/helpers/expirationDateUtils'
import { Booking, RideResponseType } from 'features/bookings/types'
import { analytics, isCloseToBottom } from 'libs/analytics'
import useFunctionOnce from 'libs/hooks/useFunctionOnce'
import { useIsFalseWithDelay } from 'libs/hooks/useIsFalseWithDelay'
import { useNetInfoContext } from 'libs/network/NetInfoWrapper'
import { plural } from 'libs/plural'
import { useSubcategories } from 'libs/subcategories/useSubcategories'
import {
  BookingHitPlaceholder,
  NumberOfBookingsPlaceholder,
} from 'ui/components/placeholders/Placeholders'
import { Separator } from 'ui/components/Separator'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { getSpacing, Typo } from 'ui/theme'
import { TAB_BAR_COMP_HEIGHT } from 'ui/theme/constants'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'
import { NoBookingsView } from './NoBookingsView'
import { OnGoingBookingItem } from './OnGoingBookingItem'
import { RideBookingItem } from 'features/bookings/components/RideBookingItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { env } from 'libs/environment'
import { api } from 'api/api'
import HyperSdkReact from 'hyper-sdk-react'
import { RideCanceledModal } from 'features/travelOptions/components/RideCanceledModal/RideCanceledModal'

const emptyBookings: Booking[] = []

const ANIMATION_DURATION = 700


interface Location {
  latitude: number
  longitude: number
}
const { HyperSDKModule } = NativeModules

export function OnGoingBookingsList() {
  const netInfo = useNetInfoContext()
  const { data: bookings, isLoading, isFetching, refetch } = useBookings()
  const { bottom } = useSafeAreaInsets()
  const { isLoading: subcategoriesIsLoading } = useSubcategories()
  const showSkeleton = useIsFalseWithDelay(isLoading || subcategoriesIsLoading, ANIMATION_DURATION)
  const isRefreshing = useIsFalseWithDelay(isFetching, ANIMATION_DURATION)
  const { showErrorSnackBar } = useSnackBarContext()
  const [mobileNumber, setMobileNumber] = useState()
  const mobileCountryCode = '+91'
  const [reservedRides, setReserveRides] = useState([])
  const [showRideCanceledModal, setShowRideCanceledModal] = useState<boolean>(false)
  const closeRidecancelModal = () => {
    setShowRideCanceledModal(false)
  }
  async function removeCurrentRide() {
    await AsyncStorage.removeItem('currentRide');
  }

  const {
    ongoing_bookings: ongoingBookings = emptyBookings,
    ended_bookings: endedBookings = emptyBookings,
  } = bookings ?? {}


  const updateReservation = async (tripId: Number | String, tripAmount: Number | String) => {
    try {
      let currentRideObj = await AsyncStorage.getItem('currentRide');
      let reservationsJSON = await AsyncStorage.getItem('reservations');
      let reservations = (reservationsJSON && JSON.parse(reservationsJSON)?.length) ? JSON.parse(reservationsJSON) : [];
      let currentRide = JSON.parse(currentRideObj);
      currentRide['tripid'] = tripId
      currentRide['tripamount'] = tripAmount
      reservations.push(currentRide);
      await AsyncStorage.setItem('reservations', JSON.stringify(reservations));
      await AsyncStorage.removeItem('currentRide');
    } catch (error) {
      console.log('Error updating reservation:', error);
    }
  };


  const { userPosition: position, showGeolocPermissionModal, permissionState } = useGeolocation()
  const [mapUrl, setMapUrl] = useState('')
  const [currentAddress, setCurrentAddress] = useState();
  const [destAddress, setdestAddress] = useState();
  const [currentLocation, setCurrentLocation] = useState<Location | null>({
    latitude: 48.8566,
    longitude: 2.3522,
  })

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {

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
          return address;

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

          console.log('Dest Address:', address);
          // return address;
          // 

        } else {
          console.log('No address found for the given coordinates.');
        }
      })
      .catch(error => {
        console.log('Error getting address:', error);
      });
  }



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


  const processPayload3 = {
    requestId: '6bdee986-f106-4884-ba9a-99c478d78c22',
    service: 'in.yatri.consumer',
    payload: {
      clientId: 'passcultureconsumer',
      merchantId: 'passcultureconsumer',
      action: 'initiate',
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

        name: '',

      },
      destination: {
        lat: 48.895266,
        lon: 2.342009,
        name: '6 RUE ANDRE MESSAGER, 75018 PARIS 18',
      },
    },
  }
  const [signatureResponse, setSignatureResponse] = useState(null)


  useEffect(() => {

    const fetchSignatureResponse = async () => {
      const { firstName } = (await api.getnativev1me()) || 'user'
      const { phoneNumber } = (await api.getnativev1me()) || '+918297921333'
      let mobile = phoneNumber?.slice(3, phoneNumber.length)
      setMobileNumber(mobile)
      try {
        const result = await HyperSDKModule.dynamicSign(firstName, mobile, mobileCountryCode)
        setSignatureResponse(result)
        console.log('signauth check', result)
      } catch (error) {
        console.error(error)
      }

      async function fetchLocalRides() {
        await refreshData(mobile);
      }
      fetchLocalRides()

    }
    fetchSignatureResponse()

  }, [isFetching])
  const destLocation = useRef();


  const getReservationsByCommonKey = async (commonKey) => {
    try {
      const currentRide = await AsyncStorage.getItem('currentRide')
      const currentRideObj = currentRide ? JSON.parse(currentRide) : {};
      destLocation.current = currentRideObj
      console.log('currentRide', currentRide);
      return Object.keys(currentRideObj).length && commonKey === currentRideObj.commonKey ? [currentRideObj] : []
    } catch (error) {
      console.log('Error retrieving reservations:', error)
      return []
    }
  }

  // State to store the signature response
  const rideUpdates = async (trip_id, trip_amount) => {
    const cr = await AsyncStorage.getItem('currentRide')
    if (cr) {
      updateReservation(trip_id, trip_amount);
    }
  }

  const handleClick = async () => {

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

    let currentAddressName = '1er, Tour Eiffel, Av. Gustave Eiffel, 75007 Paris, France';
    const apiKey = 'AIzaSyCFIR5ETG_Zfnx5dBpLke4ZD6WLvrZvEmk';
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.latitude},${position?.longitude}&key=${apiKey}`;

    fetch(geocodeApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          currentAddressName = address;
          // setCurrentAddress(address);
          console.log('Current Address:', address);
          return address;
        } else {
          console.log('No address found for the given coordinates.');
        }
      })
      .catch(error => {
        console.log('Error getting address:', error);
      });


    console.log('isHyperSdkReactInitialised:', HyperSdkReact.isNull());
    if (HyperSdkReact.isNull()) {
      HyperSdkReact.createHyperServices();
    }
    HyperSdkReact.initiate(initiatePayload);
    console.log('handleClickfromongoingbooking', signatureResponse)

    let process3 = { ...processPayload3 } // Create a copy of the processPayload2 object

    // setActiveScreen('OnGoingBookingsList');

    process3.payload.signatureAuthData.signature = result.signature
    process3.payload.signatureAuthData.authData = result.signatureAuthData

    process3.payload.source.lat = position?.latitude
    process3.payload.source.lon = position?.longitude

    console.log('currentAddressName', currentAddressName);
    process3.payload.source.name = currentAddressName,
      console.log('destLocation', destLocation)
    process3.payload.destination.lat = destLocation.current.destination.lat;
    process3.payload.destination.lon = destLocation.current.destination.lon;
    process3.payload.destination.name = destLocation.current.destination.name

    console.log('Updated processPayload3:', process3)


    const eventEmitter1 = new NativeEventEmitter(NativeModules.HyperSdkReact)
    let eventListener1;

    eventListener1 = eventEmitter1.addListener('HyperEvent', async (resp) => {
      const data = JSON.parse(resp)
      const event = data.event || ''
      console.log('event_call_OnGoingBooking: is called ', event)
      switch (event) {
        case 'show_loader':
          // show some loader here
          break

        case 'hide_loader':
          // hide the loader
          break

        case 'initiate_result':
          const payload = data.payload || {}
          const res = payload ? payload.status : payload

          if (res === 'SUCCESS') {
            // Initiation is successful, call process method
            if (process3.payload.signatureAuthData != undefined) {
              HyperSdkReact.process(JSON.stringify(process3))
            } else {
              alert('Invalid signature')
            }
            // HyperSdkReact.process(JSON.stringify(processPayload2));
            console.log('process_call: is called ', payload)
          } else {
            // Handle initiation failure
            console.log('Initiation failed.')
          }
          break

        case 'process_result':
          const processPayload = data.payload || {}
          console.log('process_result: ', processPayload)
          const process_result = data.payload || {}
          console.log('process_result: ', process_result);
          switch (process_result) {
            case 'home_screen':
              HyperSdkReact.terminate()
              eventListener1.remove()

          }

          // Handle process result
          if (processPayload?.action === 'terminate' && processPayload?.screen === 'home_screen') {
            HyperSdkReact.terminate()
            eventListener1.remove()
            console.log('process_call: is called ', processPayload)
          } else if (processPayload?.ride_status === 'TRIP_FINISHED') {
            //function call for wallet transaction

            await updateReservation(processPayload?.trip_id, processPayload?.trip_amount);
            console.log('process_call: wallet transaction ---------------------------> ', processPayload)
            refreshData(mobileNumber);
            // HyperSdkReact.terminate();
          } else if (processPayload?.ride_status === 'CANCELLED_PRODUCT') {
            console.log('process_call: Ride canceled By the driver11111 ', processPayload)
            HyperSdkReact.terminate()
            setShowRideCanceledModal(true)
            removeCurrentRide()
            eventListener1.remove()
            refreshData(mobileNumber)
          } else if (
            processPayload?.action === 'feedback_submitted' || processPayload?.screen === 'home_screen') {
            console.log('process_call: wallet transaction ', processPayload)
            rideUpdates(processPayload?.trip_id, processPayload?.trip_amount)
            HyperSdkReact.terminate()
            eventListener1.remove()
            console.log('process_call:feedback_submitted ---------------------------> ', processPayload)
            refreshData(mobileNumber);
          }
          // else if (
          //   processPayload?.action === 'feedback_submitted' || processPayload?.screen === 'home_screen') {
          //   console.log('process_call: wallet transaction ', processPayload)
          //   HyperSdkReact.terminate()
          //   eventListener1.remove()
          //   refreshData(mobileNumber);
          // }

          if (processPayload?.screen === 'home_screen') {
            HyperSdkReact.terminate()
            eventListener1.remove()
          } else if (processPayload?.screen === 'trip_started_screen') {

          }
          console.log('process_call: process ', processPayload)

          break

        default:
          console.log('Unknown Event', data)
      }

    })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return !HyperSdkReact.isNull() && HyperSdkReact.onBackPressed()
    })

    // return () => {
    //   setActiveScreen(null);
    //   if (eventListener1) {
    //     eventListener1.remove();
    //   }
    //   BackHandler.removeEventListener('hardwareBackPress', () => null)
    // }


  }

  const refreshData = async (mobile) => {
    const rideData = await getReservationsByCommonKey(mobile)
    setReserveRides(rideData)
  }



  const [activeScreen, setActiveScreen] = useState(null);
  //   event handlers for the sdk event



  const refetchOffline = useCallback(() => {
    showErrorSnackBar({
      message: 'Impossible de recharger tes réservations, connecte-toi à internet pour réessayer.',
      timeout: SNACK_BAR_TIME_OUT,
    })
  }, [showErrorSnackBar])

  const onRefetch = netInfo.isConnected && netInfo.isInternetReachable ? refetch : refetchOffline
  const onGoingBookingsCount = ongoingBookings.length
  const hasBookings = onGoingBookingsCount > 0
  const hasEndedBookings = endedBookings.length > 0
  const bookingsCountLabel = plural(onGoingBookingsCount, {
    one: '# réservation en cours',
    other: '# réservations en cours',
  })

  const ListHeaderComponent = useCallback(
    () => (hasBookings ? <BookingsCount>{bookingsCountLabel}</BookingsCount> : null),
    [hasBookings, bookingsCountLabel]
  )
  const ListFooterComponent = useCallback(
    () => (
      <FooterContainer safeBottom={bottom}>
        <EndedBookingsSection endedBookings={endedBookings} />
      </FooterContainer>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasBookings, bookingsCountLabel, endedBookings]
  )

  const logBookingsScrolledToBottom = useFunctionOnce(analytics.logBookingsScrolledToBottom)

  function onScroll({ nativeEvent }: { nativeEvent: NativeScrollEvent }) {
    if (isCloseToBottom(nativeEvent)) {
      logBookingsScrolledToBottom()
    }
  }

  const eligibleBookingsForArchive = useMemo(
    () => getEligibleBookingsForArchive(ongoingBookings),
    [ongoingBookings]
  )

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) =>
      item.commonKey ? (
        <RideBookingItem booking={item} onRideClick={handleClick} />
      ) : (
        <OnGoingBookingItem
          booking={item}
          // onPressItem={handleListener}
          eligibleBookingsForArchive={eligibleBookingsForArchive}
        />
      ),
    [eligibleBookingsForArchive]
  )
  //
  if (showSkeleton) return <BookingsPlaceholder />
  return (
    <Container flex={hasBookings || hasEndedBookings ? 1 : undefined}>
      <FlatList
        listAs="ul"
        itemAs="li"
        testID="OnGoingBookingsList"
        keyExtractor={keyExtractor}
        data={[...ongoingBookings, ...reservedRides]}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={onRefetch}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={<NoBookingsView />}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        scrollEnabled={hasBookings}
        onScroll={onScroll}
        scrollEventThrottle={400}
      />
      <RideCanceledModal isModalVisible={showRideCanceledModal} onPressModalButton={closeRidecancelModal} hideModal={closeRidecancelModal} />
    </Container>
  )
}

const keyExtractor = (item: Booking | RideResponseType) =>
  item?.id?.toString() || item?.reservationid?.toString()

const contentContainerStyle = {
  flexGrow: 1,
  paddingBottom: TAB_BAR_COMP_HEIGHT + getSpacing(2),
}

const Container = styled.View<{ flex?: number }>(({ flex }) => ({
  flex,
  height: '100%',
}))

const BookingsCount = styled(Typo.Body).attrs(() => getHeadingAttrs(2))(({ theme }) => ({
  paddingHorizontal: getSpacing(6),
  paddingBottom: getSpacing(4),
  color: theme.colors.greyDark,
}))

const FooterContainer = styled.View<{ safeBottom: number }>(({ safeBottom }) => ({
  marginBottom: safeBottom ? safeBottom / 2 : 0,
  paddingVertical: getSpacing(4),
  paddingHorizontal: getSpacing(6),
}))

const Footer = styled.View({ height: TAB_BAR_COMP_HEIGHT + getSpacing(52) })
const BOOKINGS_LIST_PLACEHOLDER = Array.from({ length: 10 }).map((_, index) => ({
  key: index.toString(),
}))

function BookingsPlaceholder() {
  const renderPlaceholder = useCallback(() => <BookingHitPlaceholder />, [])
  const ListHeaderComponent = useMemo(() => <NumberOfBookingsPlaceholder />, [])
  const ListFooterComponent = useMemo(() => <Footer />, [])

  return (
    <LoadingContainer testID="BookingsPlaceholder">
      <FlatList
        data={BOOKINGS_LIST_PLACEHOLDER}
        renderItem={renderPlaceholder}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        scrollEnabled={false}
      />
    </LoadingContainer>
  )
}
const LoadingContainer = styled.View({ flex: 1 })

const ItemSeparatorContainer = styled.View({
  marginHorizontal: getSpacing(6),
  marginVertical: getSpacing(4),
})
function ItemSeparatorComponent() {
  return (
    <ItemSeparatorContainer>
      <Separator />
    </ItemSeparatorContainer>
  )
}