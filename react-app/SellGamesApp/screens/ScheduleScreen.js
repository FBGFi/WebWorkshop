import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback, AsyncStorage, Alert, Image, Text } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import Card from "../components/Card";
import StTransText from '../components/StTransText';

import Colors from "../constants/colors";
import CommonConstants from "../constants/commonConstants";
const Constants = new CommonConstants();

/**
 * @author Aleksi - creates FlatList for the events
 * @param content - data array to make the list from
 * @param buttonTitle - text of the button in card
 * @param buttonOnPress - function that is executed from button
 * @param horizontal - boolean value, is list horizontal or not 
 * @param displayDate - boolean if date wanted to be displayed
 */
const VirtualList = props => {
    
    if(props.horizontal){       
        return (
            <FlatList horizontal keyExtractor={(item, index) => item.id}
                        data={props.content}
                        renderItem={itemData => 
                            <Card 
                            title={itemData.item.title} 
                            titleStyles={{fontSize:22, textDecorationLine:'underline'}}
                            textContents={props.displayDate ? itemData.item.venue + "\n" + itemData.item.date + "\n" + itemData.item.time : itemData.item.venue + "\n" + itemData.item.time} 
                            contentViewStyles={{marginTop: 10}}
                            button={true} 
                            buttonTitle={props.buttonTitle} 
                            buttonOnPress={() => props.buttonOnPress(itemData.item)} 
                            id={itemData.item.id}/>
                        } />);
    }
    else{    
        return (
            props.content.map((item) => (
                <View key={item.id}>
                    <Card 
                        title={item.title} 
                        titleStyles={{fontSize:22, textDecorationLine:'underline'}}
                        textContents={props.displayDate ? item.venue + "\n" + item.date + "\n" + item.time : item.venue + "\n" + item.time} 
                        contentViewStyles={{marginTop: 10}}
                        button={true} 
                        buttonTitle={props.buttonTitle} 
                        buttonOnPress={props.buttonOnPress} 
                        id={item.id}
                        containerStyles={{width: '100%', borderRadius: 0}}/>
                </View>
            )))
    }
    
};

/**
 * @author Aleksi - screen to display schedules for the events
 * @param style - pass styles for the screen 
 */
