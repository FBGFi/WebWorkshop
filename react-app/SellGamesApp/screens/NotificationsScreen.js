import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import Card from "../components/Card";

const NotificationsScreen = props => {
    const [events, setEvents] = useState([]);
    const [rendered, isRendered] = useState(false);
    const [progress, showProgress] = useState(false);

    async function getDataAsync() {
        showProgress(true);
        let eventArray;
        try {
            const response = await fetch("http://35.217.19.28/sell-games-2020/public/index.php/api/events", {
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
                eventArray[i] = { id: ("" + json.data[i].id), title: ("" + json.data[i].name), location: ("" + json.data[i].venue.name) };
            }
            props.setEvents(eventArray);

        } catch (error) {
            eventArray = [{ id: "error", title: "Something went wrong :(", location: error.message }];
        }
        setEvents(eventArray);
        showProgress(false);
        
    };

    if(!rendered && props.events.length <= 0){
        isRendered(true);
        getDataAsync();
    }
    else if(!rendered && props.events.length > 0){ 
        isRendered(true);
        setEvents(props.events);
    }
    
    return (
        <ScrollView contentContainerStyle={styles.screen} horizontal={true}>
            <ScrollView contentContainerStyle={styles.inner}>
                <FlatList keyExtractor={(item, index) => item.id}
                    data={events}
                    renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.location} />
                    } />
                <AwesomeAlert 
                    show={progress}
                    showProgress={true}
                    title="Loading..."
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}/>
            </ScrollView>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flexDirection: 'row',
        width: '100%'
    },
    
    inner: {
        backgroundColor: Colors.primary.yellow,
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
});
export default NotificationsScreen;
