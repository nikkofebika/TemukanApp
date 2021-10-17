import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const MyIcon = ({name, size = 25, style, onPress}) => {
  return <Icon name={name} size={size} style={[style]} onPress={onPress} />;
};

export default MyIcon;