const ScheduleScreen = props => {
    // different states for all the days, no need to fetch all if user only wants friday
    const [fridayContent, setFridayContent] = useState([]);
    const [saturdayContent, setSaturdayContent] = useState([]);
    const [sundayContent, setSundayContent] = useState([]);

    // this not ideal? this just sets the icon for the expanding button
    const [fridayButton, setFridayButton] = useState(<Image source={require("../assets/icons/Union8.png")} style={{width: 30, height: 30}}/>);
    const [saturdayButton, setSaturdayButton] = useState(<Image source={require("../assets/icons/Union8.png")} style={{width: 30, height: 30}}/>);
    const [sundayButton, setSundayButton] = useState(<Image source={require("../assets/icons/Union8.png")} style={{width: 30, height: 30}}/>);
    
    const [progress, setProgress] = useState(false);

    // again, other solutions were buggy, so handling the color of the tab buttons this way
    const [eventTabBckgrnd, setEventTabBckgrnd] = useState(Colors.primary.yellow);
    const [userTabBckgrnd, setUserTabBckgrnd] = useState('#ab8b20');

    // changes the visibility of tabs
    const [calendarDisplay, setCalendarDisplay] = useState('flex');
    const [userDisplay, setUserDisplay] = useState('none');

    // array for users own schedules
    const [userContent, setUserContent] = useState([]);
    // program got into rendering loop without a flag to indicate if data was already retrieved from local storage
    const [dataToBeFound, setDataToBeFound] = useState(true);

    const [alert, showAlert] = useState(false);
    const [alertAdded, showAlertAdded] = useState(false);
   
    // empty array and havent already checked if something to be found
    if(userContent.length <= 0 && dataToBeFound)
    {       
        retrieveData();
    }

    async function retrieveData(){
        try {
          const value = await AsyncStorage.getItem(Constants.userScheduleKey);
          
          // if theres empty array, it returns [] which is 2 characters long
          if(value.length > 2) {
            setUserContent(JSON.parse(value));
            //setSavedContent(JSON.parse(value).length);
          }
          else{
              setDataToBeFound(false);
          }
        } catch {}
    }

    async function checkUserData(event){
        let wasAdded = await Constants.checkUserData(event);

        // wasn't previously added
        if(wasAdded){        
            showAlert(true);
            await Constants.sleep(300);
            retrieveData();
            await Constants.sleep(300);
            showAlert(false);
        } else {
            showAlertAdded(true);
            await Constants.sleep(1000);
            showAlertAdded(false);
        }
    }

    async function removeFromUserContent(contentId){
        let filtered = userContent.filter(obj => {
            return obj.id !== contentId;
        });       
        setUserContent(filtered);
        Constants.storeData(filtered);       
    }

    /**
     * @param date - number from 15 to 17
     * @param contentToSet - one of the data-arrays state changers
     */
    async function getDataAsync(date, contentToSet) {
        setProgress(true);
        
        let eventArray;
        try {
            const response = await Constants.fetchFromAPI("events/date/2020-05-" + date);

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
                    time: ("" + startTimeFix + " - " + endTimeFix),
                    date: ("May " + date + "th, 2020"),
                    venue: ("" + json.data[i].venue.name + "\n" + json.data[i].venue.address + ", " + json.data[i].venue.postcode + " Lahti")
                };
            }

        } catch (error) {
            eventArray = [{ id: "error", title: "Something went wrong :(", time: error.message }];
        }
        contentToSet(eventArray);
        setProgress(false);       
    };

    /**
     * @param oldContent - data array of the content to show/hide
     * @param setContent - statechanger for the data array
     * @param setButtonToChange - the dates buttons statechanger
     * @param date - number from 15 to 17
     */
    async function showContent(oldContent, setContent, setButtonToChange, date){
        
        if(oldContent.length <= 0)
        {
            getDataAsync(date, setContent);  
            setButtonToChange(<Image source={require("../assets/icons/Line21.png")} style={{width: 30, height: 30}}/>);    
        } 
        else
        {
            setContent([]);
            setButtonToChange(<Image source={require("../assets/icons/Union8.png")} style={{width: 30, height: 30}}/>);    
        }
    }

    /**
     * @param highLight - statechanger for tab header that user clicks
     * @param fadeOut - statechanger for tab header to hide
     * @param displayContent - statechanger for tab to show
     * @param hideContent - statechanger for tab to hide
     */
    function changeTabs(highLight, fadeOut, displayContent, hideContent){
        highLight(Colors.primary.yellow);
        fadeOut('#ab8b20');
        displayContent('flex');
        hideContent('none');
    }
    
    return (
        
        <ScrollView style={{...props.style, ...styles.screen}}>

        <View style={styles.tabsView}>
            <View style={{...{backgroundColor: eventTabBckgrnd}, ...styles.eventTabHeader}}><TouchableWithoutFeedback onPress={() => changeTabs(setEventTabBckgrnd, setUserTabBckgrnd, setCalendarDisplay, setUserDisplay)}><Text style={{...{fontFamily: "StTransmission"},...styles.textStyle}}>Event Schedules</Text></TouchableWithoutFeedback></View>
            <View style={{...{backgroundColor: userTabBckgrnd}, ...styles.userTabHeader}}><TouchableWithoutFeedback onPress={() => changeTabs(setUserTabBckgrnd, setEventTabBckgrnd, setUserDisplay, setCalendarDisplay)}><Text style={{...{fontFamily: "StTransmission"},...styles.textStyle}}>User Schedules</Text></TouchableWithoutFeedback></View>
        </View>

            <View style={{...{display: calendarDisplay}, ...styles.calendarView}}>

                <View style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <StTransText style={styles.textStyle}>Friday May 15th</StTransText>
                        <TouchableOpacity style={styles.expandButtonView} onPress={() => showContent(fridayContent, setFridayContent, setFridayButton, 15)}>
                            <View style={{justifyContent: 'center'}}>
                                {fridayButton}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <VirtualList buttonOnPress={checkUserData} content={fridayContent} buttonTitle="Add to schedule" horizontal={true} />                   

                </View>

                <View style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <StTransText style={styles.textStyle}>Saturday May 16th</StTransText>
                        <TouchableOpacity style={styles.expandButtonView} onPress={() => showContent(saturdayContent, setSaturdayContent, setSaturdayButton, 16)}>
                            <View style={{justifyContent: 'center'}}>
                                {saturdayButton}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <VirtualList buttonOnPress={checkUserData} content={saturdayContent} buttonTitle="Add to schedule" horizontal={true} />

                </View>

                <View style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <StTransText style={styles.textStyle}>Sunday May 17th</StTransText>
                        <TouchableOpacity style={styles.expandButtonView} onPress={() => showContent(sundayContent, setSundayContent, setSundayButton, 17)}>
                            <View style={{justifyContent: 'center'}}>
                                {sundayButton}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <VirtualList buttonOnPress={checkUserData} content={sundayContent} buttonTitle="Add to schedule" horizontal={true}/>

                </View>
            </View>

            <View style={{...{display: userDisplay}, ...styles.userScheduleView}}>
                    {
                        userContent.length > 0 ? 
                            <VirtualList buttonOnPress={removeFromUserContent} content={userContent} buttonTitle="Remove" horizontal={false} displayDate={true}/>
                        : 
                            <Card title="Nothing saved yet!" textContents="Add items from the Event Schedules tab" containerStyles={{width: '100%', borderRadius: 0}}/>
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
                show={alertAdded}
                showProgress={false}
                title="Already Added!"
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
    eventTabHeader: {
        flex: 1,
        minHeight: 50
    },
    userTabHeader: {
        flex: 1,
        minHeight: 50
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
        fontSize: 20,
        color: Colors.primary.red
    },
    expandButtonView: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 20,
        backgroundColor: Colors.primary.yellow
    }
});
export default ScheduleScreen;