import React, { useState } from 'react';
import { View, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import CheckBoxComponent from './CheckBoxComponent';

interface Styles {
  container: TextStyle;
  header: ViewStyle;
  subheader: TextStyle;
}

const OptionsComponent: React.FunctionComponent = () => {

  return (
    <View>
      <Text style={styles.header}>RNW ODRD Sample App</Text>
      <View style={styles.container}>
        <CheckBoxComponent>
          Show anticipated route polyline
        </CheckBoxComponent>
      </View>
      <Text style={styles.subheader}>Trip information</Text>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'column',
    marginLeft: 25,
  },
  header: {
    flex: 1,
    margin: 20,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheader: {
    marginTop: 20,
    marginLeft: 25,
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default OptionsComponent;
