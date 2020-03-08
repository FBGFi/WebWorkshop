import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Dimensions, View } from 'react-native';

import Colors from '../constants/colors';

// map dimensions: 1345 / 1642
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
// marker position should be 279 / 1194 for Salpausselänkatu 8

const MapMarker = props => {
  
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => props.markerPress(props.place, props.url, props.fetchString)}>
        <Image
          style={{width:(styles.marker.width*props.dimensions),height:(styles.marker.height*props.dimensions)}}
          source={require('../assets/icons/MapMarker.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 200,
    left: 100
  },
  marker: {
    width: 178,
    height: 241
  }
});

export default MapMarker;