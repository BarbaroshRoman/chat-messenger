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
        currentMessagesList.messagesList,
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
        currentMessagesList.messagesList,
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
        currentMessagesList.messagesList,
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
        currentMessagesList.messagesList,
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
} = messagesSlice.actions;

export const {reducer: messagesReducer} = messagesSlice;
