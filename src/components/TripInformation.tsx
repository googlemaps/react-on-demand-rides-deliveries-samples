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

const TripInformation = ({ error, tripId, trip }) => {

  let status = trip.status?.toLowerCase().replace(/_/g, ' ');
  status = status ? `${status.charAt(0).toUpperCase()}${status.slice(1)}` : undefined;

  const stops = trip.stops;

  const dropOff = `${trip?.dropOff?.toDateString() || ''}, ${trip?.dropOff?.toLocaleTimeString() || ''}`;

  let destinationDistance = `${trip.wayPoints?.reduce(
    (sum, waypoint) => sum + (waypoint.distanceMeters || 0),
    0
  ).toLocaleString()}`;
  destinationDistance = `${destinationDistance || ''} ${destinationDistance !== undefined ? 'meters' : ''}`;

  let nextStopDistance = trip.wayPoints && trip.wayPoints[0];
  nextStopDistance = `${nextStopDistance?.distanceMeters.toLocaleString() || ''} ${nextStopDistance?.distanceMeters.toLocaleString() !== undefined ? 'meters' : ''}`;

  if (error) {
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (tripId && (status === 'Complete')) {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>TRIP STATUS: <Text style={styles.bold}>{status}</Text></Text>
        <Text style={styles.text}>ARRIVED: <Text style={styles.bold}>{dropOff}</Text></Text>
      </View>
    );
  }

  if (tripId && status) {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>TRIP STATUS: <Text style={styles.bold}>{status}</Text></Text>
        <Text style={styles.text}>ETA: <Text style={styles.bold}>{dropOff}</Text></Text>
        <Text style={styles.text}># STOPS REMAINING: <Text style={styles.bold}>{stops}</Text></Text>
        <Text style={styles.text}>DISTANCE TO DESTINATION: <Text style={styles.bold}>{destinationDistance}</Text></Text>
        <Text style={styles.text}>DISTANCE TO NEXT STOP: <Text style={styles.bold}>{nextStopDistance}</Text></Text>
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, fontStyle: 'italic' }}>Enter a trip ID to see trip information.</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    padding: 5,
    width: '70%',
    marginLeft: 20,
  },
  text: {
    marginBottom: 15,
    fontSize: '0.8rem',
  },
  bold: {
    fontWeight: 'bold',
  }
});

export default TripInformation;
