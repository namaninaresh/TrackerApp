import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/HomeScreen";
import About from "../Screens/AboutScreen";
import PageHeader from "../atoms/PageHeader";
import UserRegistration from "../Screens/UserRegistration";
import {
  NavigationDrawerHeader,
  NavigationStackHeader,
} from "./NavigationDrawerHeader";
import SearchScreen from "../Screens/SearchScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import AddTransactionScreen from "../Screens/AddTransaction";
import NotificationScreen from "../Screens/Notification";
import SettingsScreen from "../Screens/SettingsScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerMode: "float",
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
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({ navigation }) => {
          return {
            headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader navigation={navigation} props={props} name="Search" />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};
const TransactionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="TransactionSreen"
        component={AddTransactionScreen}
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
                name="Transaction"
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};
const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
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
                name="Notification"
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
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
                name="My Profile"
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={({ navigation }) => {
          return {
            headerMode: "float",
            headerLeft: () => (
              <NavigationStackHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader
                navigation={navigation}
                props={props}
                name="Settings"
              />
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
  TransactionStackNavigator,
  SearchStackNavigator,
  ProfileStackNavigator,
  NotificationStackNavigator,
};
