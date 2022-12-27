import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/HomeScreen";
import About from "../Screens/AboutScreen";
import TaskScreen from "../Screens/TaskScreen";
import colors from "../../theme/colors";
import PageHeader from "../atoms/PageHeader";
import { Text } from "react-native";
import UserRegistration from "../Screens/UserRegistration";
import FadeInRightExample from "../Screens/FadeInRightExample";
import NavigationDrawerHeader from "./NavigationDrawerHeader";
import BudgetScreen from "../Screens/BudgetScreen";
import WaterScreen from "../Screens/WaterScreen";

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
            headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
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
      <Stack.Screen
        name="user"
        component={UserRegistration}
        options={({ navigation }) => {
          return {
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader navigation={navigation} props={props} name="User" />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />

      <Stack.Screen
        name="Fade"
        component={FadeInRightExample}
        options={({ navigation }) => {
          return {
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader navigation={navigation} props={props} name="Fade" />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const TasksStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Tasks"
        component={TaskScreen}
        options={({ navigation }) => {
          return {
            headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader navigation={navigation} props={props} name="Task" />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};
const BudgetStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Budget"
        component={BudgetScreen}
        options={({ navigation }) => {
          return {
            headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader
                navigation={navigation}
                props={props}
                name="Finance"
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};
const WaterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Water"
        component={WaterScreen}
        options={({ navigation }) => {
          return {
            headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader navigation={navigation} props={props} name="Water" />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};
export {
  MainStackNavigator,
  TasksStackNavigator,
  BudgetStackNavigator,
  WaterStackNavigator,
};
