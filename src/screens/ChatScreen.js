import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  LogBox,
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
import {ClipboardMessageContainer} from '../components/ClipboardMessageContainer';
import {dialogsSorting} from '../redux/dialogs/dialogsSlice';
import {COLORS} from '../resources/colors';
import {createDate} from '../helpers/createDate';

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

  useEffect(() => {

      const lastIndex = currentMessagesList.messagesList.length - 1;
      const lastMessageId = currentMessagesList.messagesList.length
          ? currentMessagesList.messagesList[lastIndex].messageId
          : null;
      dispatch(
          dialogsSorting({
            dialogId: route.params.dialogId,
            lastMessageId: lastMessageId,
          }),
      );
  }, [dispatch, currentMessagesList]);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

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

  const createNewMessage = (newMessage) => {
    dispatch(
        creatingMessages({
          newMessage: newMessage,
          dialogId: route.params.dialogId,
        }),
    );
    dispatch(forwardingMessages({}));
  }

  const sentChosenMesToAnotherDialog = () => {
    const resultResendedMessage = chosenMessage.message
        ? chosenMessage.message
        : chosenMessage.resendedMessage;

    const newMessage = {
      date: createDate(),
      messageId: Date.now(),
      resended: true,
      resendedDialogName: chosenMessage.resendedDialogName,
      resendedMessage: resultResendedMessage,
    };
    createNewMessage(newMessage);
  }

  const editingMessage = () => {
    if (inputValue !== chosenMessage.message) {
      chosenMessage.message = inputValue.trim();
      dispatch(
          editingMessages({
            editedMessage: chosenMessage,
            dialogId: route.params.dialogId,
          }),
      );
    }
  }

  const sendSimpleMessage = () => {
    const newMessage = {
      message: inputValue.trim(),
      date: createDate(),
      messageId: Date.now(),
    };

    if (chosenMessage.isResend || chosenMessage.sentToAnotherDialog) {
      const resultResendedMessage = chosenMessage.message
          ? chosenMessage.message
          : chosenMessage.resendedMessage;

      newMessage.resended = true;
      newMessage.resendedDialogName = chosenMessage.resendedDialogName;
      newMessage.resendedMessage = resultResendedMessage;

      if (chosenMessage.prevResendedDialogName) {
        newMessage.prevResendedDialogName =
            chosenMessage.prevResendedDialogName;
      }
    }
    createNewMessage(newMessage);
  }

  const sendMessage = () => {
    if (inputValue) {
      if (chosenMessage.inAStateOfEdit) {
        editingMessage();
      }  else  {
        sendSimpleMessage();
      }
    } else if (chosenMessage.sentToAnotherDialog) {
      sentChosenMesToAnotherDialog();
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
    const resultChosenMessage =
      chosenMessage !== undefined ? chosenMessage : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    newItem.isResend = true;
    if (newItem.resendedDialogName) {
      newItem.prevResendedDialogName = newItem.resendedDialogName;
    }
    newItem.resendedDialogName = route.params.dialogName;
    setChosenMessage(newItem);
    closeBottomSheet();
  };

  const goBackHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const editMessage = () => {
    const resultChosenMessage =
      chosenMessage !== undefined ? chosenMessage : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    newItem.inAStateOfEdit = true;
    setChosenMessage(newItem);
    closeBottomSheet();
    setInputValue(resultChosenMessage.message);
  };

  const forwardMessage = () => {
    const resultChosenMessage =
      chosenMessage !== undefined ? chosenMessage : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    if (!newItem.resended) {
      newItem.resendedDialogName = route.params.dialogName;
    }
    newItem.sentToAnotherDialog = true;
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
              color={COLORS.limeGreen}
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
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity style={[styles.buttonsModal]} onPress={editMessage}>
            <Icon
              size={32}
              name="pencil-outline"
              type="ionicon"
              color={COLORS.limeGreen}
              marginVertical={10}
              marginRight={10}
            />
            <View style={styles.bottomSheetTextContainer}>
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
              color={COLORS.orangeRed}
              marginVertical={10}
              marginRight={10}
            />
            <View style={styles.bottomSheetTextContainer}>
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
            <View style={styles.bottomSheetTextContainer}>
              <Text style={styles.modalText}>Переслать</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsModal} onPress={deleteMessage}>
            <Icon
              size={32}
              name="trash-outline"
              type="ionicon"
              color={'red'}
              marginVertical={10}
              marginRight={10}
            />
            <View style={styles.bottomSheetTextContainer}>
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
      <ClipboardMessageContainer
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
    backgroundColor: COLORS.arsenic,
  },
  buttonsModal: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  bottomSheetTextContainer: {
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
  bottomSheetContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: COLORS.facebookBlue,
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
