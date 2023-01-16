import {createSlice} from '@reduxjs/toolkit';

import {DialogsInitialState} from './dialogsState';

const dialogsSlice = createSlice({
  name: 'Dialogs',
  initialState: DialogsInitialState,
  reducers: {
    creatingDialog(state, action) {
      state.dialogsList.push(action.payload);
    },
    deletingDialog(state, action) {
      state.dialogsList = action.payload;
    },
  },
});

export const {creatingDialog, deletingDialog} = dialogsSlice.actions;

export const {reducer: dialogsReducer} = dialogsSlice;
