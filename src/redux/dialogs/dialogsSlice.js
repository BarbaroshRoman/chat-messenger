import {createSlice} from '@reduxjs/toolkit';

import {DialogsInitialState} from './dialogsState';
import {findMessagesListForDialog} from '../../helpers/findMessagesListForDialog';
import {replaceMessagesListForDialog} from '../../helpers/replaceMessagesListForDialog';

const dialogsSlice = createSlice({
  name: 'Dialogs',
  initialState: DialogsInitialState,
  reducers: {
    creatingDialog(state, action) {
      state.dialogsList.push(action.payload);
    },
    creatingLastMessageForDialog(state, action) {
      if (state.pinnedDialog.dialogId === action.payload.dialogId) {
        const dialog = {...state.pinnedDialog};
        dialog.lastMessageForDialog = action.payload.lastMessage;
        state.pinnedDialog = dialog;
      } else {
        const currentDialog = findMessagesListForDialog(
          state.dialogsList,
          action.payload.dialogId,
        );
        currentDialog.lastMessageForDialog = action.payload.lastMessage;
        replaceMessagesListForDialog(
          state.dialogsList,
          currentDialog.dialogId,
          currentDialog,
        );
      }
    },
    deletingDialog(state, action) {
      state.dialogsList = action.payload;
    },
    dialogsSorting(state, action) {
      const dialogs = [...state.dialogsList];
      const targetDialog = dialogs.find(el => el.dialogId === action.payload);
      const filteredDialogs = dialogs.filter(
        el => el.dialogId !== action.payload,
      );
      state.dialogsList = filteredDialogs.concat(targetDialog);
    },
    sortingDialogsWhenDeletingAMessage(state, action) {
      const dialogs = [...state.dialogsList];
      const dialogsEarly = [];
      const dialogsLater = [];
      const targetDialog = dialogs.find(
        el => el.dialogId === action.payload.dialogId,
      );
      const updatedDialogs = dialogs.filter(
        el => el.dialogId !== action.payload.dialogId,
      );
      updatedDialogs.forEach(el => {
        const lastMessageId = el.lastMessageForDialog.messageId || null;
        if (lastMessageId < action.payload.lastMessageId) {
          dialogsEarly.push(el);
        } else {
          dialogsLater.push(el);
        }
      });
      state.dialogsList = dialogsEarly.concat(targetDialog, dialogsLater);
    },
    pinningDialog(state, action) {
      if (state.pinnedDialog.isPinned) {
        state.dialogsList.push(state.pinnedDialog);
      }
      state.pinnedDialog = action.payload;
      state.dialogsList = [...state.dialogsList].filter(
        el => el.dialogId !== action.payload.dialogId,
      );
    },
    unpiningDialog(state, action) {
      state.dialogsList.push(state.pinnedDialog);
      state.pinnedDialog = action.payload;
    },
  },
});

export const {
  creatingDialog,
  creatingLastMessageForDialog,
  deletingDialog,
  dialogsSorting,
  sortingDialogsWhenDeletingAMessage,
  pinningDialog,
  unpiningDialog,
} = dialogsSlice.actions;

export const {reducer: dialogsReducer} = dialogsSlice;
