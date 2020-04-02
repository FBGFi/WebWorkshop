import React from 'react';
import {View, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';

import Colors from '../constants/colors';

import StTransText from '../components/StTransText';

/**
 * @param title - header for the display
 * @param infoSetting - statechanger for returning
 * @param sportInfo - array for the info for the sport
 * @param setToCalendarButton - boolean for the map screen, so we can add this event to user schedules
 * @param setToCalendar - function to save the event to calendar if the button is added
 * @param eventInfo - object to be saved to the calendar
 * @param titleStyle - if title text needs styling
 */
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
            body[i] = (<View style={{width:'90%'}} key={"" + i}>
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
        BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()});
        return true; // this makes sure that the back button does not close the app
    });
    return (
        <View style={{...props.style, ...styles.infoPage}}>
            <StTransText style={{...{color: Colors.primary.yellow, fontSize: 30}, ...props.titleStyle}}>{props.title}</StTransText>
            {infoBody}
            <View style={{marginBottom:30, marginTop:10}}>

                {props.setToCalendarButton ? 
                (<TouchableOpacity onPress={() => props.setToCalendar(props.eventInfo)}>
                    <View style={{...styles.buttonWrapStyles, ...{marginBottom: 10}}}>
                        <StTransText style={styles.buttonTextStyles}>Save to Schedules</StTransText>
                    </View>
                </TouchableOpacity>) : null}

                <TouchableOpacity onPress={() => props.infoSetting(null)}>
                    <View style={styles.buttonWrapStyles}>
                        <StTransText style={styles.buttonTextStyles}>Return</StTransText>
                    </View>
                </TouchableOpacity>
            </View>
        </View>  
    );
}

const styles = StyleSheet.create({
    infoPage:{
        width:'100%',
        alignItems: 'center'
    },
    buttonWrapStyles:{
        backgroundColor: Colors.primary.red, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 5,
    },
    buttonTextStyles: {
        color: Colors.primary.white, 
        fontSize: 25, 
        textAlign: 'center'
    }
});
export default Info;