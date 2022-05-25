import React, { useState, Component } from 'react';
import { View, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { CheckBox } from 'react-native-web';

interface Styles {
    checkbox: ViewStyle;
    checkboxContainer: ViewStyle;
    label: TextStyle;
}

const CheckBoxComponent: React.FunctionComponent = (props) => {
  const [check, setCheck] = useState(true);
  console.log(CheckBox);

  return (
    <View style={styles.checkboxContainer}>
        <CheckBox value={check} onValueChange={setCheck} style={styles.checkbox}/>
        <Text style={styles.label}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  checkbox: {
    alignSelf: 'auto',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    marginLeft: 8,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CheckBoxComponent;
