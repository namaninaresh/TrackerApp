import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import BottomTabNavigator from "./components/Navigation/TabNavigator";
import DrawerNavigator from "./components/Navigation/DrawerNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
