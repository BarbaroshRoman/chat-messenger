import React from 'react';
import {Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import {Icon} from '@rneui/base';
import {useDispatch} from 'react-redux';

import {forwardingMessages} from '../redux/messages/messagesSlice';

export const HeaderComponent = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {props.goBackHandler ? (
        <View
          style={styles.leftIcon}
          onTouchEnd={() => dispatch(forwardingMessages({}))}>
          <TouchableOpacity onPress={props.goBackHandler}>
            <Icon
              size={26}
              name="arrow-back-outline"
              type="ionicon"
              color={'#9fc4c6'}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.leftIcon}>
          <TouchableOpacity>
            <Icon
              size={26}
              name="list-outline"
              type="ionicon"
              color={'#9fc4c6'}
            />
          </TouchableOpacity>
        </View>
      )}
      {props.chosenItem.dialogName || props.chosenItem.message ? (
        <View style={styles.actionOnMessageButtons}>
          <TouchableOpacity onPress={props.deleteItem}>
            <View>
              <Icon
                size={24}
                name="trash-outline"
                type="ionicon"
                color={'#ff1a1a'}
                padding={6}
              />
            </View>
          </TouchableOpacity>
          {props.chosenItem.message && (
            <>
              <TouchableOpacity onPress={props.replyToMessage}>
                <View>
                  <Icon
                    size={24}
                    name="arrow-undo-outline"
                    type="ionicon"
                    color={'white'}
                    padding={6}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.editMessage}>
                <View>
                  <Icon
                    size={24}
                    name="pencil-outline"
                    type="ionicon"
                    color={'white'}
                    padding={6}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.forwardMessage}>
                <View>
                  <Icon
                    size={24}
                    name="arrow-redo-outline"
                    type="ionicon"
                    color={'white'}
                    padding={6}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <Text style={styles.headerText} numberOfLines={1}>
          {props.chosenMessageForForwarding.sentToAnotherDialog
            ? 'Переслать в ...'
            : props.title}
        </Text>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalHeaderMenu}
        onRequestClose={props.closeModalHeaderMenu}>
        <View style={styles.modalView} onTouchEnd={props.closeModalHeaderMenu}>
          {props.cleanMessages ? (
            <TouchableOpacity
              style={[
                styles.cleanMessagesButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  opacity: props.currentMessagesList.messagesList.length
                    ? 1
                    : 0.5,
                },
              ]}
              onPress={props.cleanMessages}
              disabled={props.currentMessagesList.messagesList.length === 0}>
              <View>
                <Icon
                  size={24}
                  paddingLeft={4}
                  name="trash-outline"
                  type="ionicon"
                  color={'#9fc4c6'}
                  paddingRight={4}
                />
              </View>
              <Text style={styles.cleanMessagesText}>Очистить историю</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.createDialogButton}
              onPress={props.openModalCreatingDialog}>
              <View>
                <Icon
                  size={24}
                  paddingLeft={4}
                  name="chatbubbles-outline"
                  type="ionicon"
                  color={'#9fc4c6'}
                  paddingRight={4}
                />
              </View>
              <Text style={styles.createDialogText}>Создать новый диалог</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      {!props.chosenMessageForForwarding.sentToAnotherDialog && (
        <View
          style={styles.iconEllipsisVertical}
          onTouchEnd={() => props.setChosenItem({})}>
          <TouchableOpacity onPress={props.openModalHeaderMenu}>
            <Icon
              size={26}
              name="ellipsis-vertical"
              type="ionicon"
              color={'#9fc4c6'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#353b45',
    height: 50,
  },
  leftIcon: {
    justifyContent: 'center',
    padding: 8,
    marginVertical: 4,
    borderColor: '#646f82',
    marginRight: 10,
  },
  actionOnMessageButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    paddingLeft: 14,
  },
  iconEllipsisVertical: {
    padding: 8,
    marginVertical: 4,
    borderColor: '#646f82',
    marginLeft: 20,
  },
  modalView: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 50,
  },
  createDialogButton: {
    flexDirection: 'row',
    padding: 12,
    elevation: 20,
    backgroundColor: '#353b45',
  },
  createDialogText: {
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 8,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cleanMessagesButton: {
    flexDirection: 'row',
    padding: 12,
    elevation: 20,
    backgroundColor: '#353b45',
  },
  cleanMessagesText: {
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 8,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
