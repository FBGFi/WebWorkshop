import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Card } from 'react-native-elements';

const Cardbox = props => {
  return (
    <View>
      <Card title={props.title}>
              <View>
                <Text>
                  {props.textContents}
                </Text>
              </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardbox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Cardbox;