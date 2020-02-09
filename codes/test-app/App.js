import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

// Outside of render elements, comments can be added like normally in programming languages.

export default function App() {
  // useState hook wants three parameters:
  // 1) variable to be handled
  // 2) hook name to be called to change the first parameter
  // 3) inside useState brackets the variable type to be passed for the hook
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    // debugging with console.log will send the message
    // to your terminal, even if executed on mobile device
    // console.log(enteredGoal);

    // this syntax creates a new array to courseGoals, passing
    // arrays old values and the new one for it
    // setCourseGoals([...courseGoals, enteredGoal]);

    // this works too, apparently its more reliable way.
    // reason might be that this works almost like mutex?
    // instead of string we add an object here, so every goal
    // has a key-value pair
    setCourseGoals(currentGoals => [...currentGoals, { id: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  const cancelGoalAddition = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      {/*
          Comments inside React native components are done like this.

          View = div, need to be closed at the end of view. Other components like Buttons etc
          can't even be closed. Texts are added to components with titles or placeholders and
          formatted text needs to be inside Text element (which also needs to be closed).

          Styles can be added to components with JS objects inline, for example like
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}, 
          or by making a constant JS object, and add a reference to that object, which is the 
          preferred option.
      */}

      {/* You can add your own properties to be passed on for the components */}
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAddition} />

      {/*
          FlatList is a good option for long lists, unlike ScrollView, it doesn't render all the elements,
          but only those that are on the current screen. Here itemData is the same as courseGoals by the way.

          FlatList also adds the keys to the items automatically if the data provided is a JS object with key
          property, or it can handle another property as a key with keyExtractor attribute
      */}
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />
        } />
      {/* 
            map() is a function for arrays, that when done like this executes a function for every
            element in an array. Here since courseGoals is the array, goal is the value inside for
            each cell in the array, and with the arrow we can return Text object with the passed
            text value inside. This is equivalent for => { return <Text>{goal}</Text>; }

            When adding items like this, it's important to add unique key for each element, this
            isn't a good example, since if you add the same goal twice you still get the error

            Text component does not support stylings, so add styles for the View element
      
      {courseGoals.map((goal) => (
        <View key={goal} style={styles.listItem}>
          <Text>{goal}</Text>
        </View>))}
        
      */}

    </View>
  );
}

// this is preferred way to add styles
const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
