import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Events from './data/events';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Waiting for the day this app is done</Text>
      <Events/>
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
