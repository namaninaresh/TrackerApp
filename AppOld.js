// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import "react-native-gesture-handler";

// Import React and Component
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import SplashScreen from "./components/Screens/SplashScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreenNew";
import DrawerNavigationRoutes from "./components/Navigation/DrawerNavigatorRoutes";
import Register from "./components/Screens/RegisterScreen";
import DrawerNavigatorRoutes from "./components/Navigation/DrawerNavigatorRoutes";

const Stack = createStackNavigator();

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
            component={DrawerNavigatorRoutes}
            // Hiding header for Navigation Drawer
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
