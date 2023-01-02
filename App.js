import "react-native-gesture-handler";

// Import React and Component
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import SplashScreen from "./components/Screens/SplashScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreenNew";
import DrawerNavigationRoutes from "./components/Navigation/DrawerNavigator";
import Register from "./components/Screens/RegisterScreen";
import { Layout } from "./components/Layout/Layout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Button } from "react-native";
import EditProfileScreen from "./components/Screens/EditProfileScreen";
import SettingsScreen from "./components/Screens/SettingsScreen";
import { NavigationStackHeader } from "./components/Navigation/NavigationDrawerHeader";
import PageHeader from "./components/atoms/PageHeader";
import { getAuth } from "firebase/auth";
import UserProvider from "./components/context/UserProvider";
import AccountScreen from "./components/Screens/AccountScreen";
import AllTransactionScreen from "./components/Screens/AllTransactionScreen";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Auth = () => {
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

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{ headerShown: false }}
            />
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            {/* Navigation Drawer as a landing page */}
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
                    <PageHeader
                      navigation={navigation}
                      props={props}
                      name="Accounts"
                    />
                  ),
                  //headerRight: () => <HeaderRight navigation={navigation} />,
                };
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
};

function Home(props) {
  return (
    <Layout>
      <Text>Home</Text>
      <Button
        title="PRess"
        onPress={() => props.navigation.navigate("Profile")}
      />
    </Layout>
  );
}
function Profile() {
  return (
    <Layout>
      <Text>Profile</Text>
    </Layout>
  );
}
function Settings() {
  return (
    <Layout>
      <Text>Settings</Text>
    </Layout>
  );
}
function Feed() {
  return (
    <Layout>
      <Text>Feed</Text>
    </Layout>
  );
}
function Notifications() {
  return (
    <Layout>
      <Text>Notifications</Text>
    </Layout>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}

function Apps() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Settins" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
