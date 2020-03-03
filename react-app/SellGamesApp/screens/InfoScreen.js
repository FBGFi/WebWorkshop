import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';

import Cardbox from '../components/Card';
import Events from '../data/events';

import Colors from '../constants/colors';



const ImageButton = props =>{
    return(
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{props.infoSetting(props.name)}}>
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
            <ImageButton source={require('../assets/sports/athletics.png')} name="Athletics" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/basketball.png')} name="Basketball" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/discgolf.png')} name="Disc Golf" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/esports.png')} name="Esports" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/floorball.png')} name="Floorball" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/football.png')} name="Football" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/judo.png')} name="Judo" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/molkky.png')} name="Mölkky" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/orienteering.png')} name="Orienteering" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/tabletennis.png')} name="Tabletennis" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/volleyball.png')} name="Volleyball" infoSetting={props.buttoninfo} />
            <ImageButton source={require('../assets/sports/wrestling.png')} name="Wrestling" infoSetting={props.buttoninfo} />
        </View>
    );
};
const Info = props => {
    return(
        <View style={styles.infoPage}>
            <Text style={{color: Colors.primary.yellow, fontSize: 30}}>{props.title}</Text>
            <Button title="Return" 
            color={Colors.primary.red}
            onPress={() => props.infoSetting(null)}/>
        </View>
    );
};
const InfoScreen = props => {
    const [info, setinfo] = useState(null);

    let content = <Buttons buttoninfo={setinfo}/>;

    if(info != null){
        content = <Info title={info} infoSetting={setinfo}/>
    }

    return (
        // Current footer setup does not work without ScrollView. Most likely it would've been used anyway
        <ScrollView style={{...props.style, ...styles.screen}}>
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