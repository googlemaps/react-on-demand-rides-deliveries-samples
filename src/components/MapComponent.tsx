/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TripInformation from './TripInformation';
import OptionsComponent from './UI/OptionsComponent';
import TripIdComponent from './TripIdComponent';
import { DEFAULT_POLLING_INTERVAL_MS, PROVIDER_PROJECT_ID, PROVIDER_URL } from '../utils/consts';

const MapComponent = () => {
  const ref = useRef(null);
  const [tripId, setTripId] = useState('');
  const [trip, setTrip] = useState({
    status: '',
    stops: 0,
    dropOff: new Date(),
    wayPoints: [],
  });
  const [error, setError] = useState();
  const [mapOptions, setMapOptions] = useState({});

  useEffect(() => {
    const authTokenFetcher = async () => {
      const response = await fetch(
        `${PROVIDER_URL}/token/consumer/${tripId}`
      );
      const responseJson = await response.json();
      return {
        token: responseJson.jwt,
        expiresInSeconds: 3300,
      };
    };

    const locationProvider = new google.maps.journeySharing.FleetEngineTripLocationProvider({
      projectId: PROVIDER_PROJECT_ID,
      authTokenFetcher,
      tripId,
      pollingIntervalMillis: DEFAULT_POLLING_INTERVAL_MS,
    });

    locationProvider.addListener('error', e => {
      setError(e.error.message);
    });

    locationProvider.addListener('update', e => {
      setTrip((prev) => ({
        ...prev,
        stops: e.trip.remainingWaypoints?.length,
        status: e.trip.status,
        dropOff: e.trip.dropOffTime,
        wayPoints: e.trip.remainingWaypoints,
      }));
    });

    const journeySharingMap = new google.maps.journeySharing.JourneySharingMapView({
      element: ref.current,
      locationProvider,
      ...mapOptions,
    });

    journeySharingMap.map.setOptions({ center: { lat: 37.424069, lng: -122.0916944 }, zoom: 14 });
    setError(undefined);
  }, [tripId, mapOptions]);

  return (
    <View>
      <View style={styles.stack}>
        <OptionsComponent setMapOptions={setMapOptions} />
        <TripIdComponent setTripId={setTripId} />
        <Text style={styles.heading}>Trip information</Text>
        <TripInformation style={styles.infoBlock} error={error} trip={trip} tripId={tripId} />
      </View>
      <View style={styles.map} ref={ref} />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '87vh',
    width: '75%',
    position: 'absolute',
    right: 50,
  },
  infoBlock: {
    marginLeft: '30px',
    position: 'absolute',
    width: '25%',
    padding: '10px',
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginVertical: 30,
    marginLeft: 20,
  },
  stack: {
    marginLeft: 10,
    position: 'absolute',
    width: '25%',
    padding: 15,
  },
});

export default React.memo(MapComponent);
