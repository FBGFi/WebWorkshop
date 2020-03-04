import React, {useState} from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

//Component import
import Footer from './components/Footer.js';

//Screens import
import InfoScreen from './screens/InfoScreen';
import MapScreen from "./screens/MapScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import CalendarScreen from "./screens/CalendarScreen";

import Events from './data/events';

export default function App() {
  const [contents, setContents] = useState('');
  // save events here to reduce time for rendering
  const [notificationEvents, setNotificationEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  // components to variables
  let content;
  if(contents == 'calendar')
  {
    content = <CalendarScreen />;
  } 
  else if(contents == 'map')
  {
    content = <MapScreen />
  }
  else if(contents == 'notifications')
  {
    content = <NotificationsScreen events={notificationEvents} setEvents={setNotificationEvents}/>
  }
  else
  {
    content = <InfoScreen style={styles.infoScreen}/>;
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
