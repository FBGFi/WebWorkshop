import React from 'react';
import { Text } from 'react-native';

/**
 * @author Aleksi - component to replace all Text components with, containing our right font, use the same way as regular Text component, not all properties added though, add them here if needed
 */
const StTransText = props => <Text style={{...{fontFamily: 'StTransmission'}, ...props.style}}>{props.children}</Text>

export default StTransText;