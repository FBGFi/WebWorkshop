# WebWorkshop
Repo for LAB Web Workshop course.

Purpose for the project is to build a mobile app using React Native in order
to provide easily accessible information for competitors in a sports event.

Versions:
    
    - node v12.14.1
    
    - expo 3.11.7

Initializing:
    
    Start by installing Node.js from https://nodejs.org/en/
    
    Next install expo by opening Visual Studio Codes terminal, and typing 
    "npm install -g expo-cli"
    
    Go to the folder where you want to start building the app, and type to 
    terminal "expo init *project name here*"
    
    If it throws an error, go to C:/Users/User/AppData/Roaming/npm and remove 
    expo.ps1 and expo-cli.ps1 from the folder.
    
    Next go to the created app's folder and type "npm start" or "expo start".
    
    Now if you have Android phone connected to your computer, you can simply 
    press "Run on Android device/emulator" in the browser, and it will 
    automatically install Expo into your phone. If you open the app, 
    you can scan the QR-code appearing on your screen to build the app.

Handy extensions for VS code:
    
    - ES7 React/Redux/GraphQL/React-Native snippets
    
    - React Native Tools

# Features to be included in the app

Schedules for all the sports.

Notification system.

Map of the competitionarea.

Display of placements in the sports.

# Things to change for future use

If app will be used in future events somewhere else, look into these files:

- data/infoButtonData.js (handles the buttons in the opening screen)
- data/sportsInfo.js (the text displayed when infobutton is clicked, if this will be added to API change accordingly. here also sportVenueTitles tells what events to link the data to from API, would be easier just to add the general sport name to each item in the API instead of this)
- data/mapMarkerData.js (each object here is a marker in the map. delete these and add new ones for new locations)
- constants/commonConstants.js (mapWidth and mapHeight are map's dimensions in pixels. if new map added, change these accordingly. also if API changes, change the API address)
- screen/ScheduleScreen.js (data is pulled from API with date, change the string that is sent to Constants.fetchFromApi() according to your needs)

Questions about the app can be forwarded to previous teams scrum leader, get more info about that from your teacher.
