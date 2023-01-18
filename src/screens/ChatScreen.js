import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {Icon} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  cleaningAllMessages,
  cleaningMessages,
  editingMessages,
  forwardingMessages,
} from '../redux/messages/messagesSlice';
import {HeaderComponent} from '../components/HeaderComponent';
import {MessageView} from '../components/MessageView';
import {InputView} from '../components/InputView';
import {creatingMessages} from '../redux/messages/messagesSlice';
import {findMessagesListForDialog} from '../helpers/findMessagesListForDialog';
import {navigationPages} from '../navigation/components/navigationPages';
import {ActionOnMessageView} from '../components/ActionOnMessageView';

export const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const flatRef = useRef(null);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalHeaderMenu, setModalHeaderMenu] = useState(false);
  const [chosenMessage, setChosenMessage] = useState({});
  const [chosenMessageForHeader, setChosenMessageForHeader] = useState({});
  const [inputValue, setInputValue] = useState('');

  const messageLists = useSelector(state => state.messages.messageLists);
  const chosenMessageForForwarding = useSelector(
    state => state.messages.chosenMessageForForwarding,
  );

  const currentMessagesList = findMessagesListForDialog(
    messageLists,
    route.params.dialogId,
  );

  useEffect(() => {
    setChosenMessage(chosenMessageForForwarding);
  }, [chosenMessageForForwarding]);

  const onTouchMessage = item => {
    openBottomSheet();
    setChosenMessage(item);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeModalHeaderMenu = () => {
    setModalHeaderMenu(false);
  };

  const openModalHeaderMenu = () => {
    setModalHeaderMenu(true);
  };

  const addZero = datePart =>
    +datePart < 10 ? `0${datePart}` : datePart.toString();

  const sendMessage = () => {
    if (inputValue !== '' && chosenMessage.inAStateOfEdit) {
      if (inputValue !== chosenMessage.message) {
        chosenMessage.message = inputValue.trim();
        dispatch(
          editingMessages({
            editedMessage: chosenMessage,
            dialogId: route.params.dialogId,
          }),
        );
      }
    } else if (inputValue !== '') {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formatDate = addZero(hours) + ':' + addZero(minutes);

      const newMessage = {
        message: inputValue.trim(),
        date: formatDate,
        messageId: new Date(),
      };

      if (chosenMessage.isResend || chosenMessage.sentToAnotherDialog) {
        newMessage.resended = true;
        newMessage.resendedDialogName = chosenMessage.dialogName;
        newMessage.resendedMessage = chosenMessage.message;
      }

      dispatch(
        creatingMessages({
          newMessage: newMessage,
          dialogId: route.params.dialogId,
        }),
      );
      dispatch(forwardingMessages({}));
    }
    setChosenMessage({});
    setInputValue('');
  };

  const deleteMessageHelper = () => {
    const resultChosenMessage = chosenMessage.message
      ? chosenMessage
      : chosenMessageForHeader;
    const newState = [...currentMessagesList.messagesList];
    const result = newState.filter(el => el !== resultChosenMessage);
    dispatch(
      cleaningMessages({
        updatedMessagesList: result,
        dialogId: route.params.dialogId,
      }),
    );
    if (chosenMessage.message) {
      closeBottomSheet();
      setChosenMessage({});
    } else {
      setChosenMessageForHeader({});
    }
  };

  const replyToMessage = () => {
    const resultChosenMessage = chosenMessage.message
      ? chosenMessage
      : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    newItem.isResend = true;
    newItem.dialogName = route.params.dialogName;
    setChosenMessage(newItem);
    closeBottomSheet();
  };

  const goBackHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const editMessage = () => {
    const resultChosenMessage = chosenMessage.message
      ? chosenMessage
      : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    newItem.inAStateOfEdit = true;
    setChosenMessage(newItem);
    closeBottomSheet();
    setInputValue(resultChosenMessage.message);
  };

  const forwardMessage = () => {
    const resultChosenMessage = chosenMessage.message
      ? chosenMessage
      : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    newItem.sentToAnotherDialog = true;
    newItem.dialogName = route.params.dialogName;
    dispatch(forwardingMessages(newItem));
    closeBottomSheet();
    navigation.navigate(navigationPages.HOME);
  };

  const cleanMessages = () =>
    Alert.alert(
      'Очистить историю',
      'Вы точно хотите очистить историю переписки?',
      [
        {
          text: 'Отмена',
        },
        {
          text: 'Удалить',
          onPress: () => {
            dispatch(cleaningAllMessages(route.params.dialogId));
          },
        },
      ],
    );

  const deleteMessage = () =>
    Alert.alert('Удалить сообщение', 'Вы хотите удалить это сообщение?', [
      {
        text: 'Отмена',
      },
      {
        text: 'Удалить',
        onPress: deleteMessageHelper,
      },
    ]);

  const renderMessagesList = ({item}) => {
    return (
      <>
        {chosenMessageForHeader === item && (
          <View style={styles.checkmarkSharpIcon}>
            <Icon
              name="checkmark-sharp"
              type="ionicon"
              color="#00cc00"
              size={30}
            />
          </View>
        )}
        <MessageView
          item={item}
          onTouchMessage={onTouchMessage}
          setChosenMessageForHeader={setChosenMessageForHeader}
          setChosenMessage={setChosenMessage}
        />
      </>
    );
  };

  return (
    <View
      style={styles.container}
      onTouchEnd={() => setChosenMessageForHeader({})}>
      <HeaderComponent
        title={route.params.dialogName}
        goBackHandler={goBackHandler}
        closeModalHeaderMenu={closeModalHeaderMenu}
        openModalHeaderMenu={openModalHeaderMenu}
        currentMessagesList={currentMessagesList}
        cleanMessages={cleanMessages}
        modalHeaderMenu={modalHeaderMenu}
        chosenItem={chosenMessageForHeader}
        setChosenItem={setChosenMessage}
        deleteItem={deleteMessage}
        forwardMessage={forwardMessage}
        editMessage={editMessage}
        replyToMessage={replyToMessage}
        chosenMessageForForwarding={false}
      />
      <BottomSheet
        visible={modalVisible}
        onBackButtonPress={closeBottomSheet}
        onBackdropPress={closeBottomSheet}>
        <View style={styles.elContainer}>
          <TouchableOpacity style={[styles.buttonsModal]} onPress={editMessage}>
            <Icon
              size={32}
              name="pencil-outline"
              type="ionicon"
              color={'#00cc00'}
              marginVertical={10}
              marginRight={10}
            />
            <View style={styles.containerDeleteText}>
              <Text style={styles.modalText}>Изменить</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonsModal]}
            onPress={replyToMessage}>
            <Icon
              size={32}
              name="arrow-undo-outline"
              type="ionicon"
              color={'#f50'}
              marginVertical={10}
              marginRight={10}
            />
            <View style={styles.containerDeleteText}>
              <Text style={styles.modalText}>Ответить</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonsModal]}
            onPress={forwardMessage}>
            <Icon
              size={32}
              name="arrow-redo-outline"
              type="ionicon"
              color={'white'}
              marginVertical={10}
              marginRight={10}
            />
            <View style={styles.containerDeleteText}>
              <Text style={styles.modalText}>Переслать</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsModal} onPress={deleteMessage}>
            <Icon
              size={32}
              name="trash-outline"
              type="ionicon"
              color={'#ff1a1a'}
              marginVertical={10}
              marginRight={10}
            />
            <View style={styles.containerDeleteText}>
              <Text style={styles.modalText}>Удалить</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <View style={styles.chat}>
        {currentMessagesList.messagesList.length ? (
          <FlatList
            ref={flatRef}
            onContentSizeChange={() => flatRef.current.scrollToEnd()}
            contentContainerStyle={styles.flatListContainer}
            data={currentMessagesList.messagesList}
            renderItem={renderMessagesList}
            keyExtractor={item => item.message + item.date + Math.random()}
          />
        ) : (
          <View style={styles.emptyMessagesList}>
            <Text style={styles.emptyMessagesListText}>
              История сообщений пуста
            </Text>
          </View>
        )}
      </View>
      <ActionOnMessageView
        chosenMessage={chosenMessage}
        setChosenMessage={setChosenMessage}
        setInputValue={setInputValue}
        dialogName={route.params.dialogName}
      />
      <InputView
        sendMessage={sendMessage}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chat: {
    flex: 1,
    backgroundColor: '#2c313a',
  },
  buttonsModal: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  containerDeleteText: {
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    minWidth: '88%',
  },
  modalText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  elContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#0a6fc2',
    borderWidth: 4,
  },
  flatListContainer: {
    alignItems: 'flex-end',
  },
  cleanMessages: {
    color: 'white',
  },
  checkmarkSharpIcon: {
    position: 'absolute',
    right: '90%',
    top: 6,
  },
  emptyMessagesList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessagesListText: {
    color: 'white',
    fontSize: 16,
  },
});
