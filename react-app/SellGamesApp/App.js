import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//Component import

//Screens import
import InfoScreen from './screens/InfoScreen';
import MapScreen from "./screens/MapScreen";
import ScheduleScreen from "./screens/ScheduleScreen";

import Events from './data/events';

export default function App() {
  let content = <InfoScreen/>;

  return (
    <View style={styles.container}>
      {content}
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
