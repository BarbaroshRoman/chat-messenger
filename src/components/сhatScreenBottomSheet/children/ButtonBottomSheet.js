import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ButtonBottomSheet = props => {
  const {onPress, name, color, text, isUnpin} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {isUnpin ? (
        <MaterialCommunityIcons
          size={32}
          name={name}
          color={color}
          style={styles.unpinIcon}
        />
      ) : (
        <Icon
          size={32}
          name={name}
          type="ionicon"
          color={color}
          marginVertical={10}
          marginRight={10}
        />
      )}
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  container: {
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    minWidth: '88%',
  },
  text: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  unpinIcon: {
    marginVertical: 10,
    marginRight: 10,
  },
});
