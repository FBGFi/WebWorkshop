import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const MapMarker = props => {
  return (
    <TouchableOpacity onPress={/* open info tab */}>
      <Image
        style={styles.marker}
        source={require('../assets/icons/MapMarker.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 15,
    height: 15,
    backgroundColor: Colors.red
  }
});

export default MapMarker;