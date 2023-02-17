import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ChatScreen} from '../../screens/ChatScreen';
import {navigationPages} from '../components/navigationPages';
import {navigationStacks} from "../components/navigationStacks";
import {DrawerStackComponent} from "./DrawerStack";

const ChatStack = createNativeStackNavigator();

export const ChatStackComponent = () => {
  return (
    <ChatStack.Navigator
      initialRouteName={navigationStacks.drawer}
      screenOptions={{headerShown: false}}>
      <ChatStack.Screen name={navigationStacks.drawer} component={DrawerStackComponent} />
      <ChatStack.Screen
        name={navigationPages.CHAT}
        component={ChatScreen}
        options={{animation: 'slide_from_right', animationDuration: 300}}
      />
    </ChatStack.Navigator>
  );
};
