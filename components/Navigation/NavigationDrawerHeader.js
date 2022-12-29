// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const NavigationDrawerHeader = (props, icon = "menu") => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name={"menu"} size={24} style={{ paddingLeft: 20 }} />
      </TouchableOpacity>
    </View>
  );
};
const NavigationStackHeader = (props) => {
  const navigateBack = () => {
    props.navigationProps.goBack();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={navigateBack}>
        <Icon name={"arrow-left"} size={24} style={{ paddingLeft: 20 }} />
      </TouchableOpacity>
    </View>
  );
};
export { NavigationDrawerHeader, NavigationStackHeader };
