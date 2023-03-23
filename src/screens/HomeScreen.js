import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Alert, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '@rneui/base';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import {navigationPages} from '../navigation/components/navigationPages';
import {
  creatingDialog,
  deletingDialog,
  pinningDialog,
  sortingDialogsWhenDeletingAMessage,
  unpiningDialog,
} from '../redux/dialogs/dialogsSlice';
import {DialogView} from '../components/DialogView';
import {HeaderComponent} from '../components/header/HeaderComponent';
import {
  creatingMessageListForDialog,
  deletingMessagesListForDialog,
} from '../redux/messages/messagesSlice';
import {findMessagesListForDialog} from '../helpers/findMessagesListForDialog';
import {COLORS} from '../resources/colors';
import {ModalCreatingDialog} from '../components/modalCreatingDialog/ModalCreatingDialog';
import {PinnedItemView} from '../components/PinnedItemView';
import ImagePicker from 'react-native-image-crop-picker';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const flatRef = useRef(null);
  const isFocused = useIsFocused();

  const dialogsList = useSelector(state => state.dialogs.dialogsList);
  const pinnedDialog = useSelector(state => state.dialogs.pinnedDialog);
  const messageLists = useSelector(state => state.messages.messageLists);
  const chosenMessageForForwarding = useSelector(
    state => state.messages.chosenMessageForForwarding,
  );

  const [dialogNameValue, setDialogNameValue] = React.useState('');
  const [userAvatarValue, setUserAvatarValue] = useState('');
  const [creationDialog, setCreationDialog] = useState(false);
  const [headerMenu, setHeaderMenu] = useState(false);

  const [chosenDialog, setChosenDialog] = useState({});

  const init = async () => {
    await SystemNavigationBar.setNavigationColor(
      COLORS.charcoal,
      'dark',
      'both',
    );
  };

  useEffect(() => {
    isFocused && init();
  }, [isFocused]);

  const data = useMemo(() => [...dialogsList].reverse(), [dialogsList]);

  const closeModalCreatingDialog = () => {
    setCreationDialog(false);
    setDialogNameValue('');
    setUserAvatarValue('');
  };

  const openModalCreatingDialog = () => {
    setCreationDialog(true);
  };

  const closeModalHeaderMenu = () => {
    setHeaderMenu(false);
  };

  const openModalHeaderMenu = () => {
    setHeaderMenu(true);
  };

  const createDialog = useCallback(() => {
    if (dialogNameValue !== '') {
      const newDialog = {
        dialogName: dialogNameValue.trim(),
        dialogId: new Date(),
        lastMessageForDialog: {},
      };
      dispatch(creatingDialog(newDialog));
      dispatch(
        creatingMessageListForDialog({
          dialogId: newDialog.dialogId,
          pinnedMessage: {},
          userAvatar: userAvatarValue,
          messagesList: [],
          loadingStatus: null,
        }),
      );
      closeModalCreatingDialog();
      navigation.navigate(navigationPages.CHAT, newDialog);
    }
  }, [dialogNameValue, dispatch, navigation, userAvatarValue]);

  const goToPage = useCallback(
    item => {
      if (!chosenDialog.dialogName) {
        navigation.navigate(navigationPages.CHAT, item);
      }
    },
    [chosenDialog.dialogName, navigation],
  );

  const deleteDialogHelper = useCallback(() => {
    const newState = [...dialogsList];
    const result = newState.filter(el => el !== chosenDialog);
    dispatch(deletingDialog(result));
    dispatch(deletingMessagesListForDialog(chosenDialog.dialogId));
    setChosenDialog({});
  }, [chosenDialog, dialogsList, dispatch]);

  const pinDialog = useCallback(() => {
    const newItem = {...chosenDialog};
    newItem.isPinned = true;
    dispatch(pinningDialog(newItem));
  }, [chosenDialog, dispatch]);

  const lastMessageForPinDialog = useCallback(() => {
    const currentMessagesList = findMessagesListForDialog(
      messageLists,
      pinnedDialog.dialogId,
    );
    const targetMessageList = currentMessagesList.messagesList;
    const lastIndex = targetMessageList.length - 1;
    const lastIndexMessage = targetMessageList[lastIndex];
    if (targetMessageList.length) {
      return (
        lastIndexMessage.message ??
        `${lastIndexMessage.resendedDialogName}: ${lastIndexMessage.resendedMessage}`
      );
    } else {
      return 'История сообщений пуста';
    }
  }, [messageLists, pinnedDialog.dialogId]);

  const avatarForPinnedDialog = useCallback(() => {
    const currentMessagesList = findMessagesListForDialog(
      messageLists,
      pinnedDialog.dialogId,
    );
    return currentMessagesList.userAvatar;
  }, [messageLists, pinnedDialog.dialogId]);

  const goToPickUserAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setUserAvatarValue(image.path);
    });
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

  const unpinDialogHelper = useCallback(() => {
    const dialog = {...pinnedDialog};
    dispatch(unpiningDialog({}));
    dispatch(
      sortingDialogsWhenDeletingAMessage({
        dialogId: dialog.dialogId,
        lastMessageId: dialog.lastMessageForDialog.messageId,
      }),
    );
  }, [dispatch, pinnedDialog]);

  const unpinDialog = () =>
    Alert.alert('Открепить диалог', 'Вы хотите открепить диалог?', [
      {
        text: 'Отмена',
      },
      {
        text: 'Открепить',
        onPress: unpinDialogHelper,
      },
    ]);

  const renderDialogsList = ({item}) => {
    const currentMessagesList = findMessagesListForDialog(
      messageLists,
      item.dialogId,
    );
    const lastIndex = currentMessagesList.messagesList.length - 1;
    return (
      <>
        {chosenDialog === item && (
          <View style={styles.checkmarkSharpIcon}>
            <Icon
              name="checkmark-sharp"
              type="ionicon"
              color={COLORS.limeGreen}
              size={30}
            />
          </View>
        )}
        <DialogView
          item={item}
          setChosenDialog={setChosenDialog}
          goToPage={goToPage}
          currentMessagesList={currentMessagesList}
          lastIndex={lastIndex}
          userAvatar={currentMessagesList.userAvatar}
        />
      </>
    );
  };

  return (
    <View style={styles.container} onTouchEnd={() => setChosenDialog({})}>
      <View style={styles.dialogsContainer}>
        <HeaderComponent
          title={'Список диалогов'}
          chosenItem={chosenDialog}
          setChosenItem={setChosenDialog}
          headerMenu={headerMenu}
          openModalHeaderMenu={openModalHeaderMenu}
          closeModalHeaderMenu={closeModalHeaderMenu}
          openModalCreatingDialog={openModalCreatingDialog}
          deleteItem={() => deleteDialog(chosenDialog.dialogName)}
          chosenMessageForForwarding={chosenMessageForForwarding}
          pinItem={pinDialog}
          pinnedDialog={pinnedDialog}
          unpinDialog={unpinDialog}
          openDrawer={() => navigation.openDrawer()}
        />
        {pinnedDialog.isPinned && (
          <PinnedItemView
            onPress={() =>
              navigation.navigate(navigationPages.CHAT, pinnedDialog)
            }
            onLongPress={openModalHeaderMenu}
            title={pinnedDialog.dialogName}
            message={lastMessageForPinDialog()}
            userAvatar={avatarForPinnedDialog()}
          />
        )}
        <View style={styles.emptyDialogListDescription}>
          <ModalCreatingDialog
            creationDialog={creationDialog}
            closeModalCreatingDialog={closeModalCreatingDialog}
            dialogNameValue={dialogNameValue}
            setDialogNameValue={setDialogNameValue}
            createDialog={createDialog}
            goToPickUserAvatar={goToPickUserAvatar}
            userAvatar={userAvatarValue}
          />
          {dialogsList.length || pinnedDialog.isPinned ? (
            <FlatList
              ref={flatRef}
              data={data}
              renderItem={renderDialogsList}
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
    backgroundColor: COLORS.charcoal,
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
  checkmarkSharpIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
