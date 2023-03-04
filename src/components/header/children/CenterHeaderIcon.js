import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/base';
import Entypo from 'react-native-vector-icons/Entypo';

export const CenterHeaderIcon = props => {
  const {onPress, name, color, isPin} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        {isPin ? (
          <Entypo size={24} name={name} color={color} />
        ) : (
          <Icon
            size={24}
            name={name}
            type="ionicon"
            color={color}
            padding={6}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
