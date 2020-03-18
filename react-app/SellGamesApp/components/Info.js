import React, { useState } from 'react';
import {View, Button, StyleSheet, BackHandler } from 'react-native';
import Colors from '../constants/colors';

import StTransText from '../components/StTransText';

const Info = props => {
    let i;
    let infoBody = <View></View>;
    /*
        Funktio palauttaa <View><Text>Title</Text><Text>Content</Text></View> arrayn infoBodiin.
        Kun info palauttaa infoBodyn, niin sieltä tulee jokainen arrayn alkio(?) järjestyksessä
    */
    function getSportsInfo(sportArray){
        let body = [];
        for(i = 0; i < sportArray.length; i++){
            body[i] = (<View style={{width:'90%'}}>
                <StTransText style={{fontSize:25, color:Colors.primary.white}}>{sportArray[i].title}</StTransText>
                <StTransText style={{fontSize:18,color:Colors.primary.white}}>{sportArray[i].content}</StTransText>
                </View>)
        }
        return body;
    };

    

    infoBody = getSportsInfo(props.sportInfo); // Esim. SportsInfo.athletics
    // back button functionality
    BackHandler.addEventListener('hardwareBackPress', function() {  
        props.infoSetting(null);
        return true; // this makes sure that the back button does not close the app
    });
    return (
        <View style={{...props.style, ...styles.infoPage}}>
            <StTransText style={{color: Colors.primary.yellow, fontSize: 30}}>{props.title}</StTransText>
            {infoBody}

            <Button title="Return" 
            color={Colors.primary.red}
            onPress={() => props.infoSetting(null)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    infoPage:{
        width:'100%',
        alignItems: 'center'
    }
});
export default Info;