import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import Card from "../components/Card";

import Colors from "../constants/colors";

const VirtualList = props => {
    if(props.horizontal){       
        return (
            <FlatList horizontal keyExtractor={(item, index) => item.id}
                        data={props.content}
                        renderItem={itemData => 
                            <Card 
                            title={itemData.item.title} 
                            textContents={itemData.item.time} 
                            button={true} 
                            buttonTitle={props.buttonTitle} 
                            buttonOnPress={props.buttonOnPress} 
                            id={itemData.item.id}/>
                        } />);
    }
    else{    
        return (
            <FlatList keyExtractor={(item, index) => item.id}
                        data={props.content}
                        renderItem={itemData => 
                            <Card 
                            title={itemData.item.title} 
                            textContents={itemData.item.time} 
                            button={true} 
                            buttonTitle={props.buttonTitle} 
                            buttonOnPress={props.buttonOnPress} 
                            id={itemData.item.id}/>
                        } />);
    }
    
};

const CalendarScreen = props => {
    // different states for all the days, no need to fetch all if user only wants friday
    const [fridayContent, setFridayContent] = useState([]);
    const [saturdayContent, setSaturdayContent] = useState([]);
    const [sundayContent, setSundayContent] = useState([]);

    // this not ideal? this just sets the "icon" for the expanding button
    const [fridayButton, setFridayButton] = useState('+');
    const [saturdayButton, setSaturdayButton] = useState('+');
    const [sundayButton, setSundayButton] = useState('+');

    const [progress, setProgress] = useState(false);

    // again, other solutions were buggy, so handling the color of the tab buttons this way
    const [eventTabBckgrnd, setEventTabBckgrnd] = useState(Colors.primary.yellow);
    const [userTabBckgrnd, setUserTabBckgrnd] = useState('#ab8b20');

    // changes the visibility of tabs
    const [calendarDisplay, setCalendarDisplay] = useState('flex');
    const [userDisplay, setUserDisplay] = useState('none');

    // array for users own schedules
    const [userContent, setUserContent] = useState([]);
    // needed this length to be saved here for comparison with userContent length, otherwise data saving wouldnt work correctly
    const [savedContent, setSavedContent] = useState(0);
    // program got into rendering loop without a flag to indicate if data was already retrieved from local storage
    const [dataToBeFound, setDataToBeFound] = useState(true);

    const [alert, showAlert] = useState(false);
   
    // empty array and havent already checked if something to be found
    if(userContent.length <= 0 && dataToBeFound)
    {       
        retrieveData();
    }
    // on re-render if length of users array is different than savedContent, go to save the data
    if(userContent.length != savedContent)
    {
        storeData();
    }

    async function retrieveData(){
        try {
          const value = await AsyncStorage.getItem('USER_SCHEDULES');
          
          // if theres empty array, it returns [] which is 2 characters long
          if(value.length > 2) {
            setUserContent(JSON.parse(value));
            setSavedContent(JSON.parse(value).length);
          }
          else{
              setDataToBeFound(false);
          }
        } catch(e) {
          console.log(e);
          
        }
    }

    async function storeData(){
        try {
            setSavedContent(userContent.length);
            await AsyncStorage.setItem('USER_SCHEDULES', JSON.stringify(userContent));
                   
        } catch (e) {
            console.log(e);      
        }
    }

    async function checkUserData(contentId){                        
        let result = {};
        
        // check if already added to local storage        
        result = userContent.find(obj => {
            return obj.id === contentId
        });
        
        if(result != undefined && Object.keys(result).length > 0){
            Alert.alert(
              'Already added!',
              'This schedule has already been added!',
              [
                {text: 'Cancel', onPress: () => ()=>{}, style: 'cancel'}
              ],
              { cancelable: true }
            );
            return;
        }

        // not ideal?
        while(true){            
            result = fridayContent.find(obj => {
                return obj.id === contentId
            });
            if(result != undefined) {break;}      
            result = saturdayContent.find(obj => {
                return obj.id === contentId
            });
            if(result != undefined) {break;}

            result = sundayContent.find(obj => {
                return obj.id === contentId
              });
            if(result != undefined) {break;}

            break;
        }
        
        // no local storage exists
        if(userContent.length <= 0){
            setUserContent([result]);
        }
        // exists
        else{            
            setUserContent(currentContent => [...currentContent, result]);
        }
        showAlert(true);
        await sleep(1000);
        showAlert(false);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function removeFromUserContent(contentId){
        let filtered = userContent.filter(obj => {
            return obj.id !== contentId;
        });
        setUserContent(filtered);       
    }

    // date is a number from 15-17, contentToSet is one of data arrays state changers
    async function getDataAsync(date, contentToSet) {
        setProgress(true);
        let eventArray;
        try {
            const response = await fetch("https://sellgames2020.fi/backend/api/events/date/2020-05-" + date, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            const json = await response.json();
            let length = Object.keys(json.data).length;

            eventArray = new Array(length);
            let startTimeFix = "";
            let endTimeFix = "";


            for (let i = 0; i < length; i++) {
                startTimeFix = json.data[i].start_time.split(':');
                startTimeFix = startTimeFix[0] + "." + startTimeFix[1];
                endTimeFix = json.data[i].end_time.split(':');
                endTimeFix = endTimeFix[0] + "." + endTimeFix[1];
                
                eventArray[i] = { 
                    id: ("" + json.data[i].id), 
                    title: ("" + json.data[i].name), 
                    time: ("" + startTimeFix + " - " + endTimeFix)
                };
            }

        } catch (error) {
            eventArray = [{ id: "error", title: "Something went wrong :(", time: error.message }];
        }
        contentToSet(eventArray);
        setProgress(false);
        
    };

    // oldContent is the dates data array, contentToShow is the statechanger for the array, buttonToChange is statechanger for the dates expand button, date is 15-17
    async function showContent(oldContent, contentToShow, buttonToChange, date){
        
        if(oldContent.length <= 0)
        {
            getDataAsync(date, contentToShow);  
            buttonToChange('-');    
        } 
        else
        {
            contentToShow([]);
            buttonToChange('+');    
        }
    }

    // which tab button to highlight and fadeout, and which content to hide and which to display
    function changeTabs(highLight, fadeOut, displayContent, hideContent){
        highLight(Colors.primary.yellow);
        fadeOut('#ab8b20');
        displayContent('flex');
        hideContent('none');
    }
    
    return (
        
        <ScrollView style={{...props.style, ...styles.screen}}>

        <View style={styles.tabsView}>
            <View style={{...{backgroundColor: eventTabBckgrnd}, ...styles.eventTab}}><TouchableWithoutFeedback onPress={() => changeTabs(setEventTabBckgrnd, setUserTabBckgrnd, setCalendarDisplay, setUserDisplay)}><Text style={styles.textStyle}>Event Schedules</Text></TouchableWithoutFeedback></View>
            <View style={{...{backgroundColor: userTabBckgrnd}, ...styles.userTab}}><TouchableWithoutFeedback onPress={() => changeTabs(setUserTabBckgrnd, setEventTabBckgrnd, setUserDisplay, setCalendarDisplay)}><Text style={styles.textStyle}>User Schedules</Text></TouchableWithoutFeedback></View>
        </View>

            <View style={{...{display: calendarDisplay}, ...styles.calendarView}}>

                <View style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <Text style={styles.textStyle}>Friday May 15th</Text>
                        <TouchableOpacity style={styles.buttonView} onPress={() => showContent(fridayContent, setFridayContent, setFridayButton, 15)}>
                            <Text style={styles.textStyle}>{fridayButton}</Text>
                        </TouchableOpacity>
                    </View>
                    <VirtualList buttonOnPress={checkUserData} content={fridayContent} buttonTitle="Add to calendar" horizontal={true} />                   

                </View>

                <View style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <Text style={styles.textStyle}>Saturday May 16th</Text>
                        <TouchableOpacity style={styles.buttonView} onPress={() => showContent(saturdayContent, setSaturdayContent, setSaturdayButton, 16)}>
                            <Text style={styles.textStyle}>{saturdayButton}</Text>
                        </TouchableOpacity>
                    </View>
                    <VirtualList buttonOnPress={checkUserData} content={saturdayContent} buttonTitle="Add to calendar" horizontal={true} />

                </View>

                <View style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <Text style={styles.textStyle}>Sunday May 17th</Text>
                        <TouchableOpacity style={styles.buttonView} onPress={() => showContent(sundayContent, setSundayContent, setSundayButton, 17)}>
                            <Text style={styles.textStyle}>{sundayButton}</Text>
                        </TouchableOpacity>
                    </View>
                    <VirtualList buttonOnPress={checkUserData} content={sundayContent} buttonTitle="Add to calendar" horizontal={true}/>

                </View>
            </View>

            <View style={{...{display: userDisplay}, ...styles.userScheduleView}}>
                    {
                        userContent.length > 0 ? 
                            <VirtualList buttonOnPress={removeFromUserContent} content={userContent} buttonTitle="Remove" horizontal={false}/>
                        : 
                            <Card title="Nothing saved yet!" textContents="Add items from the calendar"/>
                    }
            </View>

            <AwesomeAlert
                show={alert}
                showProgress={false}
                title="Added!"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}
                />
            <AwesomeAlert 
                show={progress}
                showProgress={true}
                title="Loading..."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}/>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flex: 1,
        width: '100%'
    },
    tabsView: {
        flexDirection: 'row'
    },
    eventTab: {
        flex: 1,
        minHeight: 50,
        borderTopLeftRadius: 20
    },
    userTab: {
        flex: 1,
        minHeight: 50,
        borderTopRightRadius: 20
    },
    calendarView: {
    },
    userScheduleView: {
    },
    wrapperView: {
        marginBottom: 2
    },
    headerView: {
        flexDirection: 'row',
        backgroundColor: Colors.primary.yellow,
        minHeight: 50
    },
    contentView: {
        backgroundColor: Colors.primary.yellow
    },
    textStyle: {
        flex: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20
    },
    buttonView: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        backgroundColor: Colors.primary.red
    }
});
export default CalendarScreen;