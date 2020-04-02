import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import CommonConstants from '../constants/commonConstants';
const Constants = new CommonConstants();
/**
 * 
 * @param markerPress - function to open location information
 * @param markerData - object to fetch the data from, look mapMarkerData.js
 * @param dimensions - multiplier for the markers size
 */
const MapMarker = props => {
  return (
    <View key={props.markerData.address} style={{position: 'absolute', top: Constants.mapCalculations.mapMarkerRatio(props.markerData.top), left: Constants.mapCalculations.mapMarkerRatio(props.markerData.left)}}>
      <TouchableOpacity onPress={() => props.markerPress(props.markerData)}>
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