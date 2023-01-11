import {createSlice} from '@reduxjs/toolkit';

import {DialogsInitialState} from './dialogsState';

const dialogsSlice = createSlice({
  name: 'Dialogs',
  initialState: DialogsInitialState,
  reducers: {
    creatingDialog(state, action) {
      state.dialogsState.push(action.payload);
    },
    deletingDialog(state, action) {
      state.dialogsState = action.payload;
    },
  },
});

export const {creatingDialog, deletingDialog} = dialogsSlice.actions;

export const {reducer: dialogsReducer} = dialogsSlice;
