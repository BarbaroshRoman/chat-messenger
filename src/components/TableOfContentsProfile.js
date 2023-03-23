import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS} from '../resources/colors';

export const TableOfContentsProfile = props => {
  return (
    <View>
      {props.image && (
        <TouchableOpacity onPress={() => props.setImage('')}>
          <Image source={{uri: props.image}} style={styles.selectImage} />
        </TouchableOpacity>
      )}
      <View
        style={
          props.isAbout ? styles.aboutTableOfContents : styles.tableOfContents
        }>
        <Text
          style={
            props.isAbout
              ? styles.aboutTableOfContentsText
              : styles.tableOfContentsText
          }>
          {props.title}
        </Text>
        {props.isTextInput ? (
          <TextInput
            style={props.isAbout ? styles.aboutInput : styles.usernameInput}
            value={props.value}
            onChangeText={props.onChangeText}
            multiline={!!props.isAbout}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.selectImageButton}
              onPress={props.goToPickImage}>
              <Text style={styles.selectImageText}>Выбрать</Text>
            </TouchableOpacity>
            {props.uploadImage && (
              <TouchableOpacity
                style={styles.selectImageButton}
                onPress={props.uploadImage}>
                <Text style={styles.selectImageText}>Загрузить</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableOfContents: {
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: COLORS.arsenic,
  },
  tableOfContentsText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 20,
    alignSelf: 'center',
  },
  usernameInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: COLORS.lightBlue,
    alignSelf: 'center',
  },
  aboutTableOfContents: {
    height: 190,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: COLORS.arsenic,
    paddingVertical: 10,
  },
  aboutTableOfContentsText: {
    justifyContent: 'flex-start',
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 20,
  },
  aboutInput: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    marginHorizontal: 12,
    marginVertical: 4,
    color: COLORS.lightBlue,
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'dotted',
    borderColor: COLORS.lightBlue,
    paddingLeft: 8,
  },
  selectImage: {
    alignSelf: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 4,
  },
  selectImageButton: {
    backgroundColor: COLORS.steelBlue,
    borderRadius: 6,
    alignSelf: 'center',
    padding: 6,
    marginLeft: 18,
  },
  selectImageText: {
    color: COLORS.lavender,
  },
});
