import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Image } from 'react-native';

const Footer = props => {
  return (
    <View style = {styles.footer}>
      <TouchableOpacity onPress={() => props.contentSetting('info')}>
        <Image
          style={styles.footerIcon}
          source={require('../assets/icons/info128x128.png')}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => props.contentSetting('map')}>
        <Image
          style={styles.footerIcon}
          source={require('../assets/icons/maps128x128.png')}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => props.contentSetting('notifications')}>
        <Image
          style={styles.footerIcon}
          source={require('../assets/icons/notifs128x128.png')}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => props.contentSetting('calendar')}>
        <Image
          style={styles.footerIcon}
          source={require('../assets/icons/calendar128x128.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "#fed13a",
    alignSelf: 'stretch', // stretch the footer to whole screen width
    flexDirection: 'row', // align children left to right
    justifyContent: 'space-around' // spread children evenly
  },
  footerIcon: {
    flex: 1,
    margin: 7,
    resizeMode: 'center'
  }
});

export default Footer;