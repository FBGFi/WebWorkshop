import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';

import Colors from '../constants/colors';
import SportsInfo from '../constants/sportsInfo';

import Info from '../components/Info';
import StTransText from '../components/StTransText';

/**
 * @author Simo - button with the sport image
 * @param infoSetting - statechanger to bring out Info about the sport
 * @param name - name of the sport 
 * @param sinfoSetting - statechanger for the array to be displayed in Info 
 * @param sinfoname - parameter from SportsInfo to be displayed (f.e SportsInfo.athletics)
 * @param source - require() with path to the image for button 
 */
const ImageButton = props =>{ 
    return(
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{  props.infoSetting(props.name)
                        props.sinfoSetting(props.sinfoname)}}>
            <Image
                style={styles.buttonimage}
                source={props.source}
            />
            <StTransText style={{color:'white', 
            fontSize:20, 
            textDecorationLine:'underline'}}>{props.name}</StTransText>
        </TouchableOpacity>
    );
};

/**
 * @author Simo - container for all Buttons
 * @param buttoninfo - statechanger for the info to be brought
 * @param buttonsinfo - statechanger for the array to be brought from SportsInfo
 */
const Buttons = props => {
    BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // revert the back button functionality
    return(
        <View style={styles.cont}>
            <ImageButton source={require('../assets/sports/athletics.png')} 
            name="Athletics" sinfoname={SportsInfo.athletics} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo}/>
            
            <ImageButton source={require('../assets/sports/basketball.png')} 
            name="Basketball" sinfoname={SportsInfo.basketball} infoSetting={props.buttoninfo} 
            sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/discgolf.png')} 
            name="Disc Golf" sinfoname={SportsInfo.discgolf}
             infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/esports.png')} 
            name="Esports" sinfoname={SportsInfo.esports} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/floorball.png')} 
            name="Floorball" sinfoname={SportsInfo.floorball} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/football.png')} 
            name="Football" sinfoname={SportsInfo.football} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/judo.png')} 
            name="Judo" sinfoname={SportsInfo.judo} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/molkky.png')} 
            name="Mölkky" sinfoname={SportsInfo.molkky} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/orienteering.png')} 
            name="Orienteering" sinfoname={SportsInfo.orienteering} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/tabletennis.png')} 
            name="Tabletennis" sinfoname={SportsInfo.tabletennis} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />

            <ImageButton source={require('../assets/sports/volleyball.png')} 
            name="Volleyball" sinfoname={SportsInfo.volleyball} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />

            <ImageButton source={require('../assets/sports/wrestling.png')} 
            name="Wrestling" sinfoname={SportsInfo.wrestling} 
            infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />

        </View>
    );
};

const InfoScreen = props => {
    // which sports Info to be displayed
    const [info, setinfo] = useState(null);
    // which array from sportsInfo.js to be displayed
    const [sinfo, setsinfo] = useState(null);
    //setinfo/sinfo routing ImageButton -> Buttons -> InfoScreen

    // initial value
    let content = <Buttons buttoninfo={setinfo} buttonsinfo={setsinfo}/>;
    // scrolls to top when button pressed (Fixed a problem where lower buttons text was at middle of screen)
    const infoscrollref = useRef(null);
    try{
        infoscrollref.current.scrollTo({x: 0, y:0, animated:false}) 
    }catch(e){
        
    }
    // if info changed
    if(info != null){
        // Changes content from Buttons to Info
        content = <Info title={info} infoSetting={setinfo} sportInfo={sinfo}/>
        // Scrolls the ScrollView to top after changes.(animated: true didnt somehow work with all of the buttons, false did)
        infoscrollref.current.scrollTo({x: 0, y:0, animated:false}) 
    }
    
    return (
        // Current footer setup does not work without ScrollView  
        <ScrollView style={{...props.style, ...styles.screen}} contentContainerStyle={{paddingVertical: 10}} ref={infoscrollref}>
            {content}
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
       backgroundColor: Colors.primary.blue,
       width:'100%'
    },
    cont: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    button:{
        width: 150,
        height:150,
        margin: 10,
        marginBottom: 25,
        alignItems:'center'
    },
    buttonimage:{
        width:'100%',
        height:'100%'
    },
    infoPage:{
        width:'100%',
        alignItems: 'center'
    }
});

export default InfoScreen;