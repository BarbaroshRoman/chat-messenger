import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {COLORS} from '../resources/colors';

export const DialogView = props => {
  return (
    <View>
      <TouchableHighlight
        style={styles.dialogButton}
        underlayColor={COLORS.lightSteelBlue}
        onPress={() => props.goToPage(props.item)}
        onLongPress={() => props.setChosenDialog(props.item)}>
        <View>
          <Text style={styles.dialogNameText} numberOfLines={1}>
            {props.item.dialogName}
          </Text>
          {props.currentMessagesList.messagesList.length ? (
            <View>
              <Text style={styles.lastMessageText} numberOfLines={1}>
                {props.currentMessagesList.messagesList[props.lastIndex].message
                  ? props.currentMessagesList.messagesList[props.lastIndex]
                      .message
                  : `${
                      props.currentMessagesList.messagesList[props.lastIndex]
                        .resendedDialogName
                    }: ${
                      props.currentMessagesList.messagesList[props.lastIndex]
                        .resendedMessage
                    }`}
              </Text>
              <Text style={styles.dialogDate}>
                {props.currentMessagesList.messagesList[props.lastIndex].date}
              </Text>
            </View>
          ) : (
            <Text style={styles.emptyMessageText}>История сообщений пуста</Text>
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogButton: {
    minWidth: '100%',
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  dialogNameText: {
    paddingLeft: 10,
    color: COLORS.lavender,
    fontSize: 20,
  },
  lastMessageText: {
    color: 'white',
    fontSize: 20,
    paddingRight: 50,
    paddingLeft: 10,
  },
  dialogDate: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 14,
    marginRight: 4,
  },
  emptyMessageText: {
    color: 'white',
    fontSize: 20,
    paddingRight: 50,
    paddingLeft: 10,
    paddingBottom: 24,
  },
});
