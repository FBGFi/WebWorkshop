import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Footer = props => {
  return (
    <View style = {styles.footer}>
      <Button
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
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: 'black',
    alignSelf: 'stretch', // stretch the footer to whole screen width
    alignItems: 'center', // align items to the center of parent
    flexDirection: 'row', // align children left to right
    justifyContent: 'space-around' // spread children evenly
  }
});