import React, { useState } from 'react';
import { StyleSheet, FlatList, ScrollView, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';

import Colors from '../constants/colors';

import StTransText from '../components/StTransText';

/**
 * @author Aleksi - button to open the news item
 * @param id - id from the API 
 * @param onPress - function to open the notification
 * @param title - title from the API 
 * @param textContents - text for the notification 
 */
const Notification = props => {
    let defaultContent = <View style={{flexDirection: 'row', padding: 10}}><StTransText style={{flex:3, fontSize: 25, color:Colors.primary.white}}>Read more</StTransText><Image style={{flex:1}} source={require("../assets/icons/UnionWhite.png")} style={{width: 30, height: 30}}/></View>;
    const [expanded, isExpanded] = useState(false);
    const [content, setContent] = useState(defaultContent);

    function contentSetting(){
        isExpanded(!expanded);
        if(!expanded){
            setContent(
                <View>
                    <StTransText style={{fontSize: 20, color: Colors.primary.white}}>
                        {props.textContents}
                    </StTransText>
                </View>
            );            
        }
        else{
            setContent(defaultContent);
        }
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
        <View key={"" + props.id} style={{backgroundColor: Colors.primary.red, borderRadius: 10, padding: 10, borderWidth: 2, borderColor: Colors.primary.yellow}}>
            <TouchableOpacity onPress={() => {props.onPress(props.id); contentSetting();}}>
                <View style={{borderBottomWidth: 2, borderColor: '#fff', paddingBottom: 5}}>
                    <StTransText style={{fontSize: 25, color:Colors.primary.white}}>{props.title}</StTransText>                
                </View>
                {content}
                {!isRead() ? <StTransText>NOT READ</StTransText> : null}
            </TouchableOpacity>
        </View>
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
            <ScrollView contentContainerStyle={styles.inner}>
                {/*<FlatList keyExtractor={(item, index) => item.id}
                    data={props.notifications}
                    renderItem={itemData => <Notification readIds={readIds} id={itemData.item.id} title={itemData.item.title} textContents={itemData.item.content} onPress={markAsRead}/>
                    } />*/}
                <View>{props.notifications.map((item) => <View key={item.id}><Notification readIds={readIds} id={item.id} title={item.title} textContents={item.content} onPress={markAsRead}/></View>)}</View>
            </ScrollView>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary.blue,
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },
    
    inner: {
        backgroundColor: Colors.primary.yellow,
        width: '100%',
        alignSelf: 'center',
        alignContent: 'flex-start',
        flexDirection: 'row',
    },
});
export default NotificationsScreen;
