import React, { useState, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';

import StTransText from '../components/StTransText';

/**
 * @author Simo - button with the sport image
 * @param infoSetting - statechanger to bring out Info about the sport
 * @param name - name of the sport 
 * @param sinfoSetting - statechanger for the array to be displayed in Info 
 * @param sinfoname - parameter from SportsInfo to be displayed (f.e SportsInfo.athletics)
 * @param source - require() with path to the image for button 
 */
const ImageButton = props =>{ 
    return(
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{  props.infoSetting(props.name)
                        props.sinfoSetting(props.sinfoname)}}>
            <Image
                style={styles.buttonimage}
                source={props.source}
            />
            <StTransText style={{color:'white', 
            fontSize:20, 
            textDecorationLine:'underline'}}>{props.name}</StTransText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        width: 150,
        height:150,
        margin: 10,
        marginBottom: 25,
        alignItems:'center'
    },
    buttonimage:{
        width:'100%',
        height:'100%'
    }
});

export default ImageButton;