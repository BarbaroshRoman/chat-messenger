import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {RootStackContainer} from './src/navigation/RootStackContainer';
import {store, persistor} from './src/store/store';
import {StatusBar} from "react-native";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <StatusBar backgroundColor={"teal"} animated={true} barStyle={"light-content"}/>
        <RootStackContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
