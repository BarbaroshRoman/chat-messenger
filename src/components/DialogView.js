import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import {COLORS} from '../resources/colors';

export const DialogView = props => {
  const targetMessageList = props.currentMessagesList.messagesList;
  const renderMessage = () => {
    const lastIndexMessage = targetMessageList[props.lastIndex];
    return lastIndexMessage.message ??
        `${lastIndexMessage.resendedDialogName}: ${lastIndexMessage.resendedMessage}`
  }
  return (
      <TouchableHighlight
        style={styles.dialogButton}
        underlayColor={COLORS.lightSteelBlue}
        onPress={() => props.goToPage(props.item)}
        onLongPress={() => props.setChosenDialog(props.item)}>
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogImage}>{props.item.dialogName[0]}</Text>
        <View style={styles.dialogContent}>
          <Text style={styles.dialogNameText} numberOfLines={1}>
            {props.item.dialogName}
          </Text>
          {targetMessageList.length ? (
            <View>
              <Text style={styles.lastMessageText} numberOfLines={1}>
                {renderMessage()}
              </Text>
              <Text style={styles.dialogDate}>
                {targetMessageList[props.lastIndex].date}
              </Text>
            </View>
          ) : (
            <Text style={styles.emptyMessageText}>История сообщений пуста</Text>
          )}
        </View>
        </View>
      </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  dialogButton: {
    minWidth: '100%',
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
  },
  dialogContainer: {
    flexDirection: "row",
  },
  dialogContent: {
    flex: 1,
  },
  dialogImage: {
    backgroundColor: COLORS.grey,
    height: 50,
    width: 50,
    borderRadius: 40,
    marginTop: 2,
    marginLeft: 6,
    textAlignVertical: "center",
    textAlign: "center",
    color: COLORS.white,
    fontSize: 16,
  },
  dialogNameText: {
    paddingLeft: 10,
    color: COLORS.lavender,
    fontSize: 18,
  },
  lastMessageText: {
    color: COLORS.white,
    fontSize: 16,
    paddingRight: 50,
    paddingLeft: 10,
  },
  dialogDate: {
    alignSelf: 'flex-end',
    color: COLORS.white,
    fontSize: 12,
    marginRight: 4,
  },
  emptyMessageText: {
    color: COLORS.white,
    fontSize: 16,
    paddingRight: 50,
    paddingLeft: 10,
    paddingBottom: 24,
  },
});
