import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { TasksStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import CustomSidebarMenu from "../Screens/CustomSidebarMenu";
import {
  FontAwesome5 as Icon,
  Ionicons,
  MaterialCommunityIcons as MIcon,
} from "@expo/vector-icons";
import SettingsScreen from "../Screens/SettingsScreen";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="user-alt" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="All Transacations"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="credit-card" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Statistics"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="chart-line" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="settings" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
