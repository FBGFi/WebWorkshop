import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import Card from "../components/Card";

import Colors from "../constants/colors";

const CalendarScreen = props => {
    const [fridayContent, setFridayContent] = useState([]);
    const [saturdayContent, setSaturdayContent] = useState([]);
    const [sundayContent, setSundayContent] = useState([]);

    const [fridayButton, setFridayButton] = useState('+');
    const [saturdayButton, setSaturdayButton] = useState('+');
    const [sundayButton, setSundayButton] = useState('+');

    const [eventTabBckgrnd, setEventTabBckgrnd] = useState(Colors.primary.white);
    const [userTabBckgrnd, setUserTabBckgrnd] = useState('#ccc');

    const [calendarDisplay, setCalendarDisplay] = useState('flex');
    const [userDisplay, setUserDisplay] = useState('none');

    async function getDataAsync(date, contentToSet) {
        let eventArray;
        try {
            const response = await fetch("http://35.217.19.28/sell-games-2020/public/index.php/api/events/date/2020-05-" + date, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            const json = await response.json();
            let length = Object.keys(json.data).length;

            eventArray = new Array(length);


            for (let i = 0; i < length; i++) {
                
                eventArray[i] = { 
                    id: ("" + json.data[i].id), 
                    title: ("" + json.data[i].name), 
                    time: ("" + json.data[i].start_time + " - " + json.data[i].end_time)
                };
            }

        } catch (error) {
            eventArray = [{ id: "error", title: "Something went wrong :(", time: error.message }];
        }
        contentToSet(eventArray);
        
    };

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

    function changeTabs(highLight, fadeOut, displayContent, hideContent){
        highLight(Colors.primary.white);
        fadeOut('#ccc');
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
                <SafeAreaView style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <Text style={styles.textStyle}>Friday May 15th</Text>
                        <TouchableOpacity style={styles.buttonView} onPress={() => showContent(fridayContent, setFridayContent, setFridayButton, 15)}>
                            <Text style={styles.textStyle}>{fridayButton}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList horizontal keyExtractor={(item, index) => item.id}
                    data={fridayContent}
                    renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.time} />
                    } />

                </SafeAreaView>

                <SafeAreaView style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <Text style={styles.textStyle}>Saturday May 16th</Text>
                        <TouchableOpacity style={styles.buttonView} onPress={() => showContent(saturdayContent, setSaturdayContent, setSaturdayButton, 16)}>
                            <Text style={styles.textStyle}>{saturdayButton}</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList horizontal keyExtractor={(item, index) => item.id}
                    data={saturdayContent}
                    renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.time} />
                    } />

                </SafeAreaView>

                <SafeAreaView style={styles.wrapperView}>
                    <View style={styles.headerView}>
                        <Text style={styles.textStyle}>Sunday May 17th</Text>
                        <TouchableOpacity style={styles.buttonView} onPress={() => showContent(sundayContent, setSundayContent, setSundayButton, 17)}>
                            <Text style={styles.textStyle}>{sundayButton}</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList horizontal keyExtractor={(item, index) => item.id}
                    data={sundayContent}
                    renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.time} />
                    } />

                </SafeAreaView>
            </View>

            <View style={{...{display: userDisplay}, ...styles.userScheduleView}}>
                    <Button title="lol" />
            </View>

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
        backgroundColor: Colors.primary.white,
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