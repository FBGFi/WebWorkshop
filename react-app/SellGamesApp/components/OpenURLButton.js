import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import Colors from '../constants/colors';
import Card from "../components/Card";

const OpenURLButton = props => {
    //static propTypes = { url: React.PropTypes.string };
    function handleClick(){
      Linking.canOpenURL(props.url).then(supported => {
        if (supported) {
          Linking.openURL(props.url);
        } else {
          console.log("Don't know how to open URI: " + props.url);
        }
      });
    };
      return (
        <View style={{...styles.button, ...props.buttonStyles}}>
        <TouchableOpacity onPress={handleClick}>
          <View>
            <Text style={{ ...styles.text, ...props.textStyles}}>{props.buttonText}</Text>
          </View>
        </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary.red,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignContent: 'center'
    },    
    text: {
        color: Colors.primary.yellow,
        alignSelf: "center"
    },
});
export default OpenURLButton;