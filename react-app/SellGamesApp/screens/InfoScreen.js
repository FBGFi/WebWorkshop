import React, { useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors';
import Info from '../components/Info';
import SportsInfo from '../constants/sportsInfo'

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
            <Text style={{color:'white', 
            fontSize:27, 
            textDecorationLine:'underline'}}>{props.name}</Text>
        </TouchableOpacity>
    );
};
const Buttons = props => {
    return(
        <View style={styles.cont}>
            <ImageButton source={require('../assets/sports/athletics.png')} 
            name="Athletics" sinfoname={SportsInfo.athletics} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo}/>
            
            <ImageButton source={require('../assets/sports/basketball.png')} 
            name="Basketball" sinfoname={SportsInfo.basketball} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/discgolf.png')} 
            name="Disc Golf" sinfoname={SportsInfo.discgolf} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/esports.png')} 
            name="Esports" sinfoname={SportsInfo.esports} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/floorball.png')} 
            name="Floorball" sinfoname={SportsInfo.floorball} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/football.png')} 
            name="Football" sinfoname={SportsInfo.football} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/judo.png')} 
            name="Judo" sinfoname={SportsInfo.judo} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/molkky.png')} 
            name="Mölkky" sinfoname={SportsInfo.molkky} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/orienteering.png')} 
            name="Orienteering" sinfoname={SportsInfo.orienteering} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />
            
            <ImageButton source={require('../assets/sports/tabletennis.png')} 
            name="Tabletennis" sinfoname={SportsInfo.tabletennis} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />

            <ImageButton source={require('../assets/sports/volleyball.png')} 
            name="Volleyball" sinfoname={SportsInfo.volleyball} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />

            <ImageButton source={require('../assets/sports/wrestling.png')} 
            name="Wrestling" sinfoname={SportsInfo.wrestling} infoSetting={props.buttoninfo} sinfoSetting={props.buttonsinfo} />

        </View>
    );
};
const InfoScreen = props => {
    const [info, setinfo] = useState(null);
    const [sinfo, setsinfo] = useState(null);
    let content = <Buttons buttoninfo={setinfo} buttonsinfo={setsinfo}/>;
    const infoscrollref = useRef(null);
    if(info != null){
        content = <Info title={info} infoSetting={setinfo} sportInfo={sinfo}/>
        infoscrollref.current.scrollTo({x: 0, y:0, animated:true})
    }
    
    return (
        // Current footer setup does not work without ScrollView. Most likely it would've been used anyway
        <ScrollView style={{...props.style, ...styles.screen}} ref={infoscrollref}>
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
        marginBottom: 40,
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