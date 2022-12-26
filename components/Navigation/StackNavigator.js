import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/HomeScreen";
import About from "../Screens/AboutScreen";
import Contact from "../Screens/TaskScreen";
import colors from "../../theme/colors";
import PageHeader from "../atoms/PageHeader";
import { Text } from "react-native";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader navigation={navigation} props={props} name="Home" />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={({ navigation }) => {
          return {
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader navigation={navigation} props={props} name="About" />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator };
