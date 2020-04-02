import {Dimensions, AsyncStorage} from 'react-native';

class CommonConstants {
    constructor() {
        this.deviceDimensions = {    
            screenWidth: Math.round(Dimensions.get('window').width),
            screenHeight: Math.round(Dimensions.get('window').height)
        };
        /** @author Aleksi - functionalities on the map screen */
        this.mapCalculations = {
            mapWidth: 2656,
            mapHeight: 6522,
            /** @param unit - the unit we need the calculation for (pixels from top or left of screen forexample) */
            mapMarkerRatio: (unit) => {
                return unit * (this.deviceDimensions.screenWidth / this.mapCalculations.mapWidth);
            }
        };
        this.userScheduleKey = "USER_SCHEDULES";
    }

    // Common functionalities

    /**
     * @param ms - how long we want the app to sleep
     */
    sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
    } 
    
    /**
     * @author Aleksi - function to fetch data from the backend, await the result in the program
     * @param query - for example add "events" to fetch all events, "events/id/1" to get event with id 1 etc.
     */
    fetchFromAPI(query){
        return fetch("https://sellgames2020.fi/backend/api/" + query, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }});
    }

    /**
     * @author Aleksi - save to local storage
     * @param data - event to be saved
     */
    async storeData(data){       
        try {
            await AsyncStorage.setItem(this.userScheduleKey, JSON.stringify(data)); 
        } catch (e){ console.log(e); }
    }

    /**
     * @author Aleksi - check if already added, if not, proceed to add to local storage
     * @param event - event object to be added
     */
    async checkUserData(event){                        
        let result = {};
        let localStorageObject;
        let storageFound;

        try {
            localStorageObject = JSON.parse(await AsyncStorage.getItem(this.userScheduleKey));   
            if(localStorageObject == null){
                storageFound = false;
            }        
            else storageFound = true;
        } catch {
            storageFound = false;
        }        

        if(storageFound && localStorageObject.length > 0){      
            // check if already added to local storage, returns the id or undefined        
            result = localStorageObject.find(obj => {
                return obj.id === event.id
            });
            
            // was added previously
            if(result != undefined && Object.keys(result).length > 0){
                return false;
            }
            
            localStorageObject.push(event);
            this.storeData(localStorageObject);
            
        } else {
            this.storeData([event]);
        }
        return true;
    }
}
export default CommonConstants;