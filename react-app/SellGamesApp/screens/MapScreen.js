import React, {useState} from 'react';
import { StyleSheet, ScrollView, Animated, Dimensions, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import MapMarker from '../components/MapMarker';
import OpenURLButton from '../components/OpenURLButton';

import Colors from '../constants/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const MapScreen = props => {
    const [events, setEvents] = useState([]);
    const [rendered, isRendered] = useState(false);
    const [progress, showProgress] = useState(false);

    async function getDataAsync() {
        showProgress(true);
        let eventArray;
        try {
            const response = await fetch("https://sellgames2020.fi/backend/api/events", {
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
                eventArray[i] = { id: ("" + json.data[i].id), title: ("" + json.data[i].venue.name) };                
            }
            console.log(eventArray);
            

        } catch (error) {
            console.log("Didnt work");
            
            eventArray = [{ id: "error", title: "Something went wrong :(", content: error.message }];
        }
        setEvents(eventArray);
        showProgress(false);
        
    };

    if(!rendered){
        isRendered(true);
        getDataAsync();
    }

    // not perfect, 2 scrollsviews allow both horizontal and vertical scrolling
    return (
        <ScrollView contentContainerStyle={styles.screen} horizontal={true}>
            <ScrollView contentContainerStyle={styles.inner}>
                <View style={styles.mapWrapper}>
                    <Animated.Image
                        source={require('../assets/map_yellow.png')}
                        style={styles.imageStyles} />
                </View>
            </ScrollView>
            <View style={styles.markerViewTEMP}><MapMarker width={0.3} height={0.3} /></View>
            <OpenURLButton url={"https://www.google.fi/maps/place/Mukkulankatu+19,+15210+Lahti/"} buttonText={"Open with Google Maps"}/>
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
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flexDirection: 'column',
        width: '100%'
    },
    inner: {
        width: screenWidth
    },
    markerViewTEMP: {
        height: 100,
        justifyContent: "center",
        alignContent: "center"
    },
    mapWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: (screenWidth * 0.05),
        backgroundColor: Colors.primary.yellow
    },
    imageStyles: {
        height: (1642 / 1345 * screenWidth), 
        width: (screenWidth * 0.9), 
        borderWidth: 2, 
        borderColor: Colors.primary.yellow
    }
});
export default MapScreen;