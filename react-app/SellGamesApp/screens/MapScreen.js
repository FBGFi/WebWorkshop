import React from 'react';
import { StyleSheet, ScrollView, Animated, Dimensions, View } from 'react-native';

import MapMarker from '../components/MapMarker';
import OpenURLButton from '../components/OpenURLButton';

import Colors from '../constants/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const MapScreen = props => {
    // not perfect, 2 scrollsviews allow both horizontal and vertical scrolling
    return (
        <ScrollView contentContainerStyle={styles.screen} horizontal={true}>
            <ScrollView contentContainerStyle={styles.inner}>
                <View style={styles.mapWrapper}>
                    <Animated.Image
                        source={require('../assets/map_yellow.png')}
                        style={styles.imageStyles} />
                </View>
            </ScrollView>
            <View style={styles.markerViewTEMP}><MapMarker width={0.3} height={0.3} /></View>
            <OpenURLButton url={"https://www.google.fi/maps/place/Mukkulankatu+19,+15210+Lahti/"} buttonText={"Open with Google Maps"}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flexDirection: 'column',
        width: '100%'
    },
    inner: {
        width: screenWidth
    },
    markerViewTEMP: {
        height: 100,
        justifyContent: "center",
        alignContent: "center"
    },
    mapWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: (screenWidth * 0.05),
        backgroundColor: Colors.primary.yellow
    },
    imageStyles: {
        height: (1642 / 1345 * screenWidth), 
        width: (screenWidth * 0.9), 
        borderWidth: 2, 
        borderColor: Colors.primary.yellow
    }
});
export default MapScreen;