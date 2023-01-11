import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight,
} from 'react-native';
import Interactable from 'react-native-interactable';

export const MessageView = props => {
  const deltaX = new Animated.Value(0);
  const deltaY = new Animated.Value(0);

  return (
    <Interactable.View
      horizontalOnly={true}
      snapPoints={[
        {x: 0, id: 'closed'},
        {x: 0, id: 'open'},
      ]}
      boundaries={{left: -50, right: 0}}
      onSnapStart={props.onDrawerSnap}
      animatedValueX={deltaX}
      animatedValueY={deltaY}>
      <TouchableHighlight
        style={styles.messageItemContainer}
        underlayColor={'#7d889b'}
        onPress={() => props.onTouchMessage(props.item)}
        onLongPress={() => props.setChosenMessageForHeader(props.item)}>
        <>
          {props.item.resended ? (
            <View style={styles.messageResendLabel}>
              <Text style={styles.tableOfContents}>{props.dialogName}</Text>
              <Text style={styles.messageResendText} numberOfLines={1}>
                {props.item.resendedMessage}
              </Text>
            </View>
          ) : null}
          <Text style={styles.messageText}>{props.item.message}</Text>
          <View
            style={
              props.item.message.length < 5 && !props.item.resended
                ? styles.notAbsoluteDate
                : styles.messageDateContainer
            }>
            {props.item.edited && (
              <Text style={styles.editedMessageLabel}>изменено</Text>
            )}
            <Text style={styles.messageDateText}> {props.item.date} </Text>
          </View>
        </>
      </TouchableHighlight>
    </Interactable.View>
  );
};

const styles = StyleSheet.create({
  messageItemContainer: {
    backgroundColor: '#636e83',
    paddingVertical: 4,
    minWidth: '35%',
    paddingHorizontal: 4,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    margin: 4,
    borderColor: '#999999',
    borderWidth: 2,
    marginLeft: 60,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 18,
    color: '#fff',
    paddingLeft: 2,
  },
  messageDateText: {
    color: '#fff',
  },
  notAbsoluteDate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    bottom: -2,
    right: 2,
  },
  messageResendLabel: {
    borderLeftWidth: 4,
    borderColor: '#5f9ea0',
    paddingLeft: 4,
  },
  messageResendText: {
    color: '#fff',
    paddingEnd: 40,
  },
  tableOfContents: {
    color: '#ff884d',
    fontSize: 18,
  },
  editedMessageLabel: {
    color: '#d9d9d9',
  },
});
