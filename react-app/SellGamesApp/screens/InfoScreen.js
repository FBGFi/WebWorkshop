import React from 'react';
import { ScrollView, Text, StyleSheet} from 'react-native';

const InfoScreen = props => {

    return (
        // Current footer setup does not work without ScrollView. Most likely it would've been used anyway
        <ScrollView>
            <Text>Info page</Text>
        </ScrollView>
    );
};
export default InfoScreen;