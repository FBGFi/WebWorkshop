import React from 'react';
import { StyleSheet, View, TouchableOpacity, } from 'react-native';

import StTransText from '../components/StTransText';

import Colors from '../constants/colors';

/**
 * @param onPress
 * @param title
 */
const CardButton = props => {
  return(
    <View style={styles.spaceBetween}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.buttonStyles}>
          <StTransText style={{color: Colors.primary.red, fontFamily: "StTransmission", textDecorationLine: 'underline', fontSize: 20, textAlign: 'center'}}>{props.title}</StTransText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

/**
 * @param containerStyles - styles to apply to card itself
 * @param textStyles - stylings for both title and contents
 * @param title - text for the title
 * @param titleStyles - styles for the title text
 * @param titleViewStyles - styles for the view around the text
 * @param textContents - text for the content
 * @param textContentStyles - styles for the text contents
 * @param contentViewStyles - styles for the view around text contents
 * @param button - true/false depending if button wanted
 * @param buttonOnPress - function to do from button
 * @param buttonTitle - text inside the button
 */
const Card = props => {
  return (
    <View style = {styles.cardWrapper}>
      <View style={{...styles.cardContainer, ...props.containerStyles}}>

        <View style={{...styles.spaceBetween, ...props.titleViewStyles}}>
          <StTransText style={{...styles.text, ...props.titleStyles}}>{props.title}</StTransText>
        </View>

        <View style={{...styles.spaceBetween, ...props.contentViewStyles}}>
          <StTransText style={{...styles.text, ...props.textContentStyles}}>
            {props.textContents}
          </StTransText>
        </View>
        
        {props.button ? <CardButton title={props.buttonTitle} onPress={props.buttonOnPress.bind(this,props.id)}/> : null}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.primary.yellow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    margin: 2, 
    elevation:0, 
    backgroundColor: Colors.primary.red, 
    borderRadius: 15,
    paddingBottom: 15
  },
  text: {
    color: '#fff',
    fontSize: 20
  },
  buttonStyles: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5
  },
  spaceBetween: {
    marginTop: 15,
    marginHorizontal: 15
  }
});

export default Card;