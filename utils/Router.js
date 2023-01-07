import "react-native-gesture-handler";

// Import React and Component
import React, { useContext, useEffect, useState } from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import SplashScreen from "../components/Screens/SplashScreen";
import LoginScreen from "../components/Screens/LoginScreen";
import DrawerNavigationRoutes from "../components/Navigation/DrawerNavigator";
import Register from "../components/Screens/RegisterScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditProfileScreen from "../components/Screens/EditProfileScreen";
import SettingsScreen from "../components/Screens/SettingsScreen";
import { NavigationStackHeader } from "../components/Navigation/NavigationDrawerHeader";
import PageHeader from "../components/atoms/PageHeader";
import UserProvider from "../components/context/UserProvider";
import AccountScreen from "../components/Screens/AccountScreen";
import AllTransactionScreen from "../components/Screens/AllTransactionScreen";
import UserContext from "../components/context/UserContext";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AuthStack = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{
          headerShown: false,
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => (
  <Stack.Navigator initialRouteName="SplashScreen">
    {/* SplashScreen which will come once for 5 Seconds */}
    <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      // Hiding header for Splash Screen
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DrawerNavigationRoutes"
      component={DrawerNavigationRoutes}
      // Hiding header for Navigation Drawer
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      // Hiding header for Navigation Drawer
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
              name="Edit Profile "
            />
          ),
          //headerRight: () => <HeaderRight navigation={navigation} />,
        };
      }}
    />
    <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      // Hiding header for Navigation Drawer
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
              name="Settings "
            />
          ),
          //headerRight: () => <HeaderRight navigation={navigation} />,
        };
      }}
    />

    <Stack.Screen
      name="AllTransactions"
      component={AllTransactionScreen}
      // Hiding header for Navigation Drawer
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
              name="All Transactions "
            />
          ),
          //headerRight: () => <HeaderRight navigation={navigation} />,
        };
      }}
    />

    <Stack.Screen
      name="AccountScreen"
      component={AccountScreen}
      // Hiding header for Navigation Drawer
      options={({ navigation }) => {
        return {
          headerMode: "float",
          headerLeft: () => (
            <NavigationStackHeader navigationProps={navigation} />
          ),
          // headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: (props) => (
            <PageHeader navigation={navigation} props={props} name="Accounts" />
          ),
          //headerRight: () => <HeaderRight navigation={navigation} />,
        };
      }}
    />
  </Stack.Navigator>
);

export default Router = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
