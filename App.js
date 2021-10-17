import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import Routes from './src/config/routes';
import AuthContextProvider from './src/context/auth/AuthContextProvider';

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
