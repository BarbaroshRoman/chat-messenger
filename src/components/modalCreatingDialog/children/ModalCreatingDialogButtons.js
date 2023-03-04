import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../resources/colors';

export const ModalCreatingDialogButtons = props => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
      {props.userAvatar && (
        <Image source={{uri: props.userAvatar}} style={styles.selectImage} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.steelBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 14,
    borderRadius: 4,
    elevation: 10,
    marginVertical: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  selectImage: {
    alignSelf: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 4,
  },
});
