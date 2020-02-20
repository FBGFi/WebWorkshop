import React, {useState} from 'react';
import { Text, View } from 'react-native';

const Events = props => {
  const [dataArray, setDataArray] = useState('');
  async function getData() {
    const response = await fetch("http://35.217.19.28/sell-games-2020/public/index.php/api/events", {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  }   
              }); 
          const json = await response.json();
          let returnValue = "";
          let length = Object.keys(json.data).length;
          for(let i = 0; i < length; i++)
          {
            returnValue += json.data[i].id + " ";
            
          }
          setDataArray(returnValue);
  };
  getData();
  return(
    <View>
      <Text>
      {dataArray}
      </Text>
    </View>
  );
}
export default Events;
