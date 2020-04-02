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
            /** @param px - how many pixels the location is from the left side or top of the image, the ratio is same for both */
            mapMarkerPos: (px) => {
                return px * (this.deviceDimensions.screenWidth / this.mapCalculations.mapWidth);
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
        } catch {}
    }
}
export default CommonConstants;