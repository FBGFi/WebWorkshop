import React, {useState} from 'react';
import { StyleSheet, ScrollView, Animated, View, TouchableOpacity, Image } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import MapMarker from '../components/MapMarker';
import OpenURLButton from '../components/OpenURLButton';
import Info from '../components/Info';
import StTransText from '../components/StTransText';

import Colors from '../constants/colors';
import sportsInfo from '../constants/sportsInfo';
import CommonConstants from '../constants/commonConstants';
const Constants = new CommonConstants();

/**
 * @author Aleksi - the card containing list of locations events
 * @param content - data to make the list from
 * @param cancelPress - function to close the card
 * @param address - address for the location
 * @param eventPress - what happens when you click an event
 * @param url - URL address to Google Maps with this location
 * @param offSetTop - how far from top of the screen to set the card
 */
const MapCard = props => {
    return(
            <View style={{...styles.mapCard, ...{marginTop: (Constants.deviceDimensions.screenHeight * 0.05) + props.offSetTop}}}>

                <View style={{paddingBottom:10}}>

                    <View style={{paddingLeft:10,paddingTop:10}}>
                        <TouchableOpacity onPress={props.cancelPress}>
                            <Image source={require('../assets/icons/Union2.png')} style={{width: 30, height: 30}}/>
                        </TouchableOpacity>
                    </View>

                    <StTransText style={{color: Colors.primary.red, textAlign: "center", fontSize:20}}>
                        {props.address}
                    </StTransText>

                </View>
         
                <ScrollView>
                    {props.content.map((item) => (
                        <View key={item.id} style={styles.eventButton}>
                            <View style={{backgroundColor: Colors.primary.red, borderRadius: 8}}>
                                <TouchableOpacity onPress={() => props.eventPress(item.title)}>
                                    <View style={{padding:10}}>
                                        <View style={{paddingBottom:5}}><StTransText style={{color: Colors.primary.yellow, fontSize:20}}>{item.title}</StTransText></View>
                                        <View style={{paddingBottom:5}}><StTransText style={{color: Colors.primary.yellow, fontSize:18}}>{item.date}</StTransText></View>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex:3}}><StTransText style={{color: Colors.primary.yellow, fontSize:18}}>{item.time}</StTransText></View>
                                            <View style={{flex:1, justifyContent: "center"}}><StTransText style={{color: Colors.primary.yellow, fontSize:20, textAlign:'right', alignSelf: 'flex-end'}}>+</StTransText></View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View>
                    <OpenURLButton url={props.url} buttonText={"Open with Google Maps"} textStyles={{color: Colors.primary.yellow, fontSize:20}} buttonStyles={{width:'70%'}}/>         
                </View>
            </View>
    );
}

/**
 * @author Aleksi - screen containing interactive map of the eventarea
 */
const MapScreen = props => {
    const [events, setEvents] = useState([]);
    const [progress, showProgress] = useState(false);
    const [cardContent, setCardContent] = useState(undefined);
    const [eventContent, setEventContent] = useState(undefined);
    const [rendered, isRendered] = useState(false);
    const [address, setAddress] = useState("");
    const [url, setUrl] = useState("");
    // lock scrolling when marker is pressed
    const [scrollable, isScrollable] = useState(true);
    // how far is the card from top of screen
    const [yOffset, setyOffset] = useState(0);

    // changes every time user scrolls the map
    let currentOffset = 0;
    
    /**
     * @author Aleksi - function to open the locations event table
     * @param address - address of the location
     * @param url - url to Google Maps
     * @param fetchString - location name to pull data from API with
     */
    async function markerPress(place, url, fetchString){
        setyOffset(currentOffset);
        isScrollable(false);
        showProgress(true);
        setAddress(place);
        setUrl(url)
        await getDataAsync(fetchString);
        await Constants.sleep(50);        
        showProgress(false);    
    }

    function cancelPress(){
        isScrollable(true);
        setCardContent(undefined);
        setEvents([]);
        isRendered(false);
    }

    /**
     * @author Aleksi - function to open info about the pressed event
     * @param eventName - name of the event to send to infoscreen
     */
    function eventPress(eventName){
        setEventContent(<View style={styles.info} key="eventContent"><ScrollView scrollEnabled={true} contentContainerStyle={{paddingBottom: 300}}><Info sportInfo={sportsInfo.athletics} infoSetting={setEventContent}/></ScrollView></View>);
        
    }
    
    /**
     * @author Aleksi - scrolling sets the position of the scrollview from top
     * @param e - scrollview event(comes automatically) 
     */
    function setOffSet(e){
        currentOffset = e.nativeEvent.contentOffset.y;        
    }

    // if data has been fetched and set to events, set content. not before
    if(events.length > 0 && !rendered){
        setCardContent(<MapCard content={events} cancelPress={cancelPress} address={address} eventPress={eventPress} url={url} offSetTop={yOffset}/>);
        isRendered(true);
    }
    
    /**
     * @author Aleksi - function that sets eventarray to events
     * @param fetchString - name of the location to fetch from API
     */
    async function getDataAsync(fetchString) {
        let eventArray;
        try {
            const response = await Constants.fetchFromAPI("events/venue/name/" + fetchString);            
            const json = await response.json();
            let length = Object.keys(json.data).length;
            
            // formatting for the texts
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
                
                eventArray[i] = { 
                    id: ("" + json.data[i].id), 
                    title: ("" + json.data[i].name), 
                    date: ("May " + dateFix[2] + "th, 2020"), 
                    time: ("" + startTimeFix + " - " + endTimeFix) };                
            }
            

        } catch (error) {
            console.log(error);
            
            eventArray = [{ id: "error", title: "Something went wrong :(", date: error.message, time: "" }];
        }
        setEvents(eventArray);
        
    };

    return (       
        <ScrollView contentContainerStyle={styles.screen} scrollEnabled={scrollable} onScroll={setOffSet}>
            <View style={{width: Constants.deviceDimensions.screenWidth}} key="mapView">
                <View style={styles.mapWrapper}>
                    <Animated.Image
                        source={require('../assets/map_yellow.png')}
                        style={styles.mapImageStyles} />
                </View>
            </View>

            {cardContent}

                <MapMarker 
                dimensions={0.2} 
                address={"Athletics stadium\nSalpausselänkatu 8, 15110 Lahti"} 
                url={"https://www.google.com/maps/place/Salpaussel%C3%A4nkatu+8,+15110+Lahti/"} 
                fetchString={"Athletics stadium"}
                left={330}
                top={3220}
                markerPress={markerPress}/>
                <MapMarker 
                dimensions={0.2} 
                address={"Kamppailuareena\nSuurmäenkatu 4, 15900 Lahti"} 
                url={"https://www.google.com/maps/place/Suurm%C3%A4enkatu+4,+15900+Lahti/"} 
                fetchString={"Kamppailuareena"}
                left={30}
                top={3320}
                markerPress={markerPress}/>
                <MapMarker 
                dimensions={0.2} 
                address={"Kisapuisto Sports Park\nLahdenkatu, 15140 Lahti"} 
                url={"https://www.google.com/maps/place/Lahden+kisapuisto/@60.9873748,25.6470154,17z/data=!3m1!4b1!4m5!3m4!1s0x468e28550c22a22b:0xcc05c97e8dc88115!8m2!3d60.9873722!4d25.6492041"} 
                fetchString={"Kisapuisto Sports Park"}
                left={1100}
                top={2850}
                markerPress={markerPress}/>
                <MapMarker 
                dimensions={0.2} 
                address={"Suurhalli Sports Hall\nSalpausselänkatu 7, 15110 Lahti"} 
                url={"https://www.google.com/maps/place/Salpaussel%C3%A4nkatu+7,+15110+Lahti/"} 
                fetchString={"Suurhalli Sports Hall"}
                left={520}
                top={3000}
                markerPress={markerPress}/>
                <MapMarker 
                dimensions={0.2} 
                address={"Mukkula DiscGolfPark\nTuhtokatu 2, 15240 Lahti"} 
                url={"https://www.google.com/maps/place/Tuhtokatu+2,+15240+Lahti/"} 
                fetchString={"Mukkula DiscGolfPark"}
                left={2200}
                top={400}
                markerPress={markerPress}/>

                {eventContent}
            

            <View style={{position: "absolute", width: Constants.deviceDimensions.screenWidth, height: Constants.deviceDimensions.screenHeight, marginTop: yOffset}} key="alertView">
                <AwesomeAlert 
                    show={progress}
                    showProgress={true}
                    title="Loading..."
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flexDirection: 'column',
        width: '100%'
    },
    mapWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    mapImageStyles: { 
        height: Constants.deviceDimensions.screenWidth * (Constants.mapCalculations.mapHeight/Constants.mapCalculations.mapWidth),
        width: Constants.deviceDimensions.screenWidth,
        resizeMode: "contain"
    },
    mapCard:{
        borderWidth: 2,
        borderColor: Colors.primary.red,
        maxHeight: (Constants.deviceDimensions.screenHeight * 0.8),
        backgroundColor: Colors.primary.yellow, 
        zIndex: 2,
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 8,
        position: 'absolute', 
        marginBottom: '5%'
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