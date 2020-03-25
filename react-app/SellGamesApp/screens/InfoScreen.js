import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';

import Colors from '../constants/colors';
import SportsInfo from '../constants/sportsInfo';

import Info from '../components/Info';
import StTransText from '../components/StTransText';

const ImageButton = props =>{ //Painike
    /*
        Painauksesta infoSetting on name ja sinfoSetting on sinfoname, jotka välitetään ylös InfoScreenin.
    */
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

const Buttons = props => {
    BackHandler.addEventListener('hardwareBackPress', () => {BackHandler.exitApp()}); // revert the back button functionality
    /*
    *    ImageButton: source on kuvan lähde, name on infon title, 
    *    sinfoname on SportsInfon lajin array, 
    *    info/sinfoSetting on ruudun muuttamista varten.
    */
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
    const [info, setinfo] = useState(null); //Minkä lajin info ruutu näytetään
    const [sinfo, setsinfo] = useState(null); //Minkä sportsinfo.js array näytetään (sinfo = sportinfo, Käyttö: SportsInfo.athletics)
    //setinfon/sinfon kulku ImageButton -> Buttons -> InfoScreen

    let content = <Buttons buttoninfo={setinfo} buttonsinfo={setsinfo}/>; //content on ensin painikkeet ruutu, joka muuttaa infon ja sinfon
    const infoscrollref = useRef(null); //Suora viittaus ScrollView, jotta ruutu on aina ylhäällä, kun painiketta painetaan. (Korjaus ongelmaan, jossa alemilla painikkeilla ruutu oli tekstin keskellä)
    try{
        infoscrollref.current.scrollTo({x: 0, y:0, animated:false}) 
    }catch(e){
        
    }
    if(info != null){ //Jos info on muutettu
        content = <Info title={info} infoSetting={setinfo} sportInfo={sinfo}/> //Painikkeet ruutu vaihtuu Info ruuduksi. Title on ruudun otsikko, infoSetting on ruudun muutamista takaisin painike ruutuun, sportInfo on syötetty lajin sportsInfo array.
        infoscrollref.current.scrollTo({x: 0, y:0, animated:false}) //Liikuttaa scrollviewn ylös ruudun muutoksen jälkeen.(animated: true ei jotenkin toiminut kaikilla painikkeilla, false toimii kaikilla joten false pysyy)
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