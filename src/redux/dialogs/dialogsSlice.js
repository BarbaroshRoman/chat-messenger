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
      state.dialogsList = [...state.dialogsList].sort(
        (a, b) => a.lastMessageId - b.lastMessageId,
      );
      state.dialogsList = [...state.dialogsList].reverse();
    },
  },
});

export const {creatingDialog, deletingDialog, dialogsSorting} =
  dialogsSlice.actions;

export const {reducer: dialogsReducer} = dialogsSlice;
