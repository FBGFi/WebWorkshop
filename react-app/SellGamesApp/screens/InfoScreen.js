import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Cardbox from '../components/Card';
import Events from '../data/events';

import Colors from '../constants/colors';

const ImageButton = props =>{
    return(
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{console.log("fubar")}}>
            <Image
                style={styles.buttonimage}
                source={props.source}
            />
        </TouchableOpacity>
    );
};
const InfoScreen = props => {

    return (
        // Current footer setup does not work without ScrollView. Most likely it would've been used anyway
        <ScrollView style={{...props.style, ...styles.screen}}>
            <Cardbox title="Info page" textContents="Screen for event navigation"/>
            <View style={styles.cont}>
                <ImageButton source={require('../assets/sports/athletics.png')}/>
                <ImageButton source={require('../assets/sports/basketball.png')}/>
                <ImageButton source={require('../assets/sports/discgolf.png')}/>
                <ImageButton source={require('../assets/sports/esports.png')}/>
                <ImageButton source={require('../assets/sports/floorball.png')}/>
                <ImageButton source={require('../assets/sports/football.png')}/>
                <ImageButton source={require('../assets/sports/judo.png')}/>
                <ImageButton source={require('../assets/sports/molkky.png')}/>
                <ImageButton source={require('../assets/sports/orienteering.png')}/>
                <ImageButton source={require('../assets/sports/tabletennis.png')}/>
                <ImageButton source={require('../assets/sports/volleyball.png')}/>
                <ImageButton source={require('../assets/sports/wrestling.png')}/>
            </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
       backgroundColor: Colors.primary.blue,
       width: "100%"
    },
    cont: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    button:{
        width: 150,
        height:150,
        margin: 10
    },
    buttonimage:{
        width:'100%',
        height:'100%'
    }
});

export default InfoScreen;