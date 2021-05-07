import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "../../components/Homepage/homepage.components";
import ContactDetails from "../../components/ContactsDetails/contact-details.components";
import { Text } from "react-native";

export function RootStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Contacts"
        component={Homepage}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={{ title: "Contact Details" }}
      />
    </Stack.Navigator>
  );
}
