import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';

import Colors from '../constants/colors';

import StTransText from '../components/StTransText';

const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * @author Aleksi - only shown when opening the app
 */
const WelcomeScreen = props => {
    return(
        <ScrollView style={styles.screen} contentContainerStyle={{justifyContent: 'center', alignContent: 'center', flexDirection: 'row'}} scrollEnabled={false}>
            <View style={styles.wrapper}>
                <StTransText style={{textAlign: 'center', fontSize: 35, color: Colors.primary.yellow}}>{"SELL GAMES 2020\nLIGHT THE FIRE!"}</StTransText>
                <StTransText style={{textAlign: 'center', fontSize: 25, color: Colors.primary.white}}>{"Lahti welcomes all the university students from around the world to participate in the XXXVI SELL Student Games 2020 in the city of sports Lahti, Finland. SELLGAMES2020 LIGHTTHEFIRE!\n\nIn this app you can follow the sports and see them on the map etc."}</StTransText>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen:{       
       backgroundColor: Colors.primary.blue,
       width:'100%',
       paddingHorizontal: '10%'
    },
    wrapper: {
        alignSelf: 'center', 
        height: screenHeight - 70, 
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default WelcomeScreen;