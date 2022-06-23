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

import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import DropDown from './DropDown';
import CheckBoxComponent from './CheckBoxComponent';
import { ICON_OPTIONS } from "../../utils/consts";

const OptionsComponent = ({ setMapOptions }) => {
  const [showAnticipatedRoute, setAnticipatedRoute] = useState(true);
  const [showTakenRoute, setTakenRoute] = useState(true);
  const [destinationIcon, setDestinationIcon] = useState('USE_DEFAULT');
  const [vehicleIcon, setVehicleICon] = useState('USE_DEFAULT');

  const selectedMapOptions = {
    anticipatedRoutePolylineSetup: ({ defaultPolylineOptions }) => {
      return {
        polylineOptions: defaultPolylineOptions,
        visible: showAnticipatedRoute,
      };
    },
    takenRoutePolylineSetup: ({ defaultPolylineOptions }) => {
      return {
        polylineOptions: defaultPolylineOptions,
        visible: showTakenRoute,
      };
    },
    destinationMarkerSetup: ({ defaultMarkerOptions }) => {
      if (ICON_OPTIONS[destinationIcon] !== ICON_OPTIONS.USE_DEFAULT) {
        defaultMarkerOptions.icon = ICON_OPTIONS[destinationIcon].icon;
      }
      return { markerOptions: defaultMarkerOptions };
    },
    vehicleMarkerSetup: ({ defaultMarkerOptions }) => {
      if (ICON_OPTIONS[vehicleIcon] !== ICON_OPTIONS.USE_DEFAULT) {
        defaultMarkerOptions.icon = Object.assign(
          defaultMarkerOptions.icon,
          ICON_OPTIONS[vehicleIcon].icon
        );
      }
      return { markerOptions: defaultMarkerOptions };
    },
  };

  const pressHandler = () => {
    setMapOptions(selectedMapOptions);
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBoxComponent label={'Show Anticipated Route Polyline'} setRoute={setAnticipatedRoute} option={showAnticipatedRoute} />
          <CheckBoxComponent label={'Show Taken Route Polyline'} setRoute={setTakenRoute} option={showTakenRoute} />
        </View>
        <DropDown label={'Destination Icon:'} setIcon={setDestinationIcon} option={destinationIcon} />
        <DropDown label={'Vehicle Icon:'} setIcon={setVehicleICon} option={vehicleIcon} />
      </View>
      <Pressable style={styles.button} onPress={pressHandler}>
        <Text style={styles.text}>Apply</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 40,
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginBottom: 15,
    marginLeft: 20,
  },
  button: {
    marginLeft: 25,
    backgroundColor: '#2460ad',
    padding: 5,
    width: '30%',
    borderRadius: 2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: '0.9rem',
    textAlign: 'center',
  }
});

export default OptionsComponent;
