import {createSlice} from '@reduxjs/toolkit';

import {PersonalDataInitialState} from "./personalDataState";

const personalDataSlice = createSlice({
    name: 'PersonalData',
    initialState: PersonalDataInitialState,
    reducers: {
        savingUsername(state, action) {
            state.username = action.payload;
        },
        addAboutMe(state, action) {
            state.aboutMe = action.payload;
        },
        settingMyPhoto(state, action) {
            state.myPhoto = action.payload;
        },
        settingMyImageBackground(state, action) {
            state.myImageBackground = action.payload;
        },
    },
});

export const {savingUsername, addAboutMe, settingMyPhoto, settingMyImageBackground} = personalDataSlice.actions;

export const {reducer: personalDataReducer} = personalDataSlice;