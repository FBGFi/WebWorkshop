import React, {useState, useRef} from 'react';
import { StyleSheet, ScrollView, Animated, View, TouchableOpacity, Image } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import MapMarker from '../components/MapMarker';
import OpenURLButton from '../components/OpenURLButton';
import Info from '../components/Info';
import StTransText from '../components/StTransText';

import Colors from '../constants/colors';
import CommonConstants from '../constants/commonConstants';
const Constants = new CommonConstants();

import MapMarkerData from '../data/mapMarkerData';
import sportsInfo from '../data/sportsInfo';

class States {
    constructor(){
        this.mapOffsetTop = 0;
        // save the old offset to this when event pressed
        this.eventOffSetTop = 0;
        this.scrollable = true;
        this.resetMapContainerHeight(); 
    }
    setMapOffsetTop(val){
        this.mapOffsetTop = val;
    }
    setEventOffsetTop(val){
        this.eventOffSetTop = val;
    }
    setMapContainerHeight(val){
        if(val > this.mapContainerHeight)
        {
            this.mapContainerHeight += val - this.mapContainerHeight;
        }       
    }
    resetMapContainerHeight(){
        this.mapContainerHeight = Constants.deviceDimensions.screenWidth * (Constants.mapCalculations.mapHeight/Constants.mapCalculations.mapWidth);
    }
    isScrollable(val){
        this.scrollable = val;
    }
}
const states = new States();



/**
 * @author Aleksi - the card containing list of locations events
 * @param content - data to make the list from
 * @param cancelPress - function to close the card
 * @param eventPress - what happens when you click an event
 * @param offSetTop - how far from top of the screen to set the card
 * @param markerData - object from mapMarkerData.js
 * @param mapViewRef - useRef to set map back to position
 */
