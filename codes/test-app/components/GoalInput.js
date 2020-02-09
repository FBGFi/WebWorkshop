import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        // this changes enteredGoal into enteredText
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    };

    return (
        // Modal is good way to create overlay components.
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course goal"
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal} />
                {/* 
                Using arrow function here prevents function to be called when
                component is loaded, but allows us to pass a input parameter

                So it would look like this {() => props.onAddGoal(enteredGoal)}

                props.onAddGoal.bind(this, enteredGoal) would work too
            */}
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="CANCEL" color="red" onPress={() => {props.onCancel(); setEnteredGoal('');}} /></View> 
                    <View style={styles.button}><Button title="ADD" onPress={addGoalHandler} /></View> 
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    },
    button: {
        width: '40%'
    },
});

export default GoalInput;