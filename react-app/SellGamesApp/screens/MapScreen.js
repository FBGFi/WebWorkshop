import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Animated, Dimensions} from 'react-native';

import Colors from '../constants/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const MapScreen = props => {
    
    return (
        <ScrollView style={styles.screen} horizontal={true}>
            <ScrollView>
                <Animated.Image 
                    source={require('../assets/map_yellow.png')}
                    style={{height:(1642/1345*screenWidth), width: screenWidth}}/>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.red,
        width: '100%'
    }
});
export default MapScreen;