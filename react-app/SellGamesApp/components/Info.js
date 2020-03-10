import React, { useState } from 'react';
import {View, Button, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import SportsInfo from '../constants/sportsInfo';

const Info = props => {
    let i;
    let infoBody = <View></View>;
    function getSportsInfo(sportArray){
        let body = [];
        for(i = 0; i < sportArray.length; i++){
            body[i] = (<View style={{width:'80%'}}>
                <Text style={{fontSize:25, color:Colors.primary.white}}>{sportArray[i].title}</Text>
                <Text style={{fontSize:18,color:Colors.primary.white}}>{sportArray[i].content}</Text>
                </View>)
        }
        return body;
    }
    infoBody = getSportsInfo(props.sportInfo); // Esim, SportsInfo.athletics

    return (
        <View style={styles.infoPage}>
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