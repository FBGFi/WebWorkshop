import React from 'react';
import { ScrollView, Text, StyleSheet} from 'react-native';
import Cardbox from '../components/card';

const InfoScreen = props => {

    return (
        // Current footer setup does not work without ScrollView. Most likely it would've been used anyway
        <ScrollView>
            <Text>Info page</Text>
            <Cardbox textContents="Asdasdasdasdasdasd"/>
        </ScrollView>
    );
};
export default InfoScreen;