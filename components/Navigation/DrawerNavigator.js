import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { TasksStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import CustomSidebarMenu from "../Screens/CustomSidebarMenu";
import Icon from "@expo/vector-icons/FontAwesome5";
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
        name="About"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="user-alt" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Finance"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="credit-card" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="phone-alt" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="WaterTips"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon name="hand-holding-water" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
