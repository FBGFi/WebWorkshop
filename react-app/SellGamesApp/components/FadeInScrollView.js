import React, {useState} from 'react';
import { ScrollView, Animated } from 'react-native';
// does not work yet
const FadeInScrollView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 10,
        }
      ).start();
    }, [])
  
    return (
      <Animated.View                 // Special animatable View
        contentContainerStyle={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
export default FadeInScrollView;