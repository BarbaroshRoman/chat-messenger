import {createSlice} from '@reduxjs/toolkit';

import {findMessagesListForDialog} from '../../helpers/findMessagesListForDialog';
import {replaceMessagesListForDialog} from '../../helpers/replaceMessagesListForDialog';
import {MessagesInitialState} from './messagesState';

const messagesSlice = createSlice({
  name: 'Messages',
  initialState: MessagesInitialState,
  reducers: {
    creatingMessageListForDialog(state, action) {
      state.messageLists.push(action.payload);
    },
    creatingMessages(state, action) {
      const currentMessagesList = findMessagesListForDialog(
        state.messageLists,
        action.payload.dialogId,
      );
      currentMessagesList.messagesList.push(action.payload.newMessage);
      replaceMessagesListForDialog(
        state.messageLists,
        currentMessagesList.dialogId,
        currentMessagesList,
      );
    },
    editingMessages(state, action) {
      const currentMessagesList = findMessagesListForDialog(
        state.messageLists,
        action.payload.dialogId,
      );
      currentMessagesList.messagesList.forEach(el => {
        if (el.messageId === action.payload.editedMessage.messageId) {
          el.message = action.payload.editedMessage.message;
          el.edited = true;
        }
      });
      replaceMessagesListForDialog(
        state.messageLists,
        currentMessagesList.dialogId,
        currentMessagesList,
      );
    },
    cleaningMessages(state, action) {
      let currentMessagesList = findMessagesListForDialog(
        state.messageLists,
        action.payload.dialogId,
      );
      currentMessagesList.messagesList = action.payload.updatedMessagesList;
      replaceMessagesListForDialog(
        state.messageLists,
        currentMessagesList.dialogId,
        currentMessagesList,
      );
    },
    cleaningAllMessages(state, action) {
      let currentMessagesList = findMessagesListForDialog(
        state.messageLists,
        action.payload,
      );
      currentMessagesList.messagesList = [];
      replaceMessagesListForDialog(
        state.messageLists,
        currentMessagesList.dialogId,
        currentMessagesList,
      );
    },
    deletingMessagesListForDialog(state, action) {
      state.messageLists = [...state.messageLists].filter(
        el => el.dialogId !== action.payload,
      );
    },
    forwardingMessages(state, action) {
      state.chosenMessageForForwarding = action.payload;
    },
    pinningMessage(state, action) {
      const currentMessagesList = findMessagesListForDialog(
        state.messageLists,
        action.payload.dialogId,
      );
      currentMessagesList.pinnedMessage = action.payload.newPinnedMessage;
      replaceMessagesListForDialog(
        state.messageLists,
        currentMessagesList.dialogId,
        currentMessagesList,
      );
    },
    unpiningMessage(state, action) {
      const currentMessagesList = findMessagesListForDialog(
        state.messageLists,
        action.payload.dialogId,
      );
      currentMessagesList.pinnedMessage = action.payload.clearPinnedMessage;
      replaceMessagesListForDialog(
        state.messageLists,
        currentMessagesList.dialogId,
        currentMessagesList,
      );
    },
  },
});

export const {
  creatingMessageListForDialog,
  creatingMessages,
  editingMessages,
  cleaningMessages,
  cleaningAllMessages,
  deletingMessagesListForDialog,
  forwardingMessages,
  pinningMessage,
  unpiningMessage,
} = messagesSlice.actions;

export const {reducer: messagesReducer} = messagesSlice;
