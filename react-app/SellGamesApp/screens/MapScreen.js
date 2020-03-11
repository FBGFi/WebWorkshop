import React, {useState} from 'react';
import { StyleSheet, ScrollView, Animated, Dimensions, View, TouchableOpacity, Text, FlatList } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import MapMarker from '../components/MapMarker';
import OpenURLButton from '../components/OpenURLButton';
import Info from '../components/Info';

import Colors from '../constants/colors';
import sportsInfo from '../constants/sportsInfo';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * @param content - data to make the list from
 * @param cancelPress - function to close the card
 * @param place - address for the location
 * @param eventPress - what happens when you click an event
 * @param url - URL address to Google Maps with this location
 */
const MapCard = props => {
    return(
            <View style={styles.mapCard}>
                <View style={{paddingBottom:10}}>
                    <View style={{paddingLeft:10,paddingTop:10}}>
                        <TouchableOpacity onPress={props.cancelPress}>
                            <Text style={{color: Colors.primary.red, fontSize:20}}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color: Colors.primary.red, textAlign: "center", fontSize:20}}>
                        {props.place}
                    </Text>
                </View>
                <FlatList keyExtractor={(item, index) => item.id}
                            data={props.content}
                            renderItem={itemData => 
                                <View style={styles.eventButton}>
                                    <View style={{backgroundColor: Colors.primary.red, borderRadius: 8}}>
                                        <TouchableOpacity onPress={() => props.eventPress(itemData.item.title)}>
                                            <View style={{padding:10}}>
                                                <View style={{paddingBottom:5}}><Text style={{color: Colors.primary.yellow, fontSize:20, fontWeight: "bold"}}>{itemData.item.title}</Text></View>
                                                <View style={{paddingBottom:5}}><Text style={{color: Colors.primary.yellow, fontSize:18}}>{itemData.item.date}</Text></View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <View style={{flex:3}}><Text style={{color: Colors.primary.yellow, fontSize:18}}>{itemData.item.time}</Text></View>
                                                    <View style={{flex:1, justifyContent: "center"}}><Text style={{color: Colors.primary.yellow, fontSize:20, textAlign:'right', alignSelf: 'flex-end'}}>+</Text></View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            } />
                <View>
                    <OpenURLButton url={props.url} buttonText={"Open with Google Maps"} textStyles={{color: Colors.primary.yellow, fontSize:20}} buttonStyles={{width:'70%'}}/>         
                </View>
            </View>
    );
}

const MapScreen = props => {
    const [events, setEvents] = useState([]);
    const [progress, showProgress] = useState(false);
    const [cardContent, setCardContent] = useState(undefined);
    const [eventContent, setEventContent] = useState(undefined);
    const [rendered, isRendered] = useState(false);
    const [place, setPlace] = useState("");
    const [url, setUrl] = useState("");

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function markerPress(place, url, fetchString){
        showProgress(true);
        setPlace(place);
        setUrl(url)
        await getDataAsync(fetchString);
        await sleep(500);        
        showProgress(false);     
    }

    function cancelPress(){
        setCardContent(undefined);
        setEvents([]);
        isRendered(false);
    }

    function eventPress(eventName){
        setEventContent(<View style={styles.info}><ScrollView contentContainerStyle={{paddingBottom: 60}}><Info sportInfo={sportsInfo.athletics} infoSetting={setEventContent}/></ScrollView></View>);
        
    }
    

    if(events.length > 0 && !rendered){
        setCardContent(<MapCard content={events} cancelPress={cancelPress} place={place} eventPress={eventPress} url={url}/>);
        isRendered(true);
    }

    async function getDataAsync(place) {
        let eventArray;
        try {
            const response = await fetch(("https://sellgames2020.fi/backend/api/events/venue/name/" + place), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            
            const json = await response.json();
            let length = Object.keys(json.data).length;
            let dateFix = "";
            let startTimeFix = "";
            let endTimeFix = "";
            
            
            eventArray = new Array(length);


            for (let i = 0; i < length; i++) {
                dateFix = json.data[i].date.split('-');
                startTimeFix = json.data[i].start_time.split(':');
                startTimeFix = startTimeFix[0] + "." + startTimeFix[1];
                endTimeFix = json.data[i].end_time.split(':');
                endTimeFix = endTimeFix[0] + "." + endTimeFix[1];
                
                eventArray[i] = { id: ("" + json.data[i].id), title: ("" + json.data[i].name), date: ("May " + dateFix[2] + "th, 2020"), time: ("" + startTimeFix + " - " + endTimeFix) };                
            }
            

        } catch (error) {
            console.log(error);
            
            eventArray = [{ id: "error", title: "Something went wrong :(", date: error.message, time: "" }];
        }
        setEvents(eventArray);
        
    };

    return (       
        <ScrollView contentContainerStyle={styles.screen} scrollEnabled={false}>
            <View style={styles.inner}>
                <View style={styles.mapWrapper}>
                    <Animated.Image
                        source={require('../assets/map_yellow.png')}
                        style={styles.imageStyles} />
                </View>
            </View>

            {cardContent}

                <MapMarker dimensions={0.2} place={"Athletics stadium\nSalpausselänkatu 8, 15110 Lahti"} url={"https://www.google.com/maps/place/Salpaussel%C3%A4nkatu+8,+15110+Lahti/"} fetchString={"Athletics stadium"}markerPress={markerPress}/>
                {eventContent}
            

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
        width: screenWidth,
        //height: /*(1642 / 1345 * screenWidth)*/screenHeight - 60,
    },
    mapWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    imageStyles: { 
        height: screenHeight - 60,
        width: screenWidth,
        resizeMode: "contain"
    },
    mapCard:{
        borderWidth: 2,
        borderColor: Colors.primary.red,
        marginTop: (screenWidth * 0.05),
        maxHeight: (screenHeight * 0.8),
        backgroundColor: Colors.primary.yellow, 
        zIndex: 2,
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 8,
        position: 'absolute'
    },
    eventButton:{
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    info: {
        position: "absolute",
        top: 0,
        zIndex: 3,
        backgroundColor: Colors.primary.blue,
        width: "100%",
        height: "100%"
    }
});
export default MapScreen;