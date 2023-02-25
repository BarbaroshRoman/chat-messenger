import {combineReducers} from '@reduxjs/toolkit';

import {messagesReducer} from '../redux/messages/messagesSlice';
import {dialogsReducer} from '../redux/dialogs/dialogsSlice';
import {personalDataReducer} from "../redux/personalData/personalDataSlice";

export const rootReducer = combineReducers({
  messages: messagesReducer,
  dialogs: dialogsReducer,
  personalData: personalDataReducer,
});
