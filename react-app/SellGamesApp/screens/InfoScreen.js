import React from 'react';
import { ScrollView, Text, StyleSheet} from 'react-native';

import Cardbox from '../components/Card';
import Events from '../data/events';

import Colors from '../constants/colors';

const InfoScreen = props => {

    return (
        // Current footer setup does not work without ScrollView. Most likely it would've been used anyway
        <ScrollView style={{...props.style, ...styles.screen}}>
            <Cardbox title="Info page" textContents="Screen for event navigation"/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
       backgroundColor: Colors.primary.blue
    }
});

export default InfoScreen;