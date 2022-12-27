import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { TasksStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import CustomSidebarMenu from "../Screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Contact" component={TasksStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
