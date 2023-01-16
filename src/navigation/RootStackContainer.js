import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {navigationStacks} from './components/navigationStacks';
import {ChatStackComponent} from './stacks/ChatStack';

const RootStack = createNativeStackNavigator();

export const RootStackContainer = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={navigationStacks.chat}
        screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name={navigationStacks.chat}
          component={ChatStackComponent}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
