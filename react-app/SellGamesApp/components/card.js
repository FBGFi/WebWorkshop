import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Card } from 'react-native-elements';

const Cardbox = props => {
  return (
    <View>
      <Card title="Hello world!">
            {
              <View>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </View>
            }
      </Card>
    </View>
  );
}

export default Cardbox;

const styles = StyleSheet.create({
  cardbox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});