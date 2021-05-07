import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Store from "./src/shared/store/contactStore/contact.store";
import { RootStack } from './src/shared/navigation/app.route';

export default function App() {
  return (
    <Provider store={Store}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
