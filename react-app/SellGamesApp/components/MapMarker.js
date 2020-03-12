import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';

/**
 * 
 * @param markerPress - function to open location information
 * @param top - position from top of screen
 * @param left - position from left of screen
 * @param dimensions - multiplier for the markers size
 * @param fetchString - string to fetch data from venues
 * @param url - url of the location on Google Maps
 * @param place - title for the information box
 */
const MapMarker = props => {
  
  return (
    <View style={{position: 'absolute', top: props.top, left: props.left}}>
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
  marker: {
    width: 178,
    height: 241
  }
});

export default MapMarker;