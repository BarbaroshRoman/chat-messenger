import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {navigationPages} from './navigation/components/navigationPages';
import {creatingDialog} from './redux/dialogs/dialogsSlice';
import {deletingDialog} from './redux/dialogs/dialogsSlice';
import {DialogView} from './components/DialogView';
import {HeaderComponent} from './components/HeaderComponent';
import {creatingChat, deletingChat} from './redux/messages/messagesSlice';
import {findMessagesStateBranch} from './helpers/currentMessagesStateBranch';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const flatRef = useRef(null);

  const dialogState = useSelector(state => state.dialogs.dialogsState);
  const messagesState = useSelector(state => state.messages.messagesState);

  const [dialogNameValue, setDialogNameValue] = React.useState('');
  const [modalCreatingDialog, setModalCreatingDialog] = useState(false);
  const [modalHeaderMenu, setModalHeaderMenu] = useState(false);

  const [chosenDialog, setChosenDialog] = useState({});

  const closeModalCreatingDialog = () => {
    setModalCreatingDialog(false);
    setDialogNameValue('');
  };

  const openModalCreatingDialog = () => {
    setModalCreatingDialog(true);
  };

  const closeModalHeaderMenu = () => {
    setModalHeaderMenu(false);
  };

  const openModalHeaderMenu = () => {
    setModalHeaderMenu(true);
  };

  const createDialog = () => {
    if (dialogNameValue !== '') {
      const newDialog = {
        dialogName: dialogNameValue.trim(),
        dialogId: new Date(),
      };

      dispatch(creatingDialog(newDialog));
      dispatch(
        creatingChat({
          dialogId: newDialog.dialogId,
          messagesList: [],
        }),
      );
      closeModalCreatingDialog();
      navigation.navigate(navigationPages.CHAT, newDialog);
    }
  };

  const goToPage = item => {
    if (!chosenDialog.dialogName) {
      navigation.navigate(navigationPages.CHAT, item);
    }
  };

  const deleteDialogHelper = () => {
    const newState = [...dialogState];
    const result = newState.filter(el => el !== chosenDialog);
    dispatch(deletingDialog(result));
    dispatch(deletingChat(chosenDialog.dialogId));
    setChosenDialog({});
  };

  const deleteDialog = dialogName =>
    Alert.alert('Удалить чат', `Вы хотите удалить чат с ${dialogName}?`, [
      {
        text: 'Отмена',
        onPress: () => setChosenDialog({}),
      },
      {
        text: 'Удалить',
        onPress: deleteDialogHelper,
      },
    ]);

  const renderDialogBox = ({item}) => {
    const currentMessagesStateBranch = findMessagesStateBranch(
      messagesState,
      item.dialogId,
    );
    const lastIndex = currentMessagesStateBranch.messagesList.length - 1;
    return (
      <DialogView
        item={item}
        setChosenDialog={setChosenDialog}
        goToPage={goToPage}
        currentMessagesStateBranch={currentMessagesStateBranch}
        lastIndex={lastIndex}
      />
    );
  };

  return (
    <View style={styles.container} onTouchEnd={() => setChosenDialog({})}>
      <View style={styles.dialogsContainer}>
        <HeaderComponent
          title={'Список диалогов'}
          chosenItem={chosenDialog}
          modalHeaderMenu={modalHeaderMenu}
          openModalHeaderMenu={openModalHeaderMenu}
          closeModalHeaderMenu={closeModalHeaderMenu}
          openModalCreatingDialog={openModalCreatingDialog}
          deleteItem={() => deleteDialog(chosenDialog.dialogName)}
        />
        <View style={styles.emptyDialogListDescription}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalCreatingDialog}
            onRequestClose={closeModalCreatingDialog}>
            <View style={styles.modalDialogContainer}>
              <Text style={styles.ModalHeaderText}>Название диалога</Text>
              <TextInput
                style={styles.inputModal}
                value={dialogNameValue}
                onChangeText={setDialogNameValue}
                placeholder="Введите название диалога..."
                placeholderTextColor="white"
                multiline
              />
              <View style={styles.buttonsModalContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closeModalCreatingDialog}>
                  <Text style={styles.cancelText}>Отменить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={createDialog}>
                  <Text style={styles.createText}>Создать</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {dialogState.length ? (
            <FlatList
              ref={flatRef}
              data={dialogState}
              renderItem={renderDialogBox}
              keyExtractor={item => item.dialogName + Math.random()}
            />
          ) : (
            <>
              <Button title="Начать диалог" onPress={openModalCreatingDialog} />
              <Text style={styles.emptyDialogListText}>
                Список диалогов пуст
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialogsContainer: {
    flex: 1,
    backgroundColor: '#636e83',
  },
  emptyDialogListDescription: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDialogListText: {
    marginTop: 8,
    color: 'white',
    fontSize: 16,
  },
  inputModal: {
    fontSize: 18,
    paddingLeft: 6,
    marginVertical: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: 'white',
    borderColor: 'white',
    fontStyle: 'italic',
  },
  modalDialogContainer: {
    backgroundColor: '#2c313a',
    marginTop: '50%',
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 4,
    elevation: 20,
  },
  ModalHeaderText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 12,
  },
  buttonsModalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#e60000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 10,
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#52527a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 14,
    marginLeft: 30,
    borderRadius: 4,
    elevation: 10,
  },
  createText: {
    color: 'white',
    fontSize: 16,
  },
});

/*
при последнем отправленном сообщении, диалог должен быть в начале;
 */
