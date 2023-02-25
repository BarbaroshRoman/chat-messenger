import React from 'react';
import {Icon} from '@rneui/themed';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {COLORS} from '../resources/colors';

export const InputView = props => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={props.inputValue}
        onChangeText={props.setInputValue}
        placeholder="Написать сообщение..."
        placeholderTextColor={COLORS.lavender}
        multiline
      />
      <TouchableOpacity activeOpacity={0.5} onPress={props.sendMessage}>
        <Icon
          size={30}
          style={styles.iconSend}
          name="send-outline"
          type="ionicon"
          color={COLORS.lightBlue}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.charcoal,
    paddingRight: 2,
  },
  input: {
    flex: 1,
    color: 'white',
    padding: 10,
    fontSize: 18,
  },
  iconSend: {
    padding: 8,
    paddingLeft: 16,
  },
});
