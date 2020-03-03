import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

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
    
  }
});

export default MapMarker;