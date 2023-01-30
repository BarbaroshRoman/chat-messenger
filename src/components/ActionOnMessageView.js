import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/base';
import {useDispatch} from 'react-redux';

import {forwardingMessages} from '../redux/messages/messagesSlice';
import {COLORS} from '../resources/colors';

export const ActionOnMessageView = props => {
  const dispatch = useDispatch();

  if (props.chosenMessage.isResend) {
    return (
      <View style={styles.container}>
        <View style={styles.actionIcon}>
          <Icon
            name="arrow-redo-outline"
            type="ionicon"
            color={COLORS.orangeRed}
            size={30}
          />
        </View>
        <View style={styles.messageWithDialogName}>
          <Text
            style={(styles.dialogNameText, {color: COLORS.orangeRed})}
            numberOfLines={1}>
            {props.dialogName}
          </Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {props.chosenMessage.message}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closeViewButton}
          activeOpacity={0.6}
          onPress={() => {
            props.setChosenMessage({});
            props.setInputValue('');
          }}>
          <Icon name="close-outline" type="ionicon" color="white" size={26} />
        </TouchableOpacity>
      </View>
    );
  } else if (props.chosenMessage.inAStateOfEdit) {
    return (
      <View style={styles.container}>
        <View style={styles.actionIcon}>
          <Icon
            name="pencil-outline"
            type="ionicon"
            color={COLORS.limeGreen}
            size={30}
          />
        </View>
        <View style={styles.messageWithDialogName}>
          <Text
            style={(styles.dialogNameText, {color: COLORS.limeGreen})}
            numberOfLines={1}>
            {props.dialogName}
          </Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {props.chosenMessage.message}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closeViewButton}
          activeOpacity={0.6}
          onPress={() => {
            props.setChosenMessage({});
            props.setInputValue('');
          }}>
          <Icon name="close-outline" type="ionicon" color="white" size={26} />
        </TouchableOpacity>
      </View>
    );
  } else if (props.chosenMessage.sentToAnotherDialog) {
    return (
      <View style={styles.container}>
        <View style={styles.actionIcon}>
          <Icon
            name="arrow-forward-outline"
            type="ionicon"
            color="white"
            size={30}
          />
        </View>
        <View style={styles.messageWithDialogName}>
          <Text
            style={(styles.dialogNameText, {color: COLORS.orangeRed})}
            numberOfLines={1}>
            {props.chosenMessage.dialogName}
          </Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {props.chosenMessage.message}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closeViewButton}
          activeOpacity={0.6}
          onPress={() => {
            dispatch(forwardingMessages({}));
            props.setInputValue('');
          }}>
          <Icon name="close-outline" type="ionicon" color="white" size={26} />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.charcoal,
    padding: 6,
  },
  actionIcon: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  messageWithDialogName: {
    flex: 1,
    flexDirection: 'column',
  },
  dialogNameText: {
    fontSize: 20,
  },
  messageText: {
    color: COLORS.lavender,
    fontSize: 18,
  },
  closeViewButton: {
    justifyContent: 'center',
  },
});
