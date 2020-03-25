import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';

import Colors from '../constants/colors';

import StTransText from '../components/StTransText';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * @author Aleksi - button to open the news item
 * @param id - id from the API 
 * @param onPress - function to open the notification
 * @param title - title from the API 
 * @param textContents - text for the notification 
 */
const Notification = props => {
    const [expanded, isExpanded] = useState(false);
    let textColor = Colors.primary.white;

    textColor = !isRead() ? Colors.primary.yellow : Colors.primary.white;

    function contentSetting(){
        props.onPress(props.id, true, props.title, props.textContents); 
        isExpanded(!expanded);
    }

    function isRead(){
        let result = {};
        
        // check if already added to local storage, returns the id or undefined        
        result = props.readIds.find(obj => {
            return obj === props.id;
        });

        // was not read before
        if(result == undefined){            
            return false;
        }
        return true;
    }

    return(
            <TouchableOpacity onPress={() => contentSetting()}>
                <View style={{borderBottomWidth: 2, borderColor: '#fff', paddingHorizontal:5, paddingBottom: 10, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}><Image source={require("../assets/icons/UnionWhite.png")} style={{width: 30, height: 30}}/></View>
                    <View style={{flex: 5}}><StTransText style={{fontSize: 20, color: textColor}}>{props.title}</StTransText></View>            
                </View>
            </TouchableOpacity>
    );
}

/**
 * @param notifications - notification array 
 * @param readNotifications - array of IDs 
 * @param setReadNotifications - statechanger for IDs 
 * @param props 
 */
const NotificationsScreen = props => {
    const [readIds, setReadIds] = useState(props.readNotifications);
    const [content, setContent] = useState(null);

    
    /**
     * @param {*} id - id of the notification
     * @param {*} show - boolean whether to show or hide the item
     */
    function notificationPress(id, show, title, content) {
        if(show){
            markAsRead(id);
            setContent(
                <View style={{position: 'absolute', paddingHorizontal: '8%', left: 0, top: 0, zIndex: 5, width: screenWidth, height: screenHeight}}>
                    <ScrollView style={styles.inner} contentContainerStyle={{paddingBottom: 120}}>
                        <View style={{padding:10}}><StTransText style={{fontSize: 20, color: Colors.primary.white, borderColor: Colors.primary.white, borderBottomWidth: 2, paddingBottom: 5}}>{title}</StTransText></View>
                        <View style={{paddingHorizontal:10}}><StTransText style={{fontSize: 15, color: Colors.primary.white}}>{content}</StTransText></View>
                        <TouchableOpacity onPress={() => setContent(null)}><View style={{width:150, height: 50, backgroundColor: Colors.primary.yellow, alignSelf: 'center', justifyContent: 'center', borderRadius: 10}}><StTransText style={{fontSize: 20, color: Colors.primary.red, textAlign: 'center'}}>Return</StTransText></View></TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }
        else{
            setContent(null);
        }
    }

    async function markAsRead(id){
      let result = {};
      
      // check if already added to local storage, returns the id or undefined        
      result = readIds.find(obj => {
          return obj === id;
      });
      
      // was not read before
      if(result == undefined){
          setReadIds(currentIds => [...currentIds, id]);    
          props.setReadNotifications(currentIds => [...currentIds, id]);
      }
      try {
          await AsyncStorage.setItem('USER_READ_IDS', JSON.stringify(readIds));       
      }catch(e){
          console.log(e);
      }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      
    return (
        <ScrollView contentContainerStyle={styles.screen}>                
            {content} 
            <ScrollView style={styles.inner}>
                {props.notifications.map((item) => 
                    <View key={"" + item.id} style={{paddingHorizontal:18, paddingTop: 18}}>
                        <Notification readIds={readIds} id={item.id} title={item.title} textContents={item.content} onPress={notificationPress}/>
                    </View>
                    )}
            </ScrollView> 
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        paddingHorizontal: '8%',
        position: 'relative'
    },
    
    inner: {
        width: '100%',
        alignSelf: 'center',
        alignContent: 'flex-start',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.primary.red
    },
});
export default NotificationsScreen;
