import React from 'react';
import { ScrollView, Text, StyleSheet} from 'react-native';

import Cardbox from '../components/card';
import Events from '../data/events';

import Colors from '../constants/colors';

const InfoScreen = props => {

    return (
        // Current footer setup does not work without ScrollView. Most likely it would've been used anyway
        <ScrollView style={{...props.styles, ...styles.screen}}>
            <Text>Info page</Text>
            <Cardbox textContents="Asdasdasdasdasdasd"/>
            <Events />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
       backgroundColor: Colors.primary.blue
    }
});

export default InfoScreen;