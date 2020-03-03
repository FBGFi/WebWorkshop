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

      /* <Button
        title="Info"
        color="black"
        onPress={() => props.contentSetting('info')}
      />
      <Button
        title="Map"
        color="black"
        onPress={() => props.contentSetting('map')}
      />
      <Button
        title="Notifications"
        color="black"
        onPress={() => props.contentSetting('notifications')}
      />
      <Button
        title="Calendar"
        color="black"
        onPress={() => props.contentSetting('calendar')}
      /> */
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "#fed13a",
    alignSelf: 'stretch', // stretch the footer to whole screen width
    // alignItems: 'center', // align items to the center of parent
    flexDirection: 'row', // align children left to right
    justifyContent: 'space-around' // spread children evenly
  },
  // THE SIZE NEEDS TO BE FIXED AFTER MEDIABOIS GET THEIR STUFF TOGETHER
  footerIcon: {
    flex: 1,
    width: 60,
    resizeMode: 'center',
  }
});

export default Footer;