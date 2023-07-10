import React, { useState, useEffect } from 'react'
import {
  View,
  Linking,
  NativeModules,
  NativeEventEmitter,
  BackHandler,
  ActivityIndicator,
} from 'react-native'
import MapComponent from '../../components/MapComponent/MapComponent'
import TravelListModal from '../../components/TravelListModal/TravelListModal'
import { GeolocPermissionState, useGeolocation } from 'libs/geolocation'
import { PageHeaderSecondary } from 'ui/components/headers/PageHeaderSecondary'
import { useNavigation } from '@react-navigation/native'
import { UseNavigationType } from 'features/navigation/RootNavigator/types'
import HyperSdkReact from 'hyper-sdk-react'
import { env } from 'libs/environment'
import { api } from 'api/api'
import { ColorsEnum } from 'ui/theme/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBookingDetailsContext } from 'features/bookings/pages/BookingDetails/context/BookingDetailsContextProvider'
import { any } from 'prop-types'


interface Location {
  latitude: number
  longitude: number
}
const { PIPModule } = NativeModules;
const { HyperSDKModule } = NativeModules

export const SelectTravelOptions = ({ navigation, route }: any) => {

  console.log('test username', api.getnativev1me())
  const [mobileNumber, setMobileNumber] = useState<String| undefined>()
  const mobileCountryCode = '+91'

  const enterPIPMode = () => {

    PIPModule.isPictureInPictureSupported().then(supported => {
      if (supported) {
        PIPModule.enterPictureInPictureMode();
      } else {
        console.warn('Picture-in-Picture is not supported on this device.');
      }
    });
  }
  const { bookingId } = route.params
  console.log('bookingId ----> ', bookingId)
  // console.log("test booking id", route)

  const storeReservation = async (currentRideObj) => {
    try {
      const getRide = await AsyncStorage.getItem('currentRide');
      console.log('getrides ----------------------/ ', getRide)
      let currentRide = currentRideObj;

      // if (reservationsJSON !== null) {
      //   currentRide = JSON.parse(reservationsJSON);
      // }

      // currentRide = currentRideObj;

      // const updatedReservationJSON = JSON.stringify(currentRide);
      console.log('storeReservation--------------------->', currentRide)

      await AsyncStorage.setItem("currentRide", JSON.stringify(currentRide));

      console.log('Reservation stored successfully.', currentRide);
    } catch (error) {
      console.log('Error storing reservation:', error);
    }
  };

  const updateReservation = async (reservationId, tripId, tripAmount) => {
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

  const getReservationsByCommonKey = async (commonKey) => {
    try {
      const reservationsJSON = await AsyncStorage.getItem('reservations');

      if (reservationsJSON !== null) {
        const reservations = JSON.parse(reservationsJSON);
        const filteredReservations = reservations.filter(
          (reservation) => reservation.commonKey === commonKey
        );

        console.log('Retrieved reservations:', filteredReservations);
        return filteredReservations;
      } else {
        console.log('No reservations found.');
      }
    } catch (error) {
      console.log('Error updating reservation:', error);
    }
  };




  const [currentLocation, setCurrentLocation] = useState<Location | null>({
    latitude: 48.8566,
    longitude: 2.3522,
  })

  const [destLocation, setDestLocation] = useState()

  const { userPosition: position, showGeolocPermissionModal, permissionState } = useGeolocation()
  const { goBack } = useNavigation<UseNavigationType>()
  const [modalVisible, setModalVisible] = useState(true)
  const [mapUrl, setMapUrl] = useState('')
  const [currentAddress, setCurrentAddress] = useState();
  const [destAddress, setdestAddress] = useState();
  const { address: bookingAddress } = useBookingDetailsContext()
  
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        if (permissionState === GeolocPermissionState.GRANTED) {

          if (position) {
            setCurrentLocation(position)
            const { latitude, longitude } = position
            getAddressFromCoordinates(latitude, longitude);
            // let lat = 48.896599;
            // let lon = 2.401700;
            // getDestAddressFromCoordinates(lat, lon);


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

  function getAddressFromCoordinates(latitude:Number, longitude:Number) {
    const apiKey = 'AIzaSyDj_jBuujsEk8mkIva0xG6_H73oJEytXEA';
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
    const apiKey = 'AIzaSyDj_jBuujsEk8mkIva0xG6_H73oJEytXEA';
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

  function getCoordinatesFromAddress(address) {
    const apiKey = 'AIzaSyDj_jBuujsEk8mkIva0xG6_H73oJEytXEA';
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    fetch(geocodeApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const latitude = data.results[0].geometry.location.lat;
          const longitude = data.results[0].geometry.location.lng;
          setDestLocation(data.results[0].geometry.location)
          console.log('destCoordinates:', data.results[0].geometry.location);
        } else {
          console.log('No coordinates found for the given address.');
        }
      })
      .catch(error => {
        console.log('Error getting coordinates:', error);
      });
  }


  const initiatePayload = JSON.stringify({

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
        name: currentAddress,
      },
      destination: {
        lat: destLocation?.lat,
        lon: destLocation?.lng,
        name: bookingAddress
      },
    }
  }


  const [showLoader, setShowLoader] = useState(false)

  const handleClick = () => {
    setShowLoader(true);
    if (HyperSdkReact.isNull()) {
      HyperSdkReact.createHyperServices();
    }

    HyperSdkReact.initiate(initiatePayload);
    HyperSdkReact.isInitialised().then((init) => {
      console.log('isInitialised:', init);
    });

  }

  const [signatureResponse, setSignatureResponse] = useState(null); // State to store the signature response

  useEffect(() => {
    const fetchSignatureResponse = async () => {
      const { firstName } = (await api.getnativev1me()) || 'user'
      const { phoneNumber } = (await api.getnativev1me()) || '+918297921333'
      let mobile = phoneNumber?.slice(3, phoneNumber.length)
       setMobileNumber(mobile);
      getCoordinatesFromAddress(bookingAddress);
      try {
        const result = await HyperSDKModule.dynamicSign(firstName, mobile, mobileCountryCode)
        setSignatureResponse(result)
        console.log('signauth check', result)
      } catch (error) {
        console.error(error);
      }
    };

    fetchSignatureResponse();
  }, []);


  useEffect(() => {
    const processPayload2Copy = { ...processPayload2 } // Create a copy of the processPayload2 object
    9090902024
    if (signatureResponse) {
      processPayload2Copy.payload.signatureAuthData.signature = signatureResponse.signature;
      processPayload2Copy.payload.signatureAuthData.authData = signatureResponse.signatureAuthData;

    }

    if (destLocation) {
      processPayload2Copy.payload.destination.lat = destLocation.lat;
      processPayload2Copy.payload.destination.lon = destLocation.lng;

    }
    console.log('Updated processPayload2:', processPayload2Copy);
    const eventEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact)
    const eventListener = eventEmitter.addListener('HyperEvent', (resp) => {
      const data = JSON.parse(resp);
      const event = data.event || '';
      console.log('event_call: is called ', event);
      switch (event) {
        case 'show_loader':
          // show some loader here
          break;

        case 'hide_loader':
          // hide the loader
          setTimeout(() => {
            setShowLoader(false)
            setModalVisible(false);
          }, 3000)
          break;

        case 'initiate_result':
          const payload = data.payload || {};
          const res = payload ? payload.status : payload;
          console.log('initiate_result: ', processPayload2);
          if (res === 'SUCCESS') {
            console.log('checkbookinfID', bookingId)
            const reservation1 = {
              reservationid: bookingId,
              tripid: '',
              tripamount: '',
              source: processPayload2.payload.source,
              destination: processPayload2.payload.destination,
              tripdate: new Date(),
              commonKey: mobileNumber,
            }
            storeReservation(reservation1)
            // Initiation is successful, call process method
            if (processPayload2.payload.signatureAuthData != undefined) {
              HyperSdkReact.process(JSON.stringify(processPayload2));
            } else {
              alert('Invalid signature');
            }
            // HyperSdkReact.process(JSON.stringify(processPayload2));
            console.log('process_call: is called ', payload);
          } else {
            // Handle initiation failure
            setModalVisible(true)
            console.log('Initiation failed.');
          }
          break
        case 'process_result':
          const process_result = data.payload || {}
          switch (process_result) {
            case 'home_screen':
              HyperSdkReact.terminate()

          }

        case 'trip_status':
          const processPayload = data.payload || {}
          console.log('process_result: ', processPayload)
          // Handle process result
          if (processPayload?.action === 'terminate' && processPayload?.screen === 'home_screen') {
            HyperSdkReact.terminate()
            console.log('process_call: is called ', processPayload)
          } else if (processPayload?.ride_status === 'TRIP_FINISHED') {
            //function call for wallet transaction

            updateReservation(bookingId, processPayload?.trip_id, processPayload?.trip_amount);
            console.log('process_call: wallet transaction ', processPayload)
            // HyperSdkReact.terminate();
          } else if (processPayload?.action === 'feedback_submitted' || processPayload?.action === 'home_screen') {

            console.log('process_call: wallet transaction ', processPayload);
            HyperSdkReact.terminate();
            setModalVisible(true)
          }

          if (processPayload?.screen === 'home_screen') {
            HyperSdkReact.terminate()
            setModalVisible(true)
          } else if (processPayload?.screen === 'trip_started_screen') {
            // BackHandler.exitApp();
            enterPIPMode();
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

    return () => {
      eventListener.remove()
      BackHandler.removeEventListener('hardwareBackPress', () => null)
    }
  }, [signatureResponse, destLocation])

  return (
    <View style={{ flex: 1 }}>
      <PageHeaderSecondary
        onGoBack={goBack}
        title=""
        backIconColor={ColorsEnum.BLACK}
        backgroundColor={ColorsEnum.WHITE}
      />
      {currentLocation && <MapComponent mapUrl={mapUrl} />}
      {modalVisible && (
        <TravelListModal
          visible={modalVisible}
          showLoader={showLoader}
          onProceed={() => handleClick()}
          toggleModal={() => goBack()}
        />
      )}
    </View>
  )
}