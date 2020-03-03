import React from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import { Card } from 'react-native-elements';

const Cardbox = props => {
  return (
    <View>
      <Card title={props.title} containerStyle={{margin: 2}}>
              <View>
                <Text>
                  {props.textContents}
                </Text>
                {props.button ? <Button title={props.buttonTitle} onPress={props.buttonOnPress.bind(this,props.id)}/> : null}
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