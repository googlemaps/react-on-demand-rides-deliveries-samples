import React from 'react';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

const MapComponent = ({ tripId }) => {
  const ref = useRef();
  
  useEffect(() => {
    const authTokenFetcher = async () => {
      const response = await fetch(
        `http://localhost:8080/token/consumer/${tripId}`
      );
      const responseJson = await response.json();

      return {
        token: responseJson.jwt,
        expiresInSeconds: 3300,
      };
    };

    const locationProvider = new google.maps.journeySharing.FleetEngineTripLocationProvider({
      projectId: 'YOUR_PROJECT_ID',
      authTokenFetcher,
      tripId: tripId,
      pollingIntervalMillis: 3000,
    });

    locationProvider.addListener('update', e => { 
      console.log(e.trip.dropOffTime);
      //setTrip(e);
    });

    locationProvider.addListener('error', e => {
      console.error(e.error);
      setTrip(e.error.message);
    });

    const sharingMap = new window.google.maps.journeySharing.JourneySharingMapView({
      // @ts-ignore
      element: ref.current,
      locationProvider: locationProvider,
      mapOptions: {
        center: { lat: 37.7749, lng: -122.5033 },
        zoom: 11,
      }
    })
  });

  // @ts-ignore
  return <View style={style} ref={ref} id='map'/>;
};

const style = {
  height: '100vh',
  width: '70%',
};

export default MapComponent;