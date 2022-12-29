import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5 as Icon, Ionicons } from "@expo/vector-icons";

import TabNavigator from "./TabNavigator";
import CustomSidebarMenu from "./CustomSidebarMenu";
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
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="user-alt" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="All Transacations"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="credit-card" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Statistics"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="chart-line" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
