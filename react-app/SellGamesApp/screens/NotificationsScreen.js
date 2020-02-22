import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, Button} from 'react-native';

import Card from "../components/card";

const NotificationsScreen = props => {
    const [events, setEvents] = useState([]);
    async function getData() {
      const response = await fetch("http://35.217.19.28/sell-games-2020/public/index.php/api/events", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }   
                }); 
                console.log("lol");
            const json = await response.json();
            let length = Object.keys(json.data).length;
            let eventArray = [];
            console.log("lol" + length);
            for(let i = 0; i < length; i++)
            {
                eventArray += { id: "" + json.data[i].id, title: json.data[i].name, location: json.data[i].venue.name };      
            }
            setEvents(eventArray);
    };
    return (
        <View style={styles.screen}>
            <Text>Something</Text>
        <FlatList keyExtractor={(item, index) => item.id}
        data={events}
        renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.location} />
        } />
        <Button title="Get data" onPress={getData} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor: "red"
    }
});
export default NotificationsScreen;