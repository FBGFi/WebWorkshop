import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import Colors from '../constants/colors';

const MapMarker = props => {
  return (
    <TouchableOpacity onPress={/* open info tab */() => {}}>
      <Image
        style={{width:(styles.marker.width*props.width),height:(styles.marker.height*props.height)}}
        source={require('../assets/icons/MapMarker.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 178,
    height: 241,
    backgroundColor: Colors.red
  }
});

export default MapMarker;