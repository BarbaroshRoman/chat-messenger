import React, {useState, useRef} from 'react';
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
} from './redux/messages/messagesSlice';
import {HeaderComponent} from './components/HeaderComponent';
import {MessageView} from './components/MessageView';
import {InputView} from './components/InputView';
import {creatingMessages} from './redux/messages/messagesSlice';
import {findMessagesStateBranch} from './helpers/currentMessagesStateBranch';

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const flatRef = useRef(null);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalHeaderMenu, setModalHeaderMenu] = useState(false);
  const [chosenMessage, setChosenMessage] = useState({});
  const [chosenMessageForHeader, setChosenMessageForHeader] = useState({});
  const [inputValue, setInputValue] = useState('');

  const messagesState = useSelector(state => state.messages.messagesState);

  const currentMessagesStateBranch = findMessagesStateBranch(
    messagesState,
    route.params.dialogId,
  );

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
      setChosenMessage({});
      setInputValue('');
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

      if (chosenMessage.isResend) {
        newMessage.resended = chosenMessage.isResend;
        newMessage.resendedMessage = chosenMessage.message;
      }

      dispatch(
        creatingMessages({
          newMessage: newMessage,
          dialogId: route.params.dialogId,
        }),
      );

      setChosenMessage({});
      setInputValue('');
    }
  };

  const deleteMessageHelper = () => {
    const currentChosenMessage = chosenMessage.message
      ? chosenMessage
      : chosenMessageForHeader;
    const newState = [...currentMessagesStateBranch.messagesList];
    const result = newState.filter(el => el !== currentChosenMessage);
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

  const resendMessage = () => {
    const newItem = {...chosenMessage};
    newItem.isResend = true;
    setChosenMessage(newItem);
    closeBottomSheet();
  };

  const goBackHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const editMessage = () => {
    const newItem = {...chosenMessage};
    newItem.inAStateOfEdit = true;
    setChosenMessage(newItem);
    closeBottomSheet();
    setInputValue(chosenMessage.message);
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

  const renderMessage = ({item}) => {
    const onDrawerSnap = () => {
      const newItem = {...item};
      newItem.isResend = true;
      setChosenMessage(newItem);
    };

    return (
      <>
        <View style={styles.iconSendOn}>
          <Icon name="arrow-redo-outline" type="ionicon" color="#fff" />
        </View>
        <MessageView
          item={item}
          onTouchMessage={onTouchMessage}
          setChosenMessageForHeader={setChosenMessageForHeader}
          onDrawerSnap={onDrawerSnap}
          dialogName={route.params.dialogName}
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
        currentMessagesStateBranch={currentMessagesStateBranch}
        cleanMessages={cleanMessages}
        modalHeaderMenu={modalHeaderMenu}
        chosenItem={chosenMessageForHeader}
        setChosenItem={setChosenMessageForHeader}
        deleteItem={deleteMessage}
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
            onPress={resendMessage}>
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
        <FlatList
          ref={flatRef}
          onContentSizeChange={() => flatRef.current.scrollToEnd()}
          contentContainerStyle={styles.flatListContainer}
          data={currentMessagesStateBranch.messagesList}
          renderItem={renderMessage}
          keyExtractor={item => item.message + item.date + Math.random()}
        />
      </View>
      {chosenMessage.isResend && (
        <View style={styles.resendMessage}>
          <View style={styles.iconArrow}>
            <Icon name="arrow-redo-outline" type="ionicon" color="#f50" />
          </View>
          <Text>{route.params.dialogName}</Text>
          <Text style={styles.resendText} numberOfLines={1}>
            {chosenMessage.message}
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setChosenMessage({})}>
            <Icon name="close-outline" type="ionicon" color="white" />
          </TouchableOpacity>
        </View>
      )}
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
  resendMessage: {
    flexDirection: 'row',
    backgroundColor: '#21252b',
    padding: 6,
  },
  resendText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    paddingTop: 2,
    marginRight: 30,
  },
  iconArrow: {
    justifyContent: 'center',
    paddingRight: 6,
  },
  flatListContainer: {
    alignItems: 'flex-end',
  },
  cleanMessages: {
    color: 'white',
  },
  iconSendOn: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});

export default ChatScreen;
