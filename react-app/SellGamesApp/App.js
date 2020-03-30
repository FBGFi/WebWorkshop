import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import * as Font from 'expo-font'; // this needed only in expo?

// Component import
import Footer from './components/Footer.js';

// Screens import
import InfoScreen from './screens/InfoScreen';
import MapScreen from "./screens/MapScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import Colors from './constants/colors';
import CommonConstants from './constants/commonConstants';
const Constants = new CommonConstants();

export default function App() {
  const [contents, setContents] = useState(<ScrollView contentContainerStyle={{backgroundColor: Colors.primary.blue}}><View style={{height: Constants.deviceDimensions.screenHeight, width: Constants.deviceDimensions.screenWidth}}></View></ScrollView>);
  // save notifications here to reduce time for rendering
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
  const [rendered, isRendered] = useState(false);

  // fetch posts
  async function getDataAsync() {
    let eventArray;
    try {
      // uncomment this to reset storage on app reload
        await AsyncStorage.setItem('USER_READ_IDS', "[]");
        await AsyncStorage.setItem('USER_SCHEDULES', "[]");
        const response = await Constants.fetchFromAPI("posts");
        const json = await response.json();
        let length = Object.keys(json.data.data).length;

        let format = "";       
        eventArray = new Array(length);

        for (let i = 0; i < length; i++) {
            // remove some excess linebreaks
            format = "" + json.data.data[i].post_content;
            format = format.replace("\n\n\n\n\n\n", "\n\n");
            format = format.replace("\n\n\n\n\n", "\n\n");
            format = format.replace("\n\n\n\n", "\n\n");
            format = format.replace("\n\n\n", "\n\n");

            eventArray[i] = { id: ("" + json.data.data[i].ID), title: ("" + json.data.data[i].post_title), content: format };
        }
        setNotifications(eventArray);

    } catch (error) {
        eventArray = [{ id: "error", title: "Something went wrong :(", content: error.message }];
    }
    await getReadNotifications();  
  };

  // check which posts user has already read
  async function getReadNotifications(){      
    let found = false; 
    try {
        const value = await AsyncStorage.getItem('USER_READ_IDS');           
        // if theres empty array, it returns [] which is 2 characters long
        if(value.length > 0) {
          setReadNotifications(JSON.parse(value));
          found = true;
        }
        }catch(e) {
        console.log(e);          
    }
    if(!found){
        try {
            await AsyncStorage.setItem('USER_READ_IDS', "[]");
            
        }catch(e){
            console.log(e);
        }
    }
    
  }

  // components to variables
  async function contentSetting(contentName){
    setContents(<ScrollView contentContainerStyle={{backgroundColor: Colors.primary.blue}}><View style={{height: Constants.deviceDimensions.screenHeight, width: Constants.deviceDimensions.screenWidth}}></View></ScrollView>);
    await Constants.sleep(5);
    if(contentName == 'schedule')
    {
      setContents(<ScheduleScreen/>);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // revert the back button functionality to app exit (originally changed in Info.js)
    } 
    else if(contentName == 'map')
    {
      setContents(<MapScreen/>);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // back button ^
    }
    else if(contentName == 'notifications')
    {
      setContents(<NotificationsScreen notifications={notifications} setReadNotifications={setReadNotifications} readNotifications={readNotifications}/>);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // back button ^
    }
    else if(contentName == 'info')
    {
      setContents(<InfoScreen style={styles.infoScreen}/>);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // back button ^
    }
    else{
      setContents(<WelcomeScreen />);
      BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // back button ^
    }
  }

  /**
   * @author Aleksi - ensures that assets have been loaded before loading content
   */
  async function openApp(){
    await Font.loadAsync({
      'StTransmission': require('./assets/fonts/StTransmission-800-ExtraBold.otf'),
      });
    await getDataAsync();
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
      <Footer contentSetting = {contentSetting} unReadNotifications={notifications.length - readNotifications.length}/>
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
