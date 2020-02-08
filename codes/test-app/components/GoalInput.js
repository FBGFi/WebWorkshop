import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        // this changes enteredGoal into enteredText
        setEnteredGoal(enteredText);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Course goal"
                style={styles.input}
                onChangeText={goalInputHandler}
                value={enteredGoal} />
            {/* 
                Using arrow function here prevents function to be called when
                component is loaded, but allows us to pass a input parameter

                props.onAddGoal.bind(this, enteredGoal) would work too
            */}
            <Button
                title="ADD"
                onPress={() => props.onAddGoal(enteredGoal)} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: '80%'
    },
});

export default GoalInput;