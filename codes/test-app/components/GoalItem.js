import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// This is selfmade component, props means the properties we
// set for the component when using it in App.
const GoalItem = props => {
    return (
        // Touchable components add possibility to press other
        // than Button components, theres multiple options with
        // different visual effects, just make sure theyre
        // available both in Android and IOS
        <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.listItem} >
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    }
});

export default GoalItem;