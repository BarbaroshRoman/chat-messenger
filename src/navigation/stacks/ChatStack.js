import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../../ChatScreen';
import {HomeScreen} from '../../HomeScreen';
import {navigationPages} from '../components/navigationPages';

const ChatStack = createNativeStackNavigator();

export const ChatStackComponent = () => {
  return (
    <ChatStack.Navigator
      initialRouteName={navigationPages.HOME}
      screenOptions={{headerShown: false}}>
      <ChatStack.Screen name={navigationPages.HOME} component={HomeScreen} />
      <ChatStack.Screen name={navigationPages.CHAT} component={ChatScreen} />
    </ChatStack.Navigator>
  );
};
