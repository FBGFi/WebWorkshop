import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import Colors from '../constants/colors';

import StTransText from './StTransText';

/**
 * @param unReadNotifications - if more than 0, there are unread posts 
 */
const Footer = props => {
  let activeIndicator = <View style={styles.activeIndicator}></View>
  const [currentTab, setCurrentTab] = useState("welcome");
  
  return (
    <View style = {styles.footer}>
      <TouchableOpacity onPress={() => {props.contentSetting('info'); setCurrentTab("info");}}>
        <View style={styles.footerView}>
          <Image
            style={styles.footerIcon}
            source={require('../assets/icons/info128x128.png')}
          />
          {currentTab == "info" ? activeIndicator : null}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {props.contentSetting('map'); setCurrentTab("map");}}>
        <View style={styles.footerView}>
          <Image
            style={styles.footerIcon}
            source={require('../assets/icons/maps128x128.png')}
          />
          {currentTab == "map" ? activeIndicator : null}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {props.contentSetting('notifications'); setCurrentTab("notifications");}}>
        <View style={styles.footerView}>
         <Image
            style={styles.footerIcon}
            source={require('../assets/icons/notifs128x128.png')}
          /> 
          {currentTab == "notifications" ? activeIndicator : null}
          {props.unReadNotifications > 0 ? <View style={{position: 'absolute', bottom: 15, alignSelf: 'center', paddingLeft: 15}}><StTransText style={{color:Colors.primary.red, fontSize: 40}}>!</StTransText></View> : null}         
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {props.contentSetting('schedule'); setCurrentTab("schedule");}}>
        <View style={styles.footerView}>
          <Image
            style={styles.footerIcon}
            source={require('../assets/icons/calendar128x128.png')}
          />
          {currentTab == "schedule" ? activeIndicator : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: Colors.primary.yellow,
    alignSelf: 'stretch', // stretch the footer to whole screen width
    flexDirection: 'row', // align children left to right
    justifyContent: 'space-around' // spread children evenly
  },
  footerView: {
    flex: 1, 
    padding: 7,
    position: 'relative'
  },
  footerIcon: {
    flex: 1,
    resizeMode: 'center'
  },
  activeIndicator: {
    backgroundColor: Colors.primary.red,
    position: 'absolute',
    bottom: 0,
    height: 4,
    width: 50,
    alignSelf: 'center'
  }
});

export default Footer;