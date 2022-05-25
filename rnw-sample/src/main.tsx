import { StyleSheet, View } from 'react-native';
import OptionsComponent from './components/OptionsComponent';

export default function main() {
  return (
    <View style={styles.container}>
      <OptionsComponent/>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
