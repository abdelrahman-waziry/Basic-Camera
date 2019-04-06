import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from '../CoolCamera/app/views/Camera'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 5
  }
});
