import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, BackHandler } from 'react-native';
import Colors from '../constants/colors';

const Info = props => {
    let i;
    let infoBody = <View></View>;

    function getSportsInfo(sportArray){
        let body = [];
        for(i = 0; i < sportArray.length; i++){
            body[i] = (<View style={{width:'90%'}}>
                <Text style={{fontSize:25, color:Colors.primary.white}}>{sportArray[i].title}</Text>
                <Text style={{fontSize:18,color:Colors.primary.white}}>{sportArray[i].content}</Text>
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
            <Text style={{color: Colors.primary.yellow, fontSize: 30}}>{props.title}</Text>
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