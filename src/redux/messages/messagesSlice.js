import {createSlice} from '@reduxjs/toolkit';

import {findMessagesStateBranch} from '../../helpers/currentMessagesStateBranch';
import {replaceMessagesStateBranch} from '../../helpers/replacementMessagesStateBranch';
import {MessagesInitialState} from './messagesState';

const messagesSlice = createSlice({
  name: 'Messages',
  initialState: MessagesInitialState,
  reducers: {
    creatingChat(state, action) {
      state.messagesState.push(action.payload);
    },
    creatingMessages(state, action) {
      const currentMessagesStateBranch = findMessagesStateBranch(
        state.messagesState,
        action.payload.dialogId,
      );
      currentMessagesStateBranch.messagesList.push(action.payload.newMessage);
      replaceMessagesStateBranch(
        state.messagesState,
        currentMessagesStateBranch.dialogId,
        currentMessagesStateBranch.messagesList,
      );
    },
    editingMessages(state, action) {
      const currentMessagesStateBranch = findMessagesStateBranch(
        state.messagesState,
        action.payload.dialogId,
      );
      currentMessagesStateBranch.messagesList.forEach(el => {
        if (el.messageId === action.payload.editedMessage.messageId) {
          el.message = action.payload.editedMessage.message;
          el.edited = true;
        }
      });
      replaceMessagesStateBranch(
        state.messagesState,
        currentMessagesStateBranch.dialogId,
        currentMessagesStateBranch.messagesList,
      );
    },
    cleaningMessages(state, action) {
      let currentMessagesStateBranch = findMessagesStateBranch(
        state.messagesState,
        action.payload.dialogId,
      );
      currentMessagesStateBranch.messagesList =
        action.payload.updatedMessagesList;
      replaceMessagesStateBranch(
        state.messagesState,
        currentMessagesStateBranch.dialogId,
        currentMessagesStateBranch.messagesList,
      );
    },
    cleaningAllMessages(state, action) {
      let currentMessagesStateBranch = findMessagesStateBranch(
        state.messagesState,
        action.payload,
      );
      currentMessagesStateBranch.messagesList = [];
      replaceMessagesStateBranch(
        state.messagesState,
        currentMessagesStateBranch.dialogId,
        currentMessagesStateBranch.messagesList,
      );
    },
    deletingChat(state, action) {
      const result = [...state.messagesState].filter(
        el => el.dialogId !== action.payload,
      );
      state.messagesState = result;
    },
  },
});

export const {
  creatingChat,
  creatingMessages,
  editingMessages,
  cleaningMessages,
  cleaningAllMessages,
  deletingChat,
} = messagesSlice.actions;

export const {reducer: messagesReducer} = messagesSlice;
