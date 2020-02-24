import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, Button} from 'react-native';

import Card from "../components/Card";

const NotificationsScreen = props => {
    //const [events, setEvents] = useState([]);
    let events;
    
    async function getDataAsync() {
        //let eventArray;
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
            
            let events = new Array(length);
            
            
            for(let i = 0; i < length; i++)
            {
                events[i] = {id: ("" + json.data[i].id), title: ("" + json.data[i].name), location: ("" + json.data[i].venue.name) };                     
            }
            
        } catch (error) {
            events = [{id: "error", title: "Something went wrong :(", location: error.message}];
        }
            
    };
   
    getDataAsync();

    for(let i = 0; i < 5; i++)
    {
        console.log(events);
        
        setTimeout(function(){
        }, 1000);
    }   
    
    return (
        <View style={styles.screen}>
            <Text>Something</Text>
        <FlatList keyExtractor={(item, index) => item.id}
        data={events}
        renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.location} />
        } />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor: "red"
    }
});
export default NotificationsScreen;