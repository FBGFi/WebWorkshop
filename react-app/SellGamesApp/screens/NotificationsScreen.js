import React, { useState } from 'react';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import Colors from '../constants/colors';

import Card from "../components/Card";

const NotificationsScreen = props => {
    const [events, setEvents] = useState([]);
    const [rendered, isRendered] = useState(false);
    const [progress, showProgress] = useState(false);

    async function getDataAsync() {
        showProgress(true);
        let eventArray;
        try {
            const response = await fetch("https://sellgames2020.fi/backend/api/posts", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            const json = await response.json();
            let length = Object.keys(json.data.data).length;
            let format = "";
            

            eventArray = new Array(length);


            for (let i = 0; i < length; i++) {
                // remove some excess linebreaks
                format = "" + json.data.data[i].post_content;
                format = format.replace("\n\n\n\n\n\n", "\n\n");
                format = format.replace("\n\n\n\n\n", "\n\n");
                format = format.replace("\n\n\n\n", "\n\n");
                format = format.replace("\n\n\n", "\n\n");

                eventArray[i] = { id: ("" + json.data.data[i].ID), title: ("" + json.data.data[i].post_title), content: format };
            }
            props.setEvents(eventArray);

        } catch (error) {
            eventArray = [{ id: "error", title: "Something went wrong :(", content: error.message }];
        }
        setEvents(eventArray);
        await sleep(500);
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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    return (
        <ScrollView contentContainerStyle={styles.screen} horizontal={true}>
            <ScrollView contentContainerStyle={styles.inner}>
                <FlatList keyExtractor={(item, index) => item.id}
                    data={events}
                    renderItem={itemData => <Card title={itemData.item.title} textContents={itemData.item.content} contentViewStyles={{marginTop: 0}} titleViewStyles={{borderBottomWidth: 2, borderColor: '#fff', paddingBottom: 5}} titleStyles={{fontSize: 25}} textContentStyles={{}}/>
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
