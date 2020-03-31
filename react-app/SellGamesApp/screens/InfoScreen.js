import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, BackHandler } from 'react-native';

import Colors from '../constants/colors';
import SportsInfo from '../data/sportsInfo';
import InfoButtonData from '../data/infoButtonData'

import Info from '../components/Info';
import StTransText from '../components/StTransText';
import ImageButton from '../components/ImageButton';

/**
 * @author Simo - container for all Buttons
 * @param buttoninfo - statechanger for the info to be brought
 * @param buttonsinfo - statechanger for the array to be brought from SportsInfo
 */
const Buttons = props => {
    BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // revert the back button functionality
    return(
        <View style={styles.cont}>
            {
                InfoButtonData.buttonInfo.map((item)=>(              
                    <ImageButton
                        source={item.imagesrc} 
                        name={item.name}
                        sinfoname={item.sinfoname} 
                        infoSetting={props.buttoninfo} 
                        sinfoSetting={props.buttonsinfo} 
                    />
                ))
            }
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
        // Scrolls the ScrollView to top after changes.(animated: true didnt somehow work with all of the buttons, false does)
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