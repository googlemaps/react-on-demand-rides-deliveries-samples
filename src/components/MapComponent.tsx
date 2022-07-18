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
import {
  DEFAULT_POLLING_INTERVAL_MS, PROVIDER_PROJECT_ID, PROVIDER_URL,
  DEFAULT_MAP_OPTIONS
} from '../utils/consts';

interface TripModel {
  status?: string;
  numStops?: number;
  dropOff?: Date;
  waypoints?: google.maps.journeySharing.VehicleWaypoint[];
};

interface MapOptionsModel {
  showAnticipatedRoutePolyline: boolean,
  showTakenRoutePolyline: boolean,
};

const MapComponent = () => {
  const ref = useRef();
  const tripId = useRef<string>();
  const locationProvider = useRef<google.maps.journeySharing.FleetEngineTripLocationProvider>();
  const [error, setError] = useState<string | undefined>();
  const [mapOptions, setMapOptions] = useState<MapOptionsModel>({
    showAnticipatedRoutePolyline: true,
    showTakenRoutePolyline: true
  });
  const [trip, setTrip] = useState<TripModel>({
    status: '',
    numStops: 0,
    dropOff: new Date(),
    waypoints: [],
  });

  const setTripId = (newTripId: string) => {
    tripId.current = newTripId;
    if (locationProvider.current) locationProvider.current.tripId = newTripId;
  };

  const authTokenFetcher = async () => {
    const response = await fetch(
      `${PROVIDER_URL}/token/consumer/${tripId.current}`
    );
    const responseJson = await response.json();

    return {
      token: responseJson.jwt,
      expiresInSeconds: 3300,
    };
  };

  useEffect(() => {
    locationProvider.current = new google.maps.journeySharing.FleetEngineTripLocationProvider({
      projectId: PROVIDER_PROJECT_ID,
      authTokenFetcher,
      tripId: tripId.current,
      pollingIntervalMillis: DEFAULT_POLLING_INTERVAL_MS,
    });

    locationProvider.current.addListener('error', (e: google.maps.ErrorEvent) => {
      setError(e.error.message);
    });

    locationProvider.current.addListener('update', (e: google.maps.journeySharing.FleetEngineTripLocationProviderUpdateEvent) => {
      if (e.trip) {
        setTrip({
          status: e.trip.status,
          numStops: e.trip?.remainingWaypoints?.length,
          dropOff: e.trip?.dropOffTime,
          waypoints: e.trip?.remainingWaypoints,
        });
        setError(undefined);
      };
    });
  }, []);

  useEffect(() => {
    if (locationProvider.current) locationProvider.current.reset();

    const mapViewOptions: google.maps.journeySharing.JourneySharingMapViewOptions = {
      element: ref.current,
      locationProvider: locationProvider.current,
      anticipatedRoutePolylineSetup: ({ defaultPolylineOptions }) => {
        return {
          polylineOptions: defaultPolylineOptions,
          visible: mapOptions.showAnticipatedRoutePolyline,
        };
      },
      takenRoutePolylineSetup: ({ defaultPolylineOptions }) => {
        return {
          polylineOptions: defaultPolylineOptions,
          visible: mapOptions.showTakenRoutePolyline,
        };
      }
    };

    const mapView = new google.maps.journeySharing.JourneySharingMapView(
      mapViewOptions
    );

    // Provide default zoom & center so the map loads even if trip ID is bad or stale.
    mapView.map.setOptions(DEFAULT_MAP_OPTIONS);
  }, [mapOptions]);

  return (
    <View>
      <TripIdComponent setTripId={setTripId} />
      <View style={styles.container}>
        <View style={styles.stack}>
          <OptionsComponent setMapOptions={setMapOptions} />
          <Text style={styles.heading}>Trip information</Text>
          <TripInformation error={error} trip={trip} tripId={tripId} />
        </View>
        <View style={styles.mapContainer}>
          <View style={styles.map} ref={ref} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  map: {
    height: '75vh',
  },
  mapContainer: {
    display: 'flex',
    width: '60%',
    marginRight: 15,
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  stack: {
    display: 'flex',
    marginLeft: 15,
    width: '30%',
    flex: 1,
    flexDirection: 'column',
  }
});

export default MapComponent;
