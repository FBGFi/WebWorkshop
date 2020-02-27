import React from 'react';
import { StyleSheet, ScrollView, Animated, Dimensions, View } from 'react-native';

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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flexDirection: 'row',
        width: '100%'
    },
    inner: {
        width: screenWidth
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