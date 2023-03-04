import {createSlice} from '@reduxjs/toolkit';

import {DialogsInitialState} from './dialogsState';

const dialogsSlice = createSlice({
  name: 'Dialogs',
  initialState: DialogsInitialState,
  reducers: {
    creatingDialog(state, action) {
      state.dialogsList.unshift(action.payload);
    },
    deletingDialog(state, action) {
      state.dialogsList = action.payload;
    },
    dialogsSorting(state, action) {
      state.dialogsList.find(el => {
        if (el.dialogId === action.payload.dialogId) {
          el.lastMessageId = new Date(action.payload.lastMessageId);
        }
      });
      state.dialogsList = [...state.dialogsList]
        .sort((a, b) => a.lastMessageId - b.lastMessageId)
        .reverse();
    },
    pinningDialog(state, action) {
      if (state.pinnedDialog.isPinned) {
        state.dialogsList.unshift(state.pinnedDialog);
      }
      state.pinnedDialog = action.payload;
      state.dialogsList = [...state.dialogsList].filter(
        el => el.dialogId !== action.payload.dialogId,
      );
    },
    unpiningDialog(state, action) {
      state.dialogsList.unshift(state.pinnedDialog);
      state.pinnedDialog = action.payload;
    },
  },
});

export const {
  creatingDialog,
  deletingDialog,
  dialogsSorting,
  pinningDialog,
  unpiningDialog,
} = dialogsSlice.actions;

export const {reducer: dialogsReducer} = dialogsSlice;
