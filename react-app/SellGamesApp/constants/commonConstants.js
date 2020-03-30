import {Dimensions} from 'react-native';

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
            /** @param px - how many pixels the location is from the top of the image */
            mapMarkerTop: (px) => {
                return px * (this.deviceDimensions.screenHeight / this.mapCalculations.mapHeight);
            },
            /** @param px - how many pixels the location is from the left side of the image */
            mapMarkerLeft: (px) => {
                return px * (this.deviceDimensions.screenWidth / this.mapCalculations.mapWidth);
            }
        };
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
}
export default CommonConstants;