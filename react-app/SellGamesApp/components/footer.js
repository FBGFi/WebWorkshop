import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Footer = props => {
  return (
    <View style = {styles.footer}>
      <Button
        title="blyat"
        color="black"
        onPress={() => console.log("button 1 pressed")}
      />
      <Button
        title="blyat"
        color="black"
        onPress={() => console.log("button 2 pressed")}
      />
      <Button
        title="blyat"
        color="black"
        onPress={() => console.log("button 3 pressed")}
      />
      <Button
        title="blyat"
        color="black"
        onPress={() => console.log("button 4 pressed")}
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