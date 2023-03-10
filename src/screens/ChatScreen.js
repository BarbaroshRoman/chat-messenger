import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {Text, View, StyleSheet, FlatList, Alert, LogBox} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  cleaningAllMessages,
  cleaningMessages,
  editingMessages,
  forwardingMessages,
  pinningMessage,
  unpiningMessage,
} from '../redux/messages/messagesSlice';
import {HeaderComponent} from '../components/header/HeaderComponent';
import {MessageView} from '../components/MessageView';
import {InputView} from '../components/InputView';
import {creatingMessages} from '../redux/messages/messagesSlice';
import {findMessagesListForDialog} from '../helpers/findMessagesListForDialog';
import {navigationPages} from '../navigation/components/navigationPages';
import {ClipboardMessageContainer} from '../components/clipboardMessage/ClipboardMessageContainer';
import {dialogsSorting} from '../redux/dialogs/dialogsSlice';
import {COLORS} from '../resources/colors';
import {createDate} from '../helpers/createDate';
import {ChatScreenBottomSheet} from '../components/сhatScreenBottomSheet/ChatScreenBottomSheet';
import {PinnedItemView} from '../components/PinnedItemView';

export const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const flatRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [headerMenu, setHeaderMenu] = useState(false);
  const [chosenMessage, setChosenMessage] = useState({});
  const [chosenMessageForHeader, setChosenMessageForHeader] = useState({});
  const [inputValue, setInputValue] = useState('');

  const messageLists = useSelector(state => state.messages.messageLists);
  const chosenMessageForForwarding = useSelector(
    state => state.messages.chosenMessageForForwarding,
  );

  const currentMessagesList = useMemo(
    () => findMessagesListForDialog(messageLists, route.params.dialogId),
    [messageLists, route.params.dialogId],
  );

  useEffect(() => {
    setChosenMessage(chosenMessageForForwarding);
  }, [chosenMessageForForwarding]);

  useEffect(() => {
    const list = currentMessagesList.messagesList;
    const messagesListLength = list.length;
    const lastIndex = messagesListLength - 1;
    const lastMessageId = list[lastIndex].messageId;

    const isNewMessage =
      messagesListLength && Date.now() - lastMessageId < 1000;
    if (isNewMessage) {
      const resultLastMessageId = messagesListLength ? lastMessageId : null;

      dispatch(
        dialogsSorting({
          dialogId: route.params.dialogId,
          lastMessageId: resultLastMessageId,
        }),
      );
    }
  }, [currentMessagesList.messagesList, dispatch, route.params.dialogId]);

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
    setHeaderMenu(false);
  };

  const openModalHeaderMenu = () => {
    setHeaderMenu(true);
  };

  const createNewMessage = newMessage => {
    dispatch(
      creatingMessages({
        newMessage: newMessage,
        dialogId: route.params.dialogId,
      }),
    );
  };

  const sendChosenMessageToAnotherDialog = () => {
    const resultResendedMessage =
      chosenMessage.message || chosenMessage.resendedMessage;

    const newMessage = {
      date: createDate(),
      messageId: Date.now(),
      resended: true,
      resendedDialogName: chosenMessage.resendedDialogName,
      resendedMessage: resultResendedMessage,
    };
    createNewMessage(newMessage);
  };

  const editingMessage = useCallback(() => {
    if (inputValue !== chosenMessage.message) {
      chosenMessage.message = inputValue.trim();
      dispatch(
        editingMessages({
          editedMessage: chosenMessage,
          dialogId: route.params.dialogId,
        }),
      );
    }
  }, [inputValue, chosenMessage, dispatch, route.params.dialogId]);

  const sendSimpleMessage = () => {
    const newMessage = {
      message: inputValue.trim(),
      date: createDate(),
      messageId: Date.now(),
    };

    if (chosenMessage.isResend || chosenMessage.sentToAnotherDialog) {
      const resultResendedMessage =
        chosenMessage.message || chosenMessage.resendedMessage;

      newMessage.resended = true;
      newMessage.resendedDialogName = chosenMessage.resendedDialogName;
      newMessage.resendedMessage = resultResendedMessage;

      if (chosenMessage.prevResendedDialogName) {
        newMessage.prevResendedDialogName =
          chosenMessage.prevResendedDialogName;
      }
    }
    createNewMessage(newMessage);
  };

  const clearClipboard = () => {
    setChosenMessage({});
    setInputValue('');
    chosenMessageForForwarding.message && dispatch(forwardingMessages({}));
  };

  const sendMessage = useCallback(() => {
    if (inputValue) {
      if (chosenMessage.inAStateOfEdit) {
        editingMessage();
      } else {
        sendSimpleMessage();
      }
    } else if (chosenMessage.sentToAnotherDialog) {
      sendChosenMessageToAnotherDialog();
    }
    clearClipboard();
  }, [
    inputValue,
    chosenMessage.sentToAnotherDialog,
    chosenMessage.inAStateOfEdit,
    clearClipboard,
    editingMessage,
  ]);

  const deleteMessageHelper = useCallback(() => {
    const resultChosenMessage = chosenMessage.date
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
    if (chosenMessage) {
      setChosenMessage({});
    } else {
      setChosenMessageForHeader({});
    }
  }, [
    chosenMessage,
    chosenMessageForHeader,
    currentMessagesList.messagesList,
    dispatch,
    route.params.dialogId,
  ]);

  const replyToMessage = useCallback(() => {
    const resultChosenMessage = chosenMessage.date
      ? chosenMessage
      : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    newItem.isResend = true;
    if (newItem.resendedDialogName) {
      newItem.prevResendedDialogName = newItem.resendedDialogName;
    }
    newItem.resendedDialogName = route.params.dialogName;
    setChosenMessage(newItem);
    closeBottomSheet();
  }, [chosenMessage, chosenMessageForHeader, route.params.dialogName]);

  const goBackHandler = useCallback(() => {
    chosenMessageForForwarding.message && dispatch(forwardingMessages({}));
    navigation.goBack();
  }, [chosenMessageForForwarding, dispatch, navigation]);

  const editMessage = useCallback(() => {
    const resultChosenMessage = chosenMessage.date
      ? chosenMessage
      : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    newItem.inAStateOfEdit = true;
    setChosenMessage(newItem);
    closeBottomSheet();
    setInputValue(resultChosenMessage.message);
  }, [chosenMessage, chosenMessageForHeader]);

  const forwardMessage = useCallback(() => {
    const resultChosenMessage = chosenMessage.date
      ? chosenMessage
      : chosenMessageForHeader;
    const newItem = {...resultChosenMessage};
    if (!newItem.resended) {
      newItem.resendedDialogName = route.params.dialogName;
    }
    newItem.sentToAnotherDialog = true;
    dispatch(forwardingMessages(newItem));
    closeBottomSheet();
    navigation.navigate(navigationPages.HOME);
  }, [
    chosenMessage,
    chosenMessageForHeader,
    route.params.dialogName,
    dispatch,
    navigation,
  ]);

  const pinMessage = useCallback(() => {
    const newItem = {...chosenMessageForHeader};
    newItem.isPinned = true;
    dispatch(
      pinningMessage({
        dialogId: route.params.dialogId,
        newPinnedMessage: newItem,
      }),
    );
  }, [chosenMessageForHeader, dispatch, route.params.dialogId]);

  const pinnedMessageResult = useMemo(
    () =>
      currentMessagesList.pinnedMessage.message ||
      currentMessagesList.pinnedMessage.resendedMessage,
    [
      currentMessagesList.pinnedMessage.message,
      currentMessagesList.pinnedMessage.resendedMessage,
    ],
  );

  const clearMessages = useCallback(
    () =>
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
      ),
    [dispatch, route.params.dialogId],
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

  const unpinMessage = useCallback(
    () =>
      Alert.alert('Открепить сообщение', 'Вы хотите открепить сообщение?', [
        {
          text: 'Отмена',
        },
        {
          text: 'Открепить',
          onPress: () =>
            dispatch(
              unpiningMessage({
                dialogId: route.params.dialogId,
                clearPinnedMessage: {},
              }),
            ),
        },
      ]),
    [dispatch, route.params.dialogId],
  );

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
        clearMessages={clearMessages}
        headerMenu={headerMenu}
        chosenItem={chosenMessageForHeader}
        setChosenItem={setChosenMessage}
        deleteItem={deleteMessage}
        forwardMessage={forwardMessage}
        editMessage={editMessage}
        replyToMessage={replyToMessage}
        pinItem={pinMessage}
        chosenMessageForForwarding={false}
        userAvatar={currentMessagesList.userAvatar}
      />
      {currentMessagesList.pinnedMessage.isPinned && (
        <PinnedItemView
          onPress={() => onTouchMessage(currentMessagesList.pinnedMessage)}
          title={'Закреплённое сообщение'}
          message={pinnedMessageResult}
        />
      )}
      <ChatScreenBottomSheet
        modalVisible={modalVisible}
        closeBottomSheet={closeBottomSheet}
        editMessage={editMessage}
        replyToMessage={replyToMessage}
        forwardMessage={forwardMessage}
        deleteMessage={deleteMessage}
        unpinMessage={unpinMessage}
        chosenMessage={chosenMessage}
      />
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
        dialogName={route.params.dialogName}
        clearClipboard={clearClipboard}
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
  flatListContainer: {
    alignItems: 'flex-end',
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
