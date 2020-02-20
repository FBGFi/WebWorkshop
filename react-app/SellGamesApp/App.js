import React, {useState} from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
//Component import
import Footer from './components/footer.js';

//Screens import
import InfoScreen from './screens/InfoScreen';
import MapScreen from "./screens/MapScreen";
import ScheduleScreen from "./screens/ScheduleScreen";

import Events from './data/events';

export default function App() {
  const [contents, setContents] = useState('');
  // components to variables
  let content;
  if(contents == '' || contents == 'info')
  {
    content = <InfoScreen styles={styles.infoScreen}/>;
  } 
  else if(contents == 'map')
  {
    content = <MapScreen />
  }

  

  return (
    <View style={styles.container}>
      {content}
      <Footer contentSetting = {setContents} />
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
  infoScreen:{
    backgroundColor: "blue"
  }
});
