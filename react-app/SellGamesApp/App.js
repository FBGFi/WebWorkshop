import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, Dimensions, Animated } from 'react-native';

//Component import
import Footer from './components/Footer.js';

//Screens import
import InfoScreen from './screens/InfoScreen';
import MapScreen from "./screens/MapScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import CalendarScreen from "./screens/CalendarScreen";

import Colors from './constants/colors';

const screenHeight = Math.round(Dimensions.get('window').height);


export default function App() {
  const [contents, setContents] = useState(<InfoScreen style={styles.infoScreen}/>);
  // save events here to reduce time for rendering
  const [notificationEvents, setNotificationEvents] = useState([]);
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // components to variables
  async function contentSetting(contentName){
    setContents(<View style={{height: screenHeight - 60 - StatusBar.currentHeight, width: "100%", backgroundColor: Colors.primary.blue}}></View>);
    if(contentName == 'calendar')
    {
      await sleep(5);
      setContents(<CalendarScreen/>);
    } 
    else if(contentName == 'map')
    {
      await sleep(5);
      setContents(<MapScreen/>);
    }
    else if(contentName == 'notifications')
    {
      await sleep(5);
      setContents(<NotificationsScreen events={notificationEvents} setEvents={setNotificationEvents}/>);
    }
    else
    {
      await sleep(5);
      setContents(<InfoScreen style={styles.infoScreen}/>);
    }
  }
  

  return (
    <View style={styles.container}>
      {contents}
      <Footer contentSetting = {contentSetting} />
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
