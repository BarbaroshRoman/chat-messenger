import {createSlice} from '@reduxjs/toolkit';

import {PersonalDataInitialState} from './personalDataState';

const personalDataSlice = createSlice({
  name: 'PersonalData',
  initialState: PersonalDataInitialState,
  reducers: {
    savingUsername(state, action) {
      state.username = action.payload;
    },
    addAbout(state, action) {
      state.about = action.payload;
    },
    settingPhoto(state, action) {
      state.photo = action.payload;
    },
    settingImageBackground(state, action) {
      state.imageBackground = action.payload;
    },
  },
});

export const {savingUsername, addAbout, settingPhoto, settingImageBackground} =
  personalDataSlice.actions;

export const {reducer: personalDataReducer} = personalDataSlice;
