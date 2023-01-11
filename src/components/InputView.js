import React from 'react';
import {Icon} from '@rneui/themed';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export const InputView = props => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={props.inputValue}
        onChangeText={props.setInputValue}
        placeholder="Написать сообщение..."
        placeholderTextColor="#c5cad3"
        multiline
      />
      <TouchableOpacity activeOpacity={0.5} onPress={props.sendMessage}>
        <Icon
          size={30}
          style={styles.iconSend}
          name="send-outline"
          type="ionicon"
          color={'#9fc4c6'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#353b45',
    paddingRight: 2,
  },
  input: {
    flex: 1,
    color: 'white',
    height: 50,
    padding: 10,
    fontSize: 18,
  },
  iconSend: {
    padding: 8,
    paddingLeft: 16,
  },
});
