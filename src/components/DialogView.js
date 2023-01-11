import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export const DialogView = props => {
  return (
    <View>
      <TouchableHighlight
        style={styles.dialogButton}
        underlayColor={'#7d889b'}
        onPress={() => props.goToPage(props.item)}
        onLongPress={() => props.setChosenDialog(props.item)}>
        <View>
          <Text style={styles.dialogName}>{props.item.dialogName}</Text>
          {props.currentMessagesStateBranch.messagesList.length ? (
            <View>
              <Text style={styles.dialogText} numberOfLines={1}>
                {
                  props.currentMessagesStateBranch.messagesList[props.lastIndex]
                    .message
                }
              </Text>
              <Text style={styles.dialogDate}>
                {
                  props.currentMessagesStateBranch.messagesList[props.lastIndex]
                    .date
                }
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
  dialogName: {
    marginLeft: 20,
    color: 'white',
    fontSize: 24,
  },
  dialogText: {
    color: '#d9d9d9',
    fontSize: 20,
    paddingRight: 50,
    paddingLeft: 10,
  },
  dialogDate: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 18,
    marginRight: 4,
  },
  emptyMessageText: {
    color: '#d9d9d9',
    fontSize: 20,
    paddingRight: 50,
    paddingLeft: 10,
    paddingBottom: 24,
  },
});
