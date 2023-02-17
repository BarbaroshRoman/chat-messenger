import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Alert, Button, FlatList, StyleSheet, Text, View,} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '@rneui/base';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import {navigationPages} from '../navigation/components/navigationPages';
import {creatingDialog, deletingDialog, pinningDialog, unpiningDialog} from '../redux/dialogs/dialogsSlice';
import {DialogView} from '../components/DialogView';
import {HeaderComponent} from '../components/header/HeaderComponent';
import {creatingMessageListForDialog, deletingMessagesListForDialog,} from '../redux/messages/messagesSlice';
import {findMessagesListForDialog} from '../helpers/findMessagesListForDialog';
import {COLORS} from '../resources/colors';
import {ModalCreatingDialog} from "../components/ModalCreatingDialog";
import {PinnedItemView} from "../components/PinnedItemView";

export const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const flatRef = useRef(null);
    const isFocused = useIsFocused();

    const dialogsList = useSelector(state => state.dialogs.dialogsList);
    const pinnedDialog = useSelector(state => state.dialogs.pinnedDialog)
    const messageLists = useSelector(state => state.messages.messageLists);
    const chosenMessageForForwarding = useSelector(
        state => state.messages.chosenMessageForForwarding,
    );

    const [dialogNameValue, setDialogNameValue] = React.useState('');
    const [creationDialog, setCreationDialog] = useState(false);
    const [headerMenu, setHeaderMenu] = useState(false);

    const [chosenDialog, setChosenDialog] = useState({});

    const init = async () => {
        await SystemNavigationBar.setNavigationColor(COLORS.charcoal, "dark", "both");
    }

    useEffect(() => {
        isFocused && init()
    }, [isFocused]);

    const closeModalCreatingDialog = () => {
        setCreationDialog(false);
        setDialogNameValue('');
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

    const createDialog = () => {
        if (dialogNameValue !== '') {
            const newDialog = {
                dialogName: dialogNameValue.trim(),
                dialogId: new Date(),
            };

            dispatch(creatingDialog(newDialog));
            dispatch(
                creatingMessageListForDialog({
                    dialogId: newDialog.dialogId,
                    pinnedMessage: {},
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
        const newState = [...dialogsList];
        const result = newState.filter(el => el !== chosenDialog);
        dispatch(deletingDialog(result));
        dispatch(deletingMessagesListForDialog(chosenDialog.dialogId));
        setChosenDialog({});
    };

    const pinDialog = () => {
        const newItem = {...chosenDialog};
        newItem.isPinned = true;
        dispatch(pinningDialog(newItem))
    };

    const lastMessageForPinDialog = () => {
        const currentMessagesList = findMessagesListForDialog(
            messageLists,
            pinnedDialog.dialogId,
        );
        const lastIndex = currentMessagesList.messagesList.length - 1;
        return currentMessagesList.messagesList[lastIndex] !== undefined ?
            currentMessagesList.messagesList[lastIndex].message :
            'История сообщений пуста';
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

    const unpinDialog = () => Alert.alert(
        'Открепить диалог',
        'Вы хотите открепить диалог?',
        [
            {
                text: 'Отмена',
            },
            {
                text: 'Открепить',
                onPress: () => dispatch(unpiningDialog({}))
            },
        ],
    );

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
                        onPress={() => navigation.navigate(navigationPages.CHAT, pinnedDialog)}
                        onLongPress={openModalHeaderMenu}
                        title={pinnedDialog.dialogName}
                        message={lastMessageForPinDialog()}
                    />
                )}
                <View style={styles.emptyDialogListDescription}>
                    <ModalCreatingDialog
                        creationDialog={creationDialog}
                        closeModalCreatingDialog={closeModalCreatingDialog}
                        dialogNameValue={dialogNameValue}
                        setDialogNameValue={setDialogNameValue}
                        createDialog={createDialog}
                    />
                    {dialogsList.length || pinnedDialog.isPinned ? (
                        <FlatList
                            ref={flatRef}
                            data={dialogsList}
                            renderItem={renderDialogsList}
                            keyExtractor={item => item.dialogName + Math.random()}
                        />
                    ) : (
                        <>
                            <Button title="Начать диалог" onPress={openModalCreatingDialog}/>
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