const MapCard = props => { 
    let cardContent;
    
    if(props.markerData.hasEvents){
        cardContent = (<ScrollView>
                        {props.content.map((item) => (
                            <View key={item.id} style={styles.eventButton}>
                                <View style={{backgroundColor: Colors.primary.red, borderRadius: 8}}>
                                    <TouchableOpacity onPress={() => props.eventPress(item)}>
                                        <View style={{padding:10}}>
                                            <View style={{paddingBottom:5}}><StTransText style={{color: Colors.primary.yellow, fontSize:20}}>{item.title}</StTransText></View>
                                            <View style={{paddingBottom:5}}><StTransText style={{color: Colors.primary.yellow, fontSize:18}}>{item.date}</StTransText></View>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{flex:3}}><StTransText style={{color: Colors.primary.yellow, fontSize:18}}>{item.time}</StTransText></View>
                                                <View style={{flex:1, justifyContent: "center"}}><StTransText style={{color: Colors.primary.yellow, fontSize:30, textAlign:'right', alignSelf: 'flex-end'}}>+</StTransText></View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>);
    } else {
        cardContent = (<View style={{backgroundColor: Colors.primary.red, marginHorizontal: 10, borderRadius: 10}}>
                            <StTransText style={{textAlign: 'center', fontSize: 20, color: Colors.primary.yellow, padding: 5}}>{props.markerData.information}</StTransText>
                        </View>);
    } 
    return(
            <View style={{...styles.mapCard, ...{marginTop: (Constants.deviceDimensions.screenHeight * 0.05) + props.offSetTop}}}>

                <View style={{paddingBottom:10}}>

                    <View style={{paddingLeft:10,paddingTop:10}}>
                        <TouchableOpacity onPress={props.cancelPress}>
                            <Image source={require('../assets/icons/Union2.png')} style={{width: 30, height: 30}}/>
                        </TouchableOpacity>
                    </View>

                    <StTransText style={{color: Colors.primary.red, textAlign: "center", fontSize:20}}>
                        {props.markerData.address}
                    </StTransText>

                </View>
         
                {cardContent}
                <View>
                    <OpenURLButton url={props.markerData.url} buttonText={"Open with Google Maps"} textStyles={{color: Colors.primary.yellow, fontSize:20}} buttonStyles={{width:'70%'}}/>
                </View>
            </View>
    );
}

/**
 * @param sportInfoKey - key for the JS object sportsInfo.js
 * @param setEventContent - function for returning
 * @param event - event object to display
 */
const EventInfo = props => {
    const [alert, showAlert] = useState(false);
    const [alertAdded, showAlertAdded] = useState(false);

    async function saveToSchedules(event){
        let wasAdded = await Constants.checkUserData(event);
        states.isScrollable(false);
        // wasn't previously added
        if(wasAdded){     
            showAlert(true);   
            await Constants.sleep(1000);
            showAlert(false);           
        } else {
            showAlertAdded(true);
            await Constants.sleep(1000);
            showAlertAdded(false);
        }    
        await Constants.sleep(100);
        states.isScrollable(true); 
    }

    return (<View onLayout={(e) => states.setMapContainerHeight(e.nativeEvent.layout.height)} style={styles.info} key="eventContent">
                <Info titleStyle={{marginTop: 10}} title={sportsInfo[props.sportInfoKey].title} sportInfo={sportsInfo[props.sportInfoKey].data} infoSetting={props.setEventContent} setToCalendarButton={true} setToCalendar={saveToSchedules} eventInfo={props.event}/>
                <View style={{position: "absolute", width: Constants.deviceDimensions.screenWidth, height: Constants.deviceDimensions.screenHeight, marginTop: states.mapOffsetTop}} key="addedAlertView">
                        <AwesomeAlert
                        show={alert}
                        showProgress={false}
                        title="Added!"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={false}
                        />
                </View>
                <View style={{position: "absolute", width: Constants.deviceDimensions.screenWidth, height: Constants.deviceDimensions.screenHeight, marginTop: states.mapOffsetTop}} key="notAddedAlertView">
                        <AwesomeAlert
                        show={alertAdded}
                        showProgress={false}
                        title="Already Added!"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={false}
                        />
                </View>
            </View>);
}

/**
 * @author Aleksi - screen containing interactive map of the eventarea
 */
const MapScreen = props => {
    const [cardContent, setCardContent] = useState(undefined);
    const [eventContent, setEventContent] = useState(null);
    const [rendered, isRendered] = useState(false);
    const [progress, showProgress] = useState(false);
    const [containerHeight, setContainerHeight] = useState(states.mapContainerHeight);

    const mapViewRef = useRef(null);

    if(!rendered){
        isRendered(true);
        states.isScrollable(true);
        states.setEventOffsetTop(0);
        states.setMapOffsetTop(0);
        states.resetMapContainerHeight();
        setContainerHeight(states.mapContainerHeight);
    }

    /**
     * @author Aleksi - function to open the locations event table
     * @param address - address of the location
     * @param url - url to Google Maps
     * @param fetchString - location name to pull data from API with
     * @param hasEvents - if theres events to fetch
     */
    async function markerPress(markerData){
        setCardContent(undefined);
        let events;
        states.isScrollable(false);
        showProgress(true);
        if(markerData.hasEvents){
            events = await getDataAsync(markerData.fetchString);
        }
        await Constants.sleep(500);           
        setCardContent(<MapCard mapViewRef={mapViewRef} markerData={markerData} content={events} cancelPress={cancelPress} eventPress={eventPress} offSetTop={states.mapOffsetTop}/>);        
        showProgress(false);  
    }

    async function cancelPress(){  
        states.isScrollable(true);  
        setCardContent(undefined);     
    }

    /**
     * @author Aleksi - function to open info about the pressed event
     * @param event - object of the event
     */
    async function eventPress(event){
        let keys = Object.keys(sportsInfo);
        let sportInfoKey = "default";      

        // last key is default key, we dont need to check that
        for (let i = 0; i < keys.length - 1; i++) {  
            if(sportsInfo[keys[i]].sportVenueTitles.includes(event.title)){
                sportInfoKey = keys[i];              
                break;
            }     
        }
        states.setEventOffsetTop(states.mapOffsetTop);
        states.setMapOffsetTop(0);
        states.isScrollable(true);
        setEventContent(<EventInfo sportInfoKey={sportInfoKey} setEventContent={closeEventContent} event={event} />);
        await Constants.sleep(100);
        mapViewRef.current.scrollTo({x: 0, y: 0, animated: false});   
        await Constants.sleep(500);   
        setContainerHeight(states.mapContainerHeight);
    }
    async function closeEventContent(value = null){
        states.isScrollable(false);
        states.setMapOffsetTop(states.eventOffSetTop); 
        states.resetMapContainerHeight();       
        mapViewRef.current.scrollTo({x: 0, y: states.eventOffSetTop, animated: false});
        setEventContent(value);
        setContainerHeight(states.mapContainerHeight);
    }

    /**
     * @author Aleksi - scrolling sets the position of the scrollview from top
     * @param e - scrollview event(comes automatically) 
     */
    function setOffSet(e){         
        states.setMapOffsetTop(e.nativeEvent.contentOffset.y);
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
                    time: ("" + startTimeFix + " - " + endTimeFix),
                    venue: ("" + json.data[i].venue.name + "\n" + json.data[i].venue.address + ", " + json.data[i].venue.postcode + " Lahti")};                
            }
            

        } catch (error) {
            console.log(error);
            
            eventArray = [{ id: "error", title: "Something went wrong :(", date: error.message, time: "" }];
        }
        return eventArray;        
        
    };

    return (       
        <ScrollView contentContainerStyle={{...styles.screen, ...{height: containerHeight}}} scrollEnabled={states.scrollable} onScroll={setOffSet} ref={mapViewRef}>
            <View style={{width: Constants.deviceDimensions.screenWidth}} key="mapView">
                <View style={styles.mapWrapper}>
                    <Animated.Image
                        source={require('../assets/map_yellow.png')}
                        style={styles.mapImageStyles} />
                </View>
            </View>

            {cardContent}

            {
                MapMarkerData.markerInfo.map((item) => (
                    <MapMarker 
                        key={item.address}
                        dimensions={Constants.mapCalculations.mapMarkerRatio(MapMarkerData.dimensions)}
                        markerData={item}
                        markerPress={markerPress}
                    />
                ))
            }
            
            {eventContent}        

            <View style={{position: "absolute", width: Constants.deviceDimensions.screenWidth, height: Constants.deviceDimensions.screenHeight, marginTop: states.mapOffsetTop}} key="alertView">
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
        position: 'absolute',
        top: 0,
        zIndex: 3,
        backgroundColor: Colors.primary.blue,
        width: "100%",
        paddingHorizontal: 15,
        minHeight: states.mapContainerHeight 
    }
});
export default MapScreen;