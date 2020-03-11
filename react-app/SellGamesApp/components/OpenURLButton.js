import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import Colors from '../constants/colors';

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
        <View style={{justifyContent:"center", alignContent:"center", marginVertical: 10}}>
          <View style={{...styles.button, ...props.buttonStyles}}>
          <TouchableOpacity onPress={handleClick}>
            <View>
              <Text style={{ ...styles.text, ...props.textStyles}}>{props.buttonText}</Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary.red,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: "center",
        padding: 10,
        borderRadius: 8
    },    
    text: {
        color: Colors.primary.yellow,
        alignSelf: "center",
        textAlign: "center"
    },
});
export default OpenURLButton;