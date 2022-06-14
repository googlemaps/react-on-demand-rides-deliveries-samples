import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MapComponent from './components/MapComponent';

const render = (status: Status) => {
  if (status === Status.LOADING) return <Text>{status}</Text>;
  if (status === Status.FAILURE) return <Text>{status}</Text>;
  return null;
};

const main = () => {
  const [ tripID, setTripID ] = useState('');

  return (
    <View>
      <Wrapper apiKey={"YOUR_API_KEY"} render={render} version={"beta"} libraries={["journeySharing"]} >
        <MapComponent tripID={tripID}/>
      </Wrapper>
    </View>
)};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: 'auto',
    alignItems: 'center',
  }
});

export default main;
