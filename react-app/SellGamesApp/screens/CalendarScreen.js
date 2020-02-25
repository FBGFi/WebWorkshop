import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

import Card from "../components/Card";
import { render } from 'react-dom';

const CalendarScreen = props => {
    const [events, setEvents] = useState([]);
    const [rendered, isRendered] = useState(false);

    async function getDataAsync() {
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
                
                eventArray[i] = { 
                    id: ("" + json.data[i].id), 
                    title: ("" + json.data[i].name), 
                    time: ("" + json.data[i].start_time + " - " + json.data[i].end_time), 
                    date: ("" + json.data[i].date) 
                };
            }
            props.setEvents(eventArray);

        } catch (error) {
            eventArray = [{ id: "error", title: "Something went wrong :(", time: error.message }];
        }
        setEvents(eventArray);
        
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
            <FlatList keyExtractor={(item, index) => item.id}
                data={events}
                renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.time + "\n" + itemData.item.date} />
                } />
    );

}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "red"
    }
});
export default CalendarScreen;