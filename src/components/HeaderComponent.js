import React from 'react';
import {Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import {Icon} from '@rneui/base';

export const HeaderComponent = props => {
  return (
    <View style={styles.container}>
      {props.goBackHandler ? (
        <View style={styles.leftIcon}>
          <TouchableOpacity onPress={props.goBackHandler}>
            <Icon
              size={28}
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
              size={28}
              name="list-outline"
              type="ionicon"
              color={'#9fc4c6'}
            />
          </TouchableOpacity>
        </View>
      )}
      {props.chosenItem.dialogName || props.chosenItem.message ? (
        <TouchableOpacity
          style={styles.deleteDialogButton}
          onPress={props.deleteItem}>
          <View>
            <Icon
              size={28}
              paddingLeft={4}
              name="trash-outline"
              type="ionicon"
              color={'#ff1a1a'}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={styles.headerText}>{props.title}</Text>
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
                  opacity: props.currentMessagesStateBranch.messagesList.length
                    ? 1
                    : 0.5,
                },
              ]}
              onPress={props.cleanMessages}
              disabled={
                props.currentMessagesStateBranch.messagesList.length === 0
              }>
              <View>
                <Icon
                  size={26}
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
                  size={26}
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
      <View style={styles.iconEllipsisVertical}>
        <TouchableOpacity onPress={props.openModalHeaderMenu}>
          <Icon
            size={28}
            name="ellipsis-vertical"
            type="ionicon"
            color={'#9fc4c6'}
          />
        </TouchableOpacity>
      </View>
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
    borderRightWidth: 0.5,
    borderColor: '#646f82',
  },
  deleteDialogButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 4,
    marginRight: '66%',
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
    borderLeftWidth: 0.5,
    borderColor: '#646f82',
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
