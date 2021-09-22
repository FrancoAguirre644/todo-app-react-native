import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux';
import store from './store/index'
import AppNavigator from './natigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
