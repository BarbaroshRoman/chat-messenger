import {combineReducers} from '@reduxjs/toolkit';

import {messagesReducer} from '../redux/messages/messagesSlice';
import {dialogsReducer} from '../redux/dialogs/dialogsSlice';

export const rootReducer = combineReducers({
  messages: messagesReducer,
  dialogs: dialogsReducer,
});
