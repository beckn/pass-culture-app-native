import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from 'api/api';

export const localRidesService = {
  removeCurrentRide: async () => {
    try {
      await AsyncStorage.removeItem('currentRide');
    } catch (error) {
      console.log('Error removing current ride:', error);
    }
  },

  getCurrentRide: async () => {
    try {
      return await AsyncStorage.getItem('currentRide');
    } catch (error) {
      console.log('Error removing current ride:', error);
      return null
    }
  },

  setCurrentRide: async (currentRideObj: any) => {
    try {
      return await AsyncStorage.setItem('currentRide',currentRideObj);
    } catch (error) {
      console.log('Error removing current ride:', error);
      return {}
    }
  },

  updateLocalRides: async (tripId: any, tripAmount: any) => {
    try {
      let currentRideObj = await AsyncStorage.getItem('currentRide');
      let ridesJSON = await AsyncStorage.getItem('reservations');
      let rides = (ridesJSON && JSON.parse(ridesJSON)?.length) ? JSON.parse(ridesJSON) : [];
      let currentRide = !!currentRideObj ? JSON.parse(currentRideObj) : {};
      currentRide['tripid'] = tripId;
      currentRide['tripamount'] = tripAmount;
      rides.push(currentRide);
      await AsyncStorage.setItem('reservations', JSON.stringify(rides));
      await localRidesService.removeCurrentRide();
      console.log('Reservation updated successfully.');
    } catch (error) {
      console.log('Error updating reservation:', error);
    }
  },

  storeReservation: async (currentRideObj: any) => {
    console.log('store-reservation called', currentRideObj);
    try {
      await AsyncStorage.setItem('currentRide', JSON.stringify(currentRideObj));
      console.log('Reservation stored successfully.');
    } catch (error) {
      console.log('Error storing reservation:', error);
    }
  },

   GetMyEndedRides : async () => {
    try {
      const reservationsJSON = await AsyncStorage.getItem('reservations')
      const { phoneNumber } = (await api.getnativev1me()) || '+919480081411'
      let mobile = phoneNumber?.slice(3, phoneNumber.length)
      if (reservationsJSON !== null) {
        const reservations = JSON.parse(reservationsJSON)
        const filteredReservations = reservations.filter(
          (reservation) => reservation.commonKey === mobile
        )

        console.log('Retrieved reservations:', filteredReservations)
        return filteredReservations
      } else {
        console.log('No reservations found.')
        return []
      }
    } catch (error) {
      console.log('Error retrieving reservations:', error)
      return []
    }
  }
};
