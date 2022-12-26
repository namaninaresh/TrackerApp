import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import colors from "../../theme/colors";
import DrawerNavigator from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homse") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === "Task") {
            iconName = focused ? "ios-heart-sharp" : "ios-heart-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={colors.gold} />;
        },
        tabBarActiveTintColor: "#58ceb2",
        tabBarInactiveTintColor: "gray",
        //Tab bar styles can be added here
        tabBarStyle: {
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: "white",
          position: "absolute",
          height: 60,
        },
        tabBarLabelStyle: { paddingBottom: 5 },
      })}
    >
      <Tab.Screen name="Homse" component={MainStackNavigator} />
      <Tab.Screen name="Contact" component={ContactStackNavigator} />
      <Tab.Screen name="Task" component={ContactStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
