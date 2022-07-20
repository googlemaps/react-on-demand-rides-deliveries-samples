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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TripModel } from './MapComponent';

interface Props {
  error: string | undefined,
  tripId: string,
  trip: TripModel,
};

const TripInformation: React.FC<Props> = ({ error, tripId, trip }) => {
  const dropOff = trip.dropOff?.toLocaleString();
  const numStops = trip.waypoints ? trip.waypoints.length : 0;

  let distanceSum = trip.waypoints?.reduce((sum, waypoint) => {
    return sum + (waypoint.distanceMeters || 0)
  }, 0);

  const destinationDistance = distanceSum ? `${distanceSum.toLocaleString()} meters` : ' ';

  let waypoints = trip.waypoints && trip.waypoints[0];
  const nextStopDistance = waypoints?.distanceMeters ? `${waypoints.distanceMeters
    .toLocaleString()} meters` : ' ';

  if (error) {
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (tripId && (trip.status === 'COMPLETE')) {
    return (
      <View style={styles.view}>
        <Text style={styles.label}>TRIP STATUS</Text>
        <Text style={styles.text}>{trip.status}</Text>
        <Text style={styles.label}>ARRIVED</Text>
        <Text style={styles.text}>{dropOff}</Text>
      </View>
    );
  }

  if (tripId && trip.status) {
    return (
      <View style={styles.view}>
        <Text style={styles.label}>TRIP STATUS</Text>
        <Text style={styles.text}>{trip.status}</Text>
        <Text style={styles.label}>ETA</Text>
        <Text style={styles.text}>{dropOff}</Text>
        <Text style={styles.label}># STOPS REMAINING</Text>
        <Text style={styles.text}>{numStops}</Text>
        <Text style={styles.label}>DISTANCE TO DESTINATION</Text>
        <Text style={styles.text}>{destinationDistance}</Text>
        <Text style={styles.label}>DISTANCE TO NEXT STOP</Text>
        <Text style={styles.text}>{nextStopDistance}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, fontStyle: 'italic' }}>
          Enter a trip ID to see trip information.
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    padding: 5,
  },
  label: {
    fontSize: 10,
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
  }
});

export default TripInformation;
