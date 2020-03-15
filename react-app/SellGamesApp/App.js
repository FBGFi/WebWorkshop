import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, Dimensions, ScrollView, BackHandler } from 'react-native';
import * as Font from 'expo-font'; // this needed only in expo?

// Component import
import Footer from './components/Footer.js';

// Screens import
import InfoScreen from './screens/InfoScreen';
import MapScreen from "./screens/MapScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import CalendarScreen from "./screens/CalendarScreen";

import Colors from './constants/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default function App() {
  const [contents, setContents] = useState(null);
  // save events here to reduce time for rendering
  const [notificationEvents, setNotificationEvents] = useState([]);
  const [rendered, isRendered] = useState(false);
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // components to variables
  async function contentSetting(contentName){
    setContents(<ScrollView contentContainerStyle={{backgroundColor: Colors.primary.blue}}><View style={{height: screenHeight, width: screenWidth}}></View></ScrollView>);
    await sleep(5);
    if(contentName == 'calendar')
    {
      setContents(<CalendarScreen/>);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // revert the back button functionality to app exit (originally changed in Info.js)
    } 
    else if(contentName == 'map')
    {
      setContents(<MapScreen/>);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // back button ^
    }
    else if(contentName == 'notifications')
    {
      setContents(<NotificationsScreen events={notificationEvents} setEvents={setNotificationEvents}/>);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // back button ^
    }
    else
    {
      setContents(<InfoScreen style={styles.infoScreen}/>);
    }
  }

  /**
   * @author Aleksi - ensures that assets have been loaded before loading content
   */
  async function openApp(){
    await Font.loadAsync({
      'StTransmission': require('./assets/fonts/StTransmission-800-ExtraBold.otf'),
      });
      contentSetting();
  }
  
  // on first time loading, load assets first
  if(!rendered){
    openApp();
    isRendered(true);
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
