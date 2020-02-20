import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
//Component import
import Footer from './components/footer.js';

//Screens import
import InfoScreen from './screens/InfoScreen';
import MapScreen from "./screens/MapScreen";
import ScheduleScreen from "./screens/ScheduleScreen";

import Events from './data/events';

export default function App() {
  // components to variables
  let content = <InfoScreen/>;
  let footer = <Footer/>;

  return (
    <View style={styles.container}>
      {content}
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { // affects the View surrounding everything
    flex: 1,
    marginTop: StatusBar.currentHeight, // automatically detects the statusbar height on all android devices
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
